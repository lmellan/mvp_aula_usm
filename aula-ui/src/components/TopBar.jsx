import { Link } from "react-router-dom";

export default function TopBar({
  showEditToggle = false,
  editMode = false,
  onToggleEdit,
}) {
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

            {/* Menú: solo “Página Principal”. */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to="/"
                className="text-text-light dark:text-text-dark hover:text-primary-light transition-colors"
              >
                Página Principal
              </Link>
            </nav>
          </div>

          {/* Toggle Modo de edición */}
          <div>
            {showEditToggle && (
              <button
                type="button"
                onClick={onToggleEdit}
                className="inline-flex items-center gap-3 text-sm font-medium text-text-light dark:text-text-dark bg-transparent focus:outline-none"
              >
                <span>Modo de edición</span>
                <span
                  className={`relative w-10 h-5 rounded-full border transition-colors ${
                    editMode
                      ? "bg-primary-DEFAULT border-primary-DEFAULT"
                      : "bg-gray-300 dark:bg-gray-500 border-gray-400 dark:border-gray-500"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                      editMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
