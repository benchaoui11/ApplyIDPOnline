export default function AnnouncementBar() {
  return (
    <div
      style={{
        background: "var(--navy)",
        color: "#FFFFFF",
      }}
    >
      <div
        className="container announcement-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "9px 24px",
          fontSize: "13px",
          textAlign: "center",
          flexWrap: "nowrap",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" style={{ flexShrink: 0 }} aria-hidden="true">
          <path d="M3 8l9-4 9 4-9 4-9-4z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 8v8l9 4 9-4V8M12 12v8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>Free worldwide shipping.</span>
        <span className="announcement-detail" style={{ opacity: 0.9 }}>
          Every printed International Driving Permit ships to any country at no extra cost.
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .announcement-row { padding: 9px 16px; }
          .announcement-detail { display: none; }
        }
      `}</style>
    </div>
  );
}
