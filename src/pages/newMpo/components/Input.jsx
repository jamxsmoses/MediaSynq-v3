const Input = ({value, onChange, placeholder}) => {
    return <>
        <input type="text" value={value} 
        className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] placeholder:xl:text-[14px] placeholder:lg:text-[13px] placeholder:md:text-[12px]placeholder:text-[11px] outline-none"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        />
    </>
}

export default Input;