import React, { useEffect, useState } from "react";
import Edit from "./Modal/Edit";

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
    <div className="grid grid-cols-5 gap-4 px-12 py-12">
      {items.map((item) => (
        <div className="dark:text-white dark:bg-midnight-blue bg-white rounded-lg shadow-lg overflow-hidden w-full border-purple-navy/30  p-4 h-96 hover:shadow-xl hover:border-azure hover:border-2">
          <div className="relative h-2/5 flex items-center justify-center w-full border-b border-purple-navy/30 dark:border-white/30">
            {" "}
            {/* Centra la imagen */}
            <img
              className="absolute h-full w-full object-cover"
              src={`${item.imagen}`}
              alt={`Imagen de ${item.titulo}`}
            />
          </div>
          <div className="h-36">
            <h1 className="text-center text-base font-bold mt-1">
              {item.titulo}
            </h1>
            {/* Agrega el título del ítem centrado debajo de la imagen */}
            <div className="flex flex-col">
              <div className="flex text-sm">
                <span className="text-sm font-bold">Modelo:</span>
                <span className="font-normal text-center ml-1  ">
                  {item.modelo}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-sm font-bold">Marca: </span>
                <span className="font-normal text-center ml-1 ">
                  {item.marca}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-sm font-bold">Cantidad:</span>
                <span className="font-normal text-center ml-1 ">
                  {item.cantidad + " u"}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-sm font-bold">Precio:</span>
                <span className="font-normal text-center ml-1 ">
                  {item.precio_adquisicion + "$"}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-bold">Fecha:</span>
                <span className="font-normal text-center ml-1  text-sm">
                  {formatDate(item.fecha_adquisicion)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex text-white justify-between items-center">
            {/* Agrega padding al div del encabezado */}

            <Edit />

            <button className="dark:bg-purple-navy dark:border-pigment-blue dark:hover:bg-blue-900 flex w-1/2 items-center text-center bg-midnight-blue justify-center h-10 px-4 mx-2 rounded-lg hover:bg-midnight-blue focus:bg-purple-navy border-b-4 border-purple-navy ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1">
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
