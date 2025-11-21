import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import HeroCurso from "../components/HeroCurso";

// PDFs de módulo 1
import fundamentosPDF from "../documentos/Fundamentos-ingenieria.pdf";
import resolucionPDF from "../documentos/Resolución-problemas.pdf";
import rolIngenieroPDF from "../documentos/Rol-ingeniero.pdf";

const VIDEO_CLASES = "https://www.youtube.com/watch?v=ti315UlVtS4";

// ======================
// Datos iniciales
// ======================
const INITIAL_MODULOS = [
  {
    id: "mod1",
    numero: "1",
    titulo: "Introducción a la Ingeniería",
    objetivo:
      "Comprender los fundamentos de la ingeniería y su aplicación en la resolución de problemas.",
    recursos: [
      {
        id: "m1r1",
        tipo: "pdf",
        nombre: "Apuntes de clase 1: Fundamentos de la Ingeniería",
        href: fundamentosPDF,
      },
      {
        id: "m1r2",
        tipo: "pdf",
        nombre: "Apuntes de clase 2: Resolución de problemas",
        href: resolucionPDF,
      },
      {
        id: "m1r3",
        tipo: "pdf",
        nombre: "Apuntes de clase 3: Rol del Ingeniero",
        href: rolIngenieroPDF,
      },
    ],
    adicionales: [
      {
        id: "m1a1",
        tipo: "video",
        nombre: "Video introductorio: ¿Qué es la Ingeniería?",
        href: VIDEO_CLASES,
      },
    ],
  },
  {
    id: "mod2",
    numero: "2",
    titulo: "Pensamiento Computacional",
    objetivo:
      "Aplicar la lógica y la abstracción para plantear soluciones algorítmicas.",
    recursos: [
      {
        id: "m2r1",
        tipo: "pdf",
        nombre: "Clase 1: Algoritmos y Descomposición",
        href: VIDEO_CLASES,
      },
      {
        id: "m2r2",
        tipo: "pdf",
        nombre: "Clase 2: Patrones y Generalización",
        href: VIDEO_CLASES,
      },
    ],
    adicionales: [
      {
        id: "m2a1",
        tipo: "video",
        nombre: "Video: ¿Qué es Pensamiento Computacional?",
        href: VIDEO_CLASES,
      },
    ],
  },
  {
    id: "mod3",
    numero: "3",
    titulo: "Introducción a la Programación",
    objetivo:
      "Comprender variables, estructuras de control y sintaxis básica.",
    recursos: [
      {
        id: "m3r1",
        tipo: "pdf",
        nombre: "Clase 1: Variables y Tipos de Datos",
        href: VIDEO_CLASES,
      },
      {
        id: "m3r2",
        tipo: "pdf",
        nombre: "Clase 2: Condicionales y Ciclos",
        href: VIDEO_CLASES,
      },
    ],
    adicionales: [
      {
        id: "m3a1",
        tipo: "video",
        nombre: "Video: Primeros pasos programando",
        href: VIDEO_CLASES,
      },
    ],
  },
];

// ======================
// Recurso (item)
// ======================
function Recurso({ tipo, nombre, href, ariaLabel, editMode, draggableProps }) {
  const icon = tipo === "pdf" ? "picture_as_pdf" : "smart_display";
  const label = tipo === "pdf" ? "PDF" : "VIDEO";

  return (
    <article
      className={`recurso-card w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-3 shadow-sm hover:shadow-md transition ${
        editMode ? "cursor-move" : "cursor-pointer"
      }`}
      {...(editMode ? draggableProps : {})}
    >
      <div className="flex items-center justify-between">
        {/* Enlace principal: icono + nombre + etiqueta (como HomeCurso) */}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-sm text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
        >
          <span className="material-icons text-sky-500">{icon}</span>
          <div>
            <h4 className="font-medium">{nombre}</h4>
            <p className="text-xs text-subtle-light dark:text-subtle-dark uppercase">
              {label}
            </p>
          </div>
        </a>

        {/* Icono de ver */}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="material-icons text-subtle-light dark:text-subtle-dark hover:text-primary-light transition-colors"
          aria-label={ariaLabel ?? "Ver recurso"}
        >
          visibility
        </a>
      </div>
    </article>
  );
}

// ======================
// Módulo completo (1 tarjeta)
// ======================
function Modulo({
  modulo,
  index,
  editMode,
  isDragging,
  onModuleDragStart,
  onModuleDrop,
  onResourceDragStart,
  onResourceDrop,
}) {
  const { numero, titulo, objetivo, recursos, adicionales } = modulo;
  const [collapsed, setCollapsed] = useState(false);

  const cardRef = useRef(null);

  const handleToggleCollapsed = (e) => {
    e.stopPropagation(); // que no interfiera con drag
    setCollapsed((prev) => !prev);
  };

  const handleDragStart = (e) => {
    if (!editMode) return;

    // Si el drag empezó dentro de un recurso, NO hacer drag del módulo
    if (e.target && e.target.closest(".recurso-card")) {
      return;
    }

    onModuleDragStart(index);
    e.dataTransfer.effectAllowed = "move";

    if (cardRef.current && e.dataTransfer.setDragImage) {
      const original = cardRef.current;
      const rect = original.getBoundingClientRect();

      // Creamos clon para arrastre
      const clone = original.cloneNode(true);

      // Forzar versión colapsada del clon (solo cabecera)
      const body = clone.querySelector(".modulo-body");
      if (body) body.style.display = "none";

      // Wrapper para drag image
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.top = "-9999px";
      wrapper.style.left = "-9999px";
      wrapper.style.width = rect.width + "px";
      wrapper.style.transform = "scale(0.9)"; // 90%
      wrapper.style.opacity = "0.9";
      wrapper.style.filter = "brightness(1.25)";
      wrapper.style.pointerEvents = "none";
      wrapper.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
      wrapper.style.borderRadius = "12px";
      wrapper.style.background = "rgba(255,255,255,0.95)";

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      e.dataTransfer.setDragImage(wrapper, rect.width * 0.4, 20);

      setTimeout(() => {
        if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
      }, 0);
    }
  };

  return (
    <section
      className={`w-full transition-transform ${
        isDragging ? "opacity-80 scale-[0.99]" : "opacity-100"
      } ${editMode ? "cursor-grab active:cursor-grabbing" : ""}`}
      draggable={editMode}
      onDragStart={handleDragStart}
      onDragOver={(e) => {
        if (!editMode) return;
        e.preventDefault();
      }}
      onDrop={(e) => {
        if (!editMode) return;
        e.preventDefault();
        onModuleDrop(index);
      }}
    >
      {/* Tarjeta única del módulo */}
      <div
        ref={cardRef}
        className={`relative left-1/2 -translate-x-1/2 
                    w-[130%] md:w-[135%] xl:w-[140%]
                    bg-card-light dark:bg-card-dark 
                    border border-border-light dark:border-border-dark 
                    rounded-lg p-6 shadow-sm space-y-4 transition-shadow transition-colors ${
                      editMode ? "ring-1 ring-dashed ring-primary-light/60" : ""
                    } ${
                      isDragging
                        ? "ring-2 ring-primary-light shadow-xl bg-sky-50/60 dark:bg-sky-900/20"
                        : ""
                    }`}
      >
        {/* Cabecera: icono a la izquierda + título */}
        <div className="flex items-start gap-3">
          {/* Icono circular tipo Gmail */}
          <button
            type="button"
            onClick={handleToggleCollapsed}
            className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-primary-DEFAULT dark:text-primary-light hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={collapsed ? "Expandir módulo" : "Recoger módulo"}
          >
            <span className="material-icons text-base">
              {collapsed ? "chevron_right" : "expand_more"}
            </span>
          </button>

          {/* Título + objetivo */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light">
              Módulo {numero}: {titulo}
            </h2>

            <p className="mt-1 text-sm text-subtle-light dark:text-subtle-dark">
              <span className="font-semibold">Objetivo de aprendizaje:</span>{" "}
              {objetivo}
            </p>

            {editMode && (
              <p className="mt-1 text-xs text-subtle-light">
                Modo edición: arrastra esta tarjeta para cambiar el orden del
                módulo.
              </p>
            )}
          </div>
        </div>

        {/* Contenido colapsable */}
        {!collapsed && (
          <div className="mt-4 space-y-6 modulo-body">
            {/* Clases */}
            <div>
              <h3 className="font-semibold text-primary-DEFAULT dark:text-primary-light mb-3 text-center md:text-left">
                Clases
              </h3>
              <div className="space-y-3">
                {recursos.map((r, idx) => (
                  <Recurso
                    key={r.id}
                    tipo={r.tipo}
                    nombre={r.nombre}
                    href={r.href}
                    ariaLabel={`Ver ${r.nombre}`}
                    editMode={editMode}
                    draggableProps={
                      editMode
                        ? {
                            draggable: true,
                            onDragStart: (e) => {
                              onResourceDragStart(index, idx);
                              e.dataTransfer.effectAllowed = "move";

                              const original = e.currentTarget;
                              if (original && e.dataTransfer.setDragImage) {
                                const rect = original.getBoundingClientRect();
                                const clone = original.cloneNode(true);

                                const wrapper =
                                  document.createElement("div");
                                wrapper.style.position = "fixed";
                                wrapper.style.top = "-9999px";
                                wrapper.style.left = "-9999px";
                                wrapper.style.width = rect.width + "px";
                                wrapper.style.transform = "scale(0.98)";
                                wrapper.style.opacity = "0.95";
                                wrapper.style.pointerEvents = "none";
                                wrapper.style.boxShadow =
                                  "0 10px 20px rgba(0,0,0,0.25)";
                                wrapper.style.borderRadius = "10px";
                                wrapper.style.background =
                                  "rgba(255,255,255,0.98)";

                                wrapper.appendChild(clone);
                                document.body.appendChild(wrapper);

                                e.dataTransfer.setDragImage(
                                  wrapper,
                                  rect.width * 0.3,
                                  rect.height * 0.4
                                );

                                setTimeout(() => {
                                  if (wrapper.parentNode) {
                                    wrapper.parentNode.removeChild(wrapper);
                                  }
                                }, 0);
                              }
                            },
                            onDragOver: (e) => {
                              e.preventDefault();
                            },
                            onDrop: (e) => {
                              e.preventDefault();
                              onResourceDrop(index, idx);
                            },
                          }
                        : {}
                    }
                  />
                ))}
              </div>
              {editMode && (
                <p className="mt-2 text-xs text-subtle-light text-center md:text-left">
                  Arrastra las clases para cambiar su orden.
                </p>
              )}
            </div>

            {/* Recursos adicionales */}
            {adicionales.length > 0 && (
              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <h3 className="font-semibold text-primary-DEFAULT dark:text-primary-light mb-3 text-center md:text-left">
                  Recursos adicionales
                </h3>
                <div className="space-y-3">
                  {adicionales.map((r, idx) => (
                    <Recurso
                      key={r.id}
                      tipo={r.tipo}
                      nombre={r.nombre}
                      href={r.href}
                      ariaLabel={`Ver ${r.nombre}`}
                      editMode={editMode}
                      draggableProps={
                        editMode
                          ? {
                              draggable: true,
                              onDragStart: (e) => {
                                onResourceDragStart(
                                  index,
                                  idx,
                                  "adicionales"
                                );
                                e.dataTransfer.effectAllowed = "move";

                                const original = e.currentTarget;
                                if (original && e.dataTransfer.setDragImage) {
                                  const rect = original.getBoundingClientRect();
                                  const clone = original.cloneNode(true);

                                  const wrapper =
                                    document.createElement("div");
                                  wrapper.style.position = "fixed";
                                  wrapper.style.top = "-9999px";
                                  wrapper.style.left = "-9999px";
                                  wrapper.style.width = rect.width + "px";
                                  wrapper.style.transform = "scale(0.98)";
                                  wrapper.style.opacity = "0.95";
                                  wrapper.style.pointerEvents = "none";
                                  wrapper.style.boxShadow =
                                    "0 10px 20px rgba(0,0,0,0.25)";
                                  wrapper.style.borderRadius = "10px";
                                  wrapper.style.background =
                                    "rgba(255,255,255,0.98)";

                                  wrapper.appendChild(clone);
                                  document.body.appendChild(wrapper);

                                  e.dataTransfer.setDragImage(
                                    wrapper,
                                    rect.width * 0.3,
                                    rect.height * 0.4
                                  );

                                  setTimeout(() => {
                                    if (wrapper.parentNode) {
                                      wrapper.parentNode.removeChild(wrapper);
                                    }
                                  }, 0);
                                }
                              },
                              onDragOver: (e) => {
                                e.preventDefault();
                              },
                              onDrop: (e) => {
                                e.preventDefault();
                                onResourceDrop(
                                  index,
                                  idx,
                                  "adicionales"
                                );
                              },
                            }
                          : {}
                      }
                    />
                  ))}
                </div>
                {editMode && (
                  <p className="mt-2 text-xs text-subtle-light text-center md:text-left">
                    Arrastra los recursos adicionales para cambiar su orden.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ======================
// Página Principal de MÓDULOS
// ======================
export default function Modulos() {
  const [editMode, setEditMode] = useState(false);
  const [modulos, setModulos] = useState(INITIAL_MODULOS);

  const [draggedModuleIndex, setDraggedModuleIndex] = useState(null);
  const [draggedResource, setDraggedResource] = useState(null);
  // draggedResource: { modIndex, resIndex, tipoLista: "recursos" | "adicionales" }

  // ---- Módulos: drag & drop ----
  const handleModuleDragStart = (index) => {
    setDraggedModuleIndex(index);
  };

  const handleModuleDrop = (targetIndex) => {
    if (
      draggedModuleIndex === null ||
      draggedModuleIndex === targetIndex ||
      draggedModuleIndex < 0
    )
      return;

    setModulos((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(draggedModuleIndex, 1);
      arr.splice(targetIndex, 0, moved);
      return arr;
    });
    setDraggedModuleIndex(null);
  };

  // ---- Recursos: drag & drop dentro de un módulo ----
  const handleResourceDragStart = (
    modIndex,
    resIndex,
    tipoLista = "recursos"
  ) => {
    setDraggedResource({ modIndex, resIndex, tipoLista });
  };

  const handleResourceDrop = (
    modIndex,
    targetResIndex,
    tipoLista = "recursos"
  ) => {
    if (!draggedResource) return;
    if (
      draggedResource.modIndex !== modIndex ||
      draggedResource.tipoLista !== tipoLista
    ) {
      // Solo reordenamos dentro del mismo módulo y misma lista
      return;
    }
    if (draggedResource.resIndex === targetResIndex) return;

    setModulos((prev) => {
      const arr = [...prev];
      const mod = { ...arr[modIndex] };
      const lista = [...mod[tipoLista]];

      const [moved] = lista.splice(draggedResource.resIndex, 1);
      lista.splice(targetResIndex, 0, moved);

      mod[tipoLista] = lista;
      arr[modIndex] = mod;
      return arr;
    });

    setDraggedResource(null);
  };

  // ---- Auto-scroll mientras arrastras ----
  const handleGlobalDragOver = (e) => {
    if (!editMode) return;
    if (draggedModuleIndex === null && !draggedResource) return;

    const edge = 80; // px desde el borde
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
        onToggleEdit={() => setEditMode((prev) => !prev)}
      />

      <main className="flex-1 pt-16" onDragOver={handleGlobalDragOver}>
        {/* HERO del curso con transparencia en modo edición */}
        <HeroCurso
          titulo="IWI131 - Programación"
          subtitulo="Departamento de Informática"
          periodo="2024 - Semestre 1"
          backgroundUrl="https://aula.usm.cl/pluginfile.php/7197544/course/overviewfiles/intro.png"
          containerClass="flex-1 max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-20 xl:px-28"
          editMode={editMode}
        />

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

        {/* Mensaje destacado de modo edición */}
        {editMode && (
          <div className="w-full mx-auto px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 mb-4">
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-100 px-4 py-2 rounded-md flex items-center gap-2 text-sm shadow-sm">
              <span className="material-icons text-base">edit</span>
              <span>
                Estás en <strong>modo edición</strong>. Arrastra módulos y
                recursos para cambiar su orden.
              </span>
            </div>
          </div>
        )}

        {/* Contenido interior con laterales amplios */}
        <div className="w-full mx-auto px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 py-6">
          {/* Contenido de los módulos */}
          <div className="space-y-10 w-full">
            {modulos.map((mod, idx) => (
              <Modulo
                key={mod.id}
                modulo={mod}
                index={idx}
                editMode={editMode}
                isDragging={draggedModuleIndex === idx}
                onModuleDragStart={handleModuleDragStart}
                onModuleDrop={handleModuleDrop}
                onResourceDragStart={handleResourceDragStart}
                onResourceDrop={handleResourceDrop}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
