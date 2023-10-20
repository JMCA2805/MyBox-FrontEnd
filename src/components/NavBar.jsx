import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function NavBar() {
  const [image, setImage] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [fecha, setFecha] = useState(null);

  //Creacion del estado del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [width, setWidth] = useState(600);

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
            {/* Boton del Modal */}
            <Button
              onClick={handleOpen}
              variant="gradient"
              className="flex items-center text-center bg-azure justify-center h-10 px-4 mx-2 rounded-full hover:bg-purple-navy focus:bg-midnight-blue border-b-4 border-midnight-blue ssm:w-8 ssm:h-8 ssm:px-0 ssm:mx-0"
            >
              {/* Segun la resolucion el contenido del boton cambia */}
              {width <= 575 ? (
                <img src="src\assets\icons\plus.png" alt="+" className="p-1" />
              ) : (
                <span className="text-white font-medium">Agregar</span>
              )}
            </Button>
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

      <>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Agregar un Artículo</DialogHeader>
          <DialogBody>
            <form
              className="w-full flex-col flex p-12 justify-center items-center"
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append("image", image);
                formData.append("titulo", titulo);
                formData.append("marca", marca);
                formData.append("modelo", modelo);
                formData.append("cantidad", cantidad);
                formData.append("precio_adquisicion", precio);
                formData.append("fecha_adquisicion", fecha);

                const response = await fetch(
                  "http://localhost:4000/AgregarIItem",
                  {
                    method: "POST",
                    body: formData,
                  }
                );
                const data = await response.json();
                console.log(data);
              }}
              encType="multipart/form-data"
            >
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                name="image"
              />
              <input
                type="text"
                onChange={(e) => {
                  setTitulo(e.target.value);
                }}
                name="titulo"
                placeholder="Ingrese el titulo"
              />

              <input
                type="text"
                onChange={(e) => {
                  setMarca(e.target.value);
                }}
                name="marca"
                placeholder="Ingrese la marca"
              />

              <input
                type="text"
                onChange={(e) => {
                  setModelo(e.target.value);
                }}
                name="modelo"
                placeholder="Ingrese el modelo"
              />

              <input
                type="text"
                onChange={(e) => {
                  setCantidad(e.target.value);
                }}
                name="cantidad"
                placeholder="Ingrese la cantidad"
              />

              <input
                type="text"
                onChange={(e) => {
                  setPrecio(e.target.value);
                }}
                name="precio"
                placeholder="Ingrese el precio"
              />

              <input
                type="date"
                onChange={(e) => {
                  setFecha(e.target.value);
                }}
                name="fecha"
              />

              <button>Enviar</button>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </>
  );
}
export default NavBar;
