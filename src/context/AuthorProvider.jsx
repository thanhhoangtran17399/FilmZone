import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

// Tạo Context
export const AuthorContext = createContext();

// Tạo Provider
export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  // Hàm fetch dữ liệu
  const fetchData = async () => {
    try {
      fetchDocumentsRealtime("Authors", (data) => {
        setAuthors(data); // Cập nhật danh sách từ dữ liệu Firestore
      });
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  // Gọi fetch khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthorContext.Provider value={authors}>
      {children}
    </AuthorContext.Provider>
  );
};