import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Taskz",
  description: "Collaborate on projects with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
