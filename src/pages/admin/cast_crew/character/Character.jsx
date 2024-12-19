import React, { useContext, useState } from "react";
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
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CharacterModal from "./CharacterModal";
import DeleteModal from "../../../../components/DeleteModal";
import {
  addDocument,
  deleteDocument,
  fetchDocumentsRealtime,
  updateDocument,
} from "../../../../services/firebaseService";
import { imgPreview } from "../../../../utils/Constant";
import { useNotification } from "../../../../context/NotificationProvider";
import { CharacterContext } from "../../../../context/CharacterProvider";

const initialCharacter = { name: "", imgUrl: imgPreview, descriptions: "" };

function Character() {
  const [character, setCharacter] = useState(initialCharacter);
  const [errors, setErrors] = useState(initialCharacter);
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState(initialCharacter);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [oldImg, setOldImg] = useState("");
  const showNotification = useNotification();
  const characters = useContext(CharacterContext);

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
  };

  const filteredData = characters.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setErrors(initialCharacter);
  };

  const handleClose = () => {
    setOpen(false);
    setCharacter(initialCharacter);
  };

  const handleDeleteClick = (item) => {
    setOldImg(item.imgUrl);
    setCharacterToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleEditClick = (item) => {
    setCharacter(item);
    setOldImg(item.imgUrl);
    setOpen(true);
    setErrors(initialCharacter);
  };

  const validate = () => {
    const newErrors = {};
    newErrors.name = character.name ? "" : "Please enter name";
    newErrors.descriptions = character.descriptions
      ? ""
      : "Please enter description";
    if (character.imgUrl === imgPreview) {
      newErrors.imgUrl = "Please provide an image URL";
    }
    setErrors(newErrors);
    return newErrors.name || newErrors.descriptions || newErrors.imgUrl;
  };

  const handleSaveCharacter = async () => {
    if (validate()) return;
    try {
      if (character.id) {
        await updateDocument("Characters", character, oldImg);
        showNotification("Character updated successfully!", "info");
      } else {
        await addDocument("Characters", character);
        showNotification("Character added successfully!", "success");
      }
      setCharacter(initialCharacter);
      setOpen(false);
    } catch (error) {
      console.error("Error saving character:", error);
    }
  };

  const handleDeleteCharacter = async (id) => {
    try {
      await deleteDocument("Characters", id, oldImg);
      showNotification("Character deleted successfully!", "warning");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <span className="font-semibold text-lg text-gray-800 hidden md:block">
          List Characters
        </span>
        <div className="relative w-64">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter keywords..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add New
        </Button>
      </div>
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="character table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Descriptions</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((character, index) => (
              <TableRow key={character.id}>
                <TableCell align="left">
                  {index + itemsPerPage * (currentPage - 1) + 1}
                </TableCell>
                <TableCell align="left">{character.name}</TableCell>
                <TableCell align="left">
                  <img
                    className="w-12 h-12 object-cover"
                    src={character.imgUrl}
                    alt={character.name}
                  />
                </TableCell>
                <TableCell align="left">{character.descriptions}</TableCell>
                <TableCell align="left">
                  <div className="flex gap-3">
                    <FaEdit
                      onClick={() => handleEditClick(character)}
                      className="text-2xl text-emerald-700 cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDeleteClick(character)}
                      className="text-2xl text-red-500 cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />

      <CharacterModal
        open={open}
        onClose={handleClose}
        handleInput={handleInput}
        character={character}
        handleSaveCharacter={handleSaveCharacter}
        setCharacter={setCharacter}
        errors={errors}
      />

      <DeleteModal
        open={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDeleteCharacter}
        itemToDelete={characterToDelete}
      />
    </div>
  );
}

export default Character;