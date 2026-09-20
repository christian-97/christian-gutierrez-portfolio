import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon, Maximize2, X } from "lucide-react";

function SectionLabel({ index, children }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      {children}
    </div>
  );
}

// Catálogo de rutas de imágenes para FactuOnLine Case Study
// Directorio físico: public/images/factuonline/
export const FACTUONLINE_IMAGES = {
  main: `${import.meta.env.BASE_URL}images/factuonline/factuonline-main.png`,
  architecture: `${import.meta.env.BASE_URL}images/factuonline/factuonline-architecture.png`,
  dashboard: `${import.meta.env.BASE_URL}images/factuonline/factuonline-dashboard.png`,
  invoicing: `${import.meta.env.BASE_URL}images/factuonline/factuonline-invoicing.png`,
  commercial: `${import.meta.env.BASE_URL}images/factuonline/factuonline-commercial.png`,
  users: `${import.meta.env.BASE_URL}images/factuonline/factuonline-users.png`,
  billing: `${import.meta.env.BASE_URL}images/factuonline/factuonline-billing.png`,
  feature: `${import.meta.env.BASE_URL}images/factuonline/factuonline-feature.png`,
  logo: `${import.meta.env.BASE_URL}images/factuonline/logo.webp`,
};

function ImagePlaceholder({ label, sublabel, pathHint, aspectRatio = "16/9", className = "", onClick = null, zoomHint = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const frameRef = React.useRef(null);

  const handleLoad = () => {
    setIsLoaded(true);
    if (frameRef.current) {
      frameRef.current.style.aspectRatio = "unset";
    }
  };

  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={frameRef}
      className={`cs-media-frame ${isLoaded ? "cs-media-frame--loaded" : ""} ${onClick ? "cs-media-frame--clickable" : ""} ${className}`}
      style={{ aspectRatio }}
      onClick={onClick || undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Enlarge ${label}` : undefined}
    >
      {onClick && zoomHint && isLoaded && (
        <span className="cs-media-zoom-hint">
          <Maximize2 size={12} />
          <span>EXPAND</span>
        </span>
      )}

      {/* Subtle skeleton shimmer while loading */}
      {!isLoaded && !hasError && (
        <div className="img-skeleton" aria-hidden="true" />
      )}

      {pathHint && !hasError && (
        <img
          src={pathHint}
          alt={label}
          className={`cs-media-img ${isLoaded ? "cs-media-img--loaded" : "cs-media-img--loading"}`}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={() => setHasError(true)}
        />
      )}

      {hasError && (
        <div className="cs-placeholder-inner">
          <div className="cs-placeholder-icon">
            <ImageIcon size={28} strokeWidth={1.3} />
          </div>
          <div className="cs-placeholder-badge">{label}</div>
          {sublabel && <p className="cs-placeholder-sub">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="cs-arch-diagram-wrap">
      <div className="cs-arch-diagram-meta">
        <div>
          <span className="cs-arch-diagram-title">FACTUONLINE — SYSTEM ARCHITECTURE</span>
          <span className="cs-arch-diagram-sub">Multi-Tenant SaaS · API Integration · Service Separation</span>
        </div>
        <span className="cs-arch-diagram-version">v1.0</span>
      </div>

      <svg
        viewBox="0 0 1060 536"
        xmlns="http://www.w3.org/2000/svg"
        className="cs-arch-svg"
        role="img"
        aria-label="FactuOnLine System Architecture Diagram"
      >
        <defs>
          <marker id="arch-arrow-blue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0.5 L0,6.5 L7,3.5 z" fill="#1a6ed8" />
          </marker>
          <marker id="arch-arrow-faint" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0.5 L0,6.5 L7,3.5 z" fill="#68747d" />
          </marker>
        </defs>

        {/* ── FACTUONLINE PLATFORM BOUNDARY ── */}
        <rect x="16" y="44" width="682" height="462" rx="3"
          fill="rgba(26,110,216,0.04)" stroke="rgba(26,110,216,0.45)"
          strokeWidth="1" strokeDasharray="6 3" />
        <rect x="26" y="35" width="226" height="20" fill="#0b0f14" />
        <text x="34" y="50" fontFamily="'DM Mono', monospace" fontSize="10"
          letterSpacing="2" fill="rgba(26,110,216,0.9)" fontWeight="500">FACTUONLINE PLATFORM</text>

        {/* ── WEB CLIENT ── */}
        <rect x="40" y="90" width="172" height="98" rx="2"
          fill="rgba(26,110,216,0.07)" stroke="rgba(26,110,216,0.38)" strokeWidth="1" />
        <text x="58" y="115" fontFamily="'Space Grotesk', sans-serif" fontSize="11"
          fontWeight="600" fill="#f4f7f5" letterSpacing="1">WEB CLIENT</text>
        <text x="58" y="131" fontFamily="'DM Mono', monospace" fontSize="10" fill="#63b3ed">React</text>
        <text x="58" y="175" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#68747d">Browser · SPA</text>

        {/* ── API / NESTJS ── */}
        <rect x="254" y="90" width="408" height="204" rx="2"
          fill="rgba(26,110,216,0.09)" stroke="rgba(26,110,216,0.52)" strokeWidth="1" />
        <text x="272" y="115" fontFamily="'Space Grotesk', sans-serif" fontSize="11"
          fontWeight="600" fill="#f4f7f5" letterSpacing="1">API</text>
        <text x="300" y="115" fontFamily="'DM Mono', monospace" fontSize="10" fill="#63b3ed">/ NestJS</text>
        <text x="272" y="131" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#68747d">REST · TypeScript · Modular Architecture</text>

        {/* Module: Identity & Access */}
        <rect x="272" y="150" width="114" height="58" rx="2"
          fill="rgba(11,15,20,0.7)" stroke="rgba(99,179,237,0.28)" strokeWidth="1" />
        <text x="282" y="169" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#63b3ed" letterSpacing="0.5">IDENTITY</text>
        <text x="282" y="183" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#63b3ed" letterSpacing="0.5">&amp; ACCESS</text>
        <text x="282" y="199" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Auth · Roles · Perms</text>

        {/* Module: Commercial Modules */}
        <rect x="396" y="150" width="126" height="58" rx="2"
          fill="rgba(11,15,20,0.7)" stroke="rgba(99,179,237,0.28)" strokeWidth="1" />
        <text x="406" y="169" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#63b3ed" letterSpacing="0.5">COMMERCIAL</text>
        <text x="406" y="183" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#63b3ed" letterSpacing="0.5">MODULES</text>
        <text x="406" y="199" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Orders · Billing</text>

        {/* Module: Tenant / Provisioning */}
        <rect x="532" y="150" width="118" height="58" rx="2"
          fill="rgba(11,15,20,0.7)" stroke="rgba(99,179,237,0.28)" strokeWidth="1" />
        <text x="542" y="169" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#63b3ed" letterSpacing="0.5">TENANT /</text>
        <text x="542" y="183" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#63b3ed" letterSpacing="0.5">PROVISIONING</text>
        <text x="542" y="199" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Multi-Tenant Isolation</text>

        {/* ── POSTGRESQL ── */}
        <rect x="40" y="364" width="620" height="130" rx="2"
          fill="rgba(11,15,20,0.85)" stroke="rgba(99,179,237,0.3)" strokeWidth="1" />
        <text x="58" y="388" fontFamily="'Space Grotesk', sans-serif" fontSize="11"
          fontWeight="600" fill="#f4f7f5" letterSpacing="1">POSTGRESQL</text>
        <text x="58" y="404" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#68747d">Relational Data Store · Tenant-aware Schema Design</text>

        {/* Platform DB chip */}
        <rect x="68" y="414" width="150" height="62" rx="2"
          fill="rgba(26,110,216,0.1)" stroke="rgba(26,110,216,0.32)" strokeWidth="1" />
        <text x="80" y="434" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#f4f7f5" letterSpacing="0.5">PLATFORM DB</text>
        <text x="80" y="448" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Users · Tenants · Plans</text>
        <text x="80" y="462" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Subscriptions · Config</text>

        {/* Tenant DB 1 chip */}
        <rect x="232" y="414" width="134" height="62" rx="2"
          fill="rgba(99,179,237,0.06)" stroke="rgba(99,179,237,0.24)" strokeWidth="1" />
        <text x="244" y="434" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#a7b1b8" letterSpacing="0.5">TENANT DB 1</text>
        <text x="244" y="448" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Isolated schema</text>

        {/* Tenant DB 2 chip */}
        <rect x="376" y="414" width="134" height="62" rx="2"
          fill="rgba(99,179,237,0.06)" stroke="rgba(99,179,237,0.24)" strokeWidth="1" />
        <text x="388" y="434" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="#a7b1b8" letterSpacing="0.5">TENANT DB 2</text>
        <text x="388" y="448" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Isolated schema</text>

        {/* More tenants ellipsis */}
        <text x="528" y="451" fontFamily="'DM Mono', monospace" fontSize="18"
          fill="#68747d" letterSpacing="4">···</text>

        {/* ── BILLING SERVICE BOUNDARY (independent system) ── */}
        <rect x="760" y="86" width="284" height="148" rx="3"
          fill="rgba(101,214,161,0.04)" stroke="rgba(101,214,161,0.32)"
          strokeWidth="1" strokeDasharray="6 3" />
        <rect x="770" y="78" width="180" height="18" fill="#0b0f14" />
        <text x="778" y="91" fontFamily="'DM Mono', monospace" fontSize="10"
          letterSpacing="2" fill="rgba(101,214,161,0.8)" fontWeight="500">BILLING SERVICE</text>

        <text x="778" y="118" fontFamily="'Space Grotesk', sans-serif" fontSize="11"
          fontWeight="600" fill="#f4f7f5" letterSpacing="0.5">Billing Service</text>
        <text x="778" y="134" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#68747d">Independent System</text>

        {/* PHP Backend chip */}
        <rect x="778" y="148" width="116" height="54" rx="2"
          fill="rgba(11,15,20,0.8)" stroke="rgba(101,214,161,0.26)" strokeWidth="1" />
        <text x="790" y="167" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="rgba(101,214,161,0.85)" letterSpacing="0.5">PHP BACKEND</text>
        <text x="790" y="181" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Legacy service</text>
        <text x="790" y="194" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">Maintained</text>

        {/* Electronic Invoicing chip */}
        <rect x="904" y="148" width="124" height="54" rx="2"
          fill="rgba(11,15,20,0.8)" stroke="rgba(101,214,161,0.26)" strokeWidth="1" />
        <text x="916" y="167" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="rgba(101,214,161,0.85)" letterSpacing="0.5">ELECTRONIC</text>
        <text x="916" y="181" fontFamily="'DM Mono', monospace" fontSize="9"
          fontWeight="500" fill="rgba(101,214,161,0.85)" letterSpacing="0.5">INVOICING</text>
        <text x="916" y="194" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d">XML · CDR · Digital Signing</text>

        {/* ── SUNAT (external system) ── */}
        <rect x="800" y="364" width="216" height="130" rx="2"
          fill="rgba(104,116,125,0.08)" stroke="rgba(104,116,125,0.32)" strokeWidth="1" />
        <text x="818" y="390" fontFamily="'Space Grotesk', sans-serif" fontSize="11"
          fontWeight="600" fill="#a7b1b8" letterSpacing="1">SUNAT</text>
        <text x="818" y="406" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#68747d">External Tax Authority</text>
        <text x="818" y="422" fontFamily="'DM Mono', monospace" fontSize="8"
          fill="rgba(104,116,125,0.7)">Government · Peru</text>
        <text x="818" y="438" fontFamily="'DM Mono', monospace" fontSize="8"
          fill="rgba(104,116,125,0.7)">Electronic Invoicing</text>
        <text x="818" y="460" fontFamily="'DM Mono', monospace" fontSize="8"
          fill="rgba(104,116,125,0.5)" letterSpacing="0.5">— EXTERNAL SYSTEM —</text>

        {/* ── INTERNAL ARROWS ── */}

        {/* Web Client → API (HTTP) */}
        <line x1="212" y1="139" x2="249" y2="139"
          stroke="#1a6ed8" strokeWidth="1.2" strokeOpacity="0.75"
          markerEnd="url(#arch-arrow-blue)" />
        <text x="220" y="132" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#68747d">HTTP</text>

        {/* API → PostgreSQL (SQL, dashed) */}
        <line x1="458" y1="294" x2="458" y2="360"
          stroke="#1a6ed8" strokeWidth="1" strokeOpacity="0.55"
          strokeDasharray="4 2" markerEnd="url(#arch-arrow-blue)" />
        <text x="464" y="330" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#68747d">SQL</text>

        {/* ── EXTERNAL INTEGRATION: API → Billing Service ── */}
        <line x1="662" y1="192" x2="755" y2="192"
          stroke="#1a6ed8" strokeWidth="1.5" strokeOpacity="0.88"
          markerEnd="url(#arch-arrow-blue)" />
        <rect x="672" y="168" width="72" height="14" rx="1" fill="#0b0f14" />
        <text x="676" y="179" fontFamily="'DM Mono', monospace" fontSize="8"
          fill="#1a6ed8" fontWeight="500">REST / API</text>
        <rect x="672" y="182" width="72" height="12" rx="1" fill="#0b0f14" />
        <text x="676" y="192" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#68747d">Integration</text>

        {/* Billing Service → SUNAT (Electronic Documents) */}
        <line x1="908" y1="234" x2="908" y2="360"
          stroke="#68747d" strokeWidth="1" strokeOpacity="0.8"
          markerEnd="url(#arch-arrow-faint)" />
        <text x="915" y="302" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#68747d">Electronic</text>
        <text x="915" y="314" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#68747d">Documents</text>

        {/* ── LEGEND ── */}
        <g transform="translate(40, 514)">
          <rect x="0" y="-5" width="16" height="12" rx="1"
            fill="none" stroke="rgba(26,110,216,0.5)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="22" y="5" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d" letterSpacing="0.5">SYSTEM BOUNDARY</text>

          <line x1="172" y1="1" x2="196" y2="1"
            stroke="#1a6ed8" strokeWidth="1.5" markerEnd="url(#arch-arrow-blue)" />
          <text x="202" y="5" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d" letterSpacing="0.5">API INTEGRATION</text>

          <rect x="358" y="-5" width="16" height="12" rx="1"
            fill="none" stroke="rgba(99,179,237,0.35)" strokeWidth="1" />
          <text x="380" y="5" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d" letterSpacing="0.5">DATA STORE</text>

          <rect x="498" y="-5" width="16" height="12" rx="1"
            fill="none" stroke="rgba(104,116,125,0.35)" strokeWidth="1" />
          <text x="520" y="5" fontFamily="'DM Mono', monospace" fontSize="8" fill="#68747d" letterSpacing="0.5">EXTERNAL SYSTEM</text>
        </g>
      </svg>

      <p className="cs-arch-diagram-note">
        Platform architecture designed around tenant isolation, modular services and independent electronic invoicing.
      </p>
    </div>
  );
}

export function FactuOnlineCaseStudy({ onBack }) {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const prevGalleryImage = () => {
    setSelectedGalleryIndex((curr) =>
      curr === 0 ? productGalleries.length - 1 : curr - 1
    );
  };

  const nextGalleryImage = () => {
    setSelectedGalleryIndex((curr) =>
      curr === productGalleries.length - 1 ? 0 : curr + 1
    );
  };

  useEffect(() => {
    if (selectedGalleryIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedGalleryIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedGalleryIndex((curr) =>
          curr === 0 ? productGalleries.length - 1 : curr - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedGalleryIndex((curr) =>
          curr === productGalleries.length - 1 ? 0 : curr + 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedGalleryIndex]);

  const techStack = [
    "React",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "REST APIs",
    "Multi-Tenant"
  ];

  const challengeSteps = [
    { title: "BUSINESS", desc: "Commercial & tax compliance requirements" },
    { title: "MULTIPLE TENANTS", desc: "Per-company tenant isolation" },
    { title: "USERS · ROLES · MODULES", desc: "Permissions & governance" },
    { title: "COMMERCIAL OPERATIONS", desc: "Sales, orders, and stock" },
    { title: "ELECTRONIC INVOICING", desc: "SUNAT integration & validation" }
  ];

  const engineeringCapabilities = [
    {
      kicker: "01",
      title: "MULTI-TENANCY",
      caption: "Tenant isolation",
      detail: "Multi-tenant architecture with logical partitioning and security across every data tier."
    },
    {
      kicker: "02",
      title: "AUTHENTICATION & ROLES",
      caption: "Permissions",
      detail: "Granular access control by user roles, branch locations, and system modules."
    },
    {
      kicker: "03",
      title: "COMMERCIAL MODULES",
      caption: "Orders & Billing",
      detail: "End-to-end workflow covering orders, quotations, payments, and invoices."
    },
    {
      kicker: "04",
      title: "ENTITLEMENTS",
      caption: "Plan-based limits",
      detail: "Tier-based operational limits, invoice issuance quotas, and multi-industry support."
    },
    {
      kicker: "05",
      title: "REST API",
      caption: "Backend architecture",
      detail: "Modular, decoupled backend architecture built with NestJS and scalable services."
    }
  ];

  const devFlowSteps = [
    "REQUIREMENTS",
    "ARCHITECTURE",
    "DATABASE",
    "API",
    "FRONTEND",
    "FEATURES",
    "PRODUCT"
  ];

  const productGalleries = [
    {
      title: "Dashboard & KPIs",
      desc: "Core metrics for invoicing, document status, and real-time transaction volume.",
      path: FACTUONLINE_IMAGES.dashboard
    },
    {
      title: "Electronic Invoicing",
      desc: "Issuance and management of invoices, receipts, and credit notes integrated with SUNAT and XML/CDR validation.",
      path: FACTUONLINE_IMAGES.invoicing
    },
    {
      title: "Commercial Management",
      desc: "Customer relationship management, sales orders, quotations, and centralized product catalog.",
      path: FACTUONLINE_IMAGES.commercial
    },
    {
      title: "Users & Settings",
      desc: "Company administration, role assignments, and tax credential configuration.",
      path: FACTUONLINE_IMAGES.users
    },
    {
      title: "Billing Service",
      desc: "Dedicated service for electronic invoice generation, digital signing, and SUNAT communication.",
      path: FACTUONLINE_IMAGES.billing
    },
    {
      title: "Additional Features",
      desc: "Complementary operational modules, commercial traceability, and control reporting.",
      path: FACTUONLINE_IMAGES.feature
    }
  ];

  return (
    <div className="cs-page">
      {/* 10 — TOP NAVIGATION */}
      <header className="cs-nav">
        <button type="button" className="cs-back-btn" onClick={onBack} aria-label="Back to portfolio">
          <ArrowLeft size={16} />
          <span>BACK TO PORTFOLIO</span>
        </button>

        <div className="cs-nav-center">
          <span className="cs-nav-project">FACTUONLINE</span>
          <span className="cs-nav-tag">CASE STUDY</span>
        </div>

        <a
          href="https://christian-97.github.io/ionline-software-landing/#"
          target="_blank"
          rel="noreferrer"
          className="cs-nav-external"
        >
          <img
            src={FACTUONLINE_IMAGES.logo}
            alt="I-On Line"
            className="cs-btn-logo"
            loading="lazy"
            decoding="async"
          />
          <span>VISIT FACTUONLINE</span>
          <ArrowUpRight size={15} />
        </a>
      </header>

      <main className="cs-main">
        {/* 01 — HERO */}
        <section className="cs-section cs-hero">
          <div className="cs-hero-header">
            <SectionLabel index="01">CASE STUDY / SAAS PRODUCT</SectionLabel>
            <h1 className="cs-title">FACTUONLINE</h1>
            <p className="cs-subtitle">
              Multi-Tenant SaaS · Electronic Invoicing & Commercial Management
            </p>
            <p className="cs-tagline">
              Multi-tenant SaaS platform for electronic invoicing and commercial management.
            </p>

            <div className="cs-tags">
              {techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div className="cs-hero-media">
            <ImagePlaceholder
              label="MAIN PRODUCT SCREENSHOT"
              sublabel="Main interface of the FactuOnLine platform"
              pathHint={FACTUONLINE_IMAGES.main}
              aspectRatio="16/9"
            />
          </div>
        </section>

        {/* 02 — THE CHALLENGE */}
        <section className="cs-section cs-challenge">
          <SectionLabel index="02">THE CHALLENGE</SectionLabel>
          <div className="cs-editorial-split">
            <div className="cs-editorial-copy">
              <h2>
                Agile commercial operations.<br />
                <span>Rigorous tax compliance.</span>
              </h2>
              <p>
                Micro and small businesses require seamless electronic invoicing without
                the technical complexity and prohibitive costs of enterprise ERPs.
                FactuOnLine solves this friction through a secure, reliable multi-tenant
                platform engineered for regulatory compliance in Peru.
              </p>
            </div>

            <div className="cs-flow-chain" aria-label="The Challenge flow">
              {challengeSteps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <div className="cs-flow-card">
                    <span className="cs-flow-num">0{index + 1}</span>
                    <strong className="cs-flow-title">{step.title}</strong>
                    <small className="cs-flow-desc">{step.desc}</small>
                  </div>
                  {index < challengeSteps.length - 1 && (
                    <div className="cs-flow-connector" aria-hidden="true">
                      <span>↓</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — ARCHITECTURE */}
        <section className="cs-section cs-architecture">
          <SectionLabel index="03">ARCHITECTURE</SectionLabel>
          <div className="cs-section-header">
            <h2>
              System Architecture.<br />
              <span>API-First, Multi-Tenant & Decoupled Services.</span>
            </h2>
            <p>
              The platform separates client applications from business logic through a REST API, enabling an extensible architecture for future consumers while maintaining tenant data isolation.
            </p>
          </div>

          <div className="cs-arch-media">
            <ArchitectureDiagram />
          </div>

          <div className="cs-tags cs-tags-center">
            {techStack.map((tech) => (
              <span key={`arch-${tech}`}>{tech}</span>
            ))}
          </div>
        </section>

        {/* 04 — PRODUCT */}
        <section className="cs-section cs-product">
          <SectionLabel index="04">PRODUCT WALKTHROUGH</SectionLabel>
          <div className="cs-section-header">
            <h2>
              Core modules.<br />
              <span>Business-oriented functionality.</span>
            </h2>
            <p>
              Key views designed to deliver operational clarity across inventory,
              sales, and daily invoicing.
            </p>
          </div>

          <div className="cs-gallery-grid">
            {productGalleries.map((item, idx) => (
              <article
                key={item.title}
                className="cs-gallery-item cs-gallery-item--interactive"
                onClick={() => setSelectedGalleryIndex(idx)}
              >
                <ImagePlaceholder
                  label={item.title.toUpperCase()}
                  sublabel={item.desc}
                  pathHint={item.path}
                  aspectRatio="16/10"
                  zoomHint={true}
                  onClick={() => setSelectedGalleryIndex(idx)}
                />
                <div className="cs-gallery-caption">
                  <span className="cs-gallery-num">0{idx + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 — ENGINEERING */}
        <section className="cs-section cs-engineering">
          <SectionLabel index="05">ENGINEERING</SectionLabel>
          <div className="cs-section-header">
            <h2>
              Technical foundations.<br />
              <span>Engineered for production.</span>
            </h2>
            <p>
              Core capabilities built to handle concurrency, precise permissions,
              and modular scalability.
            </p>
          </div>

          <div className="cs-capabilities-grid">
            {engineeringCapabilities.map((cap) => (
              <div key={cap.title} className="cs-capability-card">
                <span className="cs-cap-kicker">{cap.kicker}</span>
                <h3 className="cs-cap-title">{cap.title}</h3>
                <span className="cs-cap-sub">{cap.caption}</span>
                <p className="cs-cap-detail">{cap.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 06 — DEVELOPMENT FLOW */}
        <section className="cs-section cs-devflow">
          <SectionLabel index="06">DEVELOPMENT FLOW</SectionLabel>
          <div className="cs-section-header">
            <h2>
              From concept to product.<br />
              <span>Iterative engineering lifecycle.</span>
            </h2>
          </div>

          <div className="cs-devflow-track">
            {devFlowSteps.map((step, idx) => (
              <div key={step} className="cs-devflow-node">
                <div className="cs-devflow-step-box">
                  <span className="cs-devflow-idx">0{idx + 1}</span>
                  <strong>{step}</strong>
                </div>
                {idx < devFlowSteps.length - 1 && (
                  <div className="cs-devflow-arrow" aria-hidden="true">
                    <span>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 07 — RESULT */}
        <section className="cs-section cs-result">
          <SectionLabel index="07">RESULT</SectionLabel>
          <div className="cs-result-inner">
            <h2 className="cs-result-headline">
              FROM BUSINESS REQUIREMENTS<br />
              <span>TO A WORKING SAAS PLATFORM</span>
            </h2>

            <div className="cs-tags cs-tags-center">
              {techStack.map((tech) => (
                <span key={`res-${tech}`}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — I-ON LINE SOFTWARE PERÚ & 09 — LINK */}
        <section className="cs-section cs-meta-section">
          <SectionLabel index="08">ORGANIZATION & REFERENCE</SectionLabel>

          <div className="cs-meta-grid">
            {/* 08 — Logo placeholder */}
            <div className="cs-company-card">
              <span className="cs-meta-kicker">COMPANY CONTEXT</span>
              <div className="cs-logo-placeholder">
                <img
                  src={FACTUONLINE_IMAGES.logo}
                  alt="I-On Line Software Perú"
                  className="cs-company-logo-img"
                  style={{ display: "none", height: "32px", width: "auto", objectFit: "contain" }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                    const fallback = e.currentTarget.parentElement?.querySelector(".cs-logo-mark");
                    if (fallback) fallback.style.display = "none";
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="cs-logo-mark">I-ON</div>
                <div>
                  <strong>I-On Line Software Perú</strong>
                  <small>Software solutions and development company</small>
                </div>
              </div>
              <p className="cs-company-note">
                Project developed in association with I-On Line Software Perú for
                enterprise management and electronic invoicing.
              </p>
            </div>

            {/* 09 — MY ROLE & FACTUONLINE LINK */}
            <div className="cs-action-card">
              <span className="cs-meta-kicker">MY ROLE</span>
              <h3 className="cs-role-headline">Software Architecture · Backend · Frontend</h3>
              <p className="cs-role-desc">
                Direct contribution to the design and development of a multi-tenant SaaS platform, from architecture and database persistence to web feature implementation.
              </p>
              <a
                href="https://christian-97.github.io/ionline-software-landing/#"
                target="_blank"
                rel="noreferrer"
                className="primary cs-primary-btn"
              >
                <img
                  src={FACTUONLINE_IMAGES.logo}
                  alt="I-On Line"
                  className="cs-btn-logo"
                />
                <span>VISIT FACTUONLINE</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 10 — FOOTER WITH RETURN */}
      <footer className="cs-footer">
        <button type="button" className="cs-back-btn" onClick={onBack} aria-label="Back to portfolio">
          <ArrowLeft size={16} />
          <span>BACK TO PORTFOLIO</span>
        </button>

        <span className="cs-footer-meta">
          FACTUONLINE · CASE STUDY · CHRISTIAN GUTIERREZ
        </span>

        <a
          href="https://christian-97.github.io/ionline-software-landing/#"
          target="_blank"
          rel="noreferrer"
          className="cs-footer-link"
        >
          <img
            src={FACTUONLINE_IMAGES.logo}
            alt="I-On Line"
            className="cs-btn-logo cs-btn-logo--footer"
          />
          <span>VISIT FACTUONLINE</span>
          <ExternalLink size={14} />
        </a>
      </footer>

      {/* 11 — LIGHTBOX MODAL */}
      {selectedGalleryIndex !== null && (
        <div
          className="cs-lightbox-backdrop"
          onClick={() => setSelectedGalleryIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={productGalleries[selectedGalleryIndex]?.title}
        >
          <div className="cs-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <header className="cs-lightbox-header">
              <div className="cs-lightbox-title-wrap">
                <span className="cs-lightbox-num">
                  0{selectedGalleryIndex + 1} / 0{productGalleries.length}
                </span>
                <h3 className="cs-lightbox-title">
                  {productGalleries[selectedGalleryIndex]?.title}
                </h3>
              </div>
              <div className="cs-lightbox-actions">
                <button
                  type="button"
                  className="cs-lightbox-close"
                  onClick={() => setSelectedGalleryIndex(null)}
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="cs-lightbox-viewport">
              {productGalleries.length > 1 && (
                <button
                  type="button"
                  className="cs-lightbox-nav cs-lightbox-nav--prev"
                  onClick={prevGalleryImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <div className="cs-lightbox-img-wrap">
                <img
                  src={productGalleries[selectedGalleryIndex]?.path}
                  alt={productGalleries[selectedGalleryIndex]?.title}
                  className="cs-lightbox-img"
                />
              </div>

              {productGalleries.length > 1 && (
                <button
                  type="button"
                  className="cs-lightbox-nav cs-lightbox-nav--next"
                  onClick={nextGalleryImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            <footer className="cs-lightbox-footer">
              <p className="cs-lightbox-desc">
                {productGalleries[selectedGalleryIndex]?.desc}
              </p>
              <div className="cs-lightbox-hint">
                <span>ESC to close · ← → to navigate</span>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
