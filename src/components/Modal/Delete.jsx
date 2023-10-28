import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

function ItemDelete({item}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const itemId = item._id; // Reemplaza esto con el ID del ítem que 

  const handleDelete = () => {
    const element = document.querySelector('#delete-request .status');
      fetch(`http://localhost:8000/item/${itemId}`, 
      { method: 'DELETE' })
    .then(() => element.innerHTML = 'Delete successful');
    console.log('Ítem eliminado');
    handleClose();
  };
console.log(item._id)

  return (
    <>
      <Button 
      onClick={handleOpen} >
        Eliminar
      </Button>

      <Dialog open={open} size="sm" active={open} onClose={handleClose}>
        <DialogHeader className="dark:bg-black bg-dark-tangerine text-white" onClose={handleClose}>
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

export default ItemDelete;
