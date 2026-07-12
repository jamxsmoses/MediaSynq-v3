import "./FileIcon.css"
import { useThemeStore } from "../../store/themeStore"
import "animate.css"

const FileIcon = ({agency}) => {
    const theme = useThemeStore((state) => state.theme)
    return <>
        <div className={`px-[10px] py-[14px] folderContainer cursor-pointer hover:bg-[#ffffff21] smooth rounded-md animate__animated animate__fadeIn`}>
            <div className={`rounded-md file-icon xl:w-[90px] xl:h-[100px] lg:w-[90px] lg:h-[100px] md:w-[80px] md:h-[90px] w-[70px] h-[80px] ${theme === "light" ? "bg-[#ffffff]" : "bg-[#008CFF]"} p-[15px] flex flex-col items-start justify-between`}>
                <div className={`w-2/3 h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                <div className="w-full flex justify-between">
                    <div className={`w-1/4 h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                    <div className={`w-2/4 h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                </div>
                <div className={`w-full h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                <div className="w-full flex justify-between">
                    <div className={`w-2/4 h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                    <div className={`w-1/4 h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                </div>
                <div className={`w-full h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                <div className="w-full flex justify-end">
                    <div className={`w-1/3 h-[3px] rounded-2xl ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}></div>
                </div>
            </div>
            <div className="xl:w-[90px] lg:w-[90px] md:w-[80px] w-[70px] leading-[12px] mt-[4px] overflow-x-scroll hideScroll">
                <span className={`whitespace-wrap ${theme === "light" ? "text-white" : "text-[#008CFF]"} xl:text-[11px] lg:text-[11px] md:text-[10px] text-[9px]`}>{agency}</span>
            </div>
        </div>
    </>
}

export default FileIcon;

