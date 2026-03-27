import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMpoStore } from '../../../../../store/mpoStore';
import { formatRate } from '../../../../../components/functions/Functions';
import Select from '../../../../../components/Select';
import { useState } from 'react';

// #endregion
const QuarterChart = () => {
  const mpos = useMpoStore((state) => state.mpoData);
  mpos.forEach((mpo) => {
    mpo.month = mpo.month.toUpperCase()
  })

  const uniqueYears = Array.from(
    new Map(mpos.map((mpo) => [mpo.year, mpo])).values()
  );

  const uniqueAgency = Array.from(
    new Map(mpos.map((mpo) => [mpo.agency, mpo])).values()
  );

  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedAgency, setSelectedAgency] = useState("All Agencies")

  let filteredMpoYears = selectedYear === "All Years" ? mpos : mpos.filter((mpo) => mpo.year === Number(selectedYear))
    const filteredMpoAgency = selectedAgency === "All Agencies" ? filteredMpoYears : filteredMpoYears.filter((mpo) => mpo.agency === selectedAgency.toUpperCase());

  function groupByQuarter(data) {
  // Define month to quarter mapping
  const monthToQuarter = {
    'JANUARY': 1, 'FEBRUARY': 1, 'MARCH': 1,
    'APRIL': 2, 'MAY': 2, 'JUNE': 2,
    'JULY': 3, 'AUGUST': 3, 'SEPTEMBER': 3,
    'OCTOBER': 4, 'NOVEMBER': 4, 'DECEMBER': 4
  };
  
  // Define quarter names
  const quarterNames = {
    1: 'Quarter 1',
    2: 'Quarter 2',
    3: 'Quarter 3',
    4: 'Quarter 4'
  };
  
  // Create an object to store sums by quarter
  const quartersMap = {};
  
  // Iterate through each item in the original array
  data.forEach(item => {
    // Check if month exists and is valid
    if (!item.month) {
      console.warn('Item missing month property:', item);
      return;
    }
    
    const quarterNumber = monthToQuarter[item.month];
    
    // Check if month is valid
    if (!quarterNumber) {
      console.warn(`Unknown month: ${item.month}`);
      return;
    }
    
    const quarterName = quarterNames[quarterNumber];
    
    if (!quartersMap[quarterName]) {
      // Initialize the quarter if it doesn't exist
      quartersMap[quarterName] = {
        quarter: quarterName,
        lineTotal: 0,
        netTotal: 0
      };
    }
    
    // Add the totals to the quarter (handle missing values)
    quartersMap[quarterName].lineTotal += item.lineTotal || 0;
    quartersMap[quarterName].netTotal += item.netTotal || 0;
  });
  
  // Convert the map to an array and sort safely
  const result = Object.values(quartersMap).sort((a, b) => {
    // Safely extract quarter numbers
    const quarterNumA = a.quarter ? parseInt(a.quarter.split(' ')[1]) : 0;
    const quarterNumB = b.quarter ? parseInt(b.quarter.split(' ')[1]) : 0;
    return quarterNumA - quarterNumB;
  });
  
  return result;
}

  const result = groupByQuarter(filteredMpoAgency)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-[8px] font-medium custom-tooltip bg-[rgba(167,214,252,0.90)] px-[20px] py-[50px]">
          <p className="xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[12px] intro">
            QUARTER: {label}
          </p>
          <p className="label xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[12px]">
            GROSS: {`${formatRate(payload[0].value)}`}
          </p>
          <p className="label xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[12px]">
            NET: {`${formatRate(payload[1].value)}`}
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
              <span className="!m-0  text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[10px] font-medium animate__animated animate__fadeIn">INCOME PER QUARTER</span>
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
            result.length < 1 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white border-dashed border-1 p-5">No matching data found</span>
                        </div>
                    ) : (
                      <BarChart
            style={{ width: '100%', maxHeight: '100%', aspectRatio: 2 }}
            responsive
            data={result}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke={`#ffffff`} opacity={"20%"} />
            <XAxis dataKey="quarter" fontSize="12px"/>
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="lineTotal" fill="#008CFF" activeBar={{ fill: 'orangered', stroke: 'orangered'}} radius={[10, 10, 0, 0]} />
            <Bar dataKey="netTotal" fill="#8dcbff" activeBar={{ fill: '#004680', stroke: '#004680'}} radius={[10, 10, 0, 0]} />
          </BarChart>
                    )
          }
          
        </div>
          
      </div>
    </>
  );
};

export default QuarterChart;