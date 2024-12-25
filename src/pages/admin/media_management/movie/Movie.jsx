import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import MovieModal from "./MovieModal";
import ModalTest from "../../../../components/ModalTest";
import { CategoriesContext } from "../../../../context/CategoriesProvider";
import { ActorContext } from "../../../../context/ActorProvider";
import { AuthorContext } from "../../../../context/AuthorProvider";
import { CharacterContext } from "../../../../context/CharacterProvider";

const initialMovie = {
  name: "",
  description: "",
  duration: "",
  planID: "",
  authorID: "",
  listCate: [],
  listActor: [],
  listCharacter: [],
  rentalPrice: 0,
  likesCount: 0,
  viewsCount: 0,
  date: new Date(),
  imgUrl: "",
};

function Movie() {
  const [open, setOpen] = useState(false);
  const [openModalTest, setOpenModalTest] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(initialMovie);
  const [dataChoose, setDataChoose] = useState([]);
  const [chooseType, setChooseType] = useState("");
  const categories = useContext(CategoriesContext);
  const actors = useContext(ActorContext);
  const authors = useContext(AuthorContext);
  const characters = useContext(CharacterContext);

  const handleInput = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleClickOpenModalTest = () => {
  //   setOpenModalTest(true);
  // };

  const handleCloseModalTest = () => {
    setOpenModalTest(false);
  };

  const handleChoose = (type) => {
    setChooseType(type);
    switch (type) {
      case "categories":
        setDataChoose(categories);
        break;
      case "actors":
        setDataChoose(actors);
        break;
      case "characters":
        setDataChoose(characters);
        break;
      default:
        setDataChoose([]);
    }
    setOpenModalTest(true);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <span className="font-semibold text-lg text-gray-800 hidden md:block">
          List Movies
        </span>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add New
        </Button>
      </div>

      <MovieModal
        open={open}
        onClose={handleClose}
        movie={movie}
        handleInput={handleInput}
        handleChoose={handleChoose}
      />
      <ModalTest
        openModalTest={openModalTest}
        handleCloseModalTest={handleCloseModalTest}
        dataChoose={dataChoose}
        chooseType={chooseType}
      />
    </div>
  );
}

export default Movie;
