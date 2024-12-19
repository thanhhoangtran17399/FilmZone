import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";

function Drawer({ children, header, isOpen, toggleDrawer }) {
  return (
    <div>
      {/* Nút mở drawer */}
      <div className="text-center">
        <button
          type="button"
          onClick={toggleDrawer} // Sử dụng toggleDrawer để mở/đóng drawer
        >
          <FiAlignJustify className="text-4xl text-white" />
        </button>
      </div>

      {/* Drawer */}
      <div
        id="drawer-example"
        className={` fixed bg-gray-800 top-0 left-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          {header}
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Drawer;
