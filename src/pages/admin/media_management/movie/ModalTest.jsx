import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "tailwindcss/tailwind.css";

const actors = [
  {
    name: "Leonardo DiCaprio",
    img: "https://stagebuddy.com/wp-content/uploads/2018/07/Decaprio.jpg",
  },
  { name: "Scarlett Johansson", img: "https://via.placeholder.com/150" },
  { name: "Chris Hemsworth", img: "https://via.placeholder.com/150" },
  { name: "Robert Downey Jr", img: "https://via.placeholder.com/150" },
  { name: "Morgan Freeman", img: "https://via.placeholder.com/150" },
  {
    name: "Leonardo DiCaprio",
    img: "https://stagebuddy.com/wp-content/uploads/2018/07/Decaprio.jpg",
  },
  { name: "Scarlett Johansson", img: "https://via.placeholder.com/150" },
  { name: "Chris Hemsworth", img: "https://via.placeholder.com/150" },
  { name: "Robert Downey Jr", img: "https://via.placeholder.com/150" },
  { name: "Morgan Freeman", img: "https://via.placeholder.com/150" },
  {
    name: "Leonardo DiCaprio",
    img: "https://stagebuddy.com/wp-content/uploads/2018/07/Decaprio.jpg",
  },
  { name: "Scarlett Johansson", img: "https://via.placeholder.com/150" },
  { name: "Chris Hemsworth", img: "https://via.placeholder.com/150" },
  { name: "Robert Downey Jr", img: "https://via.placeholder.com/150" },
  { name: "Morgan Freeman", img: "https://via.placeholder.com/150" },
];

const ModalDialog = () => {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredActors, setFilteredActors] = useState(actors);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = actors.filter((actor) =>
        actor.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredActors(filtered);
    }, 300); // Debounce: 300ms

    return () => clearTimeout(timer);
  }, [search]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      {/* Header: Title and Search */}
      <DialogTitle>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <Typography
            variant="h6"
            className="font-bold text-center sm:text-left mb-2 sm:mb-0"
          >
            Choose Actors
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search actors..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2"
          />
        </div>
      </DialogTitle>

      <DialogContent>
        {/* Responsive Actors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto max-h-64 border border-gray-200 rounded-lg shadow-inner p-4">
          {filteredActors.length > 0 ? (
            filteredActors.map((actor) => (
              <div key={actor.name} className="flex flex-col items-center">
                <Avatar
                  src={actor.img}
                  alt={actor.name}
                  sx={{ width: 60, height: 60, mb: 2 }}
                />
                <Typography variant="caption" className="text-center">
                  {actor.name}
                </Typography>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No actors found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-right mt-4">
          <Button
            onClick={handleClose}
            variant="outlined"
            className="text-black"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
