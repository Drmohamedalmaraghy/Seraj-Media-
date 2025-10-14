import { cn } from "@/lib/styles"

export default function ScrollArrow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative flex h-14 w-8 items-start justify-center overflow-hidden rounded-full border-2 border-white/70 p-1">
        <div
          className="h-3 w-1.5 rounded-full bg-[#EC2426]"
          style={{ animation: "scrollAnim 1.2s infinite" }}
        />
      </div>

      <style>{`
        @keyframes scrollAnim {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(50px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
