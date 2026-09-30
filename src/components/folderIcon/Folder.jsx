import { useThemeStore } from "../../store/themeStore"
import "animate.css"
import folderDark from "./imgs/FolderIconDark.svg";
import folderLight from "./imgs/FolderIconLight.svg";

const Folder = ({agency}) => {
    const theme = useThemeStore((state) => state.theme);
    return <>
        <div className={`px-[10px] xl:w-[90px] lg:w-[80px] md:w-[70px] w-[60px] py-[14px] cursor-pointer hover:bg-[#ffffff21] smooth rounded-md animate__animated animate__fadeIn`}>
            <img src={theme === "light" ? folderLight : folderDark} alt="Folder Icon" 
                className="w-full"/>
            <div className="w-full leading-[12px] mt-[4px]">
                <span className={`whitespace-wrap ${theme === "light" ? "text-white" : "text-[#008CFF]"} xl:text-[11px] lg:text-[11px] md:text-[10px] text-[9px]`}>{agency}</span>
            </div>
        </div>
    </>
}

export default Folder;