"use client";

import React, { useState, useEffect, useRef } from "react";

// ==========================================
// PENGATURAN HANAN
// ==========================================
// Masukkan nomor WhatsApp kamu jika ingin langsung ke chat kamu (format: 628xxxxxxxxxx)
// Jika dikosongkan (""), akan otomatis membuka pilihan kontak WhatsApp.
const HANAN_WHATSAPP_NUMBER = "6285157810800";

// ==========================================
// AUDIO SINTESIS ROMANTIS (WEB AUDIO API)
// ==========================================
function playSound(type: "pop" | "victory" | "heart") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(360, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === "heart") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.18); // G5
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } else if (type === "victory") {
      // Fanfare nada kemenangan manis C - E - G - B - C'
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.36);
      });
    }
  } catch {
    // Ignore error if audio policy blocks autoplay
  }
}

// Komponen Maskot Beruang Lucu (SVG Handcrafted)
function CuteMascot({ mood }: { mood: "happy" | "shy" | "sad" | "love" | "kiss" }) {
  if (mood === "kiss") {
    return (
      <div className="relative w-44 h-44 mx-auto mb-4 flex items-center justify-center animate-gentle-bounce">
        {/* Dua Beruang Saling Sayang & Cium */}
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-lg">
          {/* Hati Terbang di Atas */}
          <path
            d="M 100,25 C 90,5 65,15 75,35 C 85,55 100,65 100,65 C 100,65 115,55 125,35 C 135,15 110,5 100,25 Z"
            fill="#ff2a70"
            className="animate-heartbeat"
            style={{ transformOrigin: "100px 35px" }}
          />
          <text x="48" y="25" fontSize="18" fill="#ec4899" className="animate-pulse">✨</text>
          <text x="138" y="25" fontSize="18" fill="#a855f7" className="animate-pulse">💕</text>

          {/* Beruang Kiri (Putih / Cream) */}
          <g transform="translate(20, 45)">
            <circle cx="28" cy="22" r="14" fill="#ffd5c6" />
            <circle cx="28" cy="22" r="8" fill="#ff9ebb" />
            <circle cx="68" cy="22" r="14" fill="#ffd5c6" />
            <circle cx="68" cy="22" r="8" fill="#ff9ebb" />
            <ellipse cx="48" cy="50" rx="34" ry="30" fill="#fff5ea" />
            <ellipse cx="28" cy="56" rx="8" ry="5" fill="#ff9ebb" opacity="0.8" />
            <ellipse cx="68" cy="56" rx="8" ry="5" fill="#ff9ebb" opacity="0.8" />
            <path d="M 32 44 Q 38 38 44 44" stroke="#4a2e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 54 44 Q 60 38 66 44" stroke="#4a2e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="50" cy="55" rx="5" ry="3.5" fill="#4a2e2b" />
            <path d="M 46 60 Q 50 64 54 60" stroke="#4a2e2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="68" cy="74" rx="14" ry="8" fill="#fff5ea" transform="rotate(-15 68 74)" />
          </g>

          {/* Beruang Kanan (Pink Muda / Peach) */}
          <g transform="translate(90, 45)">
            <circle cx="42" cy="22" r="14" fill="#ffb4a2" />
            <circle cx="42" cy="22" r="8" fill="#e5989b" />
            <circle cx="82" cy="22" r="14" fill="#ffb4a2" />
            <circle cx="82" cy="22" r="8" fill="#e5989b" />
            <ellipse cx="62" cy="50" rx="34" ry="30" fill="#ffe5d9" />
            <ellipse cx="42" cy="56" rx="8" ry="5" fill="#ff758f" opacity="0.8" />
            <ellipse cx="82" cy="56" rx="8" ry="5" fill="#ff758f" opacity="0.8" />
            <path d="M 46 44 Q 52 38 58 44" stroke="#4a2e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 68 44 Q 74 38 80 44" stroke="#4a2e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="55" rx="5" ry="3.5" fill="#4a2e2b" />
            <path d="M 56 60 Q 60 64 64 60" stroke="#4a2e2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="42" cy="74" rx="14" ry="8" fill="#ffe5d9" transform="rotate(15 42 74)" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center animate-gentle-bounce">
      <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-md">
        {/* Telinga */}
        <circle cx="35" cy="35" r="18" fill="#ffd7ba" />
        <circle cx="35" cy="35" r="10" fill="#ffb4a2" />
        <circle cx="105" cy="35" r="18" fill="#ffd7ba" />
        <circle cx="105" cy="35" r="10" fill="#ffb4a2" />

        {/* Kepala */}
        <ellipse cx="70" cy="75" rx="50" ry="44" fill="#ffe5d9" />

        {/* Pipi Merona */}
        <ellipse cx="38" cy="84" rx="10" ry="6" fill="#ff758f" opacity="0.75" />
        <ellipse cx="102" cy="84" rx="10" ry="6" fill="#ff758f" opacity="0.75" />

        {/* Mata Berdasarkan Mood */}
        {mood === "sad" ? (
          <>
            <ellipse cx="48" cy="68" rx="7" ry="9" fill="#2d1b1b" />
            <ellipse cx="92" cy="68" rx="7" ry="9" fill="#2d1b1b" />
            <circle cx="45" cy="65" r="2.5" fill="#ffffff" />
            <circle cx="89" cy="65" r="2.5" fill="#ffffff" />
            <ellipse cx="48" cy="85" rx="4" ry="7" fill="#60a5fa" opacity="0.85" />
            <ellipse cx="92" cy="85" rx="4" ry="7" fill="#60a5fa" opacity="0.85" />
            <path d="M 64 92 Q 70 86 76 92" stroke="#4a2e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : mood === "shy" ? (
          <>
            <ellipse cx="48" cy="68" rx="6" ry="8" fill="#2d1b1b" />
            <ellipse cx="92" cy="68" rx="6" ry="8" fill="#2d1b1b" />
            <circle cx="46" cy="65" r="2" fill="#ffffff" />
            <circle cx="90" cy="65" r="2" fill="#ffffff" />
            <path d="M 66 88 Q 70 92 74 88" stroke="#4a2e2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="48" cy="68" rx="7" ry="9" fill="#2d1b1b" />
            <ellipse cx="92" cy="68" rx="7" ry="9" fill="#2d1b1b" />
            <circle cx="46" cy="64" r="3" fill="#ffffff" />
            <circle cx="90" cy="64" r="3" fill="#ffffff" />
            <circle cx="50" cy="71" r="1.5" fill="#ffffff" />
            <circle cx="94" cy="71" r="1.5" fill="#ffffff" />
            <path d="M 63 87 Q 70 94 77 87" stroke="#4a2e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Hidung */}
        <ellipse cx="70" cy="80" rx="6" ry="4" fill="#4a2e2b" />

        {/* Hati di Tangan Beruang */}
        <path
          d="M 70,105 C 64,95 48,100 55,112 C 62,124 70,130 70,130 C 70,130 78,124 85,112 C 92,100 76,95 70,105 Z"
          fill="#ff3366"
          className="animate-heartbeat"
          style={{ transformOrigin: "70px 115px" }}
        />
      </svg>
    </div>
  );
}

export default function ConfessionPage() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [todayDate, setTodayDate] = useState("");
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const [cursorHearts, setCursorHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const bgmCtxRef = useRef<AudioContext | null>(null);

  // Kata-kata lucu saat tombol Tidak ditekan
  const noPhrases = [
    "Tidak 🥺",
    "Yakin gamau? 🥺",
    "Pikir-pikir dulu dong... 👉👈",
    "Jangan nolak plisss 😭💔",
    "Nanti nyesel lho... 🥺",
    "Aku bakal sedih banget... 🌧️",
    "Kok masih dipencet sih?! 😤❤️",
    "Tombol ini bentar lagi pasrah... 🏳️",
    "Tombol Diterima udah gede banget tuh! 😆",
    "Udah gabisa nolak lagii, klik Iya aja! 💖",
  ];

  const currentNoPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];

  // Format tanggal bahasa Indonesia
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTodayDate(now.toLocaleDateString("id-ID", options));
  }, []);

  // Efek jejak kursor hati
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (Math.random() > 0.4) return;
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setCursorHearts((prev) => [...prev.slice(-12), newHeart]);
  };

  useEffect(() => {
    if (cursorHearts.length === 0) return;
    const timer = setTimeout(() => {
      setCursorHearts((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [cursorHearts]);

  // Pemutar Musik Lofi / Melodi Romantis Sintetis
  const toggleBgm = () => {
    if (isBgmPlaying) {
      if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
      if (bgmCtxRef.current) bgmCtxRef.current.close();
      bgmIntervalRef.current = null;
      bgmCtxRef.current = null;
      setIsBgmPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        bgmCtxRef.current = ctx;

        // Melodi romantis lembut (C mayor arpeggio santai)
        const melody = [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63, 293.66];
        let noteIdx = 0;

        const playNote = () => {
          if (!ctx || ctx.state === "closed") return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(melody[noteIdx % melody.length], ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.62);
          noteIdx++;
        };

        playNote();
        bgmIntervalRef.current = setInterval(playNote, 650);
        setIsBgmPlaying(true);
      } catch {
        // Audio policy
      }
    }
  };

  useEffect(() => {
    return () => {
      if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
      if (bgmCtxRef.current) bgmCtxRef.current.close();
    };
  }, []);

  // Efek Confetti Partikel Hati
  const triggerConfetti = (burstCount = 140) => {
    playSound("victory");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      isHeart: boolean;
    }

    const particles: Particle[] = [];
    const colors = ["#ff4b91", "#ff758c", "#a855f7", "#ec4899", "#ffd166", "#f43f5e", "#c084fc", "#ffffff"];

    for (let i = 0; i < burstCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.6 + (Math.random() - 0.5) * 100,
        size: Math.random() * 14 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 18,
        speedY: -(Math.random() * 16 + 8),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        isHeart: Math.random() > 0.4,
      });
    }

    let animationFrameId: number;

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.25);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.35;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0) {
          aliveCount++;
          if (p.isHeart) {
            drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
          } else {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
          }
        }
      }

      if (aliveCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  };

  const handleAccept = () => {
    setAccepted(true);
    triggerConfetti(160);
  };

  const handleReject = () => {
    playSound("pop");
    setNoCount((prev) => prev + 1);
  };

  // Apakah tombol Iya sudah membesar sampai memenuhi layar sepenuhnya?
  const isFullScreenTakeover = noCount >= 6;

  // Skala pertumbuhan tombol Iya secara dinamis sebelum fullscreen
  const yesButtonScale = 1 + noCount * 0.32;
  const yesButtonFontSize = Math.min(1.2 + noCount * 0.22, 2.5); // rem
  const yesButtonPaddingY = Math.min(1 + noCount * 0.4, 2.8); // rem
  const yesButtonPaddingX = Math.min(2 + noCount * 0.8, 5.5); // rem

  const waLink = `https://wa.me/${HANAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Haiiiii Hanan!!! 🥰 Aku udah terima kamu jadi pacar akuuu!!! Yeayyy sekarang kamuu udah bisa manggil aku sayangggg ❤️💍 "
)}`;

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-pink-400 via-rose-300 to-purple-600 select-none"
    >
      {/* Canvas Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Jejak Kursor Hati Interaktif */}
      {cursorHearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none z-40 text-pink-500 font-bold text-sm transform -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{ left: `${h.x}px`, top: `${h.y}px` }}
        >
          💖
        </div>
      ))}

      {/* Tombol Musik Romantis (Pojok Kanan Atas) */}
      <button
        type="button"
        onClick={toggleBgm}
        className="fixed top-4 right-4 z-40 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-semibold text-pink-700 shadow-md backdrop-blur-md flex items-center gap-1.5 transition-all transform active:scale-95"
      >
        <span>{isBgmPlaying ? "🔊 Musik Nyala" : "🎵 Putar Musik"}</span>
      </button>

      {/* Partikel Love Mengambang di Latar Belakang */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(24)].map((_, i) => {
          const left = (i * 4.1 + (i % 3) * 7) % 96;
          const duration = 7 + (i % 7) * 2;
          const delay = (i % 6) * 1.5;
          const size = 18 + (i % 5) * 8;
          const opacities = [0.3, 0.45, 0.6, 0.75];
          const opacity = opacities[i % opacities.length];
          const heartIcons = ["💖", "💕", "🌸", "✨", "💜", "💗", "🌷"];
          const icon = heartIcons[i % heartIcons.length];

          return (
            <div
              key={i}
              className="absolute animate-float-heart"
              style={{
                left: `${left}%`,
                bottom: "-10%",
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                fontSize: `${size}px`,
                opacity: opacity,
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>

      {/* JIKA BELUM DITERIMA */}
      {!accepted ? (
        <div className="relative z-10 w-full max-w-lg mx-auto">
          {/* Card Kaca Romantis (Glassmorphism) */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-white/85 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(219,39,119,0.35)] border border-white/70 text-center transition-all duration-300">
            {/* Maskot Lucu yang Reaktif */}
            <CuteMascot
              mood={
                noCount === 0
                  ? "shy"
                  : noCount < 3
                  ? "happy"
                  : "sad"
              }
            />

            {/* Tag Lucu */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold tracking-wide mb-3 shadow-sm">
              <span>💌 Ada Pesan Rahasia Dari Hanan</span>
            </div>

            {/* Pertanyaan Utama */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 leading-tight mb-3">
              Maukah Kamu Jadi Pacarku? 🌹💖
            </h1>

            <p className="text-gray-600 text-sm sm:text-base font-medium mb-8 leading-relaxed">
              {noCount === 0
                ? "Dari lubuk hatiku yang paling dalam, aku pengen banget ngejalanin hari-hari bareng kamu... ✨"
                : noCount < 3
                ? "Aduh jangan gitu dong... aku seriusan tulus banget sama kamu 🥺👉👈"
                : "Tuh kan... tombol Iya-nya makin gede lho! Udah takdir kamu nerima aku! 😝❤️"}
            </p>

            {/* Area Tombol */}
            <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6 min-h-[90px]">
              {/* Tombol DITERIMA / IYA (Membesar tiap kali tombol Tidak ditekan) */}
              <button
                type="button"
                onClick={handleAccept}
                style={{
                  transform: `scale(${yesButtonScale})`,
                  fontSize: `${yesButtonFontSize}rem`,
                  paddingTop: `${yesButtonPaddingY}rem`,
                  paddingBottom: `${yesButtonPaddingY}rem`,
                  paddingLeft: `${yesButtonPaddingX}rem`,
                  paddingRight: `${yesButtonPaddingX}rem`,
                }}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 shadow-[0_10px_25px_rgba(236,72,153,0.5)] hover:shadow-[0_15px_35px_rgba(236,72,153,0.7)] transition-all duration-300 ease-out active:scale-95 animate-pulse-glow z-20"
              >
                <span>Diterima!</span>
                <span className="text-xl sm:text-2xl">🥰</span>
              </button>

              {/* Tombol TIDAK */}
              <button
                type="button"
                onClick={handleReject}
                className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full font-semibold text-gray-700 bg-white/90 hover:bg-gray-100 border border-gray-200/80 shadow-md hover:shadow-lg transition-all duration-200 active:scale-90 z-10 text-sm sm:text-base"
              >
                <span>{currentNoPhrase}</span>
              </button>
            </div>

            {/* Catatan Kaki Manis */}
            <div className="mt-8 pt-4 border-t border-pink-100/80 text-xs text-pink-500 font-medium flex items-center justify-center gap-1">
              <span>Made with full love by Hanan</span>
              <span className="text-red-500 animate-pulse">❤️</span>
            </div>
          </div>
        </div>
      ) : (
        /* JIKA SUDAH DITERIMA (SUCCESS CELEBRATION SCREEN) */
        <div className="relative z-20 w-full max-w-xl mx-auto animate-gentle-bounce">
          <div className="backdrop-blur-2xl bg-white/90 dark:bg-white/95 rounded-3xl p-8 sm:p-12 shadow-[0_25px_70px_rgba(219,39,119,0.45)] border-2 border-pink-200 text-center">
            {/* Maskot Bahagia Berdua */}
            <CuteMascot mood="kiss" />

            {/* Pita Selamat */}
            <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm tracking-wide shadow-md mb-4 animate-bounce">
              🎉 YEAYYYYY!🎉
            </div>

            {/* Judul Besar Sesuai Permintaan */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 leading-tight mb-4">
              Selamat Anda Telah Menjadi Pacar Hanan! 💍✨
            </h1>

            <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed mb-6">
              Makasih banyakkk udah mau nerima aku! Hari ini adalah hari paling bahagia buat Hanan. Janji bakal selalu jaga hati kamu, setia, dan bikin kamu tersenyum tiap hari! 🥰💖
            </p>

            {/* Kartu Bukti Jadian Resmi (Piagam Cinta) */}
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-2xl p-5 border border-pink-200 shadow-inner mb-6 text-left">
              <div className="flex items-center justify-between border-b border-pink-200/80 pb-3 mb-3">
                <span className="font-bold text-pink-700 text-sm sm:text-base flex items-center gap-1.5">
                  📜 Piagam Resmi Hubungan
                </span>
                <span className="text-xs bg-pink-500 text-white font-semibold px-2.5 py-1 rounded-full">
                  Status: RESMI JADIAN 💍
                </span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                <p className="flex justify-between">
                  <span className="text-gray-500">Pasangan:</span>
                  <span className="font-bold text-pink-600">Atin ❤️ Hanan</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Tanggal Jadian:</span>
                  <span className="font-semibold text-purple-700">{todayDate || "Hari Ini"}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Masa Berlaku:</span>
                  <span className="font-semibold text-rose-600">Selamanya (Lifetime Warranty) ♾️</span>
                </p>
              </div>
            </div>

            {/* Tombol Interaktif Tambahan */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Tombol Kabari ke WhatsApp Hanan */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("heart")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm sm:text-base"
              >
                <span>Kirim Bukti ke WhatsApp Hanan</span>
                <span className="text-lg">📲💌</span>
              </a>

              {/* Tombol Hujan Cinta / Ledakan Confetti Lagi */}
              <button
                type="button"
                onClick={() => triggerConfetti(150)}
                className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-pink-700 bg-pink-100 hover:bg-pink-200 border border-pink-300 transition-all transform active:scale-95 text-sm sm:text-base shadow-sm"
              >
                <span>Hujan Cinta Lagi!</span>
                <span className="text-lg">🎉💖</span>
              </button>
            </div>

            {/* Toggle Buka Surat Cinta */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  playSound("heart");
                  setShowLoveLetter(!showLoveLetter);
                }}
                className="cursor-pointer text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-800 underline underline-offset-4 transition"
              >
                {showLoveLetter ? "Tutup Surat Cinta 💌" : "Baca Janji Hanan Buat Kamu 💌"}
              </button>

              {showLoveLetter && (
                <div className="mt-3 p-4 rounded-xl bg-white/90 border border-purple-200 text-gray-700 text-xs sm:text-sm leading-relaxed text-left animate-fadeIn shadow-sm">
                  <p className="font-semibold text-pink-600 mb-1">Janji Hanan Untukmu: 🌹</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Selalu menyempatkan waktu buat dengerin cerita kamu seharian.</li>
                    <li>Gak bakal ninggalin kamu pas lagi ngambek atau sedih.</li>
                    <li>Siap sedia nemenin kamu mabarrr!</li>
                    <li>Menyayangi kamu sepenuh hati, hari ini, besok, dan selamanya! 💖</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY TOMBOL MEMBESAR MEMENUHI LAYAR PENUH JIKA DITOLAK TERUS-MENERUS */}
      {isFullScreenTakeover && !accepted && (
        <div
          onClick={handleAccept}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 cursor-pointer animate-pulse text-white shadow-2xl transition-all duration-500"
        >
          {/* Efek Bintang & Hati Bertebaran */}
          <div className="text-6xl sm:text-8xl mb-6 animate-heartbeat">💖💍💖</div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-center mb-4 tracking-tight drop-shadow-lg">
            DITERIMA! KLIK DI MANA SAJA!
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-pink-100 text-center max-w-xl drop-shadow mb-8">
            Sudah tidak ada pilihan lain... seluruh layar ini sudah dipenuhi oleh cinta Hanan! 🥰✨
          </p>
          <div className="px-8 py-4 rounded-full bg-white text-pink-600 font-extrabold text-xl sm:text-2xl shadow-2xl hover:scale-105 transition-transform flex items-center gap-3">
            <span>KLIK UNTUK RESMI JADIAN SEKARANG!</span>
            <span>👉❤️👈</span>
          </div>
        </div>
      )}
    </div>
  );
}
