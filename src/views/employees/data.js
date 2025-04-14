// ** Custom Components
import Avatar from '@components/avatar'
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Third Party Components
import axios from 'axios'
import memoize from 'react-data-table-component'
import { Eye, Edit, FileText, Trash2, Loader, Globe } from 'react-feather'
import { Label1, Label2, Label3, LabelIcon1, LabelIcon2, LabelIcon3, LabelIcon4 } from '../components/labels/all_labels'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Loader2, SearchRefraction, CheckVerified, Globel, Location } from '../components/icons/all_icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url
export let data

const  UnVerfiyUser = async (params, domain_url, config, verfiy) => {
  
  if (verfiy) {
    const result = await axios.post(`${domain_url}/user-verify`, params, config)
    console.log(result, "result1")

  } else {
    const result = await axios.post(`${domain_url}/user-disable`, params, config)
    console.log(result, "result2")


  }


}
function get_role_name(row) {
  // console.log(row.role)
  if (row.role != null) {
    if (row.role.translations.length > 1) {
      return row.role.translations[1].name
    } else if (row.role.translations.length > 0) {
      return row.role.translations[0].name
    } else {
      return ""
    }
  } else {
    return ""
  }
  
}
export const ACTIVE_INACTIVE = (props) => {
  const { type } = props
  let item = ''
  if (type === '0') {
    item = <Label1 title = 'غير نشط' />
  } else {
    item = <Label2 title = 'نشط' />
  }
  return item
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

function reformat_arabic_rtl_date_day_month_year(date_string) {
  try {
    const date_parts = date_string.split("/")
    return date_parts[2] + "/" + date_parts[1] + "/" + date_parts[0] 
  } catch(e) {
    return 'غيرمتاح'
  }
}

function get_car_entering_data_arabic(row) {
  
    const d = row.created_at
    // console.log(d, "////")
    const date = new Date(d)
    return (<div className="d-flex">
    <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
    <div></div>
      <div className='ps-1 pe-1'> {formatTime(date)} </div>
    <div>  {formatAMPM_arabic(date)}</div>
  </div>)
    


}


// ** Table Common Column
export const columns = ((deleteHandler, mapHandler, VerifyUser) => [
  {
    name: 'رقم المعرف',
    minWidth : "10px",
    sortable: row => row.id,
    cell: row => (
      <div className='ps-1'>
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.id}
      </p>
      </div>
    )
    
  },
  {
    name: 'الاسم',
    minWidth : "200px",
    sortable: row => row.name,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.name}
      </p>
  )
  },

  {
    name: 'الجوال',
    minWidth : "130px",

    sortable: row => row.phone,
    
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai '>
        {row.phone}
      </p>
    )
  },
  
  {
    name: 'البريد الإلكتروني',
    minWidth : "250px",

    sortable: row => row.email,
    cell: row => (
      <a href={`mailto:${row.email}`} className='cursor_hand mb-3 table-black-font f-s-12px f-w-700 font-Almarai color-4788C6'>
        {row.email}
      </a>
    )
  },
  {
    name: 'الوظيفة',
    minWidth : "150px",
    sortable: row => row.role.name,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {get_role_name(row)}
      </p>
    ) 
  },
  {
    name: 'الحالة',
    minWidth : "150px",
    sortable: row => row.verified,
    cell: row => (
      <ACTIVE_INACTIVE type={(row.verified)} color="red"/>
    )
  },
  {
    name: 'البنك',
    minWidth : "180px",

    sortable: row => row.bank_iban,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.bank_iban}
      </p>
    )
  },
  {
    name: 'رقم الحساب  الدولي (IBAN)',
    minWidth : "200px",
    sortable: row => row.bank_iban,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.bank_iban}
      </p>
  )
  },
  {
    name: 'تاريخ / وقت إنشاء الحساب في النظام',
    minWidth: '300px',
    sortable: row => row.created_at,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {/* {row.created_at} */}
        {get_car_entering_data_arabic(row)}
      </p>
    )
  },
  {
    name: <div className="text-end w-100 pe-4">الإجراءات</div>,
    allowOverflow: true,
    minWidth:'190px',
    cell: row => {
      const [checked, setChecked] = useState(row.verified === "1")
      return (
        <div className='d-block'>
        <div className='d-flex justify-content-end w-100'>
          <label  className="toggle " htmlFor={`myToggle${row.id}`}>
            <input  className="toggle__input" name="" checked={checked} onChange={(e) => {
              
              setChecked(e.target.checked)
                const token = localStorage.getItem("token")
        
              const config = {
                headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
              }
              const params = {phone : `${row.phone}`}
              
              if (e.target.checked) {
                const verfiy = true
                VerifyUser(params, domain_url, config, verfiy, row.role.name)
              } else {
                const verfiy = false
                UnVerfiyUser(params, domain_url, config, verfiy)
                
              }
              // VerifyUser(params, config)

        }}  type="checkbox" id={`myToggle${row.id}`} />
            <div className="toggle__fill"></div>
          </label>
          <a className="blue-color-icon blue-color-icon-h ps-2" onClick={() => mapHandler(row.id)}><Location width="24" height="24" color="none" /></a>
          <a className="blue-color-icon blue-color-icon-h ps-2" href={`addEmployee?id=${row.id}`}><Edit size={20} /></a>
          <a className="red-color-icon red-color-icon-h ps-2" onClick={() => deleteHandler(row.id)}><Trash2 size={20} /></a>
        </div>
        </div>
      )
    }
  }
])
