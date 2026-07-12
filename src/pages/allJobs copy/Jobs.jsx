import { useMpoStore } from "../../store/mpoStore";
import { useNavigate } from "react-router";
import { useState } from "react";
import Loader2 from "../../components/loading2/Loader2";
import { uniqueYear, uniqueAgencies, uniqueMonths, formatRate } from "../../components/functions/Functions";
import "./Jobs.css"

import { useThemeStore } from "../../store/themeStore";

const Jobs = () => {
    const allMpos = useMpoStore((state) => state.mpoData);
    const theme = useThemeStore((state) => state.theme);

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

    const uniqueYears = uniqueYear(allMpos);
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

    const sortedMonths = uniqueMonth.sort((a, b) => {
        return a.id2 - b.id2
    })

    const [mpoSearch, setMpoSearch] = useState("");
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const activeAgency = uniqueAgency[0].agency;
    const [selectedAgency, setSelectedAgency] = useState(activeAgency);
    const [selectedMonth, setSelectedMonth] = useState("MONTH");
    const [selectedClient, setSelectedClient] = useState("CLIENT");
    const [selectedBrand, setSelectedBrand] = useState("BRAND");
    const [selectedSpecification, setSelectedSpecification] = useState("SPECIFICATION");
    const [isFiltered, setIsFiltered] = useState(false);

    console.log(activeAgency)

    allMpos.forEach((mpo) => {
    mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");
    mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
    mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
  });

  const navigate = useNavigate();

//   const clearFilters = () => {
//     setMpoSearch("");
//     setSelectedYear("");
//     setSelectedAgency("Agency");
//     setSelectedMonth("Month");
//     setSelectedClient("Client");
//     setSelectedBrand("Brand");
//     setSelectedSpecification("Specification");
//   };

  

   if (
    selectedYear === "All Years" &&
    selectedAgency === "Agency" &&
    selectedMonth === "Month" &&
    selectedClient === "Client" &&
    selectedBrand === "Brand" &&
    selectedSpecification === "Specification"
  ) {
    setIsFiltered(false);
  }

  const handleSearch = () => {

  }

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
    })

    const filteredYears = selectedYear === "YEAR" ? sortedMpos : allMpos.filter((mpo) => mpo.year === Number(selectedYear));
    const filteredAgency = selectedAgency === "AGENCY" ? filteredYears : filteredYears.filter((mpo) => mpo.agency === selectedAgency);
    

    // console.log(uniqueAgency[0].agency);

    return <>
    {
        filteredAgency.length < 1 ? (
            <Loader2 />
        ) : (
            <div className={`dashboard w-full h-[100%] ${theme === "light" ? "bg-gray-200" : "bg-black"} smooth flex flex-col gap-[10px]`}>
            <div className={`w-full h-[6%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] flex justify-between items-center px-[20px] xl:py-[5px] lg:py-[5px] py-[8px]`}>
                <input
                placeholder="Search MPO Number"
                type="text"
                className={`rounded-[10px] py-[3px] px-[10px] ${theme === "light" ? "bg-gray-200 border-[#001026] text-[#001026]" : "bg-black border-[#008CFF] text-[#008CFF]"} smooth border-[1px] outline-none uppercase
            xl:text-[10px] lg:text-[9px] md:text-[8px] sm:text-[7px] font-medium text-[6px]`}
              />
            </div>
            <div className={`w-full h-[94%] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
                <div className="w-full h-full flex justify-start items-start overflow-auto">
                    <table className="w-full border-none">
                    <thead className={`text-[#000000] xl:text-[11px] lg:text-[10px] md:text-[9px] text-[8px] font-bold ${theme === "light" ? "bg-gray-200 text-black" : "bg-black text-[#008CFF]"} smooth`}>
                    <tr>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>SN</td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>
                            <Select2 value={selectedYear} onChange={setSelectedYear}>
                                <option value="YEAR">YEAR</option>
                                {
                                uniqueYears.map((mpo) => (
                                    <option key={uniqueYears.indexOf(mpo)} value={mpo.year}>
                                    {mpo.year}
                                    </option>
                                ))
                                }
                            </Select2>
                        
                        </td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>
                            <Select2 value={selectedAgency} onChange={setSelectedAgency}>
                                <option value="AGENCY">AGENCY</option>
                                {
                                uniqueAgency.map((mpo) => (
                                    <option key={mpo.id} value={mpo.agency}>
                                    {mpo.agencyShort}
                                    </option>
                                ))
                                }
                            </Select2>
                        </td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>
                            <Select2 value={selectedMonth} onChange={setSelectedMonth}>
                                <option value="All Months">MONTH</option>
                                {
                                sortedMonths.map((mpo) => (
                                    <option key={sortedMonths.indexOf(mpo)} value={mpo.month}>
                                    {mpo.month}
                                    </option>
                                ))
                                }
                            </Select2>
                        </td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>MPO NO.</td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>
                        <Select2 value={selectedClient} onChange={setSelectedClient}>
                                <option value="All Clients">CLIENT</option>
                                {
                                sortedMonths.map((mpo) => (
                                    <option key={sortedMonths.indexOf(mpo)} value={mpo.agency}>
                                    {mpo.agencyShort}
                                    </option>
                                ))
                                }
                            </Select2>
                        </td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>BRAND</td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>CAMPAIGN</td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>MATERIAL</td>
                        <td className={`text-center border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>DURATION</td>
                        <td className={`border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>
                        <Select2
                            value={selectedSpecification}
                            onChange={setSelectedSpecification}
                        >
                            <option value="Specification">
                            SPECIFICATION
                            </option>
                            <option value="Gratis">
                            Gratis
                            </option>
                            <option value="Non-Gratis">
                            Non-Gratis
                            </option>
                        </Select2>
                        </td>
                        <td className={`text-center border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>SPOT</td>
                        <td className={`text-right border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>{`(₦) RATE`}</td>
                        <td className={`text-right border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>GROSS AMT</td>
                        <td className={`text-center border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>V.D</td>
                        <td className={`text-right border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>V.D AMT</td>
                        <td className={`text-center border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>A.C</td>
                        <td className={`text-right border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>A.C AMT</td>
                        <td className={`text-center border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>VAT</td>
                        <td className={`text-right border-r-1 ${theme === "light" ? "border-r-black" : "border-r-[#008CFF]"} smooth`}>VAT AMT</td>
                        <td className={`text-right`}>NET TOTAL</td>
                    </tr>
                    </thead>
                    <tbody className="text-[#ffffff] xl:text-[11px] lg:text-[10px] md:text-[9px] text-[8px]">
                        {filteredAgency.map((mpo) => (
                            <tr key={mpo.id} className={`${theme === "light" ? "hover:bg-gray-200" : "hover:bg-[#008CFF]"} smooth`}>
                                <td>{filteredAgency.indexOf(mpo)+1}</td>
                                <td>{mpo.year}</td>
                                <td>{mpo.agency}</td>
                                <td>{mpo.month}</td>
                                <td><div className="w-[230px] overflow-x-scroll hideScroll">{mpo.mpoNumber}</div></td>
                                <td>{mpo.client}</td>
                                <td>{mpo.brand}</td>
                                <td>{mpo.campaign}</td>
                                <td>{mpo.material}</td>
                                <td>{mpo.duration}</td>
                                <td>{mpo.specification}</td>
                                <td className="text-center">{mpo.spots}</td>
                                <td className="text-right">{formatRate(mpo.rate)}</td>
                                <td className="text-right">{formatRate(mpo.lineTotal)}</td>
                                <td className="text-center">{`${mpo.volumeDiscount}%`}</td>
                                <td className="text-right">{formatRate(mpo.vdAmount)}</td>
                                <td className="text-center">{`${mpo.agencyCommission}%`}</td>
                                <td className="text-right">{formatRate(mpo.acAmount)}</td>
                                <td className="text-center">{`${mpo.vat}%`}</td>
                                <td className="text-right">{formatRate(mpo.vatAmount)}</td>
                                <td className="text-right">{formatRate(mpo.netTotal)}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
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