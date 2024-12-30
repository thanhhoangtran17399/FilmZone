import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { PlansContext } from "../../../../context/PlansProvider";
import { TiDelete } from "react-icons/ti";
import { getObjectById } from "../../../../services/reponsitory";
import { IoMdPhotos } from "react-icons/io";
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
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthorContext } from "../../../../context/AuthorProvider";
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Styled Paper Item component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MovieModal({
  open,
  onClose,
  handleSavePlan,
  movie,
  handleInput,
  handleChoose,
  categories,
  actors,
  characters
}) {
  const [rent, setRent] = useState(0);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const handleRentChange = (event) => setRent(event.target.value);
  const plans = useContext(PlansContext);
  const authors = useContext(AuthorContext);
  console.log(plans);
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
                multiline
                rows={3}
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
                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    options={authors} // Mảng các tác giả từ context
                    getOptionLabel={(option) => option.name} // Hiển thị tên của tác giả
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Author"
                        variant="outlined"
                      />
                    )}
                    value={
                      authors.find((author) => author.id === movie.authorID) ||
                      null // Giá trị đã chọn
                    }
                    onChange={(event, newValue) => {
                      handleInput({
                        target: {
                          name: "authorID",
                          value: newValue ? newValue.id : "",
                        }, // Cập nhật giá trị
                      });
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    } // So sánh tùy chọn và giá trị
                    noOptionsText="No authors found" // Thông báo khi không có kết quả
                  />
                </FormControl>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Plan</InputLabel>
                <Select
                  name="planID"
                  label="Plan"
                  value={movie.planID || ""}
                  style={{ marginBottom: "16px" }}
                  onChange={handleInput}
                >
                  <MenuItem value="">Select Plans</MenuItem>
                  {plans
                    ?.sort((a, b) => a.level - b.level)
                    .map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {getObjectById(movie.planID, plans)?.level >= 2 && (
                <TextField
                  name="rentalPrice"
                  label="Rent"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={rent}
                  onChange={handleRentChange}
                />
              )}
            </Item>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={6}>
            <Item>
              {/* Categories Section */}
              <div className="mb-4">
                <div
                  className="flex gap-2 items-center cursor-pointer mb-2"
                  onClick={() => handleChoose("categories")}
                >
                  <BiSolidCategory className="text-current  hover:text-indigo-800 transition duration-200" />
                  <h3 className="text-current transition  hover:text-indigo-800 transition duration-200">
                    Categories
                  </h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {movie.listCate.map((category) => (
                    <span
                      key={category}
                      variant="outlined"
                      className={`relative bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400}`}
                    >
                      {getObjectById(category, categories)?.name}
                      <TiDelete className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 bg-white rounded-full cursor-pointer hover:scale-110 transition duration-200" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Actors Section */}
              <div className="mb-4">
                <div
                  className="flex gap-2 items-center cursor-pointer mb-2"
                  onClick={() => handleChoose("actors")}
                >
                  <FaUser className="hover:text-indigo-800 transition duration-200" />
                  <h3 className="hover:text-indigo-800 transition duration-200">
                    Actor
                  </h3>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {movie.listActor.map((actor) => (
                    <div key={actor} className="relative">
                      <img
                        src={getObjectById(actor, actors)?.imgUrl}
                        alt=""
                        className="w-12 h-12 rounded-lg"
                      />
                      <TiDelete className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 bg-white rounded-full cursor-pointer hover:scale-110 transition duration-200" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Characters Section */}
              <div className="mb-4">
                <div
                  className="flex gap-2 items-center cursor-pointer mb-2"
                  onClick={() => handleChoose("characters")}
                >
                  <FaUser className=" hover:text-indigo-800 transition duration-200" />
                  <h3 className=" hover:text-indigo-800 transition duration-200">
                    Character
                  </h3>
                </div>
                <div className="flex gap-2 flex-wrap ">
                  {movie.listCharacter.map((character) => (
                    <div
                      key={character}
                     className="relative"
                    >
                      <img
                        src={getObjectById(character, characters)?.imgUrl}
                        alt=""
                        className="w-12 h-12 rounded-lg"
                      />
                      <TiDelete className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 bg-white rounded-full cursor-pointer hover:scale-110 transition duration-200" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload Section */}
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  // onChange={handleImageChange}
                />
                <IconButton color="primary" component="span">
                  <IoMdPhotos />
                </IconButton>
              </label>
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
