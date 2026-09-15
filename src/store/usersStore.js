import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config"; // your firebase config

export const useUsersStore = create((set) => ({
  usersData: [],
  loadingUsers: false,
  usersError: null,

  fetchUsersData: async () => {

    set({ loadingUsers: true, UsersError: null });

    try {
      const querySnapshot = await getDocs(collection(db, "Agencies"));

      const allUsersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // ✅ 3️⃣ Store only matching data
      set({
        usersData: allUsersData,
        loadingUsers: false,
      });

    } catch (error) {
      set({
        usersError: error.message,
        loadingUsers: false,
      });
    }
  },
}));