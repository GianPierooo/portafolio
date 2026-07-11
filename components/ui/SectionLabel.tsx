/**
 * SectionLabel — acento de ingeniero en mono: `// nombre_de_seccion`.
 * Refuerza la identidad técnica sin ruido visual.
 */
export default function SectionLabel({
  children,
  color = '#06b6d4',
  className = '',
}: {
  children: string;
  color?: string;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-sm tracking-widest ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      {'// '}
      {children}
    </p>
  );
}
