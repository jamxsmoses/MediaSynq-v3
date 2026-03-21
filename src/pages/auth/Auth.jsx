import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";

function Auth() {
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Set persistence mode based on "Keep Me Signed In"
      await setPersistence(
        auth,
        keepMeSignedIn ? browserLocalPersistence : browserSessionPersistence
      );

      // 1️⃣ Sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;

      // 2️⃣ Get Firestore user document
      const userRef = doc(db, "Users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User document not found");
      }

      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...userSnap.data(),
      };

      // 3️⃣ Store in Zustand
      setUser(userData);
      console.log("User in store:", useAuthStore.getState().user);



    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="w-full h-full bg-white flex justify-between items-center">
        <div className="xl:w-[45%] lg:w-[65%] w-full h-full bg-white flex justify-center items-center">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

            <label>
              <input
                      type="checkbox"
                      id="keepMeSignedIn"
                      checked={keepMeSignedIn}
                      onChange={(e) => setKeepMeSignedIn(e.target.checked)}
                      />
              Remember Me
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
        <div className="xl:w-[55%] lg:w-[35%] w-[0%] h-full bg-[#001026]">
        </div>
      </div>
    </>
  );
}

export default Auth;