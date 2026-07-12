import Loader2 from "../../../../../components/loading2/Loader2";
import Loader from "../../../../../components/loading/Loader";
import { useNavigate } from "react-router-dom";
import "./MediaPersepectivesMpo.css";
import { useThemeStore } from "../../../../../store/themeStore";
import { formatRate } from "../../../../../components/functions/Functions";
import { useState } from "react";

const MpMpo = ({curMpo, days}) => {
    const navigate = useNavigate();
    const theme = useThemeStore((state) => state.theme);
    const [hoveredMpo, setHoveredMpo] = useState(null)

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

    const totalRate = curMpo.reduce((sum, obj) => sum + obj.rate, 0);
    const totalGross = curMpo.reduce((sum, obj) => sum + obj.lineTotal, 0);
    const totalSpots = curMpo.reduce((sum, obj) => sum + obj.spots, 0);
    const totalVDAmount = curMpo.reduce((sum, obj) => sum + obj.vdAmount, 0);
    const totalACAmount = curMpo.reduce((sum, obj) => sum + obj.acAmount, 0);
    const totalVatAmount = curMpo.reduce((sum, obj) => sum + obj.vatAmount, 0);
    const totalNet = curMpo.reduce((sum, obj) => sum + obj.netTotal, 0);

    return (
        <>
          <div className={`w-full mb-[20px] flex justify-start items-center whitespace-wrap xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}>
            <div className={`mpHead xl:w-auto lg:w-auto md:w-auto w-full p-[10px] border-[1px] border-solid border-white rounded-lg`}>
              <ul className={`text-white`}>
                <li className="uppercase"><b>MPO NO:</b> {curMpo[0].mpoNumber}</li>
                <li className="uppercase"><b>CLIENT:</b> {curMpo[0].client}</li>
                <li className="uppercase"><b>BRAND:</b> {curMpo[0].brand}</li>
                <li className="uppercase"><b>CAMPAIGN:</b> {curMpo[0].campaign}</li>
              </ul>
            </div>
            
          </div>
          <div
            className="mt-[10px] py-[3px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]"
            style={{ border: "1px solid white", borderBottom: "1px solid white", borderLeft: "none", borderRight: "none" }}
          >
            SCHEDULE
          </div>
    
          <div className="w-full overflow-x-auto fileDiv mb-[20px]">
            <table style={{ border: "none" }} className="w-full ">
              <thead className=" h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]"
                style={{ border: "none" }}
              >
                <tr style={{
                    color: "white",
                  }}
                  className={`border-none`}
                >
                  <td
                    colSpan={"31"}
                    className="h-[10px] border-none "
                    style={{ border: "none" }}
                  ></td>
                </tr>
                <tr className={`${theme ===  'dark' ? 'bg-[#0d2547]' : 'bg-black'} xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}>
                  <td className="text-left">S/N</td>
                  {days.map((day) => (
                    <td className="text-center" key={day}>
                      {day}
                    </td>
                  ))}
                  <td>Total</td>
                </tr>
              </thead>
              <tbody className="scheduleTable">
                {curMpo < 1 ? (
                  <tr>
                    <td className="relative h-[40px]">{<Loading />}</td>
                  </tr>
                ) : (
                  curMpo.map((mpo) => (
                    <tr
                      onClick={() => {
                        const selection = window.getSelection();
                        if (selection.toString()) {
                          // If there's a selection (i.e., text is selected), do nothing
                          return; // Early return to prevent the click handler from firing
                        } else {
                          navigate(`/manage-mpos/editMpo/${mpo.id}`);
                        }
                      }}
                      onMouseOver={() => setHoveredMpo(mpo.sn)}
                      onMouseOut={() => setHoveredMpo(null)}
                      style={{ color: `white` }}
                      key={curMpo.indexOf(mpo)}
                      className={`text-center phdMpoTr ${hoveredMpo === mpo.sn ? "bg-blue-500 text-black" : ""} cursor-pointer main-tr animate__animated animate__fadeInUp xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] hover:bg-blue-500 hover:text-black`}
                    >
                      <td className="text-left" style={{borderLeft: "none"}}>
                        {curMpo.indexOf(mpo) + 1}
                      </td>
                      <td>{mpo.schedule.one < 1 ? "" : mpo.schedule.one}</td>
                      <td>{mpo.schedule.two < 1 ? "" : mpo.schedule.two}</td>
                      <td>{mpo.schedule.three < 1 ? "" : mpo.schedule.three}</td>
                      <td>{mpo.schedule.four < 1 ? "" : mpo.schedule.four}</td>
                      <td>{mpo.schedule.five < 1 ? "" : mpo.schedule.five}</td>
                      <td>{mpo.schedule.six < 1 ? "" : mpo.schedule.six}</td>
                      <td>{mpo.schedule.seven < 1 ? "" : mpo.schedule.seven}</td>
                      <td>{mpo.schedule.eight < 1 ? "" : mpo.schedule.eight}</td>
                      <td>{mpo.schedule.nine < 1 ? "" : mpo.schedule.nine}</td>
                      <td>{mpo.schedule.ten < 1 ? "" : mpo.schedule.ten}</td>
                      <td>{mpo.schedule.eleven < 1 ? "" : mpo.schedule.eleven}</td>
                      <td>{mpo.schedule.twelve < 1 ? "" : mpo.schedule.twelve}</td>
                      <td>
                        {mpo.schedule.thirteen < 1 ? "" : mpo.schedule.thirteen}
                      </td>
                      <td>
                        {mpo.schedule.fourteen < 1 ? "" : mpo.schedule.fourteen}
                      </td>
                      <td>
                        {mpo.schedule.fifteen < 1 ? "" : mpo.schedule.fifteen}
                      </td>
                      <td>
                        {mpo.schedule.sixteen < 1 ? "" : mpo.schedule.sixteen}
                      </td>
                      <td>
                        {mpo.schedule.seventeen < 1 ? "" : mpo.schedule.seventeen}
                      </td>
                      <td>
                        {mpo.schedule.eighteen < 1 ? "" : mpo.schedule.eighteen}
                      </td>
                      <td>
                        {mpo.schedule.nineteen < 1 ? "" : mpo.schedule.nineteen}
                      </td>
                      <td>{mpo.schedule.twenty < 1 ? "" : mpo.schedule.twenty}</td>
                      <td>
                        {mpo.schedule.twentyOne < 1 ? "" : mpo.schedule.twentyOne}
                      </td>
                      <td>
                        {mpo.schedule.twentyTwo < 1 ? "" : mpo.schedule.twentyTwo}
                      </td>
                      <td>
                        {mpo.schedule.twentyThree < 1
                          ? ""
                          : mpo.schedule.twentyThree}
                      </td>
                      <td>
                        {mpo.schedule.twentyFour < 1 ? "" : mpo.schedule.twentyFour}
                      </td>
                      <td>
                        {mpo.schedule.twentyFive < 1 ? "" : mpo.schedule.twentyFive}
                      </td>
                      <td>
                        {mpo.schedule.twentySix < 1 ? "" : mpo.schedule.twentySix}
                      </td>
                      <td>
                        {mpo.schedule.twentySeven < 1
                          ? ""
                          : mpo.schedule.twentySeven}
                      </td>
                      <td>
                        {mpo.schedule.twentyEight < 1
                          ? ""
                          : mpo.schedule.twentyEight}
                      </td>
                      <td>
                        {mpo.schedule.twentyNine < 1 ? "" : mpo.schedule.twentyNine}
                      </td>
                      <td>{mpo.schedule.thirty < 1 ? "" : mpo.schedule.thirty}</td>
                      <td>
                        {mpo.schedule.thirtyOne < 1 ? "" : mpo.schedule.thirtyOne}
                      </td>
                      <td  style={{borderRight: "none"}}>
                        {calcTotalSpots(
                          mpo.schedule.one,
                          mpo.schedule.two,
                          mpo.schedule.three,
                          mpo.schedule.four,
                          mpo.schedule.five,
                          mpo.schedule.six,
                          mpo.schedule.seven,
                          mpo.schedule.eight,
                          mpo.schedule.nine,
                          mpo.schedule.ten,
                          mpo.schedule.eleven,
                          mpo.schedule.twelve,
                          mpo.schedule.thirteen,
                          mpo.schedule.fourteen,
                          mpo.schedule.fifteen,
                          mpo.schedule.sixteen,
                          mpo.schedule.seventeen,
                          mpo.schedule.eighteen,
                          mpo.schedule.nineteen,
                          mpo.schedule.twenty,
                          mpo.schedule.twentyOne,
                          mpo.schedule.twentyTwo,
                          mpo.schedule.twentyThree,
                          mpo.schedule.twentyFour,
                          mpo.schedule.twentyFive,
                          mpo.schedule.twentySix,
                          mpo.schedule.twentySeven,
                          mpo.schedule.twentyEight,
                          mpo.schedule.twentyNine,
                          mpo.schedule.thirty,
                          mpo.schedule.thirtyOne
                        )}
                      </td>
                    </tr>
                  ))
                )}
                <tr style={{ color: `white` }}
                      className={`text-center phdMpoTr cursor-pointer main-tr animate__animated animate__fadeInUp xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] hover:bg-blue-500 hover:text-black`}
                    >
                    <td style={{borderLeft: "none"}} colSpan={32}></td>
                    <td style={{borderRight: "none"}} className="font-bold">{totalSpots}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full overflow-x-auto fileDiv">
            <table style={{ border: "none" }} className="w-full ">
              <thead
                className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                style={{ border: "none" }}
              >
                <tr className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                  <td className="text-left">S/N</td>
                  <td className="text-left">Month</td>
                  <td className="text-left">Titel of Material</td>
                  <td className="text-center">Spots</td>
                  <td className="text-left">Specification</td>
                  <td className="text-center whitespace-nowrap">Dur</td>
                  <td className="text-right">Unit Rate</td>
                  <td className="text-center">Sur-charge</td>
                  <td className="text-right">Line Total</td>
                </tr>
              </thead>
              <tbody>
                {curMpo < 1 ? (
                  <tr>
                    <td colSpan="12" className="relative">
                      {<Loading />}
                    </td>
                  </tr>
                ) : (
                  <MpoTableRow curMpo={curMpo} setHoveredMpo={setHoveredMpo} navigate={navigate}hoveredMpo={hoveredMpo} totalRate={totalRate}/>
                )}
                <tr
                  className="xl:text-[11px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px] h-[20px]"
                  style={{ color: `white` }}
                >
                  <td colSpan="8" style={{borderLeft: "none"}}>SUB TOTAL</td>
                  <td className="text-right" style={{borderRight: "none"}}>{formatRate(totalGross)}</td>
                </tr>
                <tr
                  className="mpTotalsCont xl:text-[11px] lg:text-[11px] md:text-[10px] sm:text-[10px] text-[9px] h-[20px]"
                  style={{ color: `white` }}
                >
                  <td colSpan="8" className="text-right" style={{borderLeft: "none"}}>
                    <ul>
                      <li>{curMpo[0].volumeDiscount}% Volume Discount</li>
                      <li>{curMpo[0].agencyCommission}% Agency Commission</li>
                      <li>{curMpo[0].vat}% V.A.T</li>
                    </ul>
                  </td>
                  <td className="text-right"  style={{borderRight: "none"}}>
                    <ul>
                      <li>{formatRate(totalVDAmount)}</li>
                      <li>{formatRate(totalACAmount)}</li>
                      <li>{formatRate(totalVatAmount)}</li>
                    </ul>
                  </td>
                </tr>
                <tr
                  className="mpTotalsCont2 xl:text-[11px] lg:text-[10px] md:text-[9px] text-[8px]"
                  style={{ color: `white` }}
                >
                  <td colSpan="8" className="td text-right border-none" style={{borderLeft: "none"}}>
                    NET TOTAL
                  </td>
                  <td className="text-right font-bold" style={{borderRight: "none"}}>{formatRate(totalNet)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      );
}

export default MpMpo;

const MpoTableRow = ({curMpo, navigate, totalRate, hoveredMpo, setHoveredMpo}) => {
    console.log(hoveredMpo)

    return <>
        {
            curMpo.map((mpo) => (
                    <tr
                      onClick={() => {
                        const selection = window.getSelection();
                        if (selection.toString()) {
                          // If there's a selection (i.e., text is selected), do nothing
                          return; // Early return to prevent the click handler from firing
                        } else {
                          navigate(`/manage-mpos/editMpo/${mpo.id}`);
                        }
                      }}
                      onMouseOver={() => setHoveredMpo(mpo.sn)}
                      onMouseOut={() => setHoveredMpo(null)}
                      style={{ color: `white` }}
                      key={curMpo.indexOf(mpo)}
                      className={`mpMpoTr cursor-pointer main-tr animate__animated animate__fadeInUp xl:text-[11px] lg:text-[10px] md:text-[9px] text-[8px] hover:bg-blue-500 hover:text-black ${hoveredMpo === mpo.sn ? "bg-blue-500 text-black" : ""}`}
                  >
                      <td className="w-[50px] text-left"  style={{borderLeft: "none"}}>
                        {curMpo.indexOf(mpo) + 1}
                      </td>
                      <td>{mpo.month}</td>
                      <td className="w-[300px]">{mpo.material}</td>
                      <td className="text-center">{mpo.spots}</td>
                      <td>{mpo.specification}</td>
                      <td className="whitespace-nowrap text-center">
                        {mpo.duration}
                      </td>
                      <td className="text-right">
                        {mpo.rate % 1 !== 0
                          ? mpo.rate.toLocaleString("en-US")
                          : `${mpo.rate.toLocaleString("en-US")}.00`}
                      </td>
                      <td className="text-center">0.00</td>
                      <td className="text-right" style={{borderRight: "none"}}>
                        {formatRate(totalRate)}
                      </td>
                    </tr>
                  ))
        }
    </>
}