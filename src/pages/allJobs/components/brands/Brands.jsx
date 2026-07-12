import { useMpoStore } from "../../../../store/mpoStore";
import { uniqueBrands } from "../../../../components/functions/Functions";
import Folder from "../../../../components/folderIcon/Folder";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const Brands = () => {
    const mpos = useMpoStore((state) => state.mpoData);
    const navigate = useNavigate();
    const {agency, year, month} = useParams();
    const filteredAgencies = mpos.filter((mpo) => mpo.agency === agency);
    const filteredYears = filteredAgencies.filter((mpo) => mpo.year === Number(year));
    const filteredMonths = filteredYears.filter((mpo) => mpo.month === month);
    const uniqueBrand = uniqueBrands(filteredMonths);

    mpos.forEach((mpo) => {
        mpo.brand = mpo.brand.trim();
        mpo.brand = mpo.brand.toUpperCase();
    })

    return <>
        <div className="w-full flex xl:justify-start lg:justify-start md:justify-start justify-between items-start overflow-auto flex-wrap gap-x-[20px] gap-y-[10px]">
            {uniqueBrand.map((item) => (
                <div key={item.id} onClick={() => {
                    navigate(`/manage-mpos/${agency}/${year}/${month}/${item.brand}`)
                }}>
                    <Folder agency={item.brand.toUpperCase()}/>
                </div>
                )
            )}
        </div>
    </>
}

export default Brands;