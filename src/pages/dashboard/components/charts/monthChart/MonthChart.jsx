import { useMpoStore } from "../../../../../store/mpoStore"
import { ComposedChart, Line, Bar, XAxis, Area, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState } from "react";
import Select from "../../../../../components/Select";
import { formatRate } from "../../../../../components/functions/Functions";

const MonthChart = () => {
    const mpos = useMpoStore((state) => state.mpoData)
    const [selectedYear, setSelectedYear] = useState("All Years")

    mpos.forEach((mpo) => {
        mpo.month = mpo.month.toUpperCase();
        
    })

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

    const filteredYears = selectedYear === "All Years" ? mpos : mpos.filter((mpo) => mpo.year === Number(selectedYear))

    const uniqueYears = Array.from(
    new Map(mpos.map((mpo) => [mpo.year, mpo])).values()
    );

    let mergedByMonth = [];
    mergedByMonth = Object.values(
        filteredYears.reduce((acc, curr) => {
        if (!acc[curr.month]) {
        acc[curr.month] = {
            month: curr.month,
            lineTotal: 0,
            netTotal: 0
        };
        }
        acc[curr.month].lineTotal += curr.lineTotal;
        acc[curr.month].netTotal += curr.netTotal;
        return acc;
    }, {})
);

    console.log(mergedByMonth)

    
        for (let i = 0; i < mergedByMonth.length; i++) {
            mergedByMonth.forEach((mpo) => {
                for (let x = 0; x < months.length; x++) {
                    if (mpo.month === months[x].month) {
                        mpo.monthId = months[x].id
                        mpo.monthShort = `${months[x].month[0]}${months[x].month[1]}${months[x].month[2]}`
                    }
                }
            })
        }

    mergedByMonth.sort((a, b) => {
        return a.monthId - b.monthId
    })

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="rounded-[8px] font-medium custom-tooltip bg-[rgba(167,214,252,0.90)] px-[20px] py-[50px]">
              <p className="xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[12px] intro">
                <b>YEAR:</b> {label}
              </p>
              <p className="label xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[12px]">
                <b>GROSS:</b> {`${formatRate(payload[0].value)}`}
              </p>
              <p className="label xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[12px]">
                <b>NET:</b> {`${formatRate(payload[1].value)}`}
              </p>
            </div>
          );
        }
      };

      console.log(mergedByMonth)

    return (
    <>
      <div className='w-full h-full flex flex-col gap-[60px]'>
        <div className='w-full h-[5%] flex items-start'>
            <div className='xl:w-[40%] lg:w-[50%] md:w-[60%] w-[60%] leading-[0.8]'>
              <span className="!m-0  text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[10px] font-medium animate__animated animate__fadeIn">INCOME PER MONTH</span>
            </div>
            <div className="filtersContainer w-full flex flex-row items-center justify-end gap-[10px]">
              <Select value={selectedYear} onChange={setSelectedYear}>
                <option value="All Years">All Years</option>
                {
                  uniqueYears.map((mpo) => (
                    <option key={uniqueYears.indexOf(mpo)} value={mpo.year}>
                      {mpo.year}
                    </option>
                  ))
                }
              </Select>
            </div>
        </div>
        <div className='w-full h-9/10'>
          {
            mergedByMonth.length < 1 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white border-dashed border-1 p-5">No matching data found</span>
                        </div>
                    ) : (
                      <ComposedChart
                        style={{ width: '100%', maxHeight: '100%', aspectRatio: 1.7 }}
                        responsive
                        data={mergedByMonth}
                        margin={{
                            top: 20,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" stroke={`#ffffff`} opacity={"20%"} />
                        <XAxis dataKey="monthShort"  fontSize="11px" scale="band" />
                        <Area type="monotone" dataKey="lineTotal" fill="#59b4ff3b" stroke="#008CFF" />
                        <Tooltip content={CustomTooltip}/>
                        <Bar dataKey="netTotal" barSize={50} fill="#008CFF" />
                        {/* <Line type="monotone" dataKey="netTotal" stroke="#ff4800" /> */}
                        </ComposedChart>
                    )
          }
          
        </div>
          
      </div>
    </>
  );
}

export default MonthChart