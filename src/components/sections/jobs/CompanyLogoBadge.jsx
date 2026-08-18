const PALETTE = ['#1d4ed8', '#0f766e', '#7c3aed', '#b45309', '#be123c', '#0369a1'];

function initialsFromName(name) {
  const parts = name.replace(/[()]/g, '').split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function colorFromName(name) {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

export default function CompanyLogoBadge({ company }) {
  const initials = initialsFromName(company);
  const background = colorFromName(company);

  return (
    <div
      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl text-white shadow-sm"
      style={{ backgroundColor: background }}
      aria-hidden="true"
    >
      <span className="text-lg font-bold leading-none">{initials}</span>
    </div>
  );
}
