import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  role: null, // 'DOCTOR' o 'PATIENT'
  setUser: (userData) => set({ user: userData, role: userData.role }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, role: null });
  },
}));

export default useUserStore;
