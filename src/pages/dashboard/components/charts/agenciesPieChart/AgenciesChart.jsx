import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMpoStore } from "../../../../../store/mpoStore";
import { formatRate } from "../../../../../components/functions/Functions";


const AgenciesChart = ({ data, dataKey, nameKey }) => {
    const mpos = useMpoStore((state) => state.mpoData);

    mpos.forEach((mpo) => {
        mpo.agency = mpo.agency.toUpperCase()
    })

    function calcAgenciesNet(data) {
        // Create an object to store sums by agency
            const agencyTotals = {};
    
        // Sum up totals for each agency
            data.forEach(item => {
                if (agencyTotals[item.agency]) {
                agencyTotals[item.agency] += item.netTotal;
                } else {
                agencyTotals[item.agency] = item.netTotal;
                }
            });
    
        // Convert to array of objects with agency name and total sum
        const result = Object.keys(agencyTotals).map(agency => ({
            agency: agency,
            totalNet: agencyTotals[agency]
        }));
    
        return result;
    }

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

    const result = aggregateByAgency(mpos);
    
    const totalNet = result.reduce((sum, obj) => sum + obj.netTotal, 0);

    return <>
        <div className='w-full h-full flex gap-[10px] justify-between items-end'>
            <ChartBars result={result} totalNet={totalNet}/>
        </div>
    </>
}

export default AgenciesChart;


const ChartBars = ({ result, totalNet }) => {  
    
    result.forEach((mpo) => {
        if (mpo.agency === "MEDIA PERSPECTIVES") {
            mpo.agency = "MP"
        }

        if (mpo.agency === "PHD MEDIA") {
            mpo.agency = "PHD"
        }

        if (mpo.agency === "SIMPLY BLACK") {
            mpo.agency = "SYM B"
        }

        if (mpo.agency === "MAXIMEDIA GLOBAL LIMITED") {
            mpo.agency = "MAXI"
        }

        if (mpo.agency === "GLORYCAP LIMITED") {
            mpo.agency = "GCAP"
        }

        if (mpo.agency === "TOLARAM LIMITED") {
            mpo.agency = "TLRAM"
        }

        if (mpo.agency === "SUMMIT CREST MEDIA CONSULTING") {
            mpo.agency = "SUM C."
        }

        if (mpo.agency === "OTB MEDIA CONCEPT LIMITED") {
            mpo.agency = "OTB"
        }

        if (mpo.agency === "PROSPECTS MEDIA & COMMUNICATIONS") {
            mpo.agency = "PMC"
        }
    })
    
    return <>
        <div className='w-[85%] h-full flex flex-col justify-between'>
            {result.map((item) => (
                <div key={result.indexOf(item)} className="w-full h-[20px] flex gap-[10px]">
                    <div className='w-[12%] h-full flex items-center'>
                        <span className='text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[10px]'>{item.agency}</span>
                    </div>
                    <div className='w-[88%] h-full bg-blue-500'></div>
                </div>
            ))}
        </div>
    </>
}