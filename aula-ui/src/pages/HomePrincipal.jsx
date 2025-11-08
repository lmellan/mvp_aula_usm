// src/pages/HomePrincipal.jsx
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function HomePrincipal() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      {/* Barra superior reutilizable */}
      <TopBar />

      {/* Contenido: compensa header fijo con pt-16 */}
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6">
          {/* Hero */}
          <section
            className="bg-primary-DEFAULT text-white rounded-lg p-6 mb-8 shadow-lg"
            style={{
              background:
                "linear-gradient(rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.85)), url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop') no-repeat center / cover",
            }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">Bienvenidos</h1>
              <p className="opacity-90">Accede rápidamente a tus cursos del semestre.</p>
            </div>
          </section>

          {/* Mis cursos */}
          <section aria-labelledby="titulo-cursos" className="space-y-4">
            <h2
              id="titulo-cursos"
              className="text-xl font-bold text-text-light dark:text-text-dark"
            >
              Mis cursos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Curso 1 */}
              <Link
                to="/curso"
                className="group block bg-card-light dark:bg-card-dark rounded-lg overflow-hidden shadow hover:shadow-lg border border-border-light dark:border-border-dark transition"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop"
                    alt="Imagen del curso IWI131"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold bg-primary-DEFAULT text-white px-2 py-1 rounded-full">
                    INFORMÁTICA
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold leading-snug text-text-light dark:text-text-dark group-hover:text-primary-light transition-colors">
                    IWI131 · Programación
                  </h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark line-clamp-2">
                    Introducción a la programación y resolución de problemas.
                  </p>
                  <div className="pt-2">
                    <div className="h-2 w-full bg-background-light dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-primary-light" style={{ width: "55%" }} />
                    </div>
                    <p className="mt-1 text-xs text-subtle-light dark:text-subtle-dark">
                      55% completado
                    </p>
                  </div>
                </div>
              </Link>

              {/* Curso 2 */}
              <Link
                to="/curso"
                className="group block bg-card-light dark:bg-card-dark rounded-lg overflow-hidden shadow hover:shadow-lg border border-border-light dark:border-border-dark transition"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
                    alt="Imagen del curso INF343"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold bg-primary-DEFAULT text-white px-2 py-1 rounded-full">
                    INFORMÁTICA
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold leading-snug text-text-light dark:text-text-dark group-hover:text-primary-light transition-colors">
                    INF343 · Sistemas Distribuidos
                  </h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark line-clamp-2">
                    Modelos de concurrencia, comunicación y tolerancia a fallos.
                  </p>
                  <div className="pt-2">
                    <div className="h-2 w-full bg-background-light dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full w-2/5 bg-primary-light" />
                    </div>
                    <p className="mt-1 text-xs text-subtle-light dark:text-subtle-dark">
                      40% completado
                    </p>
                  </div>
                </div>
              </Link>

              {/* Curso 3 */}
              <Link
                to="/curso"
                className="group block bg-card-light dark:bg-card-dark rounded-lg overflow-hidden shadow hover:shadow-lg border border-border-light dark:border-border-dark transition"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                    alt="Imagen del curso INF331"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold bg-primary-DEFAULT text-white px-2 py-1 rounded-full">
                    INFORMÁTICA
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold leading-snug text-text-light dark:text-text-dark group-hover:text-primary-light transition-colors">
                    INF331 · Pruebas de Software
                  </h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark line-clamp-2">
                    Estrategias de testing, cobertura, automatización y QA.
                  </p>
                  <div className="pt-2">
                    <div className="h-2 w-full bg-background-light dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-primary-light" />
                    </div>
                    <p className="mt-1 text-xs text-subtle-light dark:text-subtle-dark">
                      50% completado
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
