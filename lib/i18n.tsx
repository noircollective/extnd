"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Locale = "sl" | "en";

const translations = {
  // ─── Header ───
  "header.product": { sl: "Produkt", en: "Product" },
  "header.company": { sl: "Podjetje", en: "Company" },
  "header.pricing": { sl: "Cenik", en: "Pricing" },
  "header.signIn": { sl: "Prijava", en: "Sign In" },
  "header.getStarted": { sl: "Začni", en: "Get Started" },
  "header.interested": { sl: "Vas zanima?", en: "Interested?" },
  "header.scheduleDemo": { sl: "Rezervirajte demo", en: "Schedule a demo" },

  // Header — Product links
  "product.websiteBuilder": { sl: "Gradnja spletnih strani", en: "Website Builder" },
  "product.websiteBuilder.desc": { sl: "Ustvarite odzivne spletne strani z lahkoto", en: "Create responsive websites with ease" },
  "product.cloudPlatform": { sl: "Oblačna platforma", en: "Cloud Platform" },
  "product.cloudPlatform.desc": { sl: "Postavite in razširite aplikacije v oblaku", en: "Deploy and scale apps in the cloud" },
  "product.teamCollaboration": { sl: "Timsko sodelovanje", en: "Team Collaboration" },
  "product.teamCollaboration.desc": { sl: "Orodja za boljše sodelovanje vaših ekip", en: "Tools to help your teams work better together" },
  "product.analytics": { sl: "Analitika", en: "Analytics" },
  "product.analytics.desc": { sl: "Sledite in analizirajte promet na vaši spletni strani", en: "Track and analyze your website traffic" },
  "product.integrations": { sl: "Integracije", en: "Integrations" },
  "product.integrations.desc": { sl: "Povežite vaše aplikacije in storitve", en: "Connect your apps and services" },
  "product.api": { sl: "API", en: "API" },
  "product.api.desc": { sl: "Zgradite integracije po meri z našim API-jem", en: "Build custom integrations with our API" },

  // Header — Company links
  "company.aboutUs": { sl: "O nas", en: "About Us" },
  "company.aboutUs.desc": { sl: "Spoznajte našo zgodbo in ekipo", en: "Learn more about our story and team" },
  "company.customerStories": { sl: "Zgodbe strank", en: "Customer Stories" },
  "company.customerStories.desc": { sl: "Poglejte, kako smo pomagali našim strankam uspeti", en: "See how we've helped our clients succeed" },
  "company.partnerships": { sl: "Partnerstva", en: "Partnerships" },
  "company.partnerships.desc": { sl: "Sodelujte z nami za skupno rast", en: "Collaborate with us for mutual growth" },
  "company.terms": { sl: "Pogoji uporabe", en: "Terms of Service" },
  "company.privacy": { sl: "Politika zasebnosti", en: "Privacy Policy" },
  "company.refund": { sl: "Politika vračil", en: "Refund Policy" },
  "company.blog": { sl: "Blog", en: "Blog" },
  "company.helpCenter": { sl: "Center za pomoč", en: "Help Center" },

  // ─── Hero ───
  "hero.creative": { sl: "KREATIVNA", en: "CREATIVE" },
  "hero.agency": { sl: "AGENCIJA", en: "AGENCY" },
  "hero.tagline": {
    sl: "Razvijamo poglobljene digitalne izkušnje s prostorsko logiko in napredno WebGL tehnologijo.",
    en: "We engineer immersive digital experiences through spatial logic and advanced WebGL.",
  },
  "hero.cta": { sl: "Začni projekt", en: "Start a Project" },
  "hero.availability": { sl: "RAZPOLOŽLJIVOST", en: "AVAILABILITY" },
  "hero.availabilityVal": { sl: "Odprti", en: "Open" },
  "hero.studioStats": { sl: "STATISTIKA STUDIA", en: "STUDIO STATS" },
  "hero.studioStatsVal": { sl: "20+ zmag", en: "20+ Wins" },
  "hero.awwwardsTier": { sl: "Awwwards nivo", en: "Awwwards Tier" },
  "hero.retentionRate": { sl: "Stopnja zadržanja", en: "Retention Rate" },
  "hero.expertise": { sl: "STROKOVNO ZNANJE", en: "EXPERTISE" },
  "hero.expertiseVal": { sl: "Kreativni razvoj", en: "Creative Dev" },
  "hero.expertiseDesc": {
    sl: "Statične vmesnike pretvarjamo v ",
    en: "Transforming static interfaces into ",
  },
  "hero.expertiseHighlight": {
    sl: "narativne aperture",
    en: "narrative apertures",
  },

  // ─── Text Reveal ───
  "textReveal.text": {
    sl: "Specializirani smo za ustvarjanje poglobljenih, visoko interaktivnih spletnih izkušenj, ki združujejo robustno inženirstvo z vrhunsko, napredno estetiko, da vaša blagovna znamka izstopa.",
    en: "We specialize in crafting immersive, highly interactive web experiences that blend robust engineering with elevated, cutting-edge aesthetics to help your brand stand out.",
  },

  // ─── Demo / Bento Grid ───
  "demo.sectionTitle": { sl: "Rastite brez\nmenjave orodij", en: "Scale without\nswitching tools" },
  "demo.analyticsTitle": { sl: "Analitika in vpogledi", en: "Analytics & insights" },
  "demo.analyticsDesc": { sl: "Sledite prometu, merite zmogljivost in spremljajte konverzije.", en: "Track traffic, measure performance, and monitor conversions." },
  "demo.learnMore": { sl: "Več o tem", en: "Learn more" },
  "demo.overview": { sl: "Pregled", en: "Overview" },
  "demo.liveVisitors": { sl: "Aktivni obiskovalci", en: "Live Visitors" },
  "demo.uniqueVisitors": { sl: "Edinstveni obiskovalci", en: "Unique Visitors" },
  "demo.totalPageviews": { sl: "Skupni ogledi", en: "Total Pageviews" },
  "demo.pageviews": { sl: "Ogledi strani", en: "Pageviews" },
  "demo.visitors": { sl: "Obiskovalci", en: "Visitors" },
  "demo.sources": { sl: "Viri", en: "Sources" },
  "demo.referrer": { sl: "Napotitelj", en: "Referrer" },
  "demo.abTestingTitle": { sl: "A/B testiranje in optimizacija", en: "A/B Testing & optimization" },
  "demo.abTestingDesc": { sl: "A/B testiranje, lijaki in vgrajeni vpogledi v rast.", en: "A/B testing, funnels, and built-in growth insights." },
  "demo.seoTitle": { sl: "SEO in zmogljivost", en: "SEO & performance" },
  "demo.seoDesc": { sl: "Optimizirajte vsako stran z vgrajenimi SEO nastavitvami, metapodatki in izjemno hitrim gostovanjem.", en: "Optimize every page with built-in SEO settings, metadata, and blazing-fast hosting." },
  "demo.performance": { sl: "Zmogljivost", en: "Performance" },
  "demo.accessibility": { sl: "Dostopnost", en: "Accessibility" },

  // ─── Process Section ───
  "process.sidebarTitle": { sl: "Od ideje do objave,\nod začetka do konca", en: "From brief to live,\nend to end" },
  "process.ourProcess": { sl: "Naš proces", en: "Our process" },
  "process.discover": { sl: "Odkrivanje", en: "Discover" },
  "process.discover.desc": {
    sl: "Začnemo s poglobljenim razumevanjem vašega podjetja — vaših ciljev, občinstva in konkurence. Vsaka odlična spletna stran se začne s pravimi vprašanji.",
    en: "We start by getting under the skin of your business — your goals, audience, and competitors. Every great website starts with the right questions.",
  },
  "process.design": { sl: "Oblikovanje", en: "Design" },
  "process.design.desc": {
    sl: "Oblikujemo vizualno identiteto in sistem postavitve, ki je nezmotljivo vaš — smiseln, prefinjen in zgrajen za pretvorbo obiskovalcev v stranke.",
    en: "We craft a visual identity and layout system that's unmistakably yours — purposeful, refined, and built to convert visitors into clients.",
  },
  "process.build": { sl: "Razvoj", en: "Build" },
  "process.build.desc": {
    sl: "Dizajni zaživijo kot hitre, odzivne spletne strani — s CMS-jem tako preprostim, da lahko vaša ekipa posodablja vsebino brez dotika ene vrstice kode.",
    en: "Designs come to life as fast, responsive websites — with a CMS so simple your team can update content without touching a single line of code.",
  },
  "process.launch": { sl: "Zagon", en: "Launch" },
  "process.launch.desc": {
    sl: "Poskrbimo za celoten zagon — domeno, gostovanje, zmogljivost in SEO — nato predamo stran, na katero ste ponosni, s stalno podporo.",
    en: "We handle the full go-live — domain, hosting, performance, and SEO — then hand over a site you're proud to share, backed by ongoing support.",
  },

  // Process — Launch showcase stats
  "launch.visitors": { sl: "Obiskovalci", en: "Visitors" },
  "launch.thisWeek": { sl: "↑ 34% ta teden", en: "↑ 34% this week" },
  "launch.perfScore": { sl: "Oc. zmoglj.", en: "Perf. Score" },
  "launch.enquiries": { sl: "Povpraševanja", en: "Enquiries" },
  "launch.first7days": { sl: "Prvih 7 dni", en: "First 7 days" },
  "launch.handoff": { sl: "Predaja", en: "Handoff" },
  "launch.cmsTraining": { sl: "CMS usposabljanje", en: "CMS training" },
  "launch.domainTransferred": { sl: "Domena prenesena", en: "Domain transferred" },
  "launch.analyticsSetUp": { sl: "Analitika vzpostavljena", en: "Analytics set up" },
  "launch.support30": { sl: "30-dnevna podpora", en: "30-day support" },
  "launch.liveInfo": {
    sl: "nordvikstudio.no je v živo — zagnano 18. marca 2026",
    en: "nordvikstudio.no is live — launched March 18, 2026",
  },
  "launch.shareReport": { sl: "Deli poročilo", en: "Share report" },
  "launch.viewLiveSite": { sl: "Poglej stran v živo", en: "View live site" },

  // Process — Discover showcase
  "discover.brief": { sl: "Povzetek odkrivanja", en: "Discovery Brief" },
  "discover.client": { sl: "Stranka", en: "Client" },
  "discover.goals": { sl: "Cilji", en: "Goals" },
  "discover.goal1": { sl: "Privabiti premožne stanovanjske stranke", en: "Attract high-end residential clients" },
  "discover.goal2": { sl: "Predstaviti portfelj s celozaslonskimi slikami", en: "Showcase portfolio with full-screen imagery" },
  "discover.goal3": { sl: "Povečati povpraševanja prek kontaktnega obrazca", en: "Drive project enquiries via contact form" },
  "discover.toneFeel": { sl: "Ton in občutek", en: "Tone & Feel" },
  "discover.competitors": { sl: "Konkurenti", en: "Competitors" },
  "discover.more": { sl: "+ 3 več", en: "+ 3 more" },

  // ─── Testimonials ───
  "testimonials.heading": {
    sl: "Zaupajo nam lokalna\npodjetja po Sloveniji",
    en: "Trusted by local\nbusinesses across Slovenia",
  },
  "testimonials.readMore": { sl: "Poglej stran", en: "View site" },
  "testimonials.quote1": {
    sl: "\"Noir Labs je razumel, kaj naš posel potrebuje — profesionalno, zanesljivo spletno stran, ki pritegne nove stranke. Odkar imamo novo stran, prejemamo bistveno več povpraševanj.\"",
    en: "\"Noir Labs understood what our business needed — a professional, reliable website that attracts new clients. Since the new site, we've been getting significantly more enquiries.\"",
  },
  "testimonials.name1": { sl: "Marko Kovač", en: "Marko Kovač" },
  "testimonials.role1": { sl: "Direktor, AquaTeh", en: "Director, AquaTeh" },
  "testimonials.quote2": {
    sl: "\"Spletna stran popolnoma odraža vzdušje našega salona — elegantno, sodobno in vabljivo. Stranke redno komentirajo, kako lepa je, in rezervacije so se povečale.\"",
    en: "\"The website perfectly reflects the atmosphere of our salon — elegant, modern, and inviting. Clients regularly comment on how beautiful it is, and bookings have increased.\"",
  },
  "testimonials.name2": { sl: "Ana Horvat", en: "Ana Horvat" },
  "testimonials.role2": { sl: "Lastnica, Studio Bella", en: "Owner, Studio Bella" },
  "testimonials.quote3": {
    sl: "\"Nova spletna stran je postala naš najboljši natakar. Gostje rezervirajo mize še preden nas obiščejo — oblikovanje popolnoma ujame bistvo Ognjišča.\"",
    en: "\"The new website became our best waiter. Guests book tables before they even visit — the design perfectly captures the essence of Ognjišče.\"",
  },
  "testimonials.name3": { sl: "Luka Bizjak", en: "Luka Bizjak" },
  "testimonials.role3": { sl: "Lastnik, Ognjišče", en: "Owner, Ognjišče" },
  "testimonials.quote4": {
    sl: "\"Profesionalna spletna stran nam je prinesla zaupanje strank, ki ga naš posel potrebuje. Zdaj nas stranke najdejo na spletu in takoj vidijo, da smo resna ekipa.\"",
    en: "\"A professional website gave us the client trust our business needed. Now customers find us online and immediately see that we're a serious team.\"",
  },
  "testimonials.name4": { sl: "Nejc Krajnc", en: "Nejc Krajnc" },
  "testimonials.role4": { sl: "Lastnik, Garaža Pro", en: "Owner, Garaža Pro" },
  "testimonials.quote5": {
    sl: "\"Naša pisarna potrebuje spletno stran, ki izraža resnost in zaupanje. Noir Labs je to dosegel v popolnosti — prefinjen dizajn, ki naše stranke prepriča, še preden nas pokličejo.\"",
    en: "\"Our firm needed a website that conveys seriousness and trust. Noir Labs achieved this perfectly — a refined design that convinces clients before they even call us.\"",
  },
  "testimonials.name5": { sl: "Petra Zupan", en: "Petra Zupan" },
  "testimonials.role5": { sl: "Odvetnica, Verity", en: "Attorney, Verity" },

  // Metadata
  "meta.title": { sl: "Noir Labs | Kreativna agencija", en: "Noir Labs | Creative Agency" },
  "meta.description": {
    sl: "Specializirani smo za ustvarjanje poglobljenih, visoko interaktivnih spletnih izkušenj, ki združujejo robustno inženirstvo z vrhunsko estetiko.",
    en: "We specialize in crafting immersive, highly interactive web experiences that blend robust engineering with elevated aesthetics.",
  },
} as const;

type TranslationKey = keyof typeof translations;

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("sl");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "sl") {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[locale] ?? entry["en"] ?? key;
    },
    [locale]
  );

  // Set initial lang attribute
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useTranslation();

  return (
    <div className={`flex items-center gap-0.5 text-xs font-mono tracking-wider ${className}`}>
      <button
        onClick={() => setLocale("sl")}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          locale === "sl"
            ? "text-white bg-white/15"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        SL
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          locale === "en"
            ? "text-white bg-white/15"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
      </button>
    </div>
  );
}
