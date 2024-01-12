import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ setOpen, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          className="grid place-items-center absolute top-0 z-2 h-screen w-[100%] backdrop-blur-[2px] bg-black/40"
        >
          <div className="min-h-[200px] min-w-[80%] bg-[#ebece8] m-auto p-3 rounded-xl z-40 relative">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={() => {
                  setOpen(false);
                }}
                className="self-end text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
