import { useState, useEffect } from "react";
import { useUpItemsContext } from "../../UpProvider";
import {
  Modal,
  Button,
  ButtonIcon,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./Modal";

function Edit({ item }) {
  const update = useUpItemsContext();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  const handleClose = () => {
    setOpen2(!open2);
    if (status === 500) {
      handleOpen2();
      return;
    }
    handleOpen();
    update()
  };

  // Estableciendo las variables
  const [image, setImage] = useState(item.imagen);
  const [titulo, setTitulo] = useState(item.titulo);
  const [marca, setMarca] = useState(item.marca);
  const [modelo, setModelo] = useState(item.modelo);
  const [cantidad, setCantidad] = useState(item.cantidad);
  const [precio, setPrecio] = useState(item.precio_adquisicion);
  const [fecha, setFecha] = useState(item.fecha_adquisicion);

  //Creacion del estado del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
    return false;
  };

  const Editar = async (e) => {
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

    setImage(item.image);
    setTitulo(item.titulo);
    setMarca(item.marca);
    setModelo(item.modelo);
    setCantidad(item.cantidad);
    setPrecio(item.precio_adquisicion);
    setFecha(item.fecha_adquisicion);

    const itemId = item._id; // Reemplaza esto con el ID del ítem que deseas editar
    const url = `http://localhost:4000/items/${itemId}`;
    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setStatus(data.status);
        handleOpen2()
      })
      .catch((error) => console.error("Error:", error));
  };

  const formatDate = (dateString) => {
    let fecha = new Date(dateString);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    let año = fecha.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return año + "-" + mes + "-" + dia;
  };
  return (
    <>
      {/* Boton para abrir el Modal */}
      <Button handleOpen={handleOpen}> Editar</Button>
      <>
        {/* Modal */}
        <Modal open={open} handleOpen={handleOpen}>
          {/* Cabecera del modal */}
          <ModalHeader>Editar un Artículo</ModalHeader>
          {/* Cuerpo del Modal */}
          <ModalBody>
            <form
              className="flex-col flex px-4 justify-center items-center"
              onSubmit={async (e) => {
                Editar(e);
              }}
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
            <Button handleOpen={handleOpen}>Cancelar</Button>
            <button
              className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
              onClick={(e) => {
                Editar(e);
              }}
            >
              Guardar
            </button>
          </ModalFooter>
        </Modal>

        <Modal open={open2} handleOpen={handleClose}>
        {/* Cabecera del modal */}
        <ModalHeader>Aviso</ModalHeader>
        {/* Cuerpo del Modal */}
        <ModalBody>
          <span className="text-black dark:text-white">{message}</span>
        </ModalBody>
        {/* Footer del Modal */}
        <ModalFooter>
          <Button handleOpen={handleClose}>Aceptar</Button>
        </ModalFooter>
      </Modal>
      </>
    </>
  );
}
export default Edit;
