function NavBar() {
  //Recargar la pagina desde cache
  const reload = () => {
    window.location.reload(false);
  };

  return (
    <>
      {/* Creacion del NavBar */}
      <nav className="h-16 w-full bg-white shadow-lg flex">
        {/* Contenedor del logo */}
        <div className="w-1/6 h-full flex justify-center items-center">
          <button
            onClick={() => {
              reload();
            }}
          >
            <img src="src\assets\logo.png" alt="Logo" className="h-12" />
          </button>
        </div>
        {/* Contenedor del Buscar */}
        <section className="w-4/6 flex justify-center items-center h-full">
          {/* Buscador */}
          <input
            type="text"
            className="w-3/6 h-10 text-lg text-gray font-medium px-6 rounded-full border-2 border-azure focus:outline-none focus:border-midnight-blue focus:text-purple-navy"
            placeholder="Buscar"
          />
          {/* Boton de Buscar */}
          <button
            type="submit"
            class="flex items-center bg-azure justify-center w-10 h-10 mx-2 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue"
          >
            <img
              src="src\assets\icons\search-white.png"
              alt="Buscar"
              className="p-2"
            />
          </button>
        </section>
        {/* Contenedor de botones */}
        <div className="flex items-center justify-center w-1/6 ">
          {/* Contenedor del boton Agregar */}
          <div className="flex items-center justify-center w-1/2">
            <button
              type="submit"
              class="flex items-center text-center bg-azure justify-center h-10 px-4 mx-2 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue"
            >
              <span className="text-white font-medium">Agregar</span>
            </button>
          </div>
          {/* Contenedor del boton de Modo Oscuro-Claro */}
          <div className="flex items-center justify-end w-1/2">
            <button
              type="submit"
              class="flex items-center text-center bg-azure justify-center w-10 h-10 mx-6 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue"
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
