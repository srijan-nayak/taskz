import { ReactNode } from "react";

export default function MainHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">{children}</div>
  );
}
