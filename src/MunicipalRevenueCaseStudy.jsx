import React, { useState } from "react";
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
// Physical directory: public/images/images municipal/
export const MUNICIPAL_IMAGES = {
  main: `${import.meta.env.BASE_URL}images/images municipal/municipal-main.png`,
  historical: `${import.meta.env.BASE_URL}images/images municipal/municipal-historical.png`,
  detailed: `${import.meta.env.BASE_URL}images/images municipal/municipal-detailed.png`,
};

// Component to render real Power BI captures with a styled technical placeholder fallback
function CaptureFrame({
  src,
  label,
  sublabel,
  pathHint,
  aspectRatio = "16/9",
  onExpand = null
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`mr-capture-frame ${isLoaded ? "mr-capture-frame--loaded" : ""} ${onExpand && isLoaded ? "mr-capture-frame--clickable" : ""}`}
      style={{ aspectRatio }}
      onClick={onExpand && isLoaded ? onExpand : undefined}
    >
      {onExpand && isLoaded && (
        <span className="cs-media-zoom-hint">
          <Maximize2 size={13} />
          <span>EXPAND</span>
        </span>
      )}

      {src && !hasError && (
        <img
          src={src}
          alt={label}
          className="mr-capture-img"
          style={{ display: isLoaded ? "block" : "none" }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {(!isLoaded || hasError) && (
        <div className="mr-capture-placeholder">
          <div className="mr-placeholder-icon mr-placeholder-icon--pbi">
            <PowerBiLogo size={32} />
          </div>
          <span className="mr-placeholder-badge mr-placeholder-badge--pbi">POWER BI REPORT VIEW</span>
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
    code: `Total Revenue = 
SUM( FACT_DETCAJA[Importe] )`,
    explanation: "Calculates the total monetary amount effectively collected in cash transactions within the active temporal and category filter context."
  },
  {
    id: "revenue-ytd",
    name: "Revenue YTD",
    code: `Revenue YTD = 
TOTALYTD(
    [Total Revenue],
    Dim_Calendario[Date]
)`,
    explanation: "Accumulates collected revenue from the first day of the fiscal year up to the selected cutoff date (Year-to-Date)."
  },
  {
    id: "revenue-sply",
    name: "Revenue SPLY",
    code: `Revenue SPLY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR( Dim_Calendario[Date] )
)`,
    explanation: "Returns revenue from the equivalent period of the previous fiscal year (Same Period Last Year) to enable clean period-over-period comparisons."
  },
  {
    id: "yoy-variance",
    name: "YoY Variance %",
    code: `YoY Variance % = 
VAR _Current = [Total Revenue]
VAR _Prior = [Revenue SPLY]
RETURN
    DIVIDE( _Current - _Prior, _Prior, 0 )`,
    explanation: "Computes year-over-year percentage growth or contraction, using DIVIDE to handle division by zero safely without errors."
  },
  {
    id: "budget-target",
    name: "Budget Target Completion %",
    code: `Budget Target Completion % = 
DIVIDE(
    [Total Revenue],
    [Meta Presupuestal],
    0
)`,
    explanation: "Evaluates the collection rate achieved relative to the projected institutional budget target for the corresponding fiscal period."
  }
];

export default function MunicipalRevenueCaseStudy({ onBack }) {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

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
          <span className="cs-nav-project">MUNICIPAL REVENUE DASHBOARD</span>
          <span className="cs-nav-tag">DATA ANALYTICS / BI</span>
        </div>
        <div className="mr-nav-status">
          <PowerBiLogo size={14} />
          <span>POWER BI &amp; SQL SERVER</span>
        </div>
      </nav>

      <div className="cs-main">
        {/* ── 1. HERO / INTRODUCTION ── */}
        <header className="cs-section cs-hero">
          <div className="cs-hero-header">
            <SectionLabel index="01">CASE STUDY</SectionLabel>
            <div className="mr-hero-pbi-badge">
              <PowerBiLogo size={14} />
              <span>MICROSOFT POWER BI · DATA ANALYTICS SOLUTION</span>
            </div>
            <h1 className="cs-title">
              Municipal Revenue<br />
              <span>Dashboard</span>
            </h1>
            <p className="cs-subtitle">Data Analytics &amp; Business Intelligence</p>
            <p className="cs-tagline">
              Interactive analysis and visualization of municipal revenue data to monitor fiscal evolution, evaluate comparative periods, and facilitate the interpretation of key management indicators.
            </p>
            <div className="cs-tags">
              <span className="tag-pbi">Power BI</span>
              <span>SQL Server</span>
              <span>Power Query / ETL</span>
              <span>DAX</span>
              <span>Data Modeling</span>
            </div>
          </div>

          {/* MAIN CAPTURE */}
          <div className="mr-showcase-block">
            <CaptureFrame
              src={MUNICIPAL_IMAGES.main}
              label="Municipal Revenue Dashboard — Executive Overview"
              sublabel="Executive panel developed in Power BI for consolidated municipal revenue monitoring."
              pathHint="public/images/images municipal/municipal-main.png"
              aspectRatio="16/9"
              onExpand={() => setLightboxImg({
                src: MUNICIPAL_IMAGES.main,
                title: "Municipal Revenue Dashboard — Executive Overview"
              })}
            />
            <p className="mr-showcase-caption">
              Executive dashboard developed in Power BI to monitor municipal revenue collection and its evolution across selected periods.
            </p>
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

            <div className="mr-process-node">
              <div className="mr-node-badge">02</div>
              <div className="mr-node-icon"><Layers size={18} /></div>
              <h4>Power Query / ETL</h4>
              <p>Cleaning, transformation and standardization of municipal tax data.</p>
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

        {/* ── 3. HISTORICAL REVENUE ANALYSIS ── */}
        <section className="cs-section">
          <SectionLabel index="03">HISTORICAL REVENUE ANALYSIS</SectionLabel>
          <div className="cs-section-header">
            <h2>Historical Revenue Analysis:<br /><span>Multi-Period Performance Tracking.</span></h2>
            <p>
              Dedicated analytical space to examine income behavior over time, evaluating collection stability and the fiscal calendar's seasonal patterns.
            </p>
          </div>

          <div className="mr-showcase-block">
            <CaptureFrame
              src={MUNICIPAL_IMAGES.historical}
              label="Historical Revenue Analysis — Multi-Period View"
              sublabel="Temporal trends and revenue performance across available fiscal periods."
              pathHint="public/images/images municipal/municipal-historical.png"
              aspectRatio="16/9"
              onExpand={() => setLightboxImg({
                src: MUNICIPAL_IMAGES.historical,
                title: "Historical Revenue Analysis — Multi-Period View"
              })}
            />
            <p className="mr-showcase-caption">
              Historical analysis of municipal revenue across available periods, allowing the identification of temporal variations and changes in collection performance.
            </p>
          </div>
        </section>

        {/* ── 4. DETAILED / COMPARATIVE ANALYSIS ── */}
        <section className="cs-section">
          <SectionLabel index="04">DETAILED REVENUE ANALYSIS</SectionLabel>
          <div className="cs-section-header">
            <h2>Detailed Revenue Analysis:<br /><span>Granular Breakdown &amp; Comparison.</span></h2>
            <p>
              Analytical view focused on disaggregating revenue streams by tax categories, monthly distribution, and period-over-period comparisons to assess structural dynamics.
            </p>
          </div>

          <div className="mr-showcase-block">
            <CaptureFrame
              src={MUNICIPAL_IMAGES.detailed}
              label="Detailed Revenue Analysis — Breakdown &amp; Comparison View"
              sublabel="Disaggregation by concept, monthly trends, and fiscal period comparisons."
              pathHint="public/images/images municipal/municipal-detailed.png"
              aspectRatio="16/9"
              onExpand={() => setLightboxImg({
                src: MUNICIPAL_IMAGES.detailed,
                title: "Detailed Revenue Analysis — Breakdown &amp; Comparison View"
              })}
            />
            <p className="mr-showcase-caption">
              Detailed view allowing deeper examination of revenue performance across distinct categories, concepts, or comparative temporal dimensions.
            </p>
          </div>
        </section>

        {/* ── 5. DAX & ANALYTICAL MEASURES ── */}
        <section className="cs-section">
          <SectionLabel index="05">DAX &amp; ANALYTICAL MEASURES</SectionLabel>
          <div className="cs-section-header">
            <h2>DAX &amp; Analytical Measures:<br /><span>Underlying Business Logic.</span></h2>
            <p>
              Explicit calculated measures developed to provide the report with dynamic analytical intelligence and filter context responsiveness.
            </p>
          </div>

          <div className="mr-dax-list">
            {DAX_MEASURES.map((measure) => (
              <article className="mr-dax-card" key={measure.id}>
                <div className="mr-dax-card-header">
                  <div className="mr-dax-card-title">
                    <span className="mr-dax-tech-badge">DAX</span>
                    <h3>{measure.name}</h3>
                  </div>
                  <button
                    className="mr-copy-btn"
                    onClick={() => handleCopyCode(measure.id, measure.code)}
                    title="Copy DAX formula"
                  >
                    {copiedId === measure.id ? <CheckCheck size={13} /> : <Copy size={13} />}
                    <span>{copiedId === measure.id ? "COPIED" : "COPY"}</span>
                  </button>
                </div>

                <div className="mr-dax-code-wrap">
                  <pre>
                    <code>{measure.code}</code>
                  </pre>
                </div>

                <div className="mr-dax-card-footer">
                  <span className="mr-dax-exp-label">Short explanation:</span>
                  <p>{measure.explanation}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── DATA GOVERNANCE & PRIVACY COMPLIANCE ── */}
        <section className="cs-section">
          <SectionLabel index="06">DATA PRIVACY &amp; COMPLIANCE</SectionLabel>
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
        <div className="cs-lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="cs-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="cs-lightbox-topbar">
              <span className="cs-lightbox-title">{lightboxImg.title}</span>
              <button
                className="cs-lightbox-close"
                onClick={() => setLightboxImg(null)}
                aria-label="Close full preview"
              >
                <X size={18} />
              </button>
            </div>
            <div className="cs-lightbox-media">
              <img src={lightboxImg.src} alt={lightboxImg.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
