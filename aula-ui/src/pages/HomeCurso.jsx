// src/pages/HomeCurso.jsx
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import HeroCurso from "../components/HeroCurso";

import programaCursoPDF from "../documentos/programa_curso.pdf";
import planificacionPDF from "../documentos/planificacion.pdf";
import reglasCursoPDF from "../documentos/Reglas_curso.pdf";

const CONTAINER = "max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16";

export default function HomeCurso() {
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

        <div className={`${CONTAINER} `}>
          {/* Noticias y Avisos */}
          <section id="avisos" className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark text-center md:text-left">
              Noticias y Avisos
            </h2>

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
                      Estimadas/os, debido a ajustes de coordinación con otros
                      cursos y ...
                    </p>
                    <span className="text-xs text-subtle-light dark:text-subtle-dark">
                      Publicado por Profesor German Fernandez — hace 2 días
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
                <span className="material-icons text-sm">unfold_more</span>
                Mostrar más avisos
              </Link>
            </div>
          </section>

          {/* Información General */}
          <section id="informacion-general">
            <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark text-center md:text-left">
              Información General
            </h2>

            <ul className="space-y-3">
              {/* Programa del Curso */}
              <li className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <a
                    href={programaCursoPDF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                  >
                    <span className="material-icons text-primary-light mr-3">
                      description
                    </span>
                    Programa del Curso
                  </a>
                  <a
                    href={programaCursoPDF}
                    target="_blank"
                    rel="noreferrer"
                    className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                    aria-label="Ver programa"
                  >
                    visibility
                  </a>
                </div>
              </li>

              {/* Planificación Semestral */}
              <li className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <a
                    href={planificacionPDF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                  >
                    <span className="material-icons text-primary-light mr-3">
                      calendar_today
                    </span>
                    Planificación Semestral
                  </a>
                  <a
                    href={planificacionPDF}
                    target="_blank"
                    rel="noreferrer"
                    className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                    aria-label="Ver planificación"
                  >
                    visibility
                  </a>
                </div>
              </li>

              {/* Reglas Generales del Curso */}
              <li className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <a
                    href={reglasCursoPDF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                  >
                    <span className="material-icons text-primary-light mr-3">
                      gavel
                    </span>
                    Reglas Generales del Curso
                  </a>
                  <a
                    href={reglasCursoPDF}
                    target="_blank"
                    rel="noreferrer"
                    className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                    aria-label="Ver reglas"
                  >
                    visibility
                  </a>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
