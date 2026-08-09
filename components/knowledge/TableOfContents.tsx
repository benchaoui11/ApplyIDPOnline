// Zero-JS sticky table of contents. Desktop shows a sticky left rail;
// mobile shows a native <details> disclosure — same link list rendered
// twice via CSS display toggling, matching the codebase's established
// preference for native disclosure widgets over client-side JS.

export type TocEntry = { id: string; label: string };

function TocLinks({ entries }: { entries: TocEntry[] }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
      {entries.map((e) => (
        <li key={e.id}>
          <a
            href={`#${e.id}`}
            style={{
              display: "block",
              padding: "7px 10px",
              borderRadius: "8px",
              fontSize: "13px",
              color: "var(--text-light)",
              fontWeight: 500,
            }}
          >
            {e.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  return (
    <>
      <nav aria-label="Table of contents" className="toc-desktop" style={{ position: "sticky", top: "88px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)", padding: "0 10px", marginBottom: "8px" }}>
          On this page
        </p>
        <TocLinks entries={entries} />
      </nav>

      <details className="toc-mobile" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--white)", padding: "4px 14px" }}>
        <summary style={{ padding: "12px 0", fontSize: "13.5px", fontWeight: 600, color: "var(--navy)", cursor: "pointer" }}>
          Jump to a section
        </summary>
        <div style={{ paddingBottom: "10px" }}>
          <TocLinks entries={entries} />
        </div>
      </details>

      <style>{`
        .toc-desktop { display: none; }
        .toc-mobile { display: block; }
        @media (min-width: 981px) {
          .toc-desktop { display: block; }
          .toc-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
