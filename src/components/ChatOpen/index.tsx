import {
  Search,
  MoreVertical,
  Smile,
  Mic,
  Plus,
  ArrowRight,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import type { IncomingMessage, IncomingChatMessage } from "../../services/websocket";
import { USER_ID, onMessage, sendChatMessage, emitRead } from "../../services/websocket";

import { getConversation, getHistory } from "../../services/messages";

import ChatMenuOptions from "../ChatMenuOptions";
import ChatAttachMenu from "../ChatAttachMenu";

import type { ContactItem } from "../ContactsList";

// ======================================================
//  PROPS
// ======================================================
interface ChatOpenProps {
  contact: ContactItem | null;
}

// ======================================================
//  COMPONENTE
// ======================================================
export default function ChatOpen({ contact }: ChatOpenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IncomingChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const attachButtonRef = useRef<HTMLButtonElement | null>(null);

  // ======================================================
  //  🔵 Carregar conversa + histórico
  // ======================================================
  useEffect(() => {
    console.log("🟦 [CHATOPEN] useEffect — contact =", contact);

    if (!contact) {
      console.log("⚠️ [CHATOPEN] Nenhum contato selecionado");
      return;
    }

    const safeContact = contact;

    async function loadChat() {
      console.log("📥 [CHATOPEN] Limpando mensagens...");
      setMessages([]);

      console.log("📌 [CHATOPEN] Buscando conversa no backend...");
      const conv = await getConversation(USER_ID!, safeContact.contactId);

      console.log("📌 [CHATOPEN] Conversa recebida:", conv.data);
      setConversationId(conv.data.id);

      const history = await getHistory(conv.data.id);
      console.log("📜 [CHATOPEN] Histórico carregado:", history.data);

      setMessages(history.data);

      // 🔵 Marca como lida imediatamente
      emitRead(conv.data.id);
    }

    loadChat();
  }, [contact]);

  // ======================================================
  //  🔵 Listener WebSocket
  // ======================================================
  useEffect(() => {
    console.log("🟣 [CHATOPEN] WebSocket listener instalado");

    const unsubscribe = onMessage((msg: IncomingMessage) => {
      console.log("📩 [CHATOPEN] WS RECEBIDO:", msg);

      if (msg.type !== "message") return;

      const chatMsg = msg as IncomingChatMessage;

      console.log("🔍 [CHATOPEN] Mensagem pertence à:", chatMsg.conversationId);
      console.log("🔍 [CHATOPEN] Minha conversa atual:", conversationId);

      if (!conversationId) return;

      if (chatMsg.conversationId !== conversationId) {
        console.log("🚫 [CHATOPEN] Mensagem descartada — outra conversa");
        return;
      }

      console.log("✅ [CHATOPEN] Mensagem adicionada!");
      setMessages((prev) => [...prev, chatMsg]);

      // 🔵 Marca como lida quando chega dentro da conversa aberta
      emitRead(conversationId);
    });

    return () => {
      console.log("🧹 [CHATOPEN] Listener removido");
      unsubscribe();
    };
  }, [conversationId]);

  // ======================================================
  //  🟢 Enviar mensagem
  // ======================================================
  function send() {
    console.log("📤 [CHATOPEN] Enviando mensagem:", message);

    if (!contact) {
      console.log("⛔ contact é null");
      return;
    }

    const safeContact = contact;

    if (!message.trim()) {
      console.log("⛔ mensagem vazia");
      return;
    }

    sendChatMessage(safeContact.contactId, message);

    setMessage("");

    // 🔵 Marca como lida após enviar
    if (conversationId) emitRead(conversationId);
  }

  // ======================================================
  //  ⛔ Nenhum contato selecionado
  // ======================================================
  if (!contact) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#0b141a]">
        <p className="text-[#aebac1] text-lg">
          Selecione um contato para iniciar uma conversa
        </p>
      </div>
    );
  }

  // ======================================================
  //  🔒 Agora contact nunca mais será null
  // ======================================================
  const safeContact: ContactItem = contact;

  // ======================================================
  //  🔥 CHAT COMPLETO
  // ======================================================
  return (
    <div className="flex-1 h-full bg-[#0b141a] flex flex-col relative">
      <ChatAttachMenu
        isOpen={attachOpen}
        anchorRef={attachButtonRef}
        onClose={() => setAttachOpen(false)}
      />

      {/* HEADER */}
      <header className="w-full h-[64px] bg-[#202c33] border-b border-[#2a3942] flex items-center justify-between relative">
        <div className="flex items-center gap-3 pl-4">
          <img
            src={safeContact.avatarUrl || "https://i.pravatar.cc/150?img=1"}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-[#e9edef] text-[15px] font-medium">
              {safeContact.name || safeContact.contactId}
            </span>
            <span className="text-xs text-zinc-400">online agora</span>
          </div>
        </div>

        <div className="flex items-center justify-end pr-4 gap-1 w-[120px]">
          <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#2a3942] cursor-pointer">
            <Search size={24} className="text-[#aebac1]" />
          </div>

          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#2a3942] cursor-pointer relative"
          >
            <MoreVertical size={24} className="text-[#aebac1]" />
            <ChatMenuOptions isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      </header>

      {/* MENSAGENS */}
      <div
        className="flex-1 overflow-y-auto px-10 py-6"
        style={{
          backgroundImage: "url('./assets/bg-chat.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-3">
          {messages.map((msg, index) => {
            const isMine = msg.from === USER_ID;

            return (
              <div
                key={index}
                className={`
                  max-w-[55%] px-3 py-2 rounded-lg text-sm shadow-md
                  ${
                    isMine
                      ? "bg-[#005c4b] text-white self-end"
                      : "bg-[#202c33] text-[#e9edef] self-start"
                  }
                `}
              >
                {msg.text}

                <div className="text-[10px] text-gray-300 flex justify-end mt-1">
                  {new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INPUT */}
      <div className="h-[70px] bg-[#202c33] border-t border-[#2a3942] px-4 flex items-center gap-3">
        <button
          ref={attachButtonRef}
          onClick={() => setAttachOpen(!attachOpen)}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942] transition cursor-pointer"
        >
          <Plus size={26} className="text-zinc-300" />
        </button>

        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942] transition cursor-pointer">
          <Smile size={26} className="text-zinc-300" />
        </button>

        <input
          type="text"
          placeholder="Digite uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 bg-[#2a3942] text-[#e9edef] px-4 py-3 rounded-lg outline-none placeholder:text-zinc-400"
        />

        {message.trim() === "" ? (
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942] transition cursor-pointer">
            <Mic size={26} className="text-zinc-300" />
          </button>
        ) : (
          <button
            onClick={send}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#00A884] transition cursor-pointer"
          >
            <ArrowRight size={22} className="text-white translate-x-[1px]" />
          </button>
        )}
      </div>
    </div>
  );
}
