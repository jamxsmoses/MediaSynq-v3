const Select = ({value, onChange, children }) => {
    return <>
        <select
            value={value}
            className={`rounded-[10px] py-[3px] px-[10px] bg-none border-[1px] border-[#008CFF] outline-none text-[#008CFF] uppercase
            xl:text-[10px] lg:text-[9px] md:text-[8px] sm:text-[7px] font-medium text-[6px] cursor-pointer`}
            onChange={(e) => onChange(e.target.value)}
        >
            {children}
        </select>
    </>
}

export default Select;