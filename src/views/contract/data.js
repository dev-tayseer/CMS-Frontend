// ** Custom Components
import Avatar from '@components/avatar'
import { Fragment, useState, useEffect, memo, useContext, useImperativeHandle } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";

// ** Third Party Components
import axios from 'axios'
import memoize from 'react-data-table-component'
import { Eye, Edit, FileText, Trash2, Loader, Globe } from 'react-feather'
import { Label1, Label2, Label3, LabelIcon1, LabelIcon2, LabelIcon3, LabelIcon4 } from '../components/labels/all_labels'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Edit3, Trash3, Eye2, Eye3, CalendarPlus, Archive } from '../components/icons/all_icons'
import { min } from 'moment/moment'
import { Form } from 'react-bootstrap';
import themeConfig from "@configs/themeConfig";
import { useNavigate } from "react-router-dom"

const domain_url = themeConfig.url


const main_url = themeConfig.main_url


export let data

export const STATUES_CERTIFICATE = (props) => {
  const { type } = props
  let item = ''
  if (type === 0) {
    item = <Label3 title='مطلوب إرفاق محضر التنفيذ' />
  } else if (type > 0) {
    item = <Label2 title='تم إرفاق المستند' />
  } else {
    item = <Label1 title='غير مطلوب' />
  }
  return item
}

function handle_exception_type(row) {

  try {
    return row.translations[0].type
  } catch (e) {
    try {
      return row.translations[1].type
    } catch (e) {
      return ""
    }
  }
}

function handle_exception(data) {
  try {
    return data
  } catch (e) {
    console.log("Error")
    console.log(e)
    return ""
  }

}

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

export const GET_TIME_FORMAT = (props) => {
  const { time } = props
  console.log(time, "**1")

  if (time === null) {
    return ''
  } else {
    // const date = new Date(parseInt(time)) .... this gives wrong date 
    // edited to suit timstamp for unix created date
    const date = new Date(parseInt(time) * 1000)


    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
      <div className='ps-1 pe-1'>{formatAMPM(date)}</div>
      <div>{formatTime(date)}</div>
      <div className='ps-1 pe-1'>at</div>
      <div>{date.toLocaleDateString()}</div>
    </div>)
  }
}

export const GET_TIME_FORMAT_arabic = (props) => {
  const { time } = props
  console.log(time, "**1")

  if (time === null) {
    return ''
  } else {
    // const date = new Date(parseInt(time)) .... this gives wrong date 
    // edited to suit timstamp for unix created date
    const date = new Date(parseInt(time) * 1000)


    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
      <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
      <div></div>
      <div className='ps-1 pe-1'> {formatTime(date)} </div>
      <div>  {formatAMPM_arabic(date)}</div>
    </div>)
  }
}

export const GET_TIME_FORMAT2 = (props) => {
  const { time } = props

  if (time === null) {
    return ''
  } else {
    const date = new Date((time))
    console.log(time)
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
      <div className='ps-1 pe-1'>{formatAMPM(date)}</div>
      <div>{formatTime(date)}</div>
      <div className='ps-1 pe-1'>at</div>
      <div>{date.toLocaleDateString()}</div>
    </div>)
  }
}

export const GET_TIME_FORMAT2_arabic = (props) => {
  const { time } = props

  if (time === null) {
    return ''
  } else {
    const date = new Date((time))
    console.log(time)
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
      <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
      <div></div>
      <div className='ps-1 pe-1'> {formatTime(date)} </div>
      <div>  {formatAMPM_arabic(date)}</div>
    </div>)
  }
}

export const GET_TIME_FORMAT3 = (props) => {
  const { time } = props
  console.log(time, "***")

  if (time === null) {
    return ''
  } else {
    const date = new Date(parseInt(time))
    console.log(time)
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
      <div className='ps-1 pe-1'>{formatAMPM(date)}</div>
      <div>{formatTime(date)}</div>
      <div className='ps-1 pe-1'>at</div>
      <div>{date.toLocaleDateString()}</div>
    </div>)
  }
}

export const ShapeStatus1 = ({ type }) => {
  console.log(type, type == "1", "hany .......")
  let item = ''
  if (type == "1") {
    item = <div class='px-3 py-1 active-status'>ساري</div>
  }
  else if (type == "2") {
    item = <div class='px-3 py-1 finished-status'>منتهية</div>

  }
  else if (type == "3") {
    item = <div class='px-3 py-1 not-active-status'>غير ساري</div>

  }
  else {
    item = <div class='px-3 py-1 finished-status'></div>

  }
  return item
}

export const ShapeStatusForDate = ({ type, end_date }) => {
  console.log(type, type == "1", "hany .......")
  let item = ''
  if (type == "1") {
    item = <div class=' py-1 active-status text-center'>{end_date}</div>
  }
  else if (type == "2") {
    item = <div class=' py-1 finished-status text-center'>{end_date}</div>

  }
  else if (type == "3") {
    item = <div class=' py-1 not-active-status text-center'> {end_date}</div>

  }
  else {
    item = <div class=' py-1 finished-status text-center'>{end_date}</div>

  }
  return item
}

export const ShapeStatus = ({ type }) => {
  let item = ''
  if (type == "1") {
    item = <div class='px-3 py-1 active-status'>ساري</div>
  }
  else {
    item = <div class='px-3 py-1 finished-status'>غير ساري</div>

  }

  return item
}

export const Splitbyspace2 = ({ value }) => {
  var finalresult = value
  var inputString = value;
  var result = inputString.split(" ");
  console.log(result[0]); // Output: ["-52", "يوم/أيام"]

  if (!isNaN(result[0]) && parseFloat(result[0]) < 0) {
    // Change the sign of result[0]
    result[0] = -parseFloat(result[0]);
    finalresult = result[0] + "- " + result[1]
  }

  return finalresult

}

export const Splitbyspace = ({ value }) => {
  var finalresult = value
  var inputString = value;
  var result = inputString.split(" ");
  console.log(result[0]); // Output: ["-52", "يوم/أيام"]

  if (!isNaN(result[0]) && parseFloat(result[0]) <= 0) {
    // Change the sign of result[0]
    result[0] = -parseFloat(result[0]);
    finalresult = 0 + " " + result[1]
  }

  return finalresult

}



export const RemarkContract = ({ type, Contract_Number, id }) => {
  let item = ''
  if (type == "true") {
    item = <a className='Text-Decoration-None' target='_blank' href={`contractDetails?id=${id}`} > <div class=' py-1 active-status text-center'>{Contract_Number}</div> </a>
  }

  else {
    item = <a className='Text-Decoration-None' target='_blank' href={`contractDetails?id=${id}`} ><div >{Contract_Number}</div> </a>

  }
  return item
}





export const GETCompanyData = ({ type }) => {
  console.log(type, type == "1", "hany .......")
  let item = ''
  if (type == "1") {
    item = <div class='px-3 py-2 active-status'>نشط</div>
  }
  else if (type == "2") {
    item = <div class='px-3 py-2 not-active-status'>غير نشط</div>
  }
  else if (type == "3") {
    item = <div class='px-3 py-2 finished-status'>منتهي</div>
  }
  else {
    item = <div class='px-3 py-2 finished-status'>غير متاح</div>

  }
  return item
}


// function getContractStatus1(row) {
//   console.log(row.status, "statussssssssssssss")
//   try {
//     let Status_of_cont = row.Status_of_cont.id

//     if (Status_of_cont == "1") {
//       return 1
//     } else if (Status_of_cont == "2") {
//       return 2

//     }
//     else if (Status_of_cont == "3") {
//       return 3
//     } else {
//       return 4

//     }
//   } catch (e) {
//     return 4
//   }



//   try {
//     if (row.car_requests != null) {
//       if (row.car_requests.length > 0) {
//         return row.car_requests[0].id
//       } else {
//         return "غير متاح"
//       }
//     } else {
//       return "غير متاح"
//     }
//   } catch (e) {
//     return "غير متاح"
//   }

// }

function getContractStatus(row) {
  console.log(row.status, "statussssssssssssss")
  try {
    let Status_of_cont = row.expired_or_not

    if (Status_of_cont == "1") {
      return 1
    } else {
      return 2

    }

  } catch (e) {
    return 4
  }



}


function get_car_requests_files_length(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].files.length
    } else {
      return null
    }
  } else {
    return null
  }
}

function get_car_requests_collector_id(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].collector.id
    } else {
      return null
    }
  } else {
    return null
  }
}
function get_car_requests_collector_name(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].collector.name
    } else {
      return null
    }
  } else {
    return null
  }
}

function get_car_requests_collector_last_activity(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].created_at
    } else {
      return null
    }
  } else {
    return null
  }
}


function get_car_requests_collector(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].collector
    } else {
      return null
    }
  } else {
    return null
  }
}


function get_car_requests_yard_id(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].yard.id
    } else {
      return null
    }
  } else {
    return null
  }
}
function get_car_requests_yard_name(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].yard.name
    } else {
      return null
    }
  } else {
    return null
  }
}

function get_car_requests_yard_last_activity(row) {
  if (row.car_requests != null) {

    if (row.car_requests.length > 0) {
      if (row.car_requests[0].yard !== null) {
        return row.car_requests[0].footprints.timestamp
      } else {
        return null
      }
    } else {
      return null
    }
  } else {
    return null
  }
}


function get_car_requests_yard(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].yard
    } else {
      return null
    }
  } else {
    return null
  }
}

function reformat_arabic_rtl_date_day_month_year(date_string) {
  try {
    const date_parts = date_string.split("/")
    return date_parts[2] + "/" + date_parts[1] + "/" + date_parts[0]
  } catch (e) {
    return 'غيرمتاح'
  }
}

function get_car_entering_data_arabic(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      const d = row.created_at
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
  } else {
    return null
  }
}
function get_car_entering_data(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      const d = row.created_at
      const date = new Date(d)
      return (<div className="d-flex">
        <div className='ps-1 pe-1'>   {date.toLocaleDateString()}</div>
        <div>at </div>
        <div className='ps-1 pe-1'> {formatTime(date)} </div>
        <div>  {formatAMPM(date)}</div>
      </div>)

    } else {
      return (<>  غير متاح
      </>)
    }
  } else {
    return null
  }
}
function get_car_region(row) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].location_address
    } else {
      return (<>  غير متاح
      </>)
    }
  } else {
    return null
  }
}


function get_car_request_lat(row, index) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[index].lat
    } else {
      return (<>  غير متاح
      </>)
    }
  } else {
    return null
  }
}


function get_car_request_long(row, index) {
  if (row.car_requests != null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[index].long
    } else {
      return (<>  غير متاح
      </>)
    }
  } else {
    return null
  }
}

function get_car_color(row) {
  if (row.car_requests != null) {
    if (row.translations.length > 0) {
      return row.translations[0].color
    } else {
      return (<>  غير متاح
      </>)
    }
  } else {
    return null
  }
}

function get_car_model(row) {
  if (row.car_model != null) {
    return row.car_model.name

  } else {
    return null
  }

}

function get_car_make(row) {
  if (row.car_brand != null) {
    return row.car_brand.name

  } else {
    return null
  }
}
function handlePlate(plate_ar) {
  try {
    let splitted_plate_number_ar = ""
    let splitted_chasis_num_ar = ""

    let plate_number = plate_ar.replace('-', '');
    let lll = plate_number.length
    splitted_plate_number_ar = `${plate_number[lll - 1]} ${plate_number[lll - 2]} ${plate_number[lll - 3]}`

    if (lll == 7) {
      splitted_chasis_num_ar = `${plate_number[3]} ${plate_number[2]} ${plate_number[1]} ${plate_number[0]}`
    } else if (lll == 6) {
      splitted_chasis_num_ar = `${plate_number[2]} ${plate_number[1]} ${plate_number[0]}`
    } else if (lll == 5) {
      splitted_chasis_num_ar = `${plate_number[1]} ${plate_number[0]}`
    } else {
      splitted_chasis_num_ar = `${plate_number[0]}`
    }


    return `${splitted_plate_number_ar} ${splitted_chasis_num_ar} `


  } catch (e) {
    return ""
  }
}

function handlePlateEn(plate_ar) {
  try {
    let splitted_plate_number_ar = ""
    let splitted_chasis_num_ar = ""

    let plate_number = plate_ar.replace('-', '');
    let lll = plate_number.length
    splitted_plate_number_ar = `${plate_number[lll - 3]} ${plate_number[lll - 2]} ${plate_number[lll - 1]}`

    if (lll == 7) {
      splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]} ${plate_number[3]}`
    } else if (lll == 6) {
      splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]}`
    } else if (lll == 5) {
      splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]}`
    } else {
      splitted_chasis_num_ar = `${plate_number[0]}`
    }


    return `${splitted_plate_number_ar} ${splitted_chasis_num_ar} `


  } catch (e) {
    return ""
  }
}

function handleCellOverflow(cellValue) {
  return false


}


function get_request_id(row) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].id
  } else {
    return null
  }
}
function handleCellOverflowValue(cellValue) {
  try {
    return cellValue.slice(0, 20)
  } catch (e) {
    return ""
  }

}


function getCompanyItems_CR_Number(row) {
  try {
    let CR_Number = row.Company_name.CR_Number
    if (CR_Number != null) {
      return CR_Number
    } else {
      return "لايوجد"
    }
  } catch (e) {
    return "لايوجد"
  }
}
function getCompanyItems_Company(row) {
  try {
    let CR_Number = row.Company_name.company_name
    if (CR_Number != null) {
      return CR_Number
    } else {
      return "لايوجد"
    }
  } catch (e) {
    return "لايوجد"
  }
}

function getCompanyItems_Unified_No(row) {
  try {
    let Unified_No = row.Company_name.Unified_No
    if (Unified_No != null) {
      return Unified_No
    } else {
      return "لايوجد"
    }
  } catch (e) {
    return "لايوجد"
  }
}

function getCompanyItems_Email(row) {
  try {
    let Unified_No = row.Company_name.email
    if (Unified_No != null) {
      return Unified_No
    } else {
      return "لايوجد"
    }
  } catch (e) {
    return "لايوجد"
  }
}

function getCompanyItems_Phone(row) {
  try {
    let Unified_No = row.Company_name.phone
    if (Unified_No != null) {
      return Unified_No
    } else {
      return "لايوجد"
    }
  } catch (e) {
    return "لايوجد"
  }
}

function getCity(row) {
  try {
    return row.City
  } catch (e) {
    return "لايوجد"
  }
}

function getDepartment(row) {
  try {
    return row.Department.Department_name

  } catch (e) {
    "لايوجد"
  }
}
function handleChangeCheck(e) {
  // const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  console.log(e.target.checked, "e.target.checked")
  console.log(e.target.id, "e.target.checked")
  // setLoaderShow(true)

  let contract_id = e.target.id.split("_")[0]
  let checked = e.target.checked
  const token = localStorage.getItem("token")

  const bodyFormData = new FormData()

  bodyFormData.append('contract_id', contract_id)
  bodyFormData.append('checked', checked)

  setTimeout(function () {
    if (!checked) {
      window.location.href = '/contracts?checked=canceled'
    } else {
      window.location.href = '/contracts?checked=confirmed'

    }
  }, 500);



  axios({
    method: "post",
    url: `${domain_url}/Contract/StopContractAutoRenewal`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  })
    .then(function (response) {
      console.log("contract.........", response.data.data[0]["updated"])

      if (response.data.data[0]["updated"] == "false") {
        console.log("not 2000")
        // setTypeAlert("Fail")
        // setTitleAlert(`${response.data[0]["message"]}`)

        // setHeadAlert(" حدث خطأ ")
        // setShowAlert(true)
        // setLoaderShow(false)
        // window.location.href = '/contracts?checked=error'

      }



      else {
        // setTypeAlert("Success")
        // setTitleAlert(`تم تعديل التجديد `)
        // setHeadAlert("  " )
        // setShowAlert(true)


        // navigate('/contracts?success=added')
      }

    })
    .catch(function (response) {
      console.log(response, "error")
      // window.location.href = '/contracts?checked=error'

      // setTypeAlert("Fail")
      // setTitleAlert(`لم يتم تعديل التجديد`)
      // setHeadAlert("حدث خطأ")
      // setShowAlert(true)
      // setLoaderShow(false)
    })

}

// function get_allPermissions_table(allPermissions_table,perm_number){
//   console.log(allPermissions_table,"allPermissions_table2")
//   // if(allPermissions_table.)
// }


function get_formatted(val) {

  try {
    const formatter = new Intl.NumberFormat('en-US', {
      // style: 'currency',
      currency: 'USD',

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(parseInt(val))
  } catch (e) {
    console.log(e)
    return val
  }



}
// ** Table Common Column
export const columns = ((deleteHandler, viewHandler, showUploadCertificate, TimeExtensionData, can_edit_contract, can_view_contract, can_delete_contract, can_extend_contract, BillData, setLoaderShow, setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert) => [
  // {
  //   name: '#',
  //   // minWidth: '100px',
  //   sortable: row => row.Contract_Name,
  //   cell: row => (
  //     <p className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       {row.id}
  //     </p>
  // )
  // },
  {
    name: 'رقم العقد',
    minWidth: '150px',
    sortable: row => row.Contract_Number,
    cell: row => (
      <a className=' table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>

        <RemarkContract type={`${row.renewable}`} Contract_Number={`${row.Contract_Number}`} id={`${row.id}`} />

      </a>
    )
  },
  {
    name: 'التاريخ',
    // minWidth: '200px',
    sortable: true,
    cell: row => (
      <div className=' f-s-12px f-w-700 font-Cairo color-5F605F'>
        <div className='mt-1'>{row.Start_Date_of_Contract}</div>
        <div className='mt-1  py-2 w-100px fw-700'>
          <ShapeStatusForDate type={`${getContractStatus(row)}`} end_date={row.End_Date_of_Contract} />

        </div>

      </div>
    )
  },
  // {
  //   name: 'فترة العقد',
  //   // minWidth: '120px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       <div className='mt-2'>{row.Tenure}</div>
  //     </div>
  //   )
  // },
  {
    name: 'الحالة',
    // minWidth: '120px',
    sortable: true,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        <div className='mt-2'>
          <ShapeStatus type={`${getContractStatus(row)}`} />
        </div>
      </div>
    )
  },
  // {
  //   name: 'تاريخ بداية العقد',
  //   // minWidth: '120px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       <div className='mt-2'>
  //         {row.first_start}
  //       </div>
  //     </div>
  //   )
  // },
  {
    name: 'المتبقي على إنتهاء العقد',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        <div className='mt-2'>

          {row.End_Tenure && (

            <Splitbyspace value={row.End_Tenure} />
          )}

          {/* {row.End_Tenure} */}
        </div>
      </div>
    )
  },


  {
    name: 'اسم العقد',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <div className='text-start px-3'>
        <div className='user-info  ms-1'>
          <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
            <a className='Text-Decoration-None' target='_blank' href={`contractDetails?id=${row.id}`} >
              {row.Contract_Name}
            </a>
          </div>
        </div>
      </div>
    )
  },
  {
    name: 'الشركة',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <div className='text-start px-3'>
        <div className='user-info  ms-1'>
          <a className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>

            {`${getCompanyItems_Company(row)}`}
          </a>
        </div>
      </div>
    )
  },
  // {
  //   name: 'بيانات التواصل',
  //   minWidth: '120px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F px-3'>
  //         <div> {`${getCompanyItems_Email(row)}`}</div>
  //         <div className='mt-2 phone-dir'>{`${getCompanyItems_Phone(row)}`}</div>
  //     </div>
  //   )
  // },
  {
    name: 'السجل التجاري',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <a className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F px-3'>
        {`${getCompanyItems_CR_Number(row)}`}


        <div>
          الرقم الموحد :
          <span className='inner-cell-table'>
            {`${getCompanyItems_Unified_No(row)}`}
          </span>
        </div>
      </a>
    )
  },
  {
    name: 'الإدارة',
    // minWidth: '180px',
    sortable: row => row.Contract_Name,
    cell: row => (
      <a className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {`${getDepartment(row)}`}
      </a>
    )
  },







  {
    name: 'المدينة',
    minWidth: '100px',
    sortable: true,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F px-3'>
        <div> {`${getCity(row)}`}</div>
      </div>


    )
  },

  // {
  //   name: 'مجموع الفواتير',
  //   minWidth: '100px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F px-3'>
  //     <div> 

  //     {`${get_formatted(row.get_Contract_Bills_Count)}`}
  //      </div>
  // </div>


  //   )
  // },

  // {
  //   name: 'عدد الفواتير المدفوعة',
  //   minWidth: '150px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F px-3'>
  //     <div> {row.get_Contract_Bills_Paid_Count}</div>
  // </div>


  //   )
  // },

  // {
  //   name: 'الملاحظات',
  //   // minWidth: '350px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       <div className='mt-2'>{row.Note}</div>
  //     </div>
  //   )
  // },
  {
    name: 'نوع العقد',
    // minWidth: '350px',
    sortable: true,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.bill_type && (
          <div className='mt-2'>{row.bill_type.value}</div>

        )}
      </div>
    )
  },

  // {
  //   name: 'نوع التوريد',
  //   // minWidth: '350px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       <div className='mt-2'>{row.tawreed_type}</div>
  //     </div>
  //   )
  // },

  {
    name: 'إلغاء التجديد التلقائي',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <div className='text-end'>
        <label class="switch">
          <input type="checkbox" defaultChecked={row.stop_auto_renewal} id={`${row.id}_check`} onChange={e => handleChangeCheck(e)} />
          <span class="slider round"></span>
        </label>
      </div>
    )
  },
  {
    name: <div className="text-end w-100 last-col">الإجراءات</div>,
    minWidth: '150px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100 last-col'>


          {can_view_contract && (

            <a title='عرض' target='_blank' className="blue-color-icon blue-color-icon-h ps-3" href={`contractDetails?id=${row.id}`}><Eye3 size={20} /></a>
          )}

          {can_edit_contract && (
            <a title='تعديل' target='_blank' className="blue-color-icon blue-color-icon-h ps-3" href={`addContract?id=${row.id}`}><Edit3 size={20} /></a>
          )}

          {can_extend_contract && (


            <a title='تمديد' className="blue-color-icon blue-color-icon-h ps-3" onClick={() => TimeExtensionData(row.id)} ><CalendarPlus size={20}></CalendarPlus></a>
          )}

          {/* {can_extend_contract && (

                  
        <a title='تمديد' className="blue-color-icon blue-color-icon-h ps-3" onClick={() => BillData(row.id)} ><CalendarPlus size={20}></CalendarPlus></a>
        )} */}




          {can_delete_contract && (

            // <a title='حذف' className="blue-color-icon blue-color-icon-h ps-3" onClick={() => deleteHandler(row.id)}> <Archive size={20} />

            <a title='حذف' className="blue-color-icon blue-color-icon-h ps-3" onClick={() => deleteHandler(row.id)}> <Trash3 size={20} />

            </a>
          )}
        </div>
      )
    }
  }

])


// justice get data send message from justice-whatsapp not from sessions to update 