// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { EmptyData,Plus } from '../components/icons/all_icons'

import { Button} from 'reactstrap'

const EmptyTable = ({ obj = "" }) => {
  let title = "لا يوجد بيانات متاحة"
  let btn_name = "إضافة عقد"
  let text = "إبدء بإضافة العقود الاّن"
  let path = "/home"
  let show_btn = true
  if (obj == "contract"){
     title = "لا يوجد عقود متاحة"
     btn_name = "إضافة عقد"
     text = "إبدء بإضافة العقود الاّن"
      path = "/addContract"
      show_btn = true
  } else if (obj == "department") {
    title = "لا يوجد إدارات متاحة"
    btn_name = "إضافة إدارة"
    text = "إبدء بإضافة الإدارات الاّن"
     path = "/addDepartment"
     show_btn = true

  }  else if (obj == "contractrental") {
    title = "لا يوجد عقود إيجار متاحة"
    btn_name = "إضافة عقود إيجار"
    text = "إبدء بإضافة عقود إيجار الاّن"
     path = "/addContractRental"
     show_btn = true

  } 

  else if (obj == "contractauction") {
    title = "لا يوجد عقود مزاد متاحة"
    btn_name = "إضافة عقود مزاد"
    text = "إبدء بإضافة عقود مزاد الاّن"
     path = "/addContractAuction"
     show_btn = true

  } 

  else if (obj == "contractNDA") {
    title = "لا يوجد عقود NDA متاحة"
    btn_name = "إضافة عقود NDA"
    text = "إبدء بإضافة عقود NDA الاّن"
     path = "/AddContractNDA"
     show_btn = true

  } 
  
  
  else if (obj == "company") {
    title = "لا يوجد شركات متاحة"
    btn_name = "إضافة شركة"
    text = "إبدء بإضافة الشركات الاّن"
     path = "/addcompany"
     show_btn = true

  } else if (obj == "admin") {
    title = "لا يوجد مستخدمين متاحيين"
    btn_name = "إضافة مستخدم"
    text = "إبدء بإضافة المستخدمين الاّن"
    path = "#"
    show_btn = false
  } else {
    title = "لا يوجد صلاحيات متاحة"
    btn_name = "إضافة صلاحية"
    text = "إبدء بإضافة الصلاحيات الاّن"
    path = "#"
    show_btn = false
  }

// ** State
return (
<div className="container-fluid w-100 p--5 mt-3 mb-5">
  <div className="row w-100 p-lg-5 mt-3 mb-5">
    <EmptyData width={255} height={255}/>
    <div className=' mt-3 color-5F605F f-s-18px f-w-700 text-center'>
      {title}
    </div>
    <div className=' mt-3 color-5F605F f-s-16px f-w-400 text-center'>
          {text}
    </div>
    {show_btn && (
    <div className='mt-3 text-center'>
    <Button.Ripple target='_blank' outline className="btn button1 btn-empty-table px-5 ms-md-3 py-2 " href={path}>
              <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2 mt-2 mt-md-0' >{btn_name} </span>
              <Plus className="ps-5" />
            </Button.Ripple>
    </div>
    )}
  </div>
</div>
)
}

export default EmptyTable