import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

function Edit({item}) {
  // Estableciendo las variables
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

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
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

    if (fecha === null || fecha === "") {
      document.getElementById("fecha").focus();
      return true;
    }
    return false;
  };

  const Editar = async (e) => {
    e.preventDefault();
    const alert = await focusOnFirstEmptyInput();
    if (alert === true) {
      return;
    }
    const formData = new FormData();
   // formData.append("image", image);
    formData.append("titulo", titulo);
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("cantidad", cantidad);
    formData.append("precio_adquisicion", precio);
    formData.append("fecha_adquisicion", fecha);

    setTitulo(item.titulo);
   // setImage(item.image);
    setMarca(item.marca);
    setModelo(item.modelo);
    setCantidad(item.cantidad);
    setPrecio(item.precio_adquisicion);
    setFecha(item.fecha_adquisicion);

    const response = await fetch("http://localhost:4000/item/:id", {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
  };
  
  const formatDate = (dateString) => {
    let fecha = new Date(dateString);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    let año = fecha.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return año + "-" + mes + "-" + dia ;
  };
  return (
    <>
      {/* Boton para abrir el Modal */}
      <button
        onClick={handleOpen}
        className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mr-1 ssm:mx-0 ssm:mr-1 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange w-1/2 ssm:h-8 ssm:px-0 ssm:my-1 ssm:text-xs text-white font-bold"
        >
        <span>Editar</span>
      </button>
      <>
        {/* Modal */}
        <Dialog open={open} handler={handleOpen}>
          {/* Cabecera del modal */}
          <DialogHeader className="dark:bg-black bg-dark-tangerine text-white">
            Editar un Artículo
          </DialogHeader>
          {/* Cuerpo del Modal */}
          <DialogBody className="flex justify-center items-center bg-white-smoke dark:bg-woodsmoke">
            <form
              className="flex-col flex px-4 justify-center items-center"
              onSubmit={async (e) => {
                Editar(e);
              }}
              encType="multipart/form-data"
            >
               <div className="w-full mb-4" id="fileUpload">
                <input
                  id="file"
                  value={item.image}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  className="text-sm text-gray-900 focus:text-purple-navy border border-azure rounded-lg cursor-pointer bg-ghost-white focus:outline-none  mb-4"
                />
              </div> 
              <div className="mb-4 w-full">
                <input
                  type="date"
                  onChange={(e) => {
                    setFecha(e.target.value);
                  }}
                  id="fecha"
                  value={formatDate(item.fecha_adquisicion)}
                  className="w-full rounded-lg "
                />
              </div>
              <div className="mb-4 w-full">
                <Input
                  color="blue"
                  label="Ingrese el titulo"
                  value={item.titulo}
                  onChange={(e) => {
                    setTitulo(e.target.value);
                  }}
                  className="focus:border-azure focus:text-purple-navy bg-white"
                  id="titulo"
                />
              </div>

              <div className="mb-4 w-full">
                <Input
                  color="blue"
                  label="Ingrese la marca"
                  value={item.marca}
                  onChange={(e) => {
                    setMarca(e.target.value);
                  }}
                  className="focus:border-azure focus:text-purple-navy bg-white"
                  id="marca"
                />
              </div>
              <div className="mb-4 w-full">
                <Input
                  color="blue"
                  label="Ingrese el modelo"
                  value={item.modelo}
                  onChange={(e) => {
                    setModelo(e.target.value);
                  }}
                  id="modelo"
                  className="focus:border-azure focus:text-purple-navy bg-white"
                />
              </div>
              <div className="mb-4 w-full">
                <Input
                  color="blue"
                  label="Ingrese la cantidad"
                  value={item.cantidad}
                  onChange={(e) => {
                    setCantidad(e.target.value);
                  }}
                  className="focus:border-azure focus:text-purple-navy bg-white"
                  id="cantidad"
                />
              </div>
              <div className="mb-4 w-full">
                <Input
                  color="blue"
                  label="Ingrese el precio"
                  value={item.precio_adquisicion}
                  onChange={(e) => {
                    setPrecio(e.target.value);
                  }}
                  className="focus:border-azure focus:text-purple-navy bg-white"
                  id="precio"
                />
              </div>
            </form>
          </DialogBody>
          {/* Footer del Nodal */}
          <DialogFooter className="flex justify-center items-center bg-white-smoke dark:bg-black">
            <Button
              onClick={handleOpen}
              className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            >
              <span>Cancelar</span>
            </Button>
            <Button
              className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
              onClick={(e) => {
                Editar(e);
              }}
            >
              <span>Guardar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </>
  );
}
export default Edit;
