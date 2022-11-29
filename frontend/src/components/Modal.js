import React from "react";

function Modal(props) {
  return (
    <div className="bg-[#808080]">
      <div className="text-white">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            console.log("kliknięto w zamknięcie")
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Czy na pewno chcesz usunąć to narzędzie ?</h1>
        </div>
     
          <button onClick={props.handleDelete}>Tak</button>

        </div>
      </div>
  );
}

export default Modal;