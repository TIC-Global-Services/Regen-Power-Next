export function LoadingScreen({
  progress,
  fadeOut,
}: {
  progress: number;
  fadeOut: boolean;
}) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        style={{ animation: "guide-in 0.4s cubic-bezier(0.16,1,0.3,1)" }}
        className="flex w-56 flex-col items-center gap-3"
      >
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/12">
          <div
            style={{ width: `${progress * 100}%`, transition: "width 0.4s ease" }}
            className="h-full rounded-full bg-white"
          />
        </div>
        <div className="flex w-full items-center justify-between text-xs font-medium">
          <span className="tracking-[0.2em] text-white/40 uppercase">Loading</span>
          <span className="text-white/70">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
