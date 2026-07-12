import { useMpoStore } from "../../../../store/mpoStore";
import { uniqueMpoNum } from "../../../../components/functions/Functions";
import FileIcon from "../../../../components/FileIcon/FileIcon";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const Mpos = () => {
    const mpos = useMpoStore((state) => state.mpoData);
    const navigate = useNavigate();
    mpos.forEach((mpo) => {
        mpo.mpoNumber = mpo.mpoNumber.replace(/\s/g, "");
        mpo.mpoNum = mpo.mpoNumber.replace(/\//g, "");
        mpo.mpoNum = mpo.mpoNum.replace(/\s/g, "");
    });
    const {agency, year, month, brand} = useParams();
    const filteredAgencies = mpos.filter((mpo) => mpo.agency === agency);
    const filteredYears = filteredAgencies.filter((mpo) => mpo.year === Number(year));
    const filteredMonths = filteredYears.filter((mpo) => mpo.month === month);
    const filteredBrands = filteredMonths.filter((mpo) => mpo.brand === brand);
    const uniqueMpos = uniqueMpoNum(filteredBrands);

    return <>
        <div className="overflow-y-auto w-full flex xl:justify-start lg:justify-start md:justify-start justify-between items-start overflow-auto flex-wrap gap-x-[20px] gap-y-[10px]">
            {uniqueMpos.map((item) => (
                <div key={item.id} onClick={() => {
                    navigate(`/manage-mpos/${agency}/${year}/${month}/${brand}/${item.mpoNum}`)
                }}>
                    <FileIcon agency={`${item.campaign.toUpperCase()}\n(${item.mpoNumber})`}/>
                </div>
                )
            )}
        </div>
    </>
}

export default Mpos;