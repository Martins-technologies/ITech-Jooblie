/** Decorative dotted Canada-map graphic. Purely visual. */
export default function CanadaMapDecor({ className = '' }) {
  return (
    <svg
      viewBox="0 0 220 140"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {[
        [40, 90], [55, 70], [70, 58], [88, 50], [105, 48], [122, 55],
        [138, 62], [155, 58], [170, 70], [185, 85], [60, 95], [80, 82],
        [100, 75], [118, 80], [140, 88], [90, 100], [110, 108], [130, 100],
        [75, 40], [95, 32], [115, 28], [135, 36],
      ].map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="2.2" className="fill-brand-accent/50" />
      ))}
      {[
        [95, 32, 18],
        [135, 36, 28],
        [170, 70, 22],
        [55, 70, 16],
      ].map(([x, y, height], index) => (
        <g key={`pin-${index}`}>
          <line
            x1={x}
            y1={y}
            x2={x}
            y2={y - height}
            className="stroke-brand-accent/40"
            strokeWidth="1"
          />
          <circle cx={x} cy={y - height} r="3.5" className="fill-brand-accent" />
        </g>
      ))}
    </svg>
  );
}
