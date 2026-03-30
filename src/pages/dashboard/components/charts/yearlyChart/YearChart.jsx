import { useMpoStore } from "../../../../../store/mpoStore"
import { ComposedChart, Line, Bar, XAxis, Area, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState } from "react";
import Select from "../../../../../components/Select";
import { formatRate } from "../../../../../components/functions/Functions";

const YearChart = () => {
    const mpos = useMpoStore((state) => state.mpoData)
    const [selectedAgency, setSelectedAgency] = useState("All Agencies")

    const sortedAgencies = selectedAgency === "All Agencies" ? mpos : mpos.filter((mpo) => mpo.agency === selectedAgency)

    const uniqueAgency = Array.from(
    new Map(mpos.map((mpo) => [mpo.agency, mpo])).values()
    );

    let mergedByYear = [];
    mergedByYear = sortedAgencies.reduce((acc, curr) => {
        const existing = acc.find(item => item.year === curr.year);
        
        if (existing) {
            existing.lineTotal += curr.lineTotal;
            existing.netTotal += curr.netTotal;
        } else {
            acc.push({
            year: curr.year,
            lineTotal: curr.lineTotal,
            netTotal: curr.netTotal
            });
        }
        
        return acc;
    }, []);

    mergedByYear.sort((a, b) => {
        return a.year - b.year
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

    return (
    <>
      <div className='w-full h-full flex flex-col gap-[60px]'>
        <div className='w-full h-[5%] flex items-start'>
            <div className='xl:w-[40%] lg:w-[40%] md:w-[40%] w-[50%] leading-[0.8]'>
              <span className="!m-0  text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[9px] font-medium animate__animated animate__fadeIn">INCOME PER YEAR</span>
            </div>
            <div className="filtersContainer w-full flex flex-row items-center justify-end gap-[10px]">
              <Select value={selectedAgency} onChange={setSelectedAgency}>
                <option value="All Agencies">All Agencies</option>
                {
                  uniqueAgency.map((mpo) => (
                    <option key={uniqueAgency.indexOf(mpo)} value={mpo.agency}>
                      {mpo.agency}
                    </option>
                  ))
                }
              </Select>
            </div>
        </div>
        <div className='w-full h-9/10'>
          {
            mergedByYear.length < 1 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white border-dashed border-1 p-5">No matching data found</span>
                        </div>
                    ) : (
                      <ComposedChart
                        style={{ width: '100%', maxHeight: '100%', aspectRatio: 1.7 }}
                        responsive
                        data={mergedByYear}
                        margin={{
                            top: 20,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" stroke={`#ffffff`} opacity={"20%"} />
                        <XAxis dataKey="year" fontSize='11px' scale="band" />
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

export default YearChart