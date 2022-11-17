import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
import { tableBroaFormat, tableBroaFormatCheck } from "../../interface";
import { BroadcastSchema } from "../../utils/Schema";

const TableCast = () => {
  const [tables, setTable] = useState<tableBroaFormatCheck[]>();
  const [Choses, setChoses] = useState("");
  const [checkAll, setCheckAll] = useState(false);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const schema = BroadcastSchema;
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
  const anCheckData = (data: tableBroaFormatCheck) => {
    const datas = tables?.map((object: tableBroaFormatCheck) => {
      if (object.number === data.number) {
        return { ...object, checkAll: !data.checkAll };
      }
      return object;
    });

    setTable(datas);
  };
  const sendBlasChecked = () => {
    if (tables && Choses.length > 0) {
      const data = tables.filter(
        (v: tableBroaFormatCheck) => v.checkAll === true
      );
      data.map(async (v) => {
        await axios
          .put("http://localhost:8000/api/broadcast", {
            ...v,
            segmen: Choses,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log("error");
          });
      });
    }
  };
  const sendBlas = async (data: tableBroaFormatCheck) => {
    await axios
      .put("http://localhost:8000/api/broadcast", {
        ...data,
        segmen: Choses,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("error");
      });
  };

  useEffect(() => {
    modifytable(tables);
  }, [checkAll]);
  useEffect(() => {
    // console.log(tables);
  }, [tables]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
      <div className="pb-4 bg-white dark:bg-indigo-900 p-2 flex flex-row">
        <div className="basis-1/2 mx-4">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            onChange={(e) => setChoses(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Segmen</option>
            <option value="KSM">KSM</option>
            <option value="KPR">KPR</option>
            <option value="CC">CC</option>
            <option value="DEPOSITO">DEPOSITO</option>
            <option value="MTR">MTR</option>
          </select>
          <button
            onClick={() => sendBlasChecked()}
            type="button"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Send All Checked
          </button>
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
                      onChange={() => anCheckData(data)}
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
                    onClick={() => sendBlas(data)}
                    src={require("../../assets/icons/send.svg").default}
                    className="icon send-icon cursor-pointer"
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
