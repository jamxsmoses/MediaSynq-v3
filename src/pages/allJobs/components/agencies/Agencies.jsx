import { useMpoStore } from "../../../../store/mpoStore";
import { uniqueAgencies } from "../../../../components/functions/Functions";
import Folder from "../../../../components/folderIcon/Folder";
import { useNavigate } from "react-router";

const Agencies = () => {
    const navigate = useNavigate();
    const mpos = useMpoStore((state) => state.mpoData);
    const uniqueAgency = uniqueAgencies(mpos);

    return <>
        <div className="w-full flex xl:justify-start lg:justify-start md:justify-start justify-between items-start overflow-auto flex-wrap gap-x-[20px] gap-y-[10px]">
            {uniqueAgency.map((item) => (
                    <div key={item.id} onClick={() => {
                        navigate(`/manage-mpos/${item.agency}`)
                    }}>
                        <Folder agency={item.agency} />
                    </div>
                )
            )}
        </div>
    </>
}

export default Agencies;