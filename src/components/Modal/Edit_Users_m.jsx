import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { useItemsContext } from "../../contexts/UpProvider";
import { useEffect, useState } from "react";

function Edit_User() {
   const {
    openEdit_user,
    handleOpenEdit_user,
    } = useItemsContext();
    
   return (
      <>
         <Modal open={openEdit_user} handleOpen={handleOpenEdit_user}>
            <form className="flex-col flex px-4 justify-center items-center"
               onSubmit={async (e) => {
                  Editar(e);
               }}
               id="form_edit_user"
               encType="multipart/form-data"
            >
                <div>
                    text
                </div>
            
            </form>
        </Modal>
      </>
  );
}
export default Edit_User;
