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
import { useThemeStore } from './store/themeStore';
import NavbarMobile from './components/NavbarMobile';
import { useLocationStore } from './store/locationStore';
import DailyCampaigns from './pages/dailyCampaigns/DailyCampaigns';
import NewMpo from './pages/newMpo/NewMpo';
import Reconcile from './pages/reconcile/Reconcile';
import Invoice from './pages/invoice/Invoice';
import "animate.css"
import logo from "../public/icons/icon-192.png"

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const fetchMpoData = useMpoStore((state) => state.fetchMpoData)
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setLocation = useLocationStore((state) => state.setLocation);
  
  const [hasSeen, setHasSeen] = useState(() => {
    // This function runs only on the very first render
    return localStorage.getItem("hasSeenFeature") === "true";
  });

  console.log(user ? "Yes" : "No")
  

  useEffect(() => {    
    if (location.pathname !== '/manage-mpos/search-result') {
      setLocation(location.pathname)
    }
  }, [location.pathname]);

  // const [theme, setTheme] = useState(() => {
  //   // Check initial system preference
  //   return window.matchMedia('(prefers-color-scheme: dark)').matches
  //     ? 'dark'
  //     : 'light';
  // });

  // useEffect(() => {
  //   // Listen for system theme changes
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   const handleChange = (e) => {
  //     setTheme(e.matches ? 'dark' : 'light');
  //   };

  //   mediaQuery.addEventListener('change', handleChange);
    
  //   // Clean up listener
  //   return () => mediaQuery.removeEventListener('change', handleChange);
  // }, []);

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
    fetchMpoData();
  }
  }, [user]);


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
  } else if (location.pathname.includes("/reconcile")) {
    pageName = "Reconcile";
  }else if (location.pathname === "/new-mpo") {
    pageName = "Upload MPO";
  } else if (location.pathname.includes("/invoice")) {
    pageName = "Invoice";
  } else if (location.pathname.includes("/cot")) {
    pageName = "COT";
  } else if (location.pathname.includes("/campaigns")) {
    pageName = "Campaigns";
  }

  return <>
    <div className={`appContainer w-[100vw] h-[100vh] ${theme === 'light' ? "bg-gray-200" : 'bg-black'} smooth relative`}>
      <div className={`smooth absolute z-[100] w-full h-full top-0 left-0 bg-[#00000099] ${user && !hasSeen ? "flex" : "hidden"} items-center justify-center`}>
        <div className='relative flex gap-[10px] flex-col p-[20px] items-center justify-center xl:w-[40%] lg:w-[60%] md:w-[75%] w-[90%] xl:h-[500px] lg:h-[450px] md:h-[400px] h-[450px] bg-white rounded-[20px]'>
          
          {/* Button to close pop up */}
          <div onClick={() => {
            localStorage.setItem("hasSeenFeature", true);
            setHasSeen(true);
          }} className='w-[25px] cursor-pointer rounded-xl absolute top-[5%] right-[1%] flex items-center justify-center'>
            <div className='relative w-full h-full rotate-[45deg]'>
              <div className='absolute w-[80%] h-[3px] bg-[#121212] rounded-lg' ></div>
              <div className='absolute w-[80%] h-[3px] bg-[#121212] rounded-lg rotate-[90deg]'></div>
            </div>
          </div>
          
          <div className='flex flex-col items-center'>
            <img className='xl:w-[50px] lg:w-[45px] md:w-[40px] w-[35px]' src={logo} alt="Logo" />
            <h1 className='font-bold xl:text-[24px] lg:text-[22px] md:text-[20px] text-[18px]'>MediaSynq is now installable!</h1>
          </div>
          <span className='text-center w-[80%] xl:text-[16px] lg:text-[14px] md:text-[14px] text-[13px]'>
            Get the full app experience on your PC or mobile device — faster loading, and a home screen icon. 
            <br /><br />
            <span className='font-black'>On mobile (Android / iOS)</span>
            <br />
            <span className='font-semibold'>Android (Chrome):</span> Tap the ⋮ menu → "Install app". 
            <br />
            <span className='font-semibold'>iOS (Safari):</span> Tap the Share button → "Add to Home Screen". 
            <br /><br />
            <span className='font-black'>💻 On PC (Chrome / Edge):</span>
            <br />
            Click the install icon (⊕ or monitor icon) in the address bar → Install. Or open the browser menu → "Install MediaSynq".
          </span>
        </div>
      </div>
      <div className={`w-full h-[5%] ${!user ? "hidden" : "flex"} items-center justify-between`}>
          <div className={`flex items-center justify-center xl:w-[135px] lg:w-[130px] md-w-[120px] h-[25px] md:w-[125px] sm:w-[100px] w-[85px] rounded-tr-[15px] rounded-br-[15px] xl:text-[15px] lg:text-[14px] md:text-[13px] text-[11px] font-semibold ${theme === "light" ? "text-gray-200 bg-[#001026]" : "text-black bg-[#008CFF]"} smooth`}>
            MediaSynq
          </div>
          <div className="xl:hidden lg:hidden md:hidden flex justify-centerhidden">
                <div onClick={toggleTheme} className={`w-[35px] h-[15px] bg-gray-800 rounded-2xl px-1 py-2 relative ${theme === 'light' ? "justify-start" : "justify-end"} smooth cursor-pointer`}>
                    <div className={`w-[12px] h-[12px] rounded-2xl absolute top-[50%] translate-y-[-50%] ${theme === "light" ? "left-[6%] bg-white" : "left-[60%] bg-gray-400"} smooth`}></div>
                </div>
            </div>
          <span className={`text-[#008CFF] uppercase font-bold xl:text-[18px] lg:text-[16px] text-[14px] mr-[10px] `}>{pageName}</span>
      </div>
      <div className={`w-full ${user ? "xl:h-[95%] lg:h-[95%] md:h-[95%] h-[89%]" : "h-full"} flex`}>
        <nav className={`xl:w-[65px] lg:w-[63px] w-[55px] ${user ? "xl:flex lg:flex md:flex hidden" : "hidden"} h-full flex justify-center`}>
          <Navbar pageName = {pageName}/>
        </nav>
        <main className={`w-full h-full ${theme === 'light' ? "bg-gray-200" : 'bg-black'} smooth overflow-auto ${user ? "xl:rounded-tl-[10px] lg:rounded-tl-[10px] md:rounded-tl-[10px] xl:border-l-[1px] lg:border-l-[1px] md:border-l-[1px] xl:border-t-[1px] lg:border-t-[1px] md:border-t-[1px] border-t-[1px] xl:border-l-[#7E7E7E] lg:border-l-[#7E7E7E] md:border-l-[#7E7E7E] border-t-[#7E7E7E] p-[10px]" : ""}`}>
          <Routes>
            <Route path='/' element={!user ? <Auth /> : <Navigate to='/dashboard'/>}/>
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />}/>
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />}/>
            <Route path='/manage-mpos/*' element={<Jobs/>}/>
            <Route path='/campaigns' element={<DailyCampaigns currentUser={user}/>}/>
            <Route path='/reconcile' element={<Reconcile />}/>
            <Route path='/new-mpo' element={<NewMpo />}/>
            <Route path='/invoice' element={<Invoice />}/>
          </Routes>
        </main>
      </div>
      {/* Mobile Nav */}
      <nav className={`w-full fixed bottom-0 left-0  border-t-[1px] ${theme === "light" ? "border-t-black" : "border-t-white"} ${user ? "xl:hidden lg:hidden md:hidden flex" : "hidden"} h-[6%] flex justify-center`}>
        <NavbarMobile pageName = {pageName}/>
      </nav>
    </div>
  </>
}

export default App
