import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import { writeBatch, doc, deleteDoc, getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import "./NewMpo.css";
import { useMpoStore } from "../../store/mpoStore";
import { useThemeStore } from "../../store/themeStore";
import Input from "./components/Input";
import Select from "./components/Select2";
import upload from "./icons/upload.svg"
import reset from "./icons/Reset.svg"
import add from "./icons/add.svg"
import { useAuthStore } from "../../store/authStore";
import "animate.css"

const NewMpo = () => {
    const currentYear = new Date().getFullYear();
    const [selectedAgency, setSelectedAgency] = useState("");
    const [selectedMpoNo, setSelectedMpoNo] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedMonth, setselectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [errStyle, setErrStyle] = useState(false);
    const user = useAuthStore((state) => state.user);
    const fetchMpoData = useMpoStore((state) => state.fetchMpoData);


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

function generateSecureId(length = 20) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters[randomValues[i] % charactersLength];
  }
  return result;
}

const createEmptyRow = () => ({
    sn: "",
    sn2: generateSecureId(),
    month: "",
    material: "",
    duration: "",
    specification: "",
    spots: 0,
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

const dayKeys = [
    'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
    'twentyOne', 'twentyTwo', 'twentyThree', 'twentyFour', 'twentyFive',
    'twentySix', 'twentySeven', 'twentyEight', 'twentyNine', 'thirty',
    'thirtyOne'
];

// Calculate total for a specific item
const calculateTotal = (item) => {
return dayKeys.reduce((sum, day) => {
    const value = parseFloat(item[day]) || 0;
    return sum + value;
}, 0);
};

// Update any field (including totalSpots automatically)
  const updateField = (itemId, field, value) => {
    setRows(prevData =>
      prevData.map(item => {
        if (item.sn2 === itemId) {
          // Create updated item
          const updatedItem = { 
            ...item, 
            [field]: value 
          };
          
          // Automatically recalculate totalSpots
          updatedItem.spots = calculateTotal(updatedItem);
          
          return updatedItem;
        }
        return item;
      })
    );
  };

// Handle input changes
  const handleInputChange = (itemId, field, value) => {
    updateField(itemId, field, value);
  };

 // Delete a row
const deleteRow = (rowId) => {
    setRows(prevRows => prevRows.filter(row => row.sn2 !== rowId));
};

// Reset all rows
const resetRows = () => {
    setRows([createEmptyRow()]);
    setSelectedMpoNo("");
    setSelectedYear("");
    setSelectedAgency("");
    setSelectedClient("");
    setSelectedBrand("");
    setSelectedCampaign("");
};

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
    
// const handleSubmit2 = () => {
//     let mpoData = [];
//     rows.forEach((item) => mpoData.push(item));
//     mpoData.forEach((item) => {
//         item.mpoNumber = selectedMpoNo;
//         item.year = Number(selectedYear);
//         item.agency = selectedAgency;
//         item.client = selectedClient;
//         item.brand = selectedBrand;
//         item.campaign = selectedCampaign;
//     })
//     mpoData = mpoData.map((item, index) => ({
//         ...item,
//         sn: index + 1
        
//     }));
//     let newData = convertArrayToNestedSchedule(mpoData);
//     console.log(newData);
// }

const [loading, setLoading] = useState(false); 

const handleSubmit = async () => {
    let mpoData = [];
    if (user.permission === "Guest") {
        return;
    }

    if (
        selectedAgency === "" ||
        !selectedYear ||
        !selectedMpoNo ||
        !selectedClient ||
        !selectedCampaign ||
        !selectedBrand
    ) {
        setSuccessMessage(
            "Unable to upload MPO!!! Fill all the necessary fields."
        );
        setErrStyle(true);
        setIsErr(true);
        setTimeout(() => {
        setErrStyle(false);
        setSuccessMessage("");
        }, 2000);
        return;
    } else {
        rows.forEach((item) => mpoData.push(item));
        mpoData.forEach((item) => {
            item.mpoNumber = selectedMpoNo;
            item.year = Number(selectedYear);
            item.agency = selectedAgency;
            item.client = selectedClient;
            item.brand = selectedBrand;
            item.campaign = selectedCampaign;
            delete item.sn2;
        })
        mpoData = mpoData.map((item, index) => ({
            ...item,
            sn: index + 1
        }));
        let newData = convertArrayToNestedSchedule(mpoData);
        try {
        setLoading(true);
        
        const batch = writeBatch(db);
        newData.forEach((user) => {
            const docRef = doc(collection(db, "MPOS")); // Auto-generated ID
            batch.set(docRef, user);
        });
        await batch.commit();
        setSuccessMessage("MPO Added Successfully!");
        setErrStyle(true);
        setIsErr(false);
        await fetchMpoData();
        setTimeout(() => {
            setErrStyle(false);
            setSuccessMessage("");
        }, 2000);
        setLoading(false);
        newData = [];
        mpoData = [];

        } catch (error) {
        setIsErr(true);
        console.error("Error adding document: ", error);
        setErrStyle(true);
        setSuccessMessage("Failed to upload MPO!!");
        setTimeout(() => {
            setErrStyle(false);
            setSuccessMessage("");
        }, 2000);
        }
    }
};

agencies.forEach((mpo) => {
    mpo.agency = mpo.agency.toUpperCase();
    if (mpo.agency === "MEDIA PERSPECTIVES") {
        mpo.agencyShort = "MEDIA PERSPECTIVES"
    } else if (mpo.agency === "PHD MEDIA") {
        mpo.agencyShort = "PHD MEDIA"
    } else if (mpo.agency === "SIMPLY BLACK ADVERTISING & CONSULTANCY LIMITED") {
        mpo.agencyShort = "SYMPLY BLACK"
    } else if (mpo.agency.includes("MAXIMEDIA GLOBAL LIMITED")) {
        mpo.agencyShort = "MAXIMEDIA"
    } else if (mpo.agency === "GLORYCAP LIMITED") {
        mpo.agencyShort = "GLORYCAP"
    } else if (mpo.agency === "TOLARAM LIMITED") {
        mpo.agencyShort = "TOLARAM"
    } else if (mpo.agency === "SUMMIT CREST MEDIA CONSULTING") {
        mpo.agencyShort = "SUMMIT CREST."
    } else if (mpo.agency === "OTB MEDIA CONCEPT LIMITED") {
        mpo.agencyShort = "OTB MEDIA"
    } else if (mpo.agency === "PROSPECTS MEDIA & COMMUNICATIONS") {
        mpo.agencyShort = "PROSPECTS MEDIA"
    } else {
        mpo.agencyShort = mpo.agency
    }
})

const [agencyFilterVisible, setAgencyFilterVisible] = useState(false);


return (
    <>
        <div className={`w-full h-full ${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[10px] p-[20px] relative`}>
            <div className="w-full">
                <div className="w-full xl:flex lg:flex md:flex justify-between items-end">
                    <div className={`flex flex-col gap-y-[1px] p-[10px] border-[1px] border-white rounded-[10px] xl:w-[32%] lg:w-[40%] md:w-[60%] w-full`}>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span className="w-[120px]">MPO Number:</span>
                            <Input value={selectedMpoNo} onChange={setSelectedMpoNo} placeholder={"...mpo no."}/>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Year:</span>
                            <Input value={selectedYear} onChange={setSelectedYear} placeholder={"...year."}/>
                        </div>
                        <div className="flex items-center gap-x-[10px] text-white xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px]">
                            <span>Agency:</span>
                            <div className="relative cursor-pointer">
                                <span onMouseOver={() => {setAgencyFilterVisible(true)}} onMouseOut={() => {setAgencyFilterVisible(false)}}>{selectedAgency === "" ? "Select Agency" : selectedAgency}</span>
                                <div className={`${agencyFilterVisible ? "" : "h-[0px] !p-0"} smooth overflow-hidden absolute left-0 top-[120%] bg-black py-[5px] rounded-[10px]`}>
                                    {
                                        agencies.map((item) => (
                                            <div onMouseOver={() => {setAgencyFilterVisible(true)}}
                                            onMouseOut={() => {setAgencyFilterVisible(false)}} 
                                            onClick={() => {setSelectedAgency(item.agency)}} 
                                            className={`${selectedAgency === item.agency ? "bg-blue-500 text-white" : ""} smooth w-[170px] py-[2px] px-[10px] xl:text-[11px] lg:text-[10px] md:text-[9px] text-[9px] hover:bg-blue-500 hover:text-white`}>
                                                {item.agencyShort}
                                                </div>
                                        ))
                                    }
                                </div>
                            </div>
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
                        <button className="cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] bg-[#008CFF] hover:bg-[#008CFF80] smooth text-white" 
                        onClick={handleSubmit}>
                            <img className="w-[60%]" src={upload} alt="Upload Icon" />
                        </button>
                        <button className="cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] bg-green-600 hover:bg-green-800 smooth text-white" 
                        onClick={addRow}>
                            <img className="w-[60%]" src={add} alt="add Icon" />
                        </button>
                        <button className="cursor-pointer xl:w-[30px] lg:w-[28px] md:w-[25px] w-[24px] xl:h-[30px] lg:g-[28px] md:h-[25px] h-[24px] flex items-center justify-center rounded-[50%] p-[3px] bg-red-600 hover:bg-red-900 smooth text-white" 
                        onClick={resetRows}>
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
                                    <td className="w-[150px]">
                                        <select value={row.month} onChange={(e) => handleInputChange(row.sn2, 'month', e.target.value)}
                                        className={`w-full py-[3px] outline-none xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] cursor-pointer appearance-none`}
                                        >
                                            <option hidden >select month</option>
                                            {months.map((month) => (
                                                <option value={month} key={months.indexOf(month)}>{month}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="">
                                        <input className="w-full xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left"
                                            required
                                            type="text"
                                            value={row.material}
                                            onChange={(e) => handleInputChange(row.sn2, 'material', e.target.value)}
                                            placeholder="...material"
                                        />
                                    </td>
                                    <td className="w-[120px]">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] w-full outline-none text-center"
                                            required
                                            type="text"
                                            value={row.duration}
                                            onChange={(e) => handleInputChange(row.sn2, 'duration', e.target.value)}
                                            placeholder="...duration"
                                        />
                                    </td>
                                    <td className="">
                                        <input className="w-full xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left"
                                            required
                                            type="text"
                                            value={row.specification}
                                            onChange={(e) => handleInputChange(row.sn2, 'specification', e.target.value)}
                                            placeholder="...specification"
                                        />
                                    </td>
                                    <td className="text-center w-[80px]">
                                        <span className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none w-full">{row.spots}</span>
                                    </td>
                                    <td className="w-[150px]">
                                        <input className="w-full xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-right"
                                            required
                                            type="number"
                                            value={row.rate}
                                            onChange={(e) => handleInputChange(row.sn2, 'rate', Number(e.target.value))}
                                            placeholder="...rate"
                                        />
                                    </td>
                                    <td className="w-[80px]">
                                        <input className="w-full xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            value={row.volumeDiscount}
                                            onChange={(e) => handleInputChange(row.sn2, 'volumeDiscount', Number(e.target.value))}
                                            placeholder="...v.d"
                                        />
                                    </td>
                                    <td className="w-[80px]">
                                        <input className="w-full xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            value={row.agencyCommission}
                                            onChange={(e) => handleInputChange(row.sn2, 'agencyCommission', Number(e.target.value))}
                                            placeholder="...a.c"
                                        />
                                    </td>
                                    <td className="w-[80px]">
                                        <input className="w-full xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-center"
                                            required
                                            type="number"
                                            value={row.vat}
                                            onChange={(e) => handleInputChange(row.sn2, 'vat', Number(e.target.value))}
                                            placeholder="...vat"
                                        />
                                    </td>
                                    <td className="">
                                        <button className="flex items-center justify-center w-full cursor-pointer"
                                            onClick={() => deleteRow(row.sn2)}
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
                                            onChange={(e) => {handleInputChange(row.sn2, 'one', Number(e.target.value))}}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.two}
                                            onChange={(e) => handleInputChange(row.sn2, 'two', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.three}
                                            onChange={(e) => handleInputChange(row.sn2, 'three', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.four}
                                            onChange={(e) => handleInputChange(row.sn2, 'four', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number" 
                                            value={row.five}
                                            onChange={(e) => handleInputChange(row.sn2, 'five', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.six}
                                            onChange={(e) => handleInputChange(row.sn2, 'six', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.seven}
                                            onChange={(e) => handleInputChange(row.sn2, 'seven', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.eight}
                                            onChange={(e) => handleInputChange(row.sn2, 'eight', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.nine}
                                            onChange={(e) => handleInputChange(row.sn2, 'nine', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.ten}
                                            onChange={(e) => handleInputChange(row.sn2, 'ten', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.eleven}
                                            onChange={(e) => handleInputChange(row.sn2, 'eleven', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twelve}
                                            onChange={(e) => handleInputChange(row.sn2, 'twelve', Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.thirteen}
                                            onChange={(e) => handleInputChange(row.sn2, 'thirteen', Number(e.target.value))}
                                        />
                                    </td>          
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.fourteen}
                                            onChange={(e) => handleInputChange(row.sn2, 'fourteen', Number(e.target.value))}
                                        />
                                    </td>      
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.fifteen}
                                            onChange={(e) => handleInputChange(row.sn2, 'fifteen', Number(e.target.value))}
                                        />
                                    </td>      
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.sixteen}
                                            onChange={(e) => handleInputChange(row.sn2, 'sixteen', Number(e.target.value))}
                                        />
                                    </td>         
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.seventeen}
                                            onChange={(e) => handleInputChange(row.sn2, 'seventeen', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.eighteen}
                                            onChange={(e) => handleInputChange(row.sn2, 'eighteen', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.nineteen}
                                            onChange={(e) => handleInputChange(row.sn2, 'nineteen', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twenty}
                                            onChange={(e) => handleInputChange(row.sn2, 'twenty', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyOne}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyOne', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyTwo}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyTwo', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyThree}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyThree', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyFour}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyFour', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyFive}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyFive', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentySix}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentySix', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentySeven}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentySeven', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyEight}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyEight', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.twentyNine}
                                            onChange={(e) => handleInputChange(row.sn2, 'twentyNine', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.thirty}
                                            onChange={(e) => handleInputChange(row.sn2, 'thirty', Number(e.target.value))}
                                        />
                                    </td>   
                                    <td className="w-full h-full">
                                        <input className="xl:text-[13px] lg:text-[12px] md:text-[11px] text-[10px] outline-none text-left w-full"
                                            type="number"
                                            value={row.thirtyOne}
                                            onChange={(e) => handleInputChange(row.sn2, 'thirtyOne', Number(e.target.value))}
                                        />
                                    </td>   
                                </tr>
                            ))
                        }
                    </tbody>
                  </table>
                </div>
            </div>

            <div>
            <div className={`${errStyle ? "flex" : "hidden"} items-center justify-center w-[300px] p-[10px] rounded-[10px] text-center bg-white absolute bottom-[50px] left-[50%] translate-x-[-50%] animate__animated animate__fadeInRight`}>

                <p className={`${isErr ? "text-red-600" : "text-blue-500"} xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[10px]`}
                style={{
                    margin: "0",
                    fontStyle: "italic",
                    opacity: errStyle,
                    marginTop: "10px",
                }}
            >
                {successMessage}
                </p>
            </div>
            </div>

            <div className={`absolute top-0 left-0 w-full h-full ${loading ? "flex" : "hidden"} items-center justify-center bg-[#00000050] rounded-[10px]`}>
                <div className="loaderr"></div>
            </div>
        </div>
    </>
)
}

export default NewMpo;

function MpoTable() {
    return 
}
