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

export default function UpProvider({ children }) {
  const [items, setItems] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  const fetchData = () => {
    fetch("http://localhost:4000/ListarItem")
      .then((res) => res.json())
      .then((data) => {
        setItems(data); // Guarda los datos recibidos en el estado
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <itemsContext.Provider value={items}>
      <upitemsContext.Provider value={fetchData}>
        <SearchContext.Provider value={{ inputSearch, setInputSearch }}>
          {children}
        </SearchContext.Provider>
      </upitemsContext.Provider>
    </itemsContext.Provider>
  );
}
