import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ORANGE = "#e8845a";
const DARK = "#1f1f1f";
const CREAM = "#f5f0ea";
const DARK2 = "#2a2a2a";

const Logo: React.FC = () => (
  <svg width="44" height="30" viewBox="0 0 44 30" fill="none">
    <ellipse cx="22" cy="15" rx="20" ry="13" fill={ORANGE}/>
    <ellipse cx="22" cy="15" rx="8" ry="8" fill="white"/>
    <ellipse cx="22" cy="15" rx="4.5" ry="4.5" fill={DARK}/>
    <path d="M22 7 L22 2 M22 2 L19 5 M22 2 L25 5" stroke={DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type CarouselSlide = {
  bg: string;
  label: string;
  visual: React.ReactElement;
};

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    bg: "linear-gradient(160deg,#1a2a2a 0%,#2a3a3a 100%)",
    label: "Oral Surgery",
    // surgeon close-up SVG
    visual: (
      <svg viewBox="0 0 300 240" width="100%" height="100%" style={{position:"absolute",inset:0}}>
        <rect width="300" height="240" fill="#1e2e2e"/>
        {/* person silhouette — surgeon leaning over */}
        <ellipse cx="150" cy="70" rx="38" ry="42" fill="#3a4a4a"/>
        <path d="M90 240 Q110 160 150 145 Q190 160 210 240Z" fill="#3a4a4a"/>
        {/* surgical mask/glasses hint */}
        <rect x="120" y="78" width="60" height="20" rx="8" fill="#2a3a3a" opacity="0.8"/>
        <ellipse cx="138" cy="68" rx="12" ry="10" fill="#4a5a5a"/>
        <ellipse cx="162" cy="68" rx="12" ry="10" fill="#4a5a5a"/>
        {/* gloved hands */}
        <ellipse cx="105" cy="180" rx="22" ry="14" fill="#2e4040" transform="rotate(-30,105,180)"/>
        <ellipse cx="195" cy="185" rx="22" ry="14" fill="#2e4040" transform="rotate(20,195,185)"/>
        {/* light from above */}
        <ellipse cx="150" cy="0" rx="80" ry="60" fill="rgba(255,220,150,0.08)"/>
      </svg>
    ),
  },
  {
    bg: "linear-gradient(160deg,#1a2030 0%,#2a3040 100%)",
    label: "Team Meeting",
    visual: (
      <svg viewBox="0 0 300 240" width="100%" height="100%" style={{position:"absolute",inset:0}}>
        <rect width="300" height="240" fill="#1e2535"/>
        {/* two people looking at something */}
        <ellipse cx="110" cy="75" rx="32" ry="36" fill="#3a4050"/>
        <path d="M55 240 Q75 155 110 142 Q145 155 165 240Z" fill="#3a4050"/>
        <ellipse cx="190" cy="72" rx="30" ry="34" fill="#45505a"/>
        <path d="M140 240 Q160 158 190 145 Q220 158 240 240Z" fill="#45505a"/>
        {/* cap on right person */}
        <ellipse cx="190" cy="45" rx="38" ry="12" fill="#35404a"/>
        {/* glasses */}
        <rect x="96" y="76" width="13" height="9" rx="3" fill="rgba(255,255,255,0.15)"/>
        <rect x="112" y="76" width="13" height="9" rx="3" fill="rgba(255,255,255,0.15)"/>
        {/* light */}
        <rect width="300" height="240" fill="rgba(100,140,200,0.05)"/>
      </svg>
    ),
  },
  {
    bg: "linear-gradient(160deg,#1a1a20 0%,#28282e 100%)",
    label: "Craft / Detail",
    visual: (
      <svg viewBox="0 0 300 240" width="100%" height="100%" style={{position:"absolute",inset:0}}>
        <rect width="300" height="240" fill="#1c1c22"/>
        {/* elderly person working at table */}
        <ellipse cx="155" cy="75" rx="30" ry="34" fill="#3a3a3a"/>
        <path d="M100 240 Q120 155 155 142 Q185 155 205 240Z" fill="#3a3a3a"/>
        {/* table */}
        <rect x="60" y="165" width="200" height="12" rx="3" fill="#2a2a28"/>
        {/* hands on table */}
        <ellipse cx="125" cy="170" rx="20" ry="10" fill="#4a4a48" transform="rotate(-10,125,170)"/>
        <ellipse cx="175" cy="172" rx="20" ry="10" fill="#4a4a48" transform="rotate(8,175,172)"/>
        {/* object being worked on */}
        <ellipse cx="150" cy="168" rx="30" ry="8" fill="#383830" opacity="0.7"/>
        {/* warm side light */}
        <rect x="220" y="0" width="80" height="240" fill="rgba(255,200,100,0.06)"/>
      </svg>
    ),
  },
];

const ProcessCarousel: React.FC = () => {
  const [current, setCurrent] = React.useState(1);
  const total = CAROUSEL_SLIDES.length;
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  // show 3 cards: prev (partial), current (full), next (partial)
  return (
    <div style={{ position: "relative", marginTop: 40 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "stretch", overflow: "hidden" }}>
        {[-1, 0, 1].map((offset) => {
          const idx = (current + offset + total) % total;
          const slide = CAROUSEL_SLIDES[idx];
          const isCenter = offset === 0;
          return (
            <div key={idx + "-" + offset} style={{
              flex: isCenter ? "0 0 42%" : "0 0 29%",
              borderRadius: 12, overflow: "hidden",
              height: isCenter ? 360 : 330,
              position: "relative",
              opacity: isCenter ? 1 : 0.7,
              transition: "all 0.3s ease",
              flexShrink: 0,
              background: slide.bg,
              alignSelf: "center",
            }}>
              {slide.visual}
            </div>
          );
        })}
      </div>

      {/* Nav arrows */}
      <button onClick={prev} style={{
        position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)",
        width: 40, height: 40, borderRadius: "50%", border: "none",
        background: "rgba(255,255,255,0.9)", cursor: "pointer", fontSize: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)", zIndex: 2,
      }}>←</button>
      <button onClick={next} style={{
        position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)",
        width: 40, height: 40, borderRadius: "50%", border: "none",
        background: "rgba(255,255,255,0.9)", cursor: "pointer", fontSize: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)", zIndex: 2,
      }}>→</button>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
        {CAROUSEL_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 22 : 8, height: 8, borderRadius: 4,
            border: "none", cursor: "pointer",
            background: i === current ? "#111" : "#ccc",
            transition: "all 0.3s",
            padding: 0,
          }}/>
        ))}
      </div>
    </div>
  );
}

export default function HomePage(): React.ReactElement {
  const navigate = useNavigate();   // ← Added for navigation to booking
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const [panelTab, setPanelTab] = useState<"menu" | "settings" | "style">("menu");
  const [styleSubTab, setStyleSubTab] = useState<string>("About");
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedDistance, setSelectedDistance] = useState<number>(24);
  const [selectedAlignment, setSelectedAlignment] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const NAV_LINKS: { id: string; label: string }[] = [
    { id: "about", label: "About Us" },
    { id: "principle", label: "principle" },
    { id: "results", label: "Results" },
    { id: "process", label: "process" },
    { id: "services", label: "Services" },
    { id: "contact", label: "contact" },
  ];

  const SIZES = ["L", "M", "S", "XS"];
  const DISTANCES = [48, 32, 24, 16];
  const STYLE_SUBTABS = ["About", "Product", "Contacts"];

  const FAQS = [
    { q: "What sets you apart from a traditional video production company?", a: "We don't just produce videos — we develop visual strategies. Every project starts with a deep understanding of your brand, audience, and communication goals." },
    { q: "We don't have a clear plan. Is that a problem?", a: "Not at all. Part of our process is helping you find clarity. Many of our best projects started with just a vague idea." },
    { q: "We have very complex content. Does it even work visually?", a: "That's exactly our specialty. We make complexity understandable without trivializing it — science, research, and technology become emotionally tangible." },
    { q: "Do you only provide support with production or also with strategic direction?", a: "Both. We work with you from concept to final cut, including brand strategy, narrative development, and communication planning." },
    { q: "What's the best way to start?", a: "Schedule a free initial consultation. We'll get to know your project, discuss your goals, and outline a potential approach — no strings attached." },
  ];

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: "7px 0", borderRadius: 7, border: "none",
    background: active ? "#e0e0e0" : "transparent", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#333",
  });

  const sizeBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: "5px 11px", borderRadius: 6, border: "1px solid #ddd",
    background: active ? "#222" : "white", color: active ? "white" : "#333",
    fontSize: 12, fontWeight: 600, cursor: "pointer",
  });

  const AlignIcons = [
    <svg key="l" width="16" height="14" viewBox="0 0 16 14" fill="none"><rect x="0" y="1" width="16" height="2" rx="1" fill="#555"/><rect x="0" y="6" width="11" height="2" rx="1" fill="#555"/><rect x="0" y="11" width="14" height="2" rx="1" fill="#555"/></svg>,
    <svg key="c" width="16" height="14" viewBox="0 0 16 14" fill="none"><rect x="0" y="1" width="16" height="2" rx="1" fill="#555"/><rect x="2.5" y="6" width="11" height="2" rx="1" fill="#555"/><rect x="1" y="11" width="14" height="2" rx="1" fill="#555"/></svg>,
    <svg key="r" width="16" height="14" viewBox="0 0 16 14" fill="none"><rect x="0" y="1" width="16" height="2" rx="1" fill="#555"/><rect x="5" y="6" width="11" height="2" rx="1" fill="#555"/><rect x="2" y="11" width="14" height="2" rx="1" fill="#555"/></svg>,
  ];

  return (
    <div style={{ fontFamily: "'Outfit','Inter',sans-serif", background: DARK, color: "white", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50, background: DARK,
        padding: "14px 48px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: ORANGE }}>Show</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: ORANGE }}>Not Tell</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link.id}
              onClick={() => { setPanelOpen(true); setPanelTab("menu"); }}
              style={{ fontSize: 14, color: "white", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {link.label}
            </button>
          ))}
        </div>
        {/* Changed to navigate to booking page */}
        <button 
          onClick={() => navigate("/LandingPage")}
          style={{
            background: ORANGE, color: "white", border: "none", borderRadius: 8,
            padding: "10px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", lineHeight: 1.4,
          }}>
          Schedule an initial consultation<br />
          <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.85 }}>100% free</span>
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: "100px 48px 60px", textAlign: "center", background: DARK }}>
        <h1 style={{ fontSize: 62, fontWeight: 800, margin: "0 0 14px", letterSpacing: -1 }}>MAKE IT SEEN.</h1>
        <p style={{ opacity: 0.55, fontSize: 16, margin: "0 0 44px" }}>Visual Storytelling Agency.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: ORANGE, color: "white", border: "none", borderRadius: 8,
            padding: "14px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", lineHeight: 1.4,
          }}>
            Schedule an initial consultation<br />
            <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.85 }}>100% free</span>
          </button>
          <button style={{
            background: "#333", color: "white", border: "none", borderRadius: 8,
            padding: "14px 28px", fontSize: 14, cursor: "pointer", lineHeight: 1.4,
          }}>
            Watch Show Reel<br />
            <span style={{ fontSize: 11, opacity: 0.6 }}>This is what our productions look like</span>
          </button>
        </div>
      </section>

      {/* ORANGE SECTION — the hero (dark) above has a wave bottom; orange fills below */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-wrap {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .logo-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-right: 64px;
          opacity: 0.85;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .logo-item:hover { opacity: 1; }
      `}</style>

      <div style={{ background: ORANGE, position: "relative" }}>
        {/* Dark cap wave — two hills at edges, valley in center */}
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 110 }}
        >
          <path
            d="M0,0 L1440,0 L1440,0 Q1260,10 1080,50 Q900,90 720,100 Q540,90 360,50 Q180,10 0,0 Z"
            fill={DARK}
          />
        </svg>

        <div style={{ padding: "16px 48px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 48, maxWidth: 1200, margin: "0 auto" }}>

            {/* Left: bold label */}
            <div style={{ color: "white", fontWeight: 700, fontSize: 15, lineHeight: 1.5, flexShrink: 0, minWidth: 210 }}>
              Trusted by innovators,<br />researchers &amp; creators.
            </div>

            {/* Scrolling logo strip */}
            <div className="marquee-wrap" style={{ flex: 1 }}>
              <div className="marquee-track">
                {/* --- SET 1 --- */}

                {/* octolib — fox/animal head logo */}
                <span className="logo-item">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 10 Q4 6 8 4 Q10 8 14 8 Q16 4 20 5 Q22 8 24 8 Q28 6 28 10 Q30 14 28 18 Q26 24 16 28 Q6 24 4 18 Q2 14 6 10Z" fill="rgba(255,255,255,0.9)"/>
                    <circle cx="12" cy="14" r="2" fill={ORANGE}/>
                    <circle cx="20" cy="14" r="2" fill={ORANGE}/>
                    <path d="M13 19 Q16 22 19 19" stroke={ORANGE} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M6 8 L9 12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M26 8 L23 12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>octolib</span>
                </span>

                {/* Deutsche Gesellschaft für PUBLIC HEALTH — swoosh + text */}
                <span className="logo-item">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M4 14 Q8 4 18 6 Q24 8 24 14 Q24 22 14 24" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <circle cx="14" cy="14" r="3" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                    Deutsche Gesellschaft für<br/><strong>PUBLIC HEALTH e.V.</strong>
                  </span>
                </span>

                {/* UBremen Research Alliance — grid of dots + text */}
                <span className="logo-item">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="2" y="2" width="11" height="11" rx="1" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                    <rect x="17" y="2" width="11" height="11" rx="1" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                    <rect x="2" y="17" width="11" height="11" rx="1" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                    <rect x="17" y="17" width="11" height="11" rx="1" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                    UBremen<br/>Research Alliance
                  </span>
                </span>

                {/* Universität Bremen — U shape */}
                <span className="logo-item">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 4 L6 20 Q6 28 16 28 Q26 28 26 20 L26 4" stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <line x1="6" y1="4" x2="26" y2="4" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                    Universität<br/>Bremen
                  </span>
                </span>

                {/* DIKS eV — D I K S letterform */}
                <span className="logo-item">
                  <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
                    <text x="0" y="22" fontFamily="serif" fontWeight="bold" fontSize="26" fill="rgba(255,255,255,0.9)">D</text>
                    <text x="16" y="22" fontFamily="serif" fontWeight="bold" fontSize="26" fill="rgba(255,255,255,0.7)">I</text>
                    <text x="22" y="22" fontFamily="serif" fontWeight="bold" fontSize="26" fill="rgba(255,255,255,0.9)">K</text>
                  </svg>
                  <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>S eV</span>
                </span>

                {/* ANT Research Group — antenna/signal waves */}
                <span className="logo-item">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <line x1="14" y1="28" x2="14" y2="12" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 18 Q6 14 8 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M20 18 Q22 14 20 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M4 22 Q1 14 4 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M24 22 Q27 14 24 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <circle cx="14" cy="10" r="3" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12 }}>ANT Research Group</span>
                </span>

                {/* Dr. Demmerle — medical cross */}
                <span className="logo-item">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="11" y="2" width="6" height="24" rx="2" fill="rgba(255,255,255,0.9)"/>
                    <rect x="2" y="11" width="24" height="6" rx="2" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12 }}>Dr. Demmerle &amp; colleagues</span>
                </span>

                {/* --- SET 2 (exact duplicate for seamless loop) --- */}

                <span className="logo-item">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 10 Q4 6 8 4 Q10 8 14 8 Q16 4 20 5 Q22 8 24 8 Q28 6 28 10 Q30 14 28 18 Q26 24 16 28 Q6 24 4 18 Q2 14 6 10Z" fill="rgba(255,255,255,0.9)"/>
                    <circle cx="12" cy="14" r="2" fill={ORANGE}/>
                    <circle cx="20" cy="14" r="2" fill={ORANGE}/>
                    <path d="M13 19 Q16 22 19 19" stroke={ORANGE} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M6 8 L9 12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M26 8 L23 12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>octolib</span>
                </span>

                <span className="logo-item">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M4 14 Q8 4 18 6 Q24 8 24 14 Q24 22 14 24" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <circle cx="14" cy="14" r="3" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                    Deutsche Gesellschaft für<br/><strong>PUBLIC HEALTH e.V.</strong>
                  </span>
                </span>

                <span className="logo-item">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="2" y="2" width="11" height="11" rx="1" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                    <rect x="17" y="2" width="11" height="11" rx="1" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                    <rect x="2" y="17" width="11" height="11" rx="1" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                    <rect x="17" y="17" width="11" height="11" rx="1" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                    UBremen<br/>Research Alliance
                  </span>
                </span>

                <span className="logo-item">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 4 L6 20 Q6 28 16 28 Q26 28 26 20 L26 4" stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <line x1="6" y1="4" x2="26" y2="4" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                    Universität<br/>Bremen
                  </span>
                </span>

                <span className="logo-item">
                  <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
                    <text x="0" y="22" fontFamily="serif" fontWeight="bold" fontSize="26" fill="rgba(255,255,255,0.9)">D</text>
                    <text x="16" y="22" fontFamily="serif" fontWeight="bold" fontSize="26" fill="rgba(255,255,255,0.7)">I</text>
                    <text x="22" y="22" fontFamily="serif" fontWeight="bold" fontSize="26" fill="rgba(255,255,255,0.9)">K</text>
                  </svg>
                  <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>S eV</span>
                </span>

                <span className="logo-item">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <line x1="14" y1="28" x2="14" y2="12" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 18 Q6 14 8 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M20 18 Q22 14 20 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M4 22 Q1 14 4 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M24 22 Q27 14 24 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <circle cx="14" cy="10" r="3" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12 }}>ANT Research Group</span>
                </span>

                <span className="logo-item">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="11" y="2" width="6" height="24" rx="2" fill="rgba(255,255,255,0.9)"/>
                    <rect x="2" y="11" width="24" height="6" rx="2" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                  <span style={{ color: "white", fontWeight: 600, fontSize: 12 }}>Dr. Demmerle &amp; colleagues</span>
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT — MORE THAN VIDEO */}
      <section id="about" style={{ background: "white", color: "#111", padding: "80px 48px" }}>
        <h2 style={{ textAlign: "center", fontSize: 40, fontWeight: 700, margin: "0 0 60px", color: "#111" }}>
          More than{" "}
          <span style={{
            background: `${ORANGE}30`, color: ORANGE, borderRadius: 6,
            padding: "2px 10px", display: "inline-block",
          }}>video.</span>
        </h2>

        {[
          {
            label: "USP #1", title: "Strategic Visual Storytelling",
            desc: "We don't think in terms of videos, but in terms of strategies. Every production is based on a thorough analysis of the brand, target audience, and communication.",
            visual: (
              <svg viewBox="0 0 220 200" width="130">
                <polygon points="110,20 65,100 155,100" fill="#2d5f6e"/>
                <polygon points="88,45 55,100 120,100" fill="#3d7a8a" opacity="0.8"/>
                <polygon points="110,100 65,185 155,185" fill={ORANGE}/>
                <polygon points="92,100 65,165 108,165" fill={ORANGE} opacity="0.7"/>
              </svg>
            ),
          },
          {
            label: "USP #2", title: "Simplicity meets Depth",
            desc: "We make complexity understandable without trivializing it. Science, research, and technology become emotionally tangible.",
            visual: (
              <svg viewBox="0 0 220 200" width="90">
                <circle cx="110" cy="100" r="52" fill={ORANGE}/>
              </svg>
            ),
          },
          {
            label: "USP #3", title: "Measurable Impact",
            desc: "Our productions don't just look good — they convert. Every visual decision is made with your communication goal in mind.",
            visual: (
              <svg viewBox="0 0 220 200" width="110">
                <rect x="30" y="130" width="36" height="55" fill={ORANGE} rx="4"/>
                <rect x="92" y="85" width="36" height="100" fill={`${ORANGE}cc`} rx="4"/>
                <rect x="154" y="40" width="36" height="145" fill={ORANGE} rx="4"/>
              </svg>
            ),
          },
        ].map((usp, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 24, maxWidth: 960, margin: "0 auto 24px",
          }}>
            <div style={{
              background: CREAM, borderRadius: 16, minHeight: 220,
              display: "flex", alignItems: "center", justifyContent: "center",
              order: i % 2 === 0 ? 0 : 1,
            }}>
              {usp.visual}
            </div>
            <div style={{
              background: "white", border: "1px solid #eee", borderRadius: 16,
              padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center",
              order: i % 2 === 0 ? 1 : 0,
            }}>
              <span style={{
                fontSize: 11, color: ORANGE, border: `1px solid ${ORANGE}55`,
                borderRadius: 20, padding: "3px 10px", display: "inline-block", marginBottom: 14, alignSelf: "flex-start",
              }}>{usp.label}</span>
              <h3 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 14px", color: "#111", lineHeight: 1.2 }}>{usp.title}</h3>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, margin: 0 }}>{usp.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PRINCIPLE SECTION */}
      <section id="principle" style={{ background: DARK, color: "white", padding: "80px 48px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
          maxWidth: 1060, margin: "0 auto", alignItems: "center",
        }}>
          {/* Left: text */}
          <div>
            <h2 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 20px", lineHeight: 1.2 }}>
              The "Show Not Tell" principle
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 36px" }}>
              "Show, don't tell" is our creative foundation. Instead of talking about innovation, we make it visible. Instead of relying on buzzwords, we create meaning through images.
            </p>

            {/* S / N / T badges */}
            {[
              { letter: "S", text: "Show → Visualize ideas" },
              { letter: "N", text: "Not → Simplify complexity" },
              { letter: "T", text: "Tell → Move emotions" },
            ].map((item) => (
              <div key={item.letter} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
                }}>{item.letter}</div>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>– {item.text}</span>
              </div>
            ))}

            <button style={{
              marginTop: 20,
              background: "transparent", color: "white",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 8, padding: "14px 28px",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}>
              Learn more about us
            </button>
          </div>

          {/* Right: real photo */}
          <div style={{ borderRadius: 16, overflow: "hidden", height: 420, position: "relative" }}>
            <img
              src="https://onecdn.io/media/694c8386-9a40-4ffd-82fb-5f61ca5f901f/lg"
              alt="Healthcare visual"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
            }}/>
            {/* bottom slider indicator */}
            <div style={{
              position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
              width: 60, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 2,
            }}/>
          </div>
        </div>
      </section>

      {/* RESULTS / TESTIMONIALS */}
      <section id="results" style={{ background: "white", color: "#111", padding: "80px 48px" }}>
        <h2 style={{ textAlign: "center", fontSize: 42, fontWeight: 700, margin: "0 0 12px", color: "#111" }}>Our customers love us</h2>
        <p style={{ textAlign: "center", color: "#888", fontSize: 14, margin: "0 0 56px", lineHeight: 1.7 }}>
          White space between sections is important to separate different parts of your website.<br/>
          This improves readability and highlights the ideas in your content.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {/* Col 1 */}
          <div>
            {/* Video thumbnail — ORALCHIRURGIE DEMMERLE */}
            <div style={{
              borderRadius: 12, height: 220, marginBottom: 22, overflow: "hidden",
              background: "#1a1a2e", position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#18182e 0%,#2a2840 100%)" }}/>
              {/* doodle overlay feel */}
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 20px" }}>
                <div style={{ color: ORANGE, fontWeight: 900, fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>!! </div>
                <div style={{ color: "white", fontWeight: 900, fontSize: 17, lineHeight: 1.15, letterSpacing: 0.5 }}>
                  ORALCHIRURGIE<br/>DEMMERLE
                </div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, marginTop: 6 }}>Video-</div>
              </div>
              {/* Show Not Tell watermark */}
              <div style={{
                position: "absolute", bottom: 8, left: 12, display: "flex", alignItems: "center", gap: 5, opacity: 0.55,
              }}>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <ellipse cx="7" cy="5" rx="6" ry="4" fill={ORANGE}/>
                  <circle cx="7" cy="5" r="2" fill="white"/>
                </svg>
                <span style={{ fontSize: 9, color: "white" }}>Show Not Tell</span>
              </div>
              {/* play button */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, top: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: "white",
                }}>▶</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#444", lineHeight: 1.8, margin: "0 0 16px" }}>
              Not your average video. This is a truly compelling result. In this testimonial, an oral surgeon explains how a clear expectation led to a video production that delivered exactly what was promised – high quality, seamless execution, and without any uncertainties.
            </p>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>Dr. Jan Demmerle</div>
            <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>Practice owner Dr. Demmerle &amp; colleagues</div>
          </div>

          {/* Col 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Quote card */}
            <div style={{ background: "#f4f2ef", borderRadius: 12, padding: "28px 26px" }}>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.8, margin: "0 0 16px" }}>
                "The resulting video is very well suited to reaching different target groups and, if necessary, to delve deeper into technical content afterwards. For our own presentations on the existing demo area, this has created another building block for adapting to target groups such as students, politicians or visitors from other fields."
              </p>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>Carsten Bockelmann</div>
              <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>ANT Research Group Leader</div>
            </div>
            {/* BARBELLFIT video */}
            <div style={{
              borderRadius: 12, height: 200, overflow: "hidden",
              background: "#0d1a0d", position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#0f1e0f 0%,#1a2e1a 100%)" }}/>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ color: "white", fontWeight: 900, fontSize: 22, letterSpacing: 2 }}>BARBELLFIT</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 4 }}>Video-Testimonial</div>
              </div>
              <div style={{
                position: "absolute", bottom: 8, right: 10, display: "flex", alignItems: "center", gap: 5, opacity: 0.55,
              }}>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <ellipse cx="7" cy="5" rx="6" ry="4" fill={ORANGE}/>
                  <circle cx="7" cy="5" r="2" fill="white"/>
                </svg>
                <span style={{ fontSize: 9, color: "white" }}>Show Not Tell</span>
              </div>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: "white",
                }}>▶</div>
              </div>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            {/* People photo placeholder */}
            <div style={{
              borderRadius: 12, height: 220, marginBottom: 22, overflow: "hidden",
              background: "#ccc", position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#d4ccc4 0%,#b0a898 100%)" }}/>
              {/* people silhouettes */}
              <svg viewBox="0 0 320 220" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                <rect width="320" height="220" fill="#c8beb4"/>
                {/* left person (from behind) */}
                <ellipse cx="110" cy="70" rx="32" ry="36" fill="#a89888"/>
                <path d="M60 220 Q80 140 110 130 Q140 140 160 220Z" fill="#a89888"/>
                {/* right person (facing) */}
                <ellipse cx="210" cy="65" rx="28" ry="32" fill="#b8a898"/>
                <path d="M165 220 Q185 140 210 128 Q235 140 255 220Z" fill="#b8a898"/>
                {/* arms crossed hint */}
                <path d="M180 160 Q200 152 220 160" stroke="#a89080" strokeWidth="8" fill="none" strokeLinecap="round"/>
                {/* warm light overlay */}
                <rect width="320" height="220" fill={`${ORANGE}08`}/>
              </svg>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: "white",
                }}>▶</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#444", lineHeight: 1.8, margin: "0 0 16px" }}>
              What began as initial uncertainty in the social media arena evolved into a clear strategy with measurable added value. Together, we reached new target groups, presented complex content in an easily understandable way, and created emotionally resonant communication that truly touches the audience. The collaboration was not only technically strong, but above all, personal: reliable, proactive – and with significantly less daily stress.
            </p>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>Tanja Meier</div>
            <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>Managing Director DIKS eV</div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: DARK2, textAlign: "center", padding: "70px 48px",
        borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <h2 style={{ fontSize: 38, fontWeight: 800, margin: "0 0 28px" }}>Become part of our next success story!</h2>
        <button style={{
          background: ORANGE, color: "white", border: "none", borderRadius: 8,
          padding: "16px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <span>›</span> Secure your free consultation now!
        </button>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ background: CREAM, color: "#111", padding: "80px 48px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 56px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ position: "relative", display: "inline-block" }}>
              <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", overflow: "visible", pointerEvents: "none" }} width="230" height="64" viewBox="0 0 230 64">
                <ellipse cx="115" cy="32" rx="108" ry="28" fill="none" stroke={ORANGE} strokeWidth="2.5"/>
              </svg>
              <span style={{ position: "relative", zIndex: 1, padding: "6px 20px", color: "#111" }}>Our process</span>
            </span>
            <span style={{ fontWeight: 400, fontSize: 32, color: "#111" }}>(3 steps to a clear story)</span>
          </h2>

          {[
            {
              num: "01", title: "Understanding & Planning (Strategy Workshop)",
              intro: "Before we talk about images, let's understand the foundation:",
              checks: ["What does the company really stand for?", "What kind of perception should be created?", "Where does the real communication challenge lie?"],
              body: "Often, things come to light here that have never been clearly articulated internally. The video is not the beginning, but rather the result of this clarity.",
            },
            {
              num: "02", title: "Concept & Story",
              intro: null, checks: [],
              body: "From these findings, we develop a visual narrative: not bullet points, not a messaging document — but a story that translates attitude, identity and goal into a clear visual language.",
            },
            {
              num: "03", title: "Production & Delivery",
              intro: null, checks: [],
              body: "We handle everything from filming and animation to editing and final delivery. You get a production that looks exactly like what was planned — and works exactly as intended.",
            },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 0, marginBottom: 60 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 32, flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, background: "#222", borderRadius: 3 }}/>
                {i < 2 && <div style={{ width: 2, flex: 1, background: "#ccc", minHeight: 120, marginTop: 4 }}/>}
              </div>
              <div style={{ flex: 1, paddingBottom: 20 }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: "#222", lineHeight: 1, marginBottom: 6 }}>{step.num}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: "#111" }}>{step.title}</h3>
                {step.intro && <p style={{ fontSize: 14, color: "#444", margin: "0 0 12px" }}>{step.intro}</p>}
                {step.checks.map((c, ci) => (
                  <div key={ci} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 18, height: 18, background: "#222", borderRadius: 3,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#333" }}>{c}</span>
                  </div>
                ))}
                {step.body && <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, margin: "12px 0 0" }}>{step.body}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS STEP 03 CAROUSEL + BUTTONS */}
      <section style={{ background: CREAM, padding: "0 48px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* 3-image carousel */}
          <ProcessCarousel />
          {/* Two CTA buttons */}
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <button style={{
              background: ORANGE, color: "white", border: "none", borderRadius: 8,
              padding: "14px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>Customer testimonials</button>
            <button style={{
              background: "transparent", color: "#111", border: "1.5px solid #ccc",
              borderRadius: 8, padding: "14px 28px", fontSize: 14, cursor: "pointer",
            }}>Watch Show Reel</button>
          </div>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section style={{ background: CREAM, borderTop: "1px solid #e8e0d8", padding: "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
            <h2 style={{
              fontSize: 48, fontWeight: 800, color: "#111", lineHeight: 1.2,
              margin: 0,
            }}>
              <span>Good visuals look nice.</span>
              <br/>
              <span style={{ position: "relative", display: "inline-block" }}>
                Clear stories make impact.
                {/* orange underline strokes */}
                <svg style={{
                  position: "absolute", bottom: -8, left: 0, width: "100%", overflow: "visible",
                }} viewBox="0 0 700 16" preserveAspectRatio="none" height="16">
                  <path d="M0,8 Q175,2 350,10 Q525,16 700,6" stroke={ORANGE} strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <path d="M0,14 Q175,8 350,14 Q525,18 700,12" stroke={ORANGE} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* FAQ / SERVICES */}
      <section id="services" style={{ background: DARK2, color: "white", padding: "80px 48px" }}>
        <h2 style={{ fontSize: 38, fontWeight: 700, margin: "0 0 48px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          Frequently Asked{" "}
          <span style={{ background: `${ORANGE}44`, color: ORANGE, borderRadius: 8, padding: "4px 14px" }}>
            Questions
          </span>
        </h2>

        <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 14 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
            }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: "100%", padding: "18px 20px", background: "none", border: "none", color: "white",
                display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left",
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "rgba(255,255,255,0.5)", flexShrink: 0,
                }}>?</span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{faq.q}</span>
                <span style={{
                  width: 26, height: 26, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, color: "rgba(255,255,255,0.5)", flexShrink: 0,
                  transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s",
                }}>∨</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 18px 60px", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "white", color: "#111", padding: "80px 48px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          maxWidth: 960, margin: "0 auto", borderRadius: 16, overflow: "hidden",
          boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
        }}>
          <div style={{ background: "#f5f2ee", padding: "48px 44px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 6px" }}>Your contact person</h2>
            <p style={{ fontSize: 14, color: "#888", margin: "0 0 24px" }}>Sebastian Budde</p>
            <p style={{ fontSize: 14, color: "#333", lineHeight: 1.75, margin: "0 0 8px", fontWeight: 500 }}>
              Many companies do great things, but their impact goes unnoticed because they are neither seen nor understood. That's precisely where our work comes in.
            </p>
            <p style={{ fontSize: 13, color: "#999", lineHeight: 1.7, margin: "0 0 28px" }}>
              We help transform complex content into clear, visual stories that resonate.
            </p>

            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              {/* LinkedIn */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#222" strokeWidth="1.5"/><rect x="6" y="10" width="2.5" height="8" fill="#222"/><circle cx="7.25" cy="7.5" r="1.5" fill="#222"/><path d="M11 10v8M11 13c0-1.5 1-3 3-3s3 1.5 3 3v5" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {/* WhatsApp */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="1.5"/><path d="M8 9c0 4 3 7 7 7l1-2-2-1-1 1c-1-1-2-2-3-3l1-1-1-2-2 1z" fill="#222"/></svg>
              {/* Telegram */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="1.5"/><path d="M6 12l2 1 1 3 2-2 3 2 2-8-10 4z" stroke="#222" strokeWidth="1.2" strokeLinejoin="round" fill="none"/></svg>
              {/* Instagram */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#222" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#222" strokeWidth="1.5"/><circle cx="16.5" cy="7.5" r="1" fill="#222"/></svg>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3h3l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5L11.5 11l4 1.5V15A1 1 0 0115 16C8 16 2 10 2 3a1 1 0 011-1z" stroke="#222" strokeWidth="1.4" fill="none"/></svg>
                <div>
                  <div style={{ fontSize: 12, color: "#888" }}>Telephone number</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>+49 151 503 09163</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="3" stroke="#222" strokeWidth="1.4"/><rect x="4" y="8" width="2" height="6" fill="#222"/><circle cx="5" cy="5.5" r="1.2" fill="#222"/><path d="M8 8v6M8 11c0-1.5 1-3 3-3s3 1.5 3 3v3" stroke="#222" strokeWidth="1.4" strokeLinecap="round"/></svg>
                <div>
                  <div style={{ fontSize: 12, color: "#888" }}>LinkedIn</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Sebastian Budde</div>
                </div>
              </div>
            </div>

            <button style={{
              background: ORANGE, color: "white", border: "none", borderRadius: 8,
              padding: "14px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", lineHeight: 1.4,
            }}>
              Schedule an initial consultation<br/>
              <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.85 }}>100% free</span>
            </button>
          </div>

          <div style={{
            background: "linear-gradient(160deg, #c8b8a8 0%, #a89888 100%)",
            minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <circle cx="35" cy="25" r="14" fill="rgba(255,255,255,0.45)"/>
                <path d="M8 62c0-14 12-24 27-24s27 10 27 24" fill="rgba(255,255,255,0.35)"/>
              </svg>
              <div style={{ fontSize: 14, marginTop: 8, fontWeight: 500 }}>Sebastian Budde</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "white", padding: "60px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, maxWidth: 960, margin: "0 auto 40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Logo />
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: ORANGE }}>Show</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: ORANGE }}>Not Tell</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
              Visual Storytelling Agency.<br/>Making complex ideas seen.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Left</div>
            {NAV_LINKS.map(l => (
              <div key={l.id} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8, cursor: "pointer" }}>{l.label}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Social Media</div>
            {["LinkedIn", "Instagram", "WhatsApp", "Telegram"].map(s => (
              <div key={s} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8, cursor: "pointer" }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2024 Show Not Tell · shownottell.studio</span>
        </div>
      </footer>

      {/* PANEL */}
      {panelOpen && (
        <div style={{
          position: "fixed", top: 88, left: 200, width: 260,
          background: "#f4f4f4", borderRadius: 14,
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)", zIndex: 999,
          overflow: "hidden", color: "#111", fontSize: 13,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "11px 14px", borderBottom: "1px solid #e0e0e0",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{ background: "none", border: "none", fontSize: 15, cursor: "pointer", color: "#444", padding: "0 4px" }}>‹</button>
              <span style={{ fontSize: 13, fontWeight: 600 }}>menu</span>
            </div>
            <button onClick={() => setPanelOpen(false)} style={{ background: "none", border: "none", fontSize: 14, cursor: "pointer", color: "#666" }}>✕</button>
          </div>

          <div style={{ display: "flex", gap: 4, padding: "8px 10px", borderBottom: "1px solid #e8e8e8" }}>
            <button style={tabBtnStyle(panelTab === "menu")} onClick={() => setPanelTab("menu")}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><rect x="0" y="0" width="18" height="2.5" rx="1.2" fill="#444"/><rect x="0" y="5.5" width="18" height="2.5" rx="1.2" fill="#444"/><rect x="0" y="11" width="18" height="2.5" rx="1.2" fill="#444"/></svg>
            </button>
            <button style={tabBtnStyle(panelTab === "settings")} onClick={() => setPanelTab("settings")}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="2.5" stroke="#444" strokeWidth="1.5"/><path d="M8.5 1v2M8.5 14v2M1 8.5h2M14 8.5h2M3.05 3.05l1.41 1.41M12.54 12.54l1.41 1.41M3.05 13.95l1.41-1.41M12.54 4.46l1.41-1.41" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button style={tabBtnStyle(panelTab === "style")} onClick={() => setPanelTab("style")}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M9 2L15 8L8.5 14.5L2 8.5L8.5 2.5Z" stroke="#444" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="5.5" cy="11.5" r="1.5" fill="#444"/></svg>
            </button>
          </div>

          <div style={{ padding: "12px 14px 16px" }}>
            {panelTab === "menu" && (
              <div>
                {NAV_LINKS.map(link => (
                  <div key={link.id} style={{ padding: "7px 10px", background: "white", borderRadius: 6, marginBottom: 6, cursor: "pointer" }}>
                    {link.label}
                  </div>
                ))}
                <button style={{ width: "100%", padding: "7px 10px", border: "1.5px dashed #ccc", borderRadius: 6, background: "transparent", fontSize: 13, color: "#888", cursor: "pointer", textAlign: "left", marginTop: 2 }}>
                  + Add
                </button>
              </div>
            )}

            {panelTab === "settings" && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 7 }}>Size</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {SIZES.map(s => <button key={s} style={sizeBtnStyle(selectedSize === s)} onClick={() => setSelectedSize(s)}>{s}</button>)}
                  <button style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #ddd", background: "white", color: "#888", fontSize: 12, cursor: "pointer" }}>···</button>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginTop: 12, marginBottom: 7 }}>Distance</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {DISTANCES.map(d => <button key={d} style={sizeBtnStyle(selectedDistance === d)} onClick={() => setSelectedDistance(d)}>{d}</button>)}
                  <button style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #ddd", background: "white", color: "#888", fontSize: 12, cursor: "pointer" }}>···</button>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  {AlignIcons.map((icon, i) => (
                    <button key={i} onClick={() => setSelectedAlignment(i)} style={{
                      flex: 1, padding: "6px 0", borderRadius: 6, border: "1px solid #ddd",
                      background: selectedAlignment === i ? "#e0e0e0" : "white", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{icon}</button>
                  ))}
                </div>
              </div>
            )}

            {panelTab === "style" && (
              <div>
                <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0", marginBottom: 12 }}>
                  {STYLE_SUBTABS.map(tab => (
                    <button key={tab} onClick={() => setStyleSubTab(tab)} style={{
                      padding: "6px 12px", border: "none", background: "transparent",
                      fontSize: 12, fontWeight: styleSubTab === tab ? 700 : 400,
                      color: styleSubTab === tab ? ORANGE : "#666", cursor: "pointer",
                      borderBottom: styleSubTab === tab ? `2px solid ${ORANGE}` : "2px solid transparent", marginBottom: -1,
                    }}>{tab}</button>
                  ))}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 7 }}>Size</div>
                <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                  {SIZES.map(s => <button key={s} style={sizeBtnStyle(selectedSize === s)} onClick={() => setSelectedSize(s)}>{s}</button>)}
                  <button style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #ddd", background: "white", color: "#888", fontSize: 12, cursor: "pointer" }}>···</button>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 8 }}>style</div>
                {[
                  { label: "Text color", color: ORANGE, icon: "A" },
                  { label: "Color scheme", color: "#5a8ae8", icon: "◉" },
                  { label: "font", color: "#666", icon: "T" },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                    background: "white", borderRadius: 6, marginBottom: 6, cursor: "pointer",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", background: item.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: "white", fontWeight: 700, flexShrink: 0,
                    }}>{item.icon}</div>
                    <span style={{ fontSize: 13, color: "#222" }}>{item.label}</span>
                    <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 12 12"><path d="M3 5L6 8L9 5" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
