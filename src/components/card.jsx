import React, { useEffect, useState } from 'react';

function Card() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ListarItem")
      .then((res) => res.json())
      .then((data) => {
        setItems(data); // Guarda los datos recibidos en el estado
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const formatDate = (dateString) => {
    let fecha = new Date(dateString);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    let año = fecha.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;

    return dia + '-' + mes + '-' + año;
  }

  return (
    <div className="flex flex-wrap justify-around">
      {items.map((item) => (
        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden m-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="relative h-56 flex items-center justify-center"> {/* Centra la imagen */}
            <img className="absolute h-full w-full object-cover" src="./public/descarga.jpeg" alt="" />
          </div>
          <h2 className="text-center text-xl font-bold">{item.titulo}</h2> {/* Agrega el título del ítem centrado debajo de la imagen */}
          <div className="p-4">
            <h1 className="text-xl font-bold">Marca: {item.marca}</h1>
            <h1 className="text-lg">Modelo: {item.modelo}</h1>
            <h1 className="text-lg">Cantidad: {item.cantidad}</h1>
            <h1 className="text-lg">Precio: {item.precio_adquisicion}</h1>
            <h1 className="text-lg">Fecha de adquisición: {formatDate(item.fecha_adquisicion)}</h1>
          </div>
          <div className="p-4 bg-gray-100 text-right text-sm flex justify-between items-center px-8"> {/* Agrega padding al div del encabezado */}
            Card Footer
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                Agregar
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
