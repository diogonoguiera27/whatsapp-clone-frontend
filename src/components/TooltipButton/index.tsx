 export function TooltipButton({
  children,
  tooltip,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  tooltip: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`
          w-12 h-12 flex items-center justify-center cursor-pointer rounded-xl transition-colors
          ${
            selected
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:bg-zinc-700"
          }
        `}
      >
        {children}
      </button>
      <div
        className="
          absolute left-14 top-1/2 -translate-y-1/2 
          whitespace-nowrap px-3 py-1 rounded-md
          bg-white text-black text-sm shadow-md border
          opacity-0 group-hover:opacity-100
          transition-opacity pointer-events-none
        "
      >
        {tooltip}
      </div>
    </div>
  );
}
export default TooltipButton;