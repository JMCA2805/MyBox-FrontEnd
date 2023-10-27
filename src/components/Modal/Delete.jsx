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

      <Button className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mr-1 ssm:mx-0 ssm:mr-1 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange w-1/2 ssm:h-8 ssm:px-0 ssm:my-1 ssm:text-xs text-white font-bold"
      onClick={handleOpen} >
        Eliminar
      </Button>

      <Dialog open={open} size="sm" active={open} onClose={handleClose}>
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
