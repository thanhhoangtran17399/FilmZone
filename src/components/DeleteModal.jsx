import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";

function DeleteModal({ open, handleDelete, itemToDelete, handleClose }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDeleteAndClose = (id) => {
    handleDelete(id);
    setOpenSnackbar(true); // Hiển thị thông báo sau khi xóa
    handleClose(); // Đóng modal
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete the category "
            <strong>{itemToDelete.name}</strong>"?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteAndClose(itemToDelete.id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Product deleted successfully"
      />
    </div>
  );
}

export default DeleteModal;