import { useMpoStore } from "../../../../store/mpoStore";
import { uniqueYear } from "../../../../components/functions/Functions";
import Folder from "../../../../components/folderIcon/Folder";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const Years = () => {
    const mpos = useMpoStore((state) => state.mpoData);
    const navigate = useNavigate();
    const { agency } = useParams();
    const filteredAgencies = mpos.filter((mpo) => mpo.agency === agency)
    const uniqueYears = uniqueYear(filteredAgencies);


    return <>
        <div className="w-full flex xl:justify-start lg:justify-start md:justify-start justify-between items-start overflow-auto flex-wrap gap-x-[20px] gap-y-[10px]">
            {uniqueYears.map((item) => (
                <div key={item.id} onClick={() => {
                    navigate(`/manage-mpos/${agency}/${item.year}`)
                }}>
                    <Folder agency={item.year}/>
                </div>
                )
            )}
        </div>
    </>
}

export default Years;