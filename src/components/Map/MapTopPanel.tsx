import type { ReactNode } from "react";

export default function MapTopPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex absolute top-4 left-4 items-center gap-[8px]">
      {children}
    </div>
  );
}
