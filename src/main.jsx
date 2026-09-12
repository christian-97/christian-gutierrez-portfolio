import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Database, Github, Linkedin, Menu, MoveUpRight, Play, X } from "lucide-react";
import "./styles.css";

const toolkit = [
  { name: "SQL Server", label: "QUERY", steps: ["QUERY", "CLEAN", "TRANSFORM", "ANALYZE"], color: "mint" },
  { name: "Power BI", label: "INSIGHT", steps: ["DATA", "MODEL", "DAX", "VISUALIZE"], color: "blue" },
  { name: "Python", label: "EVOLVE", steps: ["DATA", "PANDAS", "ANALYSIS", "MODEL"], color: "yellow" },
  { name: "Excel", label: "REPORT", steps: ["IMPORT", "VALIDATE", "PIVOT", "REPORT"], color: "mint" },
  { name: "DAX", label: "MEASURE", steps: ["FILTER", "CALCULATE", "DEFINE", "EXPLAIN"], color: "blue" },
  { name: "Power Query", label: "PREPARE", steps: ["SOURCE", "CLEAN", "MERGE", "LOAD"], color: "yellow" },
  { name: "VS Community · SSIS", label: "DEVELOPMENT", steps: ["CODE", "DEBUG", "BUILD", "DEPLOY"], color: "purple" },
  { name: "React", label: "BUILD", steps: ["COMPONENT", "STATE", "UI", "DEPLOY"], color: "mint" },
  { name: "GitHub", label: "VERSION", steps: ["COMMIT", "BRANCH", "MERGE", "DEPLOY"], color: "mint" }
];


const pipeline = [
  ["SOURCE", "Archivos CSV, Excel y bases de datos."], ["EXTRACT", "Obtención de datos desde bases de datos y archivos mediante SSIS y consultas SQL."], ["TRANSFORM", "Limpieza, normalización y preparación de datos."], ["VALIDATE", "Revisión de calidad, consistencia y valores faltantes."], ["MODEL", "Construcción de modelos para análisis."], ["VISUALIZE", "Conversión de datos en información comprensible."], ["INSIGHT", "Una lectura clara para decidir mejor."]
];

const projects = [
  { number: "01", title: "FactuOnLine", type: "SOFTWARE / SAAS", description: "Plataforma SaaS multiempresa para facturación electrónica y gestión comercial, desarrollada con arquitectura Multi-Tenant.", tags: ["React", "NestJS", "TypeScript", "PostgreSQL", "REST APIs"], chart: "system" },
  { number: "02", title: "Dashboard de Recaudación Municipal", type: "DATA ANALYTICS / BI", description: "Análisis y visualización de información tributaria y financiera para apoyar el seguimiento de recaudación e indicadores de gestión.", tags: ["SQL Server", "SSIS", "Power BI", "DAX", "ETL"], chart: "municipal" },
  { number: "03", title: "Análisis de Deuda Tributaria", type: "DATA ANALYTICS", description: "Análisis de información tributaria para apoyar el seguimiento y la lectura de indicadores de gestión.", tags: ["SQL Server", "Excel", "Power Query", "Power BI"], chart: "municipal" },
  { number: "04", title: "Data Analysis Lab", type: "DATA EXPLORATION", description: "Espacio de exploración para preparar, validar y convertir datos en hallazgos accionables.", tags: ["Python", "ETL", "Data Analysis", "Visualization"], chart: "inventory" },
  { number: "05", title: "BI Comercial", type: "BUSINESS INTELLIGENCE", description: "Reportes y visualizaciones orientadas a comprender indicadores comerciales y apoyar decisiones.", tags: ["Power BI", "DAX", "Excel", "Data Visualization"], chart: "municipal" },
  { number: "06", title: "SQL Reporting", type: "DATA REPORTING", description: "Consultas y reportes para transformar datos operativos en información clara y utilizable.", tags: ["SQL Server", "SSIS", "ETL", "Power Query", "Reporting"], chart: "inventory" }
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
    const state = { width: 0, height: 0, dpr: 1, count: 0, nodes: null, edges: null, positions: null, elapsed: 0, lastTime: 0, frame: 0, running: false, visible: false, measured: false, pointer: { x: 0, y: 0, active: false } };

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
      const layers = 5;
      const perLayer = Math.ceil(count / layers);
      for (let index = 0; index < count; index += 1) {
        const offset = index * 7;
        const layer = Math.min(layers - 1, Math.floor(index / perLayer));
        nodes[offset] = 0.12 + layer * 0.19 + (next() - 0.5) * 0.035;
        nodes[offset + 1] = 0.17 + next() * 0.66;
        nodes[offset + 2] = next() * Math.PI * 2;
        nodes[offset + 3] = layer;
        nodes[offset + 4] = 0.004 + next() * 0.008;
        nodes[offset + 5] = 0.16 + next() * 0.2;
        nodes[offset + 6] = index % 11 === 3 || index % 13 === 0 ? 1 : 0;
      }
      const connections = [];
      for (let index = 0; index < count; index += 1) {
        const layer = nodes[index * 7 + 3];
        if (layer >= layers - 1) continue;
        const nextStart = (layer + 1) * perLayer;
        const nextCount = Math.min(perLayer, count - nextStart);
        if (nextCount <= 0) continue;
        connections.push(index, nextStart + (index % perLayer) % nextCount);
        if (index % 2 === 0) connections.push(index, nextStart + (index * 3 + 1) % nextCount);
      }
      state.nodes = nodes;
      state.edges = new Uint16Array(connections);
      state.positions = new Float32Array(count * 2);
      state.count = count;
    };

    const nodeCount = () => window.innerWidth <= 650 ? 16 : window.innerWidth <= 950 ? 26 : 38;

    const render = () => {
      const { width, height, nodes, edges, positions, count } = state;
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < count; index += 1) {
        const offset = index * 7;
        const baseX = nodes[offset] * width + Math.sin(state.elapsed * nodes[offset + 5] + nodes[offset + 2]) * width * nodes[offset + 4];
        const baseY = nodes[offset + 1] * height + Math.cos(state.elapsed * nodes[offset + 5] * 0.8 + nodes[offset + 2]) * height * nodes[offset + 4];
        let x = baseX;
        let y = baseY;
        if (state.pointer.active) {
          const dx = x - state.pointer.x;
          const dy = y - state.pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 150) {
            const influence = ((150 - distance) / 150) ** 2;
            x += dx * influence * 0.12;
            y += dy * influence * 0.12;
          }
        }
        positions[index * 2] = x;
        positions[index * 2 + 1] = y;
      }

      context.lineWidth = 0.5;
      for (let index = 0; index < edges.length; index += 2) {
        const from = edges[index] * 2;
        const to = edges[index + 1] * 2;
        const midX = (positions[from] + positions[to]) / 2;
        const midY = (positions[from + 1] + positions[to + 1]) / 2;
        const near = state.pointer.active && Math.hypot(midX - state.pointer.x, midY - state.pointer.y) < 125;
        context.strokeStyle = near ? "rgba(101, 214, 161, 0.68)" : "rgba(99, 179, 237, 0.26)";
        context.beginPath();
        context.moveTo(positions[from], positions[from + 1]);
        context.lineTo(positions[to], positions[to + 1]);
        context.stroke();
      }

      for (let index = 0; index < count; index += 1) {
        const offset = index * 7;
        const x = positions[index * 2];
        const y = positions[index * 2 + 1];
        const hot = nodes[offset + 6] === 1;
        const near = state.pointer.active && Math.hypot(x - state.pointer.x, y - state.pointer.y) < 110;
        context.fillStyle = hot || near ? "rgba(101, 214, 161, 1)" : "rgba(167, 177, 184, 0.52)";
        context.beginPath();
        context.arc(x, y, hot ? 4 : near ? 2 : 3, 0, Math.PI * 2);
        context.fill();
      }

      const particleCount = Math.min(10, Math.floor(edges.length / 2));
      for (let index = 0; index < particleCount; index += 1) {
        const edgeOffset = (Math.floor(state.elapsed * 0.55 + index * 2.7) % (edges.length / 2)) * 2;
        const from = edges[edgeOffset] * 2;
        const to = edges[edgeOffset + 1] * 2;
        const progress = (state.elapsed * 0.42 + index * 0.17) % 1;
        let x = positions[from] + (positions[to] - positions[from]) * progress;
        let y = positions[from + 1] + (positions[to + 1] - positions[from + 1]) * progress;
        if (state.pointer.active) {
          const distance = Math.hypot(x - state.pointer.x, y - state.pointer.y);
          if (distance < 115) {
            const influence = ((115 - distance) / 115) ** 2;
            x += (state.pointer.x - x) * influence * 0.045;
            y += (state.pointer.y - y) * influence * 0.045;
          }
        }
        context.fillStyle = "rgba(242, 201, 76, 0.72)";
        context.fillRect(x - 1.5, y - 1.5, 3, 3);
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
      state.elapsed += delta * 1.15;
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
    const onPointerMove = (event) => {
      const rect = wrapper.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      state.pointer.active = inside;
      if (inside) {
        state.pointer.x = event.clientX - rect.left;
        state.pointer.y = event.clientY - rect.top;
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      state.visible ? start() : stop();
    }, { threshold: 0.01 });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    visibilityObserver.observe(wrapper);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    reducedMotion.addEventListener?.("change", onReducedMotionChange);
    resize();
    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      reducedMotion.removeEventListener?.("change", onReducedMotionChange);
    };
  }, []);

  return <div className="network-wrap" aria-label="Visualización abstracta del flujo de datos"><div className="network-top"><span><i className="live-dot"/> LIVE DATA</span><span>01 — 07</span></div><canvas ref={canvasRef} className="network" aria-hidden="true"/><div className="network-caption"><span>recaudacion_2026.csv</span><strong>DATA <b>→</b> PROCESS <b>→</b> INSIGHT</strong></div></div>;
}

function ProfilePhoto() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="profile-photo-wrap">
      <div className="profile-photo-inner">
        <img
          src="/images/image.png"
          alt="Christian Gutierrez"
          className={`profile-photo-img${loaded ? " profile-photo-visible" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        {(error || !loaded) && (
          <div className="profile-photo-placeholder" aria-hidden={loaded && !error}>
            <div className="profile-placeholder-icon">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                <circle cx="19" cy="14" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 36c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="profile-placeholder-label">FOTO DE PERFIL</span>
            <span className="profile-placeholder-path">/images/image.png</span>
          </div>
        )}
        <div className="profile-photo-badge">
          <i className="live-dot"/>
          <span>DATA ANALYST</span>
        </div>
      </div>
      <div className="profile-photo-accent" aria-hidden="true"/>
    </div>
  );
}


const TOOL_ICONS = {
  "VS Community · SSIS": (
    <svg viewBox="0 0 96 96" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* Dark left shield */}
      <path d="M68.9 95.6a6 6 0 003.9-.4L92.6 85.6A6 6 0 0096 80.2V15.8a6 6 0 00-3.4-5.4L72.8.8A6 6 0 0066 2L34.1 37.3 15.5 22l-1.6-1.4a4 4 0 00-3.6-.8l-.5.2L2.5 23A4 4 0 000 26.7v.3V69v.3A4 4 0 002.5 73l7.3 3 .5.2a4 4 0 003.6-.8L15.5 74l18.6-15.3L66 94a6 6 0 002.9 1.6z" fill="#52218a"/>
      {/* Mid purple body */}
      <path d="M72 27.7L47.2 48 72 68.3V27.7z" fill="#6c33af"/>
      {/* Light purple wing */}
      <path d="M12 34.3L24.4 48 12 61.7V34.3z" fill="#854cc7"/>
      {/* Highlight / chevron */}
      <path d="M68.9 95.6a6 6 0 003.9-.4L92.6 85.6A6 6 0 0096 80.2V15.8a6 6 0 00-3.4-5.4L72.8.8a6 6 0 00-4.5-.3L72 27.7 47.2 48 72 68.3v.1L68.3 95.5z" fill="#b179f1"/>
    </svg>
  ),
  "GitHub": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  "SQL Server": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="9" ry="3.5" fill="currentColor" opacity=".9"/>
      <path d="M3 6v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5V6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M3 10v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5v-4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M3 14v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5v-4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  "Power BI": (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="2" y="13" width="4" height="8" rx="1" fill="#f2c94c"/>
      <rect x="8" y="8" width="4" height="13" rx="1" fill="#f2c94c" opacity=".8"/>
      <rect x="14" y="4" width="4" height="17" rx="1" fill="#f2c94c" opacity=".65"/>
      <rect x="20" y="1" width="2" height="20" rx="1" fill="#f2c94c" opacity=".45"/>
    </svg>
  ),
  "Python": (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M11.5 2C8.46 2 7 3.12 7 5v2h5v1H5.5C3.57 8 2 9.79 2 12s1.57 4 3.5 4H7v-2.5C7 11.34 8.46 10 11.5 10H15V5c0-1.88-1.46-3-3.5-3zm-1 2a1 1 0 110 2 1 1 0 010-2z" fill="#63b3ed"/>
      <path d="M12.5 22c3.04 0 4.5-1.12 4.5-3v-2h-5v-1h6.5c1.93 0 3.5-1.79 3.5-4s-1.57-4-3.5-4H17v2.5C17 12.66 15.54 14 12.5 14H9v5c0 1.88 1.46 3 3.5 3zm1-2a1 1 0 110-2 1 1 0 010 2z" fill="#f2c94c"/>
    </svg>
  ),
  "Excel": (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#217346" opacity=".85"/>
      <path d="M7 8l3.5 4L7 16h2.5l2-2.8 2 2.8H16l-3.5-4L16 8h-2.5l-2 2.8L9.5 8H7z" fill="#fff"/>
    </svg>
  ),
  "DAX": (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" opacity=".12"/>
      <text x="3.5" y="15.5" fontFamily="monospace" fontSize="10" fontWeight="700" fill="currentColor" opacity=".9">fx</text>
      <path d="M13 9h6M13 12h4M13 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "Power Query": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 5h16M6 9h12M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 17v4M9 19l3 2 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".3"/>
    </svg>
  ),
  "SSIS": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="9" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="16" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 9v3.5M12 9v3.5M19 9v3.5M5 12.5h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <rect x="7" y="15" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M12 12.5V15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  "React": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="2" ry="2" fill="#63b3ed"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#63b3ed" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#63b3ed" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#63b3ed" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 2C7.86 2 5 4.69 5 8v8c0 3.31 2.86 6 7 6s7-2.69 7-6V8c0-3.31-2.86-6-7-6z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M5 11h14" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9 2v4M15 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <ellipse cx="12" cy="8" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    </svg>
  ),
};

function ToolkitCard({ item }) {
  const [active, setActive] = useState(false);
  const icon = TOOL_ICONS[item.name];
  return <button className={`tool-card ${active ? "tool-active" : ""}`} onClick={() => setActive(!active)} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}><span className={`tool-icon ${item.color}`}>{icon ?? null}</span><span className="tool-name">{item.name}</span><span className="tool-label">{active ? item.label : "OPEN"} <ArrowUpRight size={14}/></span><span className="tool-flow">{item.steps.map((step, index) => <React.Fragment key={step}><em>{step}</em>{index < item.steps.length - 1 && <b>→</b>}</React.Fragment>)}</span></button>;
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
    <section id="home" className="hero section"><div className="hero-inner"><div className="hero-copy reveal"><div className="eyebrow"><i className="live-dot"/> DATA ANALYST / LIMA, PERU</div><h1>CHRISTIAN<br/><em>GUTIERREZ</em></h1><div className="hero-role"><strong>DATA ANALYST · BI DEVELOPER</strong><span>ASPIRING DATA SCIENTIST</span></div><p>Combino Data Analytics, Business Intelligence, visualización de datos, Data Engineering y desarrollo de software para transformar información en insights, decisiones y mejores sistemas.</p><div className="hero-actions"><button className="primary" onClick={() => scrollTo("projects")}>VIEW MY WORK <ArrowDown size={16}/></button><a className="text-btn" href="/cv/christian-gutierrez-cv.pdf" target="_blank" rel="noreferrer">DESCARGAR CV <ArrowDown size={16}/></a><button className="text-btn" onClick={() => scrollTo("contact")}>CONTACT ME <ArrowUpRight size={16}/></button></div></div><ProfilePhoto/></div><DataNetwork/><div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>SQL <b>/</b> POWER BI <b>/</b> PYTHON <b>/</b> DATA <b>/</b> SSIS </span></div></section>
    <section id="about" className="section story"><SectionLabel index="01">FROM OPERATIONS TO DATA</SectionLabel><div className="story-grid reveal"><div><h2>La curiosidad<br/><span>se volvió método.</span></h2><p>Trabajo con datos reales y problemas reales, buscando entender la información, encontrar patrones y convertirlos en insights para tomar mejores decisiones.</p></div><div className="journey"><div className="journey-line"/><div className="journey-step"><span>01</span><strong>INVENTORY</strong><small>Operations & control</small></div><div className="journey-step"><span>02</span><strong>DATA MANAGEMENT</strong><small>Quality & structure</small></div><div className="journey-step current"><span>03</span><strong>ANALYTICS</strong><small>SQL & reporting</small></div><div className="journey-step"><span>04</span><strong>BUSINESS INTELLIGENCE</strong><small>Power BI & decisions</small></div><div className="journey-step next"><span>05</span><strong>DATA SCIENCE</strong><small>Python & statistics</small></div></div></div></section>
    <section id="toolkit" className="section toolkit"><SectionLabel index="02">MY DATA TOOLKIT</SectionLabel><div className="section-intro reveal"><h2>Herramientas para<br/><span>ver lo que importa.</span></h2><p>SQL Server, Power BI, DAX, Power Query, Excel avanzado, Python, ETL y SSIS para datos; React, NestJS, TypeScript, PostgreSQL, REST APIs y Git / GitHub para soluciones digitales.</p></div><div className="tool-grid reveal">{toolkit.map((item) => <ToolkitCard key={item.name} item={item}/>)}</div></section>
    <section id="lab" className="section lab-section"><SectionLabel index="03">DATA LAB</SectionLabel><div className="section-intro reveal"><h2>Una pequeña<br/><span>mesa de análisis.</span></h2><p>Una simulación visual de cómo pienso un dataset antes de convertirlo en una decisión. Demo con datos ficticios.</p></div><div className="reveal"><DataLab/></div></section>
    <section className="section pipeline-section"><SectionLabel index="04">DATA PIPELINE</SectionLabel><div className="section-intro reveal"><h2>Del archivo al<br/><span>insight.</span></h2><p>La calidad de una visualización empieza mucho antes del gráfico.</p></div><div className="pipeline reveal">{pipeline.map(([name, description], index) => <button className={`pipeline-step ${pipelineActive === index ? "selected" : ""}`} key={name} onMouseEnter={() => setPipelineActive(index)} onFocus={() => setPipelineActive(index)}><span className="pipeline-number">0{index + 1}</span><strong>{name}</strong>{index < pipeline.length - 1 && <i className="pipeline-connector"/>}<div className="pipeline-tooltip">{description}</div></button>)}</div></section>
    <section id="projects" className="section projects"><SectionLabel index="05">SELECTED PROJECTS</SectionLabel><div className="section-intro reveal"><h2>Casos donde los<br/><span>datos hacen algo.</span></h2><p>Proyectos construidos desde la realidad operativa: información, sistemas y decisiones conectados.</p></div><div className="project-list">{projects.map((project) => <article className="project-case reveal" key={project.title}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div><div className="project-content"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" className="case-link">VIEW CASE <ArrowUpRight size={16}/></a></div><ProjectChart type={project.chart}/></div></article>)}</div></section>
    <section className="section viz-section"><SectionLabel index="06">DATA VISUALIZATION</SectionLabel><div className="viz-heading reveal"><h2>Leer patrones.<br/><span>Contar historias.</span></h2><div className="viz-note"><span><i className="live-dot"/> VISUAL STUDY / 2026</span><p>Visualizaciones conceptuales inspiradas en el trabajo diario con indicadores, tendencias y distribuciones.</p></div></div><div className="viz-grid reveal"><div className="viz-card line-viz"><span>MONTHLY TREND</span><svg viewBox="0 0 400 150" preserveAspectRatio="none"><path d="M0 124 C40 118 45 90 82 101 S128 74 156 88 S200 54 237 69 S281 31 314 52 S355 28 400 10"/></svg><strong>+ insight over time</strong></div><div className="viz-card scatter-viz"><span>DISTRIBUTION</span><div>{Array.from({length: 30}, (_, index) => <i key={index} style={{left: `${(index * 37) % 91}%`, top: `${18 + ((index * 23) % 65)}%`}}/> )}</div><strong>patterns become visible</strong></div><div className="viz-card bars-viz"><span>INDICATOR MIX</span><div>{[46, 72, 57, 88, 66, 78].map((height, index) => <i key={index} style={{height: `${height}%`}}/> )}</div><strong>simple, useful, clear</strong></div></div></section>
    <section className="section future"><SectionLabel index="07">THE NEXT DATASET</SectionLabel><div className="future-layout reveal"><div><h2>Data Analytics is where I work today.<br/><em>Data Science is where I'm heading.</em></h2><p>Estoy construyendo la siguiente etapa con disciplina: profundizar en Python, estadística, automatización y análisis avanzado sin perder el contacto con los problemas del negocio.</p></div><div className="roadmap"><div className="roadmap-col done"><span>NOW</span><h3>DATA ANALYTICS</h3>{["SQL", "Power BI", "Excel", "Data Cleaning", "Reporting"].map((item) => <p key={item}><Check size={14}/>{item}</p>)}</div><div className="roadmap-arrow">→</div><div className="roadmap-col next"><span>NEXT</span><h3>DATA SCIENCE</h3>{["Python", "Statistics", "Machine Learning", "Predictive Analytics", "Advanced Analysis"].map((item) => <p key={item}><MoveUpRight size={14}/>{item}</p>)}</div></div></div></section>
    <section id="experience" className="section experience"><SectionLabel index="08">EXPERIENCE</SectionLabel><div className="experience-head reveal"><h2>Experiencia<br/><span>que acumula contexto.</span></h2><p>De operaciones e inventarios al análisis de información tributaria y al desarrollo de soluciones digitales. Cada etapa dejó una forma más precisa de leer los datos.</p></div><div className="timeline reveal"><article><span>2021 — 2024</span><i/><div><h3>Corporación Mendoza</h3><p>Analista Encargado de Almacén</p><small>Inventario · análisis histórico · optimización de procesos</small></div></article><article><span>2024</span><i/><div><h3>Kasumi S.A.C.</h3><p>Auditor y Administrativo de Almacén</p><small>Auditoría de información · discrepancias · digitalización</small></div></article><article className="timeline-current"><span>2025 — PRESENT</span><i/><div><h3>Municipalidad de Lurigancho-Chosica</h3><p>Analista de Datos / Analista Estadístico de Bases de Datos</p><small>SQL Server · Power BI · DAX · Excel · ETL · SSIS · Power Query · Python</small></div></article><article><span>SOFTWARE / SAAS</span><i/><div><h3>FactuOnLine</h3><p>Software / SaaS Developer</p><small>React · NestJS · TypeScript · PostgreSQL · SaaS · REST APIs</small></div></article></div></section>
    <section id="cv" className="section cv-section"><SectionLabel index="09">CURRICULUM VITAE</SectionLabel><div className="cv-layout reveal"><div><h2>El documento<br/><span>completo.</span></h2><p>Experiencia, formación y herramientas en una sola vista.</p><a className="primary" href="/cv/christian-gutierrez-cv.pdf" target="_blank" rel="noreferrer">DESCARGAR CV <ArrowDown size={16}/></a></div><iframe className="cv-embed" src="/cv/christian-gutierrez-cv.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0" title="Vista previa del CV de Christian Gutierrez" scrolling="no"><a href="/cv/christian-gutierrez-cv.pdf">Abrir CV</a></iframe></div></section>
    <section id="contact" className="contact"><div className="section contact-inner"><SectionLabel index="10">CONTACT</SectionLabel><h2>Let's work<br/><span>with data.</span></h2><p>Si tienes una pregunta, un dashboard por construir o un problema que entender, conversemos.</p><div className="contact-emails"><a href="mailto:christhiangutierrezrosas@gmail.com">christhiangutierrezrosas@gmail.com</a><a href="mailto:christian.gutierrezr@outlook.com">christian.gutierrezr@outlook.com</a></div><div className="socials"><a href="https://www.linkedin.com/in/christhian-jhunior-gutierrez-rosas-281224278/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://github.com/christian-97" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a></div></div></section>
  </main><footer><span>DATA ANALYST / ASPIRING DATA SCIENTIST</span><button onClick={() => scrollTo("home")} aria-label="Back to top"><ChevronDown size={17}/></button></footer></div>;
}

createRoot(document.getElementById("root")).render(<App />);
