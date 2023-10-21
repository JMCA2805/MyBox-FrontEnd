import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

function DeleteModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    // Agrega la lógica para eliminar el ítem
    console.log('Ítem eliminado');
    handleClose();
  };

  return (
    <>
      <Button color="lightBlue" onClick={handleOpen} ripple="light">
        Eliminar
      </Button>

      <Dialog size="sm" active={open} onClose={handleClose}>
        <DialogHeader onClose={handleClose}>
          Confirmar eliminación
        </DialogHeader>

        <DialogBody>
          ¿Estás seguro de que quieres eliminar este ítem?
        </DialogBody>

        <DialogFooter>
          <Button color="blue" onClick={handleClose} ripple="dark">
            Cancelar
          </Button>

          <Button color="red" onClick={handleDelete} ripple="light">
            Eliminar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteModal;
