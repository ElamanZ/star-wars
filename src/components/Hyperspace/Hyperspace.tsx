import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

interface HyperspaceProps {
  className?: string;
  starCount?: number;
  speed?: number;
}

export const Hyperspace: React.FC<HyperspaceProps> = ({
  className,
  starCount = 600,
  speed = 8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let focal = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      focal = width;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const respawn = (s: Star) => {
      s.x = (Math.random() - 0.5) * width * 2;
      s.y = (Math.random() - 0.5) * height * 2;
      s.z = width;
    };

    const stars: Star[] = Array.from({ length: starCount }, () => {
      const s: Star = { x: 0, y: 0, z: 0, px: 0, py: 0 };
      respawn(s);
      s.z = Math.random() * width + 1;
      s.px = (s.x / s.z) * focal + width / 2;
      s.py = (s.y / s.z) * focal + height / 2;
      return s;
    });

    window.addEventListener("resize", resize);
    let rafId = 0;

    const tick = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#fff";
      ctx.lineCap = "round";

      const cx = width / 2;
      const cy = height / 2;

      for (const s of stars) {
        s.z -= speed;
        if (s.z <= 1) {
          respawn(s);
          s.px = (s.x / s.z) * focal + cx;
          s.py = (s.y / s.z) * focal + cy;
        }
        const x = (s.x / s.z) * focal + cx;
        const y = (s.y / s.z) * focal + cy;
        const closeness = (width - s.z) / width;
        ctx.globalAlpha = Math.min(1, closeness);
        ctx.lineWidth = 1.5 + closeness * 8;
        ctx.beginPath();
        ctx.moveTo(s.px, s.py);
        ctx.lineTo(x, y);
        ctx.stroke();
        s.px = x;
        s.py = y;
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [starCount, speed]);

  return <canvas ref={canvasRef} className={className} />;
};
