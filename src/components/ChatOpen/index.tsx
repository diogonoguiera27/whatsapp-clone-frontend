// 🔥 ChatOpen.tsx — versão limpa, compatível com backend simplificado

import {
  Search,
  MoreVertical,
  Smile,
  Mic,
  Plus,
  ArrowRight,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import type {
  IncomingMessage,
  IncomingChatMessage,
} from "../../services/socket";

import {
  USER_ID,
  onMessage,
  sendChatMessage
} from "../../services/socket";

import { getConversation, getHistory } from "../../services/messages";
import ChatMenuOptions from "../ChatMenuOptions";
import ChatAttachMenu from "../ChatAttachMenu";

import type { ContactItem } from "../ContactsList";

// ===========================================
// 🔥 1) WRAPPER — impede erro quando não há contato
// ===========================================
interface ChatOpenProps {
  contact: ContactItem | null;
}

export default function ChatOpen({ contact }: ChatOpenProps) {
  if (!contact) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#0b141a]">
        <p className="text-[#aebac1] text-lg">
          Selecione um contato para iniciar uma conversa
        </p>
      </div>
    );
  }

  return <ChatOpenContent contact={contact} />;
}

// ===========================================
// 🔥 2) COMPONENTE REAL — recebe ContactItem válido
// ===========================================
interface ChatOpenContentProps {
  contact: ContactItem;
}

function ChatOpenContent({ contact }: ChatOpenContentProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IncomingChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const attachButtonRef = useRef<HTMLButtonElement | null>(null);

  // =============================================
  // 🔵 Carregar Conversa + Histórico
  // =============================================
  useEffect(() => {
    async function loadChat() {
      setMessages([]);

      // Backend cria a conversa automaticamente
      const conv = await getConversation(USER_ID!, contact.contactId);
      const convId = conv.data.id;

      setConversationId(convId);

      // Carregar histórico
      const history = await getHistory(convId);
      setMessages(history.data);
    }

    loadChat();
  }, [contact]);

  // =============================================
  // 🔵 Listener de Mensagens Realtime
  // =============================================
  useEffect(() => {
    const unsubscribe = onMessage((msg: IncomingMessage) => {
      if (msg.type !== "message") return;

      const chatMsg = msg as IncomingChatMessage;

      if (!conversationId) return;
      if (chatMsg.conversationId !== conversationId) return;

      setMessages((prev) => [...prev, chatMsg]);
    });

    return () => unsubscribe();
  }, [conversationId]);

  // =============================================
  // 🟢 Enviar Mensagem
  // =============================================
  function send() {
    if (!message.trim()) return;

    sendChatMessage(contact.contactId, message);
    setMessage("");
  }

  // =============================================
  // 🎨 INTERFACE DO CHAT
  // =============================================
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
            src={contact.avatarUrl || "https://i.pravatar.cc/150?img=1"}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-[#e9edef] text-[15px] font-medium">
              {contact.name || contact.contactId}
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
                className={`max-w-[55%] px-3 py-2 rounded-lg text-sm shadow-md
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
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942]"
        >
          <Plus size={26} className="text-zinc-300" />
        </button>

        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942]">
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
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942]">
            <Mic size={26} className="text-zinc-300" />
          </button>
        ) : (
          <button
            onClick={send}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#00A884]"
          >
            <ArrowRight size={22} className="text-white translate-x-[1px]" />
          </button>
        )}
      </div>
    </div>
  );
}
