"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";

function easeSmoothstep(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

function ArrowSvg() {
  return (
    <svg className="ps-nav-arrow" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 9h12M10 5l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmallArrowSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 6.5h9M7.5 3.5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="ps-chrome">
      <div className="ps-dots">
        <div className="ps-dot ps-dot-r" />
        <div className="ps-dot ps-dot-y" />
        <div className="ps-dot ps-dot-g" />
      </div>
      <div className="ps-chrome-url"><span>{url}</span></div>
      <div className="ps-chrome-avs">
        <div className="ps-av ps-av-b">A</div>
        <div className="ps-av ps-av-i">C</div>
      </div>
    </div>
  );
}

/* ═══════ DISCOVER SHOWCASE ═══════ */
function DiscoverShowcase() {
  const { t } = useTranslation();
  return (
    <div className="ps-ai-body">
      <div className="ps-ai-chat">
        <div className="ps-chat-toprow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#999" strokeWidth="1.4" />
            <path d="M4 5h6M4 7.5h4" stroke="#999" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span style={{ color: "var(--ps-text)" }}>{t("discover.brief")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
          <div>
            <div className="ps-label">{t("discover.client")}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ps-text)" }}>Nordvik Studio</div>
            <div style={{ fontSize: 12, color: "var(--ps-text-dim)", marginTop: 2 }}>Architecture &amp; Interior Design</div>
          </div>
          <div className="ps-divider" />
          <div>
            <div className="ps-label">{t("discover.goals")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[t("discover.goal1"), t("discover.goal2"), t("discover.goal3")].map((g) => (
                <div key={g} className="ps-goal-row">
                  <div className="ps-goal-dot" />
                  {g}
                </div>
              ))}
            </div>
          </div>
          <div className="ps-divider" />
          <div>
            <div className="ps-label">{t("discover.toneFeel")}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {["Minimal", "Luxury", "Editorial"].map((tItem) => (
                <span key={tItem} className="ps-tag">{tItem}</span>
              ))}
              <span className="ps-tag ps-tag-accent">Nordic</span>
            </div>
          </div>
          <div className="ps-divider" />
          <div>
            <div className="ps-label">{t("discover.competitors")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 12, color: "var(--ps-text-dim)" }}>snohetta.com</div>
              <div style={{ fontSize: 12, color: "var(--ps-text-dim)" }}>bjarkeingels.com</div>
              <div style={{ fontSize: 12, color: "var(--ps-text-muted)" }}>{t("discover.more")}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ps-moodboard">
        <div className="ps-mood-cell ps-mood-typo">
          <div className="ps-mood-typo-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ height: 3, width: 30, background: "rgba(255,255,255,.2)", borderRadius: 2, marginBottom: 8 }} />
            <div className="ps-mood-mono">Typography</div>
            <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: -1, color: "rgba(255,255,255,.8)", lineHeight: 1.1, marginTop: 3 }}>Nordvik</div>
          </div>
        </div>
        <div className="ps-mood-cell ps-mood-palette">
          <div className="ps-mood-mono" style={{ alignSelf: "flex-start" }}>Colour Palette</div>
          <div style={{ display: "flex", gap: 6, alignSelf: "flex-start", marginTop: 2 }}>
            {["#1a1a1a", "#e8e2d9", "#c4b9a8", "#2d3a2e"].map((c, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: c, border: i === 0 ? "1px solid rgba(255,255,255,.08)" : "none" }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", marginTop: 4 }}>
            <div style={{ height: 3, background: "rgba(255,255,255,.06)", borderRadius: 2 }} />
            <div style={{ height: 3, background: "rgba(255,255,255,.04)", borderRadius: 2, width: "70%" }} />
          </div>
        </div>
        <div className="ps-mood-cell ps-mood-pages">
          <div className="ps-mood-mono">Pages</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Home", "Projects", "About", "Contact"].map((p, i) => (
              <div key={p} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
                <span style={{ fontSize: 12, color: "var(--ps-text-dim)" }}>{p}</span>
                <span style={{ fontSize: 10, color: "var(--ps-accent)" }}>✓</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ps-mood-cell ps-mood-timeline">
          <div className="ps-mood-mono">Timeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 2 }}>
            {[
              { label: "Discovery", active: true },
              { label: "Design — Wk 2–4", active: false },
              { label: "Build — Wk 5–7", active: false },
              { label: "Launch — Wk 8", active: false },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.active ? "var(--ps-accent)" : "rgba(255,255,255,.2)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: item.active ? "var(--ps-text-dim)" : "var(--ps-text-muted)" }}>{item.label}</div>
                  <div style={{ height: 3, background: item.active ? "var(--ps-accent)" : "rgba(255,255,255,.08)", borderRadius: 2, marginTop: 3, opacity: item.active ? 0.6 : 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════ DESIGN SHOWCASE ═══════ */
function DesignShowcase() {
  return (
    <div className="ps-design-body">
      {/* Layers panel */}
      <div className="ps-prop-panel ps-prop-l">
        <div className="ps-prop-inner">
          <div className="ps-prop-sec">Pages</div>
          <div className="ps-prop-row ps-hi"><span className="ps-prop-name" style={{ color: "var(--ps-text)" }}>Home</span></div>
          {["Projects", "About", "Contact"].map((p) => (
            <div key={p} className="ps-prop-row"><span className="ps-prop-name">{p}</span></div>
          ))}
          <div className="ps-prop-sec" style={{ marginTop: 8 }}>Layers</div>
          <div className="ps-prop-row ps-hi"><span className="ps-prop-name ps-blue">◻ Hero</span></div>
          {["T Studio Name", "🖼 Hero Image", "T Tagline"].map((l) => (
            <div key={l} className="ps-prop-row" style={{ paddingLeft: 17 }}><span className="ps-prop-name">{l}</span></div>
          ))}
          {["◻ Project Grid", "◻ About Strip", "◻ Footer"].map((l) => (
            <div key={l} className="ps-prop-row"><span className="ps-prop-name">{l}</span></div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="ps-canvas-area">
        <div className="ps-canvas-grid" />
        <div className="ps-cur" style={{ top: "28%", left: "54%" }}>
          <svg viewBox="0 0 13 17" fill="none"><path d="M0 0L0 13L3 10L5.5 15.5L7.5 14.5L5 9L9 9Z" fill="var(--ps-accent)" /></svg>
          <div className="ps-cpill ps-cpill-b">Alex</div>
        </div>
        <div className="ps-cur" style={{ top: "62%", left: "33%" }}>
          <svg viewBox="0 0 13 17" fill="none"><path d="M0 0L0 13L3 10L5.5 15.5L7.5 14.5L5 9L9 9Z" fill="var(--ps-accent2)" /></svg>
          <div className="ps-cpill ps-cpill-i">Client</div>
        </div>

        <div className="ps-canvas-card" style={{ maxWidth: 380, width: "60%" }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0e0e0e" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, color: "var(--ps-text)" }}>Nordvik Studio</div>
            <div style={{ display: "flex", gap: 12 }}>
              {["Projects", "About", "Contact"].map((l) => (
                <div key={l} style={{ fontSize: 9, color: "var(--ps-text-muted)" }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ height: 120, background: "linear-gradient(160deg,#1a1a14,#141410,#1e1e16)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 14 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.6))" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 300, letterSpacing: -1, color: "#fff", lineHeight: 1.05 }}>Architecture<br />&amp; Interiors</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", marginTop: 4 }}>Oslo, Norway — Est. 2012</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(255,255,255,.06)" }}>
            <div style={{ height: 38, background: "linear-gradient(135deg,#1a1810,#221e14)" }} />
            <div style={{ height: 38, background: "linear-gradient(135deg,#101418,#141820)" }} />
            <div style={{ height: 38, background: "linear-gradient(135deg,#141414,#1c1c1c)" }} />
          </div>
        </div>

        <div className="ps-ctoolbar">
          <div className="ps-tb ps-tb-on">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1l3.5 9 1.8-3.2 3.2-1.8L1 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
          </div>
          <div className="ps-tb">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" /></svg>
          </div>
          <div className="ps-tb">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" /></svg>
          </div>
          <div className="ps-tb-div" />
          <div className="ps-tb-zoom">75%</div>
        </div>
      </div>

      {/* Properties panel */}
      <div className="ps-prop-panel ps-prop-r">
        <div className="ps-prop-inner">
          <div className="ps-prop-sec">Fill</div>
          <div className="ps-prop-row" style={{ justifyContent: "flex-start", gap: 10 }}>
            <div className="ps-prop-sw" style={{ background: "#1a1a14" }} />
            <span className="ps-prop-val">#1A1A14</span>
          </div>
          <div className="ps-prop-sec" style={{ marginTop: 14 }}>Typography</div>
          {[["Font", "Neue Haas"], ["Size", "20px"], ["Weight", "300"], ["Tracking", "-1px"]].map(([n, v]) => (
            <div key={n} className="ps-prop-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <span className="ps-prop-name" style={{ textAlign: "left" }}>{n}</span>
              <span className="ps-prop-val" style={{ textAlign: "right" }}>{v}</span>
            </div>
          ))}
          <div className="ps-prop-sec" style={{ marginTop: 14 }}>Spacing</div>
          {[["Padding", "14 16"], ["Gap", "1px"]].map(([n, v]) => (
            <div key={n} className="ps-prop-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <span className="ps-prop-name" style={{ textAlign: "left" }}>{n}</span>
              <span className="ps-prop-val" style={{ textAlign: "right" }}>{v}</span>
            </div>
          ))}
          <div className="ps-prop-sec" style={{ marginTop: 14 }}>Effects</div>
          <div className="ps-prop-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <span className="ps-prop-name" style={{ textAlign: "left" }}>Overlay</span>
            <span className="ps-prop-val" style={{ textAlign: "right" }}>0→60%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════ BUILD/CMS SHOWCASE ═══════ */
const CMS_ROWS = [
  { name: "Villa Tjøme", type: "Residential", year: "2025", status: "Live", bg: "linear-gradient(135deg,#1a1810,#22201a)", sel: true },
  { name: "Aker Brygge Office", type: "Commercial", year: "2025", status: "Live", bg: "linear-gradient(135deg,#101820,#141e28)" },
  { name: "Holmenkollen Cabin", type: "Residential", year: "2024", status: "Live", bg: "linear-gradient(135deg,#181010,#201414)" },
  { name: "Tjuvholmen Gallery", type: "Cultural", year: "2024", status: "Live", bg: "linear-gradient(135deg,#101418,#14181e)" },
  { name: "Bygdøy Residence", type: "Residential", year: "2024", status: "Draft", bg: "linear-gradient(135deg,#141810,#181e14)" },
  { name: "Frogner Penthouse", type: "Interior", year: "2023", status: "Live", bg: "linear-gradient(135deg,#181018,#1e141e)" },
];

function BuildShowcase() {
  return (
    <div className="ps-cms-body">
      <div className="ps-cms-nav">
        <div className="ps-cms-nav-sec">Collections</div>
        {["Projects", "Team", "Services", "Press", "Settings"].map((c, i) => (
          <div key={c} className={`ps-cms-ni${i === 0 ? " ps-on" : ""}`}>
            <div className={`ps-cms-dot${i === 0 ? " ps-b" : ""}`} />{c}
          </div>
        ))}
      </div>
      <div className="ps-cms-main">
        <div className="ps-cms-search">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" /><path d="M9 9l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          Search 24 projects…
        </div>
        <div className="ps-cms-thead">
          {["Project", "Type", "Year", "Status"].map((h) => (
            <div key={h} className="ps-cms-th-c">{h}</div>
          ))}
        </div>
        <div className="ps-cms-rows">
          {CMS_ROWS.map((r) => (
            <div key={r.name} className={`ps-cms-row${r.sel ? " ps-sel" : ""}`}>
              <div className="ps-cms-rname"><div className="ps-cms-thumb" style={{ background: r.bg }} />{r.name}</div>
              <div className="ps-cms-td">{r.type}</div>
              <div className="ps-cms-td">{r.year}</div>
              <div className="ps-cms-td" style={{ color: r.status === "Live" ? "var(--ps-green)" : "rgba(255,200,80,.8)" }}>{r.status}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="ps-cms-detail">
        <div className="ps-cms-det-h">Villa Tjøme</div>
        <div className="ps-cms-det-b"><div className="ps-cms-det-l">Cover Image</div><div className="ps-cms-irow"><div className="ps-cms-dimg" style={{ background: "linear-gradient(135deg,#1a1810,#22201a)" }} /><span className="ps-cms-det-v" style={{ fontSize: 11 }}>villa-tjome-hero.jpg</span></div></div>
        {[["Type", "Residential"], ["Location", "Tjøme, Norway"], ["Year", "2025"]].map(([l, v]) => (
          <div key={l} className="ps-cms-det-b"><div className="ps-cms-det-l">{l}</div><div className="ps-cms-det-v">{v}</div></div>
        ))}
        <div className="ps-cms-det-b" style={{ flex: 1 }}>
          <div className="ps-cms-det-l">Description</div>
          <div className="ps-cms-body-text">
            A coastal retreat designed around the existing landscape — raw concrete, reclaimed oak, and floor-to-ceiling glazing framing the Oslo Fjord.
            <strong>Details</strong>· 340 sqm floor area<br />· Passive house certified<br />· Interior design included
            <strong>Awards</strong>· AIT Award 2025<br />· Norwegian Design Council
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════ LAUNCH SHOWCASE ═══════ */
function LaunchShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const words = ["Architecture.", "Interiors.", "Materials.", "Craft."];
    const el = heroRef.current;
    if (!el) return;
    const tNode = document.createTextNode("");
    el.appendChild(tNode);
    let wi = 0, ci = 0, del = false;
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      const w = words[wi];
      del ? ci-- : ci++;
      tNode.textContent = w.slice(0, ci);
      if (!del && ci === w.length) { del = true; timer = setTimeout(tick, 1800); return; }
      if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
      timer = setTimeout(tick, del ? 36 : 80);
    }
    tick();
    return () => { clearTimeout(timer); if (el) el.textContent = ""; };
  }, []);

  return (
    <div className="ps-collab-body">
      <div className="ps-col-sitenav">
        <div className="ps-col-brand">Nordvik Studio</div>
        <div className="ps-col-links">
          {["Projects", "About", "Services", "Press", "Contact"].map((l) => (
            <div key={l} className="ps-col-link">{l}</div>
          ))}
        </div>
      </div>
      <div className="ps-col-hero" style={{ background: "linear-gradient(160deg,#111,#161610,#1a1a14)" }}>
        <div className="ps-col-hero-txt" ref={heroRef} />
        <div className="ps-col-highlight" style={{ top: "20%", left: "3%", width: 260, height: 58 }} />
        <div className="ps-live-badge">
          <div className="ps-live-dot" />
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ps-text)" }}>Live</span>
        </div>
      </div>
      <div className="ps-col-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {/* Visitors */}
        <div className="ps-col-cell" style={{ background: "linear-gradient(155deg,#0a0a0a,#0d100a)" }}>
          <div className="ps-col-num">01</div>
          <div className="ps-stat-inner">
            <div className="ps-stat-label">{t("launch.visitors")}</div>
            <div className="ps-stat-value">2,841</div>
            <div style={{ fontSize: 10, color: "var(--ps-green)", marginTop: 4 }}>{t("launch.thisWeek")}</div>
            <div className="ps-stat-bar"><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "68%", background: "var(--ps-accent)", borderRadius: 1, opacity: 0.5 }} /></div>
          </div>
        </div>
        {/* Performance */}
        <div className="ps-col-cell" style={{ background: "linear-gradient(155deg,#0a0a0a,#0a0d10)" }}>
          <div className="ps-col-num">02</div>
          <div className="ps-stat-inner">
            <div className="ps-stat-label">{t("launch.perfScore")}</div>
            <div className="ps-stat-value">98</div>
            <div style={{ fontSize: 10, color: "var(--ps-green)", marginTop: 4 }}>Lighthouse</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginTop: 8 }}>
              <div style={{ fontSize: 9, color: "var(--ps-text-muted)" }}>SEO <span style={{ color: "var(--ps-green)" }}>100</span></div>
              <div style={{ fontSize: 9, color: "var(--ps-text-muted)" }}>A11y <span style={{ color: "var(--ps-green)" }}>96</span></div>
            </div>
          </div>
        </div>
        {/* Enquiries */}
        <div className="ps-col-cell" style={{ background: "linear-gradient(155deg,#0a0a0a,#0d0a10)" }}>
          <div className="ps-col-num">03</div>
          <div className="ps-stat-inner">
            <div className="ps-stat-label">{t("launch.enquiries")}</div>
            <div className="ps-stat-value">12</div>
            <div style={{ fontSize: 10, color: "var(--ps-green)", marginTop: 4 }}>{t("launch.first7days")}</div>
            <div className="ps-stat-bar"><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "85%", background: "var(--ps-accent2)", borderRadius: 1, opacity: 0.5 }} /></div>
          </div>
        </div>
        {/* Handoff */}
        <div className="ps-col-cell" style={{ background: "linear-gradient(155deg,#0a0a0a,#100a0a)" }}>
          <div className="ps-col-num">04</div>
          <div className="ps-stat-inner" style={{ gap: 8 }}>
            <div className="ps-stat-label">{t("launch.handoff")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 2 }}>
              {[t("launch.cmsTraining"), t("launch.domainTransferred"), t("launch.analyticsSetUp"), t("launch.support30")].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ps-green)" }} />
                  <span style={{ fontSize: 11, color: "var(--ps-text-dim)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="ps-col-editbar">
        <div className="ps-edit-info">
          <div className="ps-edit-dot" />
          {t("launch.liveInfo")}
        </div>
        <div className="ps-edit-acts">
          <button className="ps-btn-sec">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v6M3 4l3-3 3 3M2 9h8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {t("launch.shareReport")}
          </button>
          <button className="ps-btn-pri">{t("launch.viewLiveSite")}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export function ProcessSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const showcasesRef = useRef<HTMLElement[]>([]);
  const navItemsRef = useRef<HTMLElement[]>([]);

  const NAV_ITEMS = [
    {
      label: t("process.discover"),
      target: "sec-ai",
      desc: t("process.discover.desc"),
    },
    {
      label: t("process.design"),
      target: "sec-design",
      desc: t("process.design.desc"),
    },
    {
      label: t("process.build"),
      target: "sec-cms",
      desc: t("process.build.desc"),
    },
    {
      label: t("process.launch"),
      target: "sec-collab",
      desc: t("process.launch.desc"),
    },
  ];

  useEffect(() => {
    if (rootRef.current) {
      showcasesRef.current = Array.from(rootRef.current.querySelectorAll<HTMLElement>(".ps-showcase"));
      navItemsRef.current = Array.from(rootRef.current.querySelectorAll<HTMLElement>(".ps-nav-item"));
    }
  });

  const update = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const showcases = showcasesRef.current;
    const navItems = navItemsRef.current;

    if (!showcases.length || !navItems.length) return;

    const vh = window.innerHeight;
    const viewCenter = vh / 2;
    let closestIdx = 0;
    let closestDist = Infinity;

    showcases.forEach((sc, i) => {
      const section = sc.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const dist = Math.abs(sectionCenter - viewCenter);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      const raw = Math.min(dist / (vh * 0.6), 1);
      const progress = easeSmoothstep(raw);
      const opacity = 1 - progress * 0.45;
      const tx = progress * 18;
      sc.style.opacity = String(opacity);
      sc.style.transform = `translateX(${tx}px)`;
    });

    navItems.forEach((n, i) => {
      if (i === closestIdx) {
        n.classList.add("ps-active");
      } else {
        n.classList.remove("ps-active");
      }
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  const handleNavClick = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const sidebarTitleParts = t("process.sidebarTitle").split("\n");

  const SHOWCASES = [
    { url: "noir.labs — Client Brief / Nordvik", content: <DiscoverShowcase />, img: "/showcases/discover.webp" },
    { url: "noir.labs — Design / Nordvik Homepage", content: <DesignShowcase />, img: "/showcases/design.webp" },
    { url: "noir.labs — CMS / Nordvik Projects", content: <BuildShowcase />, img: "/showcases/build.webp" },
    { url: "nordvikstudio.no", content: <LaunchShowcase />, img: "/showcases/launch.webp" },
  ];

  return (
    <div className="ps-section-root" ref={rootRef}>
      <div className="ps-feature-grid">
        {/* Sidebar */}
        <aside className="ps-sidebar">
          <h2 className="ps-sidebar-title">{sidebarTitleParts[0]}<br />{sidebarTitleParts[1]}</h2>
          <nav className="ps-nav-list">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label} className="ps-nav-item" data-index={i} data-target={item.target}>
                <div className="ps-nav-header" onClick={() => handleNavClick(item.target)}>
                  <span className="ps-nav-label">{item.label}</span>
                  <ArrowSvg />
                </div>
                <div className="ps-nav-body">
                  <p className="ps-nav-desc">{item.desc}</p>
                  <a href={`#${item.target}`} className="ps-nav-learn" onClick={(e) => { e.preventDefault(); handleNavClick(item.target); }}>
                    {t("process.ourProcess")} <SmallArrowSvg />
                  </a>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile section heading — visible only on mobile where sidebar is hidden */}
        <h2 className="ps-mobile-heading">{sidebarTitleParts[0]}<br />{sidebarTitleParts[1]}</h2>

        {/* Right column */}
        <div className="ps-panels">
          {SHOWCASES.map((sc, i) => (
            <div key={i} className="ps-section" id={NAV_ITEMS[i].target}>
              <div className="ps-showcase" data-index={i}>
                {/* Desktop: Live Interactive DOM */}
                <div className="ps-showcase-inner hidden lg:block">
                  <BrowserChrome url={sc.url} />
                  {sc.content}
                </div>
                {/* Mobile: Static Image Mock */}
                <div className="ps-showcase-static block lg:hidden w-full h-full relative rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a]">
                  <img src={sc.img} alt={sc.url} className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="ps-mobile-info">
                <h3 className="ps-mobile-title">{NAV_ITEMS[i].label}</h3>
                <p className="ps-mobile-desc">{NAV_ITEMS[i].desc}</p>
                <a href={`#${NAV_ITEMS[i].target}`} className="ps-mobile-link" onClick={(e) => { e.preventDefault(); handleNavClick(NAV_ITEMS[i].target); }}>
                  {t("process.ourProcess")} <SmallArrowSvg />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
