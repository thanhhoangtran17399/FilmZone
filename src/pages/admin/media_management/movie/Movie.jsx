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
//   import { FaEdit, FaSearch } from "react-icons/fa";
//   import { MdDelete } from "react-icons/md";
  import MovieModal from "./MovieModal"; 
//   import DeleteModal from "../../../../components/DeleteModal";
//   import {
//     addDocument,
//     deleteDocument,
//     fetchDocumentsRealtime,
//     updateDocument,
//   } from "../../../../services/firebaseService";
//   import { useNotification } from "../../../../context/NotificationProvider";
//   import { PlansContext } from "../../../../context/PlansProvider";
  const initialPlan = { level: "", pricePerMonth: "", title: "" };
  
  function Movie() {
    // const [plan, setPlan] = useState(initialPlan);
    // const [errors, setErrors] = useState(initialPlan);
    const [open, setOpen] = useState(false);
    // const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    // const [planToDelete, setPlanToDelete] = useState(initialPlan);
    // const [searchTerm, setSearchTerm] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);

    // const showNotification = useNotification();
    // const plans = useContext(PlansContext);

  
    // const filteredData = plans.filter((item) =>
    //   item.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    // );
  
    // const itemsPerPage = 5;
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    // const handlePageChange = (event, value) => {
    //   setCurrentPage(value);
    // };
  
    // const handleSearch = (e) => {
    //   setSearchTerm(e.target.value);
    //   setCurrentPage(1);
    // };
  
    // const handleInput = (e) => {
    //   const { name, value } = e.target;
    //   setPlan({ ...plan, [name]: value });
    // };
  
    const handleClickOpen = () => {
      setOpen(true);
    //   setErrors(initialPlan);
    };
  
    const handleClose = () => {
      setOpen(false);
    //   setPlan(initialPlan);
    };
  
    // const handleDeleteClick = (item) => {
    //   setPlanToDelete(item);
    //   setIsDeleteOpen(true);
    // };
  
    // const handleEditClick = (item) => {
    //   setPlan(item);
    //   setOpen(true);
    //   setErrors(initialPlan);
    // };
  
    // const validate = () => {
    //   const newErrors = {};
    //   newErrors.level = plan.level ? "" : "Please enter level";
    //   newErrors.pricePerMonth = plan.pricePerMonth
    //     ? ""
    //     : "Please enter price per month";
    //   newErrors.title = plan.title ? "" : "Please enter title";
    //   setErrors(newErrors);
    //   return newErrors.level || newErrors.pricePerMonth || newErrors.title;
    // };
  
    // const handleSavePlan = async () => {
    //   if (validate()) return;
    //   try {
    //     if (plan.id) {
    //       await updateDocument("Plans", plan);
    //       showNotification("Plan updated successfully!", "info");
    //     } else {
    //       await addDocument("Plans", plan);
    //       showNotification("Plan added successfully!", "success");
    //     }
    //     setPlan(initialPlan);
    //     setOpen(false);
    //   } catch (error) {
    //     console.error("Error saving plan:", error);
    //   }
    // };
  
    // const handleDeletePlan = async (id) => {
    //   try {
    //     await deleteDocument("Plans", id);
    //     showNotification("Plan deleted successfully!", "warning");
    //     setIsDeleteOpen(false);
    //   } catch (error) {
    //     console.error("Error deleting plan:", error);
    //   }
    // };
  
    return (
      <div>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <span className="font-semibold text-lg text-gray-800 hidden md:block">
            List Movies
          </span>
          <div className="relative w-64">
            {/* <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" /> */}
            <input
              type="text"
              placeholder="Search by title..."
            //   value={searchTerm}
            //   onChange={handleSearch}
              className="w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <Button variant="contained" onClick={handleClickOpen}>
            Add New
          </Button>
        </div>
        {/* <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="plan table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price/Month</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((plan, index) => (
                <TableRow key={plan.id}>
                  <TableCell align="left">
                    {index + itemsPerPage * (currentPage - 1) + 1}
                  </TableCell>
                  <TableCell align="left">{plan.level}</TableCell>
                  <TableCell align="left">{plan.title}</TableCell>
                  <TableCell align="left">{plan.pricePerMonth}</TableCell>
                  <TableCell align="left">
                    <div className="flex gap-3">
                      <FaEdit
                        onClick={() => handleEditClick(plan)}
                        className="text-2xl text-emerald-700 cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => handleDeleteClick(plan)}
                        className="text-2xl text-red-500 cursor-pointer"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        /> */}
        <MovieModal
          open={open}
          onClose={handleClose}
          
        //   handleInput={handleInput}
        //   plan={plan}
        //   handleSavePlan={handleSavePlan}
        //   setPlan={setPlan}
        //   errors={errors}
        />
        {/* <DeleteModal
          open={isDeleteOpen}
          handleClose={() => setIsDeleteOpen(false)}
          handleDelete={handleDeletePlan}
          itemToDelete={planToDelete}
        /> */}
      </div>
    );
  }
  
  export default Movie;