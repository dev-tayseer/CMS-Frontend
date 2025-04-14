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
// import { GET_TIME_FORMAT_arabic } from '../cars/data'

export let data


function formatTime(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? `'0'${minutes}` : minutes
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

export const GET_TIME_FORMAT = (props) => {
  const { time } = props
  console.log(time)
  if (time === null) {
    return ''
  } else {
    const date = new Date((time))
    // console.log(time)
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
            <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
            <div></div>
              <div className='ps-1 pe-1'> {formatTime(date)} </div>
            <div>  {formatAMPM_arabic(date)}</div>
            </div>)
  }
}


export const ACTIVE_INACTIVE = (props) => {
  const { type } = props
  let item = ''
  if (type === '0') {
    item = <Label1 title = 'لم يتم الرد' />
  } else {
    item = <Label2 title = 'تم الرد' />
  }
  return item
}


// ** Table Common Column
export const columns = ((deleteHandler, sendHandler) => [
  {
    name: 'رقم المعرف',
    minWidth: '20px',
    sortable: row => row.id,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400  font-Almarai text-start'>
        {row.id}
      </p>
    )
  },
  {
    name: 'الاسم',
    minWidth: '250px',
    sortable: row => row.name,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai text-start'>
        {row.name}
      </p>
    )
  },
  {
    name: 'البريد الإلكتروني',
    minWidth: '250px',
    sortable: row => row.email,
    cell: row => (
      <p onClick={() => sendHandler(row.id)} className='cursor_hand table-black-font f-s-12px f-w-700 font-Almarai color-4788C6 text-start'>
        {row.email}
      </p>
    )
  },
  {
    name: 'الجوال',
    minWidth: '140px',
    sortable: row => row.phone,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai text-start'>
        {row.phone}
      </p>
    )
  },
  {
    name: 'التاريخ',
    minWidth: '200px',
    sortable: row => row.created_at,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Almarai mb-3 text-start'>
        {/* {row.created_at} */}
        <GET_TIME_FORMAT2_arabic  time={row.created_at}/>
      </div>
    )
  },
  {
    name: 'الرسالة',
    minWidth: '500px',
    sortable: row => row.message,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai text-start'>
        {row.message}
      </p>
    )
  },
  {
    name: 'الحالة',
    minWidth : "150px",
    sortable: row => row.is_reply,
    cell: row => (
      <ACTIVE_INACTIVE type={(row.is_reply)} color="red"/>
    )
  },
  {
    name: <div className="text-end w-100">الإجراءات</div>,
    minWidth: '200px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100'>
          {/* <a className="red-color-icon red-color-icon-h" ><Trash2 size={20} /></a> */}
          <a className="red-color-icon red-color-icon-h ps-2" onClick={() => deleteHandler(row.id)}><Trash2 size={20} /></a>

        </div>
      )
    }
  }
])
