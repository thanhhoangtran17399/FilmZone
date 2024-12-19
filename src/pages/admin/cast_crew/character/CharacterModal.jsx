import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Input, Card, CardMedia } from "@mui/material";
import { handleFileChange } from "../../../../services/firebaseService";

function CharacterModal({
  open,
  onClose,
  handleInput,
  character,
  handleSaveCharacter,
  setCharacter,
  errors,
}) {
  const handleClose = () => {
    onClose(); // Đóng dialog
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {character.id ? "EDIT CHARACTER" : "ADD CHARACTER"}
      </DialogTitle>
      <DialogContent>
        {/* Name */}
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={character.name}
          onChange={handleInput}
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* Description */}
        <TextField
          name="descriptions"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={character.descriptions}
          onChange={handleInput}
          error={!!errors.descriptions}
          helperText={errors.descriptions}
        />

        {/* File Upload */}
        <Input
          type="file"
          onChange={(e) => handleFileChange(e, setCharacter, character)}
          inputProps={{ accept: "image/*" }}
        />
        <Card sx={{ maxWidth: 300, maxHeight: 300, marginTop: 2 }}>
          {character.imgUrl && (
            <CardMedia
              component="img"
              height="300"
              image={character.imgUrl}
              alt="Preview"
            />
          )}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSaveCharacter} variant="contained">
          {character.id ? "Update" : "Add New"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CharacterModal;
