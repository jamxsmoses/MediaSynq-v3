import "./dailyCampaigns.css"
import React,{useState} from "react"
import { useMpoStore } from "../../store/mpoStore"
import { useThemeStore } from "../../store/themeStore"
import Select from "../../components/Select"
import Loader2 from ".././../../src/components/loading2/Loader2"

const DailyCampaigns = () => {
  const mpos = useMpoStore((state) => state.mpoData);
  const theme = useThemeStore((state) => state.theme);
  const date = new Date();
  const [currentDay, setCurrentDay] = useState(Number(date.getDate()));
  const [selectedType, setSelectedType] = useState("All");
  const [isChanged, setIsChanged] = useState(false);
  const currentYear = date.getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState("");
  
  let month;
  month = date.getMonth();
  
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
  
  const currentMonth = months[month];

    
    let daysOfWeek = [];
    
    for (let i = 1; i <= 31; i++) {
      daysOfWeek.push(Number(i));
    }
    
    let mpoYears = [];
    mpoYears = mpos.filter((mpo) => Number(mpo.year) === Number(selectedYear));
    
    let mpoMonths = [];
    mpoMonths = !isChanged ? mpoYears.filter(
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
    "OYO",
  ];

  const filterByType = (array) => {
    if (selectedType === "All") {
      return filteredCampaignsForToday;
    } else {
      return array.filter((item) => {
        const containsKeyword = keywords.some((keyword) =>
          item.specification.trim().includes(keyword)
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


  const years = [];
  for (let i = 2009; i <= 2029; i++) {
    years.push(i);
  }


  mpos.forEach((mpo) => {
    mpo.duration = mpo.duration.trim();
  });

  function toSentenceCase(str) {
    let capitalisedTxt;
    if (str.toUpperCase().includes("SEC")) {
        if (str[2] === " ") {
            capitalisedTxt = str[3].toUpperCase()
        } else {
            capitalisedTxt = str[2].toUpperCase()
        }
    } else if (str.includes("min")) {
        if (str[1] === " ") {
            capitalisedTxt = str[2].toUpperCase();
        } else {
            capitalisedTxt = str[1].toUpperCase();
        }
    }

    let lowercaseText = str.toLowerCase()
    let arr = lowercaseText.split("");
    if (str.toUpperCase().includes("SEC")) {
        if (str[2] === " ") {
            arr[3] = capitalisedTxt;
            lowercaseText = arr.join("");
        } else {
            arr[2] = capitalisedTxt;
            lowercaseText = arr.join("");
        }
    } else if (str.includes("min")) {
        if (str[1] === " ") {
            arr[2] = capitalisedTxt;
            lowercaseText = arr.join("");
        } else {
            arr[1] = capitalisedTxt;
            lowercaseText = arr.join("");
        }
    }
    return lowercaseText;
  }

  if (mpos.length > 1) {
    return (
      <div className={`${theme === "light" ? "bg-[#0d2547]" : "bg-[#001026]"} smooth rounded-[15px] w-full h-full flex xl:flex-row lg:flex-row flex-col items-center overflow-hidden`}>
        {}
        <div className={`flex gap-x-[5px] justify-between ${theme === "light" ? "bg-[#001838]" : "bg-[#001838]"} p-[20px] flex-col
          xl:gap-y-[20px] xl:w-[18%] xl:justify-start xl:h-full
          lg:w-[20%] lg:gap-y-[20px] lg:justify-start lg:h-full w-full items-center`}>
          <div className="xl:w-full lg:w-full flex xl:flex-col lg:flex-col flex-row gap-y-[10px] gap-x-[20px] mb-[20px]">
            <div className="flex xl:flex-row lg:flex-col flex-row gap-y-[10px] gap-x-[20px] xl:w-full lg:w-full md:w-[80%] justify-between ">
              {/* Year Div */}
              <div className="flex flex-col items-start justify-start w-full">
                <span className="uppercase text-[9px] rounded-[5px] bg-blue-500 px-[5px] py-[2px] font-bold text-white">
                    Year:
                </span>
                  <div className="flex ">
                    <div>
                      <Select value={selectedYear} onChange={setSelectedYear}>
                        {
                          years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))
                        }
                      </Select> 
                    </div>
                  </div>
                </div>
                {/* Month Div */}
                <div className="flex flex-col items-start justify-start w-full">
                  <span className="uppercase text-[9px] rounded-[5px] bg-blue-500 px-[5px] py-[2px] font-bold text-white">
                      Month:
                  </span>
                    <span className="font-bold text-white">
                    {
                    <>
                        <select 
                        className={`rounded-[10px] py-[3px] px-[10px] bg-black border-[1px] border-[#008CFF] outline-none text-[#008CFF] uppercase
                        xl:text-[10px] lg:text-[9px] md:text-[8px] sm:text-[7px] font-medium text-[6px] cursor-pointer`} value={!isChanged ? currentMonth : selectedMonth} onChange={(e) => {
                          setSelectedMonth(e.target.value);
                          setIsChanged(true);
                        }}>
                        {
                          months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))
                        }
                      </select>
                    </>
                    }
                </span>
                </div>
            </div>
            <div className="flex flex-col gap-[6px] items-start justify-start w-full">
              <span className="uppercase text-[9px] rounded-[5px] bg-blue-500 px-[5px] py-[2px] font-bold text-white">
                      Campaign Type:
                  </span>
              <Select onChange={setSelectedType}>
                  <option value="All">
                  All Campaigns
                  </option>
                  <option value="Local">
                  Local Station
                  </option>
                  <option value="Network">
                  Network Campaigns
                  </option>
              </Select>
            </div>
          </div>
          
          <div className="daysSlider xl:w-full lg:w-full md:w-[80%] flex flex-wrap gap-[8px] justify-start">
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
                      ? "bg-blue-500"
                      : "bg-white"
                  } font-medium xl:text-[13px] lg:text-[12px] md:text-[11px] rounded-[6px] cursor-pointer sm:text-[10px] text-[10px] flex items-center justify-center xl:!w-[28px] lg:!w-[25px] md:!w-[22px] sm:!w-[18px] !w-[18px] xl:!h-[28px] lg:!h-[25px] md:!h-[22px] sm:!h-[18px] !h-[2px] p-[10px] hover:!bg-blue-500 hover:!text-white hover:shadow hover:shadow-lg shadow-black smooth`}
                >
                  {day}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto xl:w-[82%] lg:w-[80%] md:w-[95%] sm:w-full w-full h-full pt-[20px]">
          <div className={`w-full h-[5%] ${theme === "light" ? "bg-[#001838]" : "bg-[#001838]"} xl:block lg:block hidden`}></div>
          <div className="w-full xl:h-[95%] lg:h-[95%] p-[20px]">
              <div className="w-full h-full overflow-y-auto fileDiv">
                  {todaysCampaigns.length < 1 ? (
              <h1 className="text-white text-center font-medium mt-[20px] xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[15px] text-[15px]">
                  No Campaign for this day!
              </h1>
              ) : (
              <div className="campaigns">
                  <div className="overflow-x-auto fileDiv h-full">
                  <table className="w-full">
                      <thead className="thead xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px]">
                      <tr className="bg-black text-white">
                          <td>S/N</td>
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
                          className={`whitespace-nowrap main-tr animate__animated animate__fadeInUp thead xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px] text-white`}
                          key={todaysCampaigns.indexOf(mpo)}
                          >
                          <td>{todaysCampaigns.indexOf(mpo) + 1}</td>
                          <td>{mpo.brand}</td>
                          <td>{mpo.campaign}</td>
                          <td className="text-center">{toSentenceCase(mpo.duration)}</td>
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
        </div>
      </div>
    )
  } else {
    return (
      <Loader2 />
    )
  }
}

export default DailyCampaigns;