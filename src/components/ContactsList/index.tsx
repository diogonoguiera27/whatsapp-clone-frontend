import { Search, Plus, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

import MenuOptions from "../MenuOption";
import { USER_ID, onMessage } from "../../services/websocket";
import { listContacts } from "../../services/contacts";

/* ======================================================
   TIPAGEM DO BACKEND
====================================================== */
type ContactResponse = {
  id: string;
  contactId: string;
  name: string | null;
  avatarUrl: string | null;
  lastMessage: string;
  lastMessageTime: string | null;
  conversationId?: string | null;
  unreadCount?: number;
};

/* ======================================================
   TIPAGEM FRONTEND
====================================================== */
export type ContactItem = {
  id: string;
  contactId: string;
  name: string | null;
  avatarUrl: string | null;
  lastMessage: string;
  lastMessageTime: string | null;
  conversationId: string | null;
  unreadCount: number;
};

/* ======================================================
   PROPS
====================================================== */
interface ContactsListProps {
  onSelectContact: (contact: ContactItem) => void;
}

/* ======================================================
   COMPONENTE PRINCIPAL
====================================================== */
export default function ContactsList({ onSelectContact }: ContactsListProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     🔵 CARREGAR CONTATOS
  ====================================================== */
  async function loadContacts() {
    console.log("🔄 [CONTACTLIST] Atualizando lista de contatos...");

    try {
      const data: ContactResponse[] = await listContacts(USER_ID);

      const formatted: ContactItem[] = data.map((c) => ({
        id: c.id,
        contactId: c.contactId,
        name: c.name,
        avatarUrl: c.avatarUrl,
        lastMessage: c.lastMessage,
        lastMessageTime: c.lastMessageTime,
        conversationId: c.conversationId ?? null,
        unreadCount: c.unreadCount ?? 0,
      }));

      console.log("📌 [CONTACTLIST] Contatos formatados:", formatted);
      setContacts(formatted);

    } catch (error) {
      console.error("❌ [CONTACTLIST] Erro ao carregar contatos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  /* ======================================================
     🔵 WEBSOCKET TEMPO REAL
  ====================================================== */
  useEffect(() => {
    console.log("🟣 [CONTACTLIST] Listener WS instalado");

    const unsub = onMessage((msg) => {
      console.log("📩 [CONTACTLIST] WS recebido:", msg);

      // Nova mensagem em qualquer conversa
      if (msg.type === "message") {
        console.log("🔔 [CONTACTLIST] Chegou mensagem — atualizando lista");

        setContacts((prev) =>
          prev.map((c) =>
            c.conversationId === msg.conversationId
              ? {
                  ...c,
                  lastMessage: msg.text,
                  lastMessageTime: msg.time,
                  unreadCount: c.contactId === msg.from ? c.unreadCount + 1 : c.unreadCount,
                }
              : c
          )
        );
      }

      // Backend notificou atualização de unreadCount
      if (msg.type === "update-unread") {
        console.log("🔵 [CONTACTLIST] update-unread recebido:", msg);

        setContacts((prev) =>
          prev.map((c) =>
            c.conversationId === msg.conversationId
              ? { ...c, unreadCount: msg.unreadCount }
              : c
          )
        );
      }
    });

    return () => {
      console.log("🧹 [CONTACTLIST] Listener destruído");
      unsub();
    };
  }, []);

  /* ======================================================
     🔵 FILTROS
  ====================================================== */
  const filters = [
    { id: "all", label: "Tudo" },
    { id: "unread", label: "Não lidas" },
    { id: "favorites", label: "Favoritas" },
    { id: "groups", label: "Grupos" },
  ];

  const filteredContacts =
    activeFilter === "unread"
      ? contacts.filter((c) => c.unreadCount > 0)
      : contacts;

  /* ======================================================
     🔥 RENDERIZAÇÃO
  ====================================================== */
  return (
    <div className="w-[510px] h-full flex flex-col bg-[#111b21] border-r border-[#2a3942]">

      {/* HEADER */}
      <header className="w-full h-[64px] bg-[#111b21] px-5 py-3 flex items-center justify-between border-b border-[#2a3942]">
        <span className="text-[#e9edef] font-semibold text-[20px]">WhatsApp</span>

        <div className="flex items-center gap-2">
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-md hover:bg-[#202c33] cursor-pointer">
            <Plus size={24} className="text-[#e9edef]" />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-md hover:bg-[#202c33] cursor-pointer"
            >
              <MoreVertical size={24} className="text-[#e9edef]" />
            </button>

            <MenuOptions isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <div className="px-5 mt-2 mb-2">
        <div className="relative w-full rounded-2xl">
          <Search
            size={18}
            className="text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Pesquisar ou começar nova conversa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[469px] h-[40px] bg-[#202c33] text-[#e9edef] text-sm rounded-lg pl-[46px] pr-4 outline-none"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="px-5 w-full">
        <div className="flex gap-2 h-[44px] items-center">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`
                px-4 py-[6px] text-sm rounded-full transition-all text-[#e9edef]
                ${
                  activeFilter === f.id
                    ? "bg-[#202c33] border border-[#202c33]"
                    : "border border-[#2a3942] hover:bg-[#202c33]"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTACT LIST */}
      <div className="flex-1 overflow-y-auto">

        {loading && (
          <p className="text-center text-zinc-400 mt-4">
            Carregando contatos...
          </p>
        )}

        {!loading && filteredContacts.length === 0 && (
          <p className="text-center text-zinc-400 mt-4">Nenhum contato encontrado</p>
        )}

        {filteredContacts.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              console.log("🟢 [CONTACTLIST] Abrindo contato:", c);
              onSelectContact(c);

              // Zera unread visual (o backend ainda notificará via WS)
              setContacts((prev) =>
                prev.map((item) =>
                  item.id === c.id ? { ...item, unreadCount: 0 } : item
                )
              );
            }}
            className="flex items-center px-3 py-3 hover:bg-[#202c33] cursor-pointer transition-colors"
          >
            <img
              src={c.avatarUrl || "https://i.pravatar.cc/150?img=1"}
              className="w-[52px] h-[52px] rounded-full mr-3 object-cover"
            />

            <div className="flex-1 border-b border-[#2a3942] pb-3 relative">
              <div className="flex justify-between">
                <p className="text-[#e9edef] font-medium">
                  {c.name || c.contactId}
                </p>

                <span className="text-xs text-zinc-400">
                  {c.lastMessageTime
                    ? new Date(c.lastMessageTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              <p className="text-[13px] text-zinc-400 truncate">
                {c.lastMessage || "Sem mensagens"}
              </p>

              {/* BOLINHA VERDE */}
              {c.unreadCount > 0 && (
                <span className="absolute right-2 top-5 bg-[#00A884] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {c.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
