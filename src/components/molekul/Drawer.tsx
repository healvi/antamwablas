import React from "react";
import { useState, useEffect } from "react";
import { OpenSomes } from "../../interface/index";
import Menu from "./Menu";

const Drawer = ({ isOpen, setIsOpen }: OpenSomes) => {
  useEffect(() => {}, [isOpen]);
  return (
    <div
      id="drawer-example"
      className={
        !isOpen
          ? "fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform left-0 top-0 -translate-x-full"
          : "fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform left-0 top-0 "
      }
      tabIndex={-1}
      aria-labelledby="drawer-label"
      aria-hidden={isOpen ? "false" : "true"}
      aria-modal={isOpen ? "true" : "false"}
      role={isOpen ? "dialog" : "false"}
    >
      <button
        onClick={() => setIsOpen(false)}
        type="button"
        data-drawer-dismiss="drawer-example"
        aria-controls="drawer-example"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <Menu />
    </div>
  );
};

export default Drawer;
