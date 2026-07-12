const Select = ({value, onChange, children }) => {
    return <>
        <select
            value={value}
            className={`rounded-[10px] py-[3px] outline-none xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] cursor-pointer appearance-none`}
            onChange={(e) => onChange(e.target.value)}
        >
            {children}
        </select>
    </>
}

export default Select;