export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-text mb-2">{title}</h2>
      <div className="h-1 w-12 bg-accent rounded-full mb-4"></div>
      {subtitle && <p className="text-text-muted text-lg">{subtitle}</p>}
    </div>
  );
}
