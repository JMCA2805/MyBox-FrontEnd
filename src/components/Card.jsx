import React, { useEffect, useState } from "react";
import { useItemsContext } from "../UpProvider";
import Edit from "./Modal/Edit";
import ItemDelete from "./Modal/Delete";

function Card() {
  const items = useItemsContext();

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
        <div
          key={item._id}
          id={item._id}
          className="dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40  p-4 h-96 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2"
        >
          <div className="h-2/5 flex items-center justify-center w-full border-b border-pizazz/30 bg-white-smoke rounded-t-lg dark:bg-woodsmoke">
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
            <ItemDelete item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
