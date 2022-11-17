import { Fragment, useEffect } from "react";

import { modalBroad } from "../../interface";

export default function ModalBroad({
  open = false,
  setOpen,
  tabs,
  setTabs,
  sendBlasChecked,
}: modalBroad) {
  useEffect(() => {}, []);
  const modifyMessage = (e: any) => {
    let message = e.target.value;
    setTabs({
      ...tabs!,
      message: message,
    });
  };
  const modifyImage = (e: any) => {
    let image = e.target.files[0];
    setTabs({
      ...tabs!,
      image: image,
    });
  };
  useEffect(() => {}, [tabs]);
  return (
    <>
      {open ? (
        <>
          <div className="min-h-[75%] min-w-[75%] max-h-[90%] max-w-[90%] m-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="min-w-[50%] max-w-[85%] relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Write Message</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* AREA */}
                  <label
                    className="block text-sm font-medium text-black-900 dark:text-black"
                    htmlFor="file_input"
                  >
                    Upload Image
                  </label>
                  <input
                    onChange={(e) => modifyImage(e)}
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
                  {/* TABS */}
                  <textarea
                    onChange={(e) => modifyMessage(e)}
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      sendBlasChecked();
                      setOpen(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
