import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Portfolio",
  description: "Admin panel for managing portfolio content",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {children}
    </div>
  );
}
