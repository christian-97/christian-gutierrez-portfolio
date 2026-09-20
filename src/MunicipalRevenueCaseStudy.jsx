import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Layers,
  Sparkles,
  BarChart3,
  LineChart,
  Table,
  Check,
  ShieldCheck,
  Maximize2,
  X,
  Image as ImageIcon,
  Copy,
  CheckCheck
} from "lucide-react";
import PowerBiLogo from "./PowerBiLogo.jsx";

function SectionLabel({ index, children }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      {children}
    </div>
  );
}

// Catalog of image paths for Municipal Revenue Dashboard
// Physical directory: public/images/municipal/
export const MUNICIPAL_IMAGES = {
  main: `${import.meta.env.BASE_URL}images/municipal/municipal-main.webp`,
  revenue2026: `${import.meta.env.BASE_URL}images/municipal/municipal-2026.webp`,
  model: `${import.meta.env.BASE_URL}images/municipal/municipal-data-model.png`,
  ssis: `${import.meta.env.BASE_URL}images/municipal/municipal-ssis.png`,
};

// Component to render real Power BI captures with a styled technical placeholder fallback
function CaptureFrame({
  src,
  label,
  sublabel,
  pathHint,
  aspectRatio = "16/9",
  onExpand = null,
  placeholderBadge = "POWER BI REPORT VIEW",
  iconType = "pbi"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleKeyDown = (e) => {
    if (onExpand && isLoaded && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onExpand();
    }
  };

  return (
    <div
      className={`mr-capture-frame ${isLoaded ? "mr-capture-frame--loaded" : ""} ${onExpand && isLoaded ? "mr-capture-frame--clickable" : ""}`}
      style={{ aspectRatio }}
      onClick={onExpand && isLoaded ? onExpand : undefined}
      onKeyDown={onExpand && isLoaded ? handleKeyDown : undefined}
      role={onExpand && isLoaded ? "button" : undefined}
      tabIndex={onExpand && isLoaded ? 0 : undefined}
      aria-label={onExpand && isLoaded ? `Enlarge ${label}` : undefined}
    >
      {onExpand && isLoaded && (
        <span className="cs-media-zoom-hint">
          <Maximize2 size={13} />
          <span>EXPAND</span>
        </span>
      )}

      {/* Subtle skeleton shimmer while loading */}
      {!isLoaded && !hasError && (
        <div className="img-skeleton" aria-hidden="true" />
      )}

      {src && !hasError && (
        <img
          src={src}
          alt={label}
          className={`mr-capture-img ${isLoaded ? "mr-capture-img--loaded" : "mr-capture-img--loading"}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {hasError && (
        <div className="mr-capture-placeholder">
          <div className={`mr-placeholder-icon mr-placeholder-icon--${iconType}`}>
            {iconType === "ssis" ? <Layers size={32} /> : <PowerBiLogo size={32} />}
          </div>
          <span className={`mr-placeholder-badge mr-placeholder-badge--${iconType}`}>{placeholderBadge}</span>
          <h4 className="mr-placeholder-title">{label}</h4>
          <p className="mr-placeholder-sub">{sublabel}</p>
          <div className="mr-placeholder-path">
            <span>Ready for real dashboard capture:</span>
            <code>{pathHint}</code>
          </div>
        </div>
      )}
    </div>
  );
}

// Representative DAX Measures reflecting actual project modeling
const DAX_MEASURES = [
  {
    id: "total-revenue",
    name: "Total Revenue",
    category: "BASE AGGREGATION",
    concept: "SUM",
    visualRef: "KPI Card 'Recaudación total' y gráfico de barras plurianual",
    code: `Total Revenue = 
SUM( FACT_DETCAJA[Importe] )`,
    explanation: "Cálculo base de agregación monetaria. Suma el importe efectivo en caja evaluando dinámicamente el contexto de filtro temporal, distrito o rubro activo."
  },
  {
    id: "revenue-sply",
    name: "Revenue SPLY",
    category: "TIME INTELLIGENCE",
    concept: "CALCULATE · SAMEPERIODLASTYEAR",
    visualRef: "Métricas comparativas vs período anterior y tabla de evolución",
    code: `Revenue SPLY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR( DIM_FECHA[dtFecCaja] )
)`,
    explanation: "Desplaza el contexto de evaluación exactamente un año atrás sobre la dimensión calendario DIM_FECHA, garantizando comparativas homogéneas a igual corte de mes."
  },
  {
    id: "yoy-variance",
    name: "YoY Variance %",
    category: "SAFE RATIO",
    concept: "VAR · DIVIDE",
    visualRef: "Indicadores de variación '↗ 73.85%' y '↘ -2.50% vs 2025'",
    code: `YoY Variance % = 
VAR _Current = [Total Revenue]
VAR _Prior   = [Revenue SPLY]
RETURN
    DIVIDE( _Current - _Prior, _Prior, 0 )`,
    explanation: "Evalúa el porcentaje de crecimiento o contracción interanual. Utiliza variables locales para evitar recalcular medidas y DIVIDE para manejar con seguridad divisiones entre cero."
  },
  {
    id: "revenue-share",
    name: "% Participación",
    category: "CONTEXT OVERRIDE",
    concept: "CALCULATE · ALLSELECTED",
    visualRef: "Gráfico de dona 'Participación por Periodo' (100% acumulado)",
    code: `% Participación = 
VAR _RecaudacionFila  = [Total Revenue]
VAR _RecaudacionTotal = 
    CALCULATE(
        [Total Revenue],
        ALLSELECTED( FACT_DETCAJA )
    )
RETURN
    DIVIDE( _RecaudacionFila, _RecaudacionTotal, 0 )`,
    explanation: "Calcula el peso relativo de cada período o categoría sobre el total visible, usando ALLSELECTED para ignorar los filtros de fila del visual sin perder los segmentadores de la página."
  }
];

export default function MunicipalRevenueCaseStudy({ onBack }) {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeDaxId, setActiveDaxId] = useState("total-revenue");

  const activeDaxMeasure =
    DAX_MEASURES.find((m) => m.id === activeDaxId) || DAX_MEASURES[0];

  useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxImg(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxImg]);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="cs-page">
      {/* ── TOP NAVIGATION ── */}
      <nav className="cs-nav">
        <button className="cs-back-btn" onClick={onBack} aria-label="Return to portfolio">
          <ArrowLeft size={16} />
          <span>BACK TO PORTFOLIO</span>
        </button>
        <div className="cs-nav-center">
          <span className="cs-nav-project">MUNICIPAL REVENUE ANALYTICS</span>
          <span className="cs-nav-tag">DATA ANALYTICS / BI</span>
        </div>
        <div className="mr-nav-status">
          <PowerBiLogo size={14} />
          <span>POWER BI, SSIS &amp; SQL SERVER</span>
        </div>
      </nav>

      <div className="cs-main">
        {/* ── 01 — OVERVIEW ── */}
        <header className="cs-section cs-hero">
          <div className="cs-hero-header">
            <SectionLabel index="01">OVERVIEW</SectionLabel>
            <div className="mr-hero-pbi-badge">
              <PowerBiLogo size={14} />
              <span>MICROSOFT POWER BI · DATA ANALYTICS SOLUTION</span>
            </div>
            <h1 className="cs-title">
              Municipal Revenue<br />
              <span>Analytics</span>
            </h1>
            <p className="cs-subtitle">Data Analytics &amp; Business Intelligence</p>
            <p className="cs-tagline">
              Personal Business Intelligence project by Christian Gutierrez. Integrates historical municipal revenue data (2007–2026) using SQL Server and SSIS into a dimensional model powering focused executive Power BI dashboards.
            </p>
            <div className="cs-tags">
              <span className="tag-pbi">Power BI</span>
              <span>SQL Server</span>
              <span className="tag-ssis">SSIS</span>
              <span>Power Query / ETL</span>
              <span>DAX</span>
              <span>Data Modeling</span>
            </div>
          </div>

          {/* PROJECT SPECS GRID */}
          <div className="mr-specs-grid">
            <div className="mr-spec-card">
              <span className="mr-spec-label">PROJECT TYPE</span>
              <strong className="mr-spec-val">Personal BI Project</strong>
              <span className="mr-spec-sub">Public sector fiscal data analytics</span>
            </div>
            <div className="mr-spec-card">
              <span className="mr-spec-label">DATA STACK</span>
              <strong className="mr-spec-val">SQL Server · SSIS · Power BI</strong>
              <span className="mr-spec-sub">End-to-end integration &amp; modeling</span>
            </div>
            <div className="mr-spec-card">
              <span className="mr-spec-label">HISTORICAL HORIZON</span>
              <strong className="mr-spec-val">2007 – 2026</strong>
              <span className="mr-spec-sub">20 years of municipal revenue records</span>
            </div>
            <div className="mr-spec-card">
              <span className="mr-spec-label">ANALYTICAL OUTPUT</span>
              <strong className="mr-spec-val">2 Focused Dashboards</strong>
              <span className="mr-spec-sub">Executive / Historical &amp; 2026 Analysis</span>
            </div>
          </div>
        </header>

        {/* ── 2. DATA & ANALYTICS PROCESS ── */}
        <section className="cs-section">
          <SectionLabel index="02">DATA &amp; ANALYTICS PROCESS</SectionLabel>
          <div className="cs-section-header">
            <h2>Data Pipeline &amp; Workflow:<br /><span>From Raw Storage to Decisions.</span></h2>
            <p>
              A structured data transformation and modeling process ensuring traceability, referential integrity, and consistency prior to report rendering.
            </p>
          </div>

          <div className="mr-process-chain">
            <div className="mr-process-node">
              <div className="mr-node-badge">01</div>
              <div className="mr-node-icon"><Database size={18} /></div>
              <h4>SQL Server</h4>
              <p>Data extraction and querying from municipal databases.</p>
            </div>

            <div className="mr-process-sep">→</div>

            <div className="mr-process-node mr-process-node--ssis">
              <div className="mr-node-badge">02</div>
              <div className="mr-node-icon"><Layers size={18} /></div>
              <h4>SSIS / ETL</h4>
              <p>Data integration and transformation layer used to prepare municipal data for analytical reporting.</p>
            </div>

            <div className="mr-process-sep">→</div>

            <div className="mr-process-node">
              <div className="mr-node-badge">03</div>
              <div className="mr-node-icon"><Table size={18} /></div>
              <h4>Data Model</h4>
              <p>Structured analytical model prepared for reporting.</p>
            </div>

            <div className="mr-process-sep">→</div>

            <div className="mr-process-node">
              <div className="mr-node-badge">04</div>
              <div className="mr-node-icon"><Sparkles size={18} /></div>
              <h4>DAX Formulas</h4>
              <p>Creation of analytical measures and dynamic KPIs.</p>
            </div>

            <div className="mr-process-sep">→</div>

            <div className="mr-process-node mr-process-node--pbi">
              <div className="mr-node-badge">05</div>
              <div className="mr-node-icon"><PowerBiLogo size={18} /></div>
              <h4>Power BI</h4>
              <p>Interactive visualization and executive reporting.</p>
            </div>

            <div className="mr-process-sep">→</div>

            <div className="mr-process-node mr-process-node--highlight">
              <div className="mr-node-badge">06</div>
              <div className="mr-node-icon"><LineChart size={18} /></div>
              <h4>Analysis</h4>
              <p>Interpretation of trends, variances, and performance indicators.</p>
            </div>
          </div>
        </section>

        {/* ── 3. SSIS / ETL WORKFLOW ── */}
        <section className="cs-section">
          <SectionLabel index="03">SSIS / ETL</SectionLabel>
          <div className="cs-section-header">
            <h2>SSIS / ETL:<br /><span>Data Integration &amp; Transformation Workflow.</span></h2>
            <p className="cs-section-sub">
              Data integration and transformation workflow.
            </p>
            <p>
              SSIS is used as part of the ETL layer to integrate and prepare municipal data for analytical reporting.
            </p>
          </div>

          <div className="mr-showcase-block">
            <CaptureFrame
              src={MUNICIPAL_IMAGES.ssis}
              label="SSIS / ETL WORKFLOW"
              sublabel="Control Flow / Data Flow"
              pathHint="public/images/municipal/municipal-ssis.png"
              aspectRatio="16/9"
              placeholderBadge="SSIS / ETL WORKFLOW"
              iconType="ssis"
              onExpand={() => setLightboxImg({
                src: MUNICIPAL_IMAGES.ssis,
                title: "SSIS / ETL Package — Control Flow / Data Flow",
                desc: "Visual evidence of SQL Server Integration Services (SSIS) packages used for data extraction and transformation."
              })}
            />
            <p className="mr-showcase-caption">
              Visual evidence of SQL Server Integration Services (SSIS) packages used for data extraction and transformation.
            </p>
          </div>
        </section>

        {/* ── 4. DATA MODEL ── */}
        <section className="cs-section">
          <SectionLabel index="04">DATA MODEL</SectionLabel>
          <div className="cs-section-header">
            <h2>Data Model:<br /><span>Reusable Dimensional Architecture.</span></h2>
            <p className="cs-section-sub">
              Reusable dimensional model powering multiple municipal analytics dashboards.
            </p>
            <p>
              This dimensional model serves as the analytical foundation for multiple municipal reporting solutions. A shared semantic model allows different reports to use consistent dimensions, DAX measures and business logic instead of building independent datasets for each dashboard.
            </p>
          </div>

          <div className="mr-model-grid">
            {/* LARGE MODEL CAPTURE */}
            <div className="mr-showcase-block mr-model-showcase">
              <CaptureFrame
                src={MUNICIPAL_IMAGES.model}
                label="Municipal Revenue — Dimensional Data Model"
                sublabel="Star / Constellation Schema designed for municipal fiscal data analytics."
                pathHint="public/images/municipal/municipal-data-model.png"
                aspectRatio="16/9"
                onExpand={() => setLightboxImg({
                  src: MUNICIPAL_IMAGES.model,
                  title: "Municipal Revenue — Dimensional Data Model (Star / Constellation Schema)",
                  desc: "Dimensional model architecture connecting fiscal transaction data with shared municipal reference dimensions."
                })}
              />
              <p className="mr-showcase-caption">
                Dimensional model architecture connecting fiscal transaction data with shared municipal reference dimensions.
              </p>
            </div>

            {/* TECHNICAL SPECS CARD */}
            <div className="mr-model-tech-card">
              <div className="mr-tech-card-section">
                <span className="mr-tech-card-label">ARCHITECTURE</span>
                <div className="mr-arch-flow">
                  <span>SQL Server</span>
                  <span className="mr-arch-arr">→</span>
                  <span>SSIS / ETL</span>
                  <span className="mr-arch-arr">→</span>
                  <span>Data Model</span>
                  <span className="mr-arch-arr">→</span>
                  <span>DAX</span>
                  <span className="mr-arch-arr">→</span>
                  <span>Power BI</span>
                  <span className="mr-arch-arr">→</span>
                  <span>Analysis</span>
                </div>
                <small className="mr-tech-note">
                  *Power Query is also utilized for in-report data transformation and preparation within the Power BI environment.
                </small>
              </div>

              <div className="mr-tech-card-divider" />

              <div className="mr-tech-card-section">
                <span className="mr-tech-card-label">MODEL DESIGN</span>
                <ul className="mr-tech-bullet-list">
                  <li>Shared dimensions</li>
                  <li>Fact-based analytical model</li>
                  <li>Reusable relationships</li>
                  <li>Consistent business logic</li>
                  <li>Multiple Power BI reports using the same model</li>
                </ul>
              </div>

              <div className="mr-tech-card-divider" />

              <div className="mr-tech-card-section">
                <span className="mr-tech-card-label">PURPOSE</span>
                <ul className="mr-tech-bullet-list">
                  <li>Centralize analytical logic</li>
                  <li>Reuse the same semantic model across reports</li>
                  <li>Maintain consistent KPIs and calculations</li>
                  <li>Support different municipal reporting needs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SHARED DATA MODEL CONSUMERS FLOW */}
          <div className="mr-shared-model-block">
            <div className="mr-shared-model-header">
              <span className="mr-shared-badge">SEMANTIC MODEL ARCHITECTURE</span>
              <h3>Shared Data Model &amp; BI Ecosystem</h3>
              <p>One centralized semantic data model powers multiple operational and executive reporting solutions.</p>
            </div>

            <div className="mr-shared-diagram">
              <div className="mr-shared-source-node">
                <Database size={16} />
                <strong>SHARED DATA MODEL</strong>
              </div>

              <div className="mr-shared-arrows">
                <svg viewBox="0 0 300 24" fill="none" className="mr-shared-arrows-svg">
                  <path d="M150 0 V12 M150 12 H75 V24 M150 12 H225 V24" stroke="var(--line-bright)" strokeWidth="1.2" strokeDasharray="3 2" />
                </svg>
              </div>

              <div className="mr-shared-targets" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                <div className="mr-shared-target mr-shared-target--active">
                  <span className="mr-target-dot" />
                  <strong>Executive / Historical Analysis</strong>
                  <small>Active Executive Report</small>
                </div>
                <div className="mr-shared-target">
                  <span className="mr-target-dot" style={{ background: "var(--blue)" }} />
                  <strong>2026 Revenue Analysis</strong>
                  <small>Fiscal Period In-Depth (In Development)</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 — EXECUTIVE / HISTORICAL REVENUE ANALYSIS ── */}
        <section className="cs-section">
          <SectionLabel index="05">EXECUTIVE / HISTORICAL REVENUE ANALYSIS</SectionLabel>
          <div className="cs-section-header">
            <h2>Executive &amp; Historical Revenue Analysis:<br /><span>Long-Term Performance Tracking.</span></h2>
            <p>
              Executive dashboard developed in Power BI consolidating municipal revenue collection across multi-year periods (2007–2026), annual trend tracking, and period growth comparisons.
            </p>
          </div>

          <div className="mr-showcase-block">
            <CaptureFrame
              src={MUNICIPAL_IMAGES.main}
              label="Municipal Revenue Dashboard — Executive & Historical Analysis"
              sublabel="Consolidated executive view covering multi-year collection periods (2007–2026) and annual performance tracking."
              pathHint="public/images/municipal/municipal-main.webp"
              aspectRatio="16/9"
              onExpand={() => setLightboxImg({
                src: MUNICIPAL_IMAGES.main,
                title: "Municipal Revenue Dashboard — Executive & Historical Analysis",
                desc: "Executive dashboard developed in Power BI consolidating municipal revenue collection across multi-year periods (2007–2026), annual trend tracking, and period growth comparisons."
              })}
            />
            <p className="mr-showcase-caption">
              Executive dashboard developed in Power BI to monitor municipal revenue collection and its evolution across multi-year periods (2007–2026).
            </p>
          </div>
        </section>

        {/* ── 06 — 2026 REVENUE ANALYSIS ── */}
        <section className="cs-section">
          <SectionLabel index="06">2026 REVENUE ANALYSIS</SectionLabel>
          <div className="cs-section-header">
            <h2>2026 Revenue Analysis:<br /><span>Fiscal Period In-Depth Tracking.</span></h2>
            <p>
              Dedicated analytical report focused on the 2026 fiscal year, examining collection dynamics, period progress, and monthly tracking.
            </p>
          </div>

          <div className="mr-showcase-block">
            <CaptureFrame
              src={MUNICIPAL_IMAGES.revenue2026}
              label="2026 Revenue Analysis Dashboard"
              sublabel="Detailed report view focused on fiscal year 2026 collection performance and period tracking."
              pathHint="public/images/municipal/municipal-2026.webp"
              aspectRatio="16/9"
              placeholderBadge="DASHBOARD IN DEVELOPMENT"
              iconType="pbi"
              onExpand={() => setLightboxImg({
                src: MUNICIPAL_IMAGES.revenue2026,
                title: "2026 Revenue Analysis Dashboard",
                desc: "Detailed analytical report focused on fiscal year 2026 collection performance, monthly progress, and period comparisons."
              })}
            />
            <p className="mr-showcase-caption">
              Space reserved for the 2026 revenue analysis dashboard, covering detailed collection performance and period tracking.
            </p>
          </div>
        </section>

        {/* ── 07 — DAX & ANALYTICAL LOGIC ── */}
        <section className="cs-section">
          <SectionLabel index="07">DAX &amp; ANALYTICAL LOGIC</SectionLabel>
          <div className="cs-section-header">
            <h2>DAX &amp; Analytical Logic:<br /><span>Semantic Layer &amp; Evaluation Context.</span></h2>
            <p>
              Selection of core DAX patterns engineered in Power BI Desktop to handle aggregations, time intelligence, relative variances, and filter context overrides.
            </p>
          </div>

          <div className="mr-dax-workspace">
            {/* WORKSPACE TOP CONTROL BAR */}
            <div className="mr-dax-topbar">
              <div className="mr-dax-window-controls">
                <span className="mr-dax-dot mr-dax-dot--red" />
                <span className="mr-dax-dot mr-dax-dot--yellow" />
                <span className="mr-dax-dot mr-dax-dot--green" />
                <span className="mr-dax-file-tab">
                  <code>FACT_DETCAJA.dax</code>
                  <span className="mr-dax-file-badge">POWER BI SEMANTIC MODEL</span>
                </span>
              </div>
              <div className="mr-dax-topbar-meta">
                <span className="mr-dax-meta-tag">4 PATTERNS</span>
                <span className="mr-dax-meta-tag">DAX FORMULA BAR</span>
              </div>
            </div>

            {/* MEASURE TABS NAVIGATION */}
            <div className="mr-dax-tab-strip" role="tablist" aria-label="DAX Measures">
              {DAX_MEASURES.map((measure, index) => {
                const isActive = measure.id === activeDaxId;
                return (
                  <button
                    key={measure.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`mr-dax-tab-btn ${isActive ? "mr-dax-tab-btn--active" : ""}`}
                    onClick={() => setActiveDaxId(measure.id)}
                  >
                    <span className="mr-dax-tab-num">0{index + 1}</span>
                    <span className="mr-dax-tab-name">[{measure.name}]</span>
                    <span className="mr-dax-tab-pill">{measure.category}</span>
                  </button>
                );
              })}
            </div>

            {/* ACTIVE MEASURE CODE EDITOR PANEL */}
            <div className="mr-dax-editor-panel">
              <div className="mr-dax-editor-header">
                <div className="mr-dax-editor-title">
                  <span className="mr-dax-fx-icon">fx</span>
                  <strong>{activeDaxMeasure.name}</strong>
                  <span className="mr-dax-target-table">Tabla: <code>FACT_DETCAJA</code></span>
                </div>
                <div className="mr-dax-editor-actions">
                  <span className="mr-dax-concept-chip">{activeDaxMeasure.concept}</span>
                  <button
                    type="button"
                    className="mr-copy-btn"
                    onClick={() => handleCopyCode(activeDaxMeasure.id, activeDaxMeasure.code)}
                    title="Copy DAX formula"
                  >
                    {copiedId === activeDaxMeasure.id ? <CheckCheck size={13} /> : <Copy size={13} />}
                    <span>{copiedId === activeDaxMeasure.id ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
              </div>

              <div className="mr-dax-code-viewport">
                <pre>
                  <code>{activeDaxMeasure.code}</code>
                </pre>
              </div>

              {/* TECHNICAL FOOTER */}
              <div className="mr-dax-editor-footer">
                <div className="mr-dax-insight-row">
                  <div className="mr-dax-insight-item">
                    <span className="mr-dax-insight-label">LÓGICA ANALÍTICA</span>
                    <p>{activeDaxMeasure.explanation}</p>
                  </div>
                  <div className="mr-dax-insight-item mr-dax-insight-item--visual">
                    <span className="mr-dax-insight-label">VISUAL EN EL DASHBOARD</span>
                    <p>{activeDaxMeasure.visualRef}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. DATA PRIVACY & COMPLIANCE ── */}
        <section className="cs-section">
          <SectionLabel index="08">DATA PRIVACY &amp; COMPLIANCE</SectionLabel>
          <div className="mr-privacy-card">
            <div className="mr-privacy-header">
              <ShieldCheck size={26} className="mr-shield-icon" />
              <div>
                <h3>Commitment to Data Governance &amp; Privacy Compliance</h3>
                <span className="mr-privacy-status">100% AGGREGATED &amp; ANONYMIZED DATA</span>
              </div>
            </div>
            <p>
              This project exclusively presents aggregated analytical information at the level of concepts, periods, and fiscal management totals. No personal taxpayer data, national identity numbers (DNI/RUC), addresses, file numbers, or individual transactions are displayed or processed.
            </p>
            <div className="mr-privacy-checks">
              <div className="mr-check-item">
                <Check size={14} />
                <span>100% anonymized and aggregated data for analytical purposes.</span>
              </div>
              <div className="mr-check-item">
                <Check size={14} />
                <span>No exposure of individual tax records or sensitive personal information.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER / RETURN TO PORTFOLIO ── */}
        <footer className="cs-section cs-footer">
          <div className="cs-footer-inner">
            <div>
              <span className="cs-footer-kicker">DATA ANALYST / BI DEVELOPER</span>
              <h2>Ready to explore<br /><span>more data projects?</span></h2>
              <p>
                Return to the main portfolio to explore additional data analytics cases, engineering pipelines, and software solutions.
              </p>
            </div>
            <div className="cs-footer-actions">
              <button className="primary" onClick={onBack}>
                <ArrowLeft size={16} />
                <span>BACK TO PORTFOLIO</span>
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* ── LIGHTBOX MODAL FOR REAL CAPTURES ── */}
      {lightboxImg && (
        <div
          className="cs-lightbox-backdrop"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.title}
        >
          <div className="cs-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <header className="cs-lightbox-header">
              <div className="cs-lightbox-title-wrap">
                <span className="cs-lightbox-num">POWER BI</span>
                <h3 className="cs-lightbox-title">{lightboxImg.title}</h3>
              </div>
              <div className="cs-lightbox-actions">
                <button
                  type="button"
                  className="cs-lightbox-close"
                  onClick={() => setLightboxImg(null)}
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div
              className="cs-lightbox-viewport"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setLightboxImg(null);
                }
              }}
            >
              <div
                className="cs-lightbox-img-wrap"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setLightboxImg(null);
                  }
                }}
              >
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  className="cs-lightbox-img"
                />
              </div>
            </div>

            <footer className="cs-lightbox-footer">
              <p className="cs-lightbox-desc">{lightboxImg.desc || ""}</p>
              <div className="cs-lightbox-hint">
                <span>ESC to close</span>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
