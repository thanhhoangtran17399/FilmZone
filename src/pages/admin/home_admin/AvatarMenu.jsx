import React from "react";
import { Menu, MenuItem, Avatar, Divider, Typography } from "@mui/material";
function AvatarMenu({ handleCloseMenu, open, anchorEl }) {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="mt-2"
      >
        {/* User Info */}
        <div className="flex items-center px-4 py-2 space-x-2">
          <Avatar
            src="https://m.yodycdn.com/blog/meme-meo-cute-yody-vn-1.jpg"
            alt="User Avatar"
            className="w-12 h-12"
          />
          <div>
            <Typography variant="subtitle1" className="font-bold">
              Your Name
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              View Profile
            </Typography>
          </div>
        </div>
        <Divider />

        {/* Menu Options */}
        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Help & Support</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Privacy & Terms</MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenu} className="text-red-500">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AvatarMenu;
