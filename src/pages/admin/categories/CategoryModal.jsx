import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


function CategoryModal({ open, onClose, handleInput, category, handleSaveCategory, errors }) {
  
  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>{category.id ? "EDIT CATEGORY" : "ADD CATEGORY"}</DialogTitle>
    <DialogContent>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={category.name}
        onChange={handleInput}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        name="descriptions"
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={category.descriptions}
        onChange={handleInput}
        error={!!errors.descriptions}
        helperText={errors.descriptions}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="outlined">
        Cancel
      </Button>
      <Button onClick={handleSaveCategory} variant="contained">
        {category.id ? "Update" : "Add New"}
      </Button>
    </DialogActions>
  </Dialog>
   
  );
}

export default CategoryModal;
