"use client";

import { ChevronRight, ChevronDown, Home, FileText, Monitor } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

export function GlowingEffectDemo() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white whitespace-pre-line">
        {t("demo.sectionTitle")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Analytics) */}
        <GridItem className="lg:col-span-5 relative z-10 flex flex-col max-lg:aspect-square max-lg:h-auto">
          <div className="flex flex-col h-full gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white tracking-tight">{t("demo.analyticsTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed pr-6">
                {t("demo.analyticsDesc")}
              </p>
              <button className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 mt-4 transition-colors">
                {t("demo.learnMore")} <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            <div className="mt-auto border border-white/5 rounded-2xl bg-[#0a0a0a]/50 flex-1 p-6 relative overflow-hidden flex flex-col shadow-inner">
              <h4 className="text-xl font-medium text-white mb-8 tracking-tight">{t("demo.overview")}</h4>

              <div className="grid grid-cols-3 gap-2 mb-10">
                <div>
                  <div className="text-xs text-neutral-500 mb-1.5 flex items-center gap-1.5 font-medium">
                    {t("demo.liveVisitors")} <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                  </div>
                  <div className="text-2xl font-semibold text-white tracking-tight">419</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1.5 font-medium">{t("demo.uniqueVisitors")}</div>
                  <div className="text-2xl font-semibold text-white tracking-tight">1.7M</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1.5 font-medium">{t("demo.totalPageviews")}</div>
                  <div className="text-2xl font-semibold text-white tracking-tight">3.2M</div>
                </div>
              </div>

              <div className="relative h-32 w-full mb-8">
                <div className="absolute -top-4 left-0 text-[11px] text-neutral-600 font-medium">330k</div>
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                    </linearGradient>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>

                  <path d="M0 25 Q 10 15, 20 20 T 40 10 T 60 20 T 80 5 T 100 10 L100 40 L0 40 Z" fill="url(#purpleGradient)" opacity="0.4" />
                  <path d="M0 25 Q 10 15, 20 20 T 40 10 T 60 20 T 80 5 T 100 10" fill="none" stroke="#a855f7" strokeWidth="0.5" className="drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]" />

                  <path d="M0 32 Q 10 28, 20 30 T 40 25 T 60 28 T 80 20 T 100 25 L100 40 L0 40 Z" fill="url(#blueGradient)" opacity="0.4" />
                  <path d="M0 32 Q 10 28, 20 30 T 40 25 T 60 28 T 80 20 T 100 25" fill="none" stroke="#3b82f6" strokeWidth="0.5" className="drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]" />
                </svg>

                {/* Tooltip mock */}
                <div className="absolute bottom-1 left-2 bg-[#050505] border border-white/10 rounded-xl p-3 text-xs w-48 shadow-2xl z-10 backdrop-blur-md">
                  <div className="text-neutral-500 mb-3 font-medium text-[11px]">March 25, 2026</div>
                  <div className="flex justify-between items-center text-white mb-2">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> <span className="text-neutral-300">{t("demo.pageviews")}</span></div>
                    <span className="font-semibold">258,156</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#a855f7]" /> <span className="text-neutral-300">{t("demo.visitors")}</span></div>
                    <span className="font-semibold">85,458</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              <div className="flex justify-between text-sm text-white mb-4">
                <span className="font-medium text-neutral-200">{t("demo.sources")}</span>
                <span className="text-neutral-500 flex items-center gap-1 cursor-pointer text-xs">{t("demo.referrer")} <ChevronDown className="w-3.5 h-3.5" /></span>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { name: 'google.com', val: '436K', icon: 'G' },
                  { name: 'chatgpt.com', val: '189K', icon: 'C' },
                  { name: 'linkedin.com', val: '96K', icon: 'in' },
                  { name: 'youtube.com', val: '82K', icon: 'Y' },
                  { name: 'bing.com', val: '71K', icon: 'b' },
                  { name: 'x.com', val: '49K', icon: 'X' }
                ].map(source => (
                  <div key={source.name} className="flex justify-between items-center py-1.5 px-3 hover:bg-white/5 rounded-lg transition-colors cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-[#161616] border border-white/5 flex items-center justify-center text-[10px] font-semibold text-neutral-400">
                        {source.icon}
                      </div>
                      <span className="text-neutral-400 text-sm">{source.name}</span>
                    </div>
                    <span className="text-white text-sm font-medium">{source.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GridItem>

        {/* Right Column (A/B Testing + SEO/Perf) */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full relative z-10">

          {/* Top Right Card (A/B Testing) */}
          <GridItem className="min-h-[460px] flex-1 max-lg:aspect-square max-lg:h-auto">
            <div className="flex flex-col h-full gap-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white tracking-tight">{t("demo.abTestingTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed pr-6">
                  {t("demo.abTestingDesc")}
                </p>
                <button className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 mt-4 transition-colors">
                  {t("demo.learnMore")} <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>

              <div className="mt-auto border border-white/5 rounded-2xl bg-[#0a0a0a] flex-1 overflow-hidden flex relative shadow-inner">
                {/* Editor Sidebar */}
                <div className="w-52 bg-[#0c0c0c] border-r border-white/5 flex flex-col">
                  <div className="h-12 border-b border-white/5 flex items-center gap-4 px-4">
                    <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center border border-white/5">
                      <div className="w-2.5 h-2.5 bg-neutral-400/80 rounded-[2px]"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 bg-white/5 rounded-[3px] border border-white/5"></div>
                      <div className="w-4 h-4 bg-white/5 rounded-[3px] border border-white/5"></div>
                      <div className="w-4 h-4 bg-white/5 rounded-[3px] border border-white/5"></div>
                      <div className="w-4 h-4 bg-white/5 rounded-[3px] border border-white/5"></div>
                    </div>
                  </div>
                  <div className="px-2 py-2.5 flex gap-1 border-b border-white/5 text-[11px]">
                    <div className="px-3 py-1.5 bg-white/10 rounded-md text-white font-medium flex-1 text-center border border-white/5 shadow-sm">Pages</div>
                    <div className="px-3 py-1.5 text-neutral-500 font-medium flex-1 text-center hover:text-neutral-300">Layers</div>
                    <div className="px-3 py-1.5 text-neutral-500 font-medium flex-1 text-center hover:text-neutral-300">Assets</div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-center text-xs text-neutral-300 mb-5 font-medium">
                      Design <span className="text-neutral-500">+</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-neutral-300 mb-3 font-medium">
                      Pages <span className="text-neutral-500">+</span>
                    </div>
                    <div className="flex flex-col gap-3 text-xs mt-4">
                      <div className="flex items-center gap-2.5 text-neutral-300 ml-2 font-medium"><Home className="w-4 h-4 text-neutral-400" /> Home</div>
                      <div className="flex flex-col ml-[22px] gap-2 text-neutral-500 border-l border-white/10 pl-4 py-1.5 relative">
                        {/* active indicator line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-white/40 -translate-x-[1px]"></div>

                        <div className="flex items-center gap-2.5 px-2 py-1.5 hover:text-neutral-300 transition-colors">
                          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[9px] text-neutral-400 border border-white/10">A</div> Control
                        </div>
                        <div className="flex items-center gap-2.5 bg-white/10 text-white rounded-md px-2 py-2 shadow-sm border border-white/5 ml-[-8px]">
                          <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold">B</div> Version B
                        </div>
                        <div className="flex items-center gap-2.5 px-2 py-1.5 hover:text-neutral-300 transition-colors">
                          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[9px] text-neutral-400 border border-white/10">C</div> Version C
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-neutral-500 ml-2 mt-2 font-medium hover:text-neutral-300 transition-colors"><FileText className="w-4 h-4" /> /pricing</div>
                    </div>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 bg-[#050505] relative isolate overflow-hidden p-6 md:p-8 flex flex-col items-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-[-1]"></div>

                  <div className="bg-[#1a4b8c]/20 text-[#60a5fa] px-4 py-1.5 border border-[#3b82f6]/30 rounded-full text-xs font-medium flex items-center gap-2 z-10 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-8">
                    <Monitor className="w-4 h-4" /> Desktop - 1200
                  </div>

                  <div className="w-full max-w-sm flex-1 bg-[#0a0a0a]/90 rounded-t-2xl border border-white/10 border-b-0 relative shadow-2xl flex flex-col items-center pt-8 px-6 backdrop-blur-xl isolate">

                    <h5 className="text-2xl font-semibold tracking-[-0.02em] text-white text-center leading-[1.15]">
                      The fastest, ultra-<br />voice AI platform
                    </h5>

                    <p className="text-[11px] text-neutral-500 mt-3 text-center font-medium">Built for scale, designed for speed.</p>

                    {/* Visualizer bars */}
                    <div className="flex items-end justify-center gap-1.5 w-[110%] absolute -bottom-2 z-[-1] opacity-90 pb-2 h-40 mask-image:linear-gradient(to_bottom,transparent,black)">
                      {Array.from({ length: 42 }).map((_, i) => {
                        // Deterministic pseudo-random to avoid hydration mismatch
                        const seed = (i * 2654435761) >>> 0;
                        const pseudoRandom = (seed % 1000) / 1000;
                        const h = Math.round((Math.sin(i * 0.4) * 30 + pseudoRandom * 40 + 20) * 100) / 100;
                        const colorGroup = (i % 5);
                        let gradient = "from-blue-600 to-blue-400";
                        if (colorGroup === 1) gradient = "from-indigo-600 to-indigo-400";
                        if (colorGroup === 2) gradient = "from-purple-600 to-purple-400";
                        if (colorGroup === 3) gradient = "from-pink-600 to-pink-400";
                        if (colorGroup === 4) gradient = "from-cyan-600 to-cyan-400";

                        return (
                          <div key={i} className={cn(
                            "w-1.5 rounded-t-[2px] bg-gradient-to-t shadow-[0_0_8px_currentColor] opacity-80",
                            gradient
                          )} style={{ height: `${h}%` }}></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>

          {/* Bottom Right Card (SEO Performance) */}
          <GridItem className="min-h-[300px] max-lg:aspect-square max-lg:h-auto">
            <div className="flex flex-col h-full gap-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white tracking-tight">{t("demo.seoTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed pr-6">
                  {t("demo.seoDesc")}
                </p>
                <button className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 mt-4 transition-colors">
                  {t("demo.learnMore")} <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>

              <div className="mt-auto border border-white/5 rounded-2xl bg-[#0a0a0a] flex flex-col items-center justify-center py-10 px-8 relative overflow-hidden shadow-inner">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111] to-transparent z-0"></div>

                <div className="flex items-center gap-2.5 text-neutral-300 text-[13px] font-medium mb-12 z-10">
                  <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[11px] shadow-sm tracking-tighter">G</div>
                  Google Lighthouse
                </div>

                <div className="flex justify-center items-end gap-6 sm:gap-10 md:gap-14 z-10">
                  <LighthouseScore value={89} label="SEO" size={80} />
                  <div className="relative transform sm:scale-110 -translate-y-2">
                    <LighthouseScore value={90} label={t("demo.performance")} size={96} className="shadow-[0_0_40px_rgba(255,255,255,0.08)] bg-[#050505]" />
                  </div>
                  <LighthouseScore value={88} label={t("demo.accessibility")} size={80} />
                </div>
              </div>
            </div>
          </GridItem>

        </div>
      </div>
    </div>
  );
}

const LighthouseScore = ({ value, label, size = 80, className = "" }: { value: number, label: string, size?: number, className?: string }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className={cn("relative flex items-center justify-center rounded-full bg-[#0d0d0d] border border-white/5", className)} style={{ width: size, height: size }}>
        {/* Outermost subtle ring */}
        <div className="absolute inset-[2px] rounded-full border border-white/[0.03]"></div>

        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="transparent"
            stroke="#fff"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>
        <span className={cn("font-medium tracking-tight text-white", size > 85 ? "text-3xl" : "text-2xl")}>{value}</span>
      </div>
      <span className="text-[11px] text-neutral-400 font-medium tracking-wide">{label}</span>
    </div>
  );
};

const GridItem = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={cn("relative h-full rounded-[1.5rem] border-[0.75px] border-white/10 p-2 sm:p-3", className)}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
        variant="white"
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-white/5 bg-[#050505] p-6 shadow-sm z-10 md:p-8">
        {children}
      </div>
    </div>
  );
};
