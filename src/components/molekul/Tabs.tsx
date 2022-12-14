import React from "react";
import { tabsModal } from "../../interface";
import { useEffect } from "react";

const Tabs = ({ tabs, setTabs }: tabsModal) => {
  const [openTab, setOpenTab] = React.useState(1);
  const modifyMessage = (e: any, segmen: string) => {
    let message = e.target.value;
    let newTabs = tabs?.map((v) => {
      if (v.segmen === segmen) {
        return { ...v, message: message };
      }
      return v;
    });
    setTabs(newTabs);
    console.log(newTabs);
  };
  const modifyImage = (e: any, segmen: string) => {
    let image = e.target.files[0];
    let newTabs = tabs?.map((v) => {
      if (v.segmen === segmen) {
        return { ...v, image: image };
      }
      return v;
    });
    setTabs(newTabs);
    console.log(newTabs);
  };
  useEffect(() => {}, [tabs]);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {tabs?.map((v, i) => (
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === i + 1
                      ? "text-white bg-indigo-600"
                      : "text-indigo-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();

                    setOpenTab(i + 1);
                  }}
                  data-toggle="tab"
                  href={`#${v.segmen}`}
                  role="tablist"
                >
                  {v.segmen}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {tabs?.map((v, i) => (
                  <div
                    className={openTab === i + 1 ? "block" : "hidden"}
                    id={v.segmen}
                  >
                    <label
                      className="block text-sm font-medium text-black-900 dark:text-black"
                      htmlFor="file_input"
                    >
                      Upload Image
                    </label>
                    <input
                      onChange={(e) => modifyImage(e, v.segmen)}
                      className="block w-full text-sm text-black-900 border border-black-300 rounded-lg cursor-pointer bg-black-50 dark:text-black-400 focus:outline-none dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                    />
                    <p
                      className="mt-1 text-sm text-black-500 dark:text-black-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>

                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your message
                    </label>
                    <textarea
                      onChange={(e) => modifyMessage(e, v.segmen)}
                      value={v.message}
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
