import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './config/firebase-config';
import { doc, getDoc } from "firebase/firestore";
import './App.css'
import { useLocation } from 'react-router'
import { useAuthStore } from "./store/authStore";
import { Routes, Route, Navigate } from 'react-router';
import Auth from './pages/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/Navbar';
import Jobs from './pages/allJobs/Jobs';
import { useMpoStore } from './store/mpoStore';
import Loader from './components/loading/Loader';

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const fetchMpoData = useMpoStore((state) => state.fetchMpoData)
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [theme, setTheme] = useState(() => {
    // Check initial system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up listener
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // 🔥 Fetch Firestore user document
        const userRef = doc(db, "Users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userSnap.data(),
          });
          
        }
      } else {
        setUser(null);
      }

      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
  if (user) {
    // console.log("User detected in App.jsx:", user);
    fetchMpoData();
  }
  }, [user]);

  const mpos = useMpoStore((state) => state.mpoData);


  if (checkingAuth) {
    return <>
      <Loader />
    </>
  }

  let pageName;

  if (location.pathname === "/") {
    pageName = "SignIn";
  } else if (location.pathname === "/dashboard") {
    pageName = "Dashboard";
  } else if (location.pathname.includes("/manage-mpos")) {
    pageName = "Manage MPOs";
  } else if (location.pathname === "/new-mpo") {
    pageName = "Upload MPO";
  } else if (location.pathname.includes("/invoice")) {
    pageName = "Invoice";
  } else if (location.pathname.includes("/cot")) {
    pageName = "COT";
  } else if (location.pathname.includes("/campaigns")) {
    pageName = "Campaigns";
  }

  return <>
    <div className='appContainer w-[100vw] h-[100vh] bg-black'>
      <div className={`w-full h-[5%] ${!user ? "hidden" : "flex"} items-center justify-between`}>
        <div className="flex items-center justify-center xl:w-[135px] lg:w-[130px] md-w-[120px] h-[25px] md:w-[125px] sm:w-[100px] w-[85px] bg-[#008CFF] rounded-tr-[15px] rounded-br-[15px] xl:text-[15px] lg:text-[14px] md:text-[13px] text-[11px] font-semibold text-black">
            MediaSynq
          </div>
          <span className="text-[#008CFF] uppercase font-bold xl:text-[18px] lg:text-[16px] text-[14px] mr-[10px]">{pageName}</span>
      </div>
      <div className={`w-full ${user ? "xl:h-[95%] lg:h-[95%] md:h-[95%] h-[89%]" : "h-full"} flex`}>
        <nav className={`xl:w-[65px] lg:w-[63px] w-[55px] ${user ? "xl:flex lg:flex md:flex hidden" : "hidden"} h-full flex justify-center`}>
          <Navbar pageName = {pageName}/>
        </nav>
        <main className={`w-full h-full bg-black ${user ? "xl:rounded-tl-[10px] lg:rounded-tl-[10px] md:rounded-tl-[10px] xl:border-[1px] lg:border-[1px] md:border-[1px] border-t-[1px] xl:border-l-[#7E7E7E] lg:border-l-[#7E7E7E] md:border-l-[#7E7E7E] border-t-[#7E7E7E] p-[10px]" : ""}`}>
          <Routes>
            <Route path='/' element={!user ? <Auth /> : <Navigate to='/dashboard'/>}/>
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />}/>
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />}/>
            <Route path='/jobs' element={<Jobs/>}/>
          </Routes>
        </main>
      </div>
      {/* Mobile Nav */}
      <nav className={`w-full fixed bottom-0 left-0 bg-black border-t-[1px] border-t-white ${user ? "xl:hidden lg:hidden md:hidden flex" : "hidden"} h-[6%] flex justify-center`}>
        <Navbar pageName = {pageName}/>
      </nav>
    </div>
  </>
}

export default App
