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
  const [listCategory, setListCategory] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const fetchData = async (load) => {
    if (load === true) {
      await fetch("http://localhost:4000/ListarItem")
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      await fetch(`http://localhost:4000/FilterProducts/${inputSearch}`)
        .then((res) => res.json())
        .then((data) => {
          data.length > 0 ? setItems(data) : setItems([]);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const FiltrarCategory = async () => {
    await fetch(`http://localhost:4000/Filtrar_categorias/${filterCategory}`)
      .then((res) => res.json())
      .then((data) => {
        filterCategory != "" ? setItems(data) : fetchData(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    FiltrarCategory();
  }, [filterCategory]);

  const getCategory = async () => {
    await fetch("http://localhost:4000/Listar_categorias")
      .then((res) => res.json())
      .then((data) => {
        setListCategory(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const addCategory = async () => {
    const formData = new FormData();
    formData.append("name", subcategory);

    await fetch("http://localhost:4000/Agregar_categorias", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchData(true);
    getCategory();
  }, []);

  //Data de Agg
  // Estableciendo las variables
  const [image, setImage] = useState("");
  const [titulo, setTitulo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
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
    setCategory("");
    setSubCategory("");
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

  //Eliminar user
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [openDelUser, setOpenDelUser] = useState(false);
  const handleOpenDelUser = () => setOpenDelUser(!openDelUser);

  const [openEdit_user, setOpenEdit_user] = useState(false);
  const handleOpenEdit_user = () => setOpenEdit_user(!openEdit_user);

  //Modal Message
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessage = () => setOpenMessage(!openMessage);

  const handleClose = () => {
    if (status != 200) {
      handleOpenMessage();
      setMessage("");
      return;
    }
    handleOpenMessage();
    setOpenAgg(false);
    setOpenEdit(false);
    setOpenDel(false);
    setOpenDelUser(false);
    setOpenEdit_user(false);
    fetchData(true);
    setMessage("");
    reset();
  };

  const [usuarios, setUsuarios] = useState([]);

  const Usuarios = async () => {
    const res = await fetch("http://localhost:4000/User");
    const data = await res.json();
    await setUsuarios(data);
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
        openDelUser,
        setOpenDelUser,
        handleOpenDelUser,
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
        listCategory,
        getCategory,
        addCategory,
        subcategory,
        setSubCategory,
        userIdToDelete,
        setUserIdToDelete,
        filterCategory,
        setFilterCategory,
        Usuarios,
        usuarios,
        openEdit_user,
        setOpenEdit_user,
        handleOpenEdit_user,
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
