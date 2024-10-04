import { create } from "zustand";

const store = (set) => ({
  screenLoader: false,
  skeletonLoader: false,
  setScreenLoader: (state) => set({ screenLoader: state }),
  setSkeletonLoader: (state) => set({ skeletonLoader: state }),
});

const configStore = create(store);

export default configStore;
