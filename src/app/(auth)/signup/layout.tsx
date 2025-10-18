import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <header className="p-4">
        <nav>
          <Link href="/" className="font-semibold">
            Taskz
          </Link>
        </nav>
      </header>
      <Separator />
      <main className="flex flex-col items-center justify-center grow py-8">
        {children}
      </main>
    </>
  );
}
