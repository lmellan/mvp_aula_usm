// src/pages/Evaluaciones.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import HeroCurso from "../components/HeroCurso";

/** Umbrales */
const PASS = 55;
const RISK = 40;
const REQ_TAREAS = 70;
const REQ_CONTROLES = 50;

// Mismo ancho para hero + nav + grilla
const CONTAINER =
  "max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16";

/** Datos de ejemplo */
const EVALS = [
  { nombre: "Certamen 1", peso: 15, score: 85, max: 100 },
  { nombre: "Certamen 2", peso: 15, score: 48, max: 100 },
  { nombre: "Control 1", peso: 5, score: 70, max: 100 },
  { nombre: "Control 2", peso: 5, score: 68, max: 100 },
  { nombre: "Control 3", peso: 5, score: null, max: null },
  {
    nombre: "Tarea 1: Introducción a la Complejidad",
    peso: 5,
    score: 88,
    max: 100,
  },
  {
    nombre: "Tarea 2: Algoritmos de Ordenamiento",
    peso: 5,
    score: 82,
    max: 100,
  },
  {
    nombre: "Tarea 3: Estructuras de Datos Avanzadas",
    peso: 5,
    score: null,
    max: null,
  },
  {
    nombre: "Proyecto 1: Diseño de Algoritmos Recursivos",
    peso: 5,
    score: 90,
    max: 100,
  },
  {
    nombre: "Proyecto Final: Análisis de Algoritmos",
    peso: 5,
    score: null,
    max: null,
  },
];

function pill(label, tone = "neutral") {
  const tones = {
    ok: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
    warn: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
    bad: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
    neutral:
      "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

// Metadatos de layout por bloque sobre una grilla lg:grid-cols-3
const BLOCK_META = {
  // KPI grande: tabla de evaluaciones
  tabla: {
    base: "",
    md: "md:col-span-2", // en md ocupa 2 columnas
    lg: "lg:col-span-2 lg:row-span-3", // en lg ocupa 2 de 3 columnas y 3 filas de alto
    xl: "",
  },

  // KPIs pequeños (1x1)
  kpiPromedio: { base: "", md: "", lg: "", xl: "" },
  kpiAvance: { base: "", md: "", lg: "", xl: "" },
  tareas: { base: "", md: "", lg: "", xl: "" },
  controles: { base: "", md: "", lg: "", xl: "" },
};

// Orden inicial de los bloques (sin "nota")
const INITIAL_BLOCK_ORDER = [
  "tabla", // KPI grande
  "kpiPromedio", // pequeños
  "kpiAvance",
  "tareas",
  "controles",
];

export default function Evaluaciones() {
  const [editMode, setEditMode] = useState(false);

  // Orden global de TODOS los bloques (kpis + tabla)
  const [blocksOrder, setBlocksOrder] = useState(INITIAL_BLOCK_ORDER);
  const [draggedBlockId, setDraggedBlockId] = useState(null);

  // Clase común para TODOS los KPIs pequeños (misma altura y centrados)
  const smallKpiClass =
    "bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm h-full min-h-[170px] flex flex-col justify-between";

  const kpis = useMemo(() => {
    let sumWeighted = 0;
    let sumWeightsWithScore = 0;
    let avance = 0;

    let tareasSum = 0,
      tareasN = 0;
    let controlesSum = 0,
      controlesN = 0;

    const filas = EVALS.map((e) => {
      const calificada = e.score != null && e.max != null && e.max > 0;
      let pct = null,
        aporte = null,
        estadoTone = "neutral",
        estadoText = "Pendiente";

      if (calificada) {
        pct = (e.score / e.max) * 100;
        aporte = (pct / 100) * e.peso;

        sumWeighted += aporte;
        sumWeightsWithScore += e.peso;
        avance += e.peso;

        if (/tarea/i.test(e.nombre)) {
          tareasSum += pct;
          tareasN += 1;
        }
        if (/control/i.test(e.nombre)) {
          controlesSum += pct;
          controlesN += 1;
        }

        if (pct < RISK) {
          estadoTone = "bad";
          estadoText = "Reprobado";
        } else if (pct < PASS) {
          estadoTone = "warn";
          estadoText = "En riesgo";
        } else {
          estadoTone = "ok";
          estadoText = "Aprobado";
        }
      }

      return { ...e, pct, aporte, estado: pill(estadoText, estadoTone) };
    });

    const promedioPonderado =
      sumWeightsWithScore > 0
        ? (sumWeighted / sumWeightsWithScore) * 100
        : null;

    const avancePct = Math.max(0, Math.min(100, avance));

    let estadoGeneralTone = "neutral",
      estadoGeneralText = "Estado —";
    if (promedioPonderado != null) {
      if (promedioPonderado < RISK) {
        estadoGeneralTone = "bad";
        estadoGeneralText = "REPROBADO";
      } else if (promedioPonderado < PASS) {
        estadoGeneralTone = "warn";
        estadoGeneralText = "EN RIESGO";
      } else {
        estadoGeneralTone = "ok";
        estadoGeneralText = "APROBADO";
      }
    }

    const avgTareas = tareasN > 0 ? tareasSum / tareasN : null;
    const avgControles = controlesN > 0 ? controlesSum / controlesN : null;

    const reqTareasOK = avgTareas != null && avgTareas >= REQ_TAREAS;
    const reqControlesOK = avgControles != null && avgControles >= REQ_CONTROLES;

    return {
      filas,
      promedioPonderado,
      avancePct,
      estadoGeneral: pill(estadoGeneralText, estadoGeneralTone),
      avgTareas,
      avgControles,
      reqTareasOK,
      reqControlesOK,
    };
  }, []);

  const onExportCSV = () => {
    // Dejado vacío por ahora; puedes reactivar el CSV si quieres
  };

  // ==========================
  // Render de cada bloque
  // ==========================
  const renderBlock = (id) => {
    if (id === "kpiPromedio") {
      return (
        <article className={smallKpiClass}>
          <div className="w-full flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-subtle-light dark:text-subtle-dark">
                Promedio ponderado (calificadas)
              </p>
              <p className="text-3xl font-extrabold mt-1">
                {kpis.promedioPonderado == null
                  ? "—"
                  : `${kpis.promedioPonderado.toFixed(2)} %`}
              </p>
              <p className="mt-2 text-xs text-subtle-light dark:text-subtle-dark">
                Promedio calculado con evaluaciones ya calificadas; no incluye
                pendientes.
              </p>
            </div>
            {kpis.estadoGeneral}
          </div>
          <div className="mt-3 text-xs text-subtle-light dark:text-subtle-dark">
            <span className="font-semibold">Regla:</span> Aprobación por
            promedio general ≥ <b>55</b>.
          </div>
        </article>
      );
    }

    if (id === "kpiAvance") {
      return (
        <article className={smallKpiClass}>
          <div className="flex flex-col items-center text-center gap-2 w-full">
            <p className="text-xs text-subtle-light dark:text-subtle-dark">
              Avance del curso
            </p>
            <p className="text-2xl font-bold">
              {`${Math.round(kpis.avancePct)} %`}
            </p>
            <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-2.5">
              <div
                className="bg-primary-light h-2.5 rounded-full"
                style={{ width: `${kpis.avancePct}%` }}
              />
            </div>
          </div>
        </article>
      );
    }

    if (id === "tabla") {
      // KPI grande: tabla de evaluaciones
      return (
        <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm h-full">
          <table className="min-w-full text-sm">
            <thead className="text-left border-b border-border-light dark:border-border-dark">
              <tr className="text-subtle-light dark:text-subtle-dark">
                <th className="py-3 px-4">Evaluación</th>
                <th className="py-3 px-4">Ponderación</th>
                <th className="py-3 px-4">Nota</th>
                <th className="py-3 px-4">Aporte (p.p.)</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {kpis.filas.map((f, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium">{f.nombre}</td>
                  <td className="py-3 px-4">{f.peso}%</td>
                  <td className="py-3 px-4">
                    {f.pct == null ? "—" : `${f.pct.toFixed(1)} %`}
                  </td>
                  <td className="py-3 px-4">
                    {f.aporte == null ? "—" : `${f.aporte.toFixed(2)} %`}
                  </td>
                  <td className="py-3 px-4">{f.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (id === "tareas") {
      return (
        <article className={smallKpiClass}>
          <div className="flex flex-col items-center text-center gap-1">
            <p className="text-xs text-subtle-light dark:text-subtle-dark">
              Promedio de Tareas
            </p>
            <p className="text-2xl font-bold">
              {kpis.avgTareas == null
                ? "—"
                : `${kpis.avgTareas.toFixed(1)} %`}
            </p>
            {pill(
              kpis.reqTareasOK ? "Cumple ✓" : "No cumple ✗",
              kpis.reqTareasOK ? "ok" : "bad"
            )}
          </div>
          <p className="mt-2 text-xs text-center text-subtle-light dark:text-subtle-dark">
            <span className="font-semibold">Requisito:</span> Promedio de
            Tareas ≥ <b>{REQ_TAREAS}</b>.
          </p>
        </article>
      );
    }

    if (id === "controles") {
      return (
        <article className={smallKpiClass}>
          <div className="flex flex-col items-center text-center gap-1">
            <p className="text-xs text-subtle-light dark:text-subtle-dark">
              Promedio de Controles
            </p>
            <p className="text-2xl font-bold">
              {kpis.avgControles == null
                ? "—"
                : `${kpis.avgControles.toFixed(1)} %`}
            </p>
            {pill(
              kpis.reqControlesOK ? "Cumple ✓" : "No cumple ✗",
              kpis.reqControlesOK ? "ok" : "bad"
            )}
          </div>
          <p className="mt-2 text-xs text-center text-subtle-light dark:text-subtle-dark">
            <span className="font-semibold">Requisito:</span> Promedio de
            Controles ≥ <b>{REQ_CONTROLES}</b>.
          </p>
        </article>
      );
    }

    return null;
  };

  // ==========================
  // Drag & drop de bloques
  // ==========================
  const handleBlockDragStart = (id) => {
    if (!editMode) return;
    setDraggedBlockId(id);
  };

  const handleBlockDrop = (targetId) => {
    if (!editMode || !draggedBlockId || draggedBlockId === targetId) return;

    setBlocksOrder((prev) => {
      const arr = [...prev];
      const fromIndex = arr.indexOf(draggedBlockId);
      const toIndex = arr.indexOf(targetId);
      if (fromIndex === -1 || toIndex === -1) return arr;

      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, draggedBlockId);
      return arr;
    });

    setDraggedBlockId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar
        showEditToggle={true}
        editMode={editMode}
        onToggleEdit={() => setEditMode((prev) => !prev)}
      />

      <main className="flex-1 pt-16">
        {/* HERO: mismo ancho que en tu snippet (igual que el navbar) */}
        <div className={CONTAINER}>
          <HeroCurso containerClass={CONTAINER} />
        </div>

        {/* Contenedor para el resto del contenido con el mismo ancho */}
        <div className={CONTAINER}>
          {/* Tabs del curso */}
          <nav aria-label="Secciones del curso" className="mb-6 mt-4">
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
                <Link
                  to="/tareas"
                  className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
                >
                  Tareas
                </Link>
                <span className="px-3 py-2 font-semibold text-primary-DEFAULT border border-border-light border-b-0 rounded-t-lg bg-card-light shadow-sm">
                  Calificaciones
                </span>
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
                  Estás en <strong>modo edición</strong>. Arrastra cualquier{" "}
                  <strong>bloque</strong> para cambiar su orden. 
              </span>
            </div>
          </div>
        )}
 

          {/* Encabezado + (posible) export */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-primary-DEFAULT">
              Panel de calificaciones
            </h2>
            <div className="flex items-center gap-2">
              {/* Botón CSV opcional */}
            </div>
          </div>

          {/* Grilla libre de KPIs + tabla, con KPI grande 2x3 */}
          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              auto-rows-auto
              place-items-stretch
              gap-4
              mb-6
            "
          >
            {blocksOrder.map((id) => {
              const meta = BLOCK_META[id] || {
                base: "",
                md: "",
                lg: "",
                xl: "",
              };

              const classes = [
                "h-full",
                meta.base,
                meta.md,
                meta.lg,
                meta.xl,
                editMode
                  ? "cursor-move ring-1 ring-dashed ring-primary-light/60 transition-shadow"
                  : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={id}
                  className={classes}
                  draggable={editMode}
                  onDragStart={() => handleBlockDragStart(id)}
                  onDragOver={(e) => {
                    if (editMode) e.preventDefault();
                  }}
                  onDrop={() => handleBlockDrop(id)}
                >
                  {renderBlock(id)}
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
