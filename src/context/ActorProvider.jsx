import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

// Tạo Context
export const ActorContext = createContext();

// Tạo Provider
export const ActorProvider = ({ children }) => {
  const [actors, setActors] = useState([]);

  // Hàm fetch dữ liệu
  const fetchData = async () => {
    try {
      fetchDocumentsRealtime("Actors", (data) => {
        setActors(data); // Cập nhật danh sách danh mục từ dữ liệu Firestore
      });
    } catch (error) {}
  };

  // Gọi fetch khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ActorContext.Provider value={ actors }>
      {children}
    </ActorContext.Provider>
  );
};
