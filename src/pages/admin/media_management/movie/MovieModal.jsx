import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BiSolidCategory } from "react-icons/bi";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  IconButton,
  Input,
  Card,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Styled Paper Item component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MovieModal({ open, onClose, handleSavePlan }) {
  const [age, setAge] = useState("");
  const [plan, setPlan] = useState("");
  const [rent, setRent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleChange = (event) => setAge(event.target.value);
  const handlePlanChange = (event) => setPlan(event.target.value);
  const handleRentChange = (event) => setRent(event.target.value);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>Add Movie</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={12} md={6}>
            <Item>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                name="duration"
                label="Duration (in minutes)"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Plan ID</InputLabel>
                <Select
                  value={plan}
                  onChange={handlePlanChange}
                  label="Plan ID"
                >
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Basic">Basic</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="rent"
                label="Rent"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rent}
                onChange={handleRentChange}
              />
            </Item>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={6}>
            <Item>
              {/* Categories Section */}
              <div className="mb-4">
                <div className="flex gap-2 items-center ">
                  <BiSolidCategory />
                  <h3>Categories</h3>
                </div>
                <div className="flex space-x-2">
                  {["Musical", "Action", "Drama", "Thriller"].map(
                    (category) => (
                      <Button
                        key={category}
                        u
                        variant="outlined"
                        className={
                          selectedCategory.includes(category)
                            ? "bg-blue-500 text-white"
                            : ""
                        }
                      >
                        {category}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Actors Section */}
              <div className="mb-4">
                <h3>Actor</h3>
                <div className="flex space-x-2">
                  {["actor1", "actor2", "actor3"].map((actor) => (
                    <IconButton
                      key={actor}
                      className={
                        selectedActors.includes(actor)
                          ? "bg-blue-500 text-white"
                          : ""
                      }
                    >
                      <img
                        src="https://www.ohchr.org/sites/default/files/styles/hero_image_2/public/2021-07/Ethiopia-UN0418425.jpg?itok=7wJB8CbZ"
                        alt={actor}
                        className="w-12 h-12 rounded-lg"
                      />
                    </IconButton>
                  ))}
                </div>
              </div>

              {/* Characters Section */}
              <div className="mb-4">
                <h3>Character</h3>
                <div className="flex space-x-2">
                  {["character1", "character2", "character3"].map(
                    (character) => (
                      <IconButton
                        key={character}
                        className={
                          selectedCharacters.includes(character)
                            ? "bg-blue-500 text-white"
                            : ""
                        }
                      >
                        <img
                          src="https://www.ohchr.org/sites/default/files/styles/hero_image_2/public/2021-07/Ethiopia-UN0418425.jpg?itok=7wJB8CbZ"
                          alt={character}
                          className="w-12 h-12 rounded-lg"
                        />
                      </IconButton>
                    )
                  )}
                </div>
              </div>

              {/* Image Upload Section */}
              <Input
                type="file"
                // onChange={(e) => handleFileChange(e, setCharacter, character)}
                inputProps={{ accept: "image/*" }}
              />
              <Card sx={{ maxWidth: 300, maxHeight: 300, marginTop: 2 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="https://lumiere-a.akamaihd.net/v1/images/p_moana2_payoff_5787a994.jpeg"
                  alt="Preview"
                />
              </Card>
            </Item>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSavePlan} variant="contained">
          Add Movie
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieModal;
