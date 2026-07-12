
import { useThemeStore } from "../../store/themeStore"
import { useNavigate } from "react-router";

const DirectionIcon = ({action}) => {
    const theme = useThemeStore((state) => state.theme);
    const navigate = useNavigate();

    return <>
    <div onClick={() => navigate(action)} className={`w-[30px] hover:w-[38px] h-[22px]  ${theme === "light" ? "bg-[#ffffff] hover:bg-gray-400 smooth" : "bg-blue-500 hover:bg-blue-700 smooth"} flex items-center justify-center rounded-[50px] cursor-pointer`}>
        <div className="w-[15px] h-[15px] rounded-[50%] flex items-center justify-center">
            <div className="w-full h-[50%] relative">
                <div className={`w-[60%] h-[2px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#ffffff]"} smooth rotate-[30deg] absolute top-[5%] right-0 rounded-2xl`}></div>
                <div className={`w-full h-[2.5px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#ffffff]"} smooth absolute top-[50%] right-0 translate-y-[-50%]  rounded-2xl`}></div>
                <div className={`w-[60%] h-[2px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#ffffff]"} smooth rotate-[-30deg] absolute bottom-[5%] right-0 rounded-2xl`}></div>
            </div>
        </div>
    </div>
    </>
}

export default DirectionIcon;