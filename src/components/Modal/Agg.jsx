import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Agg() {
  // Estableciendo las variables
  const [image, setImage] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [inputFile, setInputFile] = useState(null);
  const [message, setMessage] = useState(null);

  //Creacion del estado del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    setTitulo("");
    setImage("");
    setMarca("");
    setModelo("");
    setCantidad("");
    setPrecio("");
    setFecha("");
    setInputFile(null);
  };

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
    if (inputFile === null || inputFile === undefined) {
      document.getElementById("image").click();
    }

    if (fecha === null || fecha === "") {
      document.getElementById("fecha").focus();
      return true;
    }

    if (titulo === null || titulo === "") {
      document.getElementById("titulo").focus();
      return true;
    }

    if (marca === null || marca === "") {
      document.getElementById("marca").focus();
      return true;
    }

    if (modelo === null || modelo === "") {
      document.getElementById("modelo").focus();
      return true;
    }

    if (cantidad === null || cantidad === "") {
      document.getElementById("cantidad").focus();
      return true;
    }

    if (precio === null || precio === "") {
      document.getElementById("precio").focus();
      return true;
    }

    return false;
  };

  const Agregar = async (e) => {
    e.preventDefault();
    const alert = await focusOnFirstEmptyInput();
    if (alert === true) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("titulo", titulo);
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("cantidad", cantidad);
    formData.append("precio_adquisicion", precio);
    formData.append("fecha_adquisicion", fecha);

    const response = await fetch("http://localhost:4000/AgregarItem", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    await setMessage(data.message)
    handleOpen2();
  };

  return (
    <>
      {/* Boton para abrir el Modal */}
      <button
        onClick={handleOpen}
        variant="gradient"
        className="flex items-center justify-center w-10 h-10 mx-2 rounded-full ssm:w-8 ssm:h-8"
      >
        {/* Segun la resolucion el contenido del boton cambia */}
        <img id="plus" alt="+" />
      </button>
      <>
        {/* Modal */}
        <Dialog open={open} handler={handleOpen}>
          {/* Cabecera del modal */}
          <DialogHeader className="dark:bg-black bg-dark-tangerine text-white">
            Agregar un Artículo
          </DialogHeader>
          {/* Cuerpo del Modal */}
          <DialogBody className="flex justify-center items-center bg-white-smoke dark:bg-woodsmoke">
            <form
              className="flex-col flex px-4 justify-center items-center"
              onSubmit={async (e) => {
                Agregar(e);
              }}
              encType="multipart/form-data"
            >
              <div className="w-full mb-4">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full border-2 rounded-lg border-dark-tangerine dark:border-white file:bg-dark-tangerine file:text-white dark:file:bg-black file:font-bold file:border-none h-10 file:h-full dark:text-white text-gray focus:border-blaze-orange"
                  accept=".png, .jpg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setInputFile(e.target.files[0]);
                  }}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="date"
                  onChange={(e) => {
                    setFecha(e.target.value);
                  }}
                  id="fecha"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-gray focus:text-black bg-transparent focus:border-blaze-orange dark:focus:border-dark-tangerine"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese el titulo"
                  onChange={(e) => {
                    setTitulo(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="titulo"
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese la marca"
                  onChange={(e) => {
                    setMarca(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="marca"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese el modelo"
                  onChange={(e) => {
                    setModelo(e.target.value);
                  }}
                  id="modelo"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese la cantidad"
                  onChange={(e) => {
                    setCantidad(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="cantidad"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese el precio"
                  onChange={(e) => {
                    setPrecio(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="precio"
                />
              </div>
            </form>
          </DialogBody>
          {/* Footer del Nodal */}
          <DialogFooter className="flex justify-center items-center bg-white-smoke dark:bg-black">
            <button
              onClick={handleOpen}
              className="flex items-center text-center bg-pizazz dark:bg-gray dark:hover:text-dark-tangerine dark:hover:bg-woodsmoke dark:border-0 justify-center h-10 px-4 mx-2 rounded-lg hover:bg-dark-tangerine focus:bg-blaze-orange border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            >
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              className="flex items-center text-center bg-pizazz dark:bg-gray dark:hover:text-dark-tangerine dark:hover:bg-woodsmoke dark:border-0 justify-center h-10 px-4 mx-2 rounded-lg hover:bg-dark-tangerine focus:bg-blaze-orange border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
              onClick={(e) => {
                Agregar(e);
              }}
            >
              <span>Guardar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </>
      <Dialog open={open2} handler={handleOpen2}>
        {/* Cabecera del modal */}
        <DialogHeader className="dark:bg-black bg-dark-tangerine text-white">
          Aviso
        </DialogHeader>
        {/* Cuerpo del Modal */}
        <DialogBody className="flex justify-center items-center bg-white-smoke dark:bg-woodsmoke dark:text-white text-black font-bold">
          <span>{message}</span>
        </DialogBody>
        <DialogFooter className="flex justify-center items-center bg-white-smoke dark:bg-black">
          <button
            onClick={async () => {
              await handleOpen2();
            }}
            className="flex items-center text-center bg-pizazz dark:bg-gray dark:hover:text-dark-tangerine dark:hover:bg-woodsmoke dark:border-0 justify-center h-10 px-4 mx-2 rounded-lg hover:bg-dark-tangerine focus:bg-blaze-orange border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
          >
            Aceptar
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default Agg;
