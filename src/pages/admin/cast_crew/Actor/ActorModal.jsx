import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Input, Card, CardMedia, Typography } from "@mui/material";
import { handleFileChange } from "../../../../services/firebaseService";

function ActorModal({
  open,
  onClose,
  handleInput,
  actor,
  handleSaveActor,
  setActor,
  errors,
}) {
  const handleClose = () => {
    onClose(); // Gọi hàm đóng dialog
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{actor.id ? "EDIT ACTOR" : "ADD ACTOR"}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={actor.name}
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
            value={actor.descriptions}
            onChange={handleInput}
            error={!!errors.descriptions}
            helperText={errors.descriptions}
          />

          {/* Trường upload file */}
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, setActor, actor)}
            inputProps={{ accept: "image/*" }}
          />

          <Typography className="block" variant="caption" color="error">
            {errors.imgUrl}
          </Typography>
          <Card sx={{ maxWidth: 300, maxHeight: 300, marginTop: 2 }}>
            {
              <CardMedia
                component="img"
                height="300"
                image={actor.imgUrl}
                alt="Preview"
              />
            }
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveActor} variant="contained">
            {actor.id ? "Update" : "Add New"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActorModal;
