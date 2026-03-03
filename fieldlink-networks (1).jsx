import { useState, useEffect, useRef } from "react";

const SECTIONS = ["hero", "about", "product", "encoder", "connectivity", "contact"];

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
      transform: visible ? "translateY(0)" : "translateY(36px)",
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
  accent: "#00C2FF",
  accentDark: "#0078D4",
  accentMid: "#00A3E0",
  bg: "#0A1628",
  bgLight: "#0E1D35",
  text: "#F0F4F8",
  textMid: "rgba(240,244,248,0.6)",
  textDim: "rgba(240,244,248,0.35)",
  border: "rgba(0,194,255,0.1)",
  borderDim: "rgba(240,244,248,0.06)",
};

const Nav = ({ active }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { id: "about", label: "About" },
    { id: "product", label: "RamPack Shell" },
    { id: "encoder", label: "RamPack Pro" },
    { id: "connectivity", label: "Connectivity" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s ease",
      padding: "0 clamp(20px,4vw,60px)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#hero" style={{ textDecoration: "none" }}><LogoFull size={34} /></a>
        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              color: active === l.id ? C.accent : C.textMid,
              textDecoration: "none", fontSize: 13, fontWeight: 500,
              fontFamily: "'Outfit', sans-serif", letterSpacing: "0.04em",
              textTransform: "uppercase", transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = C.accent}
            onMouseLeave={e => { if (active !== l.id) e.target.style.color = C.textMid; }}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
            color: C.bg, padding: "10px 24px", borderRadius: 8,
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 13,
            textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase",
          }}>Get Quote</a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          flexDirection: "column", gap: 5, padding: 8,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s",
              transform: menuOpen ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
              opacity: menuOpen && i===1 ? 0 : 1 }} />
          ))}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-dropdown" style={{ display: "none", flexDirection: "column", gap: 4, padding: "8px 0 20px", borderTop: `1px solid ${C.borderDim}` }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} style={{
              color: active === l.id ? C.accent : C.textMid,
              textDecoration: "none", fontSize: 15, fontWeight: 500,
              fontFamily: "'Outfit', sans-serif", padding: "12px 0",
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
    <div style={{ textAlign: "center", maxWidth: 900, padding: "0 24px", position: "relative", zIndex: 2 }}>
      <FadeIn>
        <div style={{ marginBottom: 32 }}>
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
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#product" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
            color: C.bg, padding: "16px 40px", borderRadius: 12,
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15,
            textDecoration: "none", boxShadow: "0 0 40px rgba(0,194,255,0.25)",
          }}>Explore RamPack Shell</a>
          <a href="#encoder" style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", padding: "16px 40px", borderRadius: 12,
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15,
            textDecoration: "none",
          }}>RamPack Pro Encoder</a>
        </div>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
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
  <section id="about" style={{ padding: "120px clamp(20px,4vw,60px)", background: C.bg }}>
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
   Swap the SVG for: <img src="your-photo.jpg"
   style={{ width: "100%", borderRadius: 16 }} />
   ══════════════════════════════════════════ */
const BackpackPlaceholder = () => (
  <div style={{
    background: `linear-gradient(145deg, rgba(0,194,255,0.03), rgba(0,120,212,0.02))`,
    border: `1px solid ${C.border}`, borderRadius: 24,
    padding: 48, aspectRatio: "3/4",
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
    { icon: "🔋", title: "Hot-Swap V-Mount Battery", desc: "Front-facing zipper on the bottom compartment. Swap V-Mount batteries while wearing and streaming live." },
    { icon: "📡", title: "Starlink Mini Mount", desc: "Detachable MOLLE-attached pouch holds the Starlink Mini sky-facing on top. Rubber gasket cable passthroughs for ethernet and power." },
    { icon: "🌡️", title: "Active Ventilation", desc: "Full-length 3D Air Mesh side panels and channeled foam back panel. Manages heat from the RamPack Pro during extended operation." },
    { icon: "🖥️", title: "Front Screen Access Panel", desc: "Large Velcro flap for quick encoder touchscreen access without opening the main compartment." },
    { icon: "🎒", title: "6+ Hour Ergonomic Carry", desc: "Padded contoured back panel, wide shoulder straps, sternum strap, and hip belt. Designed for 6+ hours of continuous wear." },
    { icon: "🔧", title: "Broadcast-Grade Build", desc: "Heavy-duty weatherproof construction built for professional field use. Reinforced stitching and corrosion-resistant hardware throughout." },
  ];
  return (
    <section id="product" style={{ padding: "120px clamp(20px,4vw,60px)", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgLight} 50%, ${C.bg} 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Flagship Product</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: C.text, margin: "16px 0 20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>The RamPack Shell</h2>
            <p style={{ color: C.textMid, fontSize: 17, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: 640, margin: "0 auto" }}>
              Purpose-built bonded cellular streaming backpack for IRL broadcast professionals.
              Houses the RamPack Pro encoder with hot-swap power, satellite connectivity, and ventilation for continuous operation.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 80, alignItems: "start" }}>
          <FadeIn><BackpackPlaceholder /></FadeIn>
          <div style={{ display: "grid", gap: 20 }}>
            {features.slice(0, 3).map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderDim}`, borderRadius: 16, padding: "24px 28px", transition: "border-color 0.3s, background 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,194,255,0.2)"; e.currentTarget.style.background = "rgba(0,194,255,0.03)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderDim; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 28 }}>{f.icon}</span>
                    <div>
                      <div style={{ color: C.text, fontWeight: 700, fontSize: 16, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>{f.title}</div>
                      <div style={{ color: C.textDim, fontSize: 13, fontFamily: "'Outfit', sans-serif", lineHeight: 1.65 }}>{f.desc}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.slice(3).map((f, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderDim}`, borderRadius: 16, padding: "32px 28px", height: "100%", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,194,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.borderDim}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{f.icon}</span>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 16, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: C.textDim, fontSize: 13, fontFamily: "'Outfit', sans-serif", lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Encoder = () => (
  <section id="encoder" style={{ padding: "120px clamp(20px,4vw,60px)", background: C.bg }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 64 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <FadeIn>
          <div style={{ background: `linear-gradient(145deg, rgba(0,163,224,0.04), rgba(0,120,212,0.02))`, border: `1px solid rgba(0,163,224,0.1)`, borderRadius: 24, padding: 40 }}>
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
          <div style={{ background: `linear-gradient(145deg, rgba(0,194,255,0.04), rgba(0,120,212,0.02))`, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40 }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 24 }}>Streaming & Audio</h3>
            {[
              ["RTMP(s)", "YouTube, Facebook, TikTok, custom RTMP servers"],
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 32 }}>
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
  </section>
);

const Connectivity = () => (
  <section id="connectivity" style={{ padding: "120px clamp(20px,4vw,60px)", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgLight} 50%, ${C.bg} 100%)` }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Network Architecture</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: C.text, margin: "16px 0 20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>Multi-Path Bonded Connectivity</h2>
          <p style={{ color: C.textMid, fontSize: 17, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: 640, margin: "0 auto" }}>
            Six physical SIM slots (3× 5G + 3× 4G), WiFi 6, dual Gigabit Ethernet, and optional Starlink uplink — bonded into one resilient data path. Carrier-agnostic. No eSIM lock-in.
          </p>
        </div>
      </FadeIn>
      <FadeIn>
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderDim}`, borderRadius: 24, padding: 48, marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            {[
              { l: "5G SIM 1", t: "5g" }, { l: "5G SIM 2", t: "5g" }, { l: "5G SIM 3", t: "5g" },
              { l: "4G SIM 4", t: "4g" }, { l: "4G SIM 5", t: "4g" }, { l: "4G SIM 6", t: "4g" },
              { l: "WiFi 6", t: "w" }, { l: "GbE Port 1", t: "e" }, { l: "GbE Port 2", t: "e" },
              { l: "Starlink", t: "s" },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.t === "s" ? "rgba(0,194,255,0.1)" : s.t === "5g" ? "rgba(0,163,224,0.08)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${s.t === "s" ? "rgba(0,194,255,0.3)" : s.t === "5g" ? "rgba(0,163,224,0.2)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10, padding: "12px 18px",
                color: s.t === "s" ? C.accent : s.t === "5g" ? C.accentMid : C.textMid,
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
              }}>{s.l}</div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
              {[...Array(10)].map((_, i) => (<div key={i} style={{ width: 2, height: 40, background: `linear-gradient(180deg, rgba(0,194,255,0.4), rgba(0,194,255,0.05))` }} />))}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: `linear-gradient(135deg, rgba(0,194,255,0.1), rgba(0,120,212,0.1))`, border: "1px solid rgba(0,194,255,0.25)", borderRadius: 16, padding: "20px 40px" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.accent, animation: "pulse 2s ease infinite" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>Bonded Uplink Stream</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);


const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", qty: "1-10", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 10,
    background: "rgba(0,0,0,0.3)", border: `1px solid ${C.borderDim}`,
    color: "#fff", fontFamily: "'Outfit', sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box",
  };
  return (
    <section id="contact" style={{ padding: "120px clamp(20px,4vw,60px)", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgLight} 100%)` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Get Started</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 48px)", color: C.text, margin: "16px 0 20px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Request a Quote</h2>
            <p style={{ color: C.textMid, fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: 520, margin: "0 auto" }}>
              Interested in the RamPack Shell with RamPack Pro encoder? Contact us for pricing, custom configurations, and volume orders.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          {submitted ? (
            <div style={{ background: "rgba(0,194,255,0.05)", border: `1px solid rgba(0,194,255,0.2)`, borderRadius: 24, padding: 64, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 8 }}>Request Submitted</div>
              <div style={{ color: C.textMid, fontFamily: "'Outfit', sans-serif" }}>Our team will reach out within 24 hours.</div>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderDim}`, borderRadius: 24, padding: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {[
                  { key: "name", label: "Full Name", ph: "Jane Smith" },
                  { key: "email", label: "Email", ph: "jane@company.com" },
                  { key: "company", label: "Company / Organization", ph: "Broadcast Corp" },
                  { key: "phone", label: "Phone", ph: "+1 (555) 000-0000" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", color: C.textDim, fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                    <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(0,194,255,0.3)"}
                      onBlur={e => e.target.style.borderColor = C.borderDim} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", color: C.textDim, fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Estimated Quantity</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["1-10", "10-50", "50-100", "100-200", "200-500", "500+"].map(q => (
                    <button key={q} onClick={() => setForm(p => ({ ...p, qty: q }))} style={{
                      padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                      background: form.qty === q ? "rgba(0,194,255,0.15)" : "rgba(0,0,0,0.3)",
                      border: `1px solid ${form.qty === q ? "rgba(0,194,255,0.4)" : C.borderDim}`,
                      color: form.qty === q ? C.accent : C.textMid,
                      fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
                    }}>{q} units</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", color: C.textDim, fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your broadcast requirements..." rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,194,255,0.3)"}
                  onBlur={e => e.target.style.borderColor = C.borderDim} />
              </div>
              <button onClick={() => setSubmitted(true)} style={{
                width: "100%", padding: "16px", borderRadius: 12, border: "none",
                background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
                color: C.bg, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                fontSize: 16, cursor: "pointer", boxShadow: "0 0 40px rgba(0,194,255,0.2)",
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ marginBottom: 12 }}><LogoFull size={28} /></div>
          <p style={{ color: C.textDim, fontFamily: "'Outfit', sans-serif", fontSize: 13, maxWidth: 320, lineHeight: 1.6 }}>
            Mobile broadcast infrastructure company. Bonded cellular uplink platform builder. Hardware + carrier aggregation integrator.
          </p>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { title: "Products", links: ["RamPack Shell", "RamPack Pro Encoder", "Starlink Pouch"] },
            { title: "Company", links: ["About", "Connectivity", "Roadmap", "Contact"] },
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
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const h = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: rgba(255,255,255,0.18) !important; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-dropdown { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-dropdown { display: none !important; }
        }
      `}</style>
      <Nav active={active} />
      <Hero />
      <About />
      <Product />
      <Encoder />
      <Connectivity />
      <Contact />
      <Footer />
    </div>
  );
}
