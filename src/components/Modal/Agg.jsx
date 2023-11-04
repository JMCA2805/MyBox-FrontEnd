import { useEffect, useState } from "react";
import { useItemsContext, useUpItemsContext } from "../../contexts/UpProvider";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";

function Agg() {
  const update = useUpItemsContext();
  const [hidden, setHidden] = useState(" hidden");

  //Creacion del estado del modal
  const {
    openAgg,
    handleOpenAgg,
    image,
    setImage,
    titulo,
    setTitulo,
    marca,
    setMarca,
    modelo,
    setModelo,
    category,
    setCategory,
    cantidad,
    setCantidad,
    precio,
    setPrecio,
    fecha,
    setFecha,
    setMessage,
    setStatus,
    handleOpenMessage,
    listCategory,
    getCategory,
    subcategory,
    setSubCategory,
    addCategory,
  } = useItemsContext();

  const handleHidden = () => {
    category === "true" ? setHidden(" flex") : setHidden(" hidden");
    setSubCategory("");
  };

  useEffect(() => {
    handleHidden();
  }, [category]);
  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
    if (fecha === null || fecha === "") {
      document.getElementById("fechaAgg").focus();
      return true;
    }

    if (titulo === null || titulo === "") {
      document.getElementById("tituloAgg").focus();
      return true;
    }

    if (marca === null || marca === "") {
      document.getElementById("marcaAgg").focus();
      return true;
    }

    if (modelo === null || modelo === "") {
      document.getElementById("modeloAgg").focus();
      return true;
    }

    if (category === "true" && subcategory == "") {
      if (subcategory === null || subcategory === "") {
        document.getElementById("categoryAgg").focus();
        return true;
      }
    } else {
      if (category === null || category === ""  || category === "false") {
        document.getElementById("category_select").focus();
        return true;
      }
    }

    if (cantidad === null || cantidad === "") {
      document.getElementById("cantidadAgg").focus();
      return true;
    }

    if (precio === null || precio === "") {
      document.getElementById("precioAgg").focus();
      return true;
    }

    return false;
  };

  const Agregar = async (e) => {
    e.preventDefault();
    if (image === null || image === "") {
      document.getElementById("imageAgg").click();
      return;
    }
    const alert = await focusOnFirstEmptyInput();
    if (alert === true) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("titulo", titulo);
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    if (category == "true" && subcategory != "") {
      formData.append("category", subcategory);
      await addCategory();
    } else {
      formData.append("category", category);
    }
    formData.append("cantidad", cantidad);
    formData.append("precio_adquisicion", precio);
    formData.append("fecha_adquisicion", fecha);

    const response = await fetch("http://localhost:4000/AgregarItem", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    await setMessage(data.message);
    await setStatus(data.status);
    handleOpenMessage();
    await getCategory()
    await update(true);
  };

  return (
    <>
      <>
        {/* Modal */}
        <Modal open={openAgg} handleOpen={handleOpenAgg}>
          {/* Cabecera del modal */}
          <ModalHeader>Agregar un Artículo</ModalHeader>
          {/* Cuerpo del Modal */}
          <ModalBody>
            <form
              className="flex-col flex px-4 justify-center items-center"
              onSubmit={async (e) => {
                Agregar(e);
              }}
              id="form_agg"
              encType="multipart/form-data"
            >
              <div className="w-full mb-4">
                <input
                  type="file"
                  name="image"
                  id="imageAgg"
                  className="w-full border-2 rounded-lg border-dark-tangerine dark:border-white file:bg-dark-tangerine file:text-white dark:file:bg-black file:font-bold file:border-none h-10 file:h-full dark:text-white text-gray focus:border-blaze-orange"
                  accept=".png"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="date"
                  onChange={(e) => {
                    setFecha(e.target.value);
                  }}
                  id="fechaAgg"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-gray focus:text-black bg-transparent focus:border-blaze-orange dark:focus:border-dark-tangerine"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese el titulo"
                  onChange={(e) => {
                    setTitulo(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="tituloAgg"
                />
              </div>

              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese la marca"
                  onChange={(e) => {
                    setMarca(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="marcaAgg"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese el modelo"
                  onChange={(e) => {
                    setModelo(e.target.value);
                  }}
                  id="modeloAgg"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                />
              </div>
              <div className="mb-4 w-full">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  name="category_select"
                  id="category_select"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange bg-white dark:bg-black"
                >
                  <option value={false}>Seleccione la categoría</option>
                  {listCategory
                    ? listCategory.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))
                    : null}
                  <option value={true}>Agregar otro</option>
                </select>
              </div>
              <div className={"mb-4 w-full " + hidden}>
                <input
                  placeholder="Ingrese la Categoría"
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                  id="categoryAgg"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  placeholder="Ingrese la cantidad"
                  onChange={(e) => {
                    setCantidad(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="cantidadAgg"
                />
              </div>
              <div className="w-full">
                <input
                  placeholder="Ingrese el precio"
                  onChange={(e) => {
                    setPrecio(e.target.value);
                  }}
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="precioAgg"
                />
              </div>
            </form>
          </ModalBody>
          {/* Footer del Nodal */}
          <ModalFooter>
            <Button handleOpen={handleOpenAgg}>
              <span>Cancelar</span>
            </Button>
            <button
              onClick={(e) => {
                Agregar(e);
              }}
              className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
            >
              <span>Guardar</span>
            </button>
          </ModalFooter>
        </Modal>
      </>
    </>
  );
}
export default Agg;
