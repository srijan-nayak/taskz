import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-xl font-semibold">{children}</h1>;
}
