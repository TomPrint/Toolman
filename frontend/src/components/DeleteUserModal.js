import React from "react";

export default function DeleteUserModal({onSubmit}) {
  const [showModal, setShowModal] = React.useState(false);
  const submitHandler = () => {
    setShowModal(false);
    onSubmit();
  };
  return (
    <>
      <button
        className="bg-red-500 hover:bg-[#00df9a]  text-white font-semibold py-2 px-4 border border-zinc-900 rounded shadow"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Usuń
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-zinc-900 text-lg leading-relaxed">
                    Chcesz usunąć użytkownika?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-[#00df9a]   background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Zamknij
                  </button>
                  <button
                    className="bg-red-500  text-white font-semibold py-2 px-4 border rounded shadow"
                    type="button"
                    onClick={submitHandler}
                  >
                    Usuń
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
