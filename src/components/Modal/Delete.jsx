import { useItemsContext } from "../../contexts/UpProvider";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";

function ItemDelete() {
  const { setMessage, setStatus, item, handleOpenMessage,handleOpenDel,openDel } = useItemsContext();

  const itemId = item._id; // Reemplaza esto con el ID del ítem que

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:4000/item/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    await setMessage(data.message);
    await setStatus(data.status);
    await handleOpenMessage();
  };

  return (
    <>
      <Modal open={openDel} handleOpen={handleOpenDel}>
        <ModalHeader>Confirmar eliminación</ModalHeader>

        <ModalBody>¿Estás seguro de que quieres eliminar este ítem?</ModalBody>

        <ModalFooter>
          <Button handleOpen={handleOpenDel}>Cancelar</Button>

          <button
            className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ItemDelete;
