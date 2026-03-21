const Select = ({value, onChange, children }) => {
    return <>
        <select
            value={value}
            className={`rounded-[20px] py-[4px] pl-[5px] bg-white border-none outline-none text-[#152416] uppercase
            xl:text-[10px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium text-[6px] rounded-[20px] cursor-pointer`}
            onChange={(e) => onChange(e.target.value)}
        >
            {children}
        </select>
    </>
}