import React, { useState, useContext, useEffect } from "react";

const itemsContext = React.createContext();
const upitemsContext = React.createContext();
export const SearchContext = React.createContext();

export function useItemsContext() {
  return useContext(itemsContext);
}

export function useUpItemsContext() {
  return useContext(upitemsContext);
}

export function useSearchContext() {
  return useContext(searchContext);
}

export default function UpProvider({ children }) {
  const [items, setItems] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const fetchData = async (load) => {
    if (load === true) {
      fetch("http://localhost:4000/ListarItem")
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(`http://localhost:4000/FilterProducts/${inputSearch}`)
        .then((res) => res.json())
        .then((data) => {
          data.length > 0 ? setItems(data) : setItems([]);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  //Data de Agg
  // Estableciendo las variables
  const [image, setImage] = useState("");
  const [titulo, setTitulo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [fecha, setFecha] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  //Reset
  const reset = () => {
    setTitulo("");
    setImage("");
    setMarca("");
    setModelo("");
    setCantidad("");
    setPrecio("");
    setFecha("");
    const form = document.getElementById("form_agg");
    form.reset();
    const form2 = document.getElementById("form_edit");
    form2.reset();
  };

  //Modal
  const [openAgg, setOpenAgg] = useState(false);
  const handleOpenAgg = () => {
    setOpenAgg(!openAgg);
    reset();
  };

  //Modal
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
    reset();
  };

  //Modal
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(!openDel);

  //Editar
  const [item, setItem] = useState("");
  //Modal Message
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessage = () => setOpenMessage(!openMessage);
  const handleClose = () => {
    if (status === 500) {
      handleOpenMessage();
      setMessage("");
      return;
    }
    handleOpenMessage();
    reset();
    setOpenAgg(false);
    setOpenEdit(false);
    setOpenDel(false);
    fetchData(true);
    setMessage("");
  };
  return (
    <itemsContext.Provider
      value={{
        items,
        openAgg,
        setOpenAgg,
        handleOpenAgg,
        openEdit,
        setOpenEdit,
        handleOpenEdit,
        openDel,
        setOpenDel,
        handleOpenDel,
        image,
        setImage,
        titulo,
        setTitulo,
        marca,
        setMarca,
        modelo,
        setModelo,
        cantidad,
        setCantidad,
        precio,
        setPrecio,
        fecha,
        setFecha,
        message,
        setMessage,
        status,
        setStatus,
        item,
        setItem,
        openMessage,
        setOpenMessage,
        handleClose,
        handleOpenMessage,
      }}
    >
      <upitemsContext.Provider value={fetchData}>
        <SearchContext.Provider value={setInputSearch}>
          {children}
        </SearchContext.Provider>
      </upitemsContext.Provider>
    </itemsContext.Provider>
  );
}
