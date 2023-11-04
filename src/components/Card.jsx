import { useItemsContext } from "../contexts/UpProvider";
import { Button } from "./Modal/Modal";
import { useMatch } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Card() {
  const match2 = useMatch("/Home");
  const { user } = useAuth();
  const {
    items,
    setItem,
    handleOpenEdit,
    handleOpenDel,
    setImage,
    setTitulo,
    setMarca,
    setModelo,
    setCategory,
    setCantidad,
    setPrecio,
    setFecha,
  } = useItemsContext();

  const formatDate = (dateString) => {
    let fecha = new Date(dateString);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    let año = fecha.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return dia + "-" + mes + "-" + año;
  };

  const favorito = async (fav) => {
    const response = await fetch("http://localhost:4000/favoritos", {
      method: "POST",
      body: JSON.stringify(fav),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-12 md:grid-cols-3 ssm:grid-cols-2 ssm:p-4">
      {items.map((item) => (
        <div
          key={item._id}
          id={item._id}
          className={
            "relative z-0 dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40  p-4 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2 " +
            (match2 && user.rol == "Admin" ? "h-96" : "h-80")
          }
        >
          {match2 && user.rol == "User" ? (
            <>
              <button
                className="absolute w-10 h-10 right-0 top-0 dark:bg-transparent bg-white rounded-full hover:border-2 hover:border-dark-tangerine"
                onClick={() => {
                  favorito({ categoria: item._id, userId: user.username });
                  //"Funcion para cambiar el icono por el relleno y agregar a favorito"
                  //Usar un true para confirmar el response de que esta en favorito y false para no estar en favorito
                  //Y ese mismo tru usar para ver si se va a guardar de favoritos o eliminar
                }}
              >
                {/* Centra la imagen */}
                <img
                  className="h-full p-1"
                  src="src\assets\icons\star-regular-240.png"
                  alt="Estrella"
                />
              </button>
            </>
          ) : null}
          <div
            className={
              "flex items-center justify-center w-full border-b border-pizazz/30 bg-white-smoke rounded-t-lg dark:bg-woodsmoke " +
              (match2 && user.rol == "Admin" ? "h-2/5 " : "h-2/4")
            }
          >
            {/* Centra la imagen */}
            <img
              className="h-full p-2"
              src={`${item.imagen}`}
              alt={`Imagen de ${item.titulo}`}
            />
          </div>
          <div className="h-36 py-2 ssm:h-32">
            <h1 className="text-center text-base font-bold mt-1 ssm:text-sm">
              {item.titulo}
            </h1>
            {/* Agrega el título del ítem centrado debajo de la imagen */}
            <div className="flex flex-col">
              <div className="flex text-xs">
                <span className="text-xs font-bold">Marca: </span>
                <span className="font-normal text-center ml-1 ">
                  {item.marca}
                </span>
              </div>
              <div className="flex text-xs">
                <span className="text-xs font-bold">Modelo:</span>
                <span className="font-normal text-center ml-1  ">
                  {item.modelo}
                </span>
              </div>
              <div className="flex text-xs">
                <span className="text-xs font-bold">Categoría:</span>
                <span className="font-normal text-center ml-1  ">
                  {item.category}
                </span>
              </div>
              <div className="flex text-xs">
                <span className="text-xs font-bold">Cantidad:</span>
                <span className="font-normal text-center ml-1 ">
                  {item.cantidad + " u"}
                </span>
              </div>
              <div className="flex text-xs">
                <span className="text-xs font-bold">Precio:</span>
                <span className="font-normal text-center ml-1 ">
                  {item.precio_adquisicion + "$"}
                </span>
              </div>
              <div className="flex">
                <span className="text-xs font-bold">Fecha:</span>
                <span className="font-normal text-center ml-1  text-sm">
                  {formatDate(item.fecha_adquisicion)}
                </span>
              </div>
            </div>
          </div>
          {match2 && user.rol == "Admin" ? (
            <div className="flex text-white justify-between items-center">
              {/* Boton para abrir el Modal */}
              <Button
                handleOpen={async () => {
                  handleOpenEdit();
                  setItem(item);
                  setImage(item.image);
                  setTitulo(item.titulo);
                  setMarca(item.marca);
                  setModelo(item.modelo);
                  setCategory(item.category);
                  setCantidad(item.cantidad);
                  setPrecio(item.precio_adquisicion);
                  setFecha(item.fecha_adquisicion);
                }}
              >
                Editar
              </Button>
              <Button
                handleOpen={() => {
                  setItem(item);
                  handleOpenDel();
                }}
              >
                Eliminar
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Card;
