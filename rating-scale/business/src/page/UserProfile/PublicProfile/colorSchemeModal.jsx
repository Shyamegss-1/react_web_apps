/* eslint-disable react/prop-types */

import ModalPortal from "../../../components/portal/portal";

export default function ColorSchemeModal({
  open,
  closeHandler,
  setColorScheme,
}) {
  const colorSchemeHandler = () => {
    const value = document.getElementById("teggyihsd").value;

    setColorScheme(value);
    closeHandler();
  };
  return (
    <ModalPortal isOpen={open}>
      <div className="bg-white rounded p-5">
        <input type="color" id="teggyihsd" className="border-none" />
        <div className="mt-3 space-x-2">
          <button
            onClick={() => colorSchemeHandler()}
            className="base-bg text-white px-5 py-2 rounded-md text-sm"
          >
            Save
          </button>

          <button
            onClick={closeHandler}
            className="bg-red-500 text-white px-5 py-2 rounded-md text-sm"
          >
            cancel
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
