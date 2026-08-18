/** Decorative dotted code-bracket graphic for section headers. */
export default function CodeBracketGraphic({ className = '' }) {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {bracketDots().map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="2" className="fill-brand-accent/35" />
      ))}
    </svg>
  );
}

function bracketDots() {
  const dots = [];
  const left = [
    [28, 18], [22, 28], [18, 40], [16, 52], [18, 64], [22, 76], [28, 86],
    [36, 20], [34, 84],
  ];
  const slash = [
    [70, 78], [78, 68], [86, 58], [94, 48], [102, 38], [110, 28],
  ];
  const right = [
    [152, 18], [158, 28], [162, 40], [164, 52], [162, 64], [158, 76], [152, 86],
    [144, 20], [146, 84],
  ];
  return dots.concat(left, slash, right);
}
