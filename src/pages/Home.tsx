import React from "react";
import Drawer from "../components/molekul/Drawer";
import Menu from "../components/molekul/Menu";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {}, [isOpen]);
  return (
    <div className="flex flex-row min-h-full">
      <div className="hidden basis-0 bg-indigo-800  md:basis-1/5 md:flex">
        <Menu />
      </div>
      <div className="basis-full md:basis-4/5">
        {/* Nav */}
        <nav className="flex bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-indigo-800 md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            data-drawer-target="drawer-example"
            data-drawer-show="drawer-example"
            aria-controls="drawer-example"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </nav>
        <Outlet />
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Home;
