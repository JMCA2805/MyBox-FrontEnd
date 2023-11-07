import { useItemsContext, useUpItemsContext } from "../contexts/UpProvider";
import { Button } from "./Modal/Modal";
import { useMatch } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";

function Card() {
  const match = useMatch("/");
  const match2 = useMatch("/Home");
  const match3 = useMatch("/Favoritos");
  const { user, isAuthenticated } = useAuth();
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
    listCategory,
    setFilterCategory,
    setStatus,
    setMessage,
    handleOpenMessage,
    pages,
    setPage,
    page,
  } = useItemsContext();

  const handlePage = async (isPlus) => {
    if (page == 1 && !isPlus) {
      return;
    }
    if (page == pages && isPlus) {
      return;
    }
    isPlus ? await setPage(page + 1) : await setPage(page - 1);

  };
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

  const [getfavoritos, setGetFavoritos] = useState([{ _id: "" }]);
  const [load, setLoad] = useState(true);

  const GetFavoritos = async (user) => {
    const res = await fetch(`http://localhost:4000/favoritos/${user}`);
    const data = await res.json();
    await setGetFavoritos(data);
  };

  useEffect(() => {
    if ((user != null || user != {}) && isAuthenticated) {
      GetFavoritos(user.userId);
    }
  }, [load]);

  const favorito = async (itemId) => {
    const res = await fetch(
      `http://localhost:4000/favoritos/${user.userId}/${itemId}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const data = await res.json();
    await setMessage(data.message);
    await setStatus(data.status);
    handleOpenMessage();
    await GetFavoritos(user.userId);
  };

  return (
    <>
      {getfavoritos == "" && match3 ? (
        <>
          {" "}
          <div className="w-full h-96 flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-black dark:text-pizazz ssm:text-xl px-12">
              No hay Favoritos
            </h1>
          </div>
        </>
      ) : null}
      {items.length == 0 ? (
        <>
          {" "}
          <div className="w-full h-96 flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-black dark:text-pizazz ssm:text-xl px-12">
              No hay artículos disponibles
            </h1>
          </div>
        </>
      ) : (
        <>
          {!match3 ? (
            <>
              <div className="w-full h-12 px-12 ssm:p-4 pt-5 grid grid-cols-5 ssm:grid-cols-2 md:grid-cols-3 justify-end pr-12 gap-4 ">
                <select
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                  }}
                  name="filter_categoria"
                  id="filter_categoria"
                  className="p-1 w-full border focus:outline-none rounded-lg border-pizazz/40 h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange bg-white dark:bg-black"
                >
                  <option value={""}>Seleccione la categoría</option>
                  {listCategory
                    ? listCategory.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </>
          ) : null}
          <div
            id="cards"
            className="grid grid-cols-5 gap-4 p-12 pt-6 md:grid-cols-3 ssm:grid-cols-2 ssm:p-4"
          >
            {items.products.map((item) =>
              item.cantidad == 0 && (match || user.rol != "Admin") ? null : (
                <div
                  key={item._id}
                  id={item._id}
                  className={
                    "xl:hover:-translate-y-6 xl:hover:scale-105 xl:hover:ease-in xl:hover:duration-300 xl:hover:dark:bg-black relative z-0 dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40  p-4 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2 " +
                    (match2 && user.rol == "Admin" ? "h-96" : "h-80") +
                    (getfavoritos.find((e) => e._id === item._id) !=
                      undefined && match3
                      ? " flex-col"
                      : getfavoritos.find((e) => e._id === item._id) ==
                          undefined && match3
                      ? " hidden"
                      : match2 || match
                      ? " flex-col"
                      : null)
                  }
                >
                  {(match2 || match3) && user.rol == "User" ? (
                    <>
                      <button
                        className="absolute w-10 h-10 right-0 top-0 dark:bg-transparent bg-white rounded-full hover:border-2 hover:border-dark-tangerine"
                        onClick={() => {
                          favorito(item._id);
                          setLoad(!load);
                        }}
                      >
                        <img
                          className="h-full p-1"
                          src={
                            getfavoritos.find((e) => e._id === item._id) !=
                            undefined
                              ? "src/assets/icons/star-solid-240.png"
                              : "src/assets/icons/star-regular-240.png"
                          }
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
                  <div className="h-40 py-2 ssm:h-32">
                    <div className="w-full px-2 group flex relative justify-center items-center">
                      <h1 className="text-center text-base font-bold ssm:text-xs truncate h-full overflow-hidden">
                        {item.titulo}
                      </h1>
                      <span className="absolute flex text-center -top-8 scale-0 rounded bg-white dark:bg-black p-2 text-xs text-black dark:text-white group-hover:scale-100 border border-pizazz/30">
                        {item.titulo}
                      </span>
                    </div>
                    {/* Agrega el título del ítem centrado debajo de la imagen */}
                    <div className="flex flex-col justify-center py-1">
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
                          {item.cantidad}
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
                        <span className="font-normal text-center ml-1  text-xs">
                          {formatDate(item.fecha_adquisicion)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {match2 && user.rol == "Admin" ? (
                    <div className="flex text-white gap-2 xl:gap-6 items-center justify-center">
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
              )
            )}
          </div>

          {/* Paginador */}
          <div className="flex items-center justify-end px-12 ssm:px-4">
            <div className="flex items-center justify-end bg-white rounded-full border border-pizazz/40 dark:bg-black ">
              <div className="flex  items-center gap-2  p-1">
                <button
                  onClick={()=>{handlePage(false)}}
                  className="h-8 w-8 border border-pizazz/40 text-sm font-medium text-black dark:text-pizazz rounded-full "
                >
                  {"<"}
                </button>
                <>
                  {Array.from(Array(pages), (_, i) => (
                    <button
                      key={i}
                      className={
                        "h-8 w-6 bordertext-sm font-medium text-black dark:text-pizazz" +
                        (i + 1 == page ? " border-2 border-pizazz" : " ")
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                </>

                <button
                  onClick={()=>{handlePage(true)}}
                  className="h-8 w-8 border border-pizazz/40 text-sm font-medium text-black dark:text-pizazz rounded-full "
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
