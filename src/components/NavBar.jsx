import { useState, useEffect, useContext } from "react";
import {
  SearchContext,
  useItemsContext,
  useUpItemsContext,
} from "../contexts/UpProvider";
import { Link, useMatch } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { ButtonIcon } from "./Modal/Modal";

function NavBar() {
  const match = useMatch("/");
  const match2 = useMatch("/Home");
  const match3 = useMatch("/Profile");
  const match4 = useMatch("/Users");
  const match5 = useMatch("/Favoritos");

  const { handleOpenAgg, setFilterCategory } = useItemsContext();

  const { user, isAuthenticated, logout, theme, setTheme } = useAuth();
  const [menu, setMenu] = useState(false);

  const setInputSearch = useContext(SearchContext);
  const update = useUpItemsContext();

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleInputSearchChange = async (e) => {
    setInputSearch(e.target.value);
    if (e.target.value == "") {
      setFilterCategory("")
      update(true);
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
          <Link to={isAuthenticated ? "/Home" : "/"}>
            <img
              onClick={() => {
                update(true);
              }}
              id="logo_theme"
              alt="Logo"
              className="h-12 ssm:h-8"
            />
          </Link>
        </div>
        {/* Contenedor del Buscar */}
        <section className="w-4/6 flex justify-center items-center h-full md:w-3/5 ssm:w-3/4">
          {match || match2 ? (
            <>
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
              {match2 && user.rol == "Admin" ? (
                /* Boton para abrir el Modal */
                <ButtonIcon handleOpen={handleOpenAgg}>
                  <img id="plus" alt="+" />
                </ButtonIcon>
              ) : null}
            </>
          ) : null}
        </section>
        {/* Contenedor de botones */}
        <div className="flex items-center justify-end w-1/6 md:w-1/4 ssm:w-1/5">
          {/* Contenedor del boton de Modo Oscuro-Claro */}
          <div
            className={
              "flex items-center justify-center w-1/3 h-full " +
              (match || match2 ? "ssm:w-1/2" : "ssm:w-full")
            }
          >
            <div className="flex justify-center items-center h-full w-full">
              <button
                onClick={handleChangeTheme}
                className="flex items-center justify-center w-10 h-10 mx-2 ssm:w-8 ssm:h-8 ssm:mx-0"
              >
                <img alt="Claro-Oscuro" className="p-1" id="theme" />
              </button>
            </div>
          </div>
          {/* Menu */}
          {match || match2 || match3 || match4 || match5 ? (
            <>
              <div
                className={
                  "relative text-white text-center justify-center items-center w-1/3 h-full z-20" +
                  (match || match2 ? " ssm:w-1/2" : " ssm:w-full")
                }
              >
                <div className="flex justify-center items-center h-full w-full">
                  <button
                    onClick={handleMenu}
                    className="flex items-center justify-center w-10 h-10 mx-2 ssm:w-8 ssm:h-8 ssm:mx-0"
                  >
                    <img alt="Menú" id="menu" />
                  </button>
                </div>
                {menu ? (
                  <>
                    <div className="absolute right-0 w-28 rounded-b-md dark:text-white text-black bg-white dark:bg-black shadow-lg ring-1 ring-pizazz ring-opacity-10">
                      <div>
                        {match ? (
                          <>
                            <Link
                              to={"/Login"}
                              className="block py-2 px-2 font-bold hover:dark:bg-woodsmoke hover:bg-white-smoke hover:ring-1 ring-pizazz hover:ring-opacity-30"
                            >
                              Acceder
                            </Link>
                            <Link
                              to={"/Register"}
                              className="block py-2 px-2 font-bold hover:dark:bg-woodsmoke hover:bg-white-smoke hover:ring-1 ring-pizazz hover:ring-opacity-30"
                            >
                              Registrarse
                            </Link>
                          </>
                        ) : null}
                        {match2 || match3 || match4 || match5 ? (
                          <>
                            {!match3 ? (
                              <>
                                <Link
                                  to={"/Profile"}
                                  className="block py-2 px-2 font-bold hover:dark:bg-woodsmoke hover:bg-white-smoke hover:ring-1 ring-pizazz hover:ring-opacity-30"
                                >
                                  Perfil
                                </Link>
                              </>
                            ) : null}
                            {user.rol == "Admin" ? (
                              <>
                                {!match4 ? (
                                  <>
                                    <Link
                                      to={"/Users"}
                                      className="block py-2 px-2 font-bold hover:dark:bg-woodsmoke hover:bg-white-smoke hover:ring-1 ring-pizazz hover:ring-opacity-30"
                                    >
                                      Usuarios
                                    </Link>
                                  </>
                                ) : null}
                              </>
                            ) : null}
                            {user.rol == "User" ? (
                              <>
                                {!match5 ? (
                                  <>
                                    <Link
                                      to={"/Favoritos"}
                                      className="block py-2 px-2 font-bold hover:dark:bg-woodsmoke hover:bg-white-smoke hover:ring-1 ring-pizazz hover:ring-opacity-30"
                                    >
                                      Favoritos
                                    </Link>
                                  </>
                                ) : null}
                              </>
                            ) : null}
                            <Link
                              to={"/"}
                              className="block py-2 px-2 font-bold hover:dark:bg-woodsmoke hover:bg-white-smoke hover:ring-1 ring-pizazz hover:ring-opacity-30"
                            >
                              <button
                                onClick={() => {
                                  logout();
                                  update(true);
                                }}
                              >
                                Salir
                              </button>
                            </Link>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </nav>
    </>
  );
}
export default NavBar;
