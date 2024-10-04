import ReactDOM from "react-dom";

const ModalPortal = ({ isOpen, onClose, children }) => {
  const portalContainer = document.getElementById("portal");

  if (isOpen) {
    return ReactDOM.createPortal(
      <div
        className="fixed z-50 top-0 flex justify-center items-center w-screen h-screen bg-slate-500 bg-opacity-60"
        onClick={onClose}
      >
        <div
          className="w-auto  p-4 rounded-md max-w-4xl overflow-hidden break-all"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      portalContainer
    );
  }

  return null;
};

export default ModalPortal;
