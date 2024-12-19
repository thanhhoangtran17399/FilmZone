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
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CategoryModal from "./CategoryModal";
import {
  addDocument,
  deleteDocument,
  fetchDocumentsRealtime,
  updateDocument,
} from "../../../services/firebaseService";
import DeleteModal from "../../../components/DeleteModal";
import { CategoriesContext } from "../../../context/CategoriesProvider";

const inner = { name: "", descriptions: "" };
function Categories(props) {
  const [category, setCategory] = useState(inner);
  const [errors, setErrors] = useState(inner);
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(inner);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categories = useContext(CategoriesContext);
  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
  };
  // Lọc dữ liệu dựa trên giá trị tìm kiếm
  const filteredData = categories.filter((item) => {
    return item.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "");
  });

  const itemsPerPage = 5;

  // Tính toán danh sách mục hiển thị
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setErrors(inner);
  };

  const handleDeleteClick = (item) => {
    setCategoryToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleEditClick = (item) => {
    setCategory(item);
    setOpen(true);
    setErrors(inner);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory(inner); 
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    console.log(`${name}: ${value}`);
  };

  const validate = () => {
    const newErrors = {};
    newErrors.name = category.name ? "" : "Please enter name";
    newErrors.descriptions = category.descriptions
      ? ""
      : "Please enter description";
    setErrors(newErrors);
    return newErrors.name || newErrors.descriptions;
  };

  const handleAddCategory = async () => {
    if (validate()) return;
    try {
    if(category.id){
      await updateDocument("Categories", category, category.id);
    }else{
      await addDocument("Categories", category);
    }
      setCategory(inner); // Reset form
      setOpen(false); // Đóng modal
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDocument("Categories", id);
      setIsDeleteOpen(false); // Đóng modal
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <span className="font-semibold text-lg text-gray-800 hidden md:block">
          List Categories
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
      {/* Bảng hiển thị sản phẩm */}
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Descriptions</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell align="left">
                  {index + itemsPerPage * (currentPage - 1) + 1}
                </TableCell>
                <TableCell align="left">{category.name}</TableCell>
                <TableCell align="left">{category.descriptions}</TableCell>
                <TableCell align="left" sx={{ display: "flex" }}>
                  <FaEdit
                    onClick={() => handleEditClick(category)}
                    className="text-2xl text-emerald-700 cursor-pointer"
                  />
                  <MdDelete
                    onClick={() => handleDeleteClick(category)}
                    className="text-2xl text-red-500 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Hiển thị phân trang */}
      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />

      <CategoryModal
        open={open}
        onClose={handleClose}
        handleInput={handleInput}
        category={category}
        errors={errors}
        handleSaveCategory={handleAddCategory}
      />

      <DeleteModal
        open={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDeleteCategory}
        itemToDelete={categoryToDelete}
      />
    </div>
  );
}

export default Categories;
