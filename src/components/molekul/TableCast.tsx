import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
import {
  sortlistTable,
  tableBroaFormat,
  tableBroaFormatCheck,
} from "../../interface";

const TableCast = () => {
  const [tables, setTable] = useState<tableBroaFormatCheck[]>();
  const [searchs, setSearch] = useState();
  const [datas, setDatas] = useState<tableBroaFormat[]>();
  const [checkAll, setCheckAll] = useState(false);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const schema = {
      nama: {
        prop: "nama",
        type: String,
        required: true,
      },
      no_telp: {
        prop: "number",
        type: String,
        required: true,
      },
    };

    if (e.target.files !== null) {
      const file = e.target.files[0];
      readXlsxFile(file, { schema }).then((rows) => {
        let newData = rows.rows.map((v) => ({ ...v, checkAll: checkAll }));
        setTable(newData as tableBroaFormatCheck[]);
      });
    }
    e.target.value = "";
  };

  const modifytable = (data: tableBroaFormat[] | undefined) => {
    if (data) {
      let newData = data.map((v) => ({ ...v, checkAll: checkAll }));
      setTable(newData);
    }
  };

  useEffect(() => {
    modifytable(datas);
  }, [checkAll]);
  useEffect(() => {
    // console.log(tables);
  }, [tables]);

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
            onChange={(e) => onUpload(e)}
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
                  onChange={() => setCheckAll(!checkAll)}
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="py-3 px-2 dark:text-white">
              Name
            </th>

            <th scope="col" className="py-3 px-2 dark:text-white">
              Number
            </th>

            <th scope="col" className="py-3 px-2 dark:text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tables !== undefined && tables.length > 0 ? (
            tables.map((data) => (
              <tr className="bg-white border-b dark:bg-indigo-800 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      name="checkUnit"
                      checked={data.checkAll}
                      className="w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-2 font-medium text-indigo-900 whitespace-nowrap dark:text-white"
                >
                  {data.nama}
                </th>
                <td className="py-4 px-2 dark:text-white">{data.number}</td>

                {/* Action */}
                <td className="py-4 px-2">
                  <img
                    src={require("../../assets/icons/send.svg").default}
                    className="icon send-icon"
                    alt="send-icon"
                    data-testid="send-icon"
                  />
                </td>
              </tr>
            ))
          ) : (
            <div className="text-center w-min-full p-4">Upload Your Data</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCast;