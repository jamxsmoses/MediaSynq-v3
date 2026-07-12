import "./dailyCampaigns.css"
import React,{useState} from "react"
import { useMpoStore } from "../../store/mpoStore"

const DailyCampaigns = () => {
    const mpos = useMpoStore((state) => state.mpoData);
    const date = new Date();
    const [currentDay, setCurrentDay] = useState(Number(date.getDate()));
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [isChanged, setIsChanged] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState("Agency");
    const currentYear = date.getFullYear();
    const [selectedYear, setSelectedYear] = useState(2025)
    
    let currentMonth;

    let month;
    month = date.getMonth() + 1;

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

    if (month === 1 || month === "1") {
    currentMonth = "January";
    }
    if (month === 2 || month === "2") {
        currentMonth = "February";
    }
    if (month === 3 || month === "3") {
        currentMonth = "March";
    }
    if (month === 4 || month === "4") {
        currentMonth = "April";
    }
    if (month === 5 || month === "5") {
        currentMonth = "May";
    }
    if (month === 6 || month === "6") {
        currentMonth = "June";
    }
    if (month === 7 || month === "7") {
        currentMonth = "July";
    }
    if (month === 8 || month === "8") {
        currentMonth = "August";
    }
    if (month === 9 || month === "9") {
        currentMonth = "September";
    }
    if (month === 10 || month === "10") {
        currentMonth = "October";
    }
    if (month === 11 || month === "11") {
        currentMonth = "November";
    }
    if (month === 12 || month === "12") {
        currentMonth = "December";
    }

    let daysOfWeek = [];

    for (let i = 1; i <= 31; i++) {
        daysOfWeek.push(Number(i));
    }

    let mpoYears = [];
    mpoYears = mpos.filter((mpo) => Number(mpo.year) === Number(selectedYear));

    let mpoMonths = [];
    mpoMonths = !isChanged
        ? mpoYears.filter(
            (mpo) => mpo.month.toUpperCase() === currentMonth.toUpperCase()
        )
        : mpoYears.filter(
            (mpo) => mpo.month.toUpperCase() === selectedMonth.toUpperCase()
        );

    let campaignsForToday = [];

if (currentDay === 1) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.one;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 2) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.two;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 3) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.three;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 4) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.four;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 5) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.five;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 6) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.six;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 7) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.seven;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 8) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.eight;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 9) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.nine;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 10) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.ten;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 11) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.eleven;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 12) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twelve;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 13) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.thirteen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 14) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.fourteen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 15) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.fifteen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 16) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.sixteen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 17) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.seventeen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 18) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.eighteen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 19) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.nineteen;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 20) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twenty;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 21) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyOne;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 22) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyTwo;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 23) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyThree;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 24) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyFour;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 25) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyFive;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 26) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentySix;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 27) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentySeven;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 28) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyEight;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 29) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.twentyNine;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 30) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.thirty;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  } else if (currentDay === 31) {
    campaignsForToday = mpoMonths.map((mpo) => {
      const dayValue = mpo.schedule.thirtyOne;

      return { ...mpo, schedule: { dayValue }, dayValue };
    });
  }

  const filteredCampaignsForToday = campaignsForToday.filter(
    (mpo) => mpo.dayValue > 0
  );

  // console.log(filteredCampaignsForToday);

  // const dayCampaigns = filterByDay(mpoMonths, dayOfMpo[currentDay - 1]);

  const keywords = [
    "LAGOS",
    "ABUJA",
    "PH",
    "PHARCOURT",
    "PORT",
    "KANO",
    "KADUNA",
    "IBADAN",
    "YENEGOE",
    "YENEGOA",
    "BAYELSA",
    "BENIN",
    "ENUGU",
    "MIDNEWS",
    "LOCAL",
    "PORTHARCOURT",
    "ABA",
    "JOS",
    "PLATEU",
    "MAIDUGURI",
    "BORNO",
    "IBOM",
    "AKWA",
    "UYO",
    "ILORIN",
    "KWARA",
    "KOGI",
    "LOKOJA",
    "BAUCHI",
    "JALINGO",
    "DUTSE",
    "GUSAU",
    "KEBBI",
    "BIRNIN-KEBBI",
    "ADO-EKITI",
    "EKITI",
    "UMUAHIA",
    "ABAKALIKI",
    "LAFIA",
    "OSOGBO",
    "OSHOGBO",
    "IMO",
    "OWERRI",
    "MINNA",
    "OGUN",
    "ABEOKUTA",
    "ONDO",
    "AKURE",
    "YOLA",
    "KATSINA",
    "CALABAR",
    "ASABA",
    "DELTA",
    "ONITSHA",
    "AWKA",
    "ANAMBRA",
    "YOBE",
    "PRIMETIME",
    "DAMATURU",
    "GOMBE",
    "MAKURDI",
    "ZARIA",
    "KAFANCHA",
    "KABBA",
    "SOKOTO",
    "KASTINA",
    "WARRI",
    "OYO"
  ];

  const filterByType = (array) => {
    if (selectedType === "All") {
      return filteredCampaignsForToday;
    } else {
      return array.filter((item) => {
        const containsKeyword = keywords.some((keyword) =>
          item.specification.includes(keyword)
        );

        return selectedType === "Local" ? containsKeyword : !containsKeyword;
      });
    }
  };

  const type = filterByType(filteredCampaignsForToday);

  let todaysCampaigns =
    type.length < 1
      ? ""
      : type.sort((a, b) => {
          const mpoComparison = a.mpoNumber.localeCompare(b.mpoNumber);
          if (mpoComparison !== 0) {
            return mpoComparison;
          }
        });

  todaysCampaigns =
    selectedAgency === "Agency"
      ? todaysCampaigns
      : todaysCampaigns.filter(
          (mpo) => mpo.agency.toUpperCase() === selectedAgency.toUpperCase()
        );

  let uniqueAgency = [];
  uniqueAgency = Array.from(
    new Map(campaignsForToday.map((item) => [item.agency, item])).values()
  );

  // console.log(todaysCampaigns);

  const handleSelect = (e) => {
    setSelectedMonth(e.target.value);
    setIsChanged(true);
  };

  const years = [];
  for (let i = 2009; i <= 2029; i++) {
    years.push(i);
  }

  const [optionIsOpen, setOptionIsOpen] = useState(false);


  return (
    <div className={`${optionIsOpen ? "relative" : "static"} bg-gray-800 rounded-[15px] w-full h-full pt-[50px] flex p-[20px] flex-col items-center`}>
      <div onClick={() => setOptionIsOpen(false)} className={`${optionIsOpen ? "block" : "hidden"} w-full h-full absolute top-0 left-0`}></div>
      <div className="flex gap-x-[5px] justify-between xl:w-[52%] lg:w-[90%] md:w-[95%] sm:w-full w-full items-center mb-[20px]">
        <span className="flex items-center gap-x-[5px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[11px] text-[10px]">
          <span className="bg-blue-500 px-[5px] py-[2px] font-bold text-white">
            DATE
          </span>
          <>
            <div className="relative">
              <span onClick={() => {setOptionIsOpen(!optionIsOpen)}} className="appearance-none outline-none border-none cursor-pointer text-white font-bold">{Number(selectedYear) === Number(currentYear) ? currentYear : selectedYear}</span>
              <div className={`${optionIsOpen ? "block" : "hidden"} mt-[5px] w-[70px] h-[300px] overflow-y-scroll absolute bg-red-500 z-10`}>
                {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => {
                        setSelectedYear(year)
                        setOptionIsOpen(false)
                      }}
                      className={`cursor-pointer px-[5px] ${Number(year) === Number(selectedYear) ? "bg-blue-500 font-bold" : ""} py-[2px] xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[11px] text-[11px] text-white bg-[#162530]`}
                    >
                      {year}
                    </div>
                  ))}
              </div>
            </div>
          </>
          
          <span className="font-bold text-white">
            |  {currentDay}{" "}
            {
              <>
                <select
                  onChange={handleSelect}
                  defaultValue={currentMonth}
                  className="appearance-none outline-none border-none cursor-pointer"
                  style={{ background: `none` }}
                >
                  {months.map((month) => (
                    <option
                      key={month}
                      value={month}
                      className="xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[11px] text-[11px] text-white bg-[#162530]"
                    >
                      {month}
                    </option>
                  ))}
                </select>
              </>
            }
          </span>
        </span>
        <div>
          <span className="uppercase xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[11px] text-[10px] bg-blue-500 px-[5px] py-[2px] font-bold text-white">
            Type
          </span>
          <select
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
            className="text-white pl-[4px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[11px] text-[10px] outline-none border-none"
            style={{ background: "none" }}
            defaultValue="All"
          >
            <option
              value="All"
              className="xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[11px] text-[11px] text-white bg-[#162530]"
            >
              All
            </option>
            <option
              value="Local"
              className="xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[11px] text-[11px] text-white bg-[#162530]"
            >
              Local Station
            </option>
            <option
              value="Network"
              className="xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[11px] text-[11px] text-white bg-[#162530]"
            >
              Network
            </option>
          </select>
        </div>
      </div>
      <div
        style={{ border: `1px solid white` }}
        className="daysSlider border border-[2px] p-[3px] flex flex-wrap gap-[3px]"
      >
        {daysOfWeek.map((day) => (
          <div key={day}>
            <button
              onClick={() => setCurrentDay(day)}
              className={`${
                day.toString() === currentDay.toString()
                  ? "text-white"
                  : "text-black"
              } ${
                day.toString() === currentDay.toString()
                  ? "bg-blue-700"
                  : "bg-white"
              } font-medium xl:text-[13px] lg:text-[12px] md:text-[11px] sm:text-[10px] text-[10px] flex items-center justify-center xl:!w-[30px] lg:!w-[25px] md:!w-[22px] sm:!w-[18px] !w-[18px] xl:!h-[30px] lg:!h-[25px] md:!h-[22px] sm:!h-[18px] !h-[2px] p-[10px] hover:!bg-blue-500 hover:!text-white`}
            >
              {day}
            </button>
          </div>
        ))}
      </div>
      <div className="daysSlider mx-auto overflow-scroll  mt-[40px] xl:w-[80%] lg:w-[90%] md:w-[95%] sm:w-full w-full">
        {todaysCampaigns.length < 1 ? (
          <h1 className="text-white text-center font-medium mt-[20px] xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[15px] text-[15px]">
            No Campaign for this day!
          </h1>
        ) : (
          <div className="campaigns">
            <>
              <h1 className="text-white mb-[5px] underline text-center xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px]">
                Campaigns
              </h1>
            </>
            <div className=" overflow-scroll">
              <table className="w-full">
                <thead className="thead xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[9px]">
                  <tr className="bg-black text-white">
                    <td>S/N</td>
                    <td>
                      <select
                        value={selectedAgency}
                        defaultValue
                        onChange={(e) => setSelectedAgency(e.target.value)}
                        className="xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[9px] bg-transparent outline-none border-none"
                      >
                        <option
                          value="Agency"
                          className="xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[9px] bg-[#162530]"
                        >
                          Agency
                        </option>
                        {uniqueAgency.map((mpo) => (
                          <option
                            className="xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[9px] bg-[#162530]"
                            key={uniqueAgency.indexOf(mpo)}
                            value={mpo.agency}
                          >
                            {mpo.agency}
                          </option>
                        ))}
                      </select>
                    </td>
                    {/* <td>MPO No.</td> */}
                    <td>Client</td>
                    <td>Brand</td>
                    <td>Campaign</td>
                    <td className="text-center">Duration</td>
                    <td className="text-center">Spots</td>
                    <td>Specification</td>
                  </tr>
                </thead>
                <tbody>
                  {todaysCampaigns.map((mpo) => (
                    <tr
                      className={`whitespace-nowrap main-tr animate__animated animate__fadeInUp xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[10px] text-[9px] text-white`}
                      key={todaysCampaigns.indexOf(mpo)}
                    >
                      <td>{todaysCampaigns.indexOf(mpo) + 1}</td>
                      <td>{mpo.agency}</td>
                      {/* <td>{mpo.mpoNumber}</td> */}
                      <td>{mpo.client}</td>
                      <td>{mpo.brand}</td>
                      <td>{mpo.campaign}</td>
                      <td className="text-center">{mpo.duration}</td>
                      <td className="text-center">{mpo.schedule.dayValue}</td>
                      <td>{mpo.specification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyCampaigns;