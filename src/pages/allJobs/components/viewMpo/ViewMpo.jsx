import { useParams, useNavigate } from "react-router-dom";
import "./ViewMpo.css";
import "animate.css";
// import OtherMpo from "./OtherMPOS/OtherMpo";
// import MediaPerspectivesMpo from "./Media Perspectives MPO/MediaPersepectivesMpo";
import MediaPerspectives from "./Agency Logos/MEDIA PERSPECTIVES.png";
import PHDMedia from "./Agency Logos/PHD MEDIA.png";
import { db } from "../../../../config/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";
import Loader2 from "../../../../components/loading2/Loader2";
import { useState } from "react";
import { useMpoStore } from "../../../../store/mpoStore";
import { useAuthStore } from "../../../../store/authStore";
import PhdMpo from "./PhdMPOs/PhdMPO";
import MpMpo from "./mpMpos/MpMpo";
import { useThemeStore } from "../../../../store/themeStore";
import deleteIcon from "../../../../assets/images/trashIcon.svg"

function ViewMpo({allMonths, setAllMonths}) {
  const mpos = useMpoStore((state) => state.mpoData);
  const user = useAuthStore((state) => state.user);
  const [msg, setMsg] = useState();
  const theme = useThemeStore((state) => state.theme)
  const [deleting, setDeleting] = useState(false);
  const [hoveredMpo, setHoveredMpo] = useState(null)

  const { agency, year, month, brand, mpoNum } = useParams();
  const navigate = useNavigate();
  mpos.forEach((mpo) => {
        mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");
        mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
        mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
  });

  const filteredAgencies = mpos.filter((item) => item.agency === agency);
  const filteredYears = filteredAgencies.filter((mpo) => mpo.year === Number(year));
  const filteredMonths = !allMonths ? filteredYears.filter((mpo) => mpo.month === month) : filteredYears;
  const filteredBrands = filteredMonths.filter((mpo) => mpo.brand === brand);
  const filteredMpos = filteredBrands.filter((mpo) => mpo.mpoNum === mpoNum);

  // Function to delete document
  const deleteDocument = async () => {
    if (user.permission === "Guest") {
      return;
    }
    if (filteredMpos.length < 1) {
      return;
    } else {
      for (let i = 0; i < filteredMpos.length; i++) {
        try {
          await deleteDoc(doc(db, "MPOS", filteredMpos[i].id));
          setMsg("Delete successful!");
          navigate(-1);
        } catch (error) {
          setMsg("Error deleting document: ", error.msg);
        }
      }
    }

    navigate(-1);
  };
  

  mpos.forEach((mpo) => {
    mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");
    mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
    mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
  });

  let curMpo;

  curMpo = filteredMpos.sort((a, b) => a.sn - b.sn);
  const days = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  return (
    <>
      {curMpo.length < 1 ? (
        <Loader2 />
      ) : (
        <div className={`!z-1 viewMpo w-full h-full edit-mpos rounded-[5px] overflow-hidden relative ${deleting ? "p-[20px]" : "p-0"}`}>
          <div onClick={() => setDeleting(false)} className={`w-full h-full bg-[#00000098] absolute top-0 left-0 z-20 ${deleting ? "flex items-center justify-center" : "hidden"}`}>
            <div className="w-[400px] h-[250px] bg-white rounded-xl flex flex-col gap-[10px] items-center justify-center relative">
              <div className="w-[20px] h-[10px] absolute top-[10px] right-[10px] cursor-pointer">
                <div className="relative w-full h-full">
                  <div className="w-[60%] h-[2px] absolute rotate-[45deg] bg-gray-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                  <div className="w-[60%] h-[2px] absolute rotate-[-45deg] bg-gray-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                </div>
              </div>
              <div className="w-[50px] h-[50px] rounded-[50%] border-[2px] border-red-500 relative">
                <div className="w-[60%] h-[2px] absolute rotate-[45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                <div className="w-[60%] h-[2px] absolute rotate-[-45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
              </div>
              <h1 className="xl:text-[18px] lg:text-[16px] md:text-[15px] text-[13px]">Are You Sure?</h1>
              <div className="w-[80%] text-center xl:text-[14px] lg:text-[12px] md:text-[11px] text-[9px]">
                <p>Do you really want to delete this MPO? This action cannot be undone.</p>
              </div>
              <div className="w-[60%] flex justify-center items-center gap-[10px]">
                <button onClick={() => setDeleting(false)} className="w-[40%] h-[30px] bg-gray-500 rounded-lg xl:text-[13px] lg:text-[11px] md:text-[10px] text-[8px] text-white cursor-pointer hover:bg-gray-700 smooth">
                  No
                </button>
                <button onClick={deleteDocument} className="w-[40%] h-[30px] bg-red-500 rounded-lg xl:text-[13px] lg:text-[11px] md:text-[10px] text-[8px] text-white cursor-pointer hover:bg-red-700 smooth">
                  Yes
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-[20px] w-full h-[5%] shadow-md shadow-[#00000070] mb-[20px] pb-[10px]">
              <div className="w-[22px] ">
                <img onClick={() => setDeleting(true)} src={deleteIcon} alt="deleteIcon" className={`w-full h-auto ${
                  curMpo.length < 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}/>
              </div>
              <div onClick={() => setAllMonths(!allMonths)} className="xl:flex lg:flex md:flex justify-center">
                  <div  className={`w-[40px] h-[20px] ${theme === "light" ? "bg-[#00000080]" : "bg-[#0d2547]"} rounded-2xl px-1 py-2 relative ${allMonths ? "justify-end" : "justify-start"} smooth cursor-pointer`}>
                      <div className={`w-[14px] h-[14px] rounded-2xl absolute top-[50%] translate-y-[-50%] ${!allMonths ? "left-[10%] bg-gray-400" : "left-[55%] bg-blue-400"} smooth`}>
                      </div>
                  </div>
              </div>
          </div>
          <div className="hideScroll box-border overflow-auto fileDiv m-auto w-full h-full pb-[80px]">
            {curMpo[0].agency === "MEDIA PERSPECTIVES" ? (
              <MpMpo
                curMpo={curMpo}
                days={days}
                MediaPerspectives={MediaPerspectives}
                setHoveredMpo={setHoveredMpo}
                hoveredMpo={hoveredMpo}
              />
            ) : (
              <PhdMpo
                curMpo={curMpo}
                days={days}
                PHDMedia={PHDMedia}
                setHoveredMpo={setHoveredMpo}
                hoveredMpo={hoveredMpo}
              />
            )}
          </div>
          <p
            className={`text-green-600 mt-[40px] text-white xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[10px]`}
          >
            {msg}
          </p>
        </div>
      )}
    </>
  );
}

export default ViewMpo;
