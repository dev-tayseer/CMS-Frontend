import React, { useState, useEffect, useLayoutEffect } from 'react'
import FileUploaderSingle from "../components/FileUploaderSingle"
import ConfirmAction from "../components/Modals/ConfirmAction"
import UploadWithHtmlBody from "../components/Modals/UploadWithHtmlBody"
import AlertElement from "../components/AlertElement"
import $ from 'jquery'


// //////////////////////////////////////////////////

import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableServerSide from './TableServerSide'
import axios from 'axios'
import { Button, Label, Input, Row, Col } from 'reactstrap'
import AsyncSelect from 'react-select/async'
// ** Third Party Components
import toast from 'react-hot-toast'

import { Plus, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'
import { selectThemeColors } from '@utils'
export let store
export let data

import HomeHeader from "../components/home/HomeHeader"


const Company_list = () => {


  const [uploadModal, setUploadFormModal] = useState(false)
  const [uploadCertificateModal, setUploadCertificateFormModal] = useState(false)
  
  const [query_companies, setQuery_Companies] = useState('')
  const [files, setFiles] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")

  const [companyCount, setcompanyCount] = useState("")


  const [allPermissions, setallPermissions] = useState([])
  const [can_add_company, setcan_add_company] = useState(false)


  
  const [showConfirmUpload, setShowConfirmUpload] = useState(false)

  const handleUploadClose = () => setUploadFormModal(false)

  useEffect(() => {
    const nav_links = document.getElementsByClassName("lnk")
    for (let i = 0; i < nav_links.length; i++) {
      nav_links[i].classList.remove("active")
   }
   const search = window.location.search

   const paramsSuccess = new URLSearchParams(search)
   const success = paramsSuccess.get('success')
   if (success === "added") {
     setTypeAlert("Success")
     setTitleAlert("تم إضافة المدينة بنجاح.")
     setHeadAlert("")
     setShowAlert(true)
   } else if (success === "edited") {
    setTypeAlert("Success")
    setTitleAlert("تم تعديل بيانات المدينة بنجاح.")
    setHeadAlert("")
    setShowAlert(true)
   }

   const checked = paramsSuccess.get('checked')

   if (checked === "confirmed") {
    setTypeAlert("Success")
    setTitleAlert("تم إضافة المدينة إلي القائمة السوداء بنجاح.")
    setHeadAlert("،")
    setShowAlert(true)
  } else if (checked === "canceled") {
   setTypeAlert("Success")
   setTitleAlert("تم إلغاء المدينة من القائمة السوداء بنجاح.")
   setHeadAlert("،")
   setShowAlert(true)    
  }
  else if (checked === "error") {
    setTypeAlert("Fail")
    setTitleAlert("حدث خطأ ما.")
    // setHeadAlert("،")
    setShowAlert(true)    
   }
   

  }, [])


  useEffect(() => {
    if(allPermissions.includes(13)){
      console.log("yes ..........")

      setcan_add_company(true)
    }  else {
      console.log("nooooooooooooooooooo",allPermissions)
    }



  
  }, [allPermissions])

  const handleBottomEnd = (filename) => {
    return toast(t_toast_loader => (
      <div className='box-toast w-100 container-fluid'>
        <div className="d-flex p-2 pt-2 pb-3">
          <div className="flex-grow-1 m-auto"><span className="f-w-700 w-auto f-s-16px font-Cairo color-1F2733">جاري تحميل المستند</span></div>
          <div className="pe-2 m-auto"><Loader2 width={20} height={20} color='#4788C6' /></div>
        </div>
        <div className="d-flex">
          <div className="pe-2 m-auto"><DocIcon width={40} height={40} color='#F2F7FF' /></div>
          <div className="flex-grow-1 m-auto"><span className="f-w-700 w-auto f-s-16px font-Cairo">{filename}</span></div>
          <div className="m-auto">
            <Button.Ripple  color='white' className='btn-icon w-auto' onClick={() => toast.dismiss(t_toast_loader.id)} >
              <CloseIcon width={23} height={23} color='#4D5761' />
            </Button.Ripple>
          </div>
        </div>

      </div>
    ), {
      style: {
        minWidth: '300px'
      },
      position: 'bottom-right',
      duration: Infinity
    })
  }

  const handleConfirmCancelUpload = () => {
    setFiles([])
    handleUploadClose()
  }

  const handleDBInputChange_companies = newValue => {
    setQuery_Companies(newValue)
    // console.log(newValue, "Commmmm")
  }

  // handle selection
  const handleDBChange_companies = (value) => {
    console.log("companies", value)
  }

  const loadOptionsDB_companies = () => {
    return axios.get('/api/select/query_companies', { query_companies }).then(res => {
      return res.data
    })
  }


  const handleFileUpload = () => {

    handleUploadClose()
    if (files.length > 0) {
      console.log(files[0].name)
      handleBottomEnd(files[0].name)
      setTypeAlert("Success")
      setTitleAlert("تم رفع بيانات قائمة الشركات بنجاح.")
      setHeadAlert("")
      setShowAlert(true)
    } else {
      setTypeAlert("Fail")
      setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleCloseConfirmUpload = () => setShowConfirmUpload(false)
  
  const ModalUploadDoc = () => {

    const [activationStatues, setActivationStatues] = useState(false)
    const content =  (
      <div className="container-fluid">
      <div className="row">
        <label className="label-selector">الشركة</label>
        <AsyncSelect
          defaultOptions
          isClearable={false}
          name='db-react-select'
          className='react-select f-w-700 f-s-14px font-Cairo mt-2 w-100 mx-auto'
          classNamePrefix='select-gray'
          placeholder='الشركة'
          onChange={handleDBChange_companies}
          theme={selectThemeColors}
          loadOptions={loadOptionsDB_companies}
          onInputChange={handleDBInputChange_companies}
        />
      </div>
      <div className="row p-0 m-0 pt-3">
        <FileUploaderSingle setModal_animation={true} setActivationStatues={setActivationStatues} handleFileUpload={handleFileUpload} handleRemoveAllFiles={handleRemoveAllFiles} files={files} setFiles={setFiles} />
      </div>
    </div>
    )

    return (

      <UploadWithHtmlBody activationStatues={activationStatues} stateShowDialog={uploadModal} handleCloseConfirm={handleConfirmCancelUpload} handleAccept={handleFileUpload} title='رفع قائمة الشركات ' classHeader='background-F2F7FF' accept='رفع المستند' content={content} cancel='إلغاء' btn_color='4788C6' inactive_color='E0EDFF' />
    
    )
  }

  return (
    <div className="theme-content px-0 px-md-5 ms-xl-5">

      <ConfirmAction stateShowDialog={showConfirmUpload} handleCloseConfirm={handleCloseConfirmUpload} handleAccept={handleFileUpload} title='تأكيد رفع محضر التنفيذ ' classHeader='background-F2F7FF' accept='تأكيد' content='هل انت متأكد ان هذا المستند هو الخاص بهذه الشركة؟' cancel='إلغاء' btn_color='4788C6'/>
    
      <ModalUploadDoc/>

      <div className="container-fluid pe-md-5 ps-md-5 pe-2 ps-1">

        
        <Row className='container-fluid ps-4 pe-md-0 ps-md-0 mt-2'>
          <Col className=' col-xl-6 col-12'>
          <HomeHeader headerContract="المدن" nonext={false}  />
          </Col>
          {can_add_company && (

          
            <Col className='col-xl-6 col-12 d-flex align-items-center justify-content-md-end mt-sm-0 mt-1 pt-xl-5 pt-2  ps-xl-5 ps-2 pe-2' sm='2'>
              <Button.Ripple target='_blank' outline className="btn button1 px-xl-5 py-2" href="/addCities">
                <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >إضافة مدينة</span>
                <Plus className="ps-5" />
              </Button.Ripple>
            </Col>
          )}

          </Row>
          <Row>
        <div className='col-md-12 ps-md-0 ps-4   pe-0 mt-4 d-flex flex-start'>
            <div className='f-w-700 f-s-24px color-5F605F font-cairo '>قائمة المدن</div>
            {/* <div className='d-none ms-3 color-D99F22 f-s-16px f-w-700 background-FFFDF7 px-4 mt-1 py-1 borderRadius-16px'>{companyCount} شركة</div> */}
        </div>
        </Row>
        


        <AlertElement  headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />


        <TableServerSide setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} setcompanyCount={setcompanyCount}  setallPermissions={setallPermissions}  />
      </div>

     
    </div>

 
  )
}

export default Company_list
