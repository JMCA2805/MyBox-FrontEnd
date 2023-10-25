import { useState, useEffect } from "react";
import Agg from "./Modal/Agg";

function NavBar() {
  //Recargar la pagina desde cache
  const reload = () => {
    window.location.reload(false);
  };

  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
      document.getElementById("theme").style.content =
        'url("src/assets/icons/moon.png")';
      document.getElementById("logo_theme").style.content =
        'url("src/assets/logo_v2.png")';
    } else {
      document.querySelector("html").classList.remove("dark");
      document.getElementById("theme").style.content =
        'url("src/assets/icons/sun.png")';
      document.getElementById("logo_theme").style.content =
        'url("src/assets/logo.png")';
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Creacion del NavBar */}
      <nav className="h-16 w-full bg-white shadow-lg flex ssm:h-12 dark:bg-midnight-blue">
        {/* Contenedor del logo */}
        <div className="w-1/6 h-full flex justify-center items-center md:w-1/4 ssm:w-1/4">
          <button
            onClick={() => {
              reload();
            }}
          >
            <img id="logo_theme" alt="Logo" className="h-12 ssm:h-8" />
          </button>
        </div>
        {/* Contenedor del Buscar */}
        <section className="w-4/6 flex justify-center items-center h-full md:w-3/5 ssm:w-3/4">
          {/* Buscador */}
          <input
            type="text"
            className="w-3/6 h-10 text-lg text-gray font-medium px-6 rounded-full border-2 border-azure focus:outline-none focus:border-midnight-blue focus:text-purple-navy ssm:w-3/5 ssm:h-8 dark:bg-purple-navy dark:text-white"
            placeholder="Buscar"
          />
          {/* Boton de Buscar */}
          <button
            type="submit"
            className="flex items-center bg-azure justify-center w-10 h-10 mx-2 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue ssm:w-8 ssm:h-8"
          >
            <img
              src="src\assets\icons\search-white.png"
              alt="Buscar"
              className="p-2"
            />
          </button>
          <Agg />
        </section>
        {/* Contenedor de botones */}
        <div className="flex items-center justify-center w-1/6 md:w-1/4 ssm:w-1/5 bg-black">
          {/* Contenedor del boton de Modo Oscuro-Claro */}
          <div className="flex items-center justify-end w-full">
            <button
              type="submit"
              onClick={handleChangeTheme}
              className="flex items-center text-center bg-azure justify-center w-10 h-10 mx-6 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue ssm:w-8 ssm:h-8  ssm:mx-0"
            >
              <img alt="Claro-Oscuro" className="p-2" id="theme" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
