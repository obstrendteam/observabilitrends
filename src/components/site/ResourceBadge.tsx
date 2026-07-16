
interface Props {
  children: React.ReactNode;
}

export function ResourceBadge({ children }: Props) {
  return (
    <span className="mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
      {children}
    </span>
  );
}
