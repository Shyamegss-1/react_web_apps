import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupPortal: React.FC<PortalProps> = ({ isOpen, onClose, children }) => {
  const portalContainer: HTMLElement = document.getElementById("portal-root")!;

  if (isOpen) {
    return ReactDOM.createPortal(
      <div className="popup-overlay" onClick={onClose}>
        <div
          className="popup-content"
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

export default PopupPortal;
