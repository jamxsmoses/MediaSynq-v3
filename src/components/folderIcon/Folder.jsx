import "./Folder.css"
import { useThemeStore } from "../../store/themeStore"
import "animate.css"

const Folder = ({agency}) => {
    const theme = useThemeStore((state) => state.theme);
    return <>
        <div className={`px-[10px] py-[14px] folderContainer cursor-pointer hover:bg-[#ffffff21] smooth rounded-md animate__animated animate__fadeIn`}>
            <div className={`folder-icon ${theme === "light" ? "bg-[#ffffff]" : "bg-[#008CFF]"}`}></div>
            <div className="w-[100px] leading-[12px] mt-[4px]">
                <span className={`whitespace-wrap ${theme === "light" ? "text-white" : "text-[#008CFF]"} xl:text-[11px] lg:text-[11px] md:text-[10px] text-[9px]`}>{agency}</span>
            </div>
        </div>
    </>
}

export default Folder;