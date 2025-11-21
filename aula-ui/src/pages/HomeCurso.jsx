// src/pages/HomeCurso.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import HeroCurso from "../components/HeroCurso";

import programaCursoPDF from "../documentos/programa_curso.pdf";
import planificacionPDF from "../documentos/planificacion.pdf";
import reglasCursoPDF from "../documentos/Reglas_curso.pdf";

const CONTAINER =
  "max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16";

// orden inicial de secciones en la página
const SECCIONES_INICIALES = ["avisos", "informacion"];

// recursos de Información General (reordenables en modo edición)
const RECURSOS_INICIALES = [
  {
    id: "programa",
    icon: "description",
    label: "Programa del Curso",
    href: programaCursoPDF,
    aria: "Ver programa",
  },
  {
    id: "planificacion",
    icon: "calendar_today",
    label: "Planificación Semestral",
    href: planificacionPDF,
    aria: "Ver planificación",
  },
  {
    id: "reglas",
    icon: "gavel",
    label: "Reglas Generales del Curso",
    href: reglasCursoPDF,
    aria: "Ver reglas",
  },
];

export default function HomeCurso() {
  const [editMode, setEditMode] = useState(false);
  const [ordenSecciones, setOrdenSecciones] = useState(SECCIONES_INICIALES);
  const [recursos, setRecursos] = useState(RECURSOS_INICIALES);

  const [draggedSectionIndex, setDraggedSectionIndex] = useState(null);
  const [draggedResourceIndex, setDraggedResourceIndex] = useState(null);

  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
    if (editMode) {
      setDraggedSectionIndex(null);
      setDraggedResourceIndex(null);
    }
  };

  // ---- Secciones: drag & drop ----
  const handleSectionDragStart = (index) => {
    if (!editMode) return;
    setDraggedSectionIndex(index);
  };

  const handleSectionDrop = (targetIndex) => {
    if (!editMode) return;
    if (
      draggedSectionIndex === null ||
      draggedSectionIndex === targetIndex ||
      draggedSectionIndex < 0
    ) {
      return;
    }

    setOrdenSecciones((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(draggedSectionIndex, 1);
      arr.splice(targetIndex, 0, moved);
      return arr;
    });

    setDraggedSectionIndex(null);
  };

  // ---- Recursos Info General: drag & drop ----
  const handleResourceDragStart = (idx) => {
    if (!editMode) return;
    setDraggedResourceIndex(idx);
  };

  const handleResourceDrop = (targetIdx) => {
    if (!editMode) return;
    if (
      draggedResourceIndex === null ||
      draggedResourceIndex === targetIdx ||
      draggedResourceIndex < 0
    ) {
      return;
    }

    setRecursos((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(draggedResourceIndex, 1);
      arr.splice(targetIdx, 0, moved);
      return arr;
    });

    setDraggedResourceIndex(null);
  };

  // Auto-scroll mientras arrastras
  const handleGlobalDragOver = (e) => {
    if (!editMode) return;
    if (draggedSectionIndex === null && draggedResourceIndex === null) return;

    const edge = 80;
    const y = e.clientY;
    const vh = window.innerHeight;

    if (y < edge) {
      window.scrollBy({ top: -20, behavior: "smooth" });
    } else if (y > vh - edge) {
      window.scrollBy({ top: 20, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar
        showEditToggle={true}
        editMode={editMode}
        onToggleEdit={handleToggleEdit}
      />

      <main className="flex-1 pt-16" onDragOver={handleGlobalDragOver}>
        {/* HERO: ahora sí usando editMode */}
        <div className={CONTAINER}>
          <HeroCurso containerClass={CONTAINER} editMode={editMode} />
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
                <Link
                  to="/modulos"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Material
                </Link>
                <Link
                  to="/tareas"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Tareas
                </Link>
                <Link
                  to="/evaluaciones"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Calificaciones
                </Link>
                <Link
                  to="/foro"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Foro
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className={`${CONTAINER} pb-10`}>
        {editMode && (
          <div className="w-full mx-auto px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 mb-4">
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-100 px-4 py-2 rounded-md flex items-center gap-2 text-sm shadow-sm">
              <span className="material-icons text-base">edit</span>
              <span>
                Estás en <strong>modo edición</strong>. Arrastra secciones y
                recursos para cambiar su orden.
              </span>
            </div>
          </div>
          )}

          {/* Secciones en orden editable */}
          {ordenSecciones.map((key, index) => {
            const isDraggingSection = draggedSectionIndex === index;
            const commonSectionClasses = [
              "mb-10 last:mb-0 transition-transform",
              editMode ? "cursor-grab active:cursor-grabbing" : "",
              isDraggingSection ? "opacity-80 scale-[0.99]" : "opacity-100",
            ].join(" ");

            if (key === "avisos") {
              return (
                <section
                  key="avisos"
                  id="avisos"
                  className={commonSectionClasses}
                  draggable={editMode}
                  onDragStart={() => handleSectionDragStart(index)}
                  onDragOver={(e) => {
                    if (!editMode) return;
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    if (!editMode) return;
                    e.preventDefault();
                    handleSectionDrop(index);
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark text-center md:text-left">
                      Noticias y Avisos
                    </h2>
                    {editMode && (
                      <p className="text-xs text-subtle-light dark:text-subtle-dark">
                        Arrastra esta sección para cambiar su posición.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Aviso 1 */}
                    <div className="bg-card-light dark:bg-card-dark p-5 rounded-lg border border-border-light dark:border-border-dark flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                      <span className="material-icons text-primary-light mt-1">
                        campaign
                      </span>
                      <div>
                        <h3 className="font-bold text-text-light dark:text-text-dark">
                          Resultados Tarea 2 publicados
                        </h3>
                        <p className="text-sm text-subtle-light dark:text-subtle-dark">
                          Revisa tu calificación en la sección de Calificaciones.
                        </p>
                        <span className="text-xs text-subtle-light dark:text-subtle-dark">
                          Ayudante Diego Mella — hace 1 días
                        </span>
                      </div>
                    </div>

                    {/* Aviso 2 */}
                    <Link
                      to="/detalle-aviso"
                      className="bg-card-light dark:bg-card-dark p-5 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-light"
                    >
                      <div className="flex items-start gap-4">
                        <span className="material-icons text-primary-light mt-1">
                          priority_high
                        </span>
                        <div>
                          <h3 className="font-bold text-text-light dark:text-text-dark">
                            Cambio de fecha Certamen 2
                          </h3>
                          <p className="text-sm text-subtle-light dark:text-subtle-dark">
                            Estimadas/os, debido a ajustes de coordinación con
                            otros cursos y ...
                          </p>
                          <span className="text-xs text-subtle-light dark:text-subtle-dark">
                            Publicado por Profesor German Fernandez — hace 2
                            días
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Botón: ir a Anuncios */}
                  <div className="pt-2">
                    <Link
                      to="/anuncios"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border-light dark:border-border-dark text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary-light hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                    >
                      <span className="material-icons text-sm">
                        unfold_more
                      </span>
                      Mostrar más avisos
                    </Link>
                  </div>
                </section>
              );
            }

            // Información General
            return (
              <section
                key="informacion"
                id="informacion-general"
                className={commonSectionClasses}
                draggable={editMode}
                onDragStart={() => handleSectionDragStart(index)}
                onDragOver={(e) => {
                  if (!editMode) return;
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  if (!editMode) return;
                  e.preventDefault();
                  handleSectionDrop(index);
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="text-xl font-bold text-text-light dark:text-text-dark text-center md:text-left">
                    Información General
                  </h2>
                  {editMode && (
                    <p className="text-xs text-subtle-light dark:text-subtle-dark">
                      Arrastra esta sección para cambiar su posición.
                    </p>
                  )}
                </div>

                <ul className="space-y-3">
                  {recursos.map((recurso, idx) => {
                    const isDraggingResource =
                      draggedResourceIndex === idx && editMode;

                    return (
                      <li
                        key={recurso.id}
                        className={[
                          "bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition",
                          editMode ? "cursor-move" : "cursor-pointer",
                          isDraggingResource
                            ? "opacity-80 scale-[0.99]"
                            : "opacity-100",
                        ].join(" ")}
                        draggable={editMode}
                        onDragStart={() => handleResourceDragStart(idx)}
                        onDragOver={(e) => {
                          if (!editMode) return;
                          e.preventDefault();
                        }}
                        onDrop={(e) => {
                          if (!editMode) return;
                          e.preventDefault();
                          handleResourceDrop(idx);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <a
                            href={recurso.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                          >
                            <span className="material-icons text-primary-light mr-3">
                              {recurso.icon}
                            </span>
                            {recurso.label}
                          </a>
                          <a
                            href={recurso.href}
                            target="_blank"
                            rel="noreferrer"
                            className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                            aria-label={recurso.aria}
                          >
                            visibility
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {editMode && (
                  <p className="mt-2 text-xs text-subtle-light dark:text-subtle-dark text-center md:text-left">
                    Arrastra los elementos para cambiar el orden de los
                    recursos.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
