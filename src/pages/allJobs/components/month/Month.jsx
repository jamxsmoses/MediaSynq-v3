import { useMpoStore } from "../../../../store/mpoStore";
import { uniqueMonths } from "../../../../components/functions/Functions";
import Folder from "../../../../components/folderIcon/Folder";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const Month = () => {
    const mpos = useMpoStore((state) => state.mpoData);
    const navigate = useNavigate();
    const { agency, year } = useParams();
    const filteredAgencies = mpos.filter((mpo) => mpo.agency === agency);
    const filteredYears = filteredAgencies.filter((mpo) => mpo.year === Number(year))
    const uniqueMonth = uniqueMonths(filteredYears);

    

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

    return <>
        <div className="w-full flex xl:justify-start lg:justify-start md:justify-start justify-between items-start overflow-auto flex-wrap gap-x-[20px] gap-y-[10px]">
            {sortedMonths.map((item) => (
                <div key={item.id} onClick={() => {
                    navigate(`/manage-mpos/${agency}/${year}/${item.month}`)
                }}>
                    <Folder agency={item.month}/>
                </div>
                )
            )}
        </div>
    </>
}

export default Month;