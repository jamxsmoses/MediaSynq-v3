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

const NavbarMobile = (prop) => {
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
        <div className="!z-10 w-full h-full bg-black">
            <div className="w-[90%] px-[10px] h-full m-auto flex justify-between items-center">
                {pages.map((page) => (
                    <Icon key={pages.indexOf(page)} page={page} pageName={pageName} theme={theme}/>
                ))}
            </div>
        </div>
        </> 
    }

export default NavbarMobile;




const Icon = ({ page, pageName, theme }) => {
    const navigate = useNavigate();
    const [iconIsHovered, setIconIsHovered] = useState(false);

    return <>
        <div key={page.id} onClick={() => {navigate(page.link)}} onMouseOver={() => {setIconIsHovered(true)}} onMouseOut={() => {setIconIsHovered(false)}} className={`w-[50px] h-full cursor-pointer xl:relative lg:relative md:relative static ${pageName.toUpperCase() === page.pageTitle.toUpperCase() ? "bg-[#008CFF] xl:rounded-[50%] lg:rounded-[50%] md:rounded-[50%]" : '{ ${theme === "light" ? "bg-[#0d2547]" : "bg-[#008CFF]"} smooth}'} smooth flex items-center justify-center left-[50%] xl:translate-x-[-50%] lg:translate-x-[-50%] md:translate-x-[-50%] translate-x-[0%]`}>
            <div className={`navIconTitle absolute top-[50%] rounded-lg translate-y-[-50%] left-[115%] bg-[#008CFF] w-[80px] h-[70%] ${iconIsHovered ? "xl:flex lg:flex md:flex hidden" : "hidden"} items-center justify-center`}>
                <span className="xl:text-[11px] lg:text-[11px] text-[10px] font-regular">{page.pageTitle}</span>
            </div>
            <img className="w-[40%] h-[40%]" src={theme === "dark" ? (pageName === page.pageTitle ? page.darkThemeIcons.img1 : page.darkThemeIcons.img2) : (pageName === page.pageTitle ? page.lightThemeIcons.img1 : page.lightThemeIcons.img2)} alt={page.pageTitle}/>
        </div>
    </>
}