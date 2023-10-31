import { useState } from "react";
import { useUpItemsContext } from "../../UpProvider";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";

function ItemDelete({ item }) {
  const update = useUpItemsContext();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  const handleClose = () => {
    setOpen2(!open2);
    if (status === 500) {
      handleOpen2();
      return;
    }
    handleOpen();
    update(true)
  };

  const itemId = item._id; // Reemplaza esto con el ID del ítem que

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:4000/item/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    await setMessage(data.message);
    await setStatus(data.status);
    await handleOpen2();
  };

  return (
    <>
      <Button handleOpen={handleOpen}> Eliminar</Button>

      <Modal open={open} handleOpen={handleOpen}>
        <ModalHeader>Confirmar eliminación</ModalHeader>

        <ModalBody>¿Estás seguro de que quieres eliminar este ítem?</ModalBody>

        <ModalFooter>
          <Button handleOpen={handleOpen}>Cancelar</Button>

          <button
            className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            onClick={handleDelete}
          >
            Eliminar
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
  );
}

export default ItemDelete;
