import { Search, Plus, MoreVertical } from "lucide-react";
import { useState } from "react";
import MenuOptions from "../MenuOption";

export default function ContactsList() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const conversations = [
    {
      id: 1,
      name: "Amor ❤️🤍",
      avatar: "https://i.pravatar.cc/150?img=47",
      lastMessage: "kkkkkk",
      time: "13:34",
      unread: 1,
    },
    {
      id: 2,
      name: "Você (você)",
      avatar: "https://i.pravatar.cc/150?img=32",
      lastMessage: "Vídeo • 1:00",
      time: "Ontem",
      unread: 0,
    },
    {
      id: 3,
      name: "Tayllan",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastMessage: "Reagiu com 👍",
      time: "Segunda-feira",
      unread: 0,
    },
  ];
  const filters = [
    { id: "all", label: "Tudo" },
    { id: "unread", label: "Não lidas" },
    { id: "favorites", label: "Favoritas" },
    { id: "groups", label: "Grupos" },
  ];

  return (
    <div className="w-[510px] h-full flex flex-col bg-[#111b21] border-r border-[#2a3942]">
      <header className="w-full h-[64px] bg-[#111b21] px-5 py-3 flex items-center justify-between border-b border-[#2a3942]">
        <span className="text-[#e9edef] font-semibold text-[20px] leading-none">
          WhatsApp
        </span>

        <div className="flex items-center gap-2">
          <button className="w-[40px] h-[40px] flex cursor-pointer items-center justify-center rounded-md hover:bg-[#202c33]">
            <Plus size={24} className="text-[#e9edef]" />
          </button>

          {/* WRAPPER RESPONSÁVEL POR POSICIONAR O MENU */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-[40px] h-[40px] flex items-center cursor-pointer justify-center rounded-md hover:bg-[#202c33]"
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
            className="text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Pesquisar ou começar nova conversa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-[469px] h-[40px]
              bg-[#202c33]
              text-[#e9edef]
              text-sm
              rounded-lg
              pl-[46px]   /* distância da lupa */
              pr-4
              outline-none
            "
          />
        </div>
      </div>

      <div className="px-5 w-full">
        <div className="flex gap-2 h-[44px] items-center">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`
                px-4 py-[6px] text-sm rounded-full transition-all
                text-[#e9edef] 
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

      <div className="flex-1 overflow-y-auto">
        {conversations.map((c) => (
          <div
            key={c.id}
            className="flex items-center px-3 py-3 hover:bg-[#202c33] cursor-pointer transition-colors"
          >
            <img
              src={c.avatar}
              alt={c.name}
              className="w-[52px] h-[52px] rounded-full mr-3 object-cover"
            />

            <div className="flex-1 border-b border-[#2a3942] pb-3">
              <div className="flex justify-between">
                <p className="text-[#e9edef] font-medium">{c.name}</p>
                <span className="text-xs text-zinc-400">{c.time}</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[13px] text-zinc-400 truncate max-w-[280px]">
                  {c.lastMessage}
                </p>

                {c.unread > 0 && (
                  <span className="bg-[#25d366] text-black text-[11px] px-[6px] py-[1px] rounded-full font-semibold">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
