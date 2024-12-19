import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  const fetchData = async () => {
    try {
      fetchDocumentsRealtime("Plans", (data) => {
        setPlans(data); 
      });
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PlansContext.Provider value={plans}>
      {children}
    </PlansContext.Provider>
  );
};