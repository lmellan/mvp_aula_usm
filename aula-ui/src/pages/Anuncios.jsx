// src/pages/Anuncios.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import HeroCurso from "../components/HeroCurso"; // <-- faltaba

/** Contenedor unificado (igual que HomeCurso/Modulos/Evaluaciones) */
const CONTAINER = "max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16";

/** Datos de avisos */
const NEWS = [
  { id: "t2", icon: "campaign", title: "Resultados Tarea 2 publicados", body: "Revisa tu calificación en la sección de Calificaciones.", meta: "Ayudante — hace 1 días", tags: ["ayudante"] },
  { id: "c2", icon: "priority_high", title: "Cambio de fecha Certamen 2", body: "Estimadas/os, debido a ajustes de coordinación con otros cursos y ...", meta: "Publicado por Profesor German Fernandez — hace 2 días", tags: ["profesor", "importante"], to: "/detalle-aviso" },
  { id: "t1", icon: "campaign", title: "Resultados Tarea 1 publicados", body: "Revisa tu calificación en la sección de Calificaciones.", meta: "Ayudante — hace 3 días", tags: ["ayudante"] },
  { id: "lec2", icon: "school", title: "Lectura recomendada Unidad 2", body: "Se agregó un paper opcional para profundizar en recursión.", meta: "Profesor — hace 6 días", tags: ["profesor"] },
  { id: "revx", icon: "groups", title: "Revisión extra de proyectos", body: "Habrá bloque adicional de revisión este viernes 17:00.", meta: "Ayudante — hace 1 semana", tags: ["ayudante", "importante"] },
];

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "profesor", label: "Profesor" },
  { key: "ayudante", label: "Ayudante" },
  { key: "importante", label: "Importantes" },
];

export default function Anuncios() {
  const [active, setActive] = useState("todos");

  const items = useMemo(() => {
    if (active === "todos") return NEWS;
    return NEWS.filter((n) => n.tags.includes(active));
  }, [active]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar />

      <main className="flex-1 pt-16">
        {/* HERO: mismo ancho que en Modulos/Evaluaciones */}
        <div className={CONTAINER}>
        <HeroCurso containerClass={CONTAINER} />
        </div>
        
        {/* Tabs / Nav — mismo ancho que Modulos */}
        <div className={`${CONTAINER} mt-6`}>
          <nav aria-label="Secciones del curso" className="mb-6">
            <div className="border-b border-border-light dark:border-border-dark">
              <div className="flex flex-wrap gap-4 -mb-px">
                <span
                  className="px-3 py-2 font-semibold text-primary-DEFAULT border border-border-light border-b-0 rounded-t-lg bg-card-light shadow-sm"
                  aria-current="page"
                >
                  Información General
                </span>
                <Link to="/modulos" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Material
                </Link>
                <Link to="/tareas" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Tareas
                </Link>
                <Link to="/evaluaciones" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Calificaciones
                </Link>
                <Link to="/foro" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Foro
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Contenido principal — mismo contenedor y con padding vertical */}
        <div className={`${CONTAINER} pb-8`}>
          {/* Encabezado + volver */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-primary-DEFAULT">Noticias y Avisos</h2>
            <Link
              to="/curso"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark text-sm font-semibold hover:bg-background-light dark:hover:bg-background-dark transition-colors"
              aria-label="Volver a Información General"
            >
              <span className="material-icons !text-[18px]">arrow_back</span>
              Volver a Información General
            </Link>
          </div>

          {/* Filtros – siempre legibles, activo en azul */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTERS.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  className={[
                    "px-3 py-1.5 rounded-full border text-sm transition-colors",
                    "border-border-light dark:border-border-dark",
                    isActive
                      ? "bg-primary-light text-white"
                      : "bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark",
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Anuncios en fila (scroll horizontal y snap) */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin">
              {items.map((n) => {
                const CardInner = (
                  <div className="flex items-start gap-4">
                    <span className="material-icons text-primary-light mt-1" aria-hidden="true">
                      {n.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-text-light dark:text-text-dark">{n.title}</h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark">{n.body}</p>
                      <span className="text-xs text-subtle-light dark:text-subtle-dark">{n.meta}</span>
                    </div>
                  </div>
                );

                const classes =
                  "min-w-[320px] md:min-w-[380px] lg:min-w-[420px] snap-start bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow";

                return n.to ? (
                  <Link key={n.id} to={n.to} className={classes}>
                    {CardInner}
                    <span className="sr-only">Ir al detalle del aviso</span>
                  </Link>
                ) : (
                  <article key={n.id} className={classes}>
                    {CardInner}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mensaje si no hay items */}
          {items.length === 0 && (
            <p className="mt-4 text-sm text-subtle-light dark:text-subtle-dark">No hay avisos para este filtro.</p>
          )}
        </div>
      </main>
    </div>
  );
}
