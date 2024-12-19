import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import MovieModal from "./MovieModal";
const initialPlan = { level: "", pricePerMonth: "", title: "" };

function Movie() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <span className="font-semibold text-lg text-gray-800 hidden md:block">
          List Movies
        </span>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add New
        </Button>
      </div>

      <MovieModal open={open} onClose={handleClose} />
    </div>
  );
}

export default Movie;
