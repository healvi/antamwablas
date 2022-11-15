import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { sortlistTable, tableFormat, tableFormatCheck } from "../../interface";

const Table = () => {
  const [tables, setTable] = useState<tableFormatCheck[]>();
  const [Sorteds, setSorted] = useState<sortlistTable>({
    KSM: false,
    KPR: false,
    CC: false,
    DEPOSITO: false,
    MTR: false,
  });
  const [checkAll, setCheckAll] = useState(false);
  const datas = [
    {
      nama: "mohammad irvan",
      number: "085735784029",
      KSM: 1,
      KPR: 0,
      CC: 1,
      DEPOSITO: 0,
      MTR: 0,
    },
    {
      nama: "Andriansyah",
      number: "085735784021",
      KSM: 1,
      KPR: 0,
      CC: 0,
      DEPOSITO: 1,
      MTR: 0,
    },
    {
      nama: "FIFI",
      number: "085735784022",
      KSM: 0,
      KPR: 1,
      CC: 0,
      DEPOSITO: 0,
      MTR: 1,
    },
  ];
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const formData = new FormData();
      console.log(file);
      formData.append("file", file);
      axios
        .post("http://localhost:8000/api/users", formData)
        .then((response) => {
          setTable(JSON.parse(JSON.parse(response.data.data)));
        })
        .catch((e) => {
          console.log("error");
        });
    }
    e.target.value = "";
  };

  const modifytable = (data: tableFormat[], areTrue: String[]) => {
    let newData = data.map((v) => ({ ...v, checkAll: checkAll }));
    let newsData = newData.filter((v) => {
      return areTrue.some((f) => {
        return v[f as keyof typeof Sorteds] === 1;
      });
    });
    setTable(newData);
    console.log(areTrue);
    console.log(newsData);
  };
  const sortedTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = !Sorteds[e.target.name as keyof typeof Sorteds];
    setSorted({
      ...Sorteds,
      [e.target.name]: newData,
    });
  };
  useEffect(() => {
    const areTrue = Object.keys(Sorteds).filter(
      (key) => Sorteds[key as keyof typeof Sorteds]
    );

    modifytable(datas, areTrue);
  }, [checkAll, Sorteds]);
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
              <input
                id="checkbox-all-search"
                onChange={(e) => sortedTable(e)}
                checked={Sorteds.KSM}
                type="checkbox"
                name="KSM"
                className="mr-2 w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
              />
              <label htmlFor="checkbox-all-search " className="sr-only">
                checkbox
              </label>
              KSM
            </th>
            <th scope="col" className="py-3 px-2 dark:text-white">
              <input
                id="checkbox-all-search"
                onChange={(e) => sortedTable(e)}
                checked={Sorteds.KPR}
                type="checkbox"
                name="KPR"
                className="mr-2 w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
              />
              <label htmlFor="checkbox-all-search " className="sr-only">
                checkbox
              </label>
              KPR
            </th>
            <th scope="col" className="py-3 px-2 dark:text-white">
              <input
                id="checkbox-all-search"
                onChange={(e) => sortedTable(e)}
                checked={Sorteds.CC}
                type="checkbox"
                name="CC"
                className="mr-2 w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
              />
              <label htmlFor="checkbox-all-search " className="sr-only">
                checkbox
              </label>
              CC
            </th>
            <th scope="col" className="py-3 px-2 dark:text-white">
              <input
                id="checkbox-all-search"
                onChange={(e) => sortedTable(e)}
                checked={Sorteds.MTR}
                type="checkbox"
                name="MTR"
                className="mr-2 w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
              />
              <label htmlFor="checkbox-all-search " className="sr-only">
                checkbox
              </label>
              MTR
            </th>
            <th scope="col" className="py-3 px-2 dark:text-white">
              <input
                id="checkbox-all-search"
                onChange={(e) => sortedTable(e)}
                checked={Sorteds.DEPOSITO}
                type="checkbox"
                name="DEPOSITO"
                className="mr-2 w-4 h-4 text-white-600 bg-indigo-100 rounded border-indigo-300 focus:ring-white-500 dark:focus:ring-white-600 dark:ring-offset-indigo-800 focus:ring-2 dark:bg-indigo-700 dark:border-indigo-600"
              />
              <label htmlFor="checkbox-all-search " className="sr-only">
                checkbox
              </label>
              DEPOSITO
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
                <td className="py-4 px-2 dark:text-white">
                  {data.KSM === 1 ? (
                    <img
                      src={require("../../assets/icons/check.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/icons/nop.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  )}
                </td>
                <td className="py-4 px-2 dark:text-white">
                  {data.KPR === 1 ? (
                    <img
                      src={require("../../assets/icons/check.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/icons/nop.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  )}
                </td>
                <td className="py-4 px-2 dark:text-white">
                  {data.CC === 1 ? (
                    <img
                      src={require("../../assets/icons/check.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/icons/nop.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  )}
                </td>
                <td className="py-4 px-2 dark:text-white">
                  {data.MTR === 1 ? (
                    <img
                      src={require("../../assets/icons/check.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/icons/nop.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  )}
                </td>
                <td className="py-4 px-2 dark:text-white">
                  {data.DEPOSITO === 1 ? (
                    <img
                      src={require("../../assets/icons/check.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/icons/nop.svg").default}
                      className="icon send-icon"
                      alt="send-icon"
                      data-testid="send-icon"
                    />
                  )}
                </td>
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
            <div>DATA KOSOSNg</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
