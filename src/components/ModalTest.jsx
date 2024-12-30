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
  DialogActions,
} from "@mui/material";
import "tailwindcss/tailwind.css";
import { handleFileChange } from "../services/firebaseService";

const ModalDialog = ({
  openModalTest,
  handleCloseModalTest,
  dataChoose,
  chooseType,
  handleSelect,
  dataSelected,
}) => {
  const [search, setSearch] = useState("");
  const filtered = dataChoose.filter((item) =>
    item?.name.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(filtered);
  // console.log(dataChoose);
  // console.log(chooseType);

  return (
    <Dialog open={openModalTest} onClose={handleCloseModalTest} maxWidth="md">
      {/* Header: Title and Search */}
      <DialogTitle>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <Typography
            variant="h6"
            className="font-bold text-center sm:text-left mb-2 sm:mb-0"
          >
            {chooseType === "categories" && "Choose Categories"}
            {chooseType === "characters" && "Choose characters"}
            {chooseType === "actors" && "Choose Actors"}
          </Typography>

          <TextField
            variant="outlined"
            placeholder={
              chooseType === "categories"
                ? "Search categories..."
                : chooseType === "actors"
                ? "Search actors..."
                : "Search characters..."
            }
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2"
          />
        </div>
      </DialogTitle>

      <DialogContent>
        {/* Responsive Grid */}
        <div className="flex gap-2 flex-wrap overflow-y-auto max-h-64 border border-gray-200 rounded-lg shadow-inner p-4">
          {dataChoose.length > 0 ? (
            filtered.map((item) =>
              chooseType === "categories" ? (
                <>
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    type="button"
                    className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      dataSelected.includes(item.id)
                        ? "ring-4 ring-cyan-300 dark:ring-cyan-800 bg-gradient-to-r from-purple-500 to-pink-500"
                        : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </>
              ) : (
                <>
                  <div
                    key={item.id}
                    className="flex flex-col items-center px-2 font-semibold"
                    onClick={() => handleSelect(item.id)}
                  >
                    <Avatar
                      src={item.imgUrl}
                      alt="#"
                      sx={{ width: 60, height: 60, mb: 2 }}
                    />
                    <Typography variant="caption" className="text-center">
                      {item?.name}
                    </Typography>
                  </div>
                </>
              )
            )
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No actors found
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogActions>
          <Button
            onClick={handleCloseModalTest}
            variant="outlined"
            className="text-black"
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
