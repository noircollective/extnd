"use client";

import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useTranslation, LanguageSwitcher } from "@/lib/i18n";
import "./coming-soon.css";

/* ─── Local translations (so we never touch i18n.tsx) ─────────── */

const cs = {
  heading1:    { sl: "PRIPRAVLJAMO",  en: "WE'RE BUILDING" },
  heading2:    { sl: "NEKAJ NOVEGA",  en: "SOMETHING NEW" },
  tagline: {
    sl: "Nastaja nova izkušnja. Vpišite svoj e-naslov in obvestili vas bomo, ko bo pripravljena.",
    en: "A new experience is taking shape. Leave your email and we'll let you know when it's ready.",
  },
  placeholder: { sl: "vas@email.com",              en: "your@email.com" },
  success:     { sl: "Odlično! Obvestili vas bomo. 🔥", en: "You're in. We'll let you know. 🔥" },
  status:      { sl: "Status",                     en: "Status" },
  statusVal:   { sl: "85 % zaključeno",            en: "85% complete" },
  statusNote:  { sl: "V nastajanju",               en: "In progress" },
  notes:       { sl: "Opombe",                     en: "Notes" },
  concept:     { sl: "Koncept",                    en: "Concept" },
  conceptVal:  { sl: "izpopolnjen",                en: "refined" },
  quality:     { sl: "Kakovost",                   en: "Quality" },
  qualityVal:  { sl: "brez kompromisov",           en: "uncompromised" },
  launch:      { sl: "Lansiranje",                 en: "Launch" },
  eta:         { sl: "Odpiramo kmalu.\nDatum bomo najprej objavili tukaj.", en: "Opening soon.\nWe'll share the date here first." },
} as const;

type CsKey = keyof typeof cs;

/* ─── Three.js: Liquid background ─────────────────────────────── */

const Invalidator = ({ isVisible }: { isVisible: boolean }) => {
  const { invalidate } = useThree();
  useEffect(() => {
    let id: number;
    const loop = () => { if (isVisible) { invalidate(); id = requestAnimationFrame(loop); } };
    if (isVisible) id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [isVisible, invalidate]);
  return null;
};

const LiquidBackground = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value  = clock.getElapsedTime();
    mat.uniforms.uMouse.value.lerp(mouse, 0.05);
  });

  return (
    <mesh ref={ref} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main(){
            vec2 uv=vUv; float t=uTime*.15; vec2 m=uMouse*.1;
            float c=smoothstep(0.,1.,(sin(uv.x*8.+t+m.x*12.)+sin(uv.y*6.-t+m.y*12.))*.5+.5);
            gl_FragColor=vec4(mix(vec3(.005),vec3(.05),c),1.);
          }`}
      />
    </mesh>
  );
};

const Monolith = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.25; });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial color="#0a0a0a" speed={4} distort={0.4} roughness={0.05} metalness={1} />
      </mesh>
    </Float>
  );
};

/* ─── Email form ──────────────────────────────────────────────── */

function EmailForm({ t }: { t: (k: CsKey) => string }) {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setOk(true);
    setEmail("");
    setTimeout(() => setOk(false), 4000);
  }, [email]);

  return (
    <form onSubmit={submit} className="cs-form">
      <div className="cs-input-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="cs-input"
          required
          id="cs-email-input"
        />
        <button type="submit" className="cs-submit" id="cs-notify-btn">
          {ok ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          )}
        </button>
      </div>
      {ok && <span className="cs-success">{t("success")}</span>}
    </form>
  );
}

/* ─── Social icons (SVG) ──────────────────────────────────────── */

const IconIG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconLI = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════ */

export default function ComingSoonPage() {
  const root = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation();

  const t = useCallback((k: CsKey) => cs[k][locale] ?? cs[k]["en"], [locale]);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(reveal.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" },
      );
      gsap.from(".cs-card", { y: 40, opacity: 0, stagger: 0.12, duration: 1.4, ease: "power4.out", delay: 0.8 });
      gsap.from(".cs-divider", { scaleX: 0, duration: 1.8, ease: "expo.out", delay: 0.6 });
      gsap.from(".cs-form",    { y: 20, opacity: 0, duration: 1.2, ease: "power3.out", delay: 1.4 });
      gsap.from(".cs-footer",  { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 1.6 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="cs-page">
      {/* 3D background */}
      <div className="cs-canvas-wrap">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }} frameloop="demand">
          <ambientLight intensity={0.4} />
          <spotLight position={[50, 50, 50]} intensity={3} />
          <LiquidBackground />
          <Monolith />
          <Invalidator isVisible={true} />
        </Canvas>
      </div>

      {/* Grain */}
      <div className="cs-grain" />

      {/* Language toggle */}
      <div className="cs-lang">
        <LanguageSwitcher />
      </div>

      {/* ── Content ── */}
      <main ref={reveal} className="cs-main">
        {/* Brand chip */}
        <div className="cs-brand">
          <div className="cs-brand-dot" />
          <span className="cs-brand-name">extnd</span>
        </div>

        {/* Heading */}
        <h1 className="cs-heading">
          {t("heading1")}
          <br />
          <span className="cs-heading-outline">{t("heading2")}</span>
        </h1>

        {/* Divider */}
        <div className="cs-divider" />

        {/* Tagline */}
        <p className="cs-tagline">{t("tagline")}</p>

        {/* Email */}
        <EmailForm t={t} />

        {/* Status cards */}
        <div className="cs-grid">
          {/* 001 — Status */}
          <div className="cs-card">
            <span className="cs-card-id">001 // {t("status")}</span>
            <div className="cs-progress-row">
              <span className="cs-progress-value">{t("statusVal")}</span>
              <div className="cs-progress-bar"><div className="cs-progress-fill" /></div>
            </div>
            <span className="cs-card-note">{t("statusNote")}</span>
          </div>

          {/* 002 — Notes */}
          <div className="cs-card">
            <span className="cs-card-id">002 // {t("notes")}</span>
            <div className="cs-data">
              <div className="cs-data-row">
                <span>{t("concept")}</span>
                <span className="cs-data-val">{t("conceptVal")}</span>
              </div>
              <div className="cs-data-line" />
              <div className="cs-data-row">
                <span>{t("quality")}</span>
                <span className="cs-data-val">{t("qualityVal")}</span>
              </div>
            </div>
          </div>

          {/* 003 — Launch */}
          <div className="cs-card">
            <span className="cs-card-id">003 // {t("launch")}</span>
            <p className="cs-card-text">{t("eta")}</p>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <div className="cs-footer">
        <span className="cs-copy">© 2026 extnd</span>
        <div className="cs-links">
          <a href="#" className="cs-link" aria-label="Instagram" id="cs-ig"><IconIG /></a>
          <a href="#" className="cs-link" aria-label="LinkedIn" id="cs-li"><IconLI /></a>
          <a href="mailto:hello@extnd.si" className="cs-link" aria-label="Email" id="cs-mail"><IconMail /></a>
        </div>
      </div>
    </div>
  );
}
