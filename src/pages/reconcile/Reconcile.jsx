import { useThemeStore } from "../../store/themeStore";
import { useMpoStore } from "../../store/mpoStore";
import { useState, useRef } from "react";
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

const Reconcile = () => {
    const mpos = useMpoStore((state) => state.mpoData);

    mpos.forEach((mpo) => {
        mpo.agency = mpo.agency.toUpperCase();
        mpo.client = mpo.client.toUpperCase().trim();
        mpo.brand = mpo.brand.toUpperCase().trim();
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


    const uniqueYears = Array.from(
        new Map(mpos.map((item) => [item.year, item])).values()
    );

    const uniqueAgencies = Array.from(
        new Map(mpos.map((item) => [item.agency.toUpperCase(), item])).values()
    );

    const uniqueClients = Array.from(
        new Map(mpos.map((item) => [item.client.toUpperCase(), item])).values()
    );

    const uniqueBrands = Array.from(
        new Map(mpos.map((item) => [item.brand.toUpperCase(), item])).values()
    );

    // filter Years
    const  filteredYears = year.length < 1 ? mpos : mpos.filter((mpo) => year.includes(mpo.year));

    // filter Agencies
    const filteredAgencies = agency.length < 1 ? filteredYears : filteredYears.filter((mpo) => agency.includes(mpo.agency.toUpperCase()));

    // filter Months
    const filteredMonths = month.length < 1 ? filteredAgencies : filteredAgencies.filter((mpo) => (month.includes(mpo.month.toUpperCase())));

    // filter Clients
    const filteredClients = client.length < 1 ? filteredMonths : filteredMonths.filter((mpo) => (client.includes(mpo.client.toUpperCase())));

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
        if (a.year !== b.year) {
            return b.year - a.year;
        }

        // 2. Sort by month (December to January)
        const monthOrder = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4,
            'May': 5, 'June': 6, 'July': 7, 'August': 8,
            'September': 9, 'October': 10, 'November': 11, 'December': 12
        };

        const monthA = monthOrder[a.Month] || monthOrder[a.month] || 0;
        const monthB = monthOrder[b.Month] || monthOrder[b.month] || 0;

        if (monthA !== monthB) {
            return monthB - monthA; // Higher month number (December) first
        }

        // 3. Sort by agency (ascending)
        if (a.agency !== b.agency) {
            return a.agency.localeCompare(b.agency);
        }

        // 3. Sort by MPO number
        if (a.mpoNumber !== b.mpoNumber) {
            return a.mpoNumber - b.mpoNumber; // Ascending order
        }

        // 4. For same MPO number, sort by serial number (lowest first)
        return a.sn - b.sn;
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

    // Rearrange: age, name, email, id (for example)
    rearrangedData = rearrangedData.map(item => ({
        year: item.year,
        mpoNumber: item.mpoNumber,
        agency: item.agency,
        month: item.month,
        client: item.client,
        brand: item.brand,
        campaign: item.campaign,
        material: item.material,
        duration: item.duration,
        specification: item.specification,
        spots: item.spots,
        rate: item.rate,
        gross: item.lineTotal,
        vd: item.volumeDiscount,
        vdAmount: item.vdAmount,
        ac: item.agencyCommission,
        acAmount: item.acAmount,
        vat: item.vat,
        vatAmount: item.vatAmount,
        netTotal: item.netTotal
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


    return <>
        {
            <div className={`w-full h-[100%] ${theme === "light" ? "bg-gray-200" : "bg-black"} smooth flex flex-col gap-[10px] relative`}>
            {/* filter container */}
            <div className={`w-full h-[5%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex items-center xl:justify-start lg:justify-start justify-between px-[20px] gap-x-[40px]`}>
                
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
                    className={`rounded-[10px] xl:py-[4px] lg:py-[4px] md:py-[5px] py-[6px] xl:px-[10px] lg:px-[10px] md:px-[12px] px-[14px] ${theme === "light" ? "bg-gray-200 border-[#001026] text-[#001026]" : "bg-black border-[#008CFF] text-[#008CFF]"} smooth border-[1px] outline-none uppercase
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
                <div onClick={handleExport} className={`pb-[5px] cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] ${theme === "light" ? "bg-white" : "bg-blue-500"} smooth `}>
                    <img src={theme === "light" ? exportLight : exportDark} alt="export icon" className="w-[58%]" />
                </div>
            </div>

            {/* Table container */}
            {mpos.length > 0 ? (
                <>
                    <div className={`w-full h-[94%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                        <div className="w-full h-full overflow-y-auto overflow-x-hidden fileDiv">
                            {/* Table Flex Div */}
                                    <div className="w-full flex h-full">
                                        {/* Div for left part of table */}
                                        <div ref={divOneRef} onScroll={() => handleScroll(divOneRef, divTwoRef)} 
                                        className="h-full pb-[10px] mr-[5px] overflow-y-auto overflow-x-auto hideScroll">
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
                                        className="fileDiv w-full h-full overflow-y-auto overflow-x-auto">
                                            <table style={{ border: "none" }}  className="w-full"> 
                                            <thead className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                                                style={{ border: "none" }}>
                                                <tr  className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
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
                                                                    {uniqueAgencies.map((item) => (
                                                                        <div onClick={() => {
                                                                            !agency.includes(item.agency.toUpperCase()) ? addItem(item.agency.toUpperCase(), agency, setAgency) : removeItem(item.agency.toUpperCase(), agency, setAgency)
                                                                        }} className={`${!agency.includes(item.agency.toUpperCase()) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={item.id}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item.agencyShort.toUpperCase()}`}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Months FIlter */}
                                                    <td className={`text-left relative filterButton`}>
                                                        <div onMouseOver={() => {setMonthFilterIsVisible(true)}} onMouseOut={() => setMonthFilterIsVisible(false)}
                                                            className={`cursor-pointer ${theme === "light" ? "bg-[#2D2D2D]" : "bg-[#091526]"} !w-[80px] flex items-center justify-between px-[5px]`}>
                                                                <span>Months</span>
                                                                <div className={`${month.length > 0 ? "opacity-[100%]" : "opacity-[0%]"} w-[5px] h-[5px] rounded-[50%] bg-red-500 smooth`}></div>
                                                            </div>
                                                        <div className={`absolute top-[120%] w-[100px] ${monthFilterIsVisible ? "h-[500px]" : "h-[0px]"} overflow-y-auto fileDiv`}>
                                                            <div className="w-full h-full relative">
                                                                <div onMouseOver={() => {setMonthFilterIsVisible(true)}} onMouseOut={() => setMonthFilterIsVisible(false)}
                                                                className={`absolute bg-white w-full top-0 smooth`}>
                                                                    {months.map((item) => (
                                                                        <div onClick={() => {
                                                                            !month.includes(item.toUpperCase()) ? addItem(item.toUpperCase(), month, setMonth) : removeItem(item.toUpperCase(), month, setMonth)
                                                                        }} className={`${!month.includes(item.month) ? "" : "bg-blue-500 text-white"} hover:bg-blue-500 hover:text-white smooth border-b-[1px] border-b-[#00000080] cursor-pointer text-black px-[3px] flex items-center justify-between`} key={months.indexOf(item)}>
                                                                            <span className="xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px]">{`${item}`}</span>
                                                                            <div className={`${month.includes(item.toUpperCase()) ? "block" : "hidden"} w-[6px] h-[6px] rounded-[50%] bg-red-500`}></div>
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
                                                            <td>{item.agencyShort}</td>
                                                            <td>{item.month.toUpperCase()}</td>
                                                            <td>{item.client}</td>
                                                            <td>{item.brand}</td>
                                                            <td>{item.campaign}</td>
                                                            <td>{item.material}</td>
                                                            <td>{item.duration}</td>
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
                                                    <td colSpan="3"></td>
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

