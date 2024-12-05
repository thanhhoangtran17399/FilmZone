import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiSolidCameraMovie } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { Menu } from "../../../utils/Constant";
import { Link } from "react-router-dom";
import Drawer from "../../../components/drawer/Drawer";
function DashboardSidebar({ open, setOpen }) {
  const [isOpen, setIsOpen] = useState(false); // Để điều khiển việc mở/đóng của drawer
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubMenu = (index) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index], // Đảo trạng thái mở/đóng của submenu
    }));
  };

  return (
    <div>
      <div className="flex justify-between ">
        <BsArrowLeftShort
          className={`bg-white text-gray-800 text-3xl rounded-full absolute -right-3 top-1/3 border border-gray-800 cursor-pointer transition-transform hidden md:block ${
            open ? "rotate-0" : "rotate-180"
          }`}
          onClick={() => setOpen(!open)} // Thay đổi trạng thái sidebar
        />
        <div className="inline-flex">
          <BiSolidCameraMovie
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open ? "rotate-[360deg]" : ""
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl ${
              !open ? "scale-0" : "scale-100"
            }`}
          >
            FILMZONE
          </h1>
        </div>

        <div className="md:hidden">
          <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
            {/* Nội dung Sidebar */}
            <div className="mt-5">
              {/* Menu Items */}
              <ul className="mt-10">
                {Menu.map((menu, index) => (
                  <React.Fragment key={index}>
                    <Link
                      to={menu.path}
                      className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                        menu.spacing ? "mt-8" : "mt-2"
                      }`}
                      onClick={() => {
                        if (!menu.subMenu) {
                          toggleDrawer(); // Nếu không có submenu, toggle drawer
                        }
                        toggleSubMenu(index);
                      }}
                    >
                      <span className="text-2xl">{menu.icon}</span>
                      <span
                        className={`flex-1 text-base font-medium transition-opacity duration-200 ${
                          !open && "hidden"
                        } `}
                      >
                        {menu.title}
                      </span>
                      {menu.subMenu && (
                        <BsChevronDown
                          className={`transition-transform ${
                            subMenuOpen[index] ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      )}
                    </Link>
                    {menu.subMenu && subMenuOpen[index] && open && (
                      <ul className="ml-6 mt-2">
                        {menu.subMenuItems.map((subMenuItem, subIndex) => (
                          <Link
                            onClick={toggleDrawer}
                            key={subIndex}
                            to={subMenuItem.path}
                            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
                          >
                            {subMenuItem.title}
                          </Link>
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </Drawer>
        </div>
      </div>

      {/* Nội dung Sidebar */}
      <div className="mt-5 hidden md:block">
        {/* Menu Items */}
        <ul className="mt-10">
          {Menu.map((menu, index) => (
            <React.Fragment key={index}>
              <Link
                to={menu.path}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-8" : "mt-2"
                }`}
                onClick={() => toggleSubMenu(index)}
              >
                <span className="text-2xl">{menu.icon}</span>
                <span
                  className={`flex-1 text-base font-medium transition-opacity duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.subMenu && (
                  <BsChevronDown
                    className={`transition-transform ${
                      subMenuOpen[index] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </Link>
              {menu.subMenu && subMenuOpen[index] && open && (
                <ul className="ml-6 mt-2">
                  {menu.subMenuItems.map((subMenuItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subMenuItem.path}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
                    >
                      {subMenuItem.title}
                    </Link>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardSidebar;
