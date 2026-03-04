import { useState, useEffect, useRef } from “react”;

const SECTIONS = [“hero”, “about”, “encoder”, “product”, “contact”];

const useInView = (threshold = 0.15) => {
const ref = useRef(null);
const [visible, setVisible] = useState(false);
useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
obs.observe(el);
return () => obs.disconnect();
}, []);
return [ref, visible];
};

const FadeIn = ({ children, delay = 0 }) => {
const [ref, visible] = useInView();
return (
<div ref={ref} style={{
opacity: visible ? 1 : 0,
transform: visible ? “translateY(0)” : “translateY(36px)”,
transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
}}>{children}</div>
);
};

/* ═══════════════════════════════════════
ACTUAL FIELDLINK NETWORKS LOGO
From your 04-stacked-dark.svg brand file
═══════════════════════════════════════ */
const LogoIcon = ({ size = 40 }) => (
<svg width={size} height={size} viewBox="0 0 82 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="navSg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00C2FF"/><stop offset="100%" stopColor="#0078D4"/></linearGradient>
<linearGradient id="navMg" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0078D4"/><stop offset="50%" stopColor="#00A3E0"/><stop offset="100%" stopColor="#00C2FF"/></linearGradient>
</defs>
<rect x="38" y="30" width="6" height="140" rx="3" fill="url(#navMg)"/>
<path d="M34 60A30 30 0 0 0 34 120" fill="none" stroke="url(#navSg)" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
<path d="M24 45A50 50 0 0 0 24 135" fill="none" stroke="url(#navSg)" strokeWidth="3.5" strokeLinecap="round" opacity="0.65"/>
<path d="M14 30A70 70 0 0 0 14 150" fill="none" stroke="url(#navSg)" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
<path d="M48 60A30 30 0 0 1 48 120" fill="none" stroke="url(#navSg)" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
<path d="M58 45A50 50 0 0 1 58 135" fill="none" stroke="url(#navSg)" strokeWidth="3.5" strokeLinecap="round" opacity="0.65"/>
<path d="M68 30A70 70 0 0 1 68 150" fill="none" stroke="url(#navSg)" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
<circle cx="41" cy="90" r="8" fill="url(#navMg)"/>
<circle cx="41" cy="90" r="4" fill="#0A1628" opacity="0.95"/>
<circle cx="41" cy="26" r="5" fill="url(#navSg)"/>
<line x1="41" y1="90" x2="76" y2="65" stroke="url(#navSg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
<circle cx="76" cy="65" r="4" fill="#00C2FF" opacity="0.8"/>
<line x1="41" y1="90" x2="76" y2="115" stroke="url(#navSg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
<circle cx="76" cy="115" r="4" fill="#00A3E0" opacity="0.8"/>
<line x1="41" y1="90" x2="6" y2="65" stroke="url(#navSg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
<circle cx="6" cy="65" r="4" fill="#00C2FF" opacity="0.8"/>
<line x1="41" y1="90" x2="6" y2="115" stroke="url(#navSg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
<circle cx="6" cy="115" r="4" fill="#00A3E0" opacity="0.8"/>
<rect x="22" y="170" width="38" height="4" rx="2" fill="url(#navSg)"/>
</svg>
);

const LogoFull = ({ size = 34 }) => (

  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <LogoIcon size={size} />
    <span style={{ color: "#F0F4F8", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: size * 0.48, letterSpacing: "-0.02em" }}>
      Field<span style={{ color: "#00C2FF" }}>Link</span>
      <span style={{ color: "#8899AA", fontWeight: 400, fontSize: size * 0.32, letterSpacing: "0.08em", marginLeft: 6 }}>NETWORKS</span>
    </span>
  </div>
);

/* ═══════════════════════════════════════
COLORS — Matched to your logo palette
═══════════════════════════════════════ */
const C = {
accent: “#00C2FF”,
accentDark: “#0078D4”,
accentMid: “#00A3E0”,
bg: “#0A1628”,
bgLight: “#0E1D35”,
text: “#F0F4F8”,
textMid: “rgba(240,244,248,0.6)”,
textDim: “rgba(240,244,248,0.35)”,
border: “rgba(0,194,255,0.1)”,
borderDim: “rgba(240,244,248,0.06)”,
};

const Nav = ({ active }) => {
const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
useEffect(() => {
const h = () => setScrolled(window.scrollY > 60);
window.addEventListener(“scroll”, h);
return () => window.removeEventListener(“scroll”, h);
}, []);
const links = [
{ id: “about”, label: “About” },
{ id: “encoder”, label: “RamPack Pro” },
{ id: “product”, label: “RamPack Shell” },
{ id: “contact”, label: “Contact” },
];
return (
<nav style={{
position: “fixed”, top: 0, left: 0, right: 0, zIndex: 1000,
background: scrolled ? “rgba(10,22,40,0.95)” : “transparent”,
backdropFilter: scrolled ? “blur(20px)” : “none”,
borderBottom: scrolled ? `1px solid ${C.border}` : “none”,
transition: “all 0.4s ease”,
padding: “0 clamp(20px,4vw,60px)”,
}}>
<div style={{ maxWidth: 1400, margin: “0 auto”, display: “flex”, alignItems: “center”, justifyContent: “space-between”, height: 72 }}>
<a href=”#hero” style={{ textDecoration: “none” }}><LogoFull size={34} /></a>
<div className=“desktop-nav” style={{ display: “flex”, gap: 28, alignItems: “center” }}>
{links.map(l => (
<a key={l.id} href={`#${l.id}`} style={{
color: active === l.id ? C.accent : C.textMid,
textDecoration: “none”, fontSize: 13, fontWeight: 500,
fontFamily: “‘Outfit’, sans-serif”, letterSpacing: “0.04em”,
textTransform: “uppercase”, transition: “color 0.3s”,
}}
onMouseEnter={e => e.target.style.color = C.accent}
onMouseLeave={e => { if (active !== l.id) e.target.style.color = C.textMid; }}
>{l.label}</a>
))}
<a href=”#contact” style={{
background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
color: C.bg, padding: “10px 24px”, borderRadius: 8,
fontFamily: “‘Outfit’, sans-serif”, fontWeight: 700, fontSize: 13,
textDecoration: “none”, letterSpacing: “0.04em”, textTransform: “uppercase”,
}}>Get Quote</a>
</div>
<button className=“mobile-menu-btn” onClick={() => setMenuOpen(!menuOpen)} style={{
display: “none”, background: “none”, border: “none”, cursor: “pointer”,
flexDirection: “column”, gap: 5, padding: 8,
}}>
{[0,1,2].map(i => (
<div key={i} style={{ width: 24, height: 2, background: “#fff”, borderRadius: 2, transition: “all 0.3s”,
transform: menuOpen ? (i===0 ? “rotate(45deg) translate(5px,5px)” : i===2 ? “rotate(-45deg) translate(5px,-5px)” : “none”) : “none”,
opacity: menuOpen && i===1 ? 0 : 1 }} />
))}
</button>
</div>
{menuOpen && (
<div className=“mobile-dropdown” style={{ display: “none”, flexDirection: “column”, gap: 4, padding: “8px 0 20px”, borderTop: `1px solid ${C.borderDim}` }}>
{links.map(l => (
<a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} style={{
color: active === l.id ? C.accent : C.textMid,
textDecoration: “none”, fontSize: 15, fontWeight: 500,
fontFamily: “‘Outfit’, sans-serif”, padding: “12px 0”,
}}>{l.label}</a>
))}
</div>
)}
</nav>
);
};

const Hero = () => (

  <section id="hero" style={{
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden",
    background: `radial-gradient(ellipse at 30% 20%, rgba(0,194,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,120,212,0.05) 0%, transparent 60%), ${C.bg}`,
  }}>
    <div style={{
      position: "absolute", inset: 0, opacity: 0.03,
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.5) 59px, rgba(255,255,255,0.5) 60px),
        repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.5) 59px, rgba(255,255,255,0.5) 60px)`,
    }} />
    <div style={{ textAlign: "center", maxWidth: 900, padding: "80px 24px 0", position: "relative", zIndex: 2 }}>
      <FadeIn>
        <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
          <LogoIcon size={70} />
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.2)",
          borderRadius: 100, padding: "8px 20px", marginBottom: 32,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "pulse 2s ease infinite" }} />
          <span style={{ color: C.accent, fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Mobile Broadcast Infrastructure
          </span>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 800,
          fontSize: "clamp(42px, 7vw, 84px)", lineHeight: 1.05,
          color: C.text, margin: "0 0 24px", letterSpacing: "-0.03em",
        }}>
          Broadcast-Grade<br />
          <span style={{
            background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDark} 50%, ${C.accent} 100%)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}>Uplink Anywhere</span>
        </h1>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p style={{
          color: C.textMid, fontSize: "clamp(16px, 2vw, 20px)",
          lineHeight: 1.7, maxWidth: 640, margin: "0 auto 48px",
          fontFamily: "'Outfit', sans-serif", fontWeight: 300,
        }}>
          Bonded cellular streaming backpacks powered by the RamPack Pro encoder.
          5G multi-network aggregation, satellite connectivity, and cloud-native switching.
          Built for professionals who never drop the signal.
        </p>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="hero-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#encoder" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
            color: C.bg, padding: "16px 40px", borderRadius: 12,
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15,
            textDecoration: "none", boxShadow: "0 0 40px rgba(0,194,255,0.25)",
          }}>RamPack Pro Encoder</a>
          <a href="#product" style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", padding: "16px 40px", borderRadius: 12,
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15,
            textDecoration: "none",
          }}>Explore RamPack Shell</a>
        </div>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div className="hero-stats" style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
          {[
            { val: "3×5G", label: "5G Modules" },
            { val: "3×4G", label: "4G Modules" },
            { val: "6 SIMs", label: "Multi-Carrier" },
            { val: "4K60", label: "Live Encoding" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: C.accent, letterSpacing: "-0.02em" }}>{s.val}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: C.textDim, marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

const About = () => (

  <section id="about" className="section-pad" style={{ padding: "120px clamp(20px,4vw,60px)", background: C.bg }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ maxWidth: 720 }}>
            <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Who We Are</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", color: C.text, margin: "16px 0 24px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Mobile Broadcast<br />Infrastructure Company
            </h2>
            <p style={{ color: C.textMid, fontSize: 16, lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, marginBottom: 32 }}>
              FieldLink Networks builds carrier-grade bonded uplink solutions for professional
              live streaming. We combine modular hardware, multi-carrier physical SIM aggregation, and
              a cloud-native switching roadmap to deliver broadcast-quality connectivity from any location.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { t: "Hardware Platform", d: "Custom RamPack Shell backpacks with RamPack Pro encoder integration" },
                { t: "Carrier Aggregation", d: "Physical SIM flexibility across multiple 5G/4G networks — carrier-agnostic" },
                { t: "Cloud Architecture", d: "SRT-based cloud switching roadmap replacing legacy hardware frame sync" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: C.accent, fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ color: C.text, fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>{item.t}</div>
                      <div style={{ color: C.textDim, fontSize: 14, fontFamily: "'Outfit', sans-serif", lineHeight: 1.6 }}>{item.d}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ══════════════════════════════════════════
BACKPACK IMAGE PLACEHOLDER
Replace with actual product photography.
Swap the SVG for: <img src=“your-photo.jpg”
style={{ width: “100%”, borderRadius: 16 }} />
══════════════════════════════════════════ */
const BackpackPlaceholder = () => (

  <div style={{
    background: `linear-gradient(145deg, rgba(0,194,255,0.03), rgba(0,120,212,0.02))`,
    border: `1px solid ${C.border}`, borderRadius: 24,
    padding: 48, 
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 50% 30%, rgba(0,194,255,0.05), transparent 70%)" }} />
    <div style={{ position: "relative", textAlign: "center" }}>
      <svg width="160" height="210" viewBox="0 0 160 210" fill="none" style={{ marginBottom: 24, opacity: 0.55 }}>
        <path d="M30 35 L20 170 Q20 185 35 185 L125 185 Q140 185 140 170 L130 35 Q130 25 120 25 L40 25 Q30 25 30 35Z" stroke="rgba(0,194,255,0.4)" strokeWidth="2" strokeDasharray="6 4" fill="rgba(0,194,255,0.02)" />
        <path d="M45 25 Q80 0 115 25" stroke="rgba(0,194,255,0.3)" strokeWidth="2.5" fill="none" />
        <path d="M38 25 Q80 -5 122 25" stroke="rgba(0,194,255,0.15)" strokeWidth="2" fill="none" />
        <rect x="45" y="55" width="70" height="40" rx="4" stroke="rgba(0,163,224,0.4)" strokeWidth="1.5" fill="rgba(0,163,224,0.04)" />
        <text x="80" y="72" textAnchor="middle" fill="rgba(0,163,224,0.5)" fontSize="7" fontFamily="Outfit, sans-serif" fontWeight="600">5.5" TOUCHSCREEN</text>
        <text x="80" y="84" textAnchor="middle" fill="rgba(0,163,224,0.35)" fontSize="6" fontFamily="Outfit, sans-serif">VELCRO ACCESS</text>
        <rect x="40" y="48" width="80" height="58" rx="5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
        <text x="80" y="112" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="6" fontFamily="Outfit, sans-serif">ENCODER BAY</text>
        <rect x="38" y="135" width="84" height="38" rx="5" stroke="rgba(0,194,255,0.35)" strokeWidth="1.5" fill="rgba(0,194,255,0.03)" />
        <text x="80" y="155" textAnchor="middle" fill="rgba(0,194,255,0.45)" fontSize="7" fontFamily="Outfit, sans-serif" fontWeight="600">V-MOUNT BATTERY</text>
        <text x="80" y="165" textAnchor="middle" fill="rgba(0,194,255,0.3)" fontSize="6" fontFamily="Outfit, sans-serif">HOT-SWAP ACCESS</text>
        <rect x="35" y="15" width="90" height="12" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <text x="80" y="24" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="Outfit, sans-serif">MOLLE — STARLINK MOUNT</text>
        <line x1="22" y1="40" x2="22" y2="180" stroke="rgba(0,194,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="138" y1="40" x2="138" y2="180" stroke="rgba(0,194,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="14" y="110" textAnchor="middle" fill="rgba(0,194,255,0.15)" fontSize="5" fontFamily="Outfit, sans-serif" transform="rotate(-90, 14, 110)">3D AIR MESH</text>
        <text x="146" y="110" textAnchor="middle" fill="rgba(0,194,255,0.15)" fontSize="5" fontFamily="Outfit, sans-serif" transform="rotate(90, 146, 110)">3D AIR MESH</text>
        <circle cx="68" cy="18" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <circle cx="92" cy="18" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
      </svg>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: C.text, letterSpacing: "-0.02em", marginBottom: 8 }}>FieldLink RamPack Shell</div>
      <div style={{ color: C.textDim, fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>500mm × 300mm · 20–22L · Heavy-Duty Build</div>
      <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, fontFamily: "'Outfit', sans-serif", fontStyle: "italic", marginTop: 12 }}>Product photography coming soon</div>
      <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {["Encoder Bay", "V-Mount Bay", "Starlink Mount"].map((t, i) => (
          <span key={i} style={{ background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.15)", color: C.accent, padding: "6px 14px", borderRadius: 6, fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const Product = () => {
const features = [
{ icon: “🔋”, title: “Hot-Swap V-Mount Battery”, desc: “Front-facing zipper on the bottom compartment. Swap V-Mount batteries while wearing and streaming live.” },
{ icon: “📡”, title: “Starlink Mini Mount”, desc: “Detachable pouch holds the Starlink Mini sky-facing on top. Cable passthrough for ethernet and power.” },
{ icon: “🌡️”, title: “Active Ventilation”, desc: “Full-length 3D Air Mesh side panels and channeled foam back panel. Manages heat from the RamPack Pro during extended operation.” },
{ icon: “🖥️”, title: “Front Screen Access Panel”, desc: “Large Velcro flap for quick encoder touchscreen access without opening the main compartment.” },
{ icon: “🎒”, title: “6+ Hour Ergonomic Carry”, desc: “Padded contoured back panel, wide shoulder straps, sternum strap, and hip belt. Designed for 6+ hours of continuous wear.” },
{ icon: “🔧”, title: “Broadcast-Grade Build”, desc: “Heavy-duty weatherproof construction built for professional field use. Reinforced stitching and corrosion-resistant hardware throughout.” },
];
return (
<section id=“product” className=“section-pad” style={{ padding: “120px clamp(20px,4vw,60px)”, background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgLight} 50%, ${C.bg} 100%)` }}>
<div style={{ maxWidth: 1200, margin: “0 auto” }}>
<FadeIn>
<div style={{ textAlign: “center”, marginBottom: 80 }}>
<span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: “‘Outfit’, sans-serif”, letterSpacing: “0.15em”, textTransform: “uppercase” }}>Flagship Product</span>
<h2 style={{ fontFamily: “‘Outfit’, sans-serif”, fontWeight: 800, fontSize: “clamp(32px, 5vw, 56px)”, color: C.text, margin: “16px 0 20px”, lineHeight: 1.1, letterSpacing: “-0.03em” }}>The RamPack Shell</h2>
<p style={{ color: C.textMid, fontSize: 17, fontFamily: “‘Outfit’, sans-serif”, fontWeight: 300, maxWidth: 640, margin: “0 auto” }}>
Purpose-built bonded cellular streaming backpack for IRL broadcast professionals.
Houses the RamPack Pro encoder with hot-swap power, satellite connectivity, and ventilation for continuous operation.
</p>
</div>
</FadeIn>
<div className=“grid-product” style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 48, marginBottom: 80, alignItems: “start” }}>
<FadeIn><BackpackPlaceholder /></FadeIn>
<div style={{ display: “grid”, gap: 20 }}>
{features.slice(0, 3).map((f, i) => (
<FadeIn key={i} delay={i * 0.1}>
<div style={{ background: “rgba(255,255,255,0.02)”, border: `1px solid ${C.borderDim}`, borderRadius: 16, padding: “24px 28px”, transition: “border-color 0.3s, background 0.3s” }}
onMouseEnter={e => { e.currentTarget.style.borderColor = “rgba(0,194,255,0.2)”; e.currentTarget.style.background = “rgba(0,194,255,0.03)”; }}
onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderDim; e.currentTarget.style.background = “rgba(255,255,255,0.02)”; }}>
<div style={{ display: “flex”, gap: 16, alignItems: “flex-start” }}>
<span style={{ fontSize: 28 }}>{f.icon}</span>
<div>
<div style={{ color: C.text, fontWeight: 700, fontSize: 16, fontFamily: “‘Outfit’, sans-serif”, marginBottom: 6 }}>{f.title}</div>
<div style={{ color: C.textDim, fontSize: 13, fontFamily: “‘Outfit’, sans-serif”, lineHeight: 1.65 }}>{f.desc}</div>
</div>
</div>
</div>
</FadeIn>
))}
</div>
</div>
<div className=“grid-3” style={{ display: “grid”, gridTemplateColumns: “repeat(3, 1fr)”, gap: 20 }}>
{features.slice(3).map((f, i) => (
<FadeIn key={i} delay={i * 0.1}>
<div style={{ background: “rgba(255,255,255,0.02)”, border: `1px solid ${C.borderDim}`, borderRadius: 16, padding: “32px 28px”, height: “100%”, transition: “border-color 0.3s” }}
onMouseEnter={e => e.currentTarget.style.borderColor = “rgba(0,194,255,0.2)”}
onMouseLeave={e => e.currentTarget.style.borderColor = C.borderDim}>
<span style={{ fontSize: 32, display: “block”, marginBottom: 16 }}>{f.icon}</span>
<div style={{ color: C.text, fontWeight: 700, fontSize: 16, fontFamily: “‘Outfit’, sans-serif”, marginBottom: 8 }}>{f.title}</div>
<div style={{ color: C.textDim, fontSize: 13, fontFamily: “‘Outfit’, sans-serif”, lineHeight: 1.65 }}>{f.desc}</div>
</div>
</FadeIn>
))}
</div>
</div>
</section>
);
};

/* ═══════════════════════════════════════════════════
3D PRODUCT VIEWER — Interactive port explorer
═══════════════════════════════════════════════════ */
const W = 260, H = 400, D = 110;

const FEATURES = {
“5g”: { label: “3× 5G Modules”, face: “left”, desc: “Three built-in 5G cellular modules with nano-SIM slots. SIM 1, 2, and 3 on the left panel.” },
“4g”: { label: “3× 4G Modules”, face: “left”, desc: “Three built-in 4G LTE modules with nano-SIM slots. SIM 4, 5, and 6 on the left panel.” },
sim: { label: “6× Physical SIM”, face: “left”, desc: “Six nano-SIM tray slots. Carrier-agnostic — use any provider, any country, swap in the field.” },
sdcard: { label: “SD Card Slot”, face: “left”, desc: “Full-size SD card slot between SIM 3 and SIM 4. Up to 512GB for local 4K recording.” },
usb: { label: “2× USB-A Ports”, face: “left”, desc: “Two USB-A 3.0 ports below SIM trays. For dongles, network adapters, or UVC camera input.” },
fan: { label: “Active Cooling Fan”, face: “left”, desc: “Large circular intake fan at bottom of left panel. Active cooling for sustained 4K encoding.” },
audio: { label: “Audio I/O”, face: “right”, desc: “Three 3.5mm jacks — mic input (red), headphone output (green), intercom (green). 4-ch AAC.” },
sdiout: { label: “SDI OUT”, face: “right”, desc: “BNC output for 3G-SDI. Loop-through to external monitors or broadcast infrastructure.” },
hdmiout: { label: “HDMI OUT”, face: “right”, desc: “Full-size HDMI output up to 4K60P. External monitors or capture devices.” },
sdiin: { label: “SDI IN”, face: “right”, desc: “BNC input for 3G-SDI cameras. Professional broadcast-standard video input.” },
hdmiin: { label: “HDMI IN”, face: “right”, desc: “Full-size HDMI input up to 4K60P. Primary camera input connector.” },
ethernet: { label: “2× Gigabit Ethernet”, face: “right”, desc: “Dual RJ45 GbE ports. Hot-plug. Bonding, Starlink backhaul, or network sharing.” },
usbc: { label: “USB-C”, face: “right”, desc: “USB-C port for data, firmware updates, or additional connectivity.” },
power: { label: “DC 12V Power”, face: “right”, desc: “DC barrel — 12V/5A (30W). Internal 12000mAh battery provides 4+ hours. V-Mount supported.” },
screen: { label: ‘5.5” Touchscreen’, face: “front”, desc: “HD touch display with dual-preview, audio meters, signal strength, and full stream control.” },
};

const ROTATIONS = {
front: { x: 0, y: 0 }, back: { x: 0, y: 180 },
right: { x: 0, y: -90 }, left: { x: 0, y: 90 }, top: { x: -90, y: 0 },
};

/* ══════════════════════════════════════════
FRONT FACE — layered depth
══════════════════════════════════════════ */
const FrontFace = ({ active, onSelect }) => (
<svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: “block” }}>
<defs>
<linearGradient id="fBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#353840" /><stop offset="100%" stopColor="#28292f" /></linearGradient>
<linearGradient id="bluBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1155ee" /><stop offset="100%" stopColor="#0044cc" /></linearGradient>
<linearGradient id="rTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,0,0,0.55)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></linearGradient>
<linearGradient id="rLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(0,0,0,0.3)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></linearGradient>
<linearGradient id="eTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.07)" /><stop offset="40%" stopColor="rgba(255,255,255,0)" /></linearGradient>
<linearGradient id="eLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(255,255,255,0.05)" /><stop offset="25%" stopColor="rgba(255,255,255,0)" /></linearGradient>
</defs>

```
{/* Body */}
<rect width={W} height={H} rx="0" fill="url(#fBody)" />
{/* Inner visual border for rounded device look */}
<rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="none" stroke="#45484f" strokeWidth="1" />
<rect x="0" y="0" width="5" height={H} rx="3" fill="url(#eLeft)" />
<rect x="0" y="0" width={W} height="5" rx="3" fill="url(#eTop)" />
<rect x={W - 3} y="0" width="3" height={H} fill="rgba(0,0,0,0.12)" rx="1.5" />
<rect x="0" y={H - 2} width={W} height="2" fill="rgba(0,0,0,0.15)" rx="1" />

{/* ── Raised top ledge ── */}
<rect x="4" y="2" width={W - 8} height="36" rx="6" fill="#3a3d44" />
<rect x="4" y="2" width={W - 8} height="2.5" rx="1" fill="rgba(255,255,255,0.05)" />
<rect x="4" y="36" width={W - 8} height="6" fill="url(#rTop)" opacity="0.5" />
{/* Blue label */}
<rect x="78" y="5" width="104" height="26" rx="4" fill="#003aaa" />
<rect x="80" y="6" width="100" height="24" rx="3" fill="#0055ee" />
<rect x="82" y="7" width="96" height="8" rx="2" fill="rgba(100,160,255,0.12)" />
<text x="130" y="24" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace" letterSpacing="1.5">RamPack</text>

{/* ── SCREEN BEZEL (visible border around screen) ── */}
<rect x="8" y="40" width={W - 16} height="150" rx="6" fill="#1a1c22" />
<rect x="8" y="40" width={W - 16} height="6" rx="3" fill="url(#rTop)" />
<rect x="8" y="40" width="6" height="150" rx="3" fill="url(#rLeft)" />
<rect x={W - 14} y="40" width="6" height="150" rx="3" fill="rgba(255,255,255,0.015)" />
<rect x="8" y="184" width={W - 16} height="6" rx="3" fill="rgba(255,255,255,0.02)" />
<rect x="8" y="40" width={W - 16} height="150" rx="6" fill="none" stroke="#2a2d35" strokeWidth="1" />

{/* ── 5.5" LCD PANEL (16:9 landscape) ── */}
<rect x="18" y="50" width={W - 36} height="130" rx="3" fill="#060810" />

{/* Screen content — live preview */}
<rect x="22" y="54" width={W - 44} height="122" rx="2" fill="#080c14" />

{/* Top bar — status icons */}
<rect x="22" y="54" width={W - 44} height="14" rx="2" fill="rgba(0,0,0,0.3)" />
<text x="28" y="63" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="monospace">RamPack Pro</text>
<text x={W - 28} y="63" textAnchor="end" fontSize="5" fill="rgba(255,255,255,0.15)" fontFamily="monospace">4K30 H.265</text>
{/* Signal bars */}
{[0,1,2,3,4].map(i => (
  <rect key={i} x={140 + i * 5} y={63 - 2 - i * 1.5} width="3" height={3 + i * 1.5} rx="0.3" fill={i < 3 ? "rgba(0,200,80,0.35)" : "rgba(0,200,80,0.2)"} />
))}

{/* Main preview area */}
<rect x="24" y="70" width={W - 48} height="90" rx="1" fill="#0a0e16" stroke="rgba(0,220,80,0.2)" strokeWidth="0.5" />
{/* Preview placeholder — dark with subtle camera icon */}
<text x={W / 2} y="118" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,0.04)">▶</text>
<text x={W / 2} y="132" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.08)" fontFamily="monospace">HDMI INPUT — LIVE</text>

{/* Bottom bar — audio meters + stream info */}
<rect x="22" y="162" width={W - 44} height="12" rx="1" fill="rgba(0,0,0,0.25)" />
{/* Audio level bars */}
{[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
  <rect key={i} x={28 + i * 5} y="164" width="3" height="8" rx="0.3"
    fill={i < 6 ? "rgba(0,200,80,0.3)" : i < 9 ? "rgba(220,200,0,0.3)" : "rgba(220,50,50,0.2)"} />
))}
<text x="102" y="170" fontSize="4" fill="rgba(255,255,255,0.12)" fontFamily="monospace">-12dB</text>
{/* Bitrate */}
<text x="140" y="170" fontSize="4" fill="rgba(0,194,255,0.3)" fontFamily="monospace">38.5 Mbps</text>
{/* Recording indicator */}
<circle cx="190" cy="168" r="2" fill="rgba(220,30,30,0.4)" />
<text x="198" y="170" fontSize="4" fill="rgba(220,30,30,0.3)" fontFamily="monospace">REC</text>

{/* ── Branding panel (raised) ── */}
<rect x="6" y="196" width={W - 12} height="48" rx="4" fill="#32353c" />
<rect x="6" y="196" width={W - 12} height="2" rx="1" fill="rgba(255,255,255,0.04)" />
<rect x="6" y="242" width={W - 12} height="2" rx="1" fill="rgba(0,0,0,0.15)" />
<text x={W / 2} y="220" textAnchor="middle" fontSize="21" fontWeight="700" fill="#dde0e6" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="0.5">RamPack Pro</text>
<text x={W / 2} y="236" textAnchor="middle" fontSize="7.5" fill="rgba(0,194,255,0.35)" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="3.5">FIELDLINK NETWORKS</text>

{/* ── Button panel (recessed) ── */}
<rect x="6" y="248" width={W - 54} height="78" rx="4" fill="#1e2026" />
<rect x="6" y="248" width={W - 54} height="5" rx="2" fill="url(#rTop)" opacity="0.4" />
<rect x="6" y="248" width="4" height="78" rx="2" fill="url(#rLeft)" opacity="0.3" />

{/* ── 4 LED indicators (vertical column) ── */}
{/* Lock indicator */}
<circle cx="24" cy="262" r="3" fill="rgba(0,0,0,0.3)" stroke="rgba(80,84,96,0.4)" strokeWidth="0.5" />
<circle cx="24" cy="262" r="1.5" fill="rgba(255,160,0,0.3)" />
<text x="34" y="264" fontSize="4.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">LOCK</text>

{/* Internet indicator */}
<circle cx="24" cy="276" r="3" fill="rgba(0,0,0,0.3)" stroke="rgba(80,84,96,0.4)" strokeWidth="0.5" />
<circle cx="24" cy="276" r="1.5" fill="rgba(0,200,80,0.35)" />
<text x="34" y="278" fontSize="4.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">NET</text>

{/* Recording indicator */}
<circle cx="24" cy="290" r="3" fill="rgba(0,0,0,0.3)" stroke="rgba(80,84,96,0.4)" strokeWidth="0.5" />
<circle cx="24" cy="290" r="1.5" fill="rgba(220,30,30,0.35)" />
<text x="34" y="292" fontSize="4.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">REC</text>

{/* Battery charging indicator */}
<circle cx="24" cy="304" r="3" fill="rgba(0,0,0,0.3)" stroke="rgba(80,84,96,0.4)" strokeWidth="0.5" />
<circle cx="24" cy="304" r="1.5" fill="rgba(0,120,255,0.35)" />
<text x="34" y="306" fontSize="4.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">BAT</text>

{/* Blue LED bars (recessed tray) */}
<rect x="72" y="256" width="120" height="22" rx="3" fill="#161820" />
<rect x="72" y="256" width="120" height="3" rx="1.5" fill="url(#rTop)" opacity="0.3" />
<rect x="78" y="260" width="106" height="7" rx="3" fill="url(#bluBar)" opacity="0.7" />
<rect x="78" y="271" width="106" height="7" rx="3" fill="url(#bluBar)" opacity="0.4" />

{/* ── Right button cluster (raised pad) ── */}
<rect x={W - 46} y="248" width="40" height="78" rx="5" fill="#33363e" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
<rect x={W - 46} y="248" width="40" height="2.5" rx="1" fill="rgba(255,255,255,0.04)" />

{/* Power button — white with black power icon */}
<circle cx={W - 26} cy="262" r="9" fill="rgba(220,225,230,0.85)" stroke="rgba(180,185,190,0.5)" strokeWidth="0.8" />
<circle cx={W - 26} cy="262.5" r="4.5" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.2" />
<line x1={W - 26} y1="257.5" x2={W - 26} y2="262.5" stroke="rgba(0,0,0,0.7)" strokeWidth="1.4" strokeLinecap="round" />

{/* Record mode button — white with black record dot */}
<circle cx={W - 26} cy="286" r="9" fill="rgba(220,225,230,0.85)" stroke="rgba(180,185,190,0.5)" strokeWidth="0.8" />
<circle cx={W - 26} cy="286" r="3.5" fill="rgba(0,0,0,0.7)" />

{/* Lock screen button — white with black padlock */}
<circle cx={W - 26} cy="310" r="9" fill="rgba(220,225,230,0.85)" stroke="rgba(180,185,190,0.5)" strokeWidth="0.8" />
<rect x={W - 30} y="309.5" width="8" height="6" rx="1" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.1" />
<path d={`M${W - 29} 309.5 L${W - 29} 307.5 Q${W - 29} 304.5 ${W - 26} 304.5 Q${W - 23} 304.5 ${W - 23} 307.5 L${W - 23} 309.5`} fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.1" strokeLinecap="round" />

{active === "screen" && <rect x="6" y="38" width={W - 12} height="156" rx="7" fill="none" stroke="#00C2FF" strokeWidth="2.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}

{/* ── Click targets ── */}
<rect x="8" y="40" width={W - 16} height="150" rx="6" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("screen")} />
```

  </svg>
);

/* ══════════════════════════════════════════
BACK FACE — V-Mount plate, label
══════════════════════════════════════════ */
const BackFace = () => (
<svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: “block” }}>
<defs>
<linearGradient id="bBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#333640" /><stop offset="100%" stopColor="#282a30" /></linearGradient>
</defs>
<rect width={W} height={H} rx="0" fill="url(#bBody)" />
<rect x=“1” y=“1” width={W - 2} height={H - 2} rx=“8” fill=“none” stroke=”#45484f” strokeWidth=“1” />
<rect x="0" y="0" width="4" height={H} rx="2" fill="rgba(255,255,255,0.04)" />
<rect x="0" y="0" width={W} height="4" rx="2" fill="rgba(255,255,255,0.035)" />
<rect x={W - 3} y=“0” width=“3” height={H} fill=“rgba(0,0,0,0.12)” rx=“1.5” />

```
{/* ── Product label ── */}
<rect x="40" y={H / 2 - 50} width={W - 80} height="100" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
<text x={W / 2} y={H / 2 - 20} textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.2)" fontFamily="'Helvetica Neue',sans-serif">FieldLink Networks</text>
<text x={W / 2} y={H / 2 - 4} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.12)" fontFamily="monospace">RamPack Pro Encoder</text>
<text x={W / 2} y={H / 2 + 12} textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.08)" fontFamily="monospace">Model: RP-E400 | 12V DC</text>
<text x={W / 2} y={H / 2 + 26} textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.08)" fontFamily="monospace">Input: 100-240V 50/60Hz</text>
{/* FCC / CE marks */}
<text x={W / 2 - 25} y={H / 2 + 42} textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.08)" fontFamily="serif">FC</text>
<text x={W / 2 + 25} y={H / 2 + 42} textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.08)" fontFamily="serif">CE</text>
```

  </svg>
);

/* ══════════════════════════════════════════
LEFT FACE (SIMs) — 6 SIMs, SD, 2 USB, Fan
══════════════════════════════════════════ */
const LeftFace = ({ active, onSelect }) => (
<svg width={D} height={H} viewBox={`0 0 ${D} ${H}`} style={{ display: “block” }}>
<rect width={D} height={H} rx="0" fill="#2e3038" />
<rect x=“1” y=“1” width={D - 2} height={H - 2} rx=“5” fill=“none” stroke=”#45484f” strokeWidth=“0.8” />
<rect x="0" y="0" width="3" height={H} rx="1.5" fill="rgba(255,255,255,0.04)" />
<rect x="0" y="0" width={D} height="3" rx="1.5" fill="rgba(255,255,255,0.03)" />
<rect x={D - 2} y=“0” width=“2” height={H} fill=“rgba(0,0,0,0.12)” rx=“1” />

```
{/* ── SIM 1-3 (5G) — tight vertical slots ── */}
{[0,1,2].map(i => {
  const y = 20 + i * 34;
  return (
    <g key={`5g${i}`}>
      {/* 5G icon */}
      <text x="12" y={y + 14} fontSize="7" fontWeight="800" fill="rgba(0,194,255,0.4)" fontFamily="monospace">5G</text>
      {/* LED indicator dot */}
      <circle cx="13" cy={y + 24} r="2" fill="rgba(200,200,210,0.15)" />
      {/* Vertical SIM tray — tall narrow slot */}
      <rect x="38" y={y} width="12" height="28" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(80,84,96,0.6)" strokeWidth="0.7" />
      {/* SIM label rotated */}
      <text x="55" y={y + 18} fontSize="6" fontWeight="700" fill="rgba(255,255,255,0.22)" fontFamily="monospace">SIM {i + 1}</text>
      {/* Eject pin hole */}
      <circle cx="44" cy={y + 31} r="0.8" fill="rgba(0,0,0,0.4)" />
    </g>
  );
})}

{/* ── SD Card slot — between SIM 3 and SIM 4 ── */}
<text x="12" y="134" fontSize="9" fontWeight="800" fill="rgba(255,255,255,0.15)" fontFamily="Arial,sans-serif">SD</text>
<rect x="38" y="124" width="24" height="18" rx="2" fill="rgba(0,0,0,0.35)" stroke="rgba(80,84,96,0.6)" strokeWidth="0.7" />

{/* ── SIM 4-6 (4G) — tight vertical slots ── */}
{[0,1,2].map(i => {
  const y = 152 + i * 34;
  return (
    <g key={`4g${i}`}>
      {/* 4G icon */}
      <text x="12" y={y + 14} fontSize="7" fontWeight="800" fill="rgba(0,163,224,0.35)" fontFamily="monospace">4G</text>
      {/* LED indicator dot */}
      <circle cx="13" cy={y + 24} r="2" fill="rgba(200,200,210,0.15)" />
      {/* Vertical SIM tray */}
      <rect x="38" y={y} width="12" height="28" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(80,84,96,0.6)" strokeWidth="0.7" />
      {/* SIM label */}
      <text x="55" y={y + 18} fontSize="6" fontWeight="700" fill="rgba(255,255,255,0.22)" fontFamily="monospace">SIM {i + 4}</text>
      {/* Eject pin hole */}
      <circle cx="44" cy={y + 31} r="0.8" fill="rgba(0,0,0,0.4)" />
    </g>
  );
})}

{/* ── 2× USB-A ports ── */}
{[0,1].map(i => {
  const y = 268 + i * 28;
  return (
    <g key={`usb${i}`}>
      <text x="12" y={y + 9} fontSize="5" fill="rgba(255,255,255,0.1)" fontFamily="monospace">⚡</text>
      <rect x="30" y={y} width="40" height="14" rx="2" fill="rgba(0,0,20,0.45)" stroke="rgba(80,84,96,0.6)" strokeWidth="0.7" />
      <rect x="33" y={y + 3.5} width="34" height="7" rx="1" fill="rgba(0,60,200,0.2)" />
    </g>
  );
})}

{/* ── Large circular fan vent ── */}
<circle cx={D / 2} cy="356" r="28" fill="rgba(0,0,0,0.25)" stroke="rgba(80,84,96,0.4)" strokeWidth="1" />
{/* Fan grille pattern */}
<circle cx={D / 2} cy="356" r="20" fill="none" stroke="rgba(80,84,96,0.2)" strokeWidth="0.5" />
<circle cx={D / 2} cy="356" r="12" fill="none" stroke="rgba(80,84,96,0.15)" strokeWidth="0.5" />
{[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
  const a = (i / 12) * Math.PI * 2;
  return <line key={i} x1={D / 2} y1={356} x2={D / 2 + Math.cos(a) * 25} y2={356 + Math.sin(a) * 25} stroke="rgba(80,84,96,0.2)" strokeWidth="0.5" />;
})}
{/* Center hub */}
<circle cx={D / 2} cy="356" r="4" fill="rgba(0,0,0,0.35)" />

{/* ══ HIGHLIGHTS ══ */}
{active === "5g" && [0,1,2].map(i => <rect key={i} x="34" y={18 + i * 34} width="20" height="32" rx="3" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" /></rect>)}
{active === "4g" && [0,1,2].map(i => <rect key={i} x="34" y={150 + i * 34} width="20" height="32" rx="3" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" /></rect>)}
{active === "sim" && [0,1,2,3,4,5].map(i => {
  const y = i < 3 ? 20 + i * 34 : 152 + (i - 3) * 34;
  return <rect key={i} x="35" y={y - 1} width="18" height="30" rx="2.5" fill="none" stroke="#00C2FF" strokeWidth="1.5"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" /></rect>;
})}
{active === "sdcard" && <rect x="34" y="120" width="32" height="26" rx="3" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}
{active === "usb" && [0,1].map(i => <rect key={i} x="26" y={266 + i * 28} width="48" height="18" rx="3" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>)}
{active === "fan" && <circle cx={D / 2} cy="356" r="32" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" /></circle>}

{/* ── Click targets ── */}
{[0,1,2].map(i => <rect key={`c5g${i}`} x="8" y={18 + i * 34} width={D - 16} height="32" rx="3" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("5g")} />)}
<rect x="8" y="120" width={D - 16} height="26" rx="3" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("sdcard")} />
{[0,1,2].map(i => <rect key={`c4g${i}`} x="8" y={150 + i * 34} width={D - 16} height="32" rx="3" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("4g")} />)}
{[0,1].map(i => <rect key={`cusb${i}`} x="8" y={266 + i * 28} width={D - 16} height="18" rx="3" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("usb")} />)}
<circle cx={D / 2} cy="356" r="32" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("fan")} />
```

  </svg>
);

/* ══════════════════════════════════════════
RIGHT FACE (Ports) — Audio, SDI, HDMI, Eth, USB-C, DC
══════════════════════════════════════════ */
const RightFace = ({ active, onSelect }) => (
<svg width={D} height={H} viewBox={`0 0 ${D} ${H}`} style={{ display: “block” }}>
<rect width={D} height={H} rx="0" fill="#2e3038" />
<rect x=“1” y=“1” width={D - 2} height={H - 2} rx=“5” fill=“none” stroke=”#45484f” strokeWidth=“0.8” />
<rect x="0" y="0" width="3" height={H} rx="1.5" fill="rgba(255,255,255,0.04)" />
<rect x="0" y="0" width={D} height="3" rx="1.5" fill="rgba(255,255,255,0.03)" />
<rect x={D - 2} y=“0” width=“2” height={H} fill=“rgba(0,0,0,0.12)” rx=“1” />

```
{/* ── Vent slats (top) ── */}
{[0,1].map(r => [0,1,2,3].map(c => (
  <rect key={`v${r}${c}`} x={14 + c * 20} y={12 + r * 10} width="14" height="3" rx="1.5" fill="rgba(0,0,0,0.3)" />
)))}

{/* ── Audio jacks — red (mic), green (hp), green (intercom) ── */}
<circle cx="22" cy="50" r="7.5" fill="rgba(50,5,5,0.6)" stroke="#cc3333" strokeWidth="1.8" />
<circle cx="22" cy="50" r="3" fill="rgba(0,0,0,0.5)" />
<circle cx="22" cy="50" r="1" fill="rgba(80,0,0,0.6)" />
<text x="22" y="65" textAnchor="middle" fontSize="4.5" fill="rgba(200,60,60,0.45)" fontFamily="monospace">MIC</text>

<circle cx="50" cy="50" r="7.5" fill="rgba(5,35,5,0.6)" stroke="#33aa44" strokeWidth="1.8" />
<circle cx="50" cy="50" r="3" fill="rgba(0,0,0,0.5)" />
<circle cx="50" cy="50" r="1" fill="rgba(0,50,0,0.6)" />
<text x="50" y="65" textAnchor="middle" fontSize="4.5" fill="rgba(60,200,80,0.45)" fontFamily="monospace">HP</text>

<circle cx="78" cy="50" r="7.5" fill="rgba(5,35,5,0.6)" stroke="#33aa44" strokeWidth="1.8" />
<circle cx="78" cy="50" r="3" fill="rgba(0,0,0,0.5)" />
<circle cx="78" cy="50" r="1" fill="rgba(0,50,0,0.6)" />
<text x="78" y="65" textAnchor="middle" fontSize="4.5" fill="rgba(60,200,80,0.45)" fontFamily="monospace">INT</text>

{/* ── SDI OUT — BNC connector ── */}
{/* Outer bayonet ring */}
<circle cx={D / 2 - 2} cy="90" r="13" fill="rgba(10,10,15,0.5)" stroke="rgba(140,145,155,0.5)" strokeWidth="1.8" />
{/* Knurled ring detail */}
<circle cx={D / 2 - 2} cy="90" r="11" fill="none" stroke="rgba(120,125,135,0.25)" strokeWidth="0.5" strokeDasharray="2 2" />
{/* Inner body */}
<circle cx={D / 2 - 2} cy="90" r="8" fill="rgba(15,16,22,0.9)" stroke="rgba(100,105,115,0.5)" strokeWidth="1" />
{/* Dielectric ring */}
<circle cx={D / 2 - 2} cy="90" r="4.5" fill="rgba(220,210,180,0.08)" stroke="rgba(200,190,160,0.2)" strokeWidth="0.8" />
{/* Center pin */}
<circle cx={D / 2 - 2} cy="90" r="1.5" fill="rgba(220,200,150,0.5)" />
{/* Bayonet lock tabs */}
<rect x={D / 2 - 17} y="86" width="4" height="8" rx="1.5" fill="rgba(140,145,155,0.35)" />
<rect x={D / 2 + 11} y="86" width="4" height="8" rx="1.5" fill="rgba(140,145,155,0.35)" />
<text x={D - 4} y="84" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontWeight="700" transform={`rotate(-90,${D - 4},84)`}>SDI OUT</text>

{/* ── HDMI OUT — trapezoid port shape ── */}
<g transform="translate(16, 116)">
  {/* Housing */}
  <rect x="0" y="0" width="56" height="20" rx="2.5" fill="rgba(0,0,0,0.3)" stroke="rgba(100,105,115,0.45)" strokeWidth="1" />
  {/* HDMI trapezoid — wider top, tapered bottom */}
  <path d="M8,4 L48,4 L44,16 L12,16 Z" fill="rgba(0,0,0,0.55)" stroke="rgba(90,95,105,0.5)" strokeWidth="0.8" />
  {/* Contact pins row */}
  {[0,1,2,3,4,5,6,7,8].map(i => (
    <rect key={i} x={14 + i * 3} y="8" width="1.5" height="5" rx="0.3" fill="rgba(200,185,140,0.12)" />
  ))}
</g>
<text x={D - 4} y="120" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontWeight="700" transform={`rotate(-90,${D - 4},120)`}>HDMI OUT</text>

{/* ── SDI IN — BNC connector ── */}
<circle cx={D / 2 - 2} cy="158" r="13" fill="rgba(10,10,15,0.5)" stroke="rgba(140,145,155,0.5)" strokeWidth="1.8" />
<circle cx={D / 2 - 2} cy="158" r="11" fill="none" stroke="rgba(120,125,135,0.25)" strokeWidth="0.5" strokeDasharray="2 2" />
<circle cx={D / 2 - 2} cy="158" r="8" fill="rgba(15,16,22,0.9)" stroke="rgba(100,105,115,0.5)" strokeWidth="1" />
<circle cx={D / 2 - 2} cy="158" r="4.5" fill="rgba(220,210,180,0.08)" stroke="rgba(200,190,160,0.2)" strokeWidth="0.8" />
<circle cx={D / 2 - 2} cy="158" r="1.5" fill="rgba(220,200,150,0.5)" />
<rect x={D / 2 - 17} y="154" width="4" height="8" rx="1.5" fill="rgba(140,145,155,0.35)" />
<rect x={D / 2 + 11} y="154" width="4" height="8" rx="1.5" fill="rgba(140,145,155,0.35)" />
<text x={D - 4} y="152" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontWeight="700" transform={`rotate(-90,${D - 4},152)`}>SDI IN</text>

{/* ── HDMI IN — trapezoid port shape ── */}
<g transform="translate(16, 182)">
  <rect x="0" y="0" width="56" height="20" rx="2.5" fill="rgba(0,0,0,0.3)" stroke="rgba(100,105,115,0.45)" strokeWidth="1" />
  <path d="M8,4 L48,4 L44,16 L12,16 Z" fill="rgba(0,0,0,0.55)" stroke="rgba(90,95,105,0.5)" strokeWidth="0.8" />
  {[0,1,2,3,4,5,6,7,8].map(i => (
    <rect key={i} x={14 + i * 3} y="8" width="1.5" height="5" rx="0.3" fill="rgba(200,185,140,0.12)" />
  ))}
</g>
<text x={D - 4} y="186" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontWeight="700" transform={`rotate(-90,${D - 4},186)`}>HDMI IN</text>

{/* ── Divider ── */}
<line x1="8" y1="214" x2={D - 8} y2="214" stroke="rgba(255,255,255,0.04)" />

{/* ── Ethernet 1 (RJ45) ── */}
<rect x="16" y="224" width="50" height="26" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(100,105,115,0.45)" strokeWidth="1" />
<rect x="22" y="228" width="38" height="18" rx="1.5" fill="rgba(0,0,0,0.4)" />
<rect x="33" y="226" width="16" height="3" rx="1" fill="rgba(255,255,255,0.04)" />
<circle cx="26" cy="242" r="1.5" fill="rgba(0,200,80,0.2)" />
<circle cx="56" cy="242" r="1.5" fill="rgba(255,180,0,0.2)" />
<text x={D - 4} y="240" fontSize="5" fill="rgba(255,255,255,0.14)" fontFamily="monospace">GbE</text>

{/* ── Ethernet 2 (RJ45) ── */}
<rect x="16" y="258" width="50" height="26" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(100,105,115,0.45)" strokeWidth="1" />
<rect x="22" y="262" width="38" height="18" rx="1.5" fill="rgba(0,0,0,0.4)" />
<rect x="33" y="260" width="16" height="3" rx="1" fill="rgba(255,255,255,0.04)" />
<circle cx="26" cy="276" r="1.5" fill="rgba(0,200,80,0.2)" />
<circle cx="56" cy="276" r="1.5" fill="rgba(255,180,0,0.2)" />
<text x={D - 4} y="274" fontSize="5" fill="rgba(255,255,255,0.14)" fontFamily="monospace">GbE</text>

{/* ── Divider ── */}
<line x1="8" y1="294" x2={D - 8} y2="294" stroke="rgba(255,255,255,0.04)" />

{/* ── USB-C ── */}
<rect x="28" y="304" width="36" height="11" rx="5.5" fill="rgba(0,0,30,0.45)" stroke="rgba(100,105,115,0.45)" strokeWidth="0.8" />
<rect x="33" y="307" width="26" height="5" rx="2.5" fill="rgba(0,60,200,0.15)" />
<text x={D - 4} y="312" fontSize="5" fill="rgba(255,255,255,0.14)" fontFamily="monospace">USB</text>

{/* ── DC 12V barrel jack ── */}
<rect x="22" y="328" width="44" height="22" rx="3" fill="rgba(0,0,0,0.3)" stroke="rgba(100,105,115,0.45)" strokeWidth="1" />
<circle cx="44" cy="339" r="7" fill="rgba(0,0,0,0.45)" stroke="rgba(80,84,96,0.4)" strokeWidth="0.8" />
<circle cx="44" cy="339" r="3" fill="rgba(0,0,0,0.55)" />
<circle cx="44" cy="339" r="1.2" fill="rgba(0,0,0,0.65)" />
<text x={D / 2} y="362" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="rgba(255,255,255,0.18)" fontFamily="monospace">DC 12V</text>

{/* ══ HIGHLIGHTS ══ */}
{active === "audio" && <rect x="8" y="36" width={D - 16} height="36" rx="6" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}
{active === "sdiout" && <circle cx={D / 2 - 2} cy="90" r="17" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></circle>}
{active === "hdmiout" && <rect x="12" y="112" width="64" height="28" rx="4" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}
{active === "sdiin" && <circle cx={D / 2 - 2} cy="158" r="17" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></circle>}
{active === "hdmiin" && <rect x="12" y="178" width="64" height="28" rx="4" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}
{active === "ethernet" && <>
  <rect x="12" y="220" width="58" height="32" rx="4" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>
  <rect x="12" y="254" width="58" height="32" rx="4" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>
</>}
{active === "usbc" && <rect x="24" y="300" width="44" height="19" rx="6" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}
{active === "power" && <rect x="18" y="324" width="52" height="30" rx="4" fill="none" stroke="#00C2FF" strokeWidth="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></rect>}

{/* ── Click targets ── */}
<rect x="6" y="36" width={D - 12} height="36" rx="6" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("audio")} />
<rect x={D / 2 - 17} y="74" width="34" height="32" rx="4" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("sdiout")} />
<rect x="12" y="112" width="64" height="28" rx="4" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("hdmiout")} />
<rect x={D / 2 - 17} y="142" width="34" height="32" rx="4" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("sdiin")} />
<rect x="12" y="178" width="64" height="28" rx="4" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("hdmiin")} />
<rect x="12" y="220" width="58" height="66" rx="4" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("ethernet")} />
<rect x="24" y="300" width="44" height="19" rx="6" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("usbc")} />
<rect x="18" y="324" width="52" height="42" rx="4" fill="transparent" style={{ cursor: "pointer" }} onClick={() => onSelect && onSelect("power")} />
```

  </svg>
);

/* ══════════════════════════════════════════
TOP FACE — Blue label, mount threads, label, fan
══════════════════════════════════════════ */
const TopFace = () => (
<svg width={W} height={D} viewBox={`0 0 ${W} ${D}`} style={{ display: “block” }}>
<rect width={W} height={D} rx="0" fill="#2e3038" />
<rect x=“1” y=“1” width={W - 2} height={D - 2} rx=“5” fill=“none” stroke=”#45484f” strokeWidth=“0.8” />
{/* Subtle surface texture */}
<rect x="0" y="0" width={W} height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
<rect x="0" y="0" width="3" height={D} rx="1.5" fill="rgba(255,255,255,0.03)" />
</svg>
);

/* ══════════ BOTTOM FACE ══════════ */
const BottomFace = () => (
<svg width={W} height={D} viewBox={`0 0 ${W} ${D}`} style={{ display: “block” }}>
<rect width={W} height={D} rx="0" fill="#24262c" />
<rect x=“1” y=“1” width={W - 2} height={D - 2} rx=“5” fill=“none” stroke=”#45484f” strokeWidth=“0.8” />
{[0,1,2,3].map(i => <circle key={i} cx={50 + i * 55} cy={D / 2} r=“5” fill=“rgba(0,0,0,0.25)” stroke=“rgba(80,84,96,0.3)” strokeWidth=“0.5” />)}
</svg>
);

/* ══════════ BUTTON CONFIG ══════════ */
const GROUPS = [
{ title: “Connectivity”, items: [
{ id: “5g”, icon: “📡”, label: “3× 5G” }, { id: “4g”, icon: “📶”, label: “3× 4G” },
{ id: “sim”, icon: “💳”, label: “6 SIM Slots” }, { id: “ethernet”, icon: “🔌”, label: “2× Ethernet” },
]},
{ title: “Video”, items: [
{ id: “screen”, icon: “🖥️”, label: ‘5.5” Screen’ }, { id: “hdmiin”, icon: “🎬”, label: “HDMI IN” },
{ id: “hdmiout”, icon: “📺”, label: “HDMI OUT” }, { id: “sdiin”, icon: “🎥”, label: “SDI IN” },
{ id: “sdiout”, icon: “📡”, label: “SDI OUT” },
]},
{ title: “Audio / Storage / Power”, items: [
{ id: “audio”, icon: “🎧”, label: “Audio I/O” }, { id: “sdcard”, icon: “💾”, label: “SD Card” },
{ id: “usb”, icon: “⚡”, label: “2× USB-A” }, { id: “usbc”, icon: “🔗”, label: “USB-C” },
{ id: “power”, icon: “🔋”, label: “DC 12V” }, { id: “fan”, icon: “🌀”, label: “Cooling Fan” },
]},
];

const ProductViewer3D = () => {
const [af, setAf] = useState(null);
const [rot, setRot] = useState({ x: 0, y: 0 });
const [isAuto, setIsAuto] = useState(true);
const [aa, setAa] = useState(-20);
const [manualRot, setManualRot] = useState({ x: 6, y: 0 });
const [isDragging, setIsDragging] = useState(false);
const dragRef = useRef(null);

useEffect(() => {
if (!isAuto) return;
const iv = setInterval(() => setAa(p => (p + 0.25) % 360), 30);
return () => clearInterval(iv);
}, [isAuto]);

const click = (id) => {
if (dragRef.current && dragRef.current.moved) return;
if (af === id) { setAf(null); setIsAuto(true); return; }
setIsAuto(false); setAf(id);
const r = ROTATIONS[FEATURES[id].face];
setRot(r); setManualRot(r);
};

const onPointerDown = (e) => {
if (e.target.style && e.target.style.cursor === “pointer”) return;
dragRef.current = { startX: e.clientX, startY: e.clientY, startRotX: manualRot.x, startRotY: manualRot.y, moved: false };
setIsDragging(true);
setIsAuto(false);
setAf(null);
};

useEffect(() => {
if (!isDragging) return;
const onMove = (e) => {
const d = dragRef.current;
if (!d) return;
const dx = e.clientX - d.startX;
const dy = e.clientY - d.startY;
if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
setManualRot({
x: Math.max(-60, Math.min(60, d.startRotX - dy * 0.4)),
y: d.startRotY + dx * 0.4,
});
};
const onUp = () => {
setTimeout(() => { dragRef.current = null; }, 50);
setIsDragging(false);
};
window.addEventListener(“pointermove”, onMove);
window.addEventListener(“pointerup”, onUp);
return () => {
window.removeEventListener(“pointermove”, onMove);
window.removeEventListener(“pointerup”, onUp);
};
}, [isDragging]);

useEffect(() => {
if (isAuto) setManualRot({ x: 6, y: aa });
}, [aa, isAuto]);

const rx = isAuto ? 6 : isDragging ? manualRot.x : af ? rot.x : manualRot.x;
const ry = isAuto ? aa : isDragging ? manualRot.y : af ? rot.y : manualRot.y;
const data = af ? FEATURES[af] : null;

return (
<div style={{ padding: “0px 0px”, fontFamily: “‘Outfit’,sans-serif” }}>

```
  <style>{`
    @keyframes pg{0%,100%{box-shadow:0 0 20px rgba(0,194,255,0.08)}50%{box-shadow:0 0 40px rgba(0,194,255,0.2)}}
    @media(max-width:820px){.pv-grid{grid-template-columns:1fr!important}.pv-scene{height:440px!important}}
  `}</style>
  <div style={{ maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Interactive Product View</span>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: C.text, margin: "12px 0 12px", letterSpacing: "-0.02em" }}>RamPack Pro Encoder</h2>
      <p style={{ color: C.textMid, fontSize: 14, fontWeight: 300, maxWidth: 480, margin: "0 auto" }}>Click any port on the device, drag to spin, or use the buttons to explore.</p>
    </div>
    <div className="pv-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 36, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="pv-scene" onPointerDown={onPointerDown} style={{ perspective: 1400, width: W + 120, height: H + 80, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: isDragging ? "grabbing" : "grab", touchAction: "none", userSelect: "none" }}>
          <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,194,255,0.05),transparent 70%)", bottom: -20, left: "50%", transform: "translateX(-50%)", filter: "blur(50px)" }} />
          <div style={{ width: W, height: H, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transition: (isAuto || isDragging) ? "none" : "transform 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
            {/* Front — W×H, pushed forward D/2 */}
            <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `translateZ(${D / 2}px)`, backfaceVisibility: "hidden" }}><FrontFace active={af} onSelect={click} /></div>
            {/* Back — W×H, flipped then pushed D/2 */}
            <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `rotateY(180deg) translateZ(${D / 2}px)`, backfaceVisibility: "hidden" }}><BackFace /></div>
            {/* Right — D×H, centered horizontally, rotated right, pushed W/2 */}
            <div style={{ position: "absolute", left: (W - D) / 2, top: 0, width: D, height: H, transform: `rotateY(90deg) translateZ(${W / 2}px)`, backfaceVisibility: "hidden" }}><RightFace active={af} onSelect={click} /></div>
            {/* Left — D×H, centered horizontally, rotated left, pushed W/2 */}
            <div style={{ position: "absolute", left: (W - D) / 2, top: 0, width: D, height: H, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, backfaceVisibility: "hidden" }}><LeftFace active={af} onSelect={click} /></div>
            {/* Top — W×D, centered vertically, rotated up, pushed H/2 */}
            <div style={{ position: "absolute", left: 0, top: (H - D) / 2, width: W, height: D, transform: `rotateX(90deg) translateZ(${H / 2}px)`, backfaceVisibility: "hidden" }}><TopFace /></div>
            {/* Bottom — W×D, centered vertically, rotated down, pushed H/2 */}
            <div style={{ position: "absolute", left: 0, top: (H - D) / 2, width: W, height: D, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, backfaceVisibility: "hidden" }}><BottomFace /></div>
          </div>
        </div>
        <div style={{ marginTop: 12, textAlign: "center", minHeight: 64, transition: "opacity 0.4s", opacity: data ? 1 : 0.3 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.accent, marginBottom: 4 }}>{data ? data.label : "Select a feature"}</div>
          <div style={{ color: C.textMid, fontSize: 13, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>{data ? data.desc : "Click any button to rotate and explore."}</div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {["front","left","right","back","top"].map(f => (
            <button key={f} onClick={() => { setIsAuto(false); setAf(null); setRot(ROTATIONS[f]); setManualRot(ROTATIONS[f]); }} style={{
              padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 600, textTransform: "capitalize",
              background: !isAuto && rot.y === ROTATIONS[f].y && rot.x === ROTATIONS[f].x ? "rgba(0,194,255,0.12)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${!isAuto && rot.y === ROTATIONS[f].y && rot.x === ROTATIONS[f].x ? "rgba(0,194,255,0.25)" : C.borderDim}`,
              color: !isAuto && rot.y === ROTATIONS[f].y && rot.x === ROTATIONS[f].x ? C.accent : C.textDim, fontFamily: "'Outfit',sans-serif",
            }}>{f}</button>
          ))}
          <button onClick={() => { setIsAuto(true); setAf(null); }} style={{
            padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 600,
            background: isAuto ? "rgba(0,194,255,0.12)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${isAuto ? "rgba(0,194,255,0.25)" : C.borderDim}`,
            color: isAuto ? C.accent : C.textDim, fontFamily: "'Outfit',sans-serif",
          }}>Auto ↻</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {GROUPS.map(g => (
          <div key={g.title}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{g.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {g.items.map(item => {
                const on = af === item.id;
                return (
                  <button key={item.id} onClick={() => click(item.id)} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 7, cursor: "pointer", width: "100%", textAlign: "left",
                    background: on ? "rgba(0,194,255,0.08)" : "rgba(255,255,255,0.015)",
                    border: `1px solid ${on ? "rgba(0,194,255,0.25)" : C.borderDim}`,
                    color: on ? C.accent : C.textMid, fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600,
                    transition: "all 0.2s", animation: on ? "pg 2s ease infinite" : "none",
                  }}>
                    <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{item.icon}</span>
                    <span>{item.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 8, fontWeight: 400, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{FEATURES[item.id].face}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
```

);
}

const Encoder = () => (

  <section id="encoder" className="section-pad" style={{ padding: "120px clamp(20px,4vw,60px)", background: C.bg }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ color: C.accentMid, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Core Encoder</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: C.text, margin: "16px 0 20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>RamPack Pro</h2>
          <p style={{ color: C.textMid, fontSize: 17, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: 620, margin: "0 auto" }}>
            5G 4K bonded live streaming encoder with multi-network aggregation,
            dual-channel switching, and 5.5" touchscreen control. The brain inside every RamPack Shell.
          </p>
        </div>
      </FadeIn>
      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 64 }}>
        {[
          { val: "3×5G", sub: "Built-in Modules", c: C.accent },
          { val: "3×4G", sub: "Built-in Modules", c: C.accentMid },
          { val: "WiFi 6", sub: "Dual 2.4G / 5.8G", c: C.accent },
          { val: "2×GbE", sub: "Ethernet (Hot-Plug)", c: C.accentMid },
        ].map((s, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderDim}`, borderRadius: 16, padding: "28px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 32, color: s.c }}>{s.val}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: C.textDim, marginTop: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.sub}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn>
        <div style={{ margin: "64px 0", padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Network Architecture</span>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: C.text, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>Bonded Multi-Path Uplink</h3>
            <p style={{ color: C.textMid, fontSize: 14, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: 540, margin: "0 auto" }}>
              All network interfaces bond into a single resilient data path. Automatic failover, load balancing, and aggregation — no single point of failure.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
            {/* ── Left: Input Sources ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }}>
              {[
                { label: "SIM 1 – 5G", color: C.accent, icon: "📶" },
                { label: "SIM 2 – 5G", color: C.accent, icon: "📶" },
                { label: "SIM 3 – 5G", color: C.accent, icon: "📶" },
                { label: "SIM 4 – 4G", color: C.accentMid, icon: "📡" },
                { label: "SIM 5 – 4G", color: C.accentMid, icon: "📡" },
                { label: "SIM 6 – 4G", color: C.accentMid, icon: "📡" },
                { label: "WiFi 6", color: "#A78BFA", icon: "📻" },
                { label: "Ethernet 1", color: "#34D399", icon: "🔌" },
                { label: "Ethernet 2", color: "#34D399", icon: "🔌" },
                { label: "USB Modem 1", color: "#F472B6", icon: "🔗" },
                { label: "USB Modem 2", color: "#F472B6", icon: "🔗" },
                { label: "Starlink", color: "#F59E0B", icon: "🛰️" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 14px", background: "rgba(255,255,255,0.02)", border: `1px solid ${s.color}22`, borderRadius: 8 }}>
                  <span style={{ fontSize: 14 }}>{s.icon}</span>
                  <span style={{ color: s.color, fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
              ))}
            </div>

```
        {/* ── Center: Bonding lines → Encoder → Output lines ── */}
        <svg width="360" height="500" viewBox="0 0 360 500" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={C.accent} stopOpacity="0.3" /><stop offset="100%" stopColor={C.accent} stopOpacity="0.8" /></linearGradient>
            <linearGradient id="archGradOut" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={C.accent} stopOpacity="0.8" /><stop offset="100%" stopColor={C.accent} stopOpacity="0.3" /></linearGradient>
            <filter id="archGlow"><feGaussianBlur stdDeviation="3" /><feComposite in="SourceGraphic" /></filter>
          </defs>
          {/* Input lines converging to center */}
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
            const sy = 18 + i * 40;
            return <line key={`in${i}`} x1="0" y1={sy} x2="120" y2="250" stroke="url(#archGrad)" strokeWidth="1.5" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
            </line>;
          })}
          {/* Center encoder box */}
          <rect x="110" y="210" width="140" height="80" rx="16" fill="rgba(0,194,255,0.06)" stroke={C.accent} strokeWidth="1.5" />
          <rect x="110" y="210" width="140" height="80" rx="16" fill="none" stroke={C.accent} strokeWidth="1" filter="url(#archGlow)" opacity="0.3" />
          <text x="180" y="240" textAnchor="middle" fontSize="11" fontWeight="800" fill={C.accent} fontFamily="'Outfit', sans-serif">RamPack Pro</text>
          <text x="180" y="256" textAnchor="middle" fontSize="9" fill={C.textMid} fontFamily="'Outfit', sans-serif">Bonding Engine</text>
          <text x="180" y="274" textAnchor="middle" fontSize="8" fill={C.textDim} fontFamily="'Outfit', sans-serif">H.265 · 4K · Encrypt</text>
          {/* Output lines diverging from center */}
          {[0,1,2,3,4].map(i => {
            const ey = 60 + i * 85;
            return <line key={`out${i}`} x1="250" y1="250" x2="360" y2={ey} stroke="url(#archGradOut)" strokeWidth="1.5" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </line>;
          })}
          {/* Animated data flow dots on input lines */}
          {[0,2,5,8,10].map(i => {
            const sy = 18 + i * 40;
            return <circle key={`dot${i}`} r="2" fill={C.accent}>
              <animateMotion dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" path={`M0,${sy} L120,250`} />
            </circle>;
          })}
          {/* Animated data flow dots on output lines */}
          {[0,2,4].map(i => {
            const ey = 60 + i * 85;
            return <circle key={`odot${i}`} r="2" fill={C.accent}>
              <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" path={`M250,250 L360,${ey}`} />
            </circle>;
          })}
        </svg>

        {/* ── Right: Output Destinations ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }}>
          {[
            { label: "RTMP / RTMPS", desc: "YouTube, Twitch, Kick", color: "#F87171", icon: "🔴" },
            { label: "SRT", desc: "Low-latency pro feeds", color: "#60A5FA", icon: "🔵" },
            { label: "RTSP", desc: "IP camera integration", color: "#A78BFA", icon: "🟣" },
            { label: "SDI OUT", desc: "Broadcast infrastructure", color: "#34D399", icon: "🟢" },
            { label: "HDMI OUT", desc: "External monitors", color: "#FBBF24", icon: "🟡" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: `1px solid ${s.color}22`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>{s.icon}</span>
                <span style={{ color: s.color, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{s.label}</span>
              </div>
              <span style={{ color: C.textDim, fontSize: 11, fontFamily: "'Outfit', sans-serif" }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 40, flexWrap: "wrap" }}>
        {[
          { val: "12", unit: "Links", desc: "Simultaneous bonds" },
          { val: "<1s", unit: "", desc: "Link recovery" },
          { val: "100%", unit: "", desc: "Carrier agnostic" },
          { val: "AES", unit: "256", desc: "End-to-end encryption" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: C.accent }}>{s.val}<span style={{ fontSize: 14, color: C.textMid, fontWeight: 400 }}> {s.unit}</span></div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: C.textDim, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </FadeIn>
  <FadeIn>
    <ProductViewer3D />
  </FadeIn>
  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 64 }}>
    <FadeIn>
      <div className="card-pad" style={{ background: `linear-gradient(145deg, rgba(0,163,224,0.04), rgba(0,120,212,0.02))`, border: `1px solid rgba(0,163,224,0.1)`, borderRadius: 24, padding: 40 }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 24 }}>Video Capabilities</h3>
        {[
          ["Encoding", "H.264 / H.265 Main & High Profile"],
          ["Input", "HDMI 4K60P + 3G-SDI + UVC (4K60)"],
          ["Output", "HDMI 4K60P + 3G-SDI + UVC (4K60)"],
          ["Live Stream", "4K 3840×2160 @ 25/30/60p"],
          ["Recording", "4K60 to TF card (512GB max)"],
          ["Switching", "Dual-channel seamless switching"],
          ["Modes", "H/V one-click portrait / landscape"],
        ].map(([k, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 6 ? `1px solid ${C.borderDim}` : "none" }}>
            <span style={{ color: C.textMid, fontFamily: "'Outfit', sans-serif", fontSize: 14 }}>{k}</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{v}</span>
          </div>
        ))}
      </div>
    </FadeIn>
    <FadeIn delay={0.15}>
      <div className="card-pad" style={{ background: `linear-gradient(145deg, rgba(0,194,255,0.04), rgba(0,120,212,0.02))`, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40 }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 24 }}>Streaming & Audio</h3>
        {[
          ["RTMP(s)", "YouTube, Facebook, TikTok, Twitch, Kick, custom RTMP servers"],
          ["SRT", "Secure Reliable Transport for low-latency pro feeds"],
          ["RTSP", "Real-Time Streaming Protocol for IP integration"],
        ].map(([k, v], i) => (
          <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "20px", marginBottom: 12 }}>
            <div style={{ color: C.accent, fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{k}</div>
            <div style={{ color: C.textDim, fontFamily: "'Outfit', sans-serif", fontSize: 13, lineHeight: 1.5 }}>{v}</div>
          </div>
        ))}
        <div style={{ marginTop: 12 }}>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 16 }}>4-Channel Audio</h4>
          {[["Channels", "4-channel dual-track mode"], ["I/O", "3.5mm dual-channel + intercom"], ["Format", "AAC @ 44.1K / 48K"]].map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? `1px solid ${C.borderDim}` : "none" }}>
              <span style={{ color: C.textDim, fontFamily: "'Outfit', sans-serif", fontSize: 13 }}>{k}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </div>
  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 32 }}>
    {[
      { icon: "🌐", title: "Hotspot Routing", desc: "Share bonded network via WiFi hotspot or Ethernet. Up to 10 simultaneous connections with WPA2-PSK." },
      { icon: "🔄", title: "Frame Synchronization", desc: "Multi-camera frame sync without public IP. 5G-enabled for sports events and multi-angle live shooting." },
    ].map((f, i) => (
      <FadeIn key={i} delay={i * 0.1}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderDim}`, borderRadius: 16, padding: "28px 24px", height: "100%" }}>
          <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{f.icon}</span>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>{f.title}</div>
          <div style={{ color: C.textDim, fontSize: 13, fontFamily: "'Outfit', sans-serif", lineHeight: 1.6 }}>{f.desc}</div>
        </div>
      </FadeIn>
    ))}
  </div>
</div>
```

  </section>
);

const Contact = () => {
const [form, setForm] = useState({ name: “”, email: “”, company: “”, phone: “”, qty: “1-10”, message: “” });
const [submitted, setSubmitted] = useState(false);
const inputStyle = {
width: “100%”, padding: “14px 16px”, borderRadius: 10,
background: “rgba(0,0,0,0.3)”, border: `1px solid ${C.borderDim}`,
color: “#fff”, fontFamily: “‘Outfit’, sans-serif”, fontSize: 15, outline: “none”, boxSizing: “border-box”,
};
return (
<section id=“contact” className=“section-pad” style={{ padding: “120px clamp(20px,4vw,60px)”, background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgLight} 100%)` }}>
<div style={{ maxWidth: 800, margin: “0 auto” }}>
<FadeIn>
<div style={{ textAlign: “center”, marginBottom: 64 }}>
<span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: “‘Outfit’, sans-serif”, letterSpacing: “0.15em”, textTransform: “uppercase” }}>Get Started</span>
<h2 style={{ fontFamily: “‘Outfit’, sans-serif”, fontWeight: 800, fontSize: “clamp(32px, 5vw, 48px)”, color: C.text, margin: “16px 0 20px”, lineHeight: 1.15, letterSpacing: “-0.02em” }}>Request a Quote</h2>
<p style={{ color: C.textMid, fontSize: 16, fontFamily: “‘Outfit’, sans-serif”, fontWeight: 300, maxWidth: 520, margin: “0 auto” }}>
Interested in the RamPack Shell with RamPack Pro encoder? Contact us for pricing, custom configurations, and volume orders.
</p>
</div>
</FadeIn>
<FadeIn delay={0.15}>
{submitted ? (
<div style={{ background: “rgba(0,194,255,0.05)”, border: `1px solid rgba(0,194,255,0.2)`, borderRadius: 24, padding: 64, textAlign: “center” }}>
<div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 8 }}>Request Submitted</div>
<div style={{ color: C.textMid, fontFamily: “‘Outfit’, sans-serif” }}>Our team will reach out within 24 hours.</div>
</div>
) : (
<div className=“contact-form” style={{ background: “rgba(255,255,255,0.02)”, border: `1px solid ${C.borderDim}`, borderRadius: 24, padding: 48 }}>
<div className=“grid-form” style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 20, marginBottom: 20 }}>
{[
{ key: “name”, label: “Full Name”, ph: “Jane Smith” },
{ key: “email”, label: “Email”, ph: “jane@company.com” },
{ key: “company”, label: “Company / Organization”, ph: “Broadcast Corp” },
{ key: “phone”, label: “Phone”, ph: “+1 (555) 000-0000” },
].map(f => (
<div key={f.key}>
<label style={{ display: “block”, color: C.textDim, fontSize: 12, fontFamily: “‘Outfit’, sans-serif”, fontWeight: 600, letterSpacing: “0.06em”, textTransform: “uppercase”, marginBottom: 8 }}>{f.label}</label>
<input value={form[f.key]} onChange={e => setForm(p => ({ …p, [f.key]: e.target.value }))} placeholder={f.ph} style={inputStyle}
onFocus={e => e.target.style.borderColor = “rgba(0,194,255,0.3)”}
onBlur={e => e.target.style.borderColor = C.borderDim} />
</div>
))}
</div>
<div style={{ marginBottom: 20 }}>
<label style={{ display: “block”, color: C.textDim, fontSize: 12, fontFamily: “‘Outfit’, sans-serif”, fontWeight: 600, letterSpacing: “0.06em”, textTransform: “uppercase”, marginBottom: 8 }}>Estimated Quantity</label>
<div style={{ display: “flex”, gap: 10, flexWrap: “wrap” }}>
{[“1-10”, “10-50”, “50-100”, “100-200”, “200-500”, “500+”].map(q => (
<button key={q} onClick={() => setForm(p => ({ …p, qty: q }))} style={{
padding: “10px 20px”, borderRadius: 8, cursor: “pointer”,
background: form.qty === q ? “rgba(0,194,255,0.15)” : “rgba(0,0,0,0.3)”,
border: `1px solid ${form.qty === q ? "rgba(0,194,255,0.4)" : C.borderDim}`,
color: form.qty === q ? C.accent : C.textMid,
fontFamily: “‘Outfit’, sans-serif”, fontSize: 14, fontWeight: 600,
}}>{q} units</button>
))}
</div>
</div>
<div style={{ marginBottom: 24 }}>
<label style={{ display: “block”, color: C.textDim, fontSize: 12, fontFamily: “‘Outfit’, sans-serif”, fontWeight: 600, letterSpacing: “0.06em”, textTransform: “uppercase”, marginBottom: 8 }}>Message</label>
<textarea value={form.message} onChange={e => setForm(p => ({ …p, message: e.target.value }))} placeholder=“Tell us about your broadcast requirements…” rows={4}
style={{ …inputStyle, resize: “vertical” }}
onFocus={e => e.target.style.borderColor = “rgba(0,194,255,0.3)”}
onBlur={e => e.target.style.borderColor = C.borderDim} />
</div>
<button onClick={() => setSubmitted(true)} style={{
width: “100%”, padding: “16px”, borderRadius: 12, border: “none”,
background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
color: C.bg, fontFamily: “‘Outfit’, sans-serif”, fontWeight: 700,
fontSize: 16, cursor: “pointer”, boxShadow: “0 0 40px rgba(0,194,255,0.2)”,
}}>Submit Quote Request</button>
</div>
)}
</FadeIn>
</div>
</section>
);
};

const Footer = () => (

  <footer style={{ padding: "48px clamp(20px,4vw,60px) 32px", background: "#060D1A", borderTop: `1px solid ${C.borderDim}` }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="footer-cols" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ marginBottom: 12 }}><LogoFull size={28} /></div>
          <p style={{ color: C.textDim, fontFamily: "'Outfit', sans-serif", fontSize: 13, maxWidth: 320, lineHeight: 1.6 }}>
            Mobile broadcast infrastructure company. Bonded cellular uplink platform builder. Hardware + carrier aggregation integrator.
          </p>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { title: "Products", links: ["RamPack Pro Encoder", "RamPack Shell", "Starlink Pouch"] },
            { title: "Company", links: ["About", "Roadmap", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ color: C.textDim, fontSize: 11, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
              {col.links.map((l, j) => (<div key={j} style={{ marginBottom: 8 }}><a href="#" style={{ color: C.textMid, textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: 14 }}>{l}</a></div>))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.borderDim}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Outfit', sans-serif", fontSize: 12 }}>© 2026 FieldLink Networks. All rights reserved.</span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Outfit', sans-serif", fontSize: 12 }}>fieldlinknetworks.com</span>
      </div>
    </div>
  </footer>
);

export default function FieldLinkWebsite() {
const [active, setActive] = useState(“hero”);
useEffect(() => {
const h = () => {
for (const id of […SECTIONS].reverse()) {
const el = document.getElementById(id);
if (el && el.getBoundingClientRect().top < 200) { setActive(id); break; }
}
};
window.addEventListener(“scroll”, h);
return () => window.removeEventListener(“scroll”, h);
}, []);

return (
<div style={{ background: C.bg, minHeight: “100vh” }}>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
<style>{`* { margin: 0; padding: 0; box-sizing: border-box; } html { scroll-behavior: smooth; } ::placeholder { color: rgba(255,255,255,0.18) !important; } @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } } @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } } @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } .mobile-dropdown { display: flex !important; } } @media (min-width: 901px) { .mobile-menu-btn { display: none !important; } .mobile-dropdown { display: none !important; } } @media (max-width: 768px) { .grid-4 { grid-template-columns: repeat(2, 1fr) !important; } .grid-2 { grid-template-columns: 1fr !important; } .grid-3 { grid-template-columns: 1fr !important; } .grid-product { grid-template-columns: 1fr !important; } .grid-form { grid-template-columns: 1fr !important; } .section-pad { padding: 80px 20px !important; } .card-pad { padding: 24px !important; } .hero-stats { gap: 24px !important; } .hero-buttons { flex-direction: column !important; align-items: center !important; } .hero-buttons a { width: 100% !important; text-align: center !important; } .bond-pad { padding: 24px !important; } .bond-result { padding: 16px 24px !important; } .footer-cols { gap: 32px !important; } .contact-form { padding: 24px !important; } } @media (max-width: 480px) { .grid-4 { grid-template-columns: 1fr !important; } .hero-stats { gap: 20px !important; } }`}</style>
<Nav active={active} />
<Hero />
<About />
<Encoder />
<Product />
<Contact />
<Footer />
</div>
);
}
