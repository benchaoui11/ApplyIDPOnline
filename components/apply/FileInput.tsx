"use client";

import { useRef, useState } from "react";

export default function FileInput({
  id,
  label,
  hint,
  onFile,
  guide,
  exampleCaption,
  capture,
}: {
  id: string;
  label: string;
  hint: string;
  onFile: (file: File | null) => void;
  guide?: React.ReactNode;
  exampleCaption?: string;
  capture?: "user" | "environment";
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0] ?? null;
    setFileName(file?.name ?? null);
    setPreview(file ? URL.createObjectURL(file) : null);
    onFile(file);
  }

  const filled = !!preview;

  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "var(--navy)", marginBottom: "10px" }}>
        {label}
      </label>
      <div className="upload-field" style={{ display: "grid", gridTemplateColumns: guide ? "160px 1fr" : "1fr", gap: "18px", alignItems: "stretch", minWidth: 0 }}>
        {guide && (
          <div
            style={{
              position: "relative",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              padding: "14px",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "var(--text-light)",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                padding: "3px 9px",
              }}
            >
              EXAMPLE
            </span>
            <div style={{ marginTop: "10px", borderRadius: "var(--radius-sm)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>{guide}</div>
            {exampleCaption && (
              <p style={{ marginTop: "8px", fontSize: "11px", fontWeight: 600, color: "var(--text-light)", textAlign: "center" }}>{exampleCaption}</p>
            )}
          </div>
        )}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          style={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "24px 18px",
            borderRadius: "var(--radius)",
            border: filled ? "1.5px solid var(--success)" : dragOver ? "1.5px dashed var(--blue)" : "1.5px dashed var(--border)",
            background: filled ? "var(--success-bg)" : dragOver ? "var(--blue-50)" : "var(--surface)",
            textAlign: "center",
            transition: "border-color 0.15s ease, background 0.15s ease",
          }}
        >
          {filled && preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "10px", boxShadow: "var(--shadow-sm)" }} />
          ) : (
            <span
              aria-hidden="true"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, var(--blue) 0%, var(--navy) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v10M6 9l4-4 4 4M4 16h12" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}

          {filled ? (
            <>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 700, color: "var(--success)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="7" fill="var(--success)" />
                  <path d="M4 7.2l2 2 4.2-4.4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Uploaded
              </span>
              <p style={{ fontSize: "12px", color: "var(--text-light)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                {fileName}
              </p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                style={{ fontSize: "12px", fontWeight: 600, color: "var(--blue)", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "2px" }}
              >
                Replace
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => inputRef.current?.click()} style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--navy)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Drop it here or <span style={{ color: "var(--blue)" }}>browse</span>
              </button>
              <p style={{ fontSize: "12px", color: "var(--text-light)" }}>{hint}</p>
              {capture && (
                <>
                  <span style={{ fontSize: "11px", color: "var(--text-light)" }}>or</span>
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--blue)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M7 4l1.2-2h3.6L13 4h3a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 014 4h3z" stroke="var(--blue)" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="10" cy="9.5" r="3.2" stroke="var(--blue)" strokeWidth="1.5" />
                    </svg>
                    Use camera
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <input ref={inputRef} id={id} type="file" accept="image/*" onChange={(e) => handleFiles(e.target.files)} className="visually-hidden" />
        {capture && (
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture={capture}
            onChange={(e) => handleFiles(e.target.files)}
            className="visually-hidden"
          />
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .upload-field { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
