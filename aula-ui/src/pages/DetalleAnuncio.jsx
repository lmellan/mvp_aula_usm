// src/pages/DetalleAviso.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function DetalleAnuncio() {
  const [respuestas, setRespuestas] = useState([
    {
      id: "r1",
      autor: "Diego Mella (Ayudante)",
      avatar: "https://i.pravatar.cc/40?img=32",
      fechaISO: "2024-07-03T10:05:00-04:00",
      fechaLabel: "hace 27 min",
      texto:
        "El listado por sala se publicará en esta misma página el 08/07. Cualquier duda, me escriben.",
      puedeAcciones: true,
      likes: null,
    },
    {
      id: "r2",
      autor: "Camila Soto",
      avatar: "https://i.pravatar.cc/40?img=15",
      fechaISO: "2024-07-03T10:12:00-04:00",
      fechaLabel: "hace 20 min",
      texto: "¿Se mantiene el mismo formato de preguntas cortas + 1 desarrollo?",
      puedeAcciones: false,
      likes: 1,
    },
  ]);

  const [mensaje, setMensaje] = useState("");
  const [enviarCorreo, setEnviarCorreo] = useState(false);

  function agregarRespuesta(e) {
    e.preventDefault();
    const texto = mensaje.trim();
    if (texto.length === 0) return;

    const nueva = {
      id: `r-${Date.now()}`,
      autor: "Tú",
      avatar: "https://i.pravatar.cc/40?img=68",
      fechaISO: new Date().toISOString(),
      fechaLabel: "ahora",
      texto,
      puedeAcciones: false,
      likes: null,
    };

    setRespuestas((prev) => [...prev, nueva]);
    setMensaje("");
  }

  function totalRespuestasLabel() {
    const total = respuestas.length;
    return total === 1 ? "1 respuesta" : `${total} respuestas`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <TopBar />

      <main className="flex-1 pt-16">
        {/* ✅ Alineación a la izquierda */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6 text-left">

          {/* Encabezado + Volver */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-primary-DEFAULT dark:text-primary-light">
              Noticias y Avisos
            </h2>
            <Link
              to="/curso"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border-light dark:border-border-dark text-sm font-semibold hover:bg-background-light dark:hover:bg-background-dark"
            >
              <span className="material-icons text-sm">arrow_back</span>
              Volver a Información General
            </Link>
          </div>

          {/* Card del aviso */}
          <article className="bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark shadow-sm">
            <header className="p-6 border-b border-border-light dark:border-border-dark">
              <div className="flex items-start gap-3">
                <span className="material-icons text-primary-light mt-1" aria-hidden="true">
                  priority_high
                </span>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                    Cambio de fecha Certamen 2
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-subtle-light dark:text-subtle-dark">
                    <div className="inline-flex items-center gap-2">
                      <img
                        src="https://i.pravatar.cc/48?img=12"
                        alt="Avatar profe"
                        className="w-6 h-6 rounded-full"
                      />
                      <span>
                        <strong>Prof. Germán Fernández</strong>
                      </span>
                    </div>
                    <span aria-hidden="true">•</span>
                    <time
                      dateTime="2024-07-03T09:32:00-04:00"
                      title="miércoles, 3 de julio de 2024 a las 09:32 (GMT-4)"
                    >
                      Publicado el 03/07/2024 a las 09:32
                    </time>
                  </div>
                </div>
              </div>
            </header>

            {/* ✅ Alineación de párrafos */}
            <div className="p-6 prose prose-sm md:prose-base dark:prose-invert max-w-none text-left">
              <p>
                Estimadas/os, debido a ajustes de coordinación con otros cursos y para favorecer la
                preparación, el <strong>Certamen 2</strong> se{" "}
                <strong>reprograma para el miércoles 10 de julio</strong>, en el horario habitual.
              </p>
              <ul>
                <li>
                  <strong>Formato:</strong> presencial, sin material de apoyo impreso. Se permite 1
                  hoja manuscrita por un lado.
                </li>
                <li>
                  <strong>Duración:</strong> 90 minutos.
                </li>
                <li>
                  <strong>Salas:</strong> F-25 y F-27.
                </li>
              </ul>
              <p>
                Si tienes un choque horario con otra evaluación institucional, por favor completa el
                formulario de{" "}
                <a
                  href="#"
                  className="text-primary-DEFAULT hover:text-primary-light underline"
                >
                  “solicitud de excepción”
                </a>{" "}
                antes del 07/07 a las 23:59.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-subtle-light dark:text-subtle-dark">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                  <span className="material-icons text-[16px]">label</span> Evaluaciones
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                  <span className="material-icons text-[16px]">calendar_today</span> Certamen 2
                </span>
                <span
 
                  className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark"
                >
                  <span className="material-icons text-[16px]">file_download</span> Adjuntos (0)
                </span>
              </div>
            </div>
          </article>

          {/* Hilo de respuestas */}
          <section aria-labelledby="foro-titulo" className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3
                id="foro-titulo"
                className="text-xl font-bold text-primary-DEFAULT dark:text-primary-light"
              >
                Respuestas
              </h3>
              <span className="text-sm text-subtle-light dark:text-subtle-dark">
                {totalRespuestasLabel()}
              </span>
            </div>

            {/* Lista de respuestas */}
            <ol className="space-y-4">
              {respuestas.map((r) => (
                <li
                  key={r.id}
                  className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <img src={r.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-subtle-light dark:text-subtle-dark">
                        <strong className="text-text-light dark:text-text-dark">{r.autor}</strong>
                        <span aria-hidden="true">•</span>
                        <time dateTime={r.fechaISO} title={r.fechaISO}>
                          {r.fechaLabel}
                        </time>
                      </div>
                      <p className="mt-2">{r.texto}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Formulario */}
            <div className="mt-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg">
              <form className="p-4 space-y-3" noValidate onSubmit={agregarRespuesta}>
                <div className="flex items-start gap-3">
                  <img
                    src="https://i.pravatar.cc/40?img=68"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <label htmlFor="mensaje" className="sr-only">
                      Escribe tu respuesta
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      required
                      className="w-full rounded-md border border-border-light dark:border-border-dark bg-transparent focus:ring-primary-light focus:border-primary-light"
                      placeholder="Escribe tu respuesta (texto simple)"
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                    />

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-subtle-light dark:text-subtle-dark">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={enviarCorreo}
                          onChange={(e) => setEnviarCorreo(e.target.checked)}
                        />
                        Enviar también por correo
                      </label>

 
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  {/* ✅ Botón azul claro coherente */}
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-md bg-primary-light text-white font-semibold hover:bg-primary-DEFAULT transition-colors"
                  >
                    Publicar respuesta
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
