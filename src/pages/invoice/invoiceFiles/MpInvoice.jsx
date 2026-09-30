import "./MpInvoice.css"
import { formatRate } from "../../../components/functions/Functions";
import { useThemeStore } from "../../../store/themeStore";

const MpInvoice = ({filteredInvoices, invNum}) => {
    const date = new Date();
    const monthText = new Date().toLocaleString("default", { month: "short" });
    const theme = useThemeStore((state) => state.theme)
    filteredInvoices.forEach((item) => {
        if (item.month.toUpperCase() === "MAY") {
            item.invNumText = "MY"
        } else if (item.month.toUpperCase() === "JULY") {
            item.invNumText = "JL"
        } else {
            item.invNumText = `${item.month[0].toUpperCase()}${item.month[1].toUpperCase()}`
        }
    })

    // Main Container
    return <div className="w-[90%] h-full py-[5px] mx-auto">
        <div className="w-full flex items-center justify-center mt-[20px] mb-[30px]">
            <span className="text-center xl:text-[14px] lg:text-[12px] text-[10px] px-[40px] py-[6px] border-white border-[1px]">INVOICE</span>
        </div>
        <div className="w-full flex items-start justify-between">
            <div className="rounded-[5px] xl:w-[250px] ld:w-[230px] md:w-[200px] sm:w-[100px] w-[100px] lg:px-[10px] md:px-[10px] sm:px-[5px] px-[5px] py-[12px] 
                xl:text-[13px] lg:text-[12px] md:text-[11px] sm:text-[11px] text-[10px]"
                style={{
                color: "white",
                border: `2px solid white`,
                }}
            >
                <h1>THE MEDIA BUYER</h1>
                <h1>{filteredInvoices.length < 1 ? "" : filteredInvoices[0].agency}</h1>
                <h1>LAGOS</h1>
            </div>
            <div className="xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px]">
                <ul
                    style={{
                    color: "white",
                    }}
                >
                    <li className="uppercase">
                    MPO NO: {filteredInvoices.length < 1 ? "" : filteredInvoices[0].mpoNumber}
                    </li>
                    <li className="uppercase">
                    CLIENT: {filteredInvoices.length < 1 ? "" : filteredInvoices[0].client}
                    </li>
                    <li className="uppercase">
                    BRAND: {filteredInvoices.length < 1 ? "" : filteredInvoices[0].brand}
                    </li>
                    <li className="uppercase">
                    CAMPAIGN: {filteredInvoices.length < 1 ? "" : filteredInvoices[0].campaign}
                    </li>
                    <li>
                    INVOICE DATE:{" "}
                    {`${date.getDate()}-${monthText}-${date.getFullYear()} `}
                    </li>
                </ul>
            </div>
        </div>
        {/* invoice Table Head */}
        <div className="mt-[10px] text-white w-full bg-black flex uppercase px-[15px] py-[5px] justify-between items-center whitespace-wrap xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px]">
                <span>{`INVOICE NO: AG${filteredInvoices[0].invNumText}${filteredInvoices[0].year.toString()[2]}${filteredInvoices[0].year.toString()[3]}/${invNum}`}</span>
                <span>{`Month: ${filteredInvoices[0].month}`}</span>
                <span>TIN NO: 17363518-0001</span>
        </div>
        {/* Table Container */}
        <div className="w-full">
            <table className="w-full">
                <thead className={`xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px] !border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                    <tr className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold`}>S/N</td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold`}>TITLE OF MATERIAL</td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold`}>SPECIFICATION</td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold text-center`}>DURATION</td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold text-center`}>SPOTS</td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold text-right`}>RATE</td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} !py-[10px] font-bold text-right`}>LINE TOTAL</td>
                    </tr>
                </thead>
                <tbody className={`xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px] !border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                    {
                        filteredInvoices.map((item) => (
                        <tr key={item.id} className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>{filteredInvoices.indexOf(item) + 1}</td>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>{item.material}</td>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>{item.specification}</td>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} text-center`}>{item.duration}</td>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} text-center`}>{item.spots}</td>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} text-right`}>{formatRate(item.rate)}</td>
                            <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} text-right`}>{formatRate(item.spots * item.rate)}</td>
                        </tr>
                        ))
                    }
                    <tr className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                        <td colSpan={7} className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>SUBTOTAL</td>
                    </tr>
                    <tr className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"} text-right`}>
                        <td colSpan={6} className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                            <ul>
                                <li>
                                    {`${filteredInvoices[0].volumeDiscount}% V.Discount`}
                                </li>
                                <li>
                                    {`${filteredInvoices[0].agencyCommission}% A.Commission`}
                                </li>
                                <li>
                                    {`${filteredInvoices[0].vat}% VAT`}
                                </li>
                            </ul>
                        </td>
                        <td className={`!border-[1px] ${theme === "light" ? "!border-black" : "!border-white"}`}>
                            <ul>
                                <li>
                                    {`${filteredInvoices[0].volumeDiscount}% V.Discount`}
                                </li>
                                <li>
                                    {`${filteredInvoices[0].agencyCommission}% A.Commission`}
                                </li>
                                <li>
                                    {`${filteredInvoices[0].vat}% VAT`}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default MpInvoice;