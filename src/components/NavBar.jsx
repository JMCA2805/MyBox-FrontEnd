import { useState, useEffect, useContext } from "react";
import Agg from "./Modal/Agg";
import { SearchContext, useUpItemsContext } from "../UpProvider";

function NavBar() {
  const setInputSearch = useContext(SearchContext);
  const update = useUpItemsContext();

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
        'url("src/assets/icons/moon-orange.png")';
      document.getElementById("logo_theme").style.content =
        'url("src/assets/logo.png")';
      document.getElementById("search").style.content =
        'url("src/assets/icons/search-orange.png")';
      document.getElementById("plus").style.content =
        'url("src/assets/icons/plus-orange.png")';
    } else {
      document.querySelector("html").classList.remove("dark");
      document.getElementById("theme").style.content =
        'url("src/assets/icons/sun.png")';
      document.getElementById("logo_theme").style.content =
        'url("src/assets/logo_v2.png")';
      document.getElementById("search").style.content =
        'url("src/assets/icons/search-white.png")';
      document.getElementById("plus").style.content =
        'url("src/assets/icons/plus.png")';
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputSearchChange = async (e) => {
    setInputSearch(e.target.value);
    if(e.target.value == ""){
      update(true)
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      update(false);
    }
  };
  return (
    <>
      {/* Creacion del NavBar */}
      <nav className="h-16 w-full bg-dark-tangerine shadow-lg flex ssm:h-12 dark:bg-black">
        {/* Contenedor del logo */}
        <div className="w-1/6 h-full flex justify-center items-center md:w-1/4 ssm:w-2/4">
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
            className="w-3/6 h-10 text-lg text-gray font-medium px-6 rounded-full border-0 bg-white-smoke focus:text-black ssm:w-3/5 ssm:h-8 dark:bg-woodsmoke dark:border-2 focus:ring-0 dark:focus:text-white dark:placeholder:text-blue-gray-100 dark:border-dark-tangerine dark:text-blue-gray-100 outline-none"
            placeholder="Buscar"
            onChange={handleInputSearchChange}
            onKeyUp={handleKeyUp}
          />
          {/* Boton de Buscar */}
          <button
            type="submit"
            className="flex items-center justify-center w-10 h-10 mx-2 rounded-full ssm:w-8 ssm:h-8"
            onClick={() => {
              update();
            }}
          >
            <img id="search" alt="Buscar" className="p-1" />
          </button>
          <Agg />
        </section>
        {/* Contenedor de botones */}
        <div className="flex items-center justify-center w-1/6 md:w-1/4 ssm:w-1/5">
          {/* Contenedor del boton de Modo Oscuro-Claro */}
          <div className="flex items-center justify-end w-full">
            <button
              type="submit"
              onClick={handleChangeTheme}
              className="flex items-center justify-center w-10 h-10 mx-2 rounded-full ssm:w-8 ssm:h-8"
            >
              <img alt="Claro-Oscuro" className="p-1" id="theme" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
