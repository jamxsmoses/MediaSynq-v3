import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMpoStore } from '../../../../../store/mpoStore';
import { formatRate } from '../../../../../components/functions/Functions';

// #region Sample data
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// #endregion
const QuarterChart = () => {
  const mpos = useMpoStore((state) => state.mpoData);
  mpos.forEach((mpo) => {
    mpo.month = mpo.month.toUpperCase()
  })

  let filteredMpos = mpos;

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

  const result = groupByQuarter(filteredMpos)

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
    <div className='xl:w-[85%] lg: w-'>
      <BarChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={result}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" stroke={`#ffffff`} opacity={"40%"} />
        <XAxis dataKey="quarter" fontSize="12px"/>
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="lineTotal" fill="#008CFF" activeBar={{ fill: 'orangered', stroke: 'orangered'}} radius={[10, 10, 0, 0]} />
        <Bar dataKey="netTotal" fill="#8dcbff" activeBar={{ fill: '#004680', stroke: '#004680'}} radius={[10, 10, 0, 0]} />
      </BarChart>
    </div>
  );
};

export default QuarterChart;