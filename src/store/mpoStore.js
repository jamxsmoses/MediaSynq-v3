import { create } from "zustand";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config"; // your firebase config
import { useAuthStore } from "./authStore"; // import user store

export const useMpoStore = create((set) => ({
  mpoData: [],
  loadingMpo: false,
  mpoError: null,

  fetchMpoData: async () => {
    const user = useAuthStore.getState().user;

    // console.log("User inside fetchMpoData:", user);

    set({ loadingMpo: true, mpoError: null });

    try {
      let querySnapshot;

      // ✅ Case 1: User can see ALL agencies
      if (user.agency === "All") {
        querySnapshot = await getDocs(collection(db, "MPOS"));
      }

      // ✅ Case 2: User has selected agencies (array)
      else if (Array.isArray(user.agency) && user.agency.length > 0) {
        const q = query(
          collection(db, "MPOS"),
          where("agency", "in", user.agency)
        );

        querySnapshot = await getDocs(q);
      }

      // ❗ Optional safety fallback
      else {
        console.log("User agency not valid");
        set({ mpoData: [], loadingMpo: false });
        return;
      }

      const mpoArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({
        mpoData: mpoArray,
        loadingMpo: false,
      });

    } catch (error) {
      set({
        mpoError: error.message,
        loadingMpo: false,
      });
    }
  },
}));