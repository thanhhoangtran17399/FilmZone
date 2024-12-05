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
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ActorModal from "./ActorModal";
import DeleteModal from "../../../../components/DeleteModal";
import {
  addDocument,
  deleteDocument,
  fetchDocumentsRealtime,
  updateDocument,
} from "../../../../services/firebaseService";
import { imgPreview } from "../../../../utils/Constant";

const inner = { name: "", imgUrl: imgPreview, descriptions: "" };

function Actor(props) {
  const [actor, setActor] = useState(inner);
  const [actors, setActors] = useState([]);
  const [errors, setErrors] = useState(inner);
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actorToDelete, setActorToDelete] = useState(inner);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
  };

  const filteredData = actors.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      fetchDocumentsRealtime("Actors", (data) => {
        setActors(data); // Cập nhật danh sách danh mục từ dữ liệu Firestore
      });
    } catch (error) {}
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setActor({ ...actor, [name]: value });
    console.log(`${name}: ${value}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setErrors(inner);
  };

  const handleClose = () => {
    setOpen(false);
    setActor(inner); // Reset form khi đóng modal
  };

  const handleDeleteClick = (item) => {
    setActorToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleEditClick = (item) => {
    setActor(item);
    setOpen(true);
    setErrors(inner);
  };

  const validate = () => {
    const newErrors = {};
    newErrors.name = actor.name ? "" : "Please enter name";
    newErrors.descriptions = actor.descriptions
      ? ""
      : "Please enter description";
    if (actor.imgUrl === imgPreview) {
      newErrors.imgUrl = "Please provide an image URL";
    } else {
      newErrors.imgUrl = "";
    }
    setErrors(newErrors);
    return newErrors.name || newErrors.descriptions || newErrors.imgUrl;
  };

  const handleAddActor = async () => {
    if (validate()) return;
    try {
      if (actor.id) {
        await updateDocument("Actors", actor, actor.id);
      } else {
        await addDocument("Actors", actor);
      }
      setActor(inner);
      setOpen(false);
    } catch (error) {
      console.error("Error saving actor:", error);
    }
  };

  const handleDeleteActor = async (id) => {
    try {
      await deleteDocument("Actors", id);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting actor:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <span className="font-semibold text-lg text-gray-800 hidden md:block">
          List Actors
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
      {/* Actor Table */}
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="actor table">
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
            {currentItems.map((actor, index) => (
              <TableRow key={actor.id}>
                <TableCell align="left">
                  {index + itemsPerPage * (currentPage - 1) + 1}
                </TableCell>
                <TableCell align="left">{actor.name}</TableCell>
                <TableCell align="left">
                  <img
                    className="w-12 h-12 object-cover"
                    src={actor.imgUrl}
                    alt={actor.name}
                  />
                </TableCell>
                <TableCell align="left">{actor.descriptions}</TableCell>
                <TableCell align="left">
                  <div className="flex gap 3">
                    <FaEdit
                      onClick={() => handleEditClick(actor)}
                      className="text-2xl text-emerald-700 cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDeleteClick(actor)}
                      className="text-2xl text-red-500 cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />

      <ActorModal
        open={open}
        onClose={handleClose}
        handleInput={handleInput}
        actor={actor}
        handleSaveActor={handleAddActor}
        setActor={setActor}
        errors={errors}
      />

      <DeleteModal
        open={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDeleteActor}
        itemToDelete={actorToDelete}
      />
    </div>
  );
}

export default Actor;
