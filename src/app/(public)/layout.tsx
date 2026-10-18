import Navbar from '@/components/Navbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg text-text flex flex-col flex-grow">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
