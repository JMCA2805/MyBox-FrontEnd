import { useState } from "react";
import {
  Modal,
  Button,
  ButtonIcon,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./Modal";

function Agg() {
  // Estableciendo las variables
  const [image, setImage] = useState("");
  const [titulo, setTitulo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [fecha, setFecha] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

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
    const form = document.getElementById("form_agg");
    form.reset();
  };

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);
  const handleClose = () => {
    setOpen2(!open2);
    if (status === 500) {
      handleOpen2();
      return;
    }
    handleOpen();
  };

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
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
    if (image === null || image === "") {
      document.getElementById("image").click();
      return;
    }
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
    await setMessage(data.message);
    await setStatus(data.status);
    handleOpen2();
  };

  return (
    <>
      {/* Boton para abrir el Modal */}
      <ButtonIcon handleOpen={handleOpen}>
        {/* Segun la resolucion el contenido del boton cambia */}
        <img id="plus" alt="+" />
      </ButtonIcon>
      <>
        {/* Modal */}
        <Modal open={open} handleOpen={handleOpen}>
          {/* Cabecera del modal */}
          <ModalHeader>Agregar un Artículo</ModalHeader>
          {/* Cuerpo del Modal */}
          <ModalBody>
            <form
              className="flex-col flex px-4 justify-center items-center"
              onSubmit={async (e) => {
                Agregar(e);
              }}
              id="form_agg"
              encType="multipart/form-data"
            >
              <div className="w-full mb-4">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full border-2 rounded-lg border-dark-tangerine dark:border-white file:bg-dark-tangerine file:text-white dark:file:bg-black file:font-bold file:border-none h-10 file:h-full dark:text-white text-gray focus:border-blaze-orange"
                  accept=".png"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
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
              <div className="w-full">
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
          </ModalBody>
          {/* Footer del Nodal */}
          <ModalFooter>
            <Button handleOpen={handleOpen}>
              <span>Cancelar</span>
            </Button>
            <button
              onClick={(e) => {
                Agregar(e);
              }}
              className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            >
              <span>Guardar</span>
            </button>
          </ModalFooter>
        </Modal>
      </>

      <Modal open={open2} handleOpen={handleClose}>
        {/* Cabecera del modal */}
        <ModalHeader>Aviso</ModalHeader>
        {/* Cuerpo del Modal */}
        <ModalBody>
          <span className="text-white">{message}</span>
        </ModalBody>
        {/* Footer del Modal */}
        <ModalFooter>
          <Button handleOpen={handleClose}>Aceptar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default Agg;
