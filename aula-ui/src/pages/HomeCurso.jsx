// src/pages/HomeCurso.jsx
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function HomeCurso() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar />

      <main className="flex-1 pt-16">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-6">
          {/* Hero */}
          <section
            className="bg-primary-DEFAULT text-white rounded-lg p-6 md:p-8 mb-8 shadow-lg min-h-40 md:min-h-48 flex items-center"
            style={{
              background:
                "linear-gradient(rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.85)), url('https://aula.usm.cl/pluginfile.php/7197544/course/overviewfiles/intro.png') no-repeat center center / cover",
            }}
          >
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">IWI131 - Programación</h1>
              <p className="text-base md:text-lg opacity-90">Departamento de Informática</p>
              <p className="text-base md:text-lg opacity-90">2024 - Semestre 1</p>
            </div>
          </section>

          {/* Tabs */}
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

          {/* Noticias y Avisos */}
          <section id="avisos" className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark text-center md:text-left">
              Noticias y Avisos
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Aviso 1 */}
              <div className="bg-card-light dark:bg-card-dark p-5 rounded-lg border border-border-light dark:border-border-dark flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="material-icons text-primary-light mt-1">campaign</span>
                <div>
                  <h3 className="font-bold text-text-light dark:text-text-dark">Resultados Tarea 2 publicados</h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark">
                    Revisa tu calificación en la sección de Calificaciones.
                  </p>
                  <span className="text-xs text-subtle-light dark:text-subtle-dark">
                    Ayudante Diego Mella — hace 1 días
                  </span>
                </div>
              </div>

              {/* Aviso 2 (link a detalle) */}
              <Link
                to="/detalle-aviso"
                className="bg-card-light dark:bg-card-dark p-5 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                <div className="flex items-start gap-4">
                  <span className="material-icons text-primary-light mt-1">priority_high</span>
                  <div>
                    <h3 className="font-bold text-text-light dark:text-text-dark">Cambio de fecha Certamen 2</h3>
                    <p className="text-sm text-subtle-light dark:text-subtle-dark">
                      Estimadas/os, debido a ajustes de coordinación con otros cursos y ...
                    </p>
                    <span className="text-xs text-subtle-light dark:text-subtle-dark">
                      Publicado por Profesor German Fernandez — hace 2 días
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* ÚNICO botón: redirige a Anuncios */}
            <div className="pt-2">
              <Link
                to="/anuncios"  /* <-- ajusta si tu ruta es /noticias-avisos */
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border-light dark:border-border-dark text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary-light hover:bg-background-light dark:hover:bg-background-dark transition-colors"
              >
                <span className="material-icons text-sm">unfold_more</span>
                Mostrar más avisos
              </Link>
            </div>
          </section>

          {/* Información General – EN COLUMNA */}
          <section id="informacion-general">
            <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark text-center md:text-left">
              Información General
            </h2>

            <ul className="space-y-3">
              {/* Item 1 */}
              <li className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <Link
                    to="/programa"
                    className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                  >
                    <span className="material-icons text-primary-light mr-3">description</span>
                    Programa del Curso
                  </Link>
                  <Link
                    to="/programa"
                    className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                    aria-label="Ver programa"
                  >
                    visibility
                  </Link>
                </div>
              </li>

              {/* Item 2 */}
              <li className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <Link
                    to="/planificacion"
                    className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                  >
                    <span className="material-icons text-primary-light mr-3">calendar_today</span>
                    Planificación Semestral
                  </Link>
                  <Link
                    to="/planificacion"
                    className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                    aria-label="Ver planificación"
                  >
                    visibility
                  </Link>
                </div>
              </li>

              {/* Item 3 */}
              <li className="bg-card-light dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <Link
                    to="/reglas"
                    className="flex items-center text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                  >
                    <span className="material-icons text-primary-light mr-3">gavel</span>
                    Reglas Generales del Curso
                  </Link>
                  <Link
                    to="/reglas"
                    className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
                    aria-label="Ver reglas"
                  >
                    visibility
                  </Link>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
