export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface border border-border text-text-muted hover:text-accent hover:border-accent/50 transition-colors">
      {label}
    </span>
  );
}
