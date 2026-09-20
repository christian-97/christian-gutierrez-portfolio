import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Database, Github, Layers, Linkedin, Menu, MoveUpRight, Play, Table, X } from "lucide-react";
import "./styles.css";
import { FactuOnlineCaseStudy } from "./FactuOnlineCaseStudy.jsx";
import MunicipalRevenueCaseStudy from "./MunicipalRevenueCaseStudy.jsx";
import PowerBiLogo from "./PowerBiLogo.jsx";
import PythonLogo from "./PythonLogo.jsx";

const toolkit = [
  {
    name: "SQL Server",
    tech: "Queries · Joins · CTEs · ETL · Optimization",
    color: "mint"
  },
  {
    name: "Power BI",
    tech: "Modeling · DAX · KPIs · Dashboards · Data Visualization",
    color: "blue"
  },
  {
    name: "Python",
    tech: "Pandas · NumPy · Data Cleaning · EDA · Visualization",
    color: "yellow"
  },
  {
    name: "Excel",
    tech: "Pivot Tables · Formulas · Power Query · Reconciliation · Reporting",
    color: "mint"
  },
  {
    name: "DAX",
    tech: "Measures · CALCULATE · Time Intelligence · Context · KPIs",
    color: "blue"
  },
  {
    name: "Power Query",
    tech: "ETL · Cleaning · Transformation · Merge · Automation",
    color: "yellow"
  },
  {
    name: "SSIS",
    tech: "ETL · Data Integration · Packages · Transform · Load",
    color: "purple"
  },
  {
    name: "Visual Studio Community",
    tech: "Development · Debugging · Build · C# · .NET",
    color: "purple"
  },
  {
    name: "PostgreSQL",
    tech: "SQL · Modeling · Joins · Relationships · Queries",
    color: "blue"
  },
  {
    name: "React",
    tech: "Components · State · Hooks · UI · Frontend",
    color: "mint"
  },
  {
    name: "NestJS",
    tech: "REST APIs · Modules · Services · Backend · TypeScript",
    color: "purple"
  }
];


const pipeline = [
  ["SOURCE", "CSV, Excel files, and relational databases."], ["EXTRACT", "Data extraction from databases and files using SSIS and SQL queries."], ["TRANSFORM", "Data cleaning, normalization, and preparation."], ["VALIDATE", "Quality checks, consistency validation, and missing value handling."], ["MODEL", "Analytical modeling and relationship design."], ["VISUALIZE", "Transforming data into intuitive, clear visual narratives."], ["INSIGHT", "Actionable findings that empower strategic business decisions."]
];

const projects = [
  { number: "01", title: "FactuOnLine", type: "SOFTWARE / SAAS", description: "Multi-tenant SaaS platform for electronic invoicing and commercial management, developed with scalable multi-tenant architecture.", tags: ["React", "NestJS", "TypeScript", "PostgreSQL", "REST APIs"], chart: "system" },
  { number: "02", title: "Municipal Revenue Analytics", type: "DATA ANALYTICS / BUSINESS INTELLIGENCE", description: "Comprehensive Business Intelligence solution connecting municipal SQL Server data, SSIS ETL pipelines, shared dimensional modeling, and interactive Power BI executive dashboards.", tags: ["Power BI", "SQL Server", "SSIS", "Power Query", "ETL", "Data Modeling", "DAX"], chart: "municipal" },
  { number: "03", title: "Revenue Forecasting 2027", type: "DATA SCIENCE / PREDICTIVE ANALYTICS", description: "Predicting municipal revenue for 2027 using historical data, statistical analysis and Python-based forecasting.", tags: ["Python", "Pandas", "NumPy", "Statistics", "Machine Learning", "Predictive Analytics"], chart: "forecasting" }
];

function useReveal(deps) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [deps]);
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

  return <div className="network-wrap" aria-label="Abstract visualization of data flow"><div className="network-top"><span><i className="live-dot"/> LIVE DATA</span><span>01 — 07</span></div><canvas ref={canvasRef} className="network" aria-hidden="true"/><div className="network-caption"><span>recaudacion_2026.csv</span><strong>DATA <b>→</b> PROCESS <b>→</b> INSIGHT</strong></div></div>;
}

function ProfilePhoto() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="profile-photo-wrap">
      <div className="profile-photo-inner">
        {!loaded && !error && (
          <div className="img-skeleton" aria-hidden="true" />
        )}
        <img
          src={`${import.meta.env.BASE_URL}images/image.webp`}
          alt="Christian Gutierrez"
          className={`profile-photo-img${loaded ? " profile-photo-visible" : ""}`}
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        {error && (
          <div className="profile-photo-placeholder" aria-hidden={false}>
            <div className="profile-placeholder-icon">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                <circle cx="19" cy="14" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 36c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="profile-placeholder-label">PROFILE PHOTO</span>
            <span className="profile-placeholder-path">/images/image.webp</span>
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
  "Visual Studio Community": (
    <svg viewBox="0 0 96 96" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M68.9 95.6a6 6 0 003.9-.4L92.6 85.6A6 6 0 0096 80.2V15.8a6 6 0 00-3.4-5.4L72.8.8A6 6 0 0066 2L34.1 37.3 15.5 22l-1.6-1.4a4 4 0 00-3.6-.8l-.5.2L2.5 23A4 4 0 000 26.7v.3V69v.3A4 4 0 002.5 73l7.3 3 .5.2a4 4 0 003.6-.8L15.5 74l18.6-15.3L66 94a6 6 0 002.9 1.6z" fill="#52218a"/>
      <path d="M72 27.7L47.2 48 72 68.3V27.7z" fill="#6c33af"/>
      <path d="M12 34.3L24.4 48 12 61.7V34.3z" fill="#854cc7"/>
      <path d="M68.9 95.6a6 6 0 003.9-.4L92.6 85.6A6 6 0 0096 80.2V15.8a6 6 0 00-3.4-5.4L72.8.8a6 6 0 00-4.5-.3L72 27.7 47.2 48 72 68.3v.1L68.3 95.5z" fill="#b179f1"/>
    </svg>
  ),
  "NestJS": (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M14.131.047c-.173 0-.334.037-.483.087.316.21.49.49.576.806.007.043.019.074.025.117a.681.681 0 0 1 .013.112c.024.545-.143.614-.26.936-.18.415-.13.861.086 1.22a.74.74 0 0 0 .074.137c-.235-1.568 1.073-1.803 1.314-2.293.019-.428-.334-.713-.613-.911a1.37 1.37 0 0 0-.732-.21zM16.102.4c-.024.143-.006.106-.012.18-.006.05-.006.112-.012.161-.013.05-.025.1-.044.149-.012.05-.03.1-.05.149l-.067.142c-.02.025-.031.05-.05.075l-.037.055a2.152 2.152 0 0 1-.093.124c-.037.038-.068.081-.112.112v.006c-.037.031-.074.068-.118.1-.13.099-.278.173-.415.266-.043.03-.087.056-.124.093a.906.906 0 0 0-.118.099c-.043.037-.074.074-.111.118-.031.037-.068.08-.093.124a1.582 1.582 0 0 0-.087.13c-.025.05-.043.093-.068.142-.019.05-.037.093-.05.143a2.007 2.007 0 0 0-.043.155c-.006.025-.006.056-.012.08-.007.025-.007.05-.013.075 0 .05-.006.105-.006.155 0 .037 0 .074.006.111 0 .05.006.1.019.155.006.05.018.1.03.15.02.049.032.098.05.148.013.03.031.062.044.087l-1.426-.552c-.241-.068-.477-.13-.719-.186l-.39-.093c-.372-.074-.75-.13-1.128-.167-.013 0-.019-.006-.031-.006A11.082 11.082 0 0 0 8.9 2.855c-.378.025-.756.074-1.134.136a12.45 12.45 0 0 0-.837.174l-.279.074c-.092.037-.18.08-.266.118l-.205.093c-.012.006-.024.006-.03.012-.063.031-.118.056-.174.087a2.738 2.738 0 0 0-.236.118c-.043.018-.086.043-.124.062a.559.559 0 0 1-.055.03c-.056.032-.112.063-.162.094a1.56 1.56 0 0 0-.148.093c-.044.03-.087.055-.124.086-.006.007-.013.007-.019.013-.037.025-.08.056-.118.087l-.012.012-.093.074c-.012.007-.025.019-.037.025-.031.025-.062.056-.093.08-.006.013-.019.02-.025.025-.037.038-.074.069-.111.106-.007 0-.007.006-.013.012a1.742 1.742 0 0 0-.111.106c-.007.006-.007.012-.013.012a1.454 1.454 0 0 0-.093.1c-.012.012-.03.024-.043.036a1.374 1.374 0 0 1-.106.112c-.006.012-.018.019-.024.03-.05.05-.093.1-.143.15l-.018.018c-.1.106-.205.211-.317.304-.111.1-.229.192-.347.273a3.777 3.777 0 0 1-.762.421c-.13.056-.267.106-.403.149-.26.056-.527.161-.756.18-.05 0-.105.012-.155.018l-.155.037-.149.056c-.05.019-.099.044-.148.068-.044.031-.093.056-.137.087a1.011 1.011 0 0 0-.124.106c-.043.03-.087.074-.124.111-.037.043-.074.08-.105.124-.031.05-.068.093-.093.143a1.092 1.092 0 0 0-.087.142c-.025.056-.05.106-.068.161-.019.05-.037.106-.056.161-.012.05-.025.1-.03.15 0 .005-.007.012-.007.018-.012.056-.012.13-.019.167C.006 7.95 0 7.986 0 8.03a.657.657 0 0 0 .074.31v.006c.019.037.044.075.069.112.024.037.05.074.08.111.031.031.068.069.106.1a.906.906 0 0 0 .117.099c.149.13.186.173.378.272.031.019.062.031.1.05.006 0 .012.006.018.006 0 .013 0 .019.006.031a1.272 1.272 0 0 0 .08.298c.02.037.032.074.05.111.007.013.013.025.02.031.024.05.049.093.073.137l.093.13c.031.037.069.08.106.118.037.037.074.068.118.105 0 0 .006.006.012.006.037.031.074.062.112.087a.986.986 0 0 0 .136.08c.043.025.093.05.142.069a.73.73 0 0 0 .124.043c.007.006.013.006.025.012.025.007.056.013.08.019-.018.335-.024.65.026.762.055.124.328-.254.6-.688-.036.428-.061.93 0 1.079.069.155.44-.329.763-.862 4.395-1.016 8.405 2.02 8.826 6.31-.08-.67-.905-1.041-1.283-.948-.186.458-.502 1.047-1.01 1.413.043-.41.025-.83-.062-1.24a4.009 4.009 0 0 1-.769 1.562c-.588.043-1.177-.242-1.487-.67-.025-.018-.031-.055-.05-.08-.018-.043-.037-.087-.05-.13a.515.515 0 0 1-.037-.13c-.006-.044-.006-.087-.006-.137v-.093a.992.992 0 0 1 .031-.13c.013-.043.025-.086.044-.13.024-.043.043-.087.074-.13.105-.298.105-.54-.087-.682a.706.706 0 0 0-.118-.062c-.024-.006-.055-.018-.08-.025l-.05-.018a.847.847 0 0 0-.13-.031.472.472 0 0 0-.13-.019 1.01 1.01 0 0 0-.136-.012c-.031 0-.062.006-.093.006a.484.484 0 0 0-.137.019c-.043.006-.086.012-.13.024a1.068 1.068 0 0 0-.13.044c-.043.018-.08.037-.124.056-.037.018-.074.043-.118.062-1.444.942-.582 3.148.403 3.787-.372.068-.75.148-.855.229l-.013.012c.267.161.546.298.837.416.397.13.818.247 1.004.297v.006a5.996 5.996 0 0 0 1.562.112c2.746-.192 4.996-2.281 5.405-5.033l.037.161c.019.112.043.23.056.347v.006c.012.056.018.112.025.162v.024c.006.056.012.112.012.162.006.068.012.136.012.204v.1c0 .03.007.067.007.098 0 .038-.007.075-.007.112v.087c0 .043-.006.08-.006.124 0 .025 0 .05-.006.08 0 .044-.006.087-.006.137-.006.018-.006.037-.006.055l-.02.143c0 .019 0 .037-.005.056-.007.062-.019.118-.025.18v.012l-.037.174v.018l-.037.167c0 .007-.007.02-.007.025a1.663 1.663 0 0 1-.043.168v.018c-.019.062-.037.118-.05.174-.006.006-.006.012-.006.012l-.056.186c-.024.062-.043.118-.068.18-.025.062-.043.124-.068.18-.025.062-.05.117-.074.18h-.007c-.024.055-.05.117-.08.173a.302.302 0 0 1-.019.043c-.006.006-.006.013-.012.019a5.867 5.867 0 0 1-1.742 2.082c-.05.031-.099.069-.149.106-.012.012-.03.018-.043.03a2.603 2.603 0 0 1-.136.094l.018.037h.007l.26-.037h.006c.161-.025.322-.056.483-.087.044-.006.093-.019.137-.031l.087-.019c.043-.006.086-.018.13-.024.037-.013.074-.02.111-.031.62-.15 1.221-.354 1.798-.595a9.926 9.926 0 0 1-3.85 3.142c.714-.05 1.426-.167 2.114-.366a9.903 9.903 0 0 0 5.857-4.68 9.893 9.893 0 0 1-1.667 3.986 9.758 9.758 0 0 0 1.655-1.376 9.824 9.824 0 0 0 2.61-5.268c.21.98.272 1.99.18 2.987 4.474-6.241.371-12.712-1.346-14.416-.006-.013-.012-.019-.012-.031-.006.006-.006.006-.006.012 0-.006 0-.006-.007-.012 0 .074-.006.148-.012.223a8.34 8.34 0 0 1-.062.415c-.03.136-.068.273-.105.41-.044.13-.093.266-.15.396a5.322 5.322 0 0 1-.185.378 4.735 4.735 0 0 1-.477.688c-.093.111-.192.21-.292.31a3.994 3.994 0 0 1-.18.155l-.142.124a3.459 3.459 0 0 1-.347.241 4.295 4.295 0 0 1-.366.211c-.13.062-.26.118-.39.174a4.364 4.364 0 0 1-.818.223c-.143.025-.285.037-.422.05a4.914 4.914 0 0 1-.297.012 4.66 4.66 0 0 1-.422-.025 3.137 3.137 0 0 1-.421-.062 3.136 3.136 0 0 1-.415-.105h-.007c.137-.013.273-.025.41-.05a4.493 4.493 0 0 0 .818-.223c.136-.05.266-.112.39-.174.13-.062.248-.13.372-.204.118-.08.235-.161.347-.248.112-.087.217-.18.316-.279.105-.093.198-.198.291-.304.093-.111.18-.223.26-.334.013-.019.026-.044.038-.062.062-.1.124-.199.18-.298a4.272 4.272 0 0 0 .334-.775c.044-.13.075-.266.106-.403.025-.142.05-.278.062-.415.012-.142.025-.285.025-.421 0-.1-.007-.199-.013-.298a6.726 6.726 0 0 0-.05-.415 4.493 4.493 0 0 0-.092-.415c-.044-.13-.087-.267-.137-.397-.05-.13-.111-.26-.173-.384-.069-.124-.137-.248-.211-.366a6.843 6.843 0 0 0-.248-.34c-.093-.106-.186-.212-.285-.317a3.878 3.878 0 0 0-.161-.155c-.28-.217-.57-.421-.862-.607a1.154 1.154 0 0 0-.124-.062 2.415 2.415 0 0 0-.589-.26Z"/>
    </svg>
  ),
};

function ToolkitCard({ item }) {
  const icon = TOOL_ICONS[item.name];
  return (
    <div className="tool-card">
      <span className={`tool-icon ${item.color}`}>{icon ?? null}</span>
      <span className="tool-name">{item.name}</span>
      <span className="tool-tags">{item.tech}</span>
    </div>
  );
}

function DataLab() {
  const [running, setRunning] = useState(false);
  return <div className="lab-shell"><div className="lab-bar"><span><i className="live-dot"/> DATA LAB / DEMO</span><span>recaudacion_2026.csv <span className="lab-dots">•••</span></span></div><div className="lab-body"><div className="dataset-summary"><span className="lab-kicker">DATASET</span><h3>recaudacion_2026.csv</h3><p>Municipal revenue exploration</p><button className={`run-button ${running ? "running" : ""}`} onClick={() => setRunning(!running)}><Play size={14} fill="currentColor"/>{running ? "PROCESSING..." : "RUN ANALYSIS"}</button></div><div className="data-metrics"><div><span>ROWS</span><strong className={running ? "counting" : ""}>10,482</strong></div><div><span>COLUMNS</span><strong>18</strong></div><div><span>NULL VALUES</span><strong className="yellow-text">42</strong></div><div><span>PROCESSING TIME</span><strong className="mint-text">0.84s</strong></div></div><div className="data-bars"><span>DATA TYPES</span><div className="data-bar-row"><i style={{width:"82%"}}/><b>TEXT 42%</b></div><div className="data-bar-row"><i style={{width:"58%"}}/><b>INTEGER 31%</b></div><div className="data-bar-row"><i style={{width:"36%"}}/><b>DATE 18%</b></div><div className="data-bar-row"><i style={{width:"18%"}}/><b>BOOLEAN 09%</b></div></div></div><div className="lab-terminal"><span>&gt; SELECT * FROM insights;</span><span className={running ? "terminal-active" : ""}>{running ? "&gt; transforming_data... model_ready ✓" : ">&nbsp; awaiting analysis..."}</span></div></div>;
}

function ProjectChart({ type }) {
  if (type === "system") {
    return (
      <div className="system-visual factu-arch">
        <div className="factu-tree-container">
          {/* TIER 1: PLATFORM */}
          <div className="factu-t1">
            <div className="factu-box platform">
              <span className="factu-dot" />
              <div className="factu-box-info">
                <strong>FACTUONLINE</strong>
                <small>PLATFORM</small>
              </div>
            </div>
          </div>

          {/* CONNECTOR 1: PLATFORM -> CLIENT & API */}
          <div className="factu-wire-wrap">
            <svg viewBox="0 0 600 14" fill="none" className="factu-wire-svg" preserveAspectRatio="none">
              <line x1="300" y1="0" x2="300" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="150" y1="7" x2="450" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="150" y1="7" x2="150" y2="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="146,10 150,14 154,10" fill="currentColor" />
              <line x1="450" y1="7" x2="450" y2="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="446,10 450,14 454,10" fill="currentColor" />
            </svg>
          </div>

          {/* TIER 2: CLIENT & API */}
          <div className="factu-t2">
            <div className="factu-col">
              <div className="factu-box client">
                <strong>CLIENT</strong>
                <small>React</small>
              </div>
            </div>
            <div className="factu-col">
              <div className="factu-box api">
                <strong>API</strong>
                <small>NestJS</small>
              </div>
            </div>
          </div>

          {/* CONNECTOR 2: API -> 3 MODULES */}
          <div className="factu-wire-wrap">
            <svg viewBox="0 0 600 14" fill="none" className="factu-wire-svg" preserveAspectRatio="none">
              <line x1="450" y1="0" x2="450" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="100" y1="7" x2="500" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="100" y1="7" x2="100" y2="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="96,10 100,14 104,10" fill="currentColor" />
              <line x1="300" y1="7" x2="300" y2="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="296,10 300,14 304,10" fill="currentColor" />
              <line x1="500" y1="7" x2="500" y2="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="496,10 500,14 504,10" fill="currentColor" />
            </svg>
          </div>

          {/* TIER 3: BILLING, COMMERCIAL, TENANT */}
          <div className="factu-t3">
            <div className="factu-col">
              <div className="factu-box module">
                <strong>BILLING SERVICE</strong>
                <small>PHP · Invoicing</small>
              </div>
            </div>
            <div className="factu-col">
              <div className="factu-box module">
                <strong>COMMERCIAL</strong>
                <small>Orders & Modules</small>
              </div>
            </div>
            <div className="factu-col">
              <div className="factu-box module">
                <strong>TENANT / PROV</strong>
                <small>Multi-Tenant</small>
              </div>
            </div>
          </div>

          {/* CONNECTOR 3: 3 MODULES -> DATABASE */}
          <div className="factu-wire-wrap">
            <svg viewBox="0 0 600 14" fill="none" className="factu-wire-svg" preserveAspectRatio="none">
              <line x1="100" y1="0" x2="100" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="300" y1="0" x2="300" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="500" y1="0" x2="500" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="100" y1="7" x2="500" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line x1="300" y1="7" x2="300" y2="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="296,10 300,14 304,10" fill="currentColor" />
            </svg>
          </div>

          {/* TIER 4: DATABASE */}
          <div className="factu-t4">
            <div className="factu-box database">
              <strong>DATABASE</strong>
              <small>PostgreSQL</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "municipal") {
    return (
      <div className="municipal-pipeline-visual">
        <div className="pipe-header">
          <div className="pipe-header-title">
            <span className="pipe-header-dot" />
            <span>ETL &amp; BI PIPELINE</span>
          </div>
          <span className="pipe-header-tag">DATA PROCESS</span>
        </div>

        <div className="pipe-nodes-wrapper">
          {/* STAGE 1: DATA */}
          <div className="pipe-node pipe-node--source">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><Database size={13} /></span>
              <strong>SQL Server</strong>
            </div>
            <span className="pipe-node-phase">DATA</span>
          </div>

          {/* CONNECTOR 1 */}
          <div className="pipe-connector">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 2: TRANSFORMATION */}
          <div className="pipe-node pipe-node--etl pipe-node--ssis">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><Layers size={13} /></span>
              <strong>SSIS / ETL</strong>
            </div>
            <span className="pipe-node-phase pipe-phase--ssis">TRANSFORMATION</span>
          </div>

          {/* CONNECTOR 2 */}
          <div className="pipe-connector">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 3: MODEL */}
          <div className="pipe-node pipe-node--model">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><Table size={13} /></span>
              <strong>Data Model</strong>
            </div>
            <span className="pipe-node-phase">MODEL</span>
          </div>

          {/* CONNECTOR 3 */}
          <div className="pipe-connector">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 4: ANALYTICS */}
          <div className="pipe-node pipe-node--dax">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><span className="pipe-fx">fx</span></span>
              <strong>DAX</strong>
            </div>
            <span className="pipe-node-phase">ANALYTICS</span>
          </div>

          {/* CONNECTOR 4 */}
          <div className="pipe-connector pipe-connector--to-pbi">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 5: VISUALIZATION (Power BI) */}
          <div className="pipe-node pipe-node--pbi">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><PowerBiLogo size={14} /></span>
              <strong>Power BI</strong>
            </div>
            <span className="pipe-node-phase pipe-phase--pbi">VISUALIZATION</span>
          </div>
        </div>
      </div>
    );
  }
  if (type === "forecasting") {
    return (
      <div className="forecasting-pipeline-visual">
        <div className="pipe-header">
          <div className="pipe-header-title">
            <span className="pipe-header-dot pipe-header-dot--py" />
            <span>PREDICTIVE MODELING PIPELINE</span>
          </div>
          <span className="pipe-header-tag">DATA SCIENCE / 2027</span>
        </div>

        <div className="pipe-nodes-wrapper">
          {/* STAGE 1: HISTORICAL REVENUE */}
          <div className="pipe-node pipe-node--source">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><Database size={13} /></span>
              <strong>Historical Revenue</strong>
            </div>
            <span className="pipe-node-phase">TIME SERIES</span>
          </div>

          {/* CONNECTOR 1 */}
          <div className="pipe-connector">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 2: PANDAS & NUMPY */}
          <div className="pipe-node pipe-node--stats">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><Table size={13} /></span>
              <strong>Pandas &amp; NumPy</strong>
            </div>
            <span className="pipe-node-phase pipe-phase--stats">EDA &amp; STATS</span>
          </div>

          {/* CONNECTOR 2 */}
          <div className="pipe-connector">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 3: FEATURE ENGINEERING */}
          <div className="pipe-node pipe-node--features">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><Layers size={13} /></span>
              <strong>Feature Engineering</strong>
            </div>
            <span className="pipe-node-phase">SEASONALITY</span>
          </div>

          {/* CONNECTOR 3 */}
          <div className="pipe-connector pipe-connector--to-py">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 4: MACHINE LEARNING */}
          <div className="pipe-node pipe-node--py">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><PythonLogo size={14} /></span>
              <strong>Machine Learning</strong>
            </div>
            <span className="pipe-node-phase pipe-phase--py">MODELING</span>
          </div>

          {/* CONNECTOR 4 */}
          <div className="pipe-connector pipe-connector--to-py">
            <svg viewBox="0 0 16 7" fill="none" className="pipe-connector-svg">
              <line x1="8" y1="0" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <polygon points="5.5,3.5 8,6.5 10.5,3.5" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 5: 2027 FORECAST */}
          <div className="pipe-node pipe-node--forecast">
            <div className="pipe-node-left">
              <span className="pipe-node-icon"><MoveUpRight size={13} /></span>
              <strong>2027 Forecast</strong>
            </div>
            <span className="pipe-node-phase pipe-phase--forecast">PROJECTION</span>
          </div>
        </div>
      </div>
    );
  }
  const bars = type === "inventory" ? [42, 72, 56, 84, 63, 91, 70] : [34, 50, 44, 68, 53, 79, 88];
  return <div className="project-chart"><div className="chart-kpi"><span>{type === "inventory" ? "STOCK FLOW" : "REVENUE TREND"}</span><strong>{type === "inventory" ? "ANALYSIS" : "TRACKING"}</strong></div><div className="chart-grid"><svg viewBox="0 0 300 100" preserveAspectRatio="none"><polyline points={bars.map((value, index) => `${index * 50},${100 - value}`).join(" ")} /></svg>{bars.map((value, index) => <i key={index} style={{height: `${value}%`}}/> )}</div><div className="chart-axis"><span>JAN</span><span>MAR</span><span>JUN</span><span>SEP</span><span>DEC</span></div></div>;
}

function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash === "#factuonline") return "factuonline";
      if (window.location.hash === "#municipal-revenue") return "municipal-revenue";
      return "portfolio";
    }
    return "portfolio";
  });
  const [open, setOpen] = useState(false);
  const [pipelineActive, setPipelineActive] = useState(2);
  useReveal(view);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#factuonline") {
        setView("factuonline");
        window.scrollTo(0, 0);
      } else if (window.location.hash === "#municipal-revenue") {
        setView("municipal-revenue");
        window.scrollTo(0, 0);
      } else {
        setView("portfolio");
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", handleHash);
    };
  }, []);

  const navigateToCaseStudy = () => {
    window.location.hash = "factuonline";
    setView("factuonline");
    window.scrollTo(0, 0);
  };

  const navigateToMunicipalCaseStudy = () => {
    window.location.hash = "municipal-revenue";
    setView("municipal-revenue");
    window.scrollTo(0, 0);
  };

  const navigateToPortfolio = () => {
    setView("portfolio");
    if (window.location.hash) {
      try {
        history.pushState(null, "", window.location.pathname + window.location.search);
      } catch {
        window.location.hash = "";
      }
    }
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
  };

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
      <div className="site" style={{ display: view !== "portfolio" ? "none" : "block" }}>
        <header className="nav"><button className="brand" onClick={() => scrollTo("home")}>CHRISTIAN<span>.</span></button><nav className={open ? "navlinks open" : "navlinks"}><button onClick={() => scrollTo("about")}>ABOUT</button><button onClick={() => scrollTo("experience")}>EXPERIENCE</button><button onClick={() => scrollTo("projects")}>PROJECTS</button>{/* <button onClick={() => scrollTo("lab")}>DATA LAB</button> */}<button onClick={() => scrollTo("contact")}>CONTACT</button></nav><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></header><main>
          <section id="home" className="hero section"><div className="hero-inner"><div className="hero-copy reveal"><div className="eyebrow"><i className="live-dot"/> DATA ANALYST / LIMA, PERU</div><h1>CHRISTIAN<br/><em>GUTIERREZ</em></h1><div className="hero-role"><strong>DATA ANALYST · BI DEVELOPER</strong><span>ASPIRING DATA SCIENTIST</span></div><p>I combine Data Analytics, Business Intelligence, data visualization, Data Engineering, and software development to transform information into actionable insights, strategic decisions, and robust systems.</p><div className="hero-actions"><button className="primary" onClick={() => scrollTo("projects")}>VIEW MY WORK <ArrowDown size={16}/></button><a className="text-btn" href={`${import.meta.env.BASE_URL}cv/christian-gutierrez-cv.pdf`} target="_blank" rel="noreferrer">DOWNLOAD CV <ArrowDown size={16}/></a><button className="text-btn" onClick={() => scrollTo("contact")}>CONTACT ME <ArrowUpRight size={16}/></button></div></div><ProfilePhoto/></div><DataNetwork/><div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>SQL <b>/</b> POWER BI <b>/</b> PYTHON <b>/</b> DATA <b>/</b> SSIS </span></div></section>
    <section id="about" className="section story"><SectionLabel index="01">FROM OPERATIONS TO DATA</SectionLabel><div className="story-grid reveal"><div><h2>Curiosity<br/><span>became method.</span></h2><p>I work with real data and real problems, striving to understand information, uncover patterns, and turn them into actionable insights for better decisions.</p></div>        <div className="journey">
          <div className="journey-line"/>
          <div className="journey-step"><span>01</span><strong>INVENTORY</strong><small>Operations & control</small></div>
          <div className="journey-step"><span>02</span><strong>DATA MANAGEMENT</strong><small>Quality & structure</small></div>
          <div className="journey-step"><span>03</span><strong>ANALYTICS</strong><small>SQL & reporting</small></div>
          <div className="journey-step current"><span>04</span><strong>BUSINESS INTELLIGENCE</strong><small>Power BI & decisions</small></div>
          <div className="journey-step next"><span>05</span><strong>DATA SCIENCE</strong><small>Python & statistics</small></div>
        </div></div></section>
    <section id="toolkit" className="section toolkit"><SectionLabel index="02">MY DATA TOOLKIT</SectionLabel><div className="section-intro reveal"><h2>Tools to focus on<br/><span>what truly matters.</span></h2><p>SQL Server, Power BI, DAX, Power Query, Advanced Excel, Python, ETL, and SSIS for data; React, NestJS, TypeScript, PostgreSQL, REST APIs, and Git / GitHub for digital solutions.</p></div><div className="tool-grid reveal">{toolkit.map((item) => <ToolkitCard key={item.name} item={item}/>)}</div></section>
    {/* <section id="lab" className="section lab-section"><SectionLabel index="03">DATA LAB</SectionLabel><div className="section-intro reveal"><h2>A compact<br/><span>analysis workspace.</span></h2><p>A visual exploration of how I evaluate a dataset before turning it into a decision. Demo with mock data.</p></div><div className="reveal"><DataLab/></div></section> */}
    <section className="section pipeline-section"><SectionLabel index="03">DATA PIPELINE</SectionLabel><div className="section-intro reveal"><h2>From raw file to<br/><span>insight.</span></h2><p>Visualization quality begins long before rendering the chart.</p></div><div className="pipeline reveal">{pipeline.map(([name, description], index) => <button className={`pipeline-step ${pipelineActive === index ? "selected" : ""}`} key={name} onMouseEnter={() => setPipelineActive(index)} onFocus={() => setPipelineActive(index)}><span className="pipeline-number">0{index + 1}</span><strong>{name}</strong>{index < pipeline.length - 1 && <i className="pipeline-connector"/>}<div className="pipeline-tooltip">{description}</div></button>)}</div></section>
    <section id="projects" className="section projects"><SectionLabel index="04">SELECTED PROJECTS</SectionLabel><div className="section-intro reveal"><h2>Cases where data<br/><span>drives real action.</span></h2><p>Projects built from operational reality: connecting information, systems, and strategic decisions.</p></div><div className="project-list">{projects.map((project) => <article className="project-case reveal" key={project.title}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div><div className="project-content"><div>{project.title === "FactuOnLine" && (<div className="project-company-ref"><img src={`${import.meta.env.BASE_URL}images/factuonline/logo.webp`} alt="I-On Line Software Perú" className="project-company-logo" loading="lazy" decoding="async" /><span>I-On Line Software Perú</span></div>)}{project.title === "Municipal Revenue Analytics" && (<div className="project-company-ref project-tech-ref"><PowerBiLogo size={18} className="project-company-logo" /><span>Microsoft Power BI · Data Analytics</span></div>)}{project.title === "Revenue Forecasting 2027" && (<div className="project-company-ref project-tech-ref project-tech-ref--python"><PythonLogo size={18} className="project-company-logo" /><span>Python · Predictive Analytics &amp; Machine Learning</span></div>)}<h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag} className={tag === "Power BI" ? "tag-pbi" : tag === "SSIS" ? "tag-ssis" : tag === "Python" ? "tag-python" : tag === "Machine Learning" || tag === "Predictive Analytics" ? "tag-ds" : ""}>{tag}</span>)}</div>{project.title === "FactuOnLine" ? (<a href="#factuonline" onClick={(e) => { e.preventDefault(); navigateToCaseStudy(); }} className="case-link">VIEW CASE <ArrowUpRight size={16}/></a>) : project.title === "Municipal Revenue Analytics" ? (<a href="#municipal-revenue" onClick={(e) => { e.preventDefault(); navigateToMunicipalCaseStudy(); }} className="case-link">VIEW CASE <ArrowUpRight size={16}/></a>) : (<span className="case-link case-link--upcoming">IN DEVELOPMENT · PYTHON <i className="live-dot" /></span>)}</div><ProjectChart type={project.chart}/></div></article>)}</div></section>
    <section className="section future"><SectionLabel index="05">THE NEXT DATASET</SectionLabel><div className="future-layout reveal"><div><h2>Data Analytics is where I work today.<br/><em>Data Science is where I'm heading.</em></h2><p>I am building the next stage with discipline: deepening my knowledge in Python, statistics, automation, and advanced analysis while staying closely connected to business needs.</p></div><div className="roadmap"><div className="roadmap-col done"><span>NOW</span><h3>DATA ANALYTICS</h3>{["SQL Server", "Power BI", "Python", "Excel", "DAX", "Power Query", "SSIS", "Data Cleaning", "Data Modeling", "ETL", "Data Visualization", "Reporting"].map((item) => <p key={item}><Check size={14}/>{item}</p>)}</div><div className="roadmap-arrow">→</div><div className="roadmap-col next"><span>NEXT</span><h3>DATA SCIENCE</h3>{["Python", "Statistics", "Probability", "NumPy", "Pandas", "Exploratory Data Analysis", "Data Visualization", "Statistical Modeling", "Feature Engineering", "Machine Learning", "Predictive Analytics", "Advanced Analysis"].map((item) => <p key={item}><MoveUpRight size={14}/>{item}</p>)}</div></div></div></section>
    <section id="experience" className="section experience"><SectionLabel index="06">EXPERIENCE</SectionLabel><div className="experience-head reveal"><h2>Experience that<br/><span>builds deep context.</span></h2><p>From warehouse operations and inventory to municipal tax data analytics and digital software solutions. Every stage shaped a sharper way to interpret data.</p></div><div className="timeline reveal"><article><span>2021 — 2024</span><i/><div><h3>Corporación Mendoza</h3><p>Warehouse Operations Analyst</p><small>Inventory · historical analysis · process optimization</small></div></article><article><span>2024</span><i/><div><h3>Kasumi S.A.C.</h3><p>Inventory Auditor & Operations Administrator</p><small>Data auditing · discrepancy analysis · workflow digitization</small></div></article><article className="timeline-current"><span>2025 — PRESENT</span><i/><div><h3>Municipalidad de Lurigancho-Chosica</h3><p>Data Analyst / Statistical Database Analyst</p><small>SQL Server · Power BI · DAX · Excel · ETL · SSIS · Power Query · Python</small></div></article><article><span>SOFTWARE / SAAS</span><i/><div><h3>FactuOnLine</h3><p>Software / SaaS Developer</p><small>React · NestJS · TypeScript · PostgreSQL · SaaS · REST APIs</small></div></article></div></section>
    <section id="cv" className="section cv-section"><SectionLabel index="07">CURRICULUM VITAE</SectionLabel><div className="cv-layout reveal"><div><h2>The complete<br/><span>document.</span></h2><p>Experience, education, and technical toolkit in a single overview.</p><a className="primary" href={`${import.meta.env.BASE_URL}cv/christian-gutierrez-cv.pdf`} target="_blank" rel="noreferrer">DOWNLOAD CV <ArrowDown size={16}/></a></div><iframe className="cv-embed" src={`${import.meta.env.BASE_URL}cv/christian-gutierrez-cv.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0`} title="Preview of Christian Gutierrez's CV" scrolling="no"><a href={`${import.meta.env.BASE_URL}cv/christian-gutierrez-cv.pdf`}>Open CV</a></iframe></div></section>
    <section id="contact" className="contact"><div className="section contact-inner"><SectionLabel index="08">CONTACT</SectionLabel><h2>Let's build something<br/><span>with data.</span></h2><p>I am open to opportunities, projects, and challenges in Data Analytics, Business Intelligence, and Data Science.</p><div className="contact-emails"><a href="mailto:christhiangutierrezrosas@gmail.com">christhiangutierrezrosas@gmail.com</a><a href="mailto:christian.gutierrezr@outlook.com">christian.gutierrezr@outlook.com</a></div><div className="socials"><a href="https://www.linkedin.com/in/christhian-jhunior-gutierrez-rosas-281224278/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://github.com/christian-97" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a></div></div></section>
  </main><footer><span>DATA ANALYST / ASPIRING DATA SCIENTIST</span><button onClick={() => scrollTo("home")} aria-label="Back to top"><ChevronDown size={17}/></button></footer></div>
      {view === "factuonline" && <FactuOnlineCaseStudy onBack={navigateToPortfolio} />}
      {view === "municipal-revenue" && <MunicipalRevenueCaseStudy onBack={navigateToPortfolio} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
