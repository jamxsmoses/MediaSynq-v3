import { useMpoStore } from "../../../../../store/mpoStore";
import { useState } from 'react';
import "./AgenciesChart.css"
import Select from '../../../../../components/Select';
import { uniqueYear, uniqueMonths } from "../../../../../components/functions/Functions";

const colors = ['#0088FE', // Blue
    '#00C49F', // Green
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#8884D8', // Purple
    '#82CA9D', // Light Green
    '#FF6B6B', // Coral
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Sage
    '#F4D03F', // Gold
    '#E67E22'  // Pumpkin 
];

const AgenciesChart = () => {
    const mpos = useMpoStore((state) => state.mpoData);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState("All Months");

    mpos.forEach((mpo) => {
        mpo.agency = mpo.agency.toUpperCase()
    })

    const filteredMpoYears = selectedYear === "All Years" ? mpos : mpos.filter((mpo) => mpo.year === Number(selectedYear));
    const filteredMpoMonths = selectedMonth === "All Months" ? filteredMpoYears : filteredMpoYears.filter((mpo) => mpo.month === selectedMonth.toUpperCase());

    const aggregateByAgency = (data) => {
        // Create a map to store aggregated data for each agency
        const agencyMap = new Map();
    
        // Iterate through the main array
        data.forEach(item => {
            const { agency, lineTotal, netTotal } = item;
            
            if (agencyMap.has(agency)) {
            // Agency exists, update totals
            const existing = agencyMap.get(agency);
            existing.lineTotal += lineTotal;
            existing.netTotal += netTotal;
            } else {
            // New agency, create entry
            agencyMap.set(agency, {
                agency,
                lineTotal: lineTotal,
                netTotal: netTotal
            });
            }
        });
    
    // Convert map to array
    return Array.from(agencyMap.values());
    };

    const result0 = aggregateByAgency(filteredMpoMonths);

    const assignColorsByIndex = (objects, colors) => {
        return objects.map((obj, index) => ({
            ...obj,
            color: colors[index % colors.length] // Cycle through colors if more objects than colors
        }));
    };

    const result = assignColorsByIndex(result0, colors)
    
    result.forEach((mpo) => {
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

    const totalNet = result.reduce((sum, obj) => sum + obj.netTotal, 0);


    return <>
        <div className='w-full h-full flex gap-[10px] justify-between items-end'>
            <AgencyPieChart mpos={mpos} data={result} totalNet={totalNet} selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
        </div>
    </>
}

export default AgenciesChart;

const AgencyPieChart = ({ mpos, data, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [hoveredLegend, setHoveredLegend] = useState(null);

  const uniqueYears = uniqueYear(mpos);

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

  const uniqueMonth = uniqueMonths(mpos)

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
  
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.netTotal, 0);

  // Generate pie slices
  let currentAngle = 0;
  const slices = data.map((item, index) => {
    const percentage = (item.netTotal / total) * 100;
    const angle = (item.netTotal / total) * 360;
    
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    // Convert angles to radians and calculate coordinates
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const radius = 120;
    const centerX = 200;
    const centerY = 200;
    
    const startX = centerX + radius * Math.cos(startRad);
    const startY = centerY + radius * Math.sin(startRad);
    const endX = centerX + radius * Math.cos(endRad);
    const endY = centerY + radius * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = `
      M ${centerX} ${centerY}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;
    
    return {
      ...item,
      pathData,
      percentage,
      angle,
      startAngle,
      endAngle,
      index
    };
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format large numbers
  const formatLargeNumber = (value) => {
    if (value >= 1e9) {
      return `₦${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `₦${(value / 1e6).toFixed(2)}M`;
    }
    return formatCurrency(value);
  };

  const isHovered = (index) => {
    return hoveredSlice === index || hoveredLegend === index;
  };

  return (
    <>
        <div className='w-full h-full flex flex-col gap-[20px]'>
            <div className='w-full h-[5%] flex items-start'>
            <div className='xl:w-[40%] lg:w-[40%] md:w-[40%] w-[45%] leading-[0.8]'>
              <span className="text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[9px] font-medium animate__animated animate__fadeIn">INCOME PER AGENCY</span>
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
              <Select value={selectedMonth} onChange={setSelectedMonth}>
                <option value="All Months">All Months</option>
                {
                  sortedMonths.map((mpo) => (
                    <option key={sortedMonths.indexOf(mpo)} value={mpo.month}>
                      {mpo.month}
                    </option>
                  ))
                }
              </Select>
            </div>
        </div>
            <div className="w-full h-[95%] flex xl:items-center lg:items-center md:items-center items-center overflow-y-scroll hideScroll">
                {
                    data.length < 1 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white border-dashed border-1 p-5">No matching data found</span>
                        </div>
                    ) : (
                        <div className="w-full mx-auto flex xl:flex-row lg:flex-row md:flex-row flex-col items-center xl:justify-between lg:justify-between md:justify-between justify-start xl:p-0 lg:p-0 md:p-0 p-5 xl:gap-0 lg:gap-0 md:gap-o gap-10">
                            {/* Pie Chart */}
                            <div className="w-auto ">
                            <svg width="300px" height='300px' viewBox="100 75 200 250" className="cursor-pointer">
                                {slices.map((slice, idx) => (
                                    <g key={idx}>
                                    <path
                                    d={slice.pathData}
                                    fill={slice.color}
                                    stroke="white"
                                    strokeWidth={isHovered(idx) ? "3" : "2"}
                                    className="transition-all duration-200 ease-in-out"
                                    style={{
                                        filter: isHovered(idx) ? 'brightness(0.95)' : 'none',
                                        cursor: 'pointer'
                                        }}
                                    onMouseEnter={() => setHoveredSlice(idx)}
                                    onMouseLeave={() => setHoveredSlice(null)}
                                    >
                                    <title>{`${slice.agency}: ${slice.percentage.toFixed(1)}% (${formatCurrency(slice.netTotal)})`}</title>
                                    </path>
                                </g>
                                ))}
                                {/* Center circle */}
                                <circle cx="200" cy="200" r="80" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                <text
                                x="200"
                                y="190"
                                textAnchor="middle"
                                className="xl:text-[14px] lg:text-[13px] md:text-[12px] text-[11px] font-semibold fill-gray-600"
                                >
                                Net Total
                                </text>
                                <text
                                x="200"
                                y="215"
                                textAnchor="middle"
                                className="text-lg font-bold fill-gray-800 "
                                >
                                {formatLargeNumber(total)}
                                </text>
                            </svg>
                            </div>

                            {/* Legend */}
                            <div className="xl:w-[40%] lg:w-1/3 md:w-1/3 w-full h-full max-h-[320px] overflow-y-auto hideScroll">
                            <div className="space-y-1 overflow-y-auto pr-2">
                                {slices.map((slice, idx) => (
                                    <div
                                    key={idx}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                                        isHovered(idx)
                                        ? 'bg-gray-100 transform scale-[1.02]'
                                        : 'hover:bg-gray-50'
                                    }`}
                                    onMouseEnter={() => setHoveredLegend(idx)}
                                    onMouseLeave={() => setHoveredLegend(null)}
                                    >
                                    <div className="flex items-center gap-3 flex-1">
                                    <div
                                        className="w-4 h-4 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: slice.color }}
                                        />
                                    <span className="xl:text-[13px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[10px] font-medium text-gray-600 flex-1">
                                        {slice.agencyShort}
                                    </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <span className="xl:text-[13px] lg:text-[12px] md:text-[12px] sm:text-[11px] text-[10px] text-gray-500">
                                        {slice.percentage.toFixed(1)}%
                                    </span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                    )
                }
            

            {/* Tooltip for hovered slice */}
            {hoveredSlice !== null && (
                <div
                className="fixed bg-[rgba(167,214,252,0.90)] text-black p-[20px] rounded-lg text-sm pointer-events-none z-50"
                style={{
                    left: '50%',
                    bottom: '20px',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap'
                    }}
                    >
                    <div className="font-semibold">{slices[hoveredSlice].agency}</div>
                    <div>{formatCurrency(slices[hoveredSlice].netTotal)}</div>
                    <div>{slices[hoveredSlice].percentage.toFixed(1)}% of total</div>
                    </div>
                    )}
            </div>
        </div>
    </>
  );
};