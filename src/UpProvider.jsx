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

  return (
    <itemsContext.Provider value={items}>
      <upitemsContext.Provider value={fetchData}>
        <SearchContext.Provider value={setInputSearch}>
          {children}
        </SearchContext.Provider>
      </upitemsContext.Provider>
    </itemsContext.Provider>
  );
}
