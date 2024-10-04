import { useEffect, useRef } from "react";

const useOnceEffect = (callback, deps = "") => {
  const useOnceRef = useRef(false);

  useEffect(() => {
    if (!useOnceRef.current) {
      useOnceRef.current = true;
      if (typeof callback === "function") {
        callback();
      } else {
        callback;
      }
    }
  }, deps);
};

export default useOnceEffect;
