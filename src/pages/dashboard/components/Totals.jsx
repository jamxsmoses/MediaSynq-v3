import "animate.css"

const Totals = (prop) => {

    return <>
        <div className="">
            <span className="text-white xl:text-[14px] lg:text-[12px] md:text-[11px] text-[10px] font-medium animate__animated animate__fadeIn">{prop.title}</span>
            <h1 className="text-[#008CFF] font-extrabold xl:text-[32px] lg:text-[28px] md:text-[26px] text-[24px] leading-[1] animate__animated animate__fadeIn">{`${prop.balanceVisible ? prop.value : "---"}`}</h1>
        </div>
    </>
}

export default Totals;