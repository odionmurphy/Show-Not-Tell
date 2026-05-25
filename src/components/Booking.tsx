// src/components/Booking.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const ORANGE = "#e8845a";
const CREAM = "#f5f0ea";
const DARK = "#1f1f1f";

const Logo = () => (
  <svg width="44" height="30" viewBox="0 0 44 30" fill="none">
    <ellipse cx="22" cy="15" rx="20" ry="13" fill={ORANGE} />
    <ellipse cx="22" cy="15" rx="8" ry="8" fill="white" />
    <ellipse cx="22" cy="15" rx="4.5" ry="4.5" fill={DARK} />
    <path d="M22 7 L22 2 M22 2 L19 5 M22 2 L25 5" stroke={DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Booking(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  
      // Listen for Calendly booking events
  const handleCalendlyEvent = (e: MessageEvent) => {
    if (e.data.event === "calendly.event_scheduled") {
      // GA4
      window.gtag?.("event", "booking_confirmed", {
        event_category: "Calendly",
        event_label: "30min consultation booked",
      });

      // Meta Pixel
      window.fbq?.("track", "Schedule");
    }
  };

  window.addEventListener("message", handleCalendlyEvent);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
        window.removeEventListener("message", handleCalendlyEvent);
    };
  }, []);

  return (
    <div style={{
      fontFamily: "'Outfit', 'Inter', sans-serif",
      background: CREAM,
      color: "#111",
      minHeight: "100vh"
    }}>

      {/* Header */}
      <nav style={{
        background: DARK,
        padding: "16px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: ORANGE }}>Show</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: ORANGE }}>Not Tell</div>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            color: "white",
            background: "none",
            border: "none",
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          ← Back to Landing Page
        </button>
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "80px 20px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 38, fontWeight: 700, marginBottom: 12 }}>
            Let's see what's possible for you!
          </h1>
          <p style={{ fontSize: 18, color: "#444", maxWidth: 520, margin: "0 auto" }}>
            Book a free 30-minute initial consultation with Sebastian.<br />
            No obligation — just a friendly conversation.
          </p>
        </div>

        {/* Calendly Inline Embed */}
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          minHeight: 720,
        }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/sebastian-budde/30min"
            style={{ minWidth: "320px", height: "700px", borderRadius: 12 }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: 40, color: "#555", fontSize: 15 }}>
          Questions? Call us at <strong>0151 503 09 163</strong><br />
          or email <strong>kontakt@shownottell.de</strong>
        </div>
      </div>
    </div>
  );
}