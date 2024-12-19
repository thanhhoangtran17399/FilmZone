import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

function AuthorModal({
  open,
  onClose,
  handleInput,
  author,
  handleSaveAuthor,
  errors,
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{author.id ? "EDIT AUTHOR" : "ADD AUTHOR"}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={author.name}
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
            value={author.descriptions}
            onChange={handleInput}
            error={!!errors.descriptions}
            helperText={errors.descriptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveAuthor} variant="contained">
            {author.id ? "Update" : "Add New"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AuthorModal;