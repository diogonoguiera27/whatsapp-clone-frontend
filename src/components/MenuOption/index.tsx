import { useEffect, useRef } from "react";
import {
  Users,
  Star,
  CheckSquare,
  Lock,
  LogOut,
} from "lucide-react";

interface OptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOptions({ isOpen, onClose }: OptionsMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Não renderiza se estiver fechado

  return (
    <div
      ref={menuRef}
      className="
        absolute right-3 top-[70px]
        bg-[#202c33] w-[260px]
        rounded-lg shadow-xl border border-[#2a3942]
        z-50 overflow-hidden animate-fadeIn
      "
    >
      {/* Item */}
      <button
        onClick={onClose}
        className="flex items-center cursor-pointer gap-3 w-full text-left text-[#e9edef] px-4 py-3 hover:bg-[#2a3942]"
      >
        <Users size={18} /> Novo grupo
      </button>

      <button
        onClick={onClose}
        className="flex items-center cursor-pointer gap-3 w-full text-left text-[#e9edef] px-4 py-3 hover:bg-[#2a3942]"
      >
        <Star size={18} /> Mensagens favoritas
      </button>

      <button
        onClick={onClose}
        className="flex items-center cursor-pointer gap-3 w-full text-left text-[#e9edef] px-4 py-3 hover:bg-[#2a3942]"
      >
        <CheckSquare size={18} /> Selecionar conversas
      </button>

      <div className="border-t border-[#2a3942]" />

      <button
        onClick={onClose}
        className="flex items-center cursor-pointer gap-3 w-full text-left text-[#e9edef] px-4 py-3 hover:bg-[#2a3942]"
      >
        <Lock size={18} /> Bloqueio do app
      </button>

      <button
        onClick={onClose}
        className="flex items-center cursor-pointer gap-3 w-full text-left text-red-400 px-4 py-3 hover:bg-[#2a3942]"
      >
        <LogOut size={18} /> Desconectar
      </button>
    </div>
  );
}
