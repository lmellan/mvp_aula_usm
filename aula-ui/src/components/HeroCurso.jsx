// src/components/HeroCurso.jsx
export default function HeroCurso({
  titulo = "IWI131 - Programación",
  subtitulo = "Departamento de Informática",
  periodo = "2024 - Semestre 1",
  backgroundUrl = "https://aula.usm.cl/pluginfile.php/7197544/course/overviewfiles/intro.png",
  containerClass = "",      // <- NUEVO: el contenedor lo define el padre
}) {
  return (
    <section
      className="w-full bg-primary-DEFAULT text-white rounded-none md:rounded-lg mb-8 shadow-lg min-h-52 md:min-h-56 flex items-center"
      style={{
        background: `linear-gradient(rgba(0, 51, 102, 0.88), rgba(0, 51, 102, 0.88)), url('${backgroundUrl}') no-repeat center center / cover`,
      }}
    >
      {/* Usamos el contenedor que viene por props, sin max-w interno adicional */}
      <div className={containerClass}>
        <h1 className="text-3xl md:text-4xl font-bold">{titulo}</h1>
        <p className="text-lg md:text-xl opacity-90">{subtitulo}</p>
        <p className="text-lg md:text-xl opacity-90">{periodo}</p>
      </div>
    </section>
  );
}
