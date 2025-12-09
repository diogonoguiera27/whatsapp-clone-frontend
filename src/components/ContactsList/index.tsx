import { Search, Plus, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

import MenuOptions from "../MenuOption";
import { USER_ID, onMessage } from "../../services/socket";
import { listContacts } from "../../services/contacts";




export type ContactResponse = {
  id: string;
  contactId: string;
  name: string | null;
  avatarUrl: string | null;
  lastMessage: string;
  lastMessageTime: string | null;
  conversationId?: string | null;
};

export type ContactItem = {
  id: string;
  contactId: string;
  name: string | null;
  avatarUrl: string | null;
  lastMessage: string;
  lastMessageTime: string | null;
  conversationId: string | null;
};
interface ContactsListProps {
  onSelectContact: (contact: ContactItem) => void;
}

export default function ContactsList({ onSelectContact }: ContactsListProps) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  async function loadContacts() {
    try {
      const data: ContactResponse[] = await listContacts(USER_ID);

      const formatted: ContactItem[] = data.map((c: ContactResponse) => ({
        id: c.id,
        contactId: c.contactId,
        name: c.name,
        avatarUrl: c.avatarUrl,
        lastMessage: c.lastMessage,
        lastMessageTime: c.lastMessageTime,
        conversationId: c.conversationId ?? null,
      }));

      setContacts(formatted);
    } catch (error) {
      console.error("❌ ERRO ao carregar contatos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  
  useEffect(() => {
    const unsub = onMessage((msg) => {
      console.log("📩 [CONTACTLIST] Socket recebido:", msg);

      if (msg.type === "message") {
        setContacts((prev: ContactItem[]) =>
          prev.map((c: ContactItem) => {
            if (c.conversationId !== msg.conversationId) return c;

            return {
              ...c,
              lastMessage: msg.text,
              lastMessageTime: msg.time,
            };
          })
        );
      }

      if (msg.type === "new-message") {
        loadContacts(); 
      }
    });

    return () => unsub();
  }, []);

 
  const filteredContacts = contacts.filter((c: ContactItem) =>
    (c.name || c.contactId)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  
  return (
    <div className="w-[510px] h-full flex flex-col bg-[#111b21] border-r border-[#2a3942]">
      
      
      <header className="w-full h-[64px] bg-[#111b21] px-5 py-3 flex items-center justify-between border-b border-[#2a3942]">
        <span className="text-[#e9edef] font-semibold text-[20px]">
          WhatsApp
        </span>

        <div className="flex items-center gap-2">
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-md hover:bg-[#202c33] cursor-pointer">
            <Plus size={24} className="text-[#e9edef]" />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-md hover:bg-[#202c33]"
            >
              <MoreVertical size={24} className="text-[#e9edef]" />
            </button>

            <MenuOptions isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      </header>

      <div className="px-5 mt-2 mb-2">
        <div className="relative w-full rounded-2xl">
          <Search
            size={18}
            className="text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2"
          />

          <input
            type="text"
            placeholder="Pesquisar ou começar nova conversa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[40px] bg-[#202c33] text-[#e9edef] text-sm rounded-lg pl-[46px] pr-4 outline-none"
          />
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <p className="text-center text-zinc-400 mt-4">
            Carregando contatos...
          </p>
        )}

        {!loading && filteredContacts.length === 0 && (
          <p className="text-center text-zinc-400 mt-4">
            Nenhum contato encontrado
          </p>
        )}

        {filteredContacts.map((c: ContactItem) => (
          <div
            key={c.id}
            onClick={() => onSelectContact(c)}
            className="flex items-center px-3 py-3 hover:bg-[#202c33] cursor-pointer"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
