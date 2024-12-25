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

const ModalDialog = ({
  openModalTest,
  handleCloseModalTest,
  dataChoose,
  chooseType,
}) => {
  const [search, setSearch] = useState("");
  const filtered = dataChoose.filter((item) =>
    item?.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filtered);
  console.log(dataChoose);
  console.log(chooseType);

  return (
    <Dialog open={openModalTest} onClose={handleCloseModalTest} maxWidth="md">
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
          {dataChoose.length > 0 ? (
            filtered.map((item) =>
              chooseType === "categories" ? (
                <>
                  <div key={item.id} className="flex flex-col items-center">
                    <Button>{item.name}</Button>
                  </div>
                </>
              ) : (
                <>
                  <div key={item.id} className="flex flex-col items-center">
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
        <div className="text-right mt-4">
          <Button
            onClick={handleCloseModalTest}
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
