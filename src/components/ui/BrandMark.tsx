type BrandMarkProps = {
  size?: number;
  spinning?: boolean;
  className?: string;
};

/**
 * Mascote Mico Leão: exibe o mascote da marca no app.
 */
export function BrandMark({
  size = 96,
  spinning = false,
  className = "",
}: BrandMarkProps) {
  return (
    <img
      src="/mascote.png"
      alt="Mascote Mico Leão"
      width={size}
      height={size}
      className={`rounded-2xl object-contain ${spinning ? "animate-spin-slow" : ""} ${className}`}
      role="img"
    />
  );
}
