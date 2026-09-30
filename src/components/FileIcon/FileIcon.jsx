import "./FileIcon.css"
import { useThemeStore } from "../../store/themeStore"
import "animate.css"
import fileIconDark from "./Imgs/fileIconDark.svg";
import fileIconLight from "./Imgs/fileIconLight.svg";

const FileIcon = ({agency}) => {
    const theme = useThemeStore((state) => state.theme)
    return <>
        <div className={`px-[10px] xl:w-[100px] lg:w-[90px] w-[80px] py-[14px] folderContainer cursor-pointer hover:bg-[#ffffff21] smooth rounded-md animate__animated animate__fadeIn`}>
            <img src={theme === "light" ? fileIconLight : fileIconDark} alt="File Icon" 
                className="w-[80%]"/>
            <div className="w-full leading-[12px] mt-[4px] overflow-x-scroll hideScroll">
                <span className={`whitespace-wrap ${theme === "light" ? "text-white" : "text-[#008CFF]"} xl:text-[11px] lg:text-[11px] md:text-[10px] text-[9px]`}>{agency}</span>
            </div>
        </div>
    </>
}

export default FileIcon;

