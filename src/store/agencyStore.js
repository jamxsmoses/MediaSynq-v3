import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config"; // your firebase config
import { useAuthStore } from "./authStore"; // import user store

export const useAgencyStore = create((set) => ({
  agencyData: [],
  loadingAgency: false,
  agencyError: null,

  fetchAgencyData: async () => {
    const user = useAuthStore.getState().user;

    // 🚨 1️⃣ Only fetch if user exists
    if (!user) {
      console.log("No user found. Agencies fetch aborted.");
      return;
    }

    set({ loadingAgency: true, AgencyError: null });

    try {
      const querySnapshot = await getDocs(collection(db, "Agencies"));

      const allAgencyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🎯 2️⃣ Filter based on user.agency
      const filteredAgency = allAgencyData.filter(
        (item) => item.agency === user.agency
      );

      // ✅ 3️⃣ Store only matching data
      set({
        agencyData: filteredMpo,
        loadingAgency: false,
      });

    } catch (error) {
      set({
        agencyError: error.message,
        loadingAgency: false,
      });
    }
  },
}));