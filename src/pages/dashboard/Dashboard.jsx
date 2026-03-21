import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import Totals from "./components/Totals";
import { useMpoStore } from "../../store/mpoStore";
import balanceHiddenIcon from "../../assets/images/balanceIcons/balanceHidden.svg";
import balanceVisibleIcon from "../../assets/images/balanceIcons/balanceVisible.svg";
import Loader2 from "../../components/loading2/Loader2";
import "./Dashboard.css"
import AgenciesChart from "./components/charts/agenciesPieChart/AgenciesChart";
import { formatRate } from "../../components/functions/Functions";
import QuarterChart from "./components/charts/QuarterChart.jsx/QuarterChart";


const Dashboard = () => {   
    const mpos = useMpoStore((state) => state.mpoData);
    const [balanceVisible, setBalanceVisible] = useState(true);

    const setbalanceVisibility = () => {
        setBalanceVisible(!balanceVisible);
    }

    // Line total for each mpo
    mpos.forEach((mpo) => {
        mpo.lineTotal = mpo.rate * mpo.spots
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

    // Gross amount for all mpos
    const grossTotal = mpos.reduce((sum, obj) => sum + obj.lineTotal, 0);

    // Net total for all mpos
    const netTotal = mpos.reduce((sum, obj) => sum + obj.netTotal, 0);

    // Sum of all mpos
    const uniqueMpos = Array.from(
    new Map(mpos.map((item) => [item.mpoNumber, item])).values()
  );
    const totalMpos = uniqueMpos.length;

    // Sum of all spots
    const totalSpots = mpos.reduce((sum, obj) => sum + obj.spots, 0);
    
    const uniqueMpoYears = Array.from(
        new Map(mpos.map((item) => [item.year, item])).values()
    );

    if (mpos.length < 1) {
        return <>
            <div className="w-full h-full bg-black flex flex-col gap-[10px]">
                <Loader2 />
            </div>
        </>
    }

    return <>
        <div className="hideScroll overflow-scroll w-full h-[100%] bg-black flex flex-col gap-[10px]">
            <div className="w-full h-[45px] bg-[#001026] rounded-[10px] flex justify-between items-center px-[20px]">
                <div className="text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[10px] flex gap-x-[10px]">
                    <span>{balanceVisible ? "Hide Totals" : "Show Totals"}</span>
                    <img
                    className="mt-[2px] cursor-pointer"
                    onClick={() => {setbalanceVisibility()}} 
                    src={balanceVisible ? balanceVisibleIcon : balanceHiddenIcon} alt="" />
                </div>
                <div></div>
            </div>

            {/* Figures for large screen */}
            <div className="w-full bg-black xl:flex lg:flex hidden xl:flex-row lg:flex-row flex-col justify-between gap-[10px]">
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className="w-full h-full bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Gross Total" value={`₦${formatRate(grossTotal)}`}/>
                    </div>
                    <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Net Total" value={`₦${formatRate(netTotal)}`}/>
                    </div>
                </div>
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className="w-full h-full bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Total MPOs" value={totalMpos.toLocaleString('en-US')}/>
                    </div>
                    <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Total Spots" value={totalSpots.toLocaleString('en-US')}/>
                    </div>
                </div>
            </div>

            {/* Figures for smaller screen */}
            <div className="w-full bg-black xl:hidden lg:hidden flex xl:flex-row lg:flex-row flex-col justify-between gap-[10px]">
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className="w-full h-full bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Gross Total" value={`₦${formatRate(grossTotal)}`}/>
                    </div>
                    <div className="w-full h-full bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Total MPOs" value={totalMpos.toLocaleString('en-US')}/>
                    </div>
                </div>
                <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] flex flex-row gap-[10px]">
                    <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Net Total" value={`₦${formatRate(netTotal)}`}/>
                    </div>
                    <div className="w-full xl:h-[110px] lg:h-[110px] md:h-[85px] h-[80px] bg-[#001026] rounded-[10px] flex flex-col justify-center px-[20px]">
                        <Totals balanceVisible={balanceVisible} title="Total Spots" value={totalSpots.toLocaleString('en-US')}/>
                    </div>
                </div>
            </div>

            {/* Charts main container */}
            <div className="w-full h-full flex box-border chartsContainer">
                <div className="w-full h-full flex flex-col gap-[10px]">
                    <div className="w-full h-full flex xl:flex-row lg:flex-row flex-col gap-[10px]">
                        <div className="xl:w-[50%] lg:w-[50%] xl:h-full lg:h-full h-[500px] bg-[#001026] rounded-[10px] p-[20px]">
                            <AgenciesChart />
                        </div>
                        <div className="xl:w-[50%] lg:w-[50%] xl:h-full lg:h-full h-[500px] bg-[#001026] rounded-[10px] p-[20px]">
                            <QuarterChart />
                        </div>
                    </div>
                    <div className="w-full h-full flex xl:flex-row lg:flex-row flex-col gap-[10px]">
                        <div className="xl:w-[50%] lg:w-[50%] xl:h-full lg:h-full h-[500px] bg-[#001026] rounded-[10px] p-[20px]">
                            <AgenciesChart />
                        </div>
                        <div className="xl:w-[50%] lg:w-[50%] xl:h-full lg:h-full h-[500px] bg-[#001026] rounded-[10px] p-[20px]">
                            <AgenciesChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;