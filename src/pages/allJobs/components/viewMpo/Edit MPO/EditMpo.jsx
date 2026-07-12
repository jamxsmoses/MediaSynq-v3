import { useParams, useNavigate } from "react-router-dom";
import "./EditMpo.css";
import "animate.css";
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../config/firebase-config";
import Loader2 from "../../../../../components/loading2/Loader2";
import { useMpoStore } from "../../../../../store/mpoStore";
import { useThemeStore } from "../../../../../store/themeStore";
import { useAuthStore } from "../../../../../store/authStore";
import trashIcon from "../../../../../assets/images/trashIcon.svg"
import saveIcon from "../../../../../assets/images/saveIcon.svg"

const EditMpo = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const mpos = useMpoStore((state) => state.mpoData);
      const user = useAuthStore((state) => state.user);
      const theme = useThemeStore((state) => state.theme);
    
      let curMpo = [];
      curMpo = mpos.filter((mpo) => mpo.id === id);
    
      // State to manage form input
      const [sn, setSn] = useState("");
      const [agency, setAgency] = useState("");
      const [year, setsetYear] = useState("");
      const [month, setMonth] = useState("");
      const [mpoNumber, setMpoNumber] = useState("");
      const [client, setClient] = useState("");
      const [brand, setBrand] = useState("");
      const [campaign, setCampaign] = useState("");
      const [material, setMaterial] = useState("");
      const [duration, setDuration] = useState("");
      const [specification, setSpecification] = useState("");
      const [rate, setRate] = useState("");
      const [volumeDiscount, setVolumeDiscount] = useState("");
      const [agencyCommission, setAgencyCommission] = useState("");
      const [vat, setVat] = useState("");
    
      const [msg, setMsg] = useState("");
      const [isErr, setIsErr] = useState(false);
    
      // states for schedule
      const [one, setOne] = useState("");
      const [two, settwo] = useState("");
      const [three, setthree] = useState("");
      const [four, setfour] = useState("");
      const [five, setfive] = useState("");
      const [six, setsix] = useState("");
      const [seven, setseven] = useState("");
      const [eight, seteight] = useState("");
      const [nine, setnine] = useState("");
      const [ten, setten] = useState("");
      const [eleven, seteleven] = useState("");
      const [twelve, settwelve] = useState("");
      const [thirteen, setthirteen] = useState("");
      const [fourteen, setfourteen] = useState("");
      const [fifteen, setfifteen] = useState("");
      const [sixteen, setsixteen] = useState("");
      const [seventeen, setseventeen] = useState("");
      const [eighteen, seteighteen] = useState("");
      const [nineteen, setnineteen] = useState("");
      const [twenty, settwenty] = useState("");
      const [twentyOne, settwentyone] = useState("");
      const [twentyTwo, settwentytwo] = useState("");
      const [twentyThree, settwentythree] = useState("");
      const [twentyFour, settwentyfour] = useState("");
      const [twentyFive, settwentyfive] = useState("");
      const [twentySix, settwentysix] = useState("");
      const [twentySeven, settwentyseven] = useState("");
      const [twentyEight, settwentyeight] = useState("");
      const [twentyNine, settwentynine] = useState("");
      const [thirty, setthirty] = useState("");
      const [thirtyOne, setthirtyone] = useState("");
      const [isChanged, setIsChanged] = useState(false);
    
      // Function to handle form submission and update the document
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (user.permission === "Guest") {
          return;
        }
    
        // Reference to Document to be updated
        const userDocRef = doc(db, "MPOS", id); //
    
        if (isChanged) {
          try {
            // Updating the document with the new values
            await updateDoc(userDocRef, {
              sn: sn.length < 1 ? Number(curMpo[0].sn) : Number(sn),
              year: year.length < 1 ? Number(curMpo[0].year) : Number(year),
              agency: agency.length < 1 ? curMpo[0].agency : agency,
              month: month.length < 1 ? curMpo[0].month : month,
              mpoNumber: mpoNumber.length < 1 ? curMpo[0].mpoNumber : mpoNumber,
              client: client.length < 1 ? curMpo[0].client : client,
              brand: brand.length < 1 ? curMpo[0].brand : brand,
              campaign: campaign.length < 1 ? curMpo[0].campaign : campaign,
              material: material.length < 1 ? curMpo[0].material : material,
              duration: duration.length < 1 ? curMpo[0].duration : duration,
              specification:
                specification.length < 1 ? curMpo[0].specification : specification,
              spots:
                (one === "" ? curMpo[0].schedule.one : one) +
                (two === "" ? curMpo[0].schedule.two : two) +
                (three === "" ? curMpo[0].schedule.three : three) +
                (four === "" ? curMpo[0].schedule.four : four) +
                (five === "" ? curMpo[0].schedule.five : five) +
                (six === "" ? curMpo[0].schedule.six : six) +
                (seven === "" ? curMpo[0].schedule.seven : seven) +
                (eight === "" ? curMpo[0].schedule.eight : eight) +
                (nine === "" ? curMpo[0].schedule.nine : nine) +
                (ten === "" ? curMpo[0].schedule.ten : ten) +
                (eleven === "" ? curMpo[0].schedule.eleven : eleven) +
                (twelve === "" ? curMpo[0].schedule.twelve : twelve) +
                (thirteen === "" ? curMpo[0].schedule.thirteen : thirteen) +
                (fourteen === "" ? curMpo[0].schedule.fourteen : fourteen) +
                (fifteen === "" ? curMpo[0].schedule.fifteen : fifteen) +
                (sixteen === "" ? curMpo[0].schedule.sixteen : sixteen) +
                (seventeen === "" ? curMpo[0].schedule.seventeen : seventeen) +
                (eighteen === "" ? curMpo[0].schedule.eighteen : eighteen) +
                (nineteen === "" ? curMpo[0].schedule.nineteen : nineteen) +
                (twenty === "" ? curMpo[0].schedule.twenty : twenty) +
                (twentyOne === "" ? curMpo[0].schedule.twentyOne : twentyOne) +
                (twentyTwo === "" ? curMpo[0].schedule.twentyTwo : twentyTwo) +
                (twentyThree === ""
                  ? curMpo[0].schedule.twentyThree
                  : twentyThree) +
                (twentyFour === "" ? curMpo[0].schedule.twentyFour : twentyFour) +
                (twentyFive === "" ? curMpo[0].schedule.twentyFive : twentyFive) +
                (twentySix === "" ? curMpo[0].schedule.twentySix : twentySix) +
                (twentySeven === ""
                  ? curMpo[0].schedule.twentySeven
                  : twentySeven) +
                (twentyEight === ""
                  ? curMpo[0].schedule.twentyEight
                  : twentyEight) +
                (twentyNine === "" ? curMpo[0].schedule.twentyNine : twentyNine) +
                (thirty === "" ? curMpo[0].schedule.thirty : thirty) +
                (thirtyOne === "" ? curMpo[0].schedule.thirtyOne : thirtyOne),
              rate: rate.length < 1 ? Number(curMpo[0].rate) : Number(rate),
              volumeDiscount:
                volumeDiscount.length < 1
                  ? Number(curMpo[0].volumeDiscount)
                  : Number(volumeDiscount),
              agencyCommission:
                agencyCommission.length < 1
                  ? Number(curMpo[0].agencyCommission)
                  : Number(agencyCommission),
              vat: vat.length < 1 ? Number(curMpo[0].vat) : Number(vat),
              schedule: {
                one: Number(one === "" ? curMpo[0].schedule.one : one),
                two: Number(two === "" ? curMpo[0].schedule.two : two),
                three: Number(three === "" ? curMpo[0].schedule.three : three),
                four: Number(four === "" ? curMpo[0].schedule.four : four),
                five: Number(five === "" ? curMpo[0].schedule.five : five),
                six: Number(six === "" ? curMpo[0].schedule.six : six),
                seven: Number(seven === "" ? curMpo[0].schedule.seven : seven),
                eight: Number(eight === "" ? curMpo[0].schedule.eight : eight),
                nine: Number(nine === "" ? curMpo[0].schedule.nine : nine),
                ten: Number(ten === "" ? curMpo[0].schedule.ten : ten),
                eleven: Number(eleven === "" ? curMpo[0].schedule.eleven : eleven),
                twelve: Number(twelve === "" ? curMpo[0].schedule.twelve : twelve),
                thirteen: Number(
                  thirteen === "" ? curMpo[0].schedule.thirteen : thirteen
                ),
                fourteen: Number(
                  fourteen === "" ? curMpo[0].schedule.fourteen : fourteen
                ),
                fifteen: Number(
                  fifteen === "" ? curMpo[0].schedule.fifteen : fifteen
                ),
                sixteen: Number(
                  sixteen === "" ? curMpo[0].schedule.sixteen : sixteen
                ),
                seventeen: Number(
                  seventeen === "" ? curMpo[0].schedule.seventeen : seventeen
                ),
                eighteen: Number(
                  eighteen === "" ? curMpo[0].schedule.eighteen : eighteen
                ),
                nineteen: Number(
                  nineteen === "" ? curMpo[0].schedule.nineteen : nineteen
                ),
                twenty: Number(twenty === "" ? curMpo[0].schedule.twenty : twenty),
                twentyOne: Number(
                  twentyOne === "" ? curMpo[0].schedule.twentyOne : twentyOne
                ),
                twentyTwo: Number(
                  twentyTwo === "" ? curMpo[0].schedule.twentyTwo : twentyTwo
                ),
                twentyThree: Number(
                  twentyThree === "" ? curMpo[0].schedule.twentyThree : twentyThree
                ),
                twentyFour: Number(
                  twentyFour === "" ? curMpo[0].schedule.twentyFour : twentyFour
                ),
                twentyFive: Number(
                  twentyFive === "" ? curMpo[0].schedule.twentyFive : twentyFive
                ),
                twentySix: Number(
                  twentySix === "" ? curMpo[0].schedule.twentySix : twentySix
                ),
                twentySeven: Number(
                  twentySeven === "" ? curMpo[0].schedule.twentySeven : twentySeven
                ),
                twentyEight: Number(
                  twentyEight === "" ? curMpo[0].schedule.twentyEight : twentyEight
                ),
                twentyNine: Number(
                  twentyNine === "" ? curMpo[0].schedule.twentyNine : twentyNine
                ),
                thirty: Number(thirty === "" ? curMpo[0].schedule.thirty : thirty),
                thirtyOne: Number(
                  thirtyOne === "" ? curMpo[0].schedule.thirtyOne : thirtyOne
                ),
              },
            });
            setIsErr(false);
            setMsg("Document updated successfully");
            setTimeout(() => {
              setMsg("");
            }, 1000);
            setTimeout(() => {
              location.reload();
            }, 2000)
          } catch (error) {
            setMsg("Error updating document: ", error.message);
          }
        } else {
          setMsg("Nothing Was Changed.");
          setIsErr(true);
          setTimeout(() => {
            setMsg("");
          }, 3000);
          return;
        }
      };
    
      // Function to delete document
      const deleteDocument = async () => {
        if (user.permission === "Guest") {
          return;
        }
    
        try {
          await deleteDoc(doc(db, "MPOS", id));
          setMsg("Delete successful!");
          setTimeout(() => {
            navigate(-1);
          }, 500);
        } catch (error) {
          setMsg("Error deleting document: ", error.msg);
        }
      };
    
      function calcRateTotal(a, b) {
        const calcRate = Math.round(a * b * 100) / 100;
        if (calcRate % 1 !== 0) {
          return calcRate.toLocaleString("en-US");
        } else {
          return `${calcRate.toLocaleString("en-US")}.00`;
        }
      }
    
      function calcVD(a, b) {
        const calcVDAmnt = Math.round((a / 100) * b * 100) / 100;
        if (calcVDAmnt % 1 !== 0) {
          return 'calcVDAmnt.toLocaleString("en-US")';
        } else {
          return `${calcVDAmnt.toLocaleString("en-US")}.00`;
        }
      }
    
      function calcAC(a, b, c, d) {
        const rateTotal = a * b;
        const vdAmount = (c / 100) * rateTotal;
        const rem = rateTotal - vdAmount;
        const calcACAmnt = Math.round((d / 100) * rem * 100) / 100;
        if (calcACAmnt % 1 !== 0) {
          return calcACAmnt.toLocaleString("en-US");
        } else {
          return `${calcACAmnt.toLocaleString("en-US")}.00`;
        }
      }
    
      function calcVatAmount(a, b, c, d, e) {
        const rateTotal = a * b;
        const vdAmount = (c / 100) * rateTotal;
        const rem = rateTotal - vdAmount;
        const acAmount = (d / 100) * rem;
        const rem2 = rem - acAmount;
        const vatAmount = (e / 100) * rem2;
        const calcVatAmnt = Math.round(vatAmount * 100) / 100;
        if (calcVatAmnt % 1 !== 0) {
          return calcVatAmnt.toLocaleString("en-US");
        } else {
          return `${calcVatAmnt.toLocaleString("en-US")}.00`;
        }
      }
    
      function calcLineTotal(a, b, c, d, e) {
        const rateTotal = a * b;
        const vdAmount = (c / 100) * rateTotal;
        const rem = rateTotal - vdAmount;
        const acAmount = (d / 100) * rem;
        const rem2 = rem - acAmount;
        const vatAmount = (e / 100) * rem2;
        const calcLnTotalAmnt = Math.round((vatAmount + rem2) * 100) / 100;
        if (calcLnTotalAmnt % 1 !== 0) {
          return calcLnTotalAmnt.toLocaleString("en-US");
        } else {
          return `${calcLnTotalAmnt.toLocaleString("en-US")}.00`;
        }
      }
    
      function handleDelete() {
        setDeleting(true);
      }
    
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

      const [deleting, setDeleting] = useState(false);
    
      return (
        <>
          {curMpo.length < 1 ? (
            <Loader2 />
          ) : (
            <div className={`relative w-full h-full edit-mpos rounded-[15px] ${deleting ? "p-[20px]" : ""} smooth`}>
              <div className="overflow-y-hidden">
                <div className={`w-full mb-[20px] flex justify-start items-center whitespace-wrap xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}>
                    <div className={`mpHead 2xl:w-[30%] xl:w-[42%] lg:w-[50%] md:w-[60%] w-full p-[10px] border-[1px] border-solid border-white rounded-lg`}>
                        <div className={`text-white flex flex-col gap-[4px]`}>
                            {
                                curMpo.map((mpo) => (
                                    <TopBoxItem key={mpo.id}
                                                agency={mpo.agency} setAgency={setAgency}
                                                mpoNumber={mpo.mpoNumber} setMpoNumber={setMpoNumber}
                                                client={mpo.client} setClient={setClient}
                                                brand={mpo.brand} setBrand={setBrand}
                                                campaign={mpo.campaign} setCampaign={setCampaign}
                                                year={mpo.year} setYear={setsetYear}
                                                month={mpo.month} setMonth={setMonth}
                                                setIsChanged={setIsChanged}
                                                mpoNumberInput={mpoNumber}
                                                agencyInput={agency}
                                                clientInput={client}
                                                brandInput={brand}
                                                campaignInput={campaign}
                                                yearInput={year}
                                                monthInput={month}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-x-auto hideScroll">
                  <table className="w-full">
                    <thead
                        className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
                        style={{ border: "none" }}
                    >
                        <tr className={`xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px] ${theme === "dark" ? "bg-[#0d2547]" : "bg-[#000000]"}`}>
                        <td className="text-left">SN</td>
                        <td className="text-left">Title of Material</td>
                        <td className="text-center">Duration</td>
                        <td className="text-left">Specification</td>
                        <td className="text-center">Spots</td>
                        <td className="text-right">Rate</td>
                        <td className="text-right">Gross Total</td>
                        <td>V.D</td>
                        <td>V.D Amount</td>
                        <td>A.C</td>
                        <td>A.C Amount</td>
                        <td>VAT</td>
                        <td>VAT Amount</td>
                        <td className="text-right">Net Total</td>
                      </tr>
                    </thead>
                    <tbody className="lg:text-[13px] md:text-[12px] sm:text-[10px]">
                      {curMpo.map((mpo) => (
                        <tr
                          key={curMpo.indexOf(mpo)}
                          className={`phdMpoTr main-tr animate__animated animate__fadeInUp xl:text-[11px] lg:text-[10px] md:text-[9px] text-[8px]`}
                        >
                          <td className="border w-[30px] border-black" style={{borderLeft: "none"}}>
                            <TextInput1 type="number" mpoValue={mpo.sn} setValue={setSn} setIsChanged={setIsChanged} align={"left"}/>
                          </td>
                          <td className="border w-[320px] border-black">
                            <TextInput1 type="text" mpoValue={mpo.material} setValue={setMaterial} setIsChanged={setIsChanged} align={"left"}/>
                          </td>
                          <td className="border border-black">
                            <TextInput1 type="text" mpoValue={mpo.duration} setValue={setDuration} setIsChanged={setIsChanged} align={"center"}/>
                          </td>
                          <td className="border w-[320px] border-black">
                            <TextInput1 type="text" mpoValue={mpo.specification} setValue={setSpecification} setIsChanged={setIsChanged} align={"left"}/>
                          </td>
                          <td className="border border-black text-center w-[70px]">
                            {mpo.spots}
                          </td>
                          <td className="border border-black w-[140px]">
                            <TextInput1 type="number" mpoValue={mpo.rate % 1 !== 0 ? mpo.rate.toLocaleString("en-US") : `${mpo.rate.toLocaleString("en-US")}.00`} setValue={setRate} setIsChanged={setIsChanged} align={"right"}/>
                          </td>
                          <td className="border border-black text-right w-[140px]">
                            {calcRateTotal(mpo.spots, mpo.rate)}
                          </td>
                          <td className="border border-black text-center w-[70px]">
                            <TextInput1 type="number" mpoValue={`${mpo.volumeDiscount}%`} setValue={setVolumeDiscount} setIsChanged={setIsChanged} align={"center"}/>
                          </td>
                          <td className="border border-black text-right w-[140px]">
                            {calcVD(mpo.volumeDiscount, mpo.rate * mpo.spots)}
                          </td>
                          <td className="border border-black w-[70px]">
                            <TextInput1 type="number" mpoValue={`${mpo.agencyCommission}%`} setValue={setAgencyCommission} setIsChanged={setIsChanged} align={"center"}/>
                          </td>
                          <td className="border border-black text-right w-[140px]">
                            {calcAC(
                              mpo.spots,
                              mpo.rate,
                              mpo.volumeDiscount,
                              mpo.agencyCommission
                            )}
                          </td>
                          <td className="border border-black w-[70px]">
                            <TextInput1 type="number" mpoValue={`${mpo.vat}%`} setValue={setVat} setIsChanged={setIsChanged} align={"center"}/>
                          </td>
                          <td className="border border-black text-right w-[140px]">
                            {calcVatAmount(
                              mpo.spots,
                              mpo.rate,
                              mpo.volumeDiscount,
                              mpo.agencyCommission,
                              mpo.vat
                            )}
                          </td>
                          <td className="border border-black text-right w-[140px]" style={{borderRight: "none"}}>
                            {calcLineTotal(
                              mpo.spots,
                              mpo.rate,
                              mpo.volumeDiscount,
                              mpo.agencyCommission,
                              mpo.vat
                            )}
                          </td>
                        </tr>
                      ))}
                      {curMpo < 1
                        ? ""
                        : curMpo.map((mpo) => (
                            <tr
                              className="whitespace-nowrap opacity-[0] h-[75px] select-none xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[10px] text-[9px]"
                               key={curMpo.indexOf(mpo)}
                            >
                              <td>{mpos.indexOf(mpo) + 1}</td>
                              <td style={{borderRight: "none"}}>{mpo.material}</td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-center">{mpo.duration}</td>
                              <td style={{borderRight: "none", borderLeft: "none"}} >{mpo.specification}</td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-center">{mpo.spots}</td>
                              <td style={{ textAlign: "right", borderRight: "none", borderLeft: "none" }}>
                                {mpo.rate % 1 !== 0
                                  ? mpo.rate.toLocaleString("en-US")
                                  : `${mpo.rate.toLocaleString("en-US")}.00`}
                              </td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-right">
                                {calcRateTotal(mpo.spots, mpo.rate)}
                              </td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-center">{mpo.volumeDiscount}%</td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-right">
                                {calcVD(mpo.volumeDiscount, mpo.rate * mpo.spots)}
                              </td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-center">
                                {mpo.agencyCommission}%
                              </td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-right">
                                {calcAC(
                                  mpo.spots,
                                  mpo.rate,
                                  mpo.volumeDiscount,
                                  mpo.agencyCommission
                                )}
                              </td>
                              <td style={{borderRight: "none", borderLeft: "none"}} className="text-center">{mpo.vat}%</td>
                              <td className="text-right">
                                {calcVatAmount(
                                  mpo.spots,
                                  mpo.rate,
                                  mpo.volumeDiscount,
                                  mpo.agencyCommission,
                                  mpo.vat
                                )}
                              </td>
                              <td className="text-right" style={{borderRight: "none"}}>
                                {calcLineTotal(
                                  mpo.spots,
                                  mpo.rate,
                                  mpo.volumeDiscount,
                                  mpo.agencyCommission,
                                  mpo.vat
                                )}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-[10px] py-[3px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]"
                    style={{ border: "1px solid white", borderBottom: "1px solid white", borderLeft: "none", borderRight: "none" }}
                >
                    SCHEDULE
                </div>
                <div className="w-full overflow-x-scroll hideScroll">
                  <table className="w-full mt-[20px]">
                    <thead
                        className={`bg-[#000000] h-[20px] border-none font-semibold text-center text-white xl:text-[12px] lg:text-[11px] md:text-[10px] text-[9px]`}
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
                      <tr
                        className="animate__animated animate__slideInUp h-[30px] text-center xl:text-[13px] lg:text-[13px] md:text-[10px] sm:text-[11px] text-[11px]
                        text-white placeholder:xl:text-[13px] placeholder:lg:text-[13px] placeholder:md:text-[10px] placeholder:sm:text-[11px] placeholder:text-[11px]"
                      >
                        <td className="w-full h-full">
                          {/* <p>{value}</p> */}
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.one < 1 ? "" : curMpo[0].schedule.one}`} setValue={setOne} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.two < 1 ? "" : curMpo[0].schedule.two}`} setValue={settwo} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.three < 1 ? "" : curMpo[0].schedule.three}`} setValue={setthree} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.four < 1 ? "" : curMpo[0].schedule.four}`} setValue={setfour} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.five < 1 ? "" : curMpo[0].schedule.five}`} setValue={setfive} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.six < 1 ? "" : curMpo[0].schedule.six}`} setValue={setsix} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.seven < 1 ? "" : curMpo[0].schedule.seven}`} setValue={setseven} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.eight < 1 ? "" : curMpo[0].schedule.eight}`} setValue={seteight} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.nine < 1 ? "" : curMpo[0].schedule.nine}`} setValue={setnine} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.ten < 1 ? "" : curMpo[0].schedule.ten}`} setValue={setten} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.eleven < 1 ? "" : curMpo[0].schedule.eleven}`} setValue={seteleven} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twelve < 1 ? "" : curMpo[0].schedule.twelve}`} setValue={settwelve} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.thirteen < 1 ? "" : curMpo[0].schedule.thirteen}`} setValue={setthirteen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.fourteen < 1 ? "" : curMpo[0].schedule.fourteen}`} setValue={setfourteen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.fifteen < 1 ? "" : curMpo[0].schedule.fifteen}`} setValue={setfifteen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.sixteen < 1 ? "" : curMpo[0].schedule.sixteen}`} setValue={setsixteen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.seventeen < 1 ? "" : curMpo[0].schedule.seventeen}`} setValue={setseventeen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.eighteen < 1 ? "" : curMpo[0].schedule.eighteen}`} setValue={seteighteen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.nineteen < 1 ? "" : curMpo[0].schedule.nineteen}`} setValue={setnineteen} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twenty < 1 ? "" : curMpo[0].schedule.twenty}`} setValue={settwenty} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyOne < 1 ? "" : curMpo[0].schedule.twentyOne}`} setValue={settwentyone} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyTwo < 1 ? "" : curMpo[0].schedule.twentyTwo}`} setValue={settwentytwo} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyThree < 1 ? "" : curMpo[0].schedule.twentyThree}`} setValue={settwentythree} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyFour < 1 ? "" : curMpo[0].schedule.twentyFour}`} setValue={settwentyfour} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyFive < 1 ? "" : curMpo[0].schedule.twentyFive}`} setValue={settwentyfive} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentySix < 1 ? "" : curMpo[0].schedule.twentySix}`} setValue={settwentysix} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentySeven < 1 ? "" : curMpo[0].schedule.twentySeven}`} setValue={settwentyseven} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyEight < 1 ? "" : curMpo[0].schedule.twentyEight}`} setValue={settwentyeight} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.twentyNine < 1 ? "" : curMpo[0].schedule.twentyNine}`} setValue={settwentynine} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full">
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.thirty < 1 ? "" : curMpo[0].schedule.thirty}`} setValue={setthirty} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                        <td className="w-full h-full" style={{borderRight: "none"}}>
                          <TextInput1 type="number" mpoValue={`${curMpo[0].schedule.thirtyOne < 1 ? "" : curMpo[0].schedule.thirtyOne}`} setValue={setthirtyone} setIsChanged={setIsChanged} align={"center"}/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div onClick={() => setDeleting(false)} className={`w-full h-full bg-[#00000098] absolute top-0 left-0 z-20 ${deleting ? "flex items-center justify-center" : "hidden"}`}>
                  <div className="w-[400px] h-[250px] bg-white rounded-xl flex flex-col gap-[10px] items-center justify-center relative">
                    <div className="w-[20px] h-[10px] absolute top-[10px] right-[10px] cursor-pointer">
                      <div className="relative w-full h-full">
                        <div className="w-[60%] h-[2px] absolute rotate-[45deg] bg-gray-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                        <div className="w-[60%] h-[2px] absolute rotate-[-45deg] bg-gray-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                      </div>
                    </div>
                    <div className="w-[50px] h-[50px] rounded-[50%] border-[2px] border-red-500 relative">
                      <div className="w-[60%] h-[2px] absolute rotate-[45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                      <div className="w-[60%] h-[2px] absolute rotate-[-45deg] bg-red-500 rounded-xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"></div>
                    </div>
                    <h1 className="xl:text-[18px] lg:text-[16px] md:text-[15px] text-[13px]">Are You Sure?</h1>
                    <div className="w-[80%] text-center xl:text-[14px] lg:text-[12px] md:text-[11px] text-[9px]">
                      <p>Do you really want to delete this MPO? This action cannot be undone.</p>
                    </div>
                    <div className="w-[60%] flex justify-center items-center gap-[10px]">
                      <button onClick={() => setDeleting(false)} className="w-[40%] h-[30px] bg-gray-500 rounded-lg xl:text-[13px] lg:text-[11px] md:text-[10px] text-[8px] text-white cursor-pointer hover:bg-gray-700 smooth">
                        No
                      </button>
                      <button onClick={deleteDocument} className="w-[40%] h-[30px] bg-red-500 rounded-lg xl:text-[13px] lg:text-[11px] md:text-[10px] text-[8px] text-white cursor-pointer hover:bg-red-700 smooth">
                        Yes
                      </button>
                    </div>
                  </div>
          </div>
    
                {/* <div
                  className={`absolute bg-[#000000b2] w-full h-full ${
                    isActive ? "flex" : "hidden"
                  } items-center justify-center top-0 left-0`}
                >
                  <div className="popUp rounded-xl xl:w-2/6 lg:w-3/6 md:w-4/6 sm:w-5/6 w-5/6 xl:h-3/6 lg:h-3/6 md:h-3/6 sm:h-2/6 h-2/6 bg-gray-300 flex flex-col xl:gap-y-[40px] lg:gap-y-[40px] md:gap-y-[30px] sm:gap-y-[20px] gap-y-[20px] justify-center items-center box-border px-[50px] text-center">
                    <h1 className="font-semibold xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[16px]">
                      {curMpo.length < 1
                        ? ""
                        : `Are you sure you want to delete this line from MPO:
                      ${curMpo[0].mpoNumber}?`}
                    </h1>
                    <div className="flex xl:gap-x-[20px] lg:gap-x-[20px] md:gap-x-[15px] sm:gap-x-[10px] gap-x-[10px]">
                        <button
                          onClick={handleNo}
                          className="animate__animated animate__rubberBand bg-red-500 px-[20px] py-[6px] rounded-[10px] mt-[10px] text-white
                          xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[11px] text-[11px] font-medium"
                        >
                          No
                        </button>
                        <button
                          onClick={deleteDocument}
                          className="animate__animated animate__rubberBand bg-blue-500 px-[20px] py-[6px] rounded-[10px] mt-[10px] text-white
                          xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[11px] text-[11px] font-medium"
                        >
                          Yes
                        </button>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="flex items-center xl:gap-x-[20px] lg:gap-x-[20px] md:gap-x-[15px] sm:gap-x-[15px] gap-x-[15px] mt-[20px]">
                <div className="xl:w-[22px] lg:w-[20px] md:w-[18px] w-[16px] mt-[5px]">
                    <img onClick={handleSubmit} src={saveIcon} alt="save Icon" className={`w-full h-auto ${
                        curMpo.length < 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}/>
                </div>
                <div className="xl:w-[22px] lg:w-[20px] md:w-[18px] w-[16px] mt-[5px]">
                    <img onClick={handleDelete} src={trashIcon} alt="delete Icon" className={`w-full h-auto ${
                        curMpo.length < 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}/>
                </div>
              </div>
              <div className={`shadow-lg shadow-[#00000080] ${msg !== "" ? "flex" : "hidden"} animate__animated animate__fadeInRight items-center justify-center p-[20px] smooth bg-white absolute left-[50%] translate-x-[-50%] bottom-[60px] rounded-lg`}>
                <p style={{ color: `${isErr ? "red" : "green"}` }} className={`${isErr ? "text-red-600" : "text-green-600"} text-white xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[11px] text-[10px]`}>
                    {msg}
                </p>
              </div>
              <div></div>
            </div>
          )}
        </>
      );
}

export default EditMpo;

const TextInput1= ({setIsChanged, mpoValue, setValue, type, align}) => {
    const [inputIsActive, setInputIsActive] = useState();

    return <>
        <input 
            type={type}
            placeholder={`${inputIsActive ? "" : mpoValue}`}
            onFocus={() => setInputIsActive(true)}
            onBlur={() => setInputIsActive(false)}
            onChange={(e) => {
                  setValue(e.target.value);
                  setIsChanged(true);
            }}
            style={{textAlign: align}}
            className={`w-full text-blue-400 rounded-sm placeholder-white outline-none`}
        />
    </>
}

const TopBoxItem = (prop) => {
    return <>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>MPO NO:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.mpoNumber} setValue={prop.setMpoNumber} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>AGENCY:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.agency} setValue={prop.setAgency} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>CLIENT:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.client} setValue={prop.setClient} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>BRAND:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.brand} setValue={prop.setBrand} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>CAMPAIGN:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.campaign} setValue={prop.setCampaign} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>YEAR:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.year} setValue={prop.setYear} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
        <div className="w-full flex items-center gap-[2px]">
            <div className="uppercase"><b>MONTH:</b></div>
            <div className="w-5/6 text-left"><TextInput1 mpoValue={prop.month} setValue={prop.setMonth} setIsChanged={prop.setIsChanged} type="text" align={"left"}/></div>
        </div>
    </>
}