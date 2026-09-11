import React, {useMemo, useState} from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, BarChart3, Database, Github, Linkedin, Mail, Menu, X, Code2, Layers3, Sparkles } from "lucide-react";
import "./styles.css";

const projects = [
  {
    title: "FactuOnLine",
    category: "Software",
    tags: ["React", "NestJS", "SaaS", "PostgreSQL"],
    description: "Plataforma SaaS multi-tenant para gestión comercial y facturación electrónica.",
    featured: true
  },
  {
    title: "Dashboard de Recaudación Municipal",
    category: "Dashboard",
    tags: ["Power BI", "SQL Server", "DAX"],
    description: "Análisis ejecutivo de recaudación, deuda, periodos y comportamiento tributario.",
    featured: true
  },
  {
    title: "Análisis de Deuda Tributaria",
    category: "Analytics",
    tags: ["SQL", "Power BI", "Estadística"],
    description: "Exploración y segmentación de cuentas pendientes para apoyar la gestión.",
    featured: false
  },
  {
    title: "Data Analysis Lab",
    category: "Python",
    tags: ["Python", "Pandas", "Statistics"],
    description: "Casos de análisis estadístico y visualización para convertir datos en conclusiones.",
    featured: false
  },
  {
    title: "BI Comercial",
    category: "Dashboard",
    tags: ["Power BI", "DAX", "ETL"],
    description: "Caso de estudio de ventas, clientes, productos, ticket promedio y evolución mensual.",
    featured: false
  },
  {
    title: "SQL Reporting",
    category: "Analytics",
    tags: ["SQL Server", "ETL", "Reporting"],
    description: "Consultas y modelos para automatizar reportes operativos y financieros.",
    featured: false
  }
];

const filters = ["Todos", "Dashboard", "Analytics", "Python", "Software"];

function App() {
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    const base = filter === "Todos" ? projects : projects.filter(p => p.category === filter);
    return expanded || filter !== "Todos" ? base : base.slice(0, 4);
  }, [filter, expanded]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setOpen(false);
  };

  return (
    <div className="site">
      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")}>CHRISTIAN<span>.</span></button>
        <nav className={open ? "navlinks open" : "navlinks"}>
          <button onClick={() => scrollTo("about")}>Sobre mí</button>
          <button onClick={() => scrollTo("services")}>Especialidad</button>
          <button onClick={() => scrollTo("projects")}>Proyectos</button>
          <button onClick={() => scrollTo("contact")}>Contacto</button>
        </nav>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Menú">{open ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="eyebrow"><span className="dot"/> DATA · BI · SOFTWARE</div>
          <h1>Convierto datos<br/><em>en decisiones.</em></h1>
          <p className="hero-copy">
            Soy Christian Gutierrez, Analista de Datos y BI Developer. Diseño dashboards,
            análisis y soluciones digitales que transforman información compleja en algo útil.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => scrollTo("projects")}>Ver proyectos <ArrowDown size={17}/></button>
            <button className="text-btn" onClick={() => scrollTo("contact")}>Trabajemos juntos <ArrowUpRight size={17}/></button>
          </div>
          <div className="hero-photo" aria-label="Espacio para foto de Christian">
            <span>Tu foto</span>
            <small>Christian Gutierrez</small>
          </div>
          <div className="hero-meta">
            <span>Lima, Perú</span><span>Disponible para proyectos</span>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-label">01 — SOBRE MÍ</div>
          <div className="about-grid">
            <div>
              <h2>Data analyst.<br/><span>Builder.</span></h2>
            </div>
            <div className="about-text">
              <p>Soy Analista de Datos y estudiante de Ingeniería de Sistemas. Trabajo con datos, reporting y Business Intelligence, combinando análisis con desarrollo de software.</p>
              <p>Actualmente desarrollo soluciones con SQL Server, Power BI, DAX, Excel, Python y tecnologías web. También construyo <strong>FactuOnLine</strong>, una plataforma SaaS multi-tenant para gestión comercial y facturación electrónica.</p>
              <p>Mi enfoque es simple: entender el problema, trabajar los datos y construir una solución clara.</p>
            </div>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-label">02 — ESPECIALIDAD</div>
          <div className="service-intro">
            <h2>Del dato a la<br/><span>acción.</span></h2>
            <p>Una combinación de análisis, visualización y desarrollo para resolver problemas reales.</p>
          </div>
          <div className="service-grid">
            <article><BarChart3/><span>01</span><h3>Business Intelligence</h3><p>Dashboards ejecutivos, indicadores y modelos de datos con Power BI y DAX.</p></article>
            <article><Database/><span>02</span><h3>Data Analytics</h3><p>SQL, análisis exploratorio, estadística y generación de insights.</p></article>
            <article><Code2/><span>03</span><h3>Data Engineering</h3><p>ETL, transformación, reporting y automatización de procesos de datos.</p></article>
            <article><Layers3/><span>04</span><h3>Software & SaaS</h3><p>Aplicaciones web, APIs y arquitecturas multi-tenant con React y NestJS.</p></article>
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section-label">03 — PORTFOLIO</div>
          <div className="projects-head">
            <div><h2>Trabajo<br/><span>seleccionado.</span></h2></div>
            <p>Una muestra de proyectos de datos, BI y software.</p>
          </div>
          <div className="filters">
            {filters.map(f => <button key={f} className={filter===f ? "active":""} onClick={() => {setFilter(f);setExpanded(true)}}>{f}</button>)}
          </div>
          <div className="project-grid">
            {visible.map((p, i) => (
              <article className={"project-card " + (p.featured ? "featured" : "")} key={p.title}>
                <div className="project-visual">
                  <div className="visual-grid"/>
                  <div className="visual-number">0{i+1}</div>
                  <Sparkles size={19}/>
                </div>
                <div className="project-body">
                  <div className="project-top"><span>{p.category}</span><ArrowUpRight size={18}/></div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
          {filter === "Todos" && !expanded && <button className="load-more" onClick={() => setExpanded(true)}>Ver todos los proyectos <ArrowDown size={16}/></button>}
        </section>

        <section className="section stack">
          <div className="section-label">04 — STACK</div>
          <div className="stack-wrap">
            <h2>Herramientas que<br/><span>uso para construir.</span></h2>
            <div className="skills">
              {["Power BI","SQL Server","DAX","Power Query","Excel","Python","React","NestJS","TypeScript","PostgreSQL","Git","REST APIs"].map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
        </section>

        <section className="manifesto">
          <p>DATA → INSIGHT → DECISION</p>
          <h2>Los datos no son el resultado.<br/><em>Son el punto de partida.</em></h2>
        </section>

        <section id="contact" className="section contact">
          <div className="section-label">05 — CONTACTO</div>
          <h2>¿Tienes un problema<br/>con tus <span>datos?</span></h2>
          <p>Hablemos sobre dashboards, análisis, automatización o soluciones de software.</p>
          <div className="email-list">
            <a className="email" href="mailto:christhiangutierrezrosas@gmail.com">christhiangutierrezrosas@gmail.com <ArrowUpRight/></a>
            <a className="email" href="mailto:christian.gutierrezr@outlook.com">christian.gutierrezr@outlook.com <ArrowUpRight/></a>
          </div>
          <div className="socials">
            <a href="https://www.linkedin.com/in/christhian-jhunior-gutierrez-rosas-281224278/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a>
            <a href="https://github.com/christian-97" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a>
            <a href="mailto:christhiangutierrezrosas@gmail.com" aria-label="Email"><Mail size={19}/></a>
          </div>
        </section>
      </main>

      <footer><span>© 2026 Christian Gutierrez</span><span>Data · BI · Software</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
