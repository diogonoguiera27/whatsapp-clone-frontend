import {
  FileText,
  Image,
  Camera,
  Headphones,
  Contact,
  BarChart2,
  Calendar,
  Sticker,
} from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>; 
  onClose: () => void;
};

export default function ChatAttachMenu({ isOpen, anchorRef, onClose }: Props) {
  const [pos, setPos] = useState({ left: 0, bottom: 0 });

  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();

    setPos({
      left: rect.left,
      bottom: window.innerHeight - rect.top + 5,
    });
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute z-50"
        style={{
          left: pos.left,
          bottom: pos.bottom,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[260px] bg-[#202c33] rounded-2xl shadow-xl border border-[#2a3942] py-2">
          <MenuItem icon={<FileText color="#B872FF" />} label="Documento" />
          <MenuItem icon={<Image color="#26A8E0" />} label="Fotos e vídeos" />
          <MenuItem icon={<Camera color="#FF4F70" />} label="Câmera" />
          <MenuItem icon={<Headphones color="#FF8F00" />} label="Áudio" />
          <MenuItem icon={<Contact color="#34D399" />} label="Contato" />
          <MenuItem icon={<BarChart2 color="#1DA1F2" />} label="Enquete" />
          <MenuItem icon={<Calendar color="#E9C46A" />} label="Evento" />
          <MenuItem icon={<Sticker color="#22C55E" />} label="Nova figurinha" />
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-[12px] hover:bg-[#2a3942] cursor-pointer rounded-lg">
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      <span className="text-[#e9edef] text-[15px]">{label}</span>
    </div>
  );
}
