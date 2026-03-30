import { useNavigate } from "react-router"
import { useState } from "react"
import dashboardIcon from "../assets/images/navIcons/dashboard.svg"
import mposIcon from "../assets/images/navIcons/mpos.svg"
import campaignsIcon from "../assets/images/navIcons/campaigns.svg"
import uploadMpoIcon from "../assets/images/navIcons/uploadMpos.svg"
import invoiceIcon from "../assets/images/navIcons/invoice.svg"
import dashboardIcon2 from "../assets/images/navIcons/dashboard2.svg"
import mposIcon2 from "../assets/images/navIcons/mpos2.svg"
import campaignsIcon2 from "../assets/images/navIcons/campaigns2.svg"
import uploadMpoIcon2 from "../assets/images/navIcons/uploadMpos2.svg"
import invoiceIcon2 from "../assets/images/navIcons/invoice2.svg"
import "animate.css"

const Navbar = (prop) => {
    const pageName = prop.pageName;

    const pages = [
        {
            id: 0,
            pageTitle: "Dashboard",
            link: "/dashboard",
            img1: dashboardIcon,
            img2: dashboardIcon2,
        },
        {
            id: 1,
            pageTitle: "Manage MPOs",
            link: "/manage-mpos",
            img1: mposIcon,
            img2: mposIcon2,
        },
        {
            id: 2,
            pageTitle: "Campaigns",
            link: "/campaigns",
            img1: campaignsIcon,
            img2: campaignsIcon2,
        },
        {
            id: 3,
            pageTitle: "Upload MPO",
            link: "/new-mpo",
            img1: uploadMpoIcon,
            img2: uploadMpoIcon2,
        },
        {
            id: 4,
            pageTitle: "Invoice",
            link: "/invoice",
            img1: invoiceIcon,
            img2: invoiceIcon2,
        },
    ]

    return <>
        <div className="xl:mt-[10px] lg:mt-[10px] md:mt-[10px] xl:w-[40px] lg:w-[40px] md:w-[40px] w-[90%] flex xl:flex-col lg:flex-col md:flex-col flex-row xl:gap-y-[3px] lg:gap-y-[3px] md:gap-y-[3px] xl:justify-start lg:justify-start md:justify-start justify-between xl:items-start lg:items-start md:items-start items-center">
            {pages.map((page) => (
                <Icon key={pages.indexOf(page)} page={page} pageName={pageName}/>
            ))}
        </div>
        </>
    }

export default Navbar;


const Icon = (prop) => {
    const navigate = useNavigate();
    const [iconIsHovered, setIconIsHovered] = useState(false);

    return <>
        <div key={prop.page.id} onMouseOver={() => {setIconIsHovered(true)}} onMouseOut={() => {setIconIsHovered(false)}} className={`xl:w-[35px] xl:h-[35px] lg:w-[32px] lg:h-[32px] md:w-[30px] md:h-[30px] w-[40px] h-[40px] cursor-pointer xl:relative lg:relative md:relative static ${prop.pageName === prop.page.pageTitle ? "bg-[#008CFF] rounded-[50%]" : "bg-black"} smooth flex items-center justify-center left-[50%] xl:translate-x-[-50%] lg:translate-x-[-50%] md:translate-x-[-50%] translate-x-[0%]`}>
            <div className={`absolute top-[50%] z-1 rounded-lg translate-y-[-50%] left-[115%] bg-[#008CFF] w-[100px] h-[70%] ${iconIsHovered ? "xl:flex lg:flex md:flex hidden" : "hidden"} items-center justify-center`}>
                <span className="xl:text-[11px] lg:text-[11px] text-[10px] font-regular">{prop.page.pageTitle}</span>
            </div>
            <img className="w-[50%] h-[50%]" src={prop.pageName === prop.page.pageTitle ? prop.page.img1 : prop.page.img2} alt={prop.page.pageTitle} onClick={() => {navigate(prop.page.link)}}/>
        </div>
    </>
}