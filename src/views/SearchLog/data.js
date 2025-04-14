// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { Eye, Edit, FileText, Trash2, Loader, Globe } from 'react-feather'
import { Label1, Label2, Label3, LabelIcon1, LabelIcon2, LabelIcon3, LabelIcon4  } from '../components/labels/all_labels'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Loader2, SearchRefraction, CheckVerified, Globel } from '../components/icons/all_icons'

export let data



function get_date(row) {
  return row.created_at
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



function reformat_arabic_rtl_date_day_month_year(date_string) {
  try {
    const date_parts = date_string.split("/")
    return date_parts[2] + "/" + date_parts[1] + "/" + date_parts[0] 
  } catch(e) {
    return 'غيرمتاح'
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
  console.log(time,"**1")

  if (time === null) {
    return ''
  } else {
    // const date = new Date(parseInt(time)) .... this gives wrong date 
    // edited to suit timstamp for unix created date
    const date = new Date(parseInt(time)*1000)

    
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



function handleCellOverflow(cellValue) {
  return false
}

function return_name(row){
  if(row.user == null)
    return null
  else
    return row.user.name
}
function handleCellOverflowValue(cellValue) {
  console.log(cellValue, "123")
  try{
    if(cellValue === "" | cellValue === null){
      return "الموقع"

  } else {
    return cellValue.slice(0,20)

  }
  } catch (e) {
    return "الموقع"
  }

}

function handleCellOverflowValue_total(cellValue) {
  if (cellValue == null | cellValue == ""){

    return "الموقع"
  }else{
    return cellValue
  }
}
// ** Table Common Column
export const columns = ((deleteHandler, viewHandler) => [
  {
    name: 'رقم المركبة',
    minWidth: '20px',
    sortable: row => row.plate_number,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 ps-1 font-Almarai '>
        {row.plate_number}
      </p>
    )
  },
  {
    name: 'الموظف',
    minWidth: '200px',
    sortable: row => return_name(row),
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {return_name(row)}
      </p>
    )
  },
  {
    name: 'الموقع',
    minWidth: '200px',
    sortable: row => row.location_address,
    cell: row => (

      <a className='d-flex align-items-center div_${customer_name[row.id]}' href={`https://maps.google.com/?q=${row.lat},${row.long}`} target="map">
        <div className='user-info text-truncate ms-1'>
        {
          <p class="hovertext table-black-font f-s-12px f-w-400 font-Almarai m-0 px-2 "  data-hover={`${handleCellOverflowValue_total(row.location_address)}`}>
            {`${handleCellOverflowValue(row.location_address)}`}
          </p>

      
        }
        </div>
      </a>
    )
  },
  {
    name: 'التاريخ',
    minWidth: '140px',
    sortable: row => row.phone,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        <GET_TIME_FORMAT2_arabic  time={get_date(row)}/>
      </p>
    )
  },



])
