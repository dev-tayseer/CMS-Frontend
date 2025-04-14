import React, { useState, useEffect,useContext , useLayoutEffect,useRef } from 'react'
import FileUploaderSingle from "../components/FileUploaderSingle"
import ConfirmAction from "../components/Modals/ConfirmAction"
import UploadWithHtmlBody from "../components/Modals/UploadWithHtmlBody"
import AlertElement from "../components/AlertElement"
import $ from 'jquery'
import Modal from 'react-bootstrap/Modal'
import FormComponent  from '../components/admin/FormComponent'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";




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
import { getData } from './store'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";





const Company_list = () => {


  const [uploadModal, setUploadFormModal] = useState(false)
  const [uploadCertificateModal, setUploadCertificateFormModal] = useState(false)
  
  const [query_companies, setQuery_Companies] = useState('')
  const [files, setFiles] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")
  const [admincount, setadmincount] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [drawData, setDrawData] = useState(1)


  const [allPermissions, setallPermissions] = useState([])
  const [can_show_permissions, setcan_show_permissions] = useState(false)
  const [can_add_admin, setcan_add_admin] = useState(false)




// Add_Contracts_Permetions=20
// view_Permetions_List


  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  const dispatch = useDispatch()

  const navigate = useNavigate();




  function reload_table() {
    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        q: searchValue,
        setLoaderShow:setLoaderShow
      })
    ) 
  }

  

  
  const [showConfirmUpload, setShowConfirmUpload] = useState(false)

  const handleUploadClose = () => setUploadFormModal(false)

  const [selectedRowId, setSelectedRowId] = useState(null)
  const [showEditUser2, setshowEditUser2] = useState(false)

  const ref_clicked = useRef(false)

  

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
     setTitleAlert("تم إضافة الشركة بنجاح.")
     setHeadAlert("")
     setShowAlert(true)
   } else if (success === "edited") {
    setTypeAlert("Success")
    setTitleAlert("تم تعديل بيانات الشركة بنجاح.")
    setHeadAlert("")
    setShowAlert(true)
   }
   

  }, [])


  
  useEffect(() => {


    if(allPermissions.includes(18)){
      setcan_add_admin(true)
    } 

    if(allPermissions.includes(21)){
      setcan_show_permissions(true)
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
            <Button.Ripple color='white' className='btn-icon w-auto' onClick={() => toast.dismiss(t_toast_loader.id)} >
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
  const handleCloseEditUser = () => setshowEditUser2(false)
  const handleEditUser = () => {
    
    const token = localStorage.getItem("token")
    setshowEditUser2(false)
    // axios({
    //   method: "post",
    //   url: `${domain_url}/delete-car-company`,
    //   data: {
    //     car_company_id: selectedRowId
    //   },
    //   headers: { 
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${token}`,
    //     "app-lng": 'en' 
    //   }
    // })
    // .then(function (response) {
    //   //handle success
    //   console.log("Check")
    //   console.log(response.data)
      
    //   if (response.data.status !== 200) {
    //     setTypeAlert("Fail")
    //     setTitleAlert("لم يتم مسح الشركة بشكل صحيح.")
    //     setHeadAlert("حدث خطأ")
    //     setShowAlert(true)
    //     console.log("Check1")
    //   } else {
    //     setTypeAlert("Success")
    //     setTitleAlert("تم مسح الشركة بنجاح.")
    //     setHeadAlert("")
    //     setShowAlert(true)
    //     console.log("Check2")
    //   }
      
    //   reload_table()
    // })
    // .catch(function (response) {
    //   //handle error
    //   console.log(response)
    //   setTypeAlert("Fail")
    //   setTitleAlert("لم يتم مسح الشركة بشكل صحيح.")
    //   setHeadAlert("حدث خطأ")
    //   setShowAlert(true)
    //   console.log("Check1")
    //   reload_table()
    // })

  }
  const editUserRowId = (id) => {
    console.log("edit...........")
    console.log(id,"666")
    ref_clicked.current = true
    setSelectedRowId(id)
    setshowEditUser2(true)
    
  }


  function NavigatePermission(){
    navigate("/permissions")
  }



  const EditUser = () => {
    
    return (<Modal aria-labelledby="contained-modal-title-vcenter" centered show={showEditUser2} onHide={handleCloseEditUser}>
      <Modal.Header className='background-F7FAF7'>
   
      <div className="col-6">
            <p className="modal-text-main2 pt-3">
            إضافة مشرف
            </p>
          </div>
          <div className="col-6 text-end">
            <a onClick={handleCloseEditUser}>
              <CloseIcon width={24} height={24} color='#4D5761' />
            </a>
          </div>
  
      </Modal.Header>
  
          <Modal.Body className='scrollable-user-content'>
          { true && (
              <FormComponent handleCloseEditUser={handleCloseEditUser} RowId={setSelectedRowId} setTypeAlert={setTypeAlert}  setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert}  setShowAlert={setShowAlert} reload_table={reload_table} />
            )
          }
  
          </Modal.Body>
      
  
      </Modal>
      )
  }
  return (
    <div className="theme-content px-0 px-md-5 ms-xl-5">

      <ConfirmAction stateShowDialog={showConfirmUpload} handleCloseConfirm={handleCloseConfirmUpload} handleAccept={handleFileUpload} title='تأكيد رفع محضر التنفيذ ' classHeader='background-F2F7FF' accept='تأكيد' content='هل انت متأكد ان هذا المستند هو الخاص بهذه الشركة؟' cancel='إلغاء' btn_color='4788C6'/>
      <EditUser />
      <ModalUploadDoc/>

      <div className="container-fluid pe-md-5 ps-md-5 pe-1 ps-4">

        
        <Row className='container-fluid pe-0 ps-0 mt-2'>
          <Col className=' col-md-6 col-12'>
          <HomeHeader headerContract="نظام إدارة العقود" headerContractObj="المشرفين" />
          </Col>
          <Col className='col-md-6 col-12  mt-sm-0 mt-1 pt-md-5 pt-2 text-md-end   col-8  col-md-6 ' >

          {can_show_permissions && (
            <Button.Ripple outline className="btn button1 text-center px-5 py-2 me-3" onClick={()=>NavigatePermission()} >
                <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >الصلاحيات </span>
            </Button.Ripple>
          )}

            {can_add_admin && (
              <Button.Ripple outline className="btn button1 px-2 btn-add-admin py-2" onClick={()=>editUserRowId("")} >
                <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >إضافة مشرف</span>
                <Plus className="ps-5" />
              </Button.Ripple>
            )}
          </Col>


        
        <div className='col-md-6 ps-lg-0 ps-3 pe-0 mt-4 d-flex flex-start'>
            <div className='f-w-700 f-s-24px color-5F605F font-cairo '>قائمة المشرفين</div>
            <div className='d-none ms-3 color-D99F22 f-s-16px f-w-700 background-FFFDF7 px-4 mt-1 py-1 borderRadius-16px'>{admincount} مشرف</div>
        </div>
        </Row>


        <AlertElement  headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />


        <TableServerSide setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} setadmincount={setadmincount} ref_clicked={ref_clicked} setallPermissions={setallPermissions} />
      </div>

     
    </div>

 
  )
}

export default Company_list
