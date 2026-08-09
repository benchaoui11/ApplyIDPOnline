"use client";

type Spoke = {
  label: string;
  body: string;
  icon: "plane" | "globe" | "layers" | "calendar" | "check" | "tag";
  side: "left" | "right";
  row: 0 | 1 | 2;
};

const ICONS: Record<Spoke["icon"], React.ReactNode> = {
  plane: <path d="M3 13l7-2 3-7 2 1-2 6 6-1 2 2-7 3-1 6-2-1 0-5-6 2-1-2 5-3-6-2z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" strokeWidth="1.7" />
    </>
  ),
  layers: <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" strokeWidth="1.7" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12l8.5-8.5H20v8.5L11.5 21 3 12z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14.5" cy="8.5" r="1.2" fill="#FFFFFF" stroke="none" />
    </>
  ),
};

const SPOKES: Spoke[] = [
  { icon: "plane", label: "No embassy visit", body: "Apply from your phone, no appointment.", side: "left", row: 0 },
  { icon: "globe", label: "Multilingual translation", body: "Readable by border and rental staff abroad.", side: "right", row: 0 },
  { icon: "check", label: "Reviewed by our team", body: "A person checks every application by hand.", side: "left", row: 1 },
  { icon: "layers", label: "Digital or printed", body: "Choose the format that suits your trip.", side: "right", row: 1 },
  { icon: "tag", label: "Clear refund policy", body: "Straightforward terms, published up front.", side: "left", row: 2 },
  { icon: "calendar", label: "1–3 year validity", body: "Pick a term that matches your travel plans.", side: "right", row: 2 },
];

// Fixed coordinate system for the desktop diagram (non-scaling).
const W = 960;
const H = 560;
const CX = 480;
const CY = 280;
const CR = 88;
// Elbow routing stays in the narrow gap right next to the circle so it
// never crosses into the text columns further out.
const BUS_OFFSET = 34;
const ICON_OFFSET = 74;
const ROW_Y = [72, 280, 488];
const ITEM_W = 250;
const ICON_SIZE = 40;
const GAP = 14;

const ICON_LEFT_X = CX - CR - ICON_OFFSET;
const ICON_RIGHT_X = CX + CR + ICON_OFFSET;
const BUS_LEFT = CX - CR - BUS_OFFSET;
const BUS_RIGHT = CX + CR + BUS_OFFSET;

function connectorPath(side: "left" | "right", row: 0 | 1 | 2) {
  const y = ROW_Y[row];
  if (side === "left") {
    const edgeX = CX - CR;
    if (row === 1) return `M ${edgeX} ${CY} H ${ICON_LEFT_X}`;
    return `M ${edgeX} ${CY} H ${BUS_LEFT} V ${y} H ${ICON_LEFT_X}`;
  }
  const edgeX = CX + CR;
  if (row === 1) return `M ${edgeX} ${CY} H ${ICON_RIGHT_X}`;
  return `M ${edgeX} ${CY} H ${BUS_RIGHT} V ${y} H ${ICON_RIGHT_X}`;
}

export default function WhyChooseUsWheel() {
  return (
    <div>
      <div className="wheel-desktop" style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
          {SPOKES.map((s, i) => (
            <path key={i} d={connectorPath(s.side, s.row)} fill="none" stroke="var(--blue)" strokeOpacity="0.45" strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" />
          ))}
          {SPOKES.map((s, i) => {
            const y = ROW_Y[s.row];
            const x = s.side === "left" ? ICON_LEFT_X : ICON_RIGHT_X;
            return <circle key={`dot-${i}`} cx={x} cy={y} r="3" fill="var(--blue)" opacity="0.55" />;
          })}
        </svg>

        <CenterWheel x={CX} y={CY} r={CR} />

        {SPOKES.map((s) => {
          const y = ROW_Y[s.row];
          const isLeft = s.side === "left";
          const iconX = isLeft ? ICON_LEFT_X : ICON_RIGHT_X;
          return (
            <div
              key={s.label}
              style={{
                position: "absolute",
                top: y,
                left: isLeft ? iconX - ICON_SIZE - GAP - ITEM_W : iconX + ICON_SIZE + GAP,
                width: ITEM_W,
                height: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: isLeft ? "row-reverse" : "row",
                  alignItems: "center",
                  gap: `${GAP}px`,
                  textAlign: isLeft ? "right" : "left",
                }}
              >
                <span
                  style={{
                    width: `${ICON_SIZE}px`,
                    height: `${ICON_SIZE}px`,
                    borderRadius: "50%",
                    background: "var(--blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" aria-hidden="true">
                    {ICONS[s.icon]}
                  </svg>
                </span>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.25 }}>{s.label}</p>
                  <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "4px", lineHeight: 1.4 }}>{s.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="wheel-mobile" style={{ display: "none", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {SPOKES.map((s) => (
          <div key={s.label} className="card-elevated" style={{ padding: "16px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" aria-hidden="true">
                {ICONS[s.icon]}
              </svg>
            </span>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--navy)" }}>{s.label}</p>
              <p style={{ fontSize: "11.5px", color: "var(--text-light)", marginTop: "2px" }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1040px) {
          .wheel-desktop { display: none !important; }
          .wheel-mobile { display: grid !important; }
        }
        @media (max-width: 520px) {
          .wheel-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function CenterWheel({ x, y, r }: { x: number; y: number; r: number }) {
  const ringR = r + 14;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        width: ringR * 2,
        height: ringR * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={ringR * 2} height={ringR * 2} viewBox={`0 0 ${ringR * 2} ${ringR * 2}`} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <circle cx={ringR} cy={ringR} r={ringR - 2} fill="none" stroke="var(--blue)" strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="3 6" />
      </svg>

      <div
        style={{
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          background: "var(--navy)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width={r * 1.5} height={r * 1.5} viewBox="0 0 100 100" fill="none" aria-hidden="true">
          {/* steering wheel */}
          <circle cx="50" cy="48" r="30" stroke="#FFFFFF" strokeWidth="5" />
          <circle cx="50" cy="48" r="8" fill="#FFFFFF" />
          <path d="M50 20v18M50 58v18M25 33l16.5 10M58.5 43L75 33M75 63l-16.5-10M41.5 53L25 63" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          {/* simplified hands gripping the wheel, flat abstract shapes */}
          <path d="M18 78c3-13 13-19 20-9 3 4 2 9-2 11-5 2-15 2-18-2z" fill="#85B7EB" opacity="0.9" />
          <path d="M82 78c-3-13-13-19-20-9-3 4-2 9 2 11 5 2 15 2 18-2z" fill="#85B7EB" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}
