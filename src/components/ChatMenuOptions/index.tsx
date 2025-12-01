import React, { useEffect, useRef } from "react";
import {
  Info,
  CheckSquare,
  BellOff,
  Timer,
  Heart,
  XCircle,
  Link,
  CalendarClock,
  Users,
  Flag,
  Ban,
  Trash2,
  Trash,
} from "lucide-react";

interface ChatMenuOptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatMenuOptions({
  isOpen,
  onClose,
}: ChatMenuOptionsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="
        absolute right-0 top-[48px]
        bg-[#202c33] w-[300px]
        rounded-xl shadow-xl border border-[#2a3942]
        z-50 overflow-hidden animate-fadeIn
      "
    >
      <ul className="text-[#e9edef] text-[15px]">
        <MenuItem icon={<Info size={18} />} label="Dados do contato" />
        <MenuItem icon={<CheckSquare size={18} />} label="Selecionar mensagens" />
        <MenuItem icon={<BellOff size={18} />} label="Silenciar notificações" />
        <MenuItem icon={<Timer size={18} />} label="Mensagens temporárias" />
        <MenuItem icon={<Heart size={18} />} label="Adicionar aos favoritos" />
        <MenuItem icon={<XCircle size={18} />} label="Fechar conversa" />

        <Divider />

        <MenuItem icon={<Link size={18} />} label="Enviar link de ligação" />
        <MenuItem icon={<CalendarClock size={18} />} label="Programar ligação" />
        <MenuItem icon={<Users size={18} />} label="Nova ligação em grupo" />

        <Divider />

        <MenuItem icon={<Flag size={18} />} label="Denunciar" />
        <MenuItem icon={<Ban size={18} />} label="Bloquear" />
        <MenuItem icon={<Trash2 size={18} />} label="Limpar conversa" />
        <MenuItem icon={<Trash size={18} />} label="Apagar conversa" className="text-red-400" />
      </ul>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <li
      className={`flex items-center gap-4 px-5 py-[14px] hover:bg-[#2a3942] cursor-pointer transition ${className}`}
    >
      {icon}
      <span>{label}</span>
    </li>
  );
}

function Divider() {
  return <div className="w-full h-[1px] bg-[#2a3942]" />;
}
