import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl text-primary">Taskz</h1>
        <p className="text-xl">Collaborate on projects with ease.</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
