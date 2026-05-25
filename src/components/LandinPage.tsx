// src/components/VideoMessage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const ORANGE = "#e8845a";
const DARK = "#0f1720";
const CREAM = "#f3eee8";

export default function LandingPage(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const s1 = document.createElement("script");
    s1.src = "https://fast.wistia.com/player.js";
    s1.async = true;

    const s2 = document.createElement("script");
    s2.src = "https://fast.wistia.com/embed/6d9gp6r38u.js";
    s2.type = "module";
    s2.async = true;

    document.body.appendChild(s1);
    document.body.appendChild(s2);

    return () => {
      if (document.body.contains(s1)) document.body.removeChild(s1);
      if (document.body.contains(s2)) document.body.removeChild(s2);
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit','Inter',sans-serif", background: DARK, color: "white", minHeight: "100vh" }}>

      <header style={{ background: DARK, padding: "16px 500px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="https://onecdn.io/media/16a6ffba-a90c-4c8f-b129-c4cddb28cc1e/md2x" alt="Show Not Tell Logo" style={{ height: 60, width: "auto" }} />
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: "60px auto", background: "white", borderRadius: 20, padding: 40, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>

        <h1 style={{ textAlign: "center", fontSize: 26, fontWeight: 700, marginBottom: 24, color: "#111" }}>
          Your video message from Sebastian
        </h1>

       <div style={{ background: CREAM, borderRadius: 16, padding: 20, marginBottom: 30 }}>
  <div style={{ borderRadius: 12, overflow: "hidden", background: "#000" }}>
    {React.createElement("wistia-player", {
      "media-id": "6d9gp6r38u",
      aspect: 1.7777777777777777,
      style: { width: "100%", display: "block" }
    })}
  </div>
</div>

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: "#111" }}>
            Let's see what's possible for you!
          </h2>
          <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6 }}>
            Feel free to contact us via <b>0151 503 09 163</b><br />
            or send us an email to <b>kontakt@shownottell.de</b>
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button onClick={() => navigate("/booking")} style={{ background: ORANGE, color: "black", border: "none", borderRadius: 8, padding: "14px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Book your appointment now!
          </button>
          <div style={{ marginTop: 12, fontSize: 12, color: "#777" }}>Free and without obligation</div>
        </div>

      </div>

      <footer style={{ background: "#0a0f17", padding: "80px 60px 40px", color: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 60, alignItems: "start" }}>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 32, background: ORANGE, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderLeft: "9px solid #111", borderTop: "7px solid transparent", borderBottom: "7px solid transparent" }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 22, color: ORANGE }}>Show Not Tell</div>
            </div>
            <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7 }}>
              Show Not Tell, owner: Sebastian Budde<br />
              Konrad-Zuse-Str. 8, 28359 Bremen
            </p>
            <p style={{ marginTop: 24, fontSize: 13, color: "#aaa" }}>
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Legal Notice</span>{" "}|{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>{" "}|{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Terms and Conditions</span>
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 16, marginBottom: 16, color: "#ddd" }}>Navigation</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Homepage", "Free consultation", "Our Process", "Contact"].map((link) => (
                <span key={link} style={{ fontSize: 14, color: "#ccc", cursor: "pointer" }}>{link}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 16, marginBottom: 16, color: "#ddd" }}>Social Media</h4>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ icon: "📷", label: "Instagram" }, { icon: "in", label: "LinkedIn" }].map(({ icon, label }) => (
                <div key={label} title={label} style={{ width: 32, height: 32, border: "1px solid #555", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: "1px solid #333", marginTop: 60, paddingTop: 24, textAlign: "center", fontSize: 12, color: "#666" }}>
          © 2026 Show Not Tell • All rights reserved
        </div>
      </footer>
    </div>
  );
}