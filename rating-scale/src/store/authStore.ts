import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  userToken: string | null;
  userData: object;
  signin: (token: string, userData: object) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        userToken: null,
        userData: {},
        signin: (token, userData) => set({ userToken: token, userData }),
        logout: () => set({ userToken: null, userData: {} }),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
