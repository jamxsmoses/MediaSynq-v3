import { useMpoStore } from "../../store/mpoStore";
import { Routes, Route } from "react-router";
import { useState, useEffect, useRef } from "react";
import Loader2 from "../../components/loading2/Loader2";
import { uniqueAgencies, uniqueMonths, uniqueMpoNum } from "../../components/functions/Functions";
import { useThemeStore } from "../../store/themeStore";
import Agencies from "./components/agencies/Agencies";
import Years from "./components/year/Years";
import useSearchStore from "../../store/useSearchStore";
import Month from "./components/month/Month";
import Brands from "./components/brands/Brands";
import Mpos from "./components/mpos/Mpos";
import DirectionIcon from "../../components/directionIcon/DirectionIcon";
import ViewMpo from "./components/viewMpo/ViewMpo";
import FileIcon from "../../components/FileIcon/FileIcon";
import { useNavigate, useLocation } from "react-router";
import EditMpo from "./components/viewMpo/Edit MPO/EditMpo";
import { useLocationStore } from "../../store/locationStore";

const Jobs = () => {
    const allMpos = useMpoStore((state) => state.mpoData);
    const theme = useThemeStore((state) => state.theme);
    const [allMonths, setAllMonths] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const lastLocation = useLocationStore((state) => state.location);


    // Line total for each mpo
    allMpos.forEach((mpo) => {
        mpo.lineTotal = mpo.rate * mpo.spots
        mpo.month = mpo.month.toUpperCase()
        mpo.agency = mpo.agency.toUpperCase()
        const vdAmount = (mpo.volumeDiscount / 100) * mpo.lineTotal;
        mpo.vdAmount = vdAmount;
        const rem1 = mpo.lineTotal - vdAmount;
        const acAmount = (mpo.agencyCommission / 100) * rem1;
        mpo.acAmount = acAmount;
        const rem2 = rem1 - acAmount;
        const vatAmount = (mpo.vat / 100) * rem2;
        mpo.vatAmount = vatAmount;
        mpo.netTotal = Math.round((rem2 + vatAmount) * 100) / 100;
    });

    const uniqueAgency = uniqueAgencies(allMpos);
    const uniqueMonth = uniqueMonths(allMpos);

    const monthsOrder = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]

    uniqueMonth.forEach((mpo) => {
        for (let i = 0; i < monthsOrder.length; i++) {
        if (mpo.month === monthsOrder[i].month) {
            mpo.id2 = monthsOrder[i].indexOf(mpo.month); 
        }  
    }
    })

    allMpos.forEach((mpo) => {
    mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");``
    mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
    mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
  });

  const sortedMpos = allMpos.sort((a, b) => {
    // First, compare by year
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    // If years are the same, compare by month
    if (a.month !== b.month) {
      return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
    }

    // Sort by MPO to group similar numbers together
    const mpoComparison = a.mpoNumber.localeCompare(b.mpoNumber);
    if (mpoComparison !== 0) {
      return mpoComparison;
    }

    // Sort by serial number (ascending)
    return a.sn - b.sn;
  });

    sortedMpos.forEach((mpo) => {
        if (mpo.agency === "MAXIMEDIA GLOBAL LIMITED") {
            mpo.agency = "MAXIMEDIA LTD"
        }

        if (mpo.agency === "SUMMIT CREST MEDIA CONSULTING") {
            mpo.agency = "SUMMIT CREST"
        }

        if (mpo.agency === "OTB MEDIA CONCEPT LIMITED") {
            mpo.agency = "OTB MEDIA LTD"
        }

        if (mpo.agency === "PROSPECTS MEDIA & COMMUNICATIONS") {
            mpo.agency = "PROSPECTS MEDIA"
        }

        if (mpo.agency === "SIMPLY BLACK ADVERTISING & CONSULTANCY LIMITED") {
            mpo.agency = "SIMPLY BLACK"
        }
    })

    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);

    const uniqueMpos = uniqueMpoNum(allMpos);

    let searchedMpo = [];

    if (query === "") {
        searchedMpo = []
    } else {
        searchedMpo = uniqueMpos.filter((mpo) => mpo.mpoNumber.includes(query));
    }

    searchedMpo.forEach((mpo) => {
        mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");
        mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
        mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
    });

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        navigate("/manage-mpos/search-result")
    }

    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isFocused) {
                if (event.key === "Escape") {
                    inputRef.current.blur();
                    navigate(-1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: Remove listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

        
        }, []); // Empty array ensures this runs only on mount
    

    return <>
    {
        uniqueAgency.length < 1 ? (
            <Loader2 />
        ) : (
            <div className={`w-full h-[100%] ${theme === "light" ? "bg-gray-200" : "bg-black"} smooth flex flex-col gap-[10px]`}>
            <div className={`w-full h-[5%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex items-center xl:justify-start lg:justify-start md:justify-start justify-between px-[20px] gap-x-[40px]`}>
              <div className="flex gap-x-[10px]">
                <div className="rotate-[180deg]">
                    <DirectionIcon action={-1}/>
                </div>
                <div>
                    <DirectionIcon action={+1}/>
                </div>
              </div>
              <div className="flex items-center gap-[4px]">
                <input
                    placeholder="Search MPO Number"
                    type="text"
                    value={query}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`rounded-[10px] xl:py-[4px] lg:py-[4px] md:py-[5px] py-[6px] xl:px-[10px] lg:px-[10px] md:px-[12px] px-[14px] ${theme === "light" ? "bg-gray-200 border-[#001026] text-[#001026]" : "bg-black border-[#008CFF] text-[#008CFF]"} smooth border-[1px] outline-none uppercase
                    xl:text-[10px] lg:text-[9px] md:text-[8px] font-medium text-[7px]`}
                />
                <div onClick={() => {
                    setQuery("");
                    setIsFocused(false)
                    navigate(lastLocation === "" ? "manage-/mpos" : lastLocation);
                    }} 
                    className={`relative w-[20px] h-[10px] cursor-pointer ${isFocused || location === "/manage-mpos/search-result" ? "block" : "hidden"}`}>
                  <div className="w-[60%] h-[2px] absolute rotate-[45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                  <div className="w-[60%] h-[2px] absolute rotate-[-45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                </div>
              </div>
              
                
            </div> 
            <div className={`w-full h-[94%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                {
                    !isFocused ? (
                        <Routes>
                            <Route path="/" element={<Agencies/>}/>
                            <Route path="/:agency" element={<Years />}/>
                            <Route path="/:agency/:year" element={<Month />}/>
                            <Route path="/:agency/:year/:month" element={<Brands />}/>
                            <Route path="/:agency/:year/:month/:brand" element={<Mpos />}/>
                            <Route path="/:agency/:year/:month/:brand/:mpoNum" element={<ViewMpo allMonths={allMonths} setAllMonths={setAllMonths}/>}/>
                            <Route path="/editMpo/:id" element={<EditMpo />}/>
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/search-result" element={<SearchResult searchedMpo={searchedMpo} navigate={navigate} query={query}/>}/>
                            <Route path="/:agency/:year/:month/:brand/:mpoNum" element={<ViewMpo allMonths={allMonths} setAllMonths={setAllMonths}/>}/>
                            <Route path="/editMpo/:id" element={<EditMpo />}/>
                        </Routes>
                    )
                }
                
            </div>
        </div>
        )
    }
    </>
}

export default Jobs;



const Select2 = ({value, onChange, children }) => {
    return <>
    <select
            value={value}
            className={`pt-[4px] pr-[10px] pb-[2px] outline-none uppercase text-left xl:text-[11px] lg:text-[10px] md:text-[9px] text-[8px] font-bold cursor-pointer font-semibold`}
            onChange={(e) => onChange(e.target.value)}
        >
            {children}
        </select>
    </>
}

const SearchResult= ({searchedMpo, navigate, query}) => {
    const location = useLocation().pathname;

    if (query === "" || location === "/manage-mpos/search-result") {
        return <>
            <div className={`w-full h-full flex items-center justify-center xl:text-[16px] lg:text-[16px] md:text-[15px] text-[14px] font-medium`}>
                <span className="text-white">Search MPO Number</span>
            </div>
        </>
    } else if (query.length > 0 && searchedMpo.length < 1) {
        return <>
            <div className={`w-full h-full flex items-center justify-center xl:text-[16px] lg:text-[16px] md:text-[15px] text-[14px] font-medium`}>
                <span className="text-white">No MPO Matches Your Search Query</span>
            </div>
        </>
    } else {
        return <>
            <div className={`overflow-y-auto hideScroll w-full h-full flex ${searchedMpo.length > 9 ? "xl:justify-between lg:justify-between md:justify-between" : "xl:justify-start lg:justify-start md:justify-start"} items-start overflow-auto flex-wrap gap-x-[20px] gap-y-[10px]`}>
                {
                    searchedMpo.map((mpo) => (
                        <div key={mpo.id} onClick={() => {navigate(`/manage-mpos/${mpo.agency}/${mpo.year}/${mpo.month}/${mpo.brand}/${mpo.mpoNum}`)}}>
                            <FileIcon agency={`${mpo.campaign.toUpperCase()}\n${mpo.mpoNumber}`}/>
                        </div>
                    ))
                }
            </div>
        </>
    }
}