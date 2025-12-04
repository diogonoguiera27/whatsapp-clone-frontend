import { v4 as uuid } from "uuid";

/* =======================================================
    🔧 TIPOS
======================================================= */

// IDENTIFY
export type IdentifyMessage = {
  type: "identify";
  userId: string;
};

// MENSAGEM DE CHAT
export type IncomingChatMessage = {
  type: "message";
  from: string;
  to: string;
  text: string;
  time: string;
  conversationId: string;
};

// NOVA MENSAGEM PARA ATUALIZAR A LISTA DE CONTATOS
export type IncomingNewMessage = {
  type: "new-message";
  conversationId: string;
};

// ATUALIZAR CONTADOR NÃO LIDAS
export type IncomingUnreadUpdate = {
  type: "update-unread";
  conversationId: string;
  unreadCount: number;
};

export type IncomingMessage =
  | IdentifyMessage
  | IncomingChatMessage
  | IncomingNewMessage
  | IncomingUnreadUpdate;

// ENVIAR AO BACKEND
export type OutgoingMessage = {
  type: "message";
  from: string;
  to: string;
  text: string;
};

/* =======================================================
    🆔 USER ID PERSISTENTE
======================================================= */

let userId = localStorage.getItem("user-id");
if (!userId) {
  userId = uuid();
  localStorage.setItem("user-id", userId);
}
export const USER_ID = userId;

/* =======================================================
    🔌 CONTROLE DO WEBSOCKET
======================================================= */

let socket: WebSocket;
let isConnected = false;
let reconnectAttempts = 0;

const pendingMessages: string[] = [];
const listeners: Array<(data: IncomingMessage) => void> = [];

/* =======================================================
    🔄 CONECTAR WS
======================================================= */
function connectWebSocket() {
  console.log("🔌 Conectando WebSocket…");

  socket = new WebSocket("ws://localhost:3333");

  socket.onopen = () => {
    console.log("🟢 WS conectado com sucesso");
    isConnected = true;
    reconnectAttempts = 0;

    const identify: IdentifyMessage = {
      type: "identify",
      userId: USER_ID!,
    };

    socket.send(JSON.stringify(identify));

    // Enviar mensagens pendentes
    if (pendingMessages.length > 0) {
      pendingMessages.forEach((m) => socket.send(m));
      pendingMessages.length = 0;
    }
  };

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as IncomingMessage;
      console.log("📩 WS RECEBIDO:", data);
      listeners.forEach((fn) => fn(data));
    } catch (err) {
      console.error("❌ Erro ao interpretar WS:", err);
    }
  };

  socket.onclose = () => {
    console.log("🔴 WS desconectado");
    isConnected = false;

    reconnectAttempts++;
    const timeout = Math.min(5000, reconnectAttempts * 1000);

    setTimeout(connectWebSocket, timeout);
  };

  socket.onerror = (err) => {
    console.error("⚠️ WS erro:", err);
  };
}

connectWebSocket();

/* =======================================================
    📥 ADICIONAR LISTENER
======================================================= */
export function onMessage(callback: (data: IncomingMessage) => void) {
  listeners.push(callback);

  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) listeners.splice(index, 1);
  };
}

/* =======================================================
    📤 ENVIAR MENSAGEM
======================================================= */
export function sendChatMessage(to: string, text: string): OutgoingMessage {
  const msg: OutgoingMessage = {
    type: "message",
    from: USER_ID!,
    to,
    text,
  };

  const serialized = JSON.stringify(msg);

  if (!isConnected || socket.readyState !== WebSocket.OPEN) {
    pendingMessages.push(serialized);
  } else {
    socket.send(serialized);
  }

  return msg;
}

/* =======================================================
    📘 ENVIAR EVENTO "READ" PARA ZERAR NOTIFICAÇÃO
======================================================= */
export function emitRead(conversationId: string) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  socket.send(
    JSON.stringify({
      type: "read",
      conversationId,
      userId: USER_ID,
    })
  );

  console.log("📢 WS → Mensagens marcadas como lidas!");
}
