import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  const fetchData = async () => {
    try {
      fetchDocumentsRealtime("Characters", (data) => {
        setCharacters(data);
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CategoriesContext.Provider value={characters}>
      {children}
    </CategoriesContext.Provider>
  );
};