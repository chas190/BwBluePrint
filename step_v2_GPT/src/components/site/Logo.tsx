/**
 * STEP logo — geometric S, T, P with a segmented E (blue middle bar).
 * Built as a replaceable vector reference. To use a master file, swap this
 * component's body for <img src={masterLogo} /> keeping the same props.
 */
export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 192 48" className={className} role="img" aria-label="STEP">
      <g fill="none" stroke="var(--on-dark)" strokeWidth="8" strokeLinejoin="miter">
        <path d="M42 8H8v16h28v16H0" />
        <path d="M50 8h40M70 8v36" />
        <path d="M100 8h38M100 40h38" />
        <path d="M152 44V8h24a12 12 0 0 1 0 24h-24" />
      </g>
      <path d="M100 24h38" stroke="var(--primary)" strokeWidth="8" />
    </svg>
  );
}
