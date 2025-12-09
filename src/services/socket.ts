
import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";


let userId = localStorage.getItem("user-id");

if (!userId) {
  userId = uuid();
  localStorage.setItem("user-id", userId);
}

export const USER_ID = userId;
console.log("🪪 USER_ID carregado:", USER_ID);


export type IncomingChatMessage = {
  type: "message";
  from: string;
  to: string;
  text: string;
  time: string;
  conversationId: string;
};

export type IncomingNewMessage = {
  type: "new-message";
  conversationId: string;
  preview: string;
};

export type IncomingMessage =
  | IncomingChatMessage
  | IncomingNewMessage;


export type OutgoingMessage = {
  type: "message";
  from: string;
  to: string;
  text: string;
};


export const socket: Socket = io("http://localhost:3333", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});


socket.on("connect", () => {
  console.log("🟢 SOCKET.IO conectado:", socket.id);

  
  socket.emit("identify", {
    userId: USER_ID,
  });
});


const listeners: Array<(data: IncomingMessage) => void> = [];

socket.on("message-event", (data: IncomingMessage) => {
  console.log("📥 EVENTO RECEBIDO:", data);
  listeners.forEach((fn) => fn(data));
});


export function onMessage(callback: (data: IncomingMessage) => void) {
  listeners.push(callback);

  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) listeners.splice(index, 1);
  };
}


export function sendChatMessage(to: string, text: string): OutgoingMessage {
  const msg: OutgoingMessage = {
    type: "message",
    from: USER_ID,
    to,
    text,
  };

  console.log("📤 Enviando mensagem:", msg);

  socket.emit("send-message", msg);

  return msg;
}
