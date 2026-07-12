import "./Loader.css"

const Loader = () => {
    const text = ["M", "e", "d", "i", "a", "S", "y", "n", "q"]
    return <>
        <div className="w-[100vw] h-[100vh] bg-black flex items-center justify-center">
            <div className="loader"></div>
                {/* <div className="flex text-[#008CFF] loading loading05">
                    <span>{text[0]}</span>
                    <span>{text[1]}</span>
                    <span>{text[2]}</span>
                    <span>{text[3]}</span>
                    <span>{text[4]}</span>
                    <span>{text[5]}</span>
                    <span>{text[6]}</span>
                    <span>{text[7]}</span>
                    <span>{text[8]}</span>
                </div> */}
        </div>
    </>
}

export default Loader;