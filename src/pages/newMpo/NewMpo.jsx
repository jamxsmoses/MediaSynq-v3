import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import { getDocs, addDoc, collection } from "firebase/firestore";
import "./NewMpo.css";
import { useMpoStore } from "../../store/mpoStore";
import { useThemeStore } from "../../store/themeStore";
import Input from "./components/Input";
import Select from "./components/Select2";
import upload from "./icons/upload.svg"
import reset from "./icons/Reset.svg"
import add from "./icons/add.svg"

const NewMpo = () => {
    const [selectedAgency, setSelectedAgency] = useState("");
    const [selectedMpoNo, setSelectedMpoNo] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedMonth, setselectedMonth] = useState("");
    const [selectedRate, setSelectedRate] = useState("");
    const [selectedVDiscount, setSelectedVDiscount] = useState("");
    const [selectedACommission, setSelectedACommission] = useState("");
    const [selectedVAT, setSelectedVAT] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [errStyle, setErrStyle] = useState("0%");


    const days = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    ];

    const [agencies, setAgencies] = useState([]);
    const theme = useThemeStore((state) =>  state.theme);

    useEffect(() => {
        async function getAgenciesList() {
        const agenciesRef = collection(db, "Agencies");
        // READ DATA FROM DATABASE
        // SET THE AGENCIES LIST
        try {
            const data = await getDocs(agenciesRef);
            const filteredAgencies = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            }));
            setAgencies(filteredAgencies);
        } catch (err) {
            console.error(err);
        }
    }


    getAgenciesList();
    }, [])

    let formData = {};

    const mpos = useMpoStore((state) => state.mpoData);

    const uniqueMPOs = Array.from(
    new Map(mpos.map((item) => [item.mpoNumber, item])).values()
    );

    const mpoYear =
    selectedYear.length < 1
        ? uniqueMPOs
        : uniqueMPOs.filter((mpo) => mpo.year === Number(selectedYear));

    const mpoAgency =
    selectedAgency === ""
        ? mpoYear
        : mpoYear.filter((mpo) => mpo.agency === selectedAgency);

    const mpoMonth =
    selectedMonth === ""
        ? mpoAgency
        : mpoAgency.filter((mpo) => mpo.month === selectedMonth);

    const exists = mpoMonth.some((item) => item.mpoNumber === selectedMpoNo);

    const filteredYear =
    selectedYear.length < 0
        ? mpos
        : mpos.filter((mpo) => Number(mpo.year) === Number(selectedYear));
    const filteredMonth =
    selectedMonth === ""
        ? filteredYear
        : filteredYear.filter((mpo) => mpo.month === selectedMonth);

    const filteredAgency =
    selectedAgency === ""
        ? filteredMonth
        : filteredMonth.filter(
            (mpo) => mpo.agency.toUpperCase() === selectedAgency.toUpperCase()
        );

    const [successMessage, setSuccessMessage] = useState("");
    const [isErr, setIsErr] = useState(false);

    

    // const handleSubmit = async () => {
    // if (prop.currentUser.permission === "Guest") {
    //     return;
    // }

    // // e.preventDefault();
    // if (
    //     !selectedSn ||
    //     selectedAgency === "Agency" ||
    //     !selectedYear ||
    //     !selectedMpoNo ||
    //     !selectedClient ||
    //     !selectedCampaign ||
    //     !selectedBrand ||
    //     !selectedMonth ||
    //     !selectedMaterial ||
    //     !selectedDuration ||
    //     !selectedSpecification ||
    //     selectedRate < 0 ||
    //     selectedVDiscount < 0 ||
    //     selectedACommission < 0 ||
    //     selectedVAT < 0 ||
    //     (one.length < 1 &&
    //     two.length < 1 &&
    //     three.length < 1 &&
    //     four.length < 1 &&
    //     five.length < 1 &&
    //     six.length < 1 &&
    //     seven.length < 1 &&
    //     eight.length < 1 &&
    //     nine.length < 1 &&
    //     ten.length < 1 &&
    //     eleven.length < 1 &&
    //     twelve.length < 1 &&
    //     thirteen.length < 1 &&
    //     fourteen.length < 1 &&
    //     fifteen.length < 1 &&
    //     sixteen.length < 1 &&
    //     seventeen.length < 1 &&
    //     eighteen.length < 1 &&
    //     nineteen.length < 1 &&
    //     twenty.length < 1 &&
    //     twentyone.length < 1 &&
    //     twentytwo.length < 1 &&
    //     twentythree.length < 1 &&
    //     twentyfour.length < 1 &&
    //     twentyfive.length < 1 &&
    //     twentysix.length < 1 &&
    //     twentyseven.length < 1 &&
    //     twentyeight.length < 1 &&
    //     twentynine.length < 1 &&
    //     thirty.length < 1 &&
    //     thirtyone.length < 1)
    // ) {
    //     setErrStyle("100%");
    //     setIsErr(true);
    //     setSuccessMessage(
    //     "Unable to upload MPO!!! Fill all the necessary fields."
    //     );
    //     setTimeout(() => {
    //     setErrStyle("0%");
    //     setSuccessMessage("");
    //     }, 2000);
    //     return;
    // } else {
    //     try {
    //     setLoading(true);
    //     await addDoc(collection(db, "MPOS"), formData);

    //     setErrStyle("100%");
    //     setIsErr(false);
    //     setSuccessMessage("MPO Added Successfully!");
    //     setOne("");
    //     settwo("");
    //     setthree("");
    //     setfour("");
    //     setfive("");
    //     setsix("");
    //     setseven("");
    //     seteight("");
    //     setnine("");
    //     setten("");
    //     seteleven("");
    //     settwelve("");
    //     setthirteen("");
    //     setfourteen("");
    //     setfifteen("");
    //     setsixteen("");
    //     setseventeen("");
    //     seteighteen("");
    //     setnineteen("");
    //     settwenty("");
    //     settwentyone("");
    //     settwentytwo("");
    //     settwentythree("");
    //     settwentyfour("");
    //     settwentyfive("");
    //     settwentysix("");
    //     settwentyseven("");
    //     settwentyeight("");
    //     settwentynine("");
    //     setthirty("");
    //     setthirtyone("");
    //     setTimeout(() => {
    //         setErrStyle("0%");
    //         setSuccessMessage("");
    //     }, 2000);
    //     if (selectedSn !== "") {
    //         setSelectedSn((prevValue) => parseInt(prevValue) + 1);
    //     }
    //     setLoading(false);
    //     // setSelectedSn(Number(selectedSn) + 1);
    //     } catch (error) {
    //     setIsErr(true);
    //     console.error("Error adding document: ", error);
    //     setErrStyle("100%");
    //     setSuccessMessage("Failed to upload MPO!!");
    //     setTimeout(() => {
    //         setErrStyle("0%");
    //         setSuccessMessage("");
    //     }, 2000);
    //     }
    // }
    // };

    
    
    const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ];

    const rateString = selectedRate.toString();
    const vdString = selectedVDiscount.toString();
    const acString = selectedACommission.toString();
    const vatString = selectedVAT.toString();

    function calcTotalSpots(
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    aa,
    ab,
    ac,
    ad,
    ae
    ) {
    let totalSpots = 0;
    totalSpots = totalSpots + Number(a);
    totalSpots = totalSpots + Number(b);
    totalSpots = totalSpots + Number(c);
    totalSpots = totalSpots + Number(d);
    totalSpots = totalSpots + Number(e);
    totalSpots = totalSpots + Number(f);
    totalSpots = totalSpots + Number(g);
    totalSpots = totalSpots + Number(h);
    totalSpots = totalSpots + Number(i);
    totalSpots = totalSpots + Number(j);
    totalSpots = totalSpots + Number(k);
    totalSpots = totalSpots + Number(l);
    totalSpots = totalSpots + Number(m);
    totalSpots = totalSpots + Number(n);
    totalSpots = totalSpots + Number(o);
    totalSpots = totalSpots + Number(p);
    totalSpots = totalSpots + Number(q);
    totalSpots = totalSpots + Number(r);
    totalSpots = totalSpots + Number(s);
    totalSpots = totalSpots + Number(t);
    totalSpots = totalSpots + Number(u);
    totalSpots = totalSpots + Number(v);
    totalSpots = totalSpots + Number(w);
    totalSpots = totalSpots + Number(x);
    totalSpots = totalSpots + Number(y);
    totalSpots = totalSpots + Number(z);
    totalSpots = totalSpots + Number(aa);
    totalSpots = totalSpots + Number(ab);
    totalSpots = totalSpots + Number(ac);
    totalSpots = totalSpots + Number(ad);
    totalSpots = totalSpots + Number(ae);

    return totalSpots;
}


let idCounter = 0;

// const createEmptyRow = () => ({
//     id: `row-${performance.now()}-${idCounter++}`,
//     sn: "",
//     month: "",
//     material: "",
//     duration: "",
//     specification: "",
//     spots:"",
//     rate: "",
//     volumeDiscount: "",
//     agencyCommission: "",
//     vat: "",
//     invNum: exists ? Number(mpoMonth.length) : Number(mpoMonth.length + 1),
//     mpoId: filteredAgency.length + 1,
//     schedule: {
//         one: "",
//         two: "",
//         three: "",
//         four: "",
//         five: "",
//         six: "",
//         seven: "",
//         eight: "",
//         nine: "",
//         ten: "",
//         eleven: "",
//         twelve: "",
//         thirteen: "",
//         fourteen: "",
//         fifteen: "",
//         sixteen: "",
//         seventeen: "",
//         eighteen: "",
//         nineteen: "",
//         twenty: "",
//         twentyOne: "",
//         twentyTwo: "",
//         twentyThree: "",
//         twentyFour: "",
//         twentyFive: "",
//         twentySix: "",
//         twentySeven: "",
//         twentyEight: "",
//         twentyNine: "",
//         thirty: "",
//         thirtyOne: "",
//     },
// });

const createEmptyRow = () => ({
    id: `row-${performance.now()}-${idCounter++}`,
    sn: "",
    month: "",
    material: "",
    duration: "",
    specification: "",
    spots:"",
    rate: "",
    volumeDiscount: "",
    agencyCommission: "",
    vat: "",
    invNum: exists ? Number(mpoMonth.length) : Number(mpoMonth.length + 1),
    mpoId: filteredAgency.length + 1,
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
    ten: "",
    eleven: "",
    twelve: "",
    thirteen: "",
    fourteen: "",
    fifteen: "",
    sixteen: "",
    seventeen: "",
    eighteen: "",
    nineteen: "",
    twenty: "",
    twentyOne: "",
    twentyTwo: "",
    twentyThree: "",
    twentyFour: "",
    twentyFive: "",
    twentySix: "",
    twentySeven: "",
    twentyEight: "",
    twentyNine: "",
    thirty: "",
    thirtyOne: "",
});


const [rows, setRows] = useState([
    createEmptyRow(), // Start with one empty row
  ]);


// Add row
const addRow = () => {
    setRows(prevRows => [...prevRows, createEmptyRow()]);
};

// Handle input change
const handleInputChange = (id, field, value) => {
  setRows(prevRows =>
      prevRows.map(row =>
        row.id === id
          ? { ...row, [field]: value }
          : row
      )
    );
};

 // Delete a row
const deleteRow = (rowId) => {
    setRows(prevRows => prevRows.filter(row => row.id !== rowId));
};

// Reset all rows
const resetRows = () => {
    setRows([createEmptyRow()]);
};

let mpoData = [];

// Convert all objects to nested schedule format
const convertArrayToNestedSchedule = (dataArray) => {

    const scheduleFields = [
        'one', 'two', 'three', 'four', 'five',
        'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
        'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
        'twentyOne', 'twentyTwo', 'twentyThree', 'twentyFour', 'twentyFive',
        'twentySix', 'twentySeven', 'twentyEight', 'twentyNine', 'thirty',
        'thirtyOne'
    ];

    return dataArray.map(item => {
        // Create schedule object from the item
        const schedule = {};
        scheduleFields.forEach(field => {
        schedule[field] = item[field] || "";
        });

        // Remove schedule fields from the main object
        const { ...rest } = item;
        scheduleFields.forEach(field => {
        delete rest[field];
        });

        return {
        ...rest,
        schedule
        };
    });
};
    
const handleSubmit = () => {
    rows.forEach((item) => mpoData.push(item));
    mpoData.forEach((item) => {
        item.mpoNumber = selectedMpoNo;
        item.year = selectedYear;
        item.agency = selectedAgency;
        item.client = selectedClient;
        item.brand = selectedBrand;
        item.campaign = selectedCampaign;
    })
    mpoData = mpoData.map((item, index) => ({
        ...item,
        sn: index + 1
    }));
    console.log(mpoData);
    let newData = convertArrayToNestedSchedule(mpoData);
    console.log(newData);
    newData = [];
    mpoData = [];
    console.log(newData, mpoData);
}


return (
    <>
        <div className={`w-full h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px]`}>
            <div className="w-full">
                <div className="w-full xl:flex lg:flex md:flex justify-between items-end">
                    <div className={`flex flex-col gap-y-[1px] p-[10px] border-[1px] border-white rounded-[10px] xl:w-[32%] lg:w-[40%] md:w-[60%] w-full`}>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>MPO Number:</span>
                            <Input value={selectedMpoNo} onChange={setSelectedMpoNo} placeholder={"...mpo no."}/>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Year:</span>
                            <Input value={selectedYear} onChange={setSelectedYear} placeholder={"...year"}/>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Agency:</span>
                            <Select value={selectedAgency} onChange={setSelectedAgency}>
                                <option hidden>select agency</option>
                                {
                                    agencies.map((item) => (
                                    <option key={item.id} value={item.agency}>{item.agency}</option>
                                ))
                                }
                            </Select>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Client:</span>
                            <Input value={selectedClient} onChange={setSelectedClient} placeholder={"...client"}/>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Brand:</span>
                            <Input value={selectedBrand} onChange={setSelectedBrand} placeholder={"...brand"}/>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Campaign:</span>
                            <Input value={selectedCampaign} onChange={setSelectedCampaign} placeholder={"...campaign"}/>
                        </div>
                    </div>

                    <div className="mt-[20px] flex xl:gap-x-[20px] lg:gap-x-[15px] md:gap-x-[12px] justify-between">
                        <button className="cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] bg-[#008CFF] hover:bg-[#008CFF80] smooth text-white" onClick={handleSubmit}>
                            <img className="w-[60%]" src={upload} alt="Upload Icon" />
                        </button>
                        <button className="cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] bg-green-600 hover:bg-green-800 smooth text-white" onClick={addRow}>
                            <img className="w-[60%]" src={add} alt="add Icon" />
                        </button>
                        <button className="cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] bg-red-600 hover:bg-red-900 smooth text-white" onClick={resetRows}>
                            <img className="w-[60%]" src={reset} alt="reset Icon" />
                        </button>
                    </div>

                </div>

                {/* Table Container */}
                <div className="w-full mt-[20px] overflow-x-auto fileDiv">
                    <table style={{ border: "none" }} className="w-full">
                        <thead className={`h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                            style={{ border: "none" }}>
                            <tr className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                                <td className="text-left">S/N</td>
                                <td className="text-left">Month</td>
                                <td className="text-left">Material</td>
                                <td className="text-center">Duration</td>
                                <td className="text-left">Specification</td>
                                <td className="text-center">Spots</td>
                                <td className="text-right">Unit Rate</td>
                                <td className="text-center">V.D</td>
                                <td className="text-center">A.C</td>
                                <td className="text-center">VAT</td>
                                <td className="text-center">Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id} >
                                    <td className="text-left xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">{index + 1}</td>
                                    <td className="w-[50px]">
                                        <select value={row.month} onChange={(e) => handleInputChange(row.id, 'month', e.target.value)}
                                        className={`rounded-[10px] py-[3px] outline-none xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] cursor-pointer appearance-none`}
                                        >
                                            <option hidden >select month</option>
                                            {months.map((month) => (
                                                <option value={month} key={months.indexOf(month)}>{month}</option>
                                            ))}
                                        </select>
                                        
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left"
                                            required
                                            type="text" important
                                            value={row.material}
                                            onChange={(e) => handleInputChange(row.id, 'material', e.target.value)}
                                            placeholder="...material"
                                        />
                                    </td>
                                    <td className="w-[100px]">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] w-full outline-none text-center"
                                            required
                                            type="text"
                                            important
                                            value={row.duration}
                                            onChange={(e) => handleInputChange(row.id, 'duration', e.target.value)}
                                            placeholder="...duration"
                                        />
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left"
                                            required
                                            type="text"
                                            important
                                            value={row.specification}
                                            onChange={(e) => handleInputChange(row.id, 'specification', e.target.value)}
                                            placeholder="...specification"
                                        />
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            important
                                            value={row.spots}
                                            onChange={(e) => handleInputChange(row.id, 'spots', e.target.value)}
                                            placeholder="...spot"
                                        />
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-right"
                                            required
                                            type="number"
                                            important
                                            value={row.rate}
                                            onChange={(e) => handleInputChange(row.id, 'rate', e.target.value)}
                                            placeholder="...rate"
                                        />
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            important
                                            value={row.volumeDiscount}
                                            onChange={(e) => handleInputChange(row.id, 'volumeDiscount', e.target.value)}
                                            placeholder="...v.d"
                                        />
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            important
                                            value={row.agencyCommission}
                                            onChange={(e) => handleInputChange(row.id, 'agencyCommission', e.target.value)}
                                            placeholder="...a.c"
                                        />
                                    </td>
                                    <td>
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            important
                                            value={row.vat}
                                            onChange={(e) => handleInputChange(row.id, 'vat', e.target.value)}
                                            placeholder="...vat"
                                        />
                                    </td>
                                    <td>
                                        <button className="flex items-center justify-center w-full cursor-pointer"
                                            onClick={() => deleteRow(row.id)}
                                            disabled={rows.length === 1}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <div style={{ marginBottom: '20px' }}>
                </div>
      
                </div>

                <div className="mt-[10px] py-[3px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]"
                    style={{ border: "1px solid white", borderBottom: "1px solid white", borderLeft: "none", borderRight: "none" }}
                >
                    SCHEDULE
                </div>

                <div className="w-full overflow-x-auto ">
                  <table className="w-full mt-[20px]">
                    <thead
                        className={`h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                        style={{ border: "none" }}
                    >
                        <tr className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                        {days.map((day) => (
                          <td className="text-center" key={day}>
                            {day}
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="scheduleTbody">
                        {
                            rows.map((row) => (
                                <tr key={row.id}>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.one}
                                            onChange={(e) => handleInputChange(row.id, 'one', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.two}
                                            onChange={(e) => handleInputChange(row.id, 'two', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.three}
                                            onChange={(e) => handleInputChange(row.id, 'three', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.four}
                                            onChange={(e) => handleInputChange(row.id, 'four', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.five}
                                            onChange={(e) => handleInputChange(row.id, 'five', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.six}
                                            onChange={(e) => handleInputChange(row.id, 'six', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.seven}
                                            onChange={(e) => handleInputChange(row.id, 'seven', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.eight}
                                            onChange={(e) => handleInputChange(row.id, 'eight', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.nine}
                                            onChange={(e) => handleInputChange(row.id, 'nine', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.ten}
                                            onChange={(e) => handleInputChange(row.id, 'ten', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.eleven}
                                            onChange={(e) => handleInputChange(row.id, 'eleven', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twelve}
                                            onChange={(e) => handleInputChange(row.id, 'twelve', e.target.value)}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.thirteen}
                                            onChange={(e) => handleInputChange(row.id, 'thirteen', e.target.value)}
                                        />
                                    </td>          
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.fourteen}
                                            onChange={(e) => handleInputChange(row.id, 'fourteen', e.target.value)}
                                        />
                                    </td>      
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.fifteen}
                                            onChange={(e) => handleInputChange(row.id, 'fifteen', e.target.value)}
                                        />
                                    </td>      
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.sixteen}
                                            onChange={(e) => handleInputChange(row.id, 'sixteen', e.target.value)}
                                        />
                                    </td>         
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.seventeen}
                                            onChange={(e) => handleInputChange(row.id, 'seventeen', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.eighteen}
                                            onChange={(e) => handleInputChange(row.id, 'eighteen', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.nineteen}
                                            onChange={(e) => handleInputChange(row.id, 'nineteen', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twenty}
                                            onChange={(e) => handleInputChange(row.id, 'twenty', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyOne}
                                            onChange={(e) => handleInputChange(row.id, 'twentyOne', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyTwo}
                                            onChange={(e) => handleInputChange(row.id, 'twentyTwo', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyThree}
                                            onChange={(e) => handleInputChange(row.id, 'twentyThree', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyFour}
                                            onChange={(e) => handleInputChange(row.id, 'twentyFour', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyFive}
                                            onChange={(e) => handleInputChange(row.id, 'twentyFive', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentySix}
                                            onChange={(e) => handleInputChange(row.id, 'twentySix', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentySeven}
                                            onChange={(e) => handleInputChange(row.id, 'twentySeven', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyEight}
                                            onChange={(e) => handleInputChange(row.id, 'twentyEight', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.twentyNine}
                                            onChange={(e) => handleInputChange(row.id, 'twentyNine', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.thirty}
                                            onChange={(e) => handleInputChange(row.id, 'thirty', e.target.value)}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" important
                                            value={row.thirtyOne}
                                            onChange={(e) => handleInputChange(row.id, 'thirtyOne', e.target.value)}
                                        />
                                    </td>   
                                </tr>
                            ))
                        }
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    </>
)
}

export default NewMpo;

function MpoTable() {
    return 
}
