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
  import React, { useContext, useState } from "react";
  import { FaEdit, FaSearch } from "react-icons/fa";
  import { MdDelete } from "react-icons/md";
  import AuthorModal from "./AuthorModal";
  import DeleteModal from "../../../../components/DeleteModal";
  import {
    addDocument,
    deleteDocument,
    updateDocument,
  } from "../../../../services/firebaseService";
  import {
    NotificationContext,
    useNotification,
  } from "../../../../context/NotificationProvider";
  import { AuthorContext } from "../../../../context/AuthorProvider";
  
  const initialAuthor = { name: "", descriptions: "" };
  
  function Author() {
    const [author, setAuthor] = useState(initialAuthor);
    const [errors, setErrors] = useState(initialAuthor);
    const [open, setOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState(initialAuthor);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const showNotification = useNotification();
    const authors = useContext(AuthorContext);
  
    const handleSearch = (e) => {
      setCurrentPage(1);
      setSearchTerm(e.target.value);
    };
  
    const filteredData = authors.filter((item) =>
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
      const { name, value } = e.target;
      setAuthor({ ...author, [name]: value });
    };
  
    const handleClickOpen = () => {
      setOpen(true);
      setErrors(initialAuthor);
    };
  
    const handleClose = () => {
      setOpen(false);
      setAuthor(initialAuthor);
    };
  
    const handleDeleteClick = (item) => {
      setAuthorToDelete(item);
      setIsDeleteOpen(true);
    };
  
    const handleEditClick = (item) => {
      setAuthor(item);
      setOpen(true);
      setErrors(initialAuthor);
    };
  
    const validate = () => {
      const newErrors = {};
      newErrors.name = author.name ? "" : "Please enter name";
      newErrors.descriptions = author.descriptions
        ? ""
        : "Please enter description";
      setErrors(newErrors);
      return newErrors.name || newErrors.descriptions;
    };
  
    const handleAddAuthor = async () => {
      if (validate()) return;
      try {
        if (author.id) {
          await updateDocument("Authors", author);
          showNotification("Author updated successfully!", "info");
        } else {
          await addDocument("Authors", author);
          showNotification("Author added successfully!", "success");
        }
        setAuthor(initialAuthor);
        setOpen(false);
      } catch (error) {
        console.error("Error saving author:", error);
      }
    };
  
    const handleDeleteAuthor = async (id) => {
      try {
        await deleteDocument("Authors", id);
        showNotification("Author deleted successfully!", "warning");
        setIsDeleteOpen(false);
      } catch (error) {
        console.error("Error deleting author:", error);
      }
    };
  
    return (
      <div>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <span className="font-semibold text-lg text-gray-800 hidden md:block">
            List Authors
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
        {/* Author Table */}
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="author table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Descriptions</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((author, index) => (
                <TableRow key={author.id}>
                  <TableCell align="left">
                    {index + itemsPerPage * (currentPage - 1) + 1}
                  </TableCell>
                  <TableCell align="left">{author.name}</TableCell>
                  <TableCell align="left">{author.descriptions}</TableCell>
                  <TableCell align="left">
                    <div className="flex gap 3">
                      <FaEdit
                        onClick={() => handleEditClick(author)}
                        className="text-2xl text-emerald-700 cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => handleDeleteClick(author)}
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
  
        <AuthorModal
          open={open}
          onClose={handleClose}
          handleInput={handleInput}
          author={author}
          handleSaveAuthor={handleAddAuthor}
          setAuthor={setAuthor}
          errors={errors}
        />
  
        <DeleteModal
          open={isDeleteOpen}
          handleClose={() => setIsDeleteOpen(false)}
          handleDelete={handleDeleteAuthor}
          itemToDelete={authorToDelete}
        />
      </div>
    );
  }
  
  export default Author;