import { useThemeStore } from "../../store/themeStore";
import "./Invoice.css"

const Invoice = () => {
    const theme = useThemeStore((state) => state.theme);

    return <div className={`w-full h-full rounded-[10px] ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} text-white smooth flex flex-col gap-[10px] items-center justify-center`}>
        <div class="lds-hourglass"></div>
        <h1 className="xl:text-[18px] lg:text-[17px] md:text-[15px] text-[14px] text-center">Under Construction!<br></br>Come back later</h1>
    </div>
}

export default Invoice;