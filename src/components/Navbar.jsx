import { useNavigate } from "react-router"
import { useState } from "react"
import dashboardIcon from "../assets/images/navIcons/darkThemeIcons/dashboard.svg"
import mposIcon from "../assets/images/navIcons/darkThemeIcons/mpos.svg"
import campaignsIcon from "../assets/images/navIcons/darkThemeIcons/campaigns.svg"
import uploadMpoIcon from "../assets/images/navIcons/darkThemeIcons/uploadMpos.svg"
import invoiceIcon from "../assets/images/navIcons/darkThemeIcons/invoice.svg"
import dashboardIcon2 from "../assets/images/navIcons/darkThemeIcons/dashboard2.svg"
import mposIcon2 from "../assets/images/navIcons/darkThemeIcons/mpos2.svg"
import campaignsIcon2 from "../assets/images/navIcons/darkThemeIcons/campaigns2.svg"
import uploadMpoIcon2 from "../assets/images/navIcons/darkThemeIcons/uploadMpos2.svg"
import invoiceIcon2 from "../assets/images/navIcons/darkThemeIcons/invoice2.svg"
import dashboardIconLight from "../assets/images/navIcons/lightThemeIcons/dashboard.svg"
import mposIconLight from "../assets/images/navIcons/lightThemeIcons/mpos.svg"
import campaignsIconLight from "../assets/images/navIcons/lightThemeIcons/campaigns.svg"
import uploadMpoIconLight from "../assets/images/navIcons/lightThemeIcons/uploadMpos.svg"
import invoiceIconLight from "../assets/images/navIcons/lightThemeIcons/invoice.svg"
import dashboardIcon2Light from "../assets/images/navIcons/lightThemeIcons/dashboard2.svg"
import mposIcon2Light from "../assets/images/navIcons/lightThemeIcons/mpos2.svg"
import campaignsIcon2Light from "../assets/images/navIcons/lightThemeIcons/campaigns2.svg"
import uploadMpoIcon2Light from "../assets/images/navIcons/lightThemeIcons/uploadMpos2.svg"
import invoiceIcon2Light from "../assets/images/navIcons/lightThemeIcons/invoice2.svg"
import "animate.css"
import { useThemeStore } from "../store/themeStore"

const Navbar = (prop) => {
    const pageName = prop.pageName;
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const pages = [
        {
            id: 0,
            pageTitle: "Dashboard",
            link: "/dashboard",
            darkThemeIcons: {
                img1: dashboardIcon,
                img2: dashboardIcon2
            },
            lightThemeIcons: {
                img1: dashboardIcon2Light,
                img2: dashboardIconLight
            }
        },
        {
            id: 1,
            pageTitle: "Manage MPOs",
            link: "/manage-mpos",
            darkThemeIcons: {
                img1: mposIcon,
                img2: mposIcon2,
            },
            lightThemeIcons: {
                img1: mposIcon2Light,
                img2: mposIconLight,
            }
            
        },
        {
            id: 2,
            pageTitle: "Campaigns",
            link: "/campaigns",
            darkThemeIcons: {
                img1: campaignsIcon,
                img2: campaignsIcon2,
            },
            lightThemeIcons: {
                img1: campaignsIcon2Light,
                img2: campaignsIconLight,
            }
            
        },
        {
            id: 3,
            pageTitle: "Upload MPO",
            link: "/new-mpo",
            darkThemeIcons: {
                img1: uploadMpoIcon,
                img2: uploadMpoIcon2,
            },
            lightThemeIcons: {
                img1: uploadMpoIcon2Light,
                img2: uploadMpoIconLight,
            }
            
        },
        {
            id: 4,
            pageTitle: "Invoice",
            link: "/invoice",
            darkThemeIcons: {
                img1: invoiceIcon,
                img2: invoiceIcon2,
            },
            lightThemeIcons: {
                img1: invoiceIcon2Light,
                img2: invoiceIconLight,
            }
            
        },
    ]

    return <>
        <div className="!z-10 w-full h-full xl:flex lg:flex md:flex xl:flex-col lg:flex-col md:flex-col xl:justify-between lg:justify-between md:justify-between xl:items-center lg:items-center md:items-center">

            <div className="xl:mt-[10px] lg:mt-[10px] md:mt-[10px] xl:w-[40px] lg:w-[40px] md:w-[40px] w-full flex xl:flex-col lg:flex-col md:flex-col flex-row xl:gap-y-[3px] lg:gap-y-[3px] md:gap-y-[3px] xl:justify-start lg:justify-start md:justify-start justify-between xl:items-start lg:items-start md:items-start items-center">
                {pages.map((page) => (
                    <Icon key={pages.indexOf(page)} page={page} pageName={pageName} theme={theme}/>
                ))}
            </div>
            <div className="xl:flex lg:flex md:flex hidden justify-centerhidden pb-[20px]">
                <div onClick={toggleTheme} className={`w-[40px] h-[20px] bg-gray-800 rounded-2xl px-1 py-2 relative ${theme === 'light' ? "justify-start" : "justify-end"} smooth cursor-pointer`}>
                    <div className={`w-[14px] h-[14px] rounded-2xl absolute top-[50%] translate-y-[-50%] ${theme === "light" ? "left-[10%] bg-white" : "left-[55%] bg-gray-400"} smooth`}></div>
                </div>
            </div>
        </div>
        </> 
    }

export default Navbar;




const Icon = ({ page, pageName, theme }) => {
    const navigate = useNavigate();
    const [iconIsHovered, setIconIsHovered] = useState(false);

    return <>
        <div key={page.id} onClick={() => {navigate(page.link)}} onMouseOver={() => {setIconIsHovered(true)}} onMouseOut={() => {setIconIsHovered(false)}} className={`xl:w-[35px] xl:h-[35px] lg:w-[32px] lg:h-[32px] md:w-[30px] md:h-[30px] w-[40px] h-[40px] cursor-pointer xl:relative lg:relative md:relative static ${pageName.toUpperCase() === page.pageTitle.toUpperCase() ? "bg-[#008CFF] xl:rounded-[50%] lg:rounded-[50%] md:rounded-[50%]" : '{ ${theme === "light" ? "bg-[#0d2547]" : "bg-[#008CFF]"} smooth}'} smooth flex items-center justify-center left-[50%] xl:translate-x-[-50%] lg:translate-x-[-50%] md:translate-x-[-50%] translate-x-[0%]`}>
            <div className={`navIconTitle absolute top-[50%] rounded-lg translate-y-[-50%] left-[115%] bg-[#008CFF] w-[100px] h-[70%] ${iconIsHovered ? "xl:flex lg:flex md:flex hidden" : "hidden"} items-center justify-center`}>
                <span className="xl:text-[11px] lg:text-[11px] text-[10px] font-regular">{page.pageTitle}</span>
            </div>
            <img className="w-[50%] h-[50%]" src={theme === "dark" ? (pageName === page.pageTitle ? page.darkThemeIcons.img1 : page.darkThemeIcons.img2) : (pageName === page.pageTitle ? page.lightThemeIcons.img1 : page.lightThemeIcons.img2)} alt={page.pageTitle}/>
        </div>
    </>
}