"use client";

import { useEffect, useRef, useState } from "react";

export default function SignaturePad({ onChange }: { onChange: (blob: Blob | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);
  const [empty, setEmpty] = useState(true);

  // Match the canvas's internal pixel buffer to its actual displayed size
  // (scaled for device pixel ratio) — otherwise the browser stretches a
  // fixed-resolution bitmap to fill the CSS width, which is what made
  // strokes look blurry/"foggy" instead of crisp ink.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    function resize() {
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      if (!canvas || !wrapper) return;
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = wrapper.getBoundingClientRect();
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#000000";
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasInk.current = true;
    setEmpty(false);
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current!;
    canvas.toBlob((blob) => onChange(blob), "image/png");
  }

  function clear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasInk.current = false;
    setEmpty(true);
    onChange(null);
  }

  return (
    <div>
      <div ref={wrapperRef} style={{ width: "100%", height: "160px" }}>
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          style={{
            width: "100%",
            height: "160px",
            display: "block",
            background: "var(--white)",
            border: "1px dashed var(--border)",
            borderRadius: "var(--radius-sm)",
            touchAction: "none",
            cursor: "crosshair",
          }}
          aria-label="Draw your signature with your mouse or finger"
          role="img"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
        <span style={{ fontSize: "13px", color: "var(--text-light)" }}>
          {empty ? "Sign above using your mouse, trackpad, or finger." : "Signature captured."}
        </span>
        <button type="button" onClick={clear} className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: "13px" }}>
          Clear
        </button>
      </div>
    </div>
  );
}
