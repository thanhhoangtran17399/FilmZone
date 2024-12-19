import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
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
    <CharacterContext.Provider value={characters}>
      {children}
    </CharacterContext.Provider>
  );
};