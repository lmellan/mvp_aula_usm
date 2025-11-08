// src/pages/Modulos.jsx
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

/* === Componente para cada recurso (PDF / Video) === */
function Recurso({ tipo, nombre }) {
  const icon = tipo === "pdf" ? "picture_as_pdf" : "smart_display";
  const label = tipo === "pdf" ? "PDF" : "VIDEO";

  return (
    <article className="w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-3 flex justify-between items-center shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <span className="material-icons text-sky-500">{icon}</span>
        <div>
          <h4 className="font-medium">{nombre}</h4>
          <p className="text-xs text-subtle-light dark:text-subtle-dark uppercase">{label}</p>
        </div>
      </div>

      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
        Previsualizar
      </button>
    </article>
  );
}

/* === Componente por Módulo === */
function Modulo({ numero, titulo, objetivo, recursos = [], adicionales = [] }) {
  return (
    <section className="space-y-8 w-full">
      {/* === Bloque del título === */}
      <div
        className="relative left-1/2 -translate-x-1/2 
                   w-[130%] md:w-[135%] xl:w-[140%]
                   bg-card-light dark:bg-card-dark 
                   border border-border-light dark:border-border-dark 
                   rounded-lg p-6 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light text-center">
          Módulo {numero}: {titulo}
        </h2>

        <p className="mt-2 text-sm text-subtle-light dark:text-subtle-dark text-center">
          <span className="font-semibold">Objetivo de aprendizaje:</span> {objetivo}
        </p>
      </div>

      {/* === Bloque de clases === */}
      <div
        className="relative left-1/2 -translate-x-1/2 
                   w-[130%] md:w-[135%] xl:w-[140%]
                   bg-card-light dark:bg-card-dark 
                   border border-border-light dark:border-border-dark 
                   rounded-lg p-6 shadow-sm"
      >
        <h3 className="font-semibold text-primary-DEFAULT dark:text-primary-light mb-4 text-center">
          Clases
        </h3>
        <div className="space-y-3">
          {recursos.map((r, idx) => (
            <Recurso key={idx} tipo="pdf" nombre={r} />
          ))}
        </div>
      </div>

      {/* === Bloque de recursos adicionales === */}
      {adicionales.length > 0 && (
        <div
          className="relative left-1/2 -translate-x-1/2 
                     w-[130%] md:w-[135%] xl:w-[140%]
                     bg-card-light dark:bg-card-dark 
                     border border-border-light dark:border-border-dark 
                     rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-semibold text-primary-DEFAULT dark:text-primary-light mb-4 text-center">
            Recursos adicionales
          </h3>
          <div className="space-y-3">
            {adicionales.map((r, idx) => (
              <Recurso key={idx} tipo="video" nombre={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


/* === Página Principal de MÓDULOS === */
export default function Modulos() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar />

      <main className="flex-1 pt-16">

        {/* HERO del curso — igual ancho que Evaluaciones */}
        <section
          className="w-full bg-primary-DEFAULT text-white rounded-none md:rounded-lg p-8 mb-8 shadow-lg min-h-52 md:min-h-56 flex items-center"
          style={{
            background:
              "linear-gradient(rgba(0, 51, 102, 0.88), rgba(0, 51, 102, 0.88)), url('https://aula.usm.cl/pluginfile.php/7197544/course/overviewfiles/intro.png') no-repeat center center / cover",
          }}
        >
          <div className="flex-1 max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-20 xl:px-28">
            <h1 className="text-3xl md:text-4xl font-bold">IWI131 - Programación</h1>
            <p className="text-lg md:text-xl opacity-90">Departamento de Informática</p>
            <p className="text-lg md:text-xl opacity-90">2024 - Semestre 1</p>
          </div>
        </section>
 
        <nav aria-label="Secciones del curso" className="mb-6">
          <div className="border-b border-border-light dark:border-border-dark">
            <div className="flex flex-wrap gap-4 -mb-px">
              <Link
                to="/curso"
                className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
              >
                Información General
              </Link>
              <span className="px-3 py-2 font-semibold text-primary-DEFAULT border border-border-light border-b-0 rounded-t-lg bg-card-light shadow-sm">
                Material
              </span>
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

        {/* Contenido interior con laterales amplios */}
        <div className="w-full mx-auto px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 py-6">

          {/* Contenido de los módulos */}
          <div className="space-y-20 w-full">
            <Modulo
              numero="1"
              titulo="Introducción a la Ingeniería"
              objetivo="Comprender los fundamentos de la ingeniería y su aplicación en la resolución de problemas."
              recursos={[
                "Apuntes de clase 1: Fundamentos de la Ingeniería",
                "Apuntes de clase 2: El Rol del Ingeniero en la Sociedad",
                "Apuntes de clase 3: Proceso de Resolución de Problemas en Ingeniería",
              ]}
              adicionales={["Video introductorio: ¿Qué es la Ingeniería?"]}
            />

            <Modulo
              numero="2"
              titulo="Pensamiento Computacional"
              objetivo="Aplicar la lógica y la abstracción para plantear soluciones algorítmicas."
              recursos={[
                "Clase 1: Algoritmos y Descomposición",
                "Clase 2: Patrones y Generalización",
              ]}
              adicionales={["Video: ¿Qué es Pensamiento Computacional?"]}
            />

            <Modulo
              numero="3"
              titulo="Introducción a la Programación"
              objetivo="Comprender variables, estructuras de control y sintaxis básica."
              recursos={[
                "Clase 1: Variables y Tipos de Datos",
                "Clase 2: Condicionales y Ciclos",
              ]}
              adicionales={["Video: Primeros pasos programando"]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
