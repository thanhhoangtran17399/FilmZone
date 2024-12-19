import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

function PlansModal({ open, onClose, handleInput, plan, handleSavePlan, errors }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{plan.id ? "EDIT PLAN" : "ADD PLAN"}</DialogTitle>
      <DialogContent>
        <TextField
          name="level"
          label="Level"
          variant="outlined"
          fullWidth
          margin="normal"
          value={plan.level}
          onChange={handleInput}
          error={!!errors.level}
          helperText={errors.level}
        />
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={plan.title}
          onChange={handleInput}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          name="pricePerMonth"
          label="Price Per Month"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={plan.pricePerMonth}
          onChange={handleInput}
          error={!!errors.pricePerMonth}
          helperText={errors.pricePerMonth}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSavePlan} variant="contained">
          {plan.id ? "Update" : "Add New"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlansModal;
