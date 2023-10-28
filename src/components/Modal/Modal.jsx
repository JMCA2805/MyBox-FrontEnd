import { useState, useEffect } from "react";

const Modal = ({ children, open, handleOpen }) => {
  const [modal, setModal] = useState("hidden");
  const [move, setMove] = useState("");
  const [executed, setExecuted] = useState(false);

  useEffect(() => {
    if (!executed) {
      setExecuted(true);
    } else {
      setModal(
        open === false
          ? "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center prevshow"
          : "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center show"
      );
      if (open === false) {
        setTimeout(() => {
          setModal(
            "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center hidden"
          );
        }, 800);
      }
      setMove(open === false ? " premove" : " move");
    }
  }, [open]);

  return (
    <>
      <div className={modal} onClick={handleOpen}>
        <div
          className={
            "bg-white rounded-lg flex flex-col xl:w-96 md:w-96 lg:w-96 ssm:w-72" +
            move
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

const Button = ({ children, handleOpen }) => {
  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
      >
        {children}
      </button>
    </>
  );
};

const ButtonIcon = ({ children, handleOpen }) => {
  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center w-10 h-10 mx-2 rounded-full ssm:w-8 ssm:h-8"
      >
        {children}
      </button>
    </>
  );
};

const ModalHeader = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center rounded-t-lg w-full h-16 text-xl font-bold dark:bg-black bg-dark-tangerine text-white">
        {children}
      </div>
    </>
  );
};

const ModalBody = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center w-full p-5 bg-white-smoke dark:bg-woodsmoke ">
        {children}
      </div>
    </>
  );
};

const ModalFooter = ({ children }) => {
  return (
    <>
      <div  className="flex justify-center items-center rounded-b-lg bg-white-smoke dark:bg-black w-full h-16 ">
        {children}
      </div>
    </>
  );
};
export { Modal, Button, ButtonIcon, ModalHeader, ModalBody, ModalFooter };
