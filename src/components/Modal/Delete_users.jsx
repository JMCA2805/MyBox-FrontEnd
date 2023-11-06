import { useItemsContext } from "../../contexts/UpProvider";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import React, { useState } from "react";

function UserDelete() {
  //Creacion del estado del modal
  const { openDelUser, handleOpenDelUser, userIdToDelete } = useItemsContext();

  const handleDelete_User = async () => {
    console.log(userIdToDelete);
    //  const response = await fetch(, {
    //    method: "DELETE",
    //  });
    //  const data = await response.json();
    //  await setMessage(data.message);
    //  await setStatus(data.status);
    //  await handleOpenMessage();
    //  setIsOpen(false);
  };

  return (
    <>
      <Modal open={openDelUser} handleOpen={handleOpenDelUser}>
        <ModalHeader>Confirmar eliminación</ModalHeader>
        <ModalBody>¿Estás seguro de que quieres eliminar este ítem?</ModalBody>
        <ModalFooter>
          <Button handleOpen={()=>{handleOpenDelUser()}}>Cancelar</Button>
          <button
            className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            onClick={handleDelete_User}
          >
            Eliminar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserDelete;
