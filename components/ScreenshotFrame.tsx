import Image from "next/image";

export default function ScreenshotFrame({
  src,
  alt,
  priority,
  children,
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        background: "var(--white)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 14px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
        aria-hidden="true"
      >
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }} />
      </div>
      <div style={{ position: "relative", aspectRatio: "4 / 3.1", background: "var(--surface)" }}>
        {children ? (
          children
        ) : src ? (
          <Image src={src} alt={alt ?? ""} fill priority={priority} style={{ objectFit: "contain" }} sizes="(max-width: 880px) 100vw, 33vw" />
        ) : null}
      </div>
    </div>
  );
}
