import { useState } from "react";
import TooltipButton from "../TooltipButton";
import { Cog, MessageCircleMore, MessageSquareText, Radar, Users } from "lucide-react";

const SideBar01 = () => {
   const [active, setActive] = useState("messages");

    

  return (
    <div className="w-full h-screen flex bg-[#0b141a]">

      <div className="w-[72px] h-full bg-[#111b21] flex flex-col justify-between items-center py-4">

       
        <div className="flex flex-col items-center gap-4">

            
          <TooltipButton
            tooltip="Conversas"
            selected={active === "messages"}
            onClick={() => setActive("messages")}
          >
            <MessageSquareText size={22} />
          </TooltipButton>

          
          <TooltipButton
            tooltip="Status"
            selected={active === "status"}
            onClick={() => setActive("status")}
          >
            <Radar size={22} />
          </TooltipButton>

          

         
          <TooltipButton
            tooltip="Canais"
            selected={active === "channels"}
            onClick={() => setActive("channels")}
          >
            <MessageCircleMore size={22} />
          </TooltipButton>

          
          <TooltipButton
            tooltip="Comunidades"
            selected={active === "groups"}
            onClick={() => setActive("groups")}
          >
            <Users size={22} />
          </TooltipButton>
        </div>

        
        <div className="flex flex-col items-center gap-4">

          
          <TooltipButton
            tooltip="Configurações"
            selected={active === "settings"}
            onClick={() => setActive("settings")}
          >
            <Cog size={22} />
          </TooltipButton>

          
          <div className="relative group">
            <img
              src="/mm.jpg"
              alt="User avatar"
              className={`
                w-10 h-10 rounded-full cursor-pointer transition-opacity
                hover:opacity-80
                ${active === "profile" ? "ring-2 ring-zinc-500" : ""}
              `}
              onClick={() => setActive("profile")}
            />

            
            <div
              className="
                absolute left-14 top-1/2 -translate-y-1/2 
                whitespace-nowrap px-3 py-1 rounded-md
                bg-white text-black text-sm shadow-md border
                opacity-0 group-hover:opacity-100
                transition-opacity pointer-events-none
              "
            >
              Perfil
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex-1"></div>
    </div>
  )
}

export default SideBar01