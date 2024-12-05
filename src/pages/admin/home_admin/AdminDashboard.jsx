import React, { useState } from "react";
import MainDashboard from "./MainDashboard";
import HeaderDashboard from "./HeaderDashboard";
import DashboardSidebar from "./DashboardSidebar";

function AdminDashboard(props) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row">
      <div
        className={`bg-gray-800 md:min-h-screen p-5 pt-8 ${
          open ? "w-full md:w-72" : "w-full md:w-20"
        }  duration-300 relative`}
      >
        <DashboardSidebar open={open} setOpen={setOpen} />
      </div>
      <div className="flex-1">
        <div>
          <HeaderDashboard />
        </div>
        <div>
          <MainDashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
