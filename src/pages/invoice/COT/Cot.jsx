import "./Cot.css";
import ntaLogo from "./imgs/NTA Logo.png";

function Cot(prop) {
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
    totalSpots = totalSpots + a;
    totalSpots = totalSpots + b;
    totalSpots = totalSpots + c;
    totalSpots = totalSpots + d;
    totalSpots = totalSpots + e;
    totalSpots = totalSpots + f;
    totalSpots = totalSpots + g;
    totalSpots = totalSpots + h;
    totalSpots = totalSpots + i;
    totalSpots = totalSpots + j;
    totalSpots = totalSpots + k;
    totalSpots = totalSpots + l;
    totalSpots = totalSpots + m;
    totalSpots = totalSpots + n;
    totalSpots = totalSpots + o;
    totalSpots = totalSpots + p;
    totalSpots = totalSpots + q;
    totalSpots = totalSpots + r;
    totalSpots = totalSpots + s;
    totalSpots = totalSpots + t;
    totalSpots = totalSpots + u;
    totalSpots = totalSpots + v;
    totalSpots = totalSpots + w;
    totalSpots = totalSpots + x;
    totalSpots = totalSpots + y;
    totalSpots = totalSpots + z;
    totalSpots = totalSpots + aa;
    totalSpots = totalSpots + ab;
    totalSpots = totalSpots + ac;
    totalSpots = totalSpots + ad;
    totalSpots = totalSpots + ae;

    return totalSpots;
  }

  const positions = [
    "Network",
    "Nationwide",
    "Lagos",
    "Abuja",
    "PH",
    "PHarcourt",
    "Port",
    "Kano",
    "Kaduna",
    "Ibadan",
    "Yenegoa",
    "Bayelsa",
    "Benin",
    "Enugu",
    "Aba",
    "Jos",
    "Plateu",
    "Maiduguri",
    "Borno",
    "Akwa Ibom",
    "Sokoto",
    "Uyo",
    "Ilorin",
    "Kwara",
    "Kogi",
    "Lokoja",
    "Bauchi",
    "Jalingo",
    "Dutse",
    "Gusau",
    "Birnin-Kebbi",
    "Ado-Ekiti",
    "Ekiti",
    "Umuahia",
    "Abakaliki",
    "Lafia",
    "Osogbo",
    "Oshogbo",
    "Imo",
    "Owerri",
    "Good Morning",
    "Niger",
    "Minna",
    "Ogun",
    "Abeokuta",
    "Ondo",
    "Akure",
    "Yola",
    "Katsina",
    "Calabar",
    "Asaba",
    "Delta",
    "Onitsha",
    "Awka",
    "Anambra",
    "Yobe",
    "Damaturu",
    "Gombe",
    "Makurdi",
    "Zaria",
    "Kebbi",
    "Kabba",
    "Kafancha",
    "Warri",    
  ];

  function getPosition(specialWords, statement) {
    const uppercaseStatement = statement.toUpperCase();
    // Loop through the special words array
    for (let word of specialWords) {
      // Check if the word is in the statement
      if (uppercaseStatement.includes(word.toUpperCase())) {
        if (word === "Good Morning") {
          return "Network";
        }

        if (word === "Port") {
          return "Port Harcourt";
        }

        if (word === "PH") {
          return "Port Harcourt";
        }

        if (word === "Nationwide") {
          return "Network";
        }
        return word; // Return the first match found
      }
    }
    return "null"; // Return null if no match is found
  }

  const date = new Date();
  const monthText = new Date().toLocaleString("default", { month: "short" });

  return (
    <div className="cotContainer xl:w-[595pt] lg:w-[495pt] md:w-[395pt] sm:w-[295pt] w-[295pt] h-auto py-[30px] bg-white m-auto">
      <table className="cot w-[60%] h-auto m-auto">
        <thead>
          <tr>
            <td className="cot-border-none" colSpan={"5"}>
              <div className="flex items-end gap-x-[10px]">
                <div className="w-[60%]">
                  <img src={ntaLogo} />
                </div>
                <div className="flex divOuter gap-x-[5px] items-end w-[30%]">
                  <b className="text-[11.5px]">No:</b>{" "}
                  <div className="text-[12px] !box-border !pl-[7px] underlineDiv">
                    {getPosition(positions, prop.specification)}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="cot-border-none" colSpan={"5"}>
              <div className="w-full flex cotHeader gap-x-[15px]">
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Agency:</b>{" "}
                  <div className="underlineDiv box-border !pl-[20px]">
                    <span className="text-[12px]">{prop.agency}</span>
                  </div>
                </div>
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Contact No</b>{" "}
                  <div className="underlineDiv text-center"></div>
                </div>
              </div>

              <div className="w-full flex cotHeader gap-x-[15px]">
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Address:</b>{" "}
                  <div className="underlineDiv box-border !pl-[20px]">
                    <span className="text-[12px]">Lagos</span>
                  </div>
                </div>
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Order No</b>{" "}
                  <div className="underlineDiv text-center"></div>
                </div>
              </div>

              <div className="w-full flex cotHeader gap-x-[15px]">
                <div className="flex divOuter gap-x-[5px]">
                  <div className="underlineDiv"></div>
                </div>
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Invoice No.</b>{" "}
                  <div className="underlineDiv"></div>
                </div>
              </div>
              <div className="w-full flex cotHeader gap-x-[15px]">
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Product:</b>{" "}
                  <div className="underlineDiv box-border !pl-[15px]">
                    <span className="text-[12px] uppercase">{`${
                      prop.filteredMpo[0].brand.toUpperCase() !==
                      "GOLDEN TERRA SMART BALANCE OIL"
                        ? prop.filteredMpo[0].brand
                        : "GT Soya Balance Oil"
                    }`}</span>
                  </div>
                </div>
                <div className="flex divOuter gap-x-[5px]">
                  <b className="text-[11.5px] m-0">Date:</b>{" "}
                  <div className="underlineDiv text-center">
                    <span className="text-[12px]">
                      {date.getDate()}/{monthText}/{date.getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">
              <b>Date of Broadcast</b>
            </td>
            <td className="text-center">
              <b>Number of Broadcast</b>
            </td>
            <td className="text-center">
              <b>Duration</b>
            </td>
            <td className="text-center">
              <b>Period</b>
            </td>
            <td className="specialTdRight text-center">
              <b>Remarks</b>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="specialTdLeft text-center">1</td>
            <td
              style={{
                color: `${prop.one < 1 ? "white" : "black"}`,
              }}
            >
              {prop.one}
            </td>
            <td>{prop.one < 1 ? "" : prop.duration}</td>
            <td>{prop.one < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.one < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">2</td>
            <td
              style={{
                color: `${prop.two < 1 ? "white" : "black"}`,
              }}
            >
              {prop.two}
            </td>
            <td>{prop.two < 1 ? "" : prop.duration}</td>
            <td>{prop.two < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.two < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">3</td>
            <td
              style={{
                color: `${prop.three < 1 ? "white" : "black"}`,
              }}
            >
              {prop.three}
            </td>
            <td>{prop.three < 1 ? "" : prop.duration}</td>
            <td>{prop.three < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.three < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">4</td>
            <td
              style={{
                color: `${prop.four < 1 ? "white" : "black"}`,
              }}
            >
              {prop.four}
            </td>
            <td>{prop.four < 1 ? "" : prop.duration}</td>
            <td>{prop.four < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.four < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">5</td>
            <td
              style={{
                color: `${prop.five < 1 ? "white" : "black"}`,
              }}
            >
              {prop.five}
            </td>
            <td>{prop.five < 1 ? "" : prop.duration}</td>
            <td>{prop.five < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.five < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">6</td>
            <td
              style={{
                color: `${prop.six < 1 ? "white" : "black"}`,
              }}
            >
              {prop.six}
            </td>
            <td>{prop.six < 1 ? "" : prop.duration}</td>
            <td>{prop.six < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.six < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">7</td>
            <td
              style={{
                color: `${prop.seven < 1 ? "white" : "black"}`,
              }}
            >
              {prop.seven}
            </td>
            <td>{prop.seven < 1 ? "" : prop.duration}</td>
            <td>{prop.seven < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.seven < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">8</td>
            <td
              style={{
                color: `${prop.eight < 1 ? "white" : "black"}`,
              }}
            >
              {prop.eight}
            </td>
            <td>{prop.eight < 1 ? "" : prop.duration}</td>
            <td>{prop.eight < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.eight < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">9</td>
            <td
              style={{
                color: `${prop.nine < 1 ? "white" : "black"}`,
              }}
            >
              {prop.nine}
            </td>
            <td>{prop.nine < 1 ? "" : prop.duration}</td>
            <td>{prop.nine < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.nine < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">10</td>
            <td
              style={{
                color: `${prop.ten < 1 ? "white" : "black"}`,
              }}
            >
              {prop.ten}
            </td>
            <td>{prop.ten < 1 ? "" : prop.duration}</td>
            <td>{prop.ten < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.ten < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">11</td>
            <td
              style={{
                color: `${prop.eleven < 1 ? "white" : "black"}`,
              }}
            >
              {prop.eleven}
            </td>
            <td>{prop.eleven < 1 ? "" : prop.duration}</td>
            <td>{prop.eleven < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.eleven < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">12</td>
            <td
              style={{
                color: `${prop.twelve < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twelve}
            </td>
            <td>{prop.twelve < 1 ? "" : prop.duration}</td>
            <td>{prop.twelve < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twelve < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">13</td>
            <td
              style={{
                color: `${prop.thirteen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.thirteen}
            </td>
            <td>{prop.thirteen < 1 ? "" : prop.duration}</td>
            <td>{prop.thirteen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.thirteen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">14</td>
            <td
              style={{
                color: `${prop.fourteen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.fourteen}
            </td>
            <td>{prop.fourteen < 1 ? "" : prop.duration}</td>
            <td>{prop.fourteen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.fourteen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">15</td>
            <td
              style={{
                color: `${prop.fifteen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.fifteen}
            </td>
            <td>{prop.fifteen < 1 ? "" : prop.duration}</td>
            <td>{prop.fifteen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.fifteen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">16</td>
            <td
              style={{
                color: `${prop.sixteen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.sixteen}
            </td>
            <td>{prop.sixteen < 1 ? "" : prop.duration}</td>
            <td>{prop.sixteen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.sixteen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">17</td>
            <td
              style={{
                color: `${prop.seventeen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.seventeen}
            </td>
            <td>{prop.seventeen < 1 ? "" : prop.duration}</td>
            <td>{prop.seventeen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.seventeen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">18</td>
            <td
              style={{
                color: `${prop.eighteen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.eighteen}
            </td>
            <td>{prop.eighteen < 1 ? "" : prop.duration}</td>
            <td>{prop.eighteen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.eighteen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">19</td>
            <td
              style={{
                color: `${prop.nineteen < 1 ? "white" : "black"}`,
              }}
            >
              {prop.nineteen}
            </td>
            <td>{prop.nineteen < 1 ? "" : prop.duration}</td>
            <td>{prop.nineteen < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.nineteen < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">20</td>
            <td
              style={{
                color: `${prop.twenty < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twenty}
            </td>
            <td>{prop.twenty < 1 ? "" : prop.duration}</td>
            <td>{prop.twenty < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twenty < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">21</td>
            <td
              style={{
                color: `${prop.twentyOne < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyOne}
            </td>
            <td>{prop.twentyOne < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyOne < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyOne < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">22</td>
            <td
              style={{
                color: `${prop.twentyTwo < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyTwo}
            </td>
            <td>{prop.twentyTwo < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyTwo < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyTwo < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">23</td>
            <td
              style={{
                color: `${prop.twentyThree < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyThree}
            </td>
            <td>{prop.twentyThree < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyThree < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyThree < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">24</td>
            <td
              style={{
                color: `${prop.twentyFour < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyFour}
            </td>
            <td>{prop.twentyFour < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyFour < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyFour < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">25</td>
            <td
              style={{
                color: `${prop.twentyFive < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyFive}
            </td>
            <td>{prop.twentyFive < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyFive < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyFive < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">26</td>
            <td
              style={{
                color: `${prop.twentySix < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentySix}
            </td>
            <td>{prop.twentySix < 1 ? "" : prop.duration}</td>
            <td>{prop.twentySix < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentySix < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">27</td>
            <td
              style={{
                color: `${prop.twentySeven < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentySeven}
            </td>
            <td>{prop.twentySeven < 1 ? "" : prop.duration}</td>
            <td>{prop.twentySeven < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentySeven < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">28</td>
            <td
              style={{
                color: `${prop.twentyEight < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyEight}
            </td>
            <td>{prop.twentyEight < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyEight < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyEight < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">29</td>
            <td
              style={{
                color: `${prop.twentyNine < 1 ? "white" : "black"}`,
              }}
            >
              {prop.twentyNine}
            </td>
            <td>{prop.twentyNine < 1 ? "" : prop.duration}</td>
            <td>{prop.twentyNine < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.twentyNine < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">30</td>
            <td
              style={{
                color: `${prop.thirty < 1 ? "white" : "black"}`,
              }}
            >
              {prop.thirty}
            </td>
            <td>{prop.thirty < 1 ? "" : prop.duration}</td>
            <td>{prop.thirty < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.thirty < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr>
            <td className="specialTdLeft text-center">31</td>
            <td
              style={{
                color: `${prop.thirtyOne < 1 ? "white" : "black"}`,
              }}
            >
              {prop.thirtyOne}
            </td>
            <td>{prop.thirtyOne < 1 ? "" : prop.duration}</td>
            <td>{prop.thirtyOne < 1 ? "" : "AAA"}</td>
            <td className="specialTdRight text-center">
              {prop.thirtyOne < 1 ? "" : "V.Good"}
            </td>
          </tr>
          <tr className="lastrow h-[18px]">
            <td className="lastLeft"></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="lastRight"></td>
          </tr>
          <tr className="summaryRow">
            <td className="summaryLeft !text-[12px]">Total No. of Spots:</td>
            <td colSpan="4" className="relative summaryRight !text-[16px]">
              {`${calcTotalSpots(
                prop.one,
                prop.two,
                prop.three,
                prop.four,
                prop.five,
                prop.six,
                prop.seven,
                prop.eight,
                prop.nine,
                prop.ten,
                prop.eleven,
                prop.twelve,
                prop.thirteen,
                prop.fourteen,
                prop.fifteen,
                prop.sixteen,
                prop.seventeen,
                prop.eighteen,
                prop.nineteen,
                prop.twenty,
                prop.twentyOne,
                prop.twentyTwo,
                prop.twentyThree,
                prop.twentyFour,
                prop.twentyFive,
                prop.twentySix,
                prop.twentySeven,
                prop.twentyEight,
                prop.twentyNine,
                prop.thirty,
                prop.thirtyOne
              )} spots of ${prop.duration} on ${
                getPosition(positions, prop.specification) === "Network"
                  ? "Network News"
                  : "Local News"
              }`}
              <div className="absolute w-[230px] h-[130px] top-[-30px] right-[0px] stamp"></div>
            </td>
          </tr>
          <tr>
            <td className="!text-left space h-[10px]" colSpan={"5"}></td>
          </tr>
          <tr>
            <td
              className="!text-left text-[12px] space box-border !pl-[40px] !pr-[20px]"
              colSpan={"5"}
            >
              This is to certify that the above slots were transmitted on the
              Nigerian Television on the date shown and in accordance with the
              terms of the contract.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Cot;
