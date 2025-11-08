import { useMemo } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

/** Umbrales */
const PASS = 55;        // aprobado por promedio general
const RISK = 40;        // en riesgo si >= RISK y < PASS
const REQ_TAREAS = 70;
const REQ_CONTROLES = 50;

/** Datos de ejemplo (equivalentes a tus <tr data-*> ) */
const EVALS = [
  // EXÁMENES (50%)
  { nombre: "Certamen 1", peso: 15, score: 85, max: 100 },
  { nombre: "Certamen 2", peso: 15, score: 48, max: 100 },
  // CONTROLES (30%)
  { nombre: "Control 1", peso: 5, score: 70, max: 100 },
  { nombre: "Control 2", peso: 5, score: 68, max: 100 },
  { nombre: "Control 3", peso: 5, score: null, max: null }, // pendiente
  // TAREAS (15%)
  { nombre: "Tarea 1: Introducción a la Complejidad", peso: 5, score: 88, max: 100 },
  { nombre: "Tarea 2: Algoritmos de Ordenamiento", peso: 5, score: 82, max: 100 },
  { nombre: "Tarea 3: Estructuras de Datos Avanzadas", peso: 5, score: null, max: null },
  // PROYECTOS (10%)
  { nombre: "Proyecto 1: Diseño de Algoritmos Recursivos", peso: 5, score: 90, max: 100 },
  { nombre: "Proyecto Final: Análisis de Algoritmos", peso: 5, score: null, max: null },
];

function pill(label, tone = "neutral") {
  const tones = {
    ok: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
    warn: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
    bad: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
    neutral: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {label}
    </span>
  );
}

export default function Evaluaciones() {
  /** Derivados/calculados */
  const kpis = useMemo(() => {
    let sumWeighted = 0;            // suma de aportes (puntos de %), solo calificadas
    let sumWeightsWithScore = 0;    // suma de ponderaciones con nota
    let avance = 0;                 // % de avance (suma de ponderaciones con nota)

    let tareasSum = 0, tareasN = 0;
    let controlesSum = 0, controlesN = 0;

    const filas = EVALS.map((e) => {
      const calificada = e.score != null && e.max != null && e.max > 0;
      let pct = null, aporte = null, estadoTone = "neutral", estadoText = "Pendiente";

      if (calificada) {
        pct = (e.score / e.max) * 100;
        aporte = (pct / 100) * e.peso;

        sumWeighted += aporte;
        sumWeightsWithScore += e.peso;
        avance += e.peso;

        if (/tarea/i.test(e.nombre)) { tareasSum += pct; tareasN += 1; }
        if (/control/i.test(e.nombre)) { controlesSum += pct; controlesN += 1; }

        if (pct < RISK) { estadoTone = "bad"; estadoText = "Reprobado"; }
        else if (pct < PASS) { estadoTone = "warn"; estadoText = "En riesgo"; }
        else { estadoTone = "ok"; estadoText = "Aprobado"; }
      }

      return {
        ...e,
        pct, aporte,
        estado: pill(estadoText, estadoTone),
      };
    });

    const promedioPonderado = sumWeightsWithScore > 0
      ? (sumWeighted / sumWeightsWithScore) * 100
      : null;

    const avancePct = Math.max(0, Math.min(100, avance));

    let estadoGeneralTone = "neutral", estadoGeneralText = "Estado —";
    if (promedioPonderado != null) {
      if (promedioPonderado < RISK) { estadoGeneralTone = "bad"; estadoGeneralText = "REPROBADO"; }
      else if (promedioPonderado < PASS) { estadoGeneralTone = "warn"; estadoGeneralText = "EN RIESGO"; }
      else { estadoGeneralTone = "ok"; estadoGeneralText = "APROBADO"; }
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
      avgTareas, avgControles, reqTareasOK, reqControlesOK,
    };
  }, []);

  const onExportCSV = () => {
    const headers = ["Evaluación","Ponderación","Nota (%)","Aporte (p.p. %)","Estado"];
    const rows = kpis.filas.map(f => [
      f.nombre,
      `${f.peso}%`,
      f.pct == null ? "—" : `${f.pct.toFixed(1)} %`,
      f.aporte == null ? "—" : `${f.aporte.toFixed(2)} %`,
      // texto del pill (quitamos etiquetas)
      (f.pct == null ? "Pendiente" : (f.pct < RISK ? "Reprobado" : f.pct < PASS ? "En riesgo" : "Aprobado")),
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "calificaciones.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar />

      <main className="flex-1 pt-16">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-6">

          {/* Hero del curso */}
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

          {/* Tabs del curso */}
          <nav aria-label="Secciones del curso" className="mb-6">
            <div className="border-b border-border-light dark:border-border-dark">
              <div className="flex flex-wrap gap-4 -mb-px">
                <Link to="/curso" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Información General
                </Link>
                <Link to="/modulos" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Material
                </Link>
                <Link to="/tareas" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Tareas
                </Link>
                <span className="px-3 py-2 font-semibold text-primary-DEFAULT border border-border-light border-b-0 rounded-t-lg bg-card-light shadow-sm">
                  Calificaciones
                </span>
                <Link to="/foro" className="px-3 py-2 text-text-light dark:text-text-dark hover:text-primary-light transition-colors">
                  Foro
                </Link>
              </div>
            </div>
          </nav>

          {/* Encabezado + export */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-primary-DEFAULT">Panel de calificaciones</h2>
            <div className="flex items-center gap-2">
 
            </div>
          </div>

          {/* KPIs: Promedio + Avance */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <article className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-subtle-light dark:text-subtle-dark">Promedio ponderado (calificadas)</p>
                  <p className="text-3xl font-extrabold mt-1">
                    {kpis.promedioPonderado == null ? "—" : `${kpis.promedioPonderado.toFixed(2)} %`}
                  </p>
                  <p className="mt-2 text-xs text-subtle-light dark:text-subtle-dark">
                    Promedio calculado con evaluaciones ya calificadas; no incluye pendientes.
                  </p>
                </div>
                {kpis.estadoGeneral}
              </div>
              <div className="mt-3 text-xs">
                <span className="font-semibold">Regla:</span> Aprobación por promedio general ≥ <b>55</b>.
              </div>
            </article>

            <article className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm">
              <p className="text-xs text-subtle-light dark:text-subtle-dark">Avance del curso</p>
              <p className="text-2xl font-bold mt-1">{`${Math.round(kpis.avancePct)} %`}</p>
              <div className="mt-3 w-full bg-background-light dark:bg-background-dark rounded-full h-2.5">
                <div className="bg-primary-light h-2.5 rounded-full" style={{ width: `${kpis.avancePct}%` }} />
              </div>
            </article>
          </section>

          <h3 className="text-lg font-bold text-primary-DEFAULT mb-3">Todas las evaluaciones</h3>

          {/* Tabla + Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Tabla (2/3) */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm">
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
                        <td className="py-3 px-4">{f.pct == null ? "—" : `${f.pct.toFixed(1)} %`}</td>
                        <td className="py-3 px-4">{f.aporte == null ? "—" : `${f.aporte.toFixed(2)} %`}</td>
                        <td className="py-3 px-4">{f.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <aside className="space-y-4">
              <article className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm">
                <p className="text-xs text-subtle-light dark:text-subtle-dark">Promedio de Tareas</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-2xl font-bold">{kpis.avgTareas == null ? "—" : `${kpis.avgTareas.toFixed(1)} %`}</p>
                  {pill(kpis.reqTareasOK ? "Cumple ✓" : "No cumple ✗", kpis.reqTareasOK ? "ok" : "bad")}
                </div>
                <p className="mt-2 text-xs">
                  <span className="font-semibold">Requisito:</span> Promedio de Tareas ≥ <b>{REQ_TAREAS}</b>.
                </p>
              </article>

              <article className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm">
                <p className="text-xs text-subtle-light dark:text-subtle-dark">Promedio de Controles</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-2xl font-bold">{kpis.avgControles == null ? "—" : `${kpis.avgControles.toFixed(1)} %`}</p>
                  {pill(kpis.reqControlesOK ? "Cumple ✓" : "No cumple ✗", kpis.reqControlesOK ? "ok" : "bad")}
                </div>
                <p className="mt-2 text-xs">
                  <span className="font-semibold">Requisito:</span> Promedio de Controles ≥ <b>{REQ_CONTROLES}</b>.
                </p>
              </article>

              <p className="mt-1 text-[11px] text-subtle-light dark:text-subtle-dark">
                Nota: Los promedios mostrados consideran solo evaluaciones calificadas.
              </p>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}
