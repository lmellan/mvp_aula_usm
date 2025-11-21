// src/pages/Tareas.jsx
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import HeroCurso from "../components/HeroCurso";

const CONTAINER =
  "max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16";

export default function Tareas() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar />

      <main className="flex-1 pt-16">
        {/* HERO: mismo ancho y estilo que HomeCurso */}
        <div className={CONTAINER}>
          <HeroCurso containerClass={CONTAINER} />
        </div>

        {/* Tabs / Nav — mismo ancho y estilo que HomeCurso */}
        <div className={`${CONTAINER} mt-6`}>
          <nav aria-label="Secciones del curso" className="mb-6">
            <div className="border-b border-border-light dark:border-border-dark">
              <div className="flex flex-wrap gap-4 -mb-px">
                <Link
                  to="/curso"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Información General
                </Link>
                <Link
                  to="/modulos"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Material
                </Link>
                {/* Taba activa = Tareas */}
                <span
                  className="px-3 py-2 font-semibold text-primary-DEFAULT border border-border-light border-b-0 rounded-t-lg bg-card-light shadow-sm"
                  aria-current="page"
                >
                  Tareas
                </span>
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

        {/* Contenido principal: mismo CONTAINER que HomeCurso */}
        <div className={CONTAINER}>
          {/* Título sección */}
          <section id="tareas" className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark text-center md:text-left">
              Tareas
            </h2>

            {/* Igual que "Noticias y Avisos": grid para usar mejor el ancho */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tarea 3: pendiente, clickeable */}
              <Link to="/tareas/entregar" className="block">
                <article className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span
                        className="material-icons text-primary-light mt-0.5"
                        aria-hidden="true"
                      >
                        assignment
                      </span>
                      <div>
                        <h3 className="font-medium text-text-light dark:text-text-dark">
                          Tarea 3: Estructuras de Datos Avanzadas
                        </h3>
                        <p className="text-sm text-subtle-light dark:text-subtle-dark">
                          Fecha límite:{" "}
                          <time dateTime="2024-04-22">
                            22 de abril de 2024
                          </time>
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
                      <span
                        className="material-icons !text-[16px]"
                        aria-hidden="true"
                      >
                        hourglass_bottom
                      </span>
                      Pendiente
                    </span>
                  </div>
                </article>
              </Link>

              {/* Tarea 2: entregada */}
              <article className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span
                      className="material-icons text-primary-light mt-0.5"
                      aria-hidden="true"
                    >
                      assignment
                    </span>
                    <div>
                      <h3 className="font-medium text-text-light dark:text-text-dark">
                        Tarea 2: Algoritmos de Ordenamiento
                      </h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark">
                        Fecha límite:{" "}
                        <time dateTime="2024-04-08">
                          8 de abril de 2024
                        </time>
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                    <span
                      className="material-icons !text-[16px]"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    Entregado
                  </span>
                </div>
              </article>

              {/* Tarea 1: entregada */}
              <article className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span
                      className="material-icons text-primary-light mt-0.5"
                      aria-hidden="true"
                    >
                      assignment
                    </span>
                    <div>
                      <h3 className="font-medium text-text-light dark:text-text-dark">
                        Tarea 1: Introducción a la Complejidad Algorítmica
                      </h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark">
                        Fecha límite:{" "}
                        <time dateTime="2024-03-25">
                          25 de marzo de 2024
                        </time>
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                    <span
                      className="material-icons !text-[16px]"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    Entregado
                  </span>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
