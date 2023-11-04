import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { useItemsContext } from "../../contexts/UpProvider";

export default function Message() {
  //Creacion del estado del modal
  const { message, openMessage, handleClose } = useItemsContext();
  return (
    <Modal open={openMessage} handleOpen={handleClose}>
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
  );
}
