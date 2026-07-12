import "./Loader2.css"
import { useThemeStore } from "../../store/themeStore";

const Loader2 = () => {
    const theme = useThemeStore((state) => state.theme);
    return <>
        <div className={`w-full h-full flex items-center justify-center  ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth`}>
            <div className="loader2"></div>
        </div>
    </>
}

export default Loader2;