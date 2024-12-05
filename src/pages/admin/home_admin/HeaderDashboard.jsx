import React, { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Avatar } from "@mui/material";
import AvatarMenu from "./AvatarMenu";

function HeaderDashboard() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
      <div>
        <h1 className="text-white text-lg sm:text-xl font-semibold">
          Good Morning, Hoang
        </h1>
        <p className="text-gray-300 text-sm hidden sm:block">
          Your performance summary this week
        </p>
      </div>

      <div className="flex items-center">
        <FaSearch className="text-white text-lg cursor-pointer hover:text-gray-300 mr-2 md:mr-4" />
        <IoMailSharp className="text-white text-lg cursor-pointer hover:text-gray-300 mr-2 md:mr-4" />
        <FaBell className="text-white text-lg cursor-pointer hover:text-gray-300 mr-2 md:mr-4" />
        <div onClick={handleClickAvatar} className="cursor-pointer">
          <Avatar
            src="https://m.yodycdn.com/blog/meme-meo-cute-yody-vn-1.jpg"
            alt="Avatar User"
          />
        </div>
        <AvatarMenu
          anchorEl={anchorEl}
          handleCloseMenu={handleCloseMenu}
          open={open}
        />
      </div>
    </div>
  );
}

export default HeaderDashboard;
