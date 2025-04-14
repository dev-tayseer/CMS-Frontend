import documentIcon from "@src/assets/images/svg/documentIcon.svg"
import iconLoad from "@src/assets/images/svg/iconLoad.svg"
import CarRestoreStatus from "./CarRestoreStatus"
import CarRestoreStatusSejelCertificate from "./CarRestoreStatusSejelCertificate"
import CarRestoreProcedure from "./CarRestoreProcedure"
import CarRestoreDateEntry from "./CarRestoreDateEntry"


function formatTime(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    // minutes = minutes < 10 ? `'0'${minutes}` : minutes  changed to 
    minutes = minutes < 10 ? `0${minutes}` : minutes
    const strTime = `${hours}:${minutes} `
    return strTime
  }
  
  function formatAMPM(date) {
    const hours = date.getHours()
    const ampm = hours >= 12 ? ' pm ' : ' am '
    const strTime = `${ampm}`
    return strTime
  }
  function formatAMPM_arabic(date) {
    const hours = date.getHours()
    const ampm = hours >= 12 ? ' م ' : ' ص '
    const strTime = `${ampm}`
    return strTime
  }

  function reformat_arabic_rtl_date_day_month_year(date_string) {
    try {
      const date_parts = date_string.split("/")
      return date_parts[2] + "/" + date_parts[1] + "/" + date_parts[0] 
    } catch(e) {
      return 'غيرمتاح'
    }
  }
  
function get_date_format(row) {
  
  console.log("Data",row)
    if (row !=null & row !="") {
      const d = row
      const date = new Date(d)
      return (<div className="d-flex">
      <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
      <div></div>
        <div className='ps-1 pe-1'> {formatTime(date)} </div>
      <div>  {formatAMPM_arabic(date)}</div>
    </div>)
     
  } else {
     
    return (<>  غير متاح
        </>)
  }
  }

const CarRestore = ({...params}) => {
    return (
        <>
            <div className="col-lg-3 ">
            <div className="col-12 secondHalfCarData">
                <p className="car-restoring-text px-4 pt-4 pb-2">
                تفاصيل الإستعادة
                </p>
                {/* <CarRestoreStatus label="الحالة" value="تم الإستعادة" type="4"/> */}
                <CarRestoreStatus status={params.status} label="الحالة" /> 
                <CarRestoreStatusSejelCertificate label="محضر التنفيذ" value={params.sejelName} path={params.sejel} length={params.length} />
                <CarRestoreProcedure label="إجراء السحب" name={params.collectorName} date={get_date_format(params.collectorDate)} type="1"/>
                <CarRestoreProcedure label="إجراء الإستعادة" name={params.yardName} date={get_date_format(params.yardDate)} type="1"/>
                <CarRestoreDateEntry label="تاريخ / وقت إدخال المركبة في النظام" date={get_date_format(params.dateEntry)} type="1" />
            </div>
            </div>
        </>
    )
    }
    export default CarRestore