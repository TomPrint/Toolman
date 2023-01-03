import React from "react";

function Modal(props) {
  return (
        <div className="bg-slate-700 bg-opacity-50 flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full">
          <div className="bg-[#ffffff] px-10 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">{`Czy chcesz na pewno usunąć ${props.description}?`}</h1>
            <button className="bg-[#656565] px-7 py-2 rounded-md text-md text-white font-semibold" onClick={() => {
              props.setOpenModal(false);
            }}>Nie</button>
            <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={props.handleDelete}>Tak</button>
          </div>
        </div>
        )
}

export default Modal;