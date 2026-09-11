import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Database, Github, Linkedin, Mail, Menu, MoveUpRight, Play, X } from "lucide-react";
import "./styles.css";

const toolkit = [
  { name: "SQL", label: "QUERY", steps: ["QUERY", "CLEAN", "TRANSFORM", "ANALYZE"], color: "mint" },
  { name: "Power BI", label: "INSIGHT", steps: ["DATA", "MODEL", "DAX", "VISUALIZE"], color: "blue" },
  { name: "Python", label: "EVOLVE", steps: ["DATA", "PANDAS", "ANALYSIS", "MODEL"], color: "yellow" },
  { name: "Excel", label: "REPORT", steps: ["IMPORT", "VALIDATE", "PIVOT", "REPORT"], color: "mint" },
  { name: "DAX", label: "MEASURE", steps: ["FILTER", "CALCULATE", "DEFINE", "EXPLAIN"], color: "blue" },
  { name: "SQL Server", label: "DATABASE", steps: ["STORE", "JOIN", "INDEX", "SERVE"], color: "yellow" },
  { name: "Power Query", label: "PREPARE", steps: ["SOURCE", "CLEAN", "MERGE", "LOAD"], color: "mint" },
  { name: "PostgreSQL", label: "BUILD", steps: ["SCHEMA", "QUERY", "SECURE", "SCALE"], color: "blue" }
];

const pipeline = [
  ["SOURCE", "Archivos CSV, Excel y bases de datos."], ["EXTRACT", "Obtención de información desde bases de datos y archivos."], ["TRANSFORM", "Limpieza, normalización y preparación de datos."], ["VALIDATE", "Revisión de calidad, consistencia y valores faltantes."], ["MODEL", "Construcción de modelos para análisis."], ["VISUALIZE", "Conversión de datos en información comprensible."], ["INSIGHT", "Una lectura clara para decidir mejor."]
];

const projects = [
  { number: "01", title: "Municipal Data Analytics", type: "DATA ANALYTICS", description: "Análisis y visualización de información tributaria y financiera para apoyar el seguimiento de recaudación e indicadores de gestión.", tags: ["SQL Server", "Power BI", "Excel", "ETL"], chart: "municipal" },
  { number: "02", title: "FactuOnLine", type: "SOFTWARE / DATA", description: "Plataforma SaaS multiempresa para facturación electrónica y gestión comercial, desarrollada con arquitectura Multi-Tenant.", tags: ["NestJS", "React", "PostgreSQL", "REST API"], chart: "system" },
  { number: "03", title: "Inventory Analytics", type: "OPERATIONS → INSIGHT", description: "Análisis histórico de inventarios, control de stock y mejora de reportes para optimizar procesos y decisiones operativas.", tags: ["Excel", "Data Analysis", "Inventory", "Reporting"], chart: "inventory" }
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function SectionLabel({ index, children }) { return <div className="section-label"><span>{index}</span>{children}</div>; }

function DataNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas.parentElement;
    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = { width: 0, height: 0, dpr: 1, count: 0, nodes: null, edges: null, positions: null, elapsed: 0, lastTime: 0, frame: 0, running: false, visible: false, measured: false };

    const random = (seed) => {
      let value = seed;
      return () => {
        value = (value * 1664525 + 1013904223) >>> 0;
        return value / 4294967296;
      };
    };

    const createNetwork = (count) => {
      const next = random(42 + count);
      const nodes = new Float32Array(count * 7);
      for (let index = 0; index < count; index += 1) {
        const offset = index * 7;
        nodes[offset] = 0.04 + next() * 0.92;
        nodes[offset + 1] = 0.08 + next() * 0.84;
        nodes[offset + 2] = next() * Math.PI * 2;
        nodes[offset + 3] = 0.004 + next() * 0.012;
        nodes[offset + 4] = 0.004 + next() * 0.014;
        nodes[offset + 5] = 0.18 + next() * 0.28;
        nodes[offset + 6] = index % 11 === 3 || index % 13 === 0 ? 1 : 0;
      }
      const edgeCount = Math.floor(count * 0.9);
      const edges = new Uint16Array(edgeCount * 2);
      for (let index = 0; index < edgeCount; index += 1) {
        const from = index % count;
        const to = index < count ? (index + 1) % count : (index * 3 + 4) % count;
        edges[index * 2] = from;
        edges[index * 2 + 1] = to;
      }
      state.nodes = nodes;
      state.edges = edges;
      state.positions = new Float32Array(count * 2);
      state.count = count;
    };

    const nodeCount = () => window.innerWidth <= 650 ? 11 : window.innerWidth <= 950 ? 20 : 30;

    const render = () => {
      const { width, height, nodes, edges, positions, count } = state;
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < count; index += 1) {
        const offset = index * 7;
        positions[index * 2] = (nodes[offset] + Math.sin(state.elapsed * nodes[offset + 5] + nodes[offset + 2]) * nodes[offset + 3]) * width;
        positions[index * 2 + 1] = (nodes[offset + 1] + Math.cos(state.elapsed * nodes[offset + 5] * 0.82 + nodes[offset + 2]) * nodes[offset + 4]) * height;
      }
      context.lineWidth = 0.55;
      context.strokeStyle = "rgba(99, 179, 237, 0.22)";
      context.setLineDash([2, 3]);
      context.beginPath();
      for (let index = 0; index < edges.length; index += 2) {
        const from = edges[index] * 2;
        const to = edges[index + 1] * 2;
        context.moveTo(positions[from], positions[from + 1]);
        context.lineTo(positions[to], positions[to + 1]);
      }
      context.stroke();
      context.setLineDash([]);
      for (let index = 0; index < count; index += 1) {
        const position = index * 2;
        const hot = nodes[index * 7 + 6] === 1;
        context.beginPath();
        context.fillStyle = hot ? "rgba(101, 214, 161, 0.9)" : index % 3 === 0 ? "rgba(99, 179, 237, 0.72)" : "rgba(167, 177, 184, 0.52)";
        if (hot) context.shadowBlur = 7;
        if (hot) context.shadowColor = "rgba(101, 214, 161, 0.7)";
        context.arc(positions[position], positions[position + 1], hot ? 2.1 : 1.15, 0, Math.PI * 2);
        context.fill();
        if (hot) context.shadowBlur = 0;
      }
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (state.measured && nextWidth === state.width && nextHeight === state.height && nextDpr === state.dpr) return;
      state.width = nextWidth;
      state.height = nextHeight;
      state.dpr = nextDpr;
      canvas.width = Math.max(1, Math.round(nextWidth * nextDpr));
      canvas.height = Math.max(1, Math.round(nextHeight * nextDpr));
      context.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
      if (state.count !== nodeCount()) createNetwork(nodeCount());
      state.measured = true;
      render();
    };

    const loop = (time) => {
      if (!state.running) return;
      if (state.lastTime && time - state.lastTime < 16.67) {
        state.frame = window.requestAnimationFrame(loop);
        return;
      }
      const delta = state.lastTime ? Math.min((time - state.lastTime) / 1000, 0.05) : 0;
      state.lastTime = time;
      state.elapsed += delta;
      render();
      state.frame = window.requestAnimationFrame(loop);
    };
    const start = () => {
      if (state.running || !state.visible || document.hidden || reducedMotion.matches) return;
      state.running = true;
      state.lastTime = 0;
      state.frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      state.running = false;
      window.cancelAnimationFrame(state.frame);
      state.frame = 0;
    };
    const onVisibilityChange = () => document.hidden ? stop() : start();
    const onReducedMotionChange = () => reducedMotion.matches ? stop() : start();
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      state.visible ? start() : stop();
    }, { threshold: 0.01 });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    visibilityObserver.observe(wrapper);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener?.("change", onReducedMotionChange);
    resize();
    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener?.("change", onReducedMotionChange);
    };
  }, []);

  return <div className="network-wrap" aria-label="Visualización abstracta del flujo de datos"><div className="network-top"><span><i className="live-dot"/> LIVE DATA</span><span>01 — 07</span></div><canvas ref={canvasRef} className="network" aria-hidden="true"/><div className="network-caption"><span>recaudacion_2026.csv</span><strong>DATA <b>→</b> PROCESS <b>→</b> INSIGHT</strong></div></div>;
}

function ToolkitCard({ item }) {
  const [active, setActive] = useState(false);
  return <button className={`tool-card ${active ? "tool-active" : ""}`} onClick={() => setActive(!active)} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}><span className={`tool-icon ${item.color}`}><Database size={18}/></span><span className="tool-name">{item.name}</span><span className="tool-label">{active ? item.label : "OPEN"} <ArrowUpRight size={14}/></span><span className="tool-flow">{item.steps.map((step, index) => <React.Fragment key={step}><em>{step}</em>{index < item.steps.length - 1 && <b>→</b>}</React.Fragment>)}</span></button>;
}

function DataLab() {
  const [running, setRunning] = useState(false);
  return <div className="lab-shell"><div className="lab-bar"><span><i className="live-dot"/> DATA LAB / DEMO</span><span>recaudacion_2026.csv <span className="lab-dots">•••</span></span></div><div className="lab-body"><div className="dataset-summary"><span className="lab-kicker">DATASET</span><h3>recaudacion_2026.csv</h3><p>Municipal revenue exploration</p><button className={`run-button ${running ? "running" : ""}`} onClick={() => setRunning(!running)}><Play size={14} fill="currentColor"/>{running ? "PROCESSING..." : "RUN ANALYSIS"}</button></div><div className="data-metrics"><div><span>ROWS</span><strong className={running ? "counting" : ""}>10,482</strong></div><div><span>COLUMNS</span><strong>18</strong></div><div><span>NULL VALUES</span><strong className="yellow-text">42</strong></div><div><span>PROCESSING TIME</span><strong className="mint-text">0.84s</strong></div></div><div className="data-bars"><span>DATA TYPES</span><div className="data-bar-row"><i style={{width:"82%"}}/><b>TEXT 42%</b></div><div className="data-bar-row"><i style={{width:"58%"}}/><b>INTEGER 31%</b></div><div className="data-bar-row"><i style={{width:"36%"}}/><b>DATE 18%</b></div><div className="data-bar-row"><i style={{width:"18%"}}/><b>BOOLEAN 09%</b></div></div></div><div className="lab-terminal"><span>&gt; SELECT * FROM insights;</span><span className={running ? "terminal-active" : ""}>{running ? "&gt; transforming_data... model_ready ✓" : ">&nbsp; awaiting analysis..."}</span></div></div>;
}

function ProjectChart({ type }) {
  if (type === "system") return <div className="system-visual"><div className="system-node">CLIENT</div><i/><div className="system-node active">API</div><i/><div className="system-node">DATABASE</div><div className="system-orbit">MULTI-TENANT</div></div>;
  const bars = type === "inventory" ? [42, 72, 56, 84, 63, 91, 70] : [34, 50, 44, 68, 53, 79, 88];
  return <div className="project-chart"><div className="chart-kpi"><span>{type === "inventory" ? "STOCK FLOW" : "REVENUE TREND"}</span><strong>{type === "inventory" ? "ANALYSIS" : "TRACKING"}</strong></div><div className="chart-grid"><svg viewBox="0 0 300 100" preserveAspectRatio="none"><polyline points={bars.map((value, index) => `${index * 50},${100 - value}`).join(" ")} /></svg>{bars.map((value, index) => <i key={index} style={{height: `${value}%`}}/> )}</div><div className="chart-axis"><span>JAN</span><span>MAR</span><span>JUN</span><span>SEP</span><span>DEC</span></div></div>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [pipelineActive, setPipelineActive] = useState(2);
  useReveal();
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return <div className="site"><header className="nav"><button className="brand" onClick={() => scrollTo("home")}>CHRISTIAN<span>.</span></button><nav className={open ? "navlinks open" : "navlinks"}><button onClick={() => scrollTo("about")}>ABOUT</button><button onClick={() => scrollTo("experience")}>EXPERIENCE</button><button onClick={() => scrollTo("projects")}>PROJECTS</button><button onClick={() => scrollTo("lab")}>DATA LAB</button><button onClick={() => scrollTo("contact")}>CONTACT</button></nav><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></header><main>
    <section id="home" className="hero section"><div className="hero-copy reveal"><div className="eyebrow"><i className="live-dot"/> DATA ANALYST / LIMA, PERU</div><h1>CHRISTIAN<br/><em>GUTIERREZ</em></h1><div className="hero-role"><strong>DATA ANALYST</strong><span>ASPIRING DATA SCIENTIST</span></div><p>Transformando datos en insights, decisiones y mejores sistemas. Analista de Datos especializado en SQL, Power BI y análisis de información, desarrollando mi camino hacia Data Science.</p><div className="hero-actions"><button className="primary" onClick={() => scrollTo("projects")}>VIEW MY WORK <ArrowDown size={16}/></button><button className="text-btn" onClick={() => scrollTo("contact")}>CONTACT ME <ArrowUpRight size={16}/></button></div></div><DataNetwork/><div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>SQL <b>/</b> POWER BI <b>/</b> PYTHON <b>/</b> DATA</span></div></section>
    <section id="about" className="section story"><SectionLabel index="01">FROM OPERATIONS TO DATA</SectionLabel><div className="story-grid reveal"><div><h2>La curiosidad<br/><span>se volvió método.</span></h2><p>Trabajo con información real, problemas reales y sistemas que necesitan ser entendidos antes de ser mejorados.</p></div><div className="journey"><div className="journey-line"/><div className="journey-step"><span>01</span><strong>INVENTORY</strong><small>Operations & control</small></div><div className="journey-step"><span>02</span><strong>DATA MANAGEMENT</strong><small>Quality & structure</small></div><div className="journey-step current"><span>03</span><strong>ANALYTICS</strong><small>SQL & reporting</small></div><div className="journey-step"><span>04</span><strong>BUSINESS INTELLIGENCE</strong><small>Power BI & decisions</small></div><div className="journey-step next"><span>05</span><strong>DATA SCIENCE</strong><small>Python & statistics</small></div></div></div></section>
    <section id="toolkit" className="section toolkit"><SectionLabel index="02">MY DATA TOOLKIT</SectionLabel><div className="section-intro reveal"><h2>Herramientas para<br/><span>ver lo que importa.</span></h2><p>Mi centro de gravedad actual es SQL + Power BI + Excel + Python. Cada herramienta es una forma distinta de hacer mejores preguntas.</p></div><div className="tool-grid reveal">{toolkit.map((item) => <ToolkitCard key={item.name} item={item}/>)}</div></section>
    <section id="lab" className="section lab-section"><SectionLabel index="03">DATA LAB</SectionLabel><div className="section-intro reveal"><h2>Una pequeña<br/><span>mesa de análisis.</span></h2><p>Una simulación visual de cómo pienso un dataset antes de convertirlo en una decisión. Demo con datos ficticios.</p></div><div className="reveal"><DataLab/></div></section>
    <section className="section pipeline-section"><SectionLabel index="04">DATA PIPELINE</SectionLabel><div className="section-intro reveal"><h2>Del archivo al<br/><span>insight.</span></h2><p>La calidad de una visualización empieza mucho antes del gráfico.</p></div><div className="pipeline reveal">{pipeline.map(([name, description], index) => <button className={`pipeline-step ${pipelineActive === index ? "selected" : ""}`} key={name} onMouseEnter={() => setPipelineActive(index)} onFocus={() => setPipelineActive(index)}><span className="pipeline-number">0{index + 1}</span><strong>{name}</strong>{index < pipeline.length - 1 && <i className="pipeline-connector"/>}<div className="pipeline-tooltip">{description}</div></button>)}</div></section>
    <section id="projects" className="section projects"><SectionLabel index="05">SELECTED PROJECTS</SectionLabel><div className="section-intro reveal"><h2>Casos donde los<br/><span>datos hacen algo.</span></h2><p>Proyectos construidos desde la realidad operativa: información, sistemas y decisiones conectados.</p></div><div className="project-list">{projects.map((project) => <article className="project-case reveal" key={project.title}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div><div className="project-content"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" className="case-link">VIEW CASE <ArrowUpRight size={16}/></a></div><ProjectChart type={project.chart}/></div></article>)}</div></section>
    <section className="section viz-section"><SectionLabel index="06">DATA VISUALIZATION</SectionLabel><div className="viz-heading reveal"><h2>Leer patrones.<br/><span>Contar historias.</span></h2><div className="viz-note"><span><i className="live-dot"/> VISUAL STUDY / 2026</span><p>Visualizaciones conceptuales inspiradas en el trabajo diario con indicadores, tendencias y distribuciones.</p></div></div><div className="viz-grid reveal"><div className="viz-card line-viz"><span>MONTHLY TREND</span><svg viewBox="0 0 400 150" preserveAspectRatio="none"><path d="M0 124 C40 118 45 90 82 101 S128 74 156 88 S200 54 237 69 S281 31 314 52 S355 28 400 10"/></svg><strong>+ insight over time</strong></div><div className="viz-card scatter-viz"><span>DISTRIBUTION</span><div>{Array.from({length: 30}, (_, index) => <i key={index} style={{left: `${(index * 37) % 91}%`, top: `${18 + ((index * 23) % 65)}%`}}/> )}</div><strong>patterns become visible</strong></div><div className="viz-card bars-viz"><span>INDICATOR MIX</span><div>{[46, 72, 57, 88, 66, 78].map((height, index) => <i key={index} style={{height: `${height}%`}}/> )}</div><strong>simple, useful, clear</strong></div></div></section>
    <section className="section future"><SectionLabel index="07">THE NEXT DATASET</SectionLabel><div className="future-layout reveal"><div><h2>Data Analytics is where I work today.<br/><em>Data Science is where I'm heading.</em></h2><p>Estoy construyendo la siguiente etapa con disciplina: profundizar en Python, estadística, automatización y análisis avanzado sin perder el contacto con los problemas del negocio.</p></div><div className="roadmap"><div className="roadmap-col done"><span>NOW</span><h3>DATA ANALYTICS</h3>{["SQL", "Power BI", "Excel", "Data Cleaning", "Reporting"].map((item) => <p key={item}><Check size={14}/>{item}</p>)}</div><div className="roadmap-arrow">→</div><div className="roadmap-col next"><span>NEXT</span><h3>DATA SCIENCE</h3>{["Python", "Statistics", "Machine Learning", "Predictive Analytics", "Advanced Analysis"].map((item) => <p key={item}><MoveUpRight size={14}/>{item}</p>)}</div></div></div></section>
    <section id="experience" className="section experience"><SectionLabel index="08">EXPERIENCE</SectionLabel><div className="experience-head reveal"><h2>Experiencia<br/><span>que acumula contexto.</span></h2><p>De operaciones e inventarios al análisis de información tributaria. Cada etapa dejó una forma más precisa de leer los datos.</p></div><div className="timeline reveal"><article><span>2021 — 2024</span><i/><div><h3>Corporación Mendoza</h3><p>Analista Encargado de Almacén</p><small>Inventario · análisis histórico · optimización de procesos</small></div></article><article><span>2024</span><i/><div><h3>Kasumi S.A.C.</h3><p>Auditor y Administrativo de Almacén</p><small>Auditoría de información · discrepancias · digitalización</small></div></article><article className="timeline-current"><span>2025 — PRESENT</span><i/><div><h3>Municipalidad de Lurigancho Chosica</h3><p>Analista Estadístico de Bases de Datos</p><small>SQL Server · Power BI · reportes financieros y tributarios</small></div></article></div></section>
    <section id="cv" className="section cv-section"><SectionLabel index="09">CURRICULUM VITAE</SectionLabel><div className="cv-layout reveal"><div><h2>El documento<br/><span>completo.</span></h2><p>Experiencia, formación y herramientas en una sola vista.</p><a className="primary" href="/docs/CV_Christian_Gutierrez.pdf" target="_blank" rel="noreferrer">OPEN CV <ArrowUpRight size={16}/></a></div><iframe className="cv-embed" src="/docs/CV_Christian_Gutierrez.pdf" title="CV de Christian Gutierrez"><a href="/docs/CV_Christian_Gutierrez.pdf">Abrir CV</a></iframe></div></section>
    <section id="contact" className="contact"><div className="section contact-inner"><SectionLabel index="10">CONTACT</SectionLabel><h2>Let's work<br/><span>with data.</span></h2><p>Si tienes una pregunta, un dashboard por construir o un problema que entender, conversemos.</p><a className="contact-link" href="mailto:christhiangutierrezrosas@gmail.com">LET'S TALK <ArrowUpRight/></a><div className="contact-emails"><a href="mailto:christian.gutierrezr@outlook.com">christian.gutierrezr@outlook.com</a><a href="mailto:christhiangutierrezrosas@gmail.com">christhiangutierrezrosas@gmail.com</a></div><div className="socials"><a href="https://www.linkedin.com/in/christhian-jhunior-gutierrez-rosas-281224278/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://github.com/christian-97" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="mailto:christhiangutierrezrosas@gmail.com" aria-label="Email"><Mail/></a></div></div></section>
  </main><footer><span>DATA ANALYST / ASPIRING DATA SCIENTIST</span><button onClick={() => scrollTo("home")} aria-label="Back to top"><ChevronDown size={17}/></button></footer></div>;
}

createRoot(document.getElementById("root")).render(<App />);
