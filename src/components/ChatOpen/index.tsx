import { Search, MoreVertical, Smile, Mic, Plus } from "lucide-react";
import { useRef, useState } from "react";

import ChatMenuOptions from "../ChatMenuOptions";
import ChatAttachMenu from "../ChatAttachMenu"; 

export default function ChatOpen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);

  const attachButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedChat = {
    name: "+55 62 8143-0322",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastSeen: "visto por último hoje às 15:44",
    messages: [
      { id: 1, from: "them", text: "Quais são os requisitos para alugar uma moto?", time: "13:48" },
      { id: 2, from: "me", text: "Oi", time: "14:44" },
      { id: 3, from: "me", text: "Como posso te ajudar ?", time: "15:08" },
    ],
  };

  return (
    <div className="flex-1 h-full bg-[#0b141a] flex flex-col relative">

      
      <ChatAttachMenu
        isOpen={attachOpen}
        anchorRef={attachButtonRef}   
        onClose={() => setAttachOpen(false)}
      />

      
      <header className="w-full h-[64px] bg-[#202c33] border-b border-[#2a3942] flex items-center justify-between relative">

        <div className="flex items-center gap-3 pl-4">
          <img src={selectedChat.avatar} className="w-10 h-10 rounded-full object-cover" />

          <div className="flex flex-col leading-tight">
            <span className="text-[#e9edef] text-[15px] font-medium">{selectedChat.name}</span>
            <span className="text-xs text-zinc-400">{selectedChat.lastSeen}</span>
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

            <ChatMenuOptions
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
            />
          </div>
        </div>
      </header>

      
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
          {selectedChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`
                max-w-[55%] px-3 py-2 rounded-lg text-sm shadow-md
                ${
                  msg.from === "me"
                    ? "bg-[#005c4b] text-white self-end"
                    : "bg-[#202c33] text-[#e9edef] self-start"
                }
              `}
            >
              {msg.text}
              <div className="text-[10px] text-gray-300 flex justify-end mt-1">{msg.time}</div>
            </div>
          ))}
        </div>
      </div>

      
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
          className="flex-1 bg-[#2a3942] text-[#e9edef] px-4 py-3 rounded-lg outline-none placeholder:text-zinc-400"
        />

        
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#2a3942] transition cursor-pointer">
          <Mic size={26} className="text-zinc-300" />
        </button>
      </div>
    </div>
  );
}
