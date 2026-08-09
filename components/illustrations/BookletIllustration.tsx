import { VehicleIcon } from "@/components/VehicleIcons";

export default function BookletIllustration() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} role="img" aria-label="Illustration of an International Driving Permit booklet showing personal detail fields, photo, signature, and vehicle categories">
      <rect width="480" height="360" fill="var(--surface)" />
      <rect x="40" y="40" width="400" height="280" rx="12" fill="#FFFFFF" stroke="var(--border)" />
      <rect x="40" y="40" width="14" height="280" rx="4" fill="var(--navy)" />

      {/* Header with seal icon */}
      <circle cx="90" cy="68" r="13" fill="var(--blue)" />
      <path d="M84 68l4.5 4.5L96 63" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="112" y="65" fontFamily="var(--font-display)" fontSize="15.5" fontWeight="700" fill="var(--navy)">
        International Driving Permit
      </text>
      <text x="112" y="80" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-light)" letterSpacing="0.04em">
        1949 GENEVA · 1968 VIENNA CONVENTION
      </text>
      <line x1="76" y1="94" x2="416" y2="94" stroke="var(--border)" />

      {/* Left column: numbered fields */}
      {[
        ["1", "Full name"],
        ["2", "Country of birth"],
        ["3", "Date of birth"],
        ["4", "Country of residence"],
      ].map(([n, label], i) => (
        <g key={n} transform={`translate(76, ${118 + i * 32})`}>
          <rect width="20" height="20" rx="5" fill="var(--blue-50)" />
          <text x="10" y="14" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--blue)" textAnchor="middle">
            {n}
          </text>
          <text x="32" y="14" fontFamily="var(--font-body)" fontSize="12.5" fill="var(--text-light)">
            {label}
          </text>
          <line x1="150" y1="10" x2="222" y2="10" stroke="var(--border)" />
        </g>
      ))}

      {/* Right column: photo + signature */}
      <rect x="326" y="118" width="66" height="78" rx="8" fill="var(--blue-50)" stroke="var(--border)" />
      <circle cx="359" cy="145" r="12" fill="var(--blue)" opacity="0.85" />
      <path d="M340 184c0-11 8.5-17 19-17s19 6 19 17" fill="var(--blue)" opacity="0.85" />

      <text x="326" y="214" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-light)" letterSpacing="0.04em">
        SIGNATURE
      </text>
      <path
        d="M326 226c4-6 7 5 11-1 3-5 5 4 9-1 3-4 6 3 10-2 4-5 6 4 10-1"
        stroke="var(--navy)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="326" y1="234" x2="392" y2="234" stroke="var(--border)" />

      {/* Vehicle categories with icons */}
      <text x="76" y="248" fontFamily="var(--font-mono)" fontSize="10.5" fontWeight="600" fill="var(--text-light)" letterSpacing="0.05em">
        VEHICLE CATEGORIES
      </text>
      {(["A", "B", "C", "D", "E"] as const).map((cat, i) => (
        <g key={cat} transform={`translate(${76 + i * 63}, 258)`}>
          <rect width="52" height="42" rx="9" fill="var(--white)" stroke="var(--border)" />
          <g transform="translate(9, 7)" color="var(--navy)">
            <VehicleIcon code={cat} size={16} />
          </g>
          <text x="41" y="19" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="var(--navy)" textAnchor="middle">
            {cat}
          </text>
          <line x1="8" y1="30" x2="44" y2="30" stroke="var(--border)" strokeWidth="0.75" />
          <rect x="8" y="33" width="18" height="4" rx="2" fill="var(--success-bg)" />
        </g>
      ))}
    </svg>
  );
}
