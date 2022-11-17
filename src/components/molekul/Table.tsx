import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
import { sortlistTable, tableFormat, tableFormatCheck } from "../../interface";
import { findTrue } from "../../utils/engine";
import { BlastSchema } from "../../utils/Schema";

const Table = () => {
  const [datas, setDatas] = useState<tableFormat[]>();
  const [tables, setTable] = useState<tableFormatCheck[]>();
  const [checkAll, setCheckAll] = useState(false);
  const [open, setOpen] = useState(true);
  const [Sorteds, setSorted] = useState<sortlistTable>({
    KSM: false,
    KPR: false,
    CC: false,
    DEPOSITO: false,
    MTR: false,
  });
  const openModal = () => {};
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const schema = BlastSchema;
    if (e.target.files !== null) {
      const file = e.target.files[0];
      readXlsxFile(file, { schema }).then((rows) => {
        let newData = rows.rows.map((v: any) => ({
          ...v,
          number: `+${v["number"]}`,
          checkAll: checkAll,
        }));

        setDatas(newData as tableFormatCheck[]);
      });
      // const file = e.target.files[0];
      // const formData = new FormData();
      // formData.append("file", file);
      // axios
      //   .post("http://localhost:8000/api/clusters", formData)
      //   .then((response) => {
      //     setDatas(JSON.parse(JSON.parse(response.data.data)));
      //   })
      //   .catch((e) => {
      //     console.log("error");
      //   });
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
    if (newsData.length > 0) {
      setTable(newsData);
    } else {
      setTable(newData);
    }
  };
  const sortedTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = !Sorteds[e.target.name as keyof typeof Sorteds];
    setSorted({
      ...Sorteds,
      [e.target.name]: newData,
    });
  };
  const anCheckData = (data: tableFormatCheck) => {
    const datas = tables?.map((object: tableFormatCheck) => {
      if (object.number === data.number) {
        return { ...object, checkAll: !data.checkAll };
      }
      return object;
    });
    setTable(datas);
  };
  const sendBlas = (data: tableFormatCheck) => {
    const eligible = findTrue(data).filter(
      (v) => v !== "nama" && v !== "number" && v !== "checkAll"
    );
    const datas: any[] = [];
    eligible.map(async (v) => {
      //  Send Wa blas To Api
      await axios
        .post("http://localhost:8000/api/wablast", {
          ...data,
          segmen: v,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log("error");
        });
      return "Proses terkirim";
    });
  };
  const sendBlasChecked = () => {
    if (tables) {
      const data = tables.filter((v: tableFormatCheck) => v.checkAll === true);
      data.map((v) => {
        sendBlas(v);
      });
    }
  };
  const sendBlasFilter = () => {
    const areTrue = findTrue(Sorteds);
    if (areTrue.length) {
      areTrue.map((v) => {
        tables?.map(async (d) => {
          if (d[v as keyof typeof Sorteds] === 1) {
            await axios
              .put("http://localhost:8000/api/wablast", {
                ...d,
                segmen: v,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => {
                console.log("error");
              });
          }
        });
      });
    }
  };
  useEffect(() => {
    const areTrue = findTrue(Sorteds);
    if (datas) {
      modifytable(datas, areTrue);
    }
  }, [checkAll, Sorteds, datas]);
  useEffect(() => {
    // console.log(tables);
  }, [tables]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
      <div className="pb-4 bg-white dark:bg-indigo-900 p-2 flex flex-row">
        <div className="basis-1/2 flex flex-row items-center">
          <button
            onClick={() => sendBlasChecked()}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Send All Checked
          </button>
          <button
            onClick={() => sendBlasFilter()}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Send With Filter
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
                      onChange={() => anCheckData(data)}
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

export default Table;
