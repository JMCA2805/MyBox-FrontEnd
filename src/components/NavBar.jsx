import { useState } from "react";

function NavBar() {
  const [width, setWidth] = useState(null);

  //Recargar la pagina desde cache
  const reload = () => {
    window.location.reload(false);
  };
  // Obtener la resolucion
  const resolution = () => {
    setWidth(window.innerWidth);
  };
  // Actualizar la Resolucion
  window.addEventListener("resize", () => {
    resolution();
  });

  return (
    <>
      {/* Creacion del NavBar */}
      <nav className="h-16 w-full bg-white shadow-lg flex ssm:h-12">
        {/* Contenedor del logo */}
        <div className="w-1/6 h-full flex justify-center items-center md:w-1/4 ssm:w-1/4">
          <button
            onClick={() => {
              reload();
            }}
          >
            <img
              src="src\assets\logo.png"
              alt="Logo"
              className="h-12 ssm:h-8"
            />
          </button>
        </div>
        {/* Contenedor del Buscar */}
        <section className="w-4/6 flex justify-center items-center h-full md:w-3/5 ssm:w-2/4">
          {/* Buscador */}
          <input
            type="text"
            className="w-3/6 h-10 text-lg text-gray font-medium px-6 rounded-full border-2 border-azure focus:outline-none focus:border-midnight-blue focus:text-purple-navy ssm:w-3/5 ssm:h-8"
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
        </section>
        {/* Contenedor de botones */}
        <div className="flex items-center justify-center w-1/6 md:w-1/4 ssm:w-1/5">
          {/* Contenedor del boton Agregar */}
          <div className="flex items-center justify-center w-1/2 ">
            <button
              type="submit"
              className="flex items-center text-center bg-azure justify-center h-10 px-4 mx-2 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue ssm:w-8 ssm:h-8 ssm:px-0 ssm:mx-0"
            >
              {/* Segun la resolucion el contenido del boton cambia */}
              {width <= 575 ? (
                <img
                  src="src\assets\icons\plus.png"
                  alt="+"
                  className="p-1"
                />
              ) : (
                <span className="text-white font-medium">Agregar</span>
              )}
            </button>
          </div>
          {/* Contenedor del boton de Modo Oscuro-Claro */}
          <div className="flex items-center justify-end w-1/2">
            <button
              type="submit"
              className="flex items-center text-center bg-azure justify-center w-10 h-10 mx-6 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue ssm:w-8 ssm:h-8  ssm:mx-0"
            >
              <img
                src="src\assets\icons\moon.png"
                alt="Buscar"
                className="p-2"
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
