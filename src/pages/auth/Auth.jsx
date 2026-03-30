import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";
import bgIcons from "./images/bgIcons.svg"
import balanceHidden from "../../pages/auth/images/balanceHidden.svg"
import balanceVisible from "../../pages/auth/images/balanceVisible.svg"

function Auth() {
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false)
  
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
      <div className="authContainer w-full h-full bg-white flex justify-between items-center">
        <div className="w-full h-full bg-[#000712] overflow-hidden relative">
          <div className="absolute w-full h-full z-1 top-0 left-0 opacity-[2%]" style={{backgroundImage: `url(${bgIcons})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
          </div>
          <div className="w-full h-full absolute z-2 flex items-center justify-center">
            <form onSubmit={handleLogin} className="smooth xl:w-[25%] lg:w-[40%] md:w-[50%] sm:w-[60%] w-[80%] xl:h-[430px] lg:h-[420px] md:h-[400px] h-[380px] mx-auto bg-[#ffffffc4] flex flex-col justify-center gap-[20px] px-[30px] py-[60px] rounded-xl">
              <div className="w-full flex justify-between items-center">
                <h2 className="font-bold text-[18px] color-[#">Login</h2>
                <div className="px-[10px] text-[14px] py-[5px] bg-[#001026] rounded-2xl"><span className="font-semibold text-[#ffffff]">Media</span><span className="text-[#008CFF]">Synq</span></div>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required className="w-full bg-white p-[10px] border-none outline-none rounded-[5px] shadow-xl xl:text-[16px] lg:text-[15px] md:text-[14px] text-[13px]"
                />

              <div className="relative w-full h-auto">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required className="w-full bg-white p-[10px] border-none outline-none rounded-[5px] shadow-xl xl:text-[16px] lg:text-[15px] md:text-[14px] text-[13px]"
                  />
                    <img src={passwordVisible ? balanceHidden : balanceVisible} onClick={() => setPasswordVisible(!passwordVisible)} alt="" className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-5 w-[20px]" />
                  </div>

              <label className="flex gap-[5px] items-center ">
                <input
                        type="checkbox"
                        id="keepMeSignedIn"
                        checked={keepMeSignedIn}
                        onChange={(e) => setKeepMeSignedIn(e.target.checked)}
                        />
                        <span className="xl:text-[15px] lg:text-[15px] md:text-[14px] text-[13px]">Remember Me</span>
              </label>
              {/*  */}
              <button type="submit" disabled={loading} className="cursor-pointer bg-[#008CFF] xl:text-[15px] lg:text-[15px] md:text-[14px] text-[13px] font-bold text-white py-[10px] rounded-[5px]">
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && <p className="xl:text-[15px] lg:text-[15px] md:text-[14px] text-[13px]" style={{ color: `${error ? "red" : "green"}` }}>{error ? "Invalid Email or Password" : "Login"}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;