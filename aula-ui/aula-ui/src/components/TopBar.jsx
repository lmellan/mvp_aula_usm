import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-card-dark shadow-md h-16">
      <div className="container mx-auto px-4 h-full">
        <div className="h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="Ir a la página principal del sitio"
            >
              <img
                src="//aula.usm.cl/pluginfile.php/1/theme_moove/logo/1756716003/marca-color.png"
                className="h-8"
                alt="AULA USM"
              />
            </Link>

            {/* Menú: solo “Página Principal”. Texto negro; azul en hover */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to="/"
                className="text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
              >
                Página Principal
              </Link>
            </nav>
          </div>

          {/* 🔇 Se eliminaron: buscador, notificaciones e icono de perfil */}
          <div />
        </div>
      </div>
    </header>
  );
}
