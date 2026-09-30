import { useThemeStore } from "../../store/themeStore";
import "./Invoice.css";
import { useUsersStore } from "../../store/usersStore";
import { useMpoStore } from "../../store/mpoStore";
import Folder from "../../components/folderIcon/Folder";
import FileIcon from "../../components/FileIcon/FileIcon";
import { useState } from "react";
import { Routes, Route } from "react-router";
import MpInvoice from "./invoiceFiles/MpInvoice";
import PhdInvoice from "./invoiceFiles/PhdInvoice";
import OtherInvoices from "./invoiceFiles/OtherInvoices";
import DirectionIcon from "../../components/directionIcon/DirectionIcon"


const Invoice = () => {
    const theme = useThemeStore((state) => state.theme);
    const mpos = useMpoStore((state) => state.mpoData);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedAgency, setSelectedAgency] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState("");
    const [yearIsOpen, setYearIsOpen] = useState(true);
    const [agencyIsOpen, setAgencyIsOpen] = useState(false);
    const [monthIsOpen, setMonthIsOpen] = useState(false);
    const [invoiceIsOpen, setInvoiceIsOpen] = useState(false);
    const [invNum, setInvNum] = useState("")

    mpos.forEach((mpo) => {
        mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");``
        mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
        mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
    });

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

    const uniqueYears = Array.from(
        new Map(mpos.map((item) => [item.year, item])).values()
    );

    const filteredYears = selectedYear === "" ? [] : mpos.filter((item) => item.year === Number(selectedYear));

    const uniqueAgency = Array.from(
        new Map(filteredYears.map((item) => [item.agency, item])).values()
    );

    const filteredAgency = selectedAgency === "" ? [] : filteredYears.filter((item) => item.agency.toUpperCase() === selectedAgency);

    const uniqueMonth = Array.from(
        new Map(filteredAgency.map((item) => [item.month, item])).values()
    );

    const filteredMonth = selectedMonth === "" ? [] : filteredAgency.filter((item) => item.month.toUpperCase() === selectedMonth.toUpperCase());
    
    
    const sortedMonths = uniqueMonth.sort((a,b) => {
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
            return monthA - monthB; // Higher month number (December) first
        }
    })
    
    const uniqueMpos = Array.from(
        new Map(filteredMonth.map((item) => [item.mpoNumber, item])).values()
    );

    uniqueMpos.forEach((item) => {
        if (item.month.toUpperCase() === "MAY") {
            item.invNumText = "MY"
        } else if (item.month.toUpperCase() === "JULY") {
            item.invNumText = "JL"
        } else {
            item.invNumText = `${item.month[0].toUpperCase()}${item.month[1].toUpperCase()}`
        }
    })

    const filteredInvoices = selectedInvoice === "" ? [] : filteredMonth.filter((item) => item.mpoNum === selectedInvoice);

    filteredInvoices.forEach((mpo) => {
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

    const [collapsed, setCollapse] = useState(false);

    return <div className={`w-full h-full rounded-[10px] overflow-hidden ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} text-white smooth flex xl:flex-row lg:flex-row flex-col items-center`}>
        {/* Filter Div */}
        <div className={`h-full xl:block lg:block hidden ${collapsed ? "w-[0px]" : "xl:w-1/4 lg:w-1/4 w-full"} ${collapsed ? "" : "p-[10px]"} overflow-hidden smooth ${theme === "light" ? "bg-[#001838]" : "bg-[#001838]"}`}>
            {/* Year Filter Div */}
            <div className="w-full">
                <div onClick={() => {
                    setYearIsOpen(!yearIsOpen);
                    setAgencyIsOpen(false);
                    setMonthIsOpen(false);
                    setInvoiceIsOpen(false);
                }}
                    className={`cursor-pointer bg-[#000000] hover:bg-[#111111] smooth py-[5px] flex items-center justify-between px-[10px] rounded-lg`}>
                    <span className="xl:text-[11px] lg:text-[10px] text-[9px] pt-[2px]">YEARS</span>
                    <span className={`${!yearIsOpen ? "rotate-[0deg]" : "rotate-[90deg]"} xl:text-[11px] lg:text-[10px] text-[9px]`}>{'>'}</span>
                </div>
                <div className={`flex items-center justify-start w-full my-[10px] ${!yearIsOpen ? "!h-[0px]" : ""} overflow-auto`}>
                    {uniqueYears.length < 1 ? <span className="pl-[20px] xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]">LOADING MPOs...</span> : (
                        uniqueYears.map((item) => (
                            <div onClick={() => {
                                setSelectedYear(Number(item.year));
                                setYearIsOpen(false);
                                setAgencyIsOpen(true);
                            }} key={item.id}>
                                <Folder agency={item.year} filteredInvoices={filteredInvoices}/>
                            </div>
                        ))
                    )
                    }
                </div>
            </div>
            

            {/* Agency Filter Div */}
            <div>
                <div onClick={() => {
                    setAgencyIsOpen(!agencyIsOpen);
                    setYearIsOpen(false);
                    setMonthIsOpen(false);
                    setInvoiceIsOpen(false);
                    if (agencyIsOpen ) {
                        setYearIsOpen(true)
                    }
                }}
                    className={`cursor-pointer bg-[#000000] hover:bg-[#111111] smooth py-[5px] flex items-center justify-between px-[10px] rounded-lg`}>
                    <span className="xl:text-[11px] lg:text-[10px] text-[9px] pt-[2px]">AGENCIES</span>
                    <span className={`${!agencyIsOpen ? "rotate-[0deg]" : "rotate-[90deg]"} xl:text-[11px] lg:text-[10px] text-[9px]`}>{'>'}</span>
                </div>
                <div className={`flex my-[10px] ${!agencyIsOpen ? "!h-[0px]" : ""} flex-wrap overflow-hidden`}>
                    {selectedYear === "" ? <span className="pl-[20px] xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]">SELECT YEAR</span> : (
                        uniqueAgency.map((item) => (
                        <div onClick={() => {
                            setSelectedAgency(item.agency.toUpperCase());
                            setAgencyIsOpen(false);
                            setMonthIsOpen(true);
                         }} key={item.id}>
                            <Folder agency={item.agencyShort}/>
                        </div>
                    ))
                    )}
                </div>
            </div>

            {/* Month Filter Div */}
            <div>
                <div onClick={() => {
                    setMonthIsOpen(!monthIsOpen);
                    setYearIsOpen(false);
                    setAgencyIsOpen(false);
                    setInvoiceIsOpen(false)
                    if (monthIsOpen ) {
                        setAgencyIsOpen(true)
                    }
                }}
                    className={`cursor-pointer bg-[#000000] hover:bg-[#111111] smooth py-[5px] flex items-center justify-between px-[10px] rounded-lg`}>
                    <span className="xl:text-[11px] lg:text-[10px] text-[9px] pt-[2px]">MONTHS</span>
                    <span className={`${!monthIsOpen ? "rotate-[0deg]" : "rotate-[90deg]"} xl:text-[11px] lg:text-[10px] text-[9px]`}>{'>'}</span>
                </div>   
                <div className={`flex my-[10px] ${!monthIsOpen ? "!h-[0px]" : ""} flex-wrap overflow-hidden`}>
                    {selectedAgency === "" ? <span className="pl-[20px] xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]">SELECT AGENCY</span> : (
                        sortedMonths.map((item) => (
                        <div onClick={() => {
                            setSelectedMonth(item.month.toUpperCase());
                            setMonthIsOpen(false);
                            setInvoiceIsOpen(true);
                         }} key={item.id}>
                            <Folder agency={item.month.toUpperCase()}/>
                        </div>
                    ))
                    )}
                </div>
            </div>

            {/* Invoices Filter Div */}
            <div>
                <div onClick={() => {
                    setInvoiceIsOpen(!invoiceIsOpen);
                    setYearIsOpen(false);
                    setAgencyIsOpen(false);
                    setMonthIsOpen(false)
                    if (invoiceIsOpen ) {
                        setMonthIsOpen(true)
                    }
                }}
                    className={`cursor-pointer bg-[#000000] hover:bg-[#111111] smooth py-[5px] flex items-center justify-between px-[10px] rounded-lg`}>
                    <span className="xl:text-[11px] lg:text-[10px] text-[9px] pt-[2px]">INVOICES</span>
                    <span className={`${!invoiceIsOpen ? "rotate-[0deg]" : "rotate-[90deg]"} xl:text-[11px] lg:text-[10px] text-[9px]`}>{'>'}</span>
                </div>   
                <div className={`flex w-full h-[700px] custom-scroll-container hideScroll-X-axis overflow-x-auto my-[10px] ${!invoiceIsOpen ? "!h-[0px]" : ""} flex-wrap overflow-hidden`}>
                    {selectedMonth === "" ? <span className="pl-[20px] xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]">SELECT MONTH</span> : (
                        uniqueMpos.map((item) => (
                        <div onClick={() => {
                            setSelectedInvoice(item.mpoNum);
                            if (uniqueMpos.indexOf(item)+ 1 < 10) {
                                setInvNum(`0${uniqueMpos.indexOf(item) + 1}`)
                            } else {
                                setInvNum(`${uniqueMpos.indexOf(item) + 1}`)
                            }
                         }} key={item.id}>
                            <FileIcon agency={`INVOICE - (${item.brand} ${item.mpoNumber}) AG${item.invNumText}${(item.year.toString())[2]}${(item.year.toString())[3]}/${uniqueMpos.indexOf(item) + 1 < 10 ? `0${uniqueMpos.indexOf(item) + 1}` : `${uniqueMpos.indexOf(item) + 1}`}`}/>
                        </div>
                    ))
                    )}
                </div>
            </div>
        </div>
        
        {/* Invoice Div */}
        <div className={`h-full ${collapsed ? "w-full" : "xl:w-3/4 lg:w-3/4 w-full"} p-[10px] `}>
            {/* Controls Div */}
                        <div className="w-full h-[5%] flex items-center mx-auto">
                            
                            <div onClick={() => {
                                if (collapsed) {
                                    setCollapse(false)
                                } else {
                                    setCollapse(true)
                                }
                            }} className={`w-[30px] h-[30px] rounded-[50%] bg-blue-500 cursor-pointer flex items-center justify-center pb-[2px] font-bold ${theme === "light" ? "text-[#0d2547]" : "text-[#001026]"}`}>{`${collapsed ? ">" : "<"}`}</div>
                        </div>
            {
                filteredInvoices.length < 1 ? (
                    <div className="w-full h-full flex items-center justify-center">Select MPO to View Invoice</div>
                ) :  (
                    <div className="w-full h-full custom-scroll-container">
                        <div className="w-full h-[95%]">
                            <Routes>
                                <Route path="/" element={<MpInvoice filteredInvoices={filteredInvoices} invNum={invNum}/>}/>
                            </Routes>
                        </div>
                    </div>
                )
            }
            
        </div>
    </div>
}

export default Invoice;