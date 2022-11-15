import React from "react";

const Table = () => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
      <div className="pb-4 bg-white dark:bg-indigo-900 p-2 flex flex-row">
        <div className="basis-1/2">
          <label
            className=" block mb-2 text-sm font-medium text-white dark:text-white-300"
            htmlFor="user_avatar"
          >
            Search By Name
          </label>
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 w-80 text-sm text-black-600 bg-white-50 rounded-lg border border-white-300 focus:ring-white-500 focus:border-white-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-white-500 dark:focus:border-white-500 "
            placeholder="Search Name"
          />
        </div>
        <div className="basis-1/2">
          <label
            className=" block mb-2 text-sm font-medium text-white dark:text-white-300"
            htmlFor="user_avatar"
          >
            Upload file Excel
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          ></div>
        </div>
      </div>

      <table className="w-full text-sm text-left text-indigo-500 dark:text-indigo-400">
        <thead className="text-xs text-indigo-700 uppercase bg-indigo-50 dark:bg-indigo-700 dark:text-indigo-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="py-3 px-6 dark:text-white">
              Name
            </th>
            <th scope="col" className="py-3 px-6 dark:text-white">
              Number
            </th>
            <th scope="col" className="py-3 px-6 dark:text-white">
              Salary
            </th>
            <th scope="col" className="py-3 px-6 dark:text-white">
              Scope
            </th>
            <th scope="col" className="py-3 px-6 dark:text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-indigo-800 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-600">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="py-4 px-6 font-medium text-indigo-900 whitespace-nowrap dark:text-white"
            >
              Andri
            </th>
            <td className="py-4 px-6 dark:text-white">+62834734658923</td>
            <td className="py-4 px-6 dark:text-white">10.000.000</td>
            <td className="py-4 px-6 dark:text-white">KSM, CC</td>
            <td className="py-4 px-6">
              <img
                src={require("../../assets/icons/send.svg").default}
                className="icon send-icon"
                alt="send-icon"
                data-testid="send-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
