import "./Reconcile.css"
import { useThemeStore } from "../../store/themeStore";
import { useMpoStore } from "../../store/mpoStore";
import { useState, useRef, useCallback, useEffect } from "react";
import "animate.css"
import { formatRate } from "../../components/functions/Functions";
import useSearchStore from "../../store/useSearchStore";
import { uniqueMpoNum } from "../../components/functions/Functions";
import DirectionIcon from "../../components/directionIcon/DirectionIcon";
import { useNavigate } from "react-router";
import Loader2 from "../../components/loading2/Loader2";
import * as XLSX from 'xlsx'
import { saveAs } from "file-saver";
import exportDark from "./imgs/exportDark.svg"
import exportLight from "./imgs/exportLight.svg"
import { useAuthStore } from "../../store/authStore";
import filterIcon from "./imgs/filterIcon.svg"
import { a } from "@table-library/react-table-library/index-dc5a56d8";

const Reconcile = () => {
    // const [panelWidth, setPanelWidth] = useState(300);
    // const isDragging = useRef(false);
    // const startX = useRef(0);
    // const startWidth = useRef(0);

    const mpos = useMpoStore((state) => state.mpoData);
    const user = useAuthStore((state) => state.user);
    const [isAscending, setIsAscending] = useState(false);

    mpos.forEach((mpo) => {
        mpo.agency = mpo.agency.trim();
        mpo.agency = mpo.agency.toUpperCase();
        mpo.client = mpo.client.toUpperCase().trim();
        mpo.brand = mpo.brand.toUpperCase().trim();
        if (mpo.agency.includes("SIMPLY BLACK")) {
            mpo.agency = "SIMPLY BLACK ADVERTISING & CONSULTANCY LIMITED"
        }
        if (mpo.agency === "MEDIA PERSPECTIVES") {
            mpo.agencyShort = "MP"
        } else if (mpo.agency === "PHD MEDIA") {
            mpo.agencyShort = "PHD"
        } else if (mpo.agency === "SIMPLY BLACK ADVERTISING & CONSULTANCY LIMITED") {
            mpo.agencyShort = "SYMPLY B"
        } else if (mpo.agency.includes("MAXIMEDIA GLOBAL LIMITED")) {
            mpo.agencyShort = "MAXIMEDIA"
        } else if (mpo.agency === "GLORYCAP LIMITED") {
            mpo.agencyShort = "GLORYCAP"
        } else if (mpo.agency === "TOLARAM LIMITED") {
            mpo.agencyShort = "TOLARAM"
        } else if (mpo.agency === "SUMMIT CREST MEDIA CONSULTING") {
            mpo.agencyShort = "SUMMIT C."
        } else if (mpo.agency === "OTB MEDIA CONCEPT LIMITED") {
            mpo.agencyShort = "OTB MEDIA"
        } else if (mpo.agency === "PROSPECTS MEDIA & COMMUNICATIONS") {
            mpo.agencyShort = "PROSPECTS M&C"
        } else {
            mpo.agencyShort = mpo.agency
        }
    })

    mpos.forEach((mpo) => {
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


    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    const theme = useThemeStore((state) => state.theme);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const [year, setYear] = useState([currentYear]);
    const [agency, setAgency] = useState([]);
    const [month, setMonth] = useState([months[currentMonth].toUpperCase()]);
    const [client, setClient] = useState([]);
    const [brand, setBrand] = useState([]);

    mpos.forEach((mpo) => {
        mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
        mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
    });

    const navigate = useNavigate();

    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);

    const uniqueMpos = uniqueMpoNum(mpos);

    let searchedMpo = [];

    if (query === "") {
        searchedMpo = []
    } else {
        searchedMpo = uniqueMpos.filter((mpo) => mpo.mpoNumber.toUpperCase().includes(query.toUpperCase()));
    }

    const userAgency = user.agency;

    let newArr = [];
    
    if (user.agency !== "All") {
        newArr = userAgency.map((agency, id) => ({ agency, id }));
    }

    newArr.forEach((item) => {
        item.agency = item.agency.trim();
        item.agency = item.agency.toUpperCase();
        if (item.agency.includes("SIMPLY BLACK")) {
            item.agency = "SIMPLY BLACK ADVERTISING & CONSULTANCY LIMITED"
        }
        if (item.agency === "MEDIA PERSPECTIVES") {
            item.agencyShort = "MP"
        } else if (item.agency === "PHD MEDIA") {
            item.agencyShort = "PHD"
        } else if (item.agency.includes("SIMPLY BLACK")) {
            item.agencyShort = "SYMPLY B"
        } else if (item.agency.includes("MAXIMEDIA GLOBAL LIMITED")) {
            item.agencyShort = "MAXIMEDIA"
        } else if (item.agency === "GLORYCAP LIMITED") {
            item.agencyShort = "GLORYCAP"
        } else if (item.agency === "TOLARAM LIMITED") {
            item.agencyShort = "TOLARAM"
        } else if (item.agency === "SUMMIT CREST MEDIA CONSULTING") {
            item.agencyShort = "SUMMIT C."
        } else if (item.agency === "OTB MEDIA CONCEPT LIMITED") {
            item.agencyShort = "OTB MEDIA"
        } else if (item.agency === "PROSPECTS MEDIA & COMMUNICATIONS") {
            item.agencyShort = "PROSPECTS M&C"
        } else {
            item.agencyShort = item.agency
        }
    })

    const uniqueYears = Array.from(
        new Map(mpos.map((item) => [item.year, item])).values()
    );

    // filter Years
    const  filteredYears = year.length < 1 ? mpos : mpos.filter((mpo) => year.includes(mpo.year));

    const uniqueAgencies = Array.from(
        new Map(filteredYears.map((item) => [item.agency.toUpperCase(), item])).values()
    );

    // filter Agencies
    const filteredAgencies = agency.length < 1 ? filteredYears : filteredYears.filter((mpo) => agency.includes(mpo.agency.toUpperCase()));
  
    const uniqueMonths = Array.from(
        new Map(filteredAgencies.map((item) => [item.month.toUpperCase(), item])).values()
    );

    const sortedMonths = uniqueMonths.sort((a, b) => {
        // 2. Sort by month (December to January)
        const monthOrder = {
            'january': 1, 'february': 2, 'march': 3, 'april': 4,
            'may': 5, 'june': 6, 'july': 7, 'august': 8,
            'september': 9, 'october': 10, 'november': 11, 'december': 12
        };

        // Normalize month - handle both cases and undefined
        const getMonthValue = (obj) => {
            const monthStr = (obj.Month || obj.month || '').toLowerCase();
            return monthOrder[monthStr] || 0;
        };

        const monthA = getMonthValue(a);
        const monthB = getMonthValue(b);

        if (monthA !== monthB) {
                return monthA - monthB; // Lower month number (January) first
        }

    })
    
    // filter Months
    const filteredMonths = month.length < 1 ? filteredAgencies : filteredAgencies.filter((mpo) => (month.includes(mpo.month.toUpperCase())));

    const uniqueClients = Array.from(
        new Map(filteredMonths.map((item) => [item.client.toUpperCase(), item])).values()
    );

    // filter Clients
    const filteredClients = client.length < 1 ? filteredMonths : filteredMonths.filter((mpo) => (client.includes(mpo.client.toUpperCase())));

    const uniqueBrands = Array.from(
        new Map(filteredClients.map((item) => [item.brand.toUpperCase(), item])).values()
    );

    // filter Brands
    const filteredBrands = brand.length < 1 ? filteredClients : filteredClients.filter((mpo) => (brand.includes(mpo.brand.toUpperCase())));

    // Add to useState array
    const addItem = (newItem, items, setItem) => {
        setItem([...items, newItem]);
    };

    // Remove from year array
    const removeItem = (item, arr, setItem) => {
        setItem(arr.filter((items) => items !== item));
    };

    const [yearFilterIsVisible, setYearFilterIsVisible] = useState(false);
    const [agencyFilterIsVisible, setAgencyFilterIsVisible] = useState(false);
    const [monthFilterIsVisible, setMonthFilterIsVisible] = useState(false);
    const [clientFilterIsVisible, setClientFilterIsVisible] = useState(false);
    const [brandFilterIsVisible, setBrandFilterIsVisible] = useState(false);

    const mainMpos = query.length > 0 ? searchedMpo : filteredBrands

    let sortedMpos = [];  

    sortedMpos = mainMpos.sort((a, b) => {
        // 1. Sort by year (most recent first)
        const yearA = Number(a.year) || 0;
        const yearB = Number(b.year) || 0;
        if (yearA !== yearB) {
            return yearB - yearA;
        }

        // 2. Sort by month (December to January)
        const monthOrder = {
            'january': 1, 'february': 2, 'march': 3, 'april': 4,
            'may': 5, 'june': 6, 'july': 7, 'august': 8,
            'september': 9, 'october': 10, 'november': 11, 'december': 12
        };

        // Normalize month - handle both cases and undefined
        const getMonthValue = (obj) => {
            const monthStr = (obj.Month || obj.month || '').toLowerCase();
            return monthOrder[monthStr] || 0;
        };

        const monthA = getMonthValue(a);
        const monthB = getMonthValue(b);

        if (monthA !== monthB) {
            // if (!ascending) {
            //     return monthA - monthB; // Lower month number (January) first
            // }
            
            return monthB - monthA; // Higher month number (December) first
        }

        // 3. Sort by agency (ascending) - with null safety
        const agencyA = (a.agency || '').toString();
        const agencyB = (b.agency || '').toString();
        const agencyCompare = agencyA.localeCompare(agencyB);
        if (agencyCompare !== 0) {
            return agencyCompare;
        }

        // 4. Sort by MPO number - with type conversion
        const mpoA = Number(a.mpoNumber) || 0;
        const mpoB = Number(b.mpoNumber) || 0;
        if (mpoA !== mpoB) {
            return mpoA - mpoB; // Ascending order
        }

        // 5. For same MPO number, sort by serial number (lowest first)
        const snA = Number(a.sn) || 0;
        const snB = Number(b.sn) || 0;
        return snA - snB;
    });
    
    function calcVolDisct (a, b) {
        const calcVDAmnt = Math.round((a / 100) * b * 100) / 100;
        return calcVDAmnt
    }

    function calcAC(a, b, c, d) {
        const rateTotal = a * b;
        const vdAmount = (c / 100) * rateTotal;
        const rem = rateTotal - vdAmount;
        const calcACAmnt = Math.round((d / 100) * rem * 100) / 100;
        return calcACAmnt;
    }

    function calcVatAmount(a, b, c, d, e) {
        const rateTotal = a * b;
        const vdAmount = (c / 100) * rateTotal;
        const rem = rateTotal - vdAmount;
        const acAmount = (d / 100) * rem;
        const rem2 = rem - acAmount;
        const vatAmount = (e / 100) * rem2;
        const calcVatAmnt = Math.round(vatAmount * 100) / 100;
        return calcVatAmnt;
    }

    function calcNetAmount(a, b, c, d, e) {
        const rateTotal = a * b;
        const vdAmount = (c / 100) * rateTotal;
        const rem = rateTotal - vdAmount;
        const acAmount = (d / 100) * rem;
        const rem2 = rem - acAmount;
        const vatAmount = (e / 100) * rem2;
        const calcLnTotalAmnt = Math.round((vatAmount + rem2) * 100) / 100;
        return calcLnTotalAmnt;
    }

    sortedMpos.forEach((item) => {
        item.lineTotal = item.spots * item.rate
        item.netTotal = calcNetAmount(item.spots, item.rate, item.volumeDiscount, item.agencyCommission, item.vat)
    })

    const totalRate = query === "" ? sortedMpos.reduce((sum, obj) => sum + obj.rate, 0) : searchedMpo.reduce((sum, obj) => sum + obj.rate, 0);
    const totalGross = query === "" ? sortedMpos.reduce((sum, obj) => sum + obj.lineTotal, 0) : searchedMpo.reduce((sum, obj) => sum + obj.lineTotal, 0);
    const totalSpots = query === "" ? sortedMpos.reduce((sum, obj) => sum + obj.spots, 0) : searchedMpo.reduce((sum, obj) => sum + obj.spots, 0);
    const totalNet = query === "" ? sortedMpos.reduce((sum, obj) => sum + obj.netTotal, 0) : searchedMpo.reduce((sum, obj) => sum + obj.netTotal, 0);
  
    const [hoveredNum, setHoveredNum] = useState();

    const divOneRef = useRef(null);
    const divTwoRef = useRef(null);
    const activeDivRef = useRef(null);

    const handleScroll = (sourceRef, targetRef) => {
        if (activeDivRef.current && activeDivRef.current !== sourceRef.current) {
        return;
        }
        
        activeDivRef.current = sourceRef.current;
        
        if (targetRef.current) {
        targetRef.current.scrollTop = sourceRef.current.scrollTop;
        }
        
        // Clear active status on next tick / frame
        requestAnimationFrame(() => {
        activeDivRef.current = null;
        });
    };

    const fieldOrder = ["year", "mpoNumber", "agency", "month", "client", "brand", "campaign", "material", "duration", "specification", "spots", "rate", "lineTotal", "volumeDiscount", "vdAmount", "agencyCommission", "acAmount", "vat", "vatAmount", "netTotal"];

    let rearrangedData = [];
    rearrangedData = sortedMpos.map(({ id, ...rest }) => {
    const newObj = {};
    fieldOrder.forEach(field => {
        if (field in rest) newObj[field] = rest[field];
    });

    return newObj;
    });

    function toSentenceCase(str) {
        if (typeof str !== 'string' || str.length === 0) return '';

        const lower = str.toLowerCase();

        // Capitalize the first letter that is a-z, and the first letter after . ! ?
        return lower.replace(
            /(^\s*[a-z])|([.!?]\s+[a-z])/g,
            (match) => match.toUpperCase()
        );
    }

    // Rearrange: age, name, email, id (for example)
    rearrangedData = rearrangedData.map(item => ({
        SN: rearrangedData.indexOf(item) + 1,
        YEAR: item.year,
        MPONUMBER: item.mpoNumber,
        AGENCY: toSentenceCase(item.agency),
        MONTH: toSentenceCase(item.month),
        CLIENT: toSentenceCase(item.client),
        BRAND: toSentenceCase(item.brand),
        CAMPAIGN: toSentenceCase(item.campaign),
        MATERIAL: toSentenceCase(item.material),
        DURATION: item.duration,
        SPECIFICATION: toSentenceCase(item.specification),
        SPOTS: item.spots,
        RATE: item.rate,
        GROSS: item.lineTotal,
        VD: `${item.volumeDiscount}%`,
        VDAMOUNT: item.vdAmount,
        AC: `${item.agencyCommission}%`,
        ACAMOUNT: item.acAmount,
        VAT: `${item.vat}%`,
        VATAMOUNT: item.vatAmount,
        NET: item.netTotal
    }));

    const handleExport = () => {
        // 1. Create a new worksheet from the JSON array
        const worksheet = XLSX.utils.json_to_sheet(rearrangedData);
        
        // 2. Create a new empty workbook
        const workbook = XLSX.utils.book_new();
        
        // 3. Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statement1');
        
        // 4. Generate the Excel file buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        
        // 5. Create a Blob and save it using file-saver
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'DataReport.xlsx');
    };

    // const onResizeStart = (e) => {
    //     isDragging.current = true;
    //     startX.current = e.clientX;
    //     startWidth.current = panelWidth;
    //     e.currentTarget.setPointerCapture(e.pointerId);
    //     document.body.style.cursor = 'ew-resize';
    //     document.body.style.userSelect = 'none';
    // };

    // const onResizeMove = (e) => {
    //     if (!isDragging.current) return;
    //     const delta = e.clientX - startX.current;
    //     const next = Math.min(700, Math.max(150, startWidth.current + delta));
    //     setPanelWidth(next);
    // };

    // const onResizeEnd = (e) => {
    //     isDragging.current = false;
    //     e.currentTarget.releasePointerCapture(e.pointerId);
    //     document.body.style.cursor = '';
    //     document.body.style.userSelect = '';
    // };

    return <>
        {
            <div className={`w-full h-[100%] ${theme === "light" ? "bg-gray-200" : "bg-black"} smooth flex flex-col gap-[10px] relative`}>
            {/* filter container */}
            <div className={`w-full h-[5%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex items-center xl:justify-start lg:justify-start justify-between px-[20px] py-[20px] gap-x-[40px]`}>
                
                {/* Direction Icons */}
                <div className="flex gap-x-[10px]">
                    <div className="rotate-[180deg]">
                        <DirectionIcon action={-1}/>
                    </div>
                    <div>
                        <DirectionIcon action={+1}/>
                    </div>
                </div>

              {/* Search */}
              <div className="flex items-center gap-[4px]">
                <input
                    placeholder="Search MPO Number"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`rounded-[10px] xl:py-[3px] lg:py-[2px] md:py-[4px] py-[6px] xl:px-[6px] lg:px-[8px] md:px-[10px] px-[12px] ${theme === "light" ? "bg-gray-200 border-[#001026] text-[#001026]" : "bg-black border-[#008CFF] text-[#008CFF]"} smooth border-[1px] outline-none uppercase
                    xl:text-[10px] lg:text-[9px] md:text-[8px] font-medium text-[7px]`}
                />
                <div onClick={() => {
                    setQuery("");
                }}
                    className={`relative w-[20px] h-[10px] cursor-pointer ${query === "" ? "hidden" : "block"}`}>
                  <div className="w-[60%] h-[2px] absolute rotate-[45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                  <div className="w-[60%] h-[2px] absolute rotate-[-45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                </div>
              </div>

                {/* Save to Excel */}
                <div onClick={handleExport} className={`pb-[5px] cursor-pointer xl:w-[26px] lg:w-[24px] md:w-[22px] w-[20px] xl:h-[26px] lg:g-[24px] md:h-[22px] h-[20px] flex items-center justify-center rounded-[50%] p-[3px] ${theme === "light" ? "bg-white" : "bg-blue-500"} smooth `}>
                    <img src={theme === "light" ? exportLight : exportDark} alt="export icon" className="w-[58%]" />
                </div>
            </div>

            {/* Table container */}
            {mpos.length > 0 ? (
                <>
                    <div className={`w-full h-[94%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                        <div className="w-full h-full overflow-y-auto overflow-x-hidden hideScroll">
                            <div className="w-full flex gap-[15px] items-start mb-[10px]">
                                <div className="flex flex-col">
                                    <span className="uppercase  xl:text-[8px] lg:text-[8px] text-[6px] rounded-[5px] bg-white px-[5px] py-[2px] font-bold text-black">Total Spots</span>
                                    <span className="text-blue-500 font-bold xl:text-[18px] lg:text-[16px] md:text-[14px] text-[13px]">{totalSpots.toLocaleString("en-US")}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="uppercase  xl:text-[8px] lg:text-[8px] text-[6px] rounded-[5px] bg-white px-[5px] py-[2px] font-bold text-black">Total Rate</span>
                                    <span className="text-blue-500 font-bold xl:text-[18px] lg:text-[16px] md:text-[14px] text-[13px]">{formatRate(totalRate)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="uppercase  xl:text-[8px] lg:text-[8px] text-[6px] rounded-[5px] bg-white px-[5px] py-[2px] font-bold text-black">Total Gross</span>
                                    <span className="text-blue-500 font-bold xl:text-[18px] lg:text-[16px] md:text-[14px] text-[13px]">{formatRate(totalGross)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="uppercase  xl:text-[8px] lg:text-[8px] text-[6px] rounded-[5px] bg-white px-[5px] py-[2px] font-bold text-black">Total Net</span>
                                    <span className="text-blue-500 font-bold xl:text-[18px] lg:text-[16px] md:text-[14px] text-[13px]">{formatRate(totalNet)}</span>
                                </div>
                            </div>
                            {/* Table Flex Div */}
                                    <div className="w-full h-full xl:flex lg:flex md:flex hidden ">
                                        {/* Div for left part of table */}
                                        <div ref={divOneRef} onScroll={() => handleScroll(divOneRef, divTwoRef)} 
                                        className="custom-scroll-container hideScroll-Y-axis w-[350px] h-full pb-[10px] mr-[5px] overflow-y-auto overflow-x-auto ">
                                            <table style={{ border: "none" }}  className="w-full"> 
                                            <thead className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                                        style={{ border: "none" }}>
                                                <tr  className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                                                    <td className="text-left">SN</td>
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onClick={() => {setYear([])}} onMouseOver={() => {
                                                            setYearFilterIsVisible(true);
                                                        }} onMouseOut={() => {
                                                            setYearFilterIsVisible(false);
                                                        }}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"}  !w-[70px] flex items-center justify-between px-[5px]`}>
                                                                <span>{year.length === "" ? year[0] : "Years"}</span>
                                                                <div className={`${year.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-full ${yearFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setYearFilterIsVisible(true)}} onMouseOut={() => {setYearFilterIsVisible(false)}}
                                                                className={`absolute bg-white w-full "top-0 smooth`}>
                                                                    {uniqueYears.map((item) => (
                                                                        <div onClick={() => {
                                                                            !year.includes(item.year) ? addItem(item.year, year, setYear) : removeItem(item.year, year, setYear)
                                                                        }} className={`${!year.includes(item.year) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span>{`${item.year}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-left">MPO Number</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sortedMpos.map((item) => (
                                                        <tr onMouseOver={() => {
                                                            setHoveredNum(sortedMpos.indexOf(item));
                                                        }} 
                                                        onMouseOut={() => {
                                                            setHoveredNum("");
                                                        }}
                                                        onClick={() => {
                                                            const selection = window.getSelection();
                                                                if (selection.toString()) {
                                                                // If there's a selection (i.e., text is selected), do nothing
                                                                return; // Early return to prevent the click handler from firing
                                                                } else {
                                                                navigate(`/manage-mpos/${item.agency}/${item.year}/${item.month}/${item.brand.toUpperCase()}/${item.mpoNum}`);
                                                                }
                                                            }}
                                                            key={item.id} className={`cursor-pointer ${hoveredNum === sortedMpos.indexOf(item) ? "bg-blue-500" : ""} xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}>
                                                            <td>{filteredMonths.indexOf(item) + 1}</td>
                                                            <td>{item.year}</td>
                                                            <td>{item.mpoNumber}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr className="h-[50px]">
                                                    <td colSpan="3"></td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        {/* Div for right part of table */}
                                        <div ref={divTwoRef} onScroll={() => handleScroll(divTwoRef, divOneRef)} 
                                        className="custom-scroll-container w-full h-full overflow-y-auto overflow-x-auto">
                                            <table style={{ border: "none" }}  className="w-full"> 
                                            <thead className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                                                style={{ border: "none" }}>
                                                <tr  className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                                                    {/* Agencies FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onClick={() => setAgency([])}  onMouseOver={() => {
                                                            setAgencyFilterIsVisible(true)
                                                        }} onMouseOut={() => {
                                                            setAgencyFilterIsVisible(false)
                                                        }}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[100px] flex items-center justify-between px-[5px]`}>
                                                                <span>Agencies</span>
                                                                <div className={`${agency.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[130px] ${agencyFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setAgencyFilterIsVisible(true)}} onMouseOut={() => {setAgencyFilterIsVisible(false)}} 
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {user.agency === "All" ? (uniqueAgencies.map((item) => (
                                                                        <div onClick={() => {
                                                                            !agency.includes(item.agency.toUpperCase()) ? addItem(item.agency.toUpperCase(), agency, setAgency) : removeItem(item.agency.toUpperCase(), agency, setAgency)
                                                                        }} className={`${!agency.includes(item.agency.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.agencyShort.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))) : (newArr.map((item) => (
                                                                        <div onClick={() => {
                                                                            !agency.includes(item.agency.toUpperCase()) ? addItem(item.agency.toUpperCase(), agency, setAgency) : removeItem(item.agency.toUpperCase(), agency, setAgency)
                                                                        }} className={`${!agency.includes(item.agency.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.agencyShort.toUpperCase()}`}</span>
                                                                        </div>
                                                                    )))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Months FIlter */}
                                                    <td className={`text-left relative filterButton flex items-center justify-between w-[120px]`}>
                                                        <div onClick={() => setMonth([])} onMouseOver={() => {setMonthFilterIsVisible(true)}} onMouseOut={() => setMonthFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                            <span>Months</span>
                                                            <div className={`${month.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                        </div>
                                                        <div onClick={() => {setIsAscending(!isAscending)}} className="w-[20px] hidden cursor-pointer">
                                                            <img src={filterIcon} alt="filterIcon" className={`w-full smooth ${isAscending ? "rotate-[180deg] flipImg" : ""}`} />
                                                        </div>
                                                        <div className={`absolute top-[120%] w-[100px] ${monthFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setMonthFilterIsVisible(true)}} onMouseOut={() => setMonthFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {sortedMonths.map((item) => (
                                                                        <div onClick={() => {
                                                                            !month.includes(item.month.toUpperCase()) ? addItem(item.month.toUpperCase(), month, setMonth) : removeItem(item.month.toUpperCase(), month, setMonth)
                                                                        }} className={`${!month.includes(item.month.toUpperCase()) ? "" : "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"} hover:bg-blue-300 hover:text-black smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.month.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Clients FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onClick={() => setClient([])} onMouseOver={() => {setClientFilterIsVisible(true)}} onMouseOut={() => setClientFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                                <span>{client.length === "" ? client[0] : "Clients"}</span>
                                                                <div className={`${client.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[350px] ${clientFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setClientFilterIsVisible(true)}} onMouseOut={() => setClientFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {uniqueClients.map((item) => (
                                                                        <div onClick={() => {
                                                                            !client.includes(item.client.toUpperCase()) ? addItem(item.client.toUpperCase(), client, setClient) : removeItem(item.client.toUpperCase(), client, setClient)
                                                                        }} className={`${!client.includes(item.client.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.client.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Brands FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onClick={() => setBrand([])} onMouseOver={() => {setBrandFilterIsVisible(true)}} onMouseOut={() => setBrandFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                                <span>{brand.length === "" ? brand[0] : "Brands"}</span>
                                                                <div className={`${brand.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[350px] ${brandFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setBrandFilterIsVisible(true)}} onMouseOut={() => setBrandFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {uniqueBrands.map((item) => (
                                                                        <div onClick={() => {
                                                                            !brand.includes(item.brand.toUpperCase()) ? addItem(item.brand.toUpperCase(), brand, setBrand) : removeItem(item.brand.toUpperCase(), brand, setBrand)
                                                                        }} className={`${!brand.includes(item.brand.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.brand.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-left">Campaign</td>
                                                    <td className="text-left">Title of Material</td>
                                                    <td className="text-center">Duration</td>
                                                    <td className="text-left">Specification</td>
                                                    <td className="text-center">Spots</td>
                                                    <td className="text-right">Rate</td>
                                                    <td className="text-right">Gross Total</td>
                                                    <td className="text-center">{"V.D (%)"}</td>
                                                    <td className="text-right">V.D Amount</td>
                                                    <td className="text-center">{"A.C (%)"}</td>
                                                    <td className="text-right">A.C Amount</td>
                                                    <td className="text-center">{"VAT (%)"}</td>
                                                    <td className="text-right">VAT Amount</td>
                                                    <td className="text-right">Net Total</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sortedMpos.map((item) => (
                                                        <tr onMouseOver={() => {
                                                            setHoveredNum(sortedMpos.indexOf(item));
                                                        }}
                                                        onMouseOut={() => {
                                                            setHoveredNum("");
                                                        }}
                                                        onClick={() => {
                                                            const selection = window.getSelection();
                                                                if (selection.toString()) {
                                                                // If there's a selection (i.e., text is selected), do nothing
                                                                return; // Early return to prevent the click handler from firing
                                                                } else {
                                                                navigate(`/manage-mpos/${item.agency}/${item.year}/${item.month}/${item.brand.toUpperCase()}/${item.mpoNum}`);
                                                                }
                                                            }}
                                                            key={item.id} className={`cursor-pointer ${hoveredNum === sortedMpos.indexOf(item) ? "bg-blue-500" : ""} xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}>
                                                            <td>{item.agencyShort}</td>
                                                            <td>{item.month.toUpperCase()}</td>
                                                            <td>{item.client}</td>
                                                            <td>{item.brand}</td>
                                                            <td>{item.campaign}</td>
                                                            <td>{item.material}</td>
                                                            <td className="text-center">{item.duration}</td>
                                                            <td>{item.specification}</td>
                                                            <td className="text-center">{item.spots}</td>
                                                            <td className="text-right">{formatRate(item.rate)}</td>
                                                            <td className="text-right">{formatRate(item.lineTotal)}</td>
                                                            <td className="text-center">{`${item.volumeDiscount}%`}</td>
                                                            <td className="text-right">{formatRate(calcVolDisct(item.volumeDiscount, item.rate * item.spots))}</td>
                                                            <td className="text-center">{`${item.agencyCommission}%`}</td>
                                                            <td className="text-right">{formatRate(calcAC(item.spots, item.rate, item.volumeDiscount, item.agencyCommission))}</td>
                                                            <td className="text-center">{`${item.vat}%`}</td>
                                                            <td className="text-right">{formatRate(calcVatAmount(item.spots, item.rate, item.volumeDiscount, item.agencyCommission, item.vat))}</td>
                                                            <td className="text-right">{formatRate(item.netTotal)}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr className="h-[50px]">
                                                    <td colSpan="8"></td>
                                                    <td className="text-center !text-blue-500 !font-bold">{totalSpots.toLocaleString("en-US")}</td>
                                                    <td className="text-right !text-blue-500 !font-bold">{formatRate(totalRate)}</td>
                                                    <td className="text-right !text-blue-500 !font-bold">{formatRate(totalGross)}</td>
                                                    <td colSpan="6"></td>
                                                    <td className="text-right !text-blue-500 !font-bold">{formatRate(totalNet)}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div> 

                                    <div className="w-full h-full xl:hidden lg:hidden md:hidden flex ">
                                        {/* Div for right part of table */}
                                        <div className="custom-scroll-container w-full h-full overflow-y-auto overflow-x-auto">
                                            <table style={{ border: "none" }}  className="w-full"> 
                                            <thead className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                                                style={{ border: "none" }}>
                                                <tr  className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                                                    <td className="text-left">SN</td>
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onMouseOver={() => {
                                                            setYearFilterIsVisible(true);
                                                        }} onMouseOut={() => {
                                                            setYearFilterIsVisible(false);
                                                        }}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"}  !w-[70px] flex items-center justify-between px-[5px]`}>
                                                                <span>{year.length === "" ? year[0] : "Years"}</span>
                                                                <div className={`${year.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-full ${yearFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setYearFilterIsVisible(true)}} onMouseOut={() => {setYearFilterIsVisible(false)}}
                                                                className={`absolute bg-white w-full "top-0 smooth`}>
                                                                    {uniqueYears.map((item) => (
                                                                        <div onClick={() => {
                                                                            !year.includes(item.year) ? addItem(item.year, year, setYear) : removeItem(item.year, year, setYear)
                                                                        }} className={`${!year.includes(item.year) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span>{`${item.year}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-left">MPO Number</td>
                                                    {/* Agencies FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onMouseOver={() => {
                                                            setAgencyFilterIsVisible(true)
                                                        }} onMouseOut={() => {
                                                            setAgencyFilterIsVisible(false)
                                                        }}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[100px] flex items-center justify-between px-[5px]`}>
                                                                <span>Agencies</span>
                                                                <div className={`${agency.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[130px] ${agencyFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setAgencyFilterIsVisible(true)}} onMouseOut={() => {setAgencyFilterIsVisible(false)}} 
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {user.agency === "All" ? (uniqueAgencies.map((item) => (
                                                                        <div onClick={() => {
                                                                            !agency.includes(item.agency.toUpperCase()) ? addItem(item.agency.toUpperCase(), agency, setAgency) : removeItem(item.agency.toUpperCase(), agency, setAgency)
                                                                        }} className={`${!agency.includes(item.agency.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.agencyShort.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))) : (newArr.map((item) => (
                                                                        <div onClick={() => {
                                                                            !agency.includes(item.agency.toUpperCase()) ? addItem(item.agency.toUpperCase(), agency, setAgency) : removeItem(item.agency.toUpperCase(), agency, setAgency)
                                                                        }} className={`${!agency.includes(item.agency.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.agencyShort.toUpperCase()}`}</span>
                                                                        </div>
                                                                    )))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Months FIlter */}
                                                    <td className={`text-left relative filterButton flex items-center justify-between w-[120px]`}>
                                                        <div onMouseOver={() => {setMonthFilterIsVisible(true)}} onMouseOut={() => setMonthFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                            <span>Months</span>
                                                            <div className={`${month.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                        </div>
                                                        <div onClick={() => {setIsAscending(!isAscending)}} className="w-[20px] hidden cursor-pointer">
                                                            <img src={filterIcon} alt="filterIcon" className={`w-full smooth ${isAscending ? "rotate-[180deg] flipImg" : ""}`} />
                                                        </div>
                                                        <div className={`absolute top-[120%] w-[100px] ${monthFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setMonthFilterIsVisible(true)}} onMouseOut={() => setMonthFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {sortedMonths.map((item) => (
                                                                        <div onClick={() => {
                                                                            !month.includes(item.month.toUpperCase()) ? addItem(item.month.toUpperCase(), month, setMonth) : removeItem(item.month.toUpperCase(), month, setMonth)
                                                                        }} className={`${!month.includes(item.month.toUpperCase()) ? "" : "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"} hover:bg-blue-300 hover:text-black smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.month.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Clients FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onMouseOver={() => {setClientFilterIsVisible(true)}} onMouseOut={() => setClientFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                                <span>{client.length === "" ? client[0] : "Clients"}</span>
                                                                <div className={`${client.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[350px] ${clientFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setClientFilterIsVisible(true)}} onMouseOut={() => setClientFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {uniqueClients.map((item) => (
                                                                        <div onClick={() => {
                                                                            !client.includes(item.client.toUpperCase()) ? addItem(item.client.toUpperCase(), client, setClient) : removeItem(item.client.toUpperCase(), client, setClient)
                                                                        }} className={`${!client.includes(item.client.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.client.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Brands FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onMouseOver={() => {setBrandFilterIsVisible(true)}} onMouseOut={() => setBrandFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                                <span>{brand.length === "" ? brand[0] : "Brands"}</span>
                                                                <div className={`${brand.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[350px] ${brandFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setBrandFilterIsVisible(true)}} onMouseOut={() => setBrandFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {uniqueBrands.map((item) => (
                                                                        <div onClick={() => {
                                                                            !brand.includes(item.brand.toUpperCase()) ? addItem(item.brand.toUpperCase(), brand, setBrand) : removeItem(item.brand.toUpperCase(), brand, setBrand)
                                                                        }} className={`${!brand.includes(item.brand.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.brand.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-left">Campaign</td>
                                                    <td className="text-left">Title of Material</td>
                                                    <td className="text-center">Duration</td>
                                                    <td className="text-left">Specification</td>
                                                    <td className="text-center">Spots</td>
                                                    <td className="text-right">Rate</td>
                                                    <td className="text-right">Gross Total</td>
                                                    <td className="text-center">{"V.D (%)"}</td>
                                                    <td className="text-right">V.D Amount</td>
                                                    <td className="text-center">{"A.C (%)"}</td>
                                                    <td className="text-right">A.C Amount</td>
                                                    <td className="text-center">{"VAT (%)"}</td>
                                                    <td className="text-right">VAT Amount</td>
                                                    <td className="text-right">Net Total</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sortedMpos.map((item) => (
                                                        <tr onMouseOver={() => {
                                                            setHoveredNum(sortedMpos.indexOf(item));
                                                        }} 
                                                        onMouseOut={() => {
                                                            setHoveredNum("");
                                                        }}
                                                        onClick={() => {
                                                            const selection = window.getSelection();
                                                                if (selection.toString()) {
                                                                // If there's a selection (i.e., text is selected), do nothing
                                                                return; // Early return to prevent the click handler from firing
                                                                } else {
                                                                navigate(`/manage-mpos/${item.agency}/${item.year}/${item.month}/${item.brand.toUpperCase()}/${item.mpoNum}`);
                                                                }
                                                            }}
                                                            key={item.id} className={`cursor-pointer ${hoveredNum === sortedMpos.indexOf(item) ? "bg-blue-500" : ""} xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}>
                                                            <td>{filteredMonths.indexOf(item) + 1}</td>
                                                            <td>{item.year}</td>
                                                            <td>{item.mpoNumber}</td>
                                                            <td>{item.agencyShort}</td>
                                                            <td>{item.month.toUpperCase()}</td>
                                                            <td>{item.client}</td>
                                                            <td>{item.brand}</td>
                                                            <td>{item.campaign}</td>
                                                            <td>{item.material}</td>
                                                            <td className="text-center">{item.duration}</td>
                                                            <td>{item.specification}</td>
                                                            <td className="text-center">{item.spots}</td>
                                                            <td className="text-right">{formatRate(item.rate)}</td>
                                                            <td className="text-right">{formatRate(item.lineTotal)}</td>
                                                            <td className="text-center">{`${item.volumeDiscount}%`}</td>
                                                            <td className="text-right">{formatRate(calcVolDisct(item.volumeDiscount, item.rate * item.spots))}</td>
                                                            <td className="text-center">{`${item.agencyCommission}%`}</td>
                                                            <td className="text-right">{formatRate(calcAC(item.spots, item.rate, item.volumeDiscount, item.agencyCommission))}</td>
                                                            <td className="text-center">{`${item.vat}%`}</td>
                                                            <td className="text-right">{formatRate(calcVatAmount(item.spots, item.rate, item.volumeDiscount, item.agencyCommission, item.vat))}</td>
                                                            <td className="text-right">{formatRate(item.netTotal)}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr className="h-[50px]">
                                                    <td colSpan="8"></td>
                                                    <td className="text-center !text-blue-500 !font-bold">{totalSpots.toLocaleString("en-US")}</td>
                                                    <td className="text-right !text-blue-500 !font-bold">{formatRate(totalRate)}</td>
                                                    <td className="text-right !text-blue-500 !font-bold">{formatRate(totalGross)}</td>
                                                    <td colSpan="6"></td>
                                                    <td className="text-right !text-blue-500 !font-bold">{formatRate(totalNet)}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>                            
                        </div>
                    </div>
                </>
            ) : (
                <Loader2 />
            )}
        </div>
            
        }
    </>
}

export default Reconcile;

