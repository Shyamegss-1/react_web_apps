import ModalPortal from "../portal/portal";
import configStore from "../../stores/configStore";

export default function OverlayLoader() {
  const isLoading = configStore((state) => state.screenLoader);

  return (
    <ModalPortal isOpen={isLoading}>
      <div className="loader"></div>
    </ModalPortal>
  );
}
