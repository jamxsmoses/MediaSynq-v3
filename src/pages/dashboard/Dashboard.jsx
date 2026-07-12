import { useState } from "react";
import Totals from "./components/Totals";
import { useMpoStore } from "../../store/mpoStore";
import balanceHiddenIcon from "../../assets/images/balanceIcons/balanceHidden.svg";
import balanceVisibleIcon from "../../assets/images/balanceIcons/balanceVisible.svg";
import Loader2 from "../../components/loading2/Loader2";
import "./Dashboard.css"
import AgenciesChart from "./components/charts/agenciesPieChart/AgenciesChart";
import { formatRate } from "../../components/functions/Functions";
import QuarterChart from "./components/charts/QuarterChart/QuarterChart";
import YearChart from "./components/charts/yearlyChart/YearChart";
import MonthChart from "./components/charts/monthChart/MonthChart";
import Select from "../../components/Select";
import { uniqueYear, uniqueMonths, uniqueAgencies } from "../../components/functions/Functions";
import { useThemeStore } from "../../store/themeStore";

const Dashboard = () => {   
    const mpos = useMpoStore((state) => state.mpoData);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [selectedMonth, setSelectedMonth] = useState("All Months")
    const [selectedAgencies, setSelectedAgencies] = useState("All Agencies")
    const theme = useThemeStore((state) => state.theme);

    const setbalanceVisibility = () => {
        setBalanceVisible(!balanceVisible);
    }

    // Line total for each mpo
    mpos.forEach((mpo) => {
        mpo.lineTotal = mpo.rate * mpo.spots
        mpo.month = mpo.month.toUpperCase()
        mpo.agency = mpo.agency.toUpperCase()
    })

    // Net total for each mpo
    mpos.forEach((mpo) => {
        const vdAmount = (mpo.volumeDiscount / 100) * mpo.lineTotal;
        const rem1 = mpo.lineTotal - vdAmount;
        const acAmount = (mpo.agencyCommission / 100) * rem1;
        const rem2 = rem1 - acAmount;
        const vatAmount = (mpo.vat / 100) * rem2;
        mpo.netTotal = Math.round((rem2 + vatAmount) * 100) / 100;
    });

    const filteredMpoYears = selectedYear === "All Years" ? mpos : mpos.filter((mpo) => mpo.year === Number(selectedYear))
    const filteredMpoMonths = selectedMonth === "All Months" ? filteredMpoYears : filteredMpoYears.filter((mpo) => mpo.month === selectedMonth.toUpperCase())
    const filteredMpoAgencies = selectedAgencies === "All Agencies" ? filteredMpoMonths : filteredMpoMonths.filter((mpo) => mpo.agency === selectedAgencies.toUpperCase())
 
    // Gross amount for all mpos
    const grossTotal = filteredMpoAgencies.reduce((sum, obj) => sum + obj.lineTotal, 0);

    // Net total for all mpos
    const netTotal = filteredMpoAgencies.reduce((sum, obj) => sum + obj.netTotal, 0);

    // Sum of all mpos
    const uniqueMpos = Array.from(
    new Map(filteredMpoAgencies.map((item) => [item.mpoNumber, item])).values()
  );
    const totalMpos = uniqueMpos.length;

    // Sum of all spots
    const totalSpots = filteredMpoAgencies.reduce((sum, obj) => sum + obj.spots, 0);

    const months = [
    {id: 1, month: "JANUARY"},
    {id: 2, month: "FEBRUARY"},
    {id: 3, month: "MARCH"},
    {id: 4, month: "APRIL"},
    {id: 5, month: "MAY"},
    {id: 6, month: "JUNE"},
    {id: 7, month: "JULY"},
    {id: 8, month: "AUGUST"},
    {id: 9, month: "SEPTEMBER"},
    {id: 10, month: "OCTOBER"},
    {id: 11, month: "NOVEMBER"},
    {id: 12, month: "DECEMBER"},
  ]
    
    const uniqueYears = uniqueYear(mpos);
    const uniqueMonth = uniqueMonths(mpos);
    const uniqueAgency = uniqueAgencies(mpos);

    uniqueAgency.forEach((mpo) => {
        if (mpo.agency === "MEDIA PERSPECTIVES") {
            mpo.agencyShort = "MP"
        }

        if (mpo.agency === "PHD MEDIA") {
            mpo.agencyShort = "PHD"
        }

        if (mpo.agency === "SIMPLY BLACK") {
            mpo.agencyShort = "SYMPLY B"
        }

        if (mpo.agency === "MAXIMEDIA GLOBAL LIMITED") {
            mpo.agencyShort = "MAXIMEDIA"
        }

        if (mpo.agency === "GLORYCAP LIMITED") {
            mpo.agencyShort = "GLORYCAP"
        }

        if (mpo.agency === "TOLARAM LIMITED") {
            mpo.agencyShort = "TOLARAM"
        }

        if (mpo.agency === "SUMMIT CREST MEDIA CONSULTING") {
            mpo.agencyShort = "SUMMIT C."
        }

        if (mpo.agency === "OTB MEDIA CONCEPT LIMITED") {
            mpo.agencyShort = "OTB MEDIA"
        }

        if (mpo.agency === "PROSPECTS MEDIA & COMMUNICATIONS") {
            mpo.agencyShort = "PROSPECTS M&C"
        }
    })

    uniqueMonth.forEach((mpo) => {
    for (let i = 0; i < months.length; i++) {
        if (mpo.month === months[i].month) {
            mpo.id2 = months[i].id; 
        }  
    }
  })
  
  const sortedMonths = uniqueMonth.sort((a, b) => {
    return a.id2 - b.id2
  })
   

    if (mpos.length < 1) {
        return <>
            <div className="w-full h-full bg-black flex flex-col gap-[10px]">
                <Loader2 />
            </div>
        </>
    }

    return <>
        <div className={`${theme === 'light' ? "bg-gray-200" : 'bg-black'} smooth hideScroll dashboard overflow-scroll w-full h-[100%] bg-black flex flex-col gap-[10px]`}>
            <div className={`w-full h-[45px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex justify-between items-center px-[20px] xl:py-[5px] lg:py-[5px] py-[8px]`}>
                <div className="text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[10px] flex gap-x-[10px]">
                    <span>{balanceVisible ? "Hide Totals" : "Show Totals"}</span>
                    <img
                    className="xl:mt-[1px] lg:mt-[1px] xl:w-[18px] lg:xl:w-[17px] md:xl:w-[16px] sm:xl:w-[15px] w-[14px] cursor-pointer"
                    onClick={() => {setbalanceVisibility()}} 
                    src={balanceVisible ? balanceVisibleIcon : balanceHiddenIcon} alt="" />
                </div>
                <div className="flex items-center gap-x-[10px]">
                    <Select value={selectedYear} onChange={setSelectedYear}>
                        <option value="All Years">All Years</option>
                        {
                            uniqueYears.map((item) => (
                                <option key={item.id} value={item.year}>{item.year}</option>
                            ))
                        }
                    </Select>
                    <Select value={selectedMonth} onChange={setSelectedMonth}>
                        <option value="All Months">All Months</option>
                        {
                            sortedMonths.map((item) => (
                                <option key={item.id} value={item.month}>{item.month}</option>
                            ))
                        }
                    </Select>
                    <Select value={selectedAgencies} onChange={setSelectedAgencies}>
                        <option value="All Agencies">All Agencies</option>
                        {
                            uniqueAgency.map((item) => (
                                <option key={item.id} value={item.agency}>{item.agencyShort}</option>
                            ))
                        }
                    </Select>
                </div>
            </div>

            {/* Figures for large screen */}
            <div className="w-full xl:flex lg:flex hidden xl:flex-row lg:flex-row flex-col justify-between gap-[10px]">
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className={`w-full h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Gross Total" value={`₦${formatRate(grossTotal)}`}/>
                    </div>
                    <div className={`w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Net Total" value={`₦${formatRate(netTotal)}`}/>
                    </div>
                </div>
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className={`w-full h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Total MPOs" value={totalMpos.toLocaleString('en-US')}/>
                    </div>
                    <div className={`w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Total Spots" value={totalSpots.toLocaleString('en-US')}/>
                    </div>
                </div>
            </div>

            {/* Figures for smaller screen */}
            <div className="w-full xl:hidden lg:hidden flex xl:flex-row lg:flex-row flex-col justify-between gap-[10px]">
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className={`xl:w-full lg:w-full md:w-full sm:w-full w-[60%] h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Gross Total" value={`₦${formatRate(grossTotal)}`}/>
                    </div>
                    <div className={`w-full h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Total MPOs" value={totalMpos.toLocaleString('en-US')}/>
                    </div>
                </div>
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className={`xl:w-full lg:w-full md:w-full sm:w-full w-[60%] xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Net Total" value={`₦${formatRate(netTotal)}`}/>
                    </div>
                    <div className={`w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex flex-col justify-center px-[20px]`}>
                        <Totals balanceVisible={balanceVisible} title="Total Spots" value={totalSpots.toLocaleString('en-US')}/>
                    </div>
                </div>
            </div>

            {/* Charts main container */}
            <div className="w-full h-full flex box-border chartsContainer">
                <div className="w-full h-full flex flex-col gap-[10px]">
                    <div className="w-full h-full flex xl:flex-row lg:flex-row flex-col gap-[10px]">
                        <div className={`chartsCon xl:w-[50%] lg:w-[50%] w-full xl:h-full lg:h-[550px] sm:h-[650px] h-[450px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                            <YearChart />
                        </div>
                        <div className={`chartsCon xl:w-[50%] lg:w-[50%] w-full xl:h-full lg:h-full md:h-[800px] h-[500px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                            <MonthChart />
                        </div>
                    </div>
                    <div className="w-full h-full flex xl:flex-row flex-col gap-[10px]">
                        <div className={`chartsCon xl:w-[50%] w-full xl:h-full lg:h-[400px] md:h-full h-[750px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                            <AgenciesChart />
                        </div>
                        <div className={`chartsCon xl:w-[50%] w-full h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                            <QuarterChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;