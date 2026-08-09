const ICONS: Record<string, React.ReactNode> = {
  shield: (
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12l8.5-8.5H20v8.5L11.5 21 3 12z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  message: (
    <path d="M4 5h16v11H8l-4 4V5z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  plane: (
    <path d="M3 13l7-2 3-7 2 1-2 6 6-1 2 2-7 3-1 6-2-1 0-5-6 2-1-2 5-3-6-2z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" strokeWidth="1.6" />
    </>
  ),
  layers: (
    <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  route: (
    <>
      <circle cx="5.5" cy="6" r="2" strokeWidth="1.6" />
      <circle cx="18.5" cy="18" r="2" strokeWidth="1.6" />
      <path d="M5.5 8v3a4 4 0 004 4h5a4 4 0 014 4v1" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  phone: (
    <path
      d="M6 3.5h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2.2 2C10.5 18.2 5.8 13.5 4 7.2A2 2 0 016 3.5z"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  link: (
    <>
      <path d="M9.5 14.5l5-5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 6.5l1.5-1.5a3.5 3.5 0 015 5L16 11.5M13 17.5L11.5 19a3.5 3.5 0 01-5-5L8 12.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  steering: (
    <>
      <circle cx="12" cy="12" r="8" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" strokeWidth="1.6" />
      <path d="M12 4v5.8M6.3 15l4.9-2.8M17.7 15l-4.9-2.8" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h9l3 3v14a1 1 0 01-1 1H6a1 1 0 01-1-1v-16a1 1 0 011-1z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 11.5l2 2 4-4.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.4" strokeWidth="1.6" />
    </>
  ),
};

export default function IconBadge({ name, size = 20 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <span
      style={{
        width: `${size + 20}px`,
        height: `${size + 20}px`,
        borderRadius: "10px",
        background: "var(--blue-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--blue)">
        {ICONS[name]}
      </svg>
    </span>
  );
}
