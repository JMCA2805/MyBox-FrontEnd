import { useState } from "react";

function Agg() {
  const [image, setImage] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [fecha, setFecha] = useState(null);

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("image", image);
            formData.append("titulo", titulo);
            formData.append("marca", marca);
            formData.append("modelo", modelo);
            formData.append("cantidad", cantidad);
            formData.append("precio_adquisicion", precio);
            formData.append("fecha_adquisicion", fecha);

            const response = await fetch("http://localhost:4000/AgregarIItem", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            console.log(data);
          }}
          encType="multipart/form-data"
        >
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            name="image"
          />
          <input type="text" onChange={(e) => {
            setTitulo(e.target.value)
          }}
          name="titulo"
          placeholder="Ingrese el titulo"/>

          <input type="text" onChange={(e) => {
            setMarca(e.target.value)
          }}
          name="marca"
          placeholder="Ingrese la marca"/>

          <input type="text" onChange={(e) => {
            setModelo(e.target.value)
          }}
          name="modelo"
          placeholder="Ingrese el modelo"/>

          <input type="text" onChange={(e) => {
            setCantidad(e.target.value)
          }}
          name="cantidad"
          placeholder="Ingrese la cantidad"/>

          <input type="text" onChange={(e) => {
            setPrecio(e.target.value)
          }}
          name="precio"
          placeholder="Ingrese el precio"/>

          <input type="date" onChange={(e) => {
            setFecha(e.target.value)
          }}
          name="fecha"
          />


          <button>Enviar</button>
        </form>
      </div>
    </>
  );
}

export default Agg;
