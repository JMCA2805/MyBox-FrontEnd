import React, { useEffect, useState } from "react";
import Edit from "./Modal/Edit";
import Delete from "./Modal/Delete";

function Card() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ListarItem")
      .then((res) => res.json())
      .then((data) => {
        setItems(data); // Guarda los datos recibidos en el estado
      })
      .catch((error) => console.error("Error:", error));
  }, []);

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
  return (
    <div className="grid grid-cols-5 gap-4 p-12 md:grid-cols-3 ssm:grid-cols-2 ssm:p-4">
      {items.map((item) => (
        <div className="dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40  p-4 h-96 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2">
          <div className="relative h-2/5 flex items-center justify-center w-full border-b border-pizazz/30 bg-white-smoke rounded-t-lg dark:bg-woodsmoke">
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

          <div className="flex text-white justify-between items-center">
            {/* Agrega padding al div del encabezado */}

            <Edit item={item} />
            <Delete  />
            {/* <button className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 ml-1 ssm:mx-0 ssm:ml-1 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange w-1/2 ssm:h-8 ssm:px-0 ssm:my-1 ssm:text-xs text-white font-bold">
              <span>Eliminar</span>
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
