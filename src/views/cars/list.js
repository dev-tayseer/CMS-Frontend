import React, { useState, useEffect , useContext, useRef  } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";

import FileUploaderSingle from "../components/FileUploaderSingle"
import ConfirmAction from "../components/Modals/ConfirmAction"
import UploadWithHtmlBody from "../components/Modals/UploadWithHtmlBody"
import UploadWithHtmlBodyV2 from  "../components/Modals/UploadWithHtmlBodyV2"
import AlertElement from "../components/AlertElement"
import CarInfo1 from "../components/cars/CarInfo1"
import Modal from 'react-bootstrap/Modal'
import { useNavigate  } from "react-router-dom"



// //////////////////////////////////////////////////

import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableServerSide from './TableServerSide'
import axios from 'axios'
import { Button, Label, Input, Row, Col, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import AsyncSelect from 'react-select/async'
// ** Third Party Components
import toast from 'react-hot-toast'

import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2, Collapse } from '../components/icons/all_icons'
import { selectThemeColors } from '@utils'
export let store
export let data
import themeConfig from "@configs/themeConfig";
import { Navigate } from 'react-router-dom';
import { constants } from 'crypto-browserify';

const domain_url = themeConfig.url
const Car_list = () => {

  const [uploadModal, setUploadFormModal] = useState(false)
  const [modal_animation, setModal_animation] = useState(true)
  
  const [uploadCertificateModal, setUploadCertificateFormModal] = useState(false)
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  
  const [query_companies, setQuery_Companies] = useState(null)
  const [car_id, setCar_id] = useState(null)
  const [company_id, setCompany_id] = useState({
    id:'',
    value:'الشركة',
    label:'الشركة'
  })
  const [files, setFiles] = useState([])
  const [filesCertificate, setFilesCertificate] = useState([])
  const [t_toast_loader, setT_toast_loader] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")

  
  const [modalPlate_num, setModalPlate_num] = useState("")
  const [modalChasis_num, setModalChasis_num] = useState("")
  const [modalPlate_num_en, setModalPlate_num_en] = useState("")
  const [modalChasis_num_en, setModalChasis_num_en] = useState("")
  const [showConfirmUpload, setShowConfirmUpload] = useState(false)
  const [activationStatues2, setActivationStatues2] = useState(false)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()


  

  ///////// function to access data from child component tableserverside  to that parent component cars_list


  const [start, setStart] = useState("")
  const [draw, setDraw] = useState("")
  const [length, setLength] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [statuesId, setStatuesId] = useState("")
  const [excution_type, setExcution_type] = useState("")
  const [typeId, setTypeId] = useState("")
  const [from_date, setFrom_date] = useState("")
  const [to_date, setTo_date] = useState("")

  const [companySearchText, setCompanySearchText] = useState("")



    const getStart = (start) =>{
        console.log(start,"start")
        setStart(start)
    }

    const getDraw = (draw) =>{
      console.log(draw,"draw")
      setDraw(draw)
    }

    const getLength = (length) =>{
      console.log(length,"length")
      setLength(length)
    }

    const getCompanyId = (companyId) =>{
      console.log(companyId,"companyId")
      setCompanyId(companyId)
    }

    const getStatuesId = (statuesId) =>{
      console.log(statuesId,"statuesId")
      setStatuesId(statuesId)
    }

    const getExcution_type = (excution_type) =>{
      console.log(excution_type,"excution_type")
      setExcution_type(excution_type)
    }

    const getTypeId = (typeId) =>{
      console.log(typeId,"typeId")
      setTypeId(typeId)
    }

    const getFrom_date = (from_date) =>{
      console.log(from_date,"from_date")
      setFrom_date(from_date)
    }

    const getTo_date = (to_date) =>{
      console.log(to_date,"to_date")
      setTo_date(to_date)
    }
    

    
    let search_key = ""

    

  ////////


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
     setTitleAlert("تم إضافة المركبة بنجاح.")
     setHeadAlert("")
     setShowAlert(true)
   } else if (success === "edited") {
    setTypeAlert("Success")
    setTitleAlert("تم تعديل بيانات المركبة بنجاح.")
    setHeadAlert("")
    setShowAlert(true)    
   }
   
  }, [])

  const handleUploadClose = () => setUploadFormModal(false)
  const handleUploadShow = () => setUploadFormModal(true)
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  
  const handleUploadCertificateClose = () => {
    setModal_animation(true)
    setUploadCertificateFormModal(false)
  }
  const handleUploadCertificateShow = () => setUploadCertificateFormModal(true)

  const showUploadCertificate = (id, plate_ar, chasis_num, plate_num_en, chasis_num_en) => {
    
    
    
    let splitted_plate_number_ar = ""
      let splitted_chasis_num_ar = ""
      let splitted_plate_number_en = ""
      let splitted_chasis_num_en = ""
      
      let plate_number = plate_ar.replace('-','');
      let plate_number_en = plate_num_en.replace('-','');
      let lll = plate_number.length
      let lll2 = plate_number_en.length
      splitted_plate_number_ar = `${plate_number[lll-1]} ${plate_number[lll-2]} ${plate_number[lll-3]}`
      splitted_plate_number_en = `${plate_number_en[lll-1]} ${plate_number_en[lll-2]} ${plate_number_en[lll-3]}`

      if(lll == 7) {
        splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]} ${plate_number[3]}`
      } else if(lll == 6) {
        splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]}`
      } else if(lll == 5) {
        splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]}`
      } else {
        splitted_chasis_num_ar = `${plate_number[0]}`
      }


      if(lll2 == 7) {
        splitted_chasis_num_en = `${plate_number_en[0]} ${plate_number_en[1]} ${plate_number_en[2]} ${plate_number_en[3]}`
      } else if(lll2 == 6) {
        splitted_chasis_num_en = `${plate_number_en[0]} ${plate_number_en[1]} ${plate_number_en[2]}`
      } else if(lll2 == 5) {
        splitted_chasis_num_en = `${plate_number_en[0]} ${plate_number_en[1]}`
      } else {
        splitted_chasis_num_en = `${plate_number_en[0]}`
      }
      
    setModalPlate_num(splitted_plate_number_ar)
    setModalChasis_num(splitted_chasis_num_ar)
    setModalPlate_num_en(splitted_plate_number_en)
    setModalChasis_num_en(splitted_chasis_num_en)
    setCar_id(id)
    setFilesCertificate([])
    handleUploadCertificateShow()
  }

  const handleBottomEnd = (filename) => {
    const toast_Data = toast(t1 => (
      <div className='box-toast w-100 container-fluid'>
        <div className="d-flex p-2 pt-2 pb-3">
          <div className="flex-grow-1 m-auto"><span className="f-w-700 w-auto f-s-16px font-Almarai color-1F2733">جاري تحميل المستند</span></div>
          <div className="pe-2 m-auto"><Loader2 width={20} height={20} color='#4788C6' /></div>
        </div>
        <div className="d-flex">
          <div className="pe-2 m-auto"><DocIcon width={40} height={40} color='#F2F7FF' /></div>
          <div className="flex-grow-1 m-auto"><span className="f-w-700 w-auto f-s-16px font-Almarai">{filename}</span></div>
          <div className="m-auto">
            <Button.Ripple color='white' className='btn-icon w-auto' onClick={() => toast.dismiss(t1.id)} >
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

    
    setT_toast_loader(toast_Data)
    return toast_Data

  }

  const handleConfirmCancelUpload = () => {
    setFiles([])
    handleUploadClose()
    setModal_animation(true)
  }

  const handleConfirmCertificateCancelUpload = () => {
    setFilesCertificate([])
    handleUploadCertificateClose()
  }

  const handleDBInputChange_companies = newValue => {
    console.log("chanfing")
    console.log("chamge",newValue)
    search_key = newValue
    // setCompanySearchText(newValue)
    // setQuery_Companies(newValue)
    // console.log(newValue, "Commmmm")
    // console.log(newValue)
    // console.log("Ahmed")
    // setQuery_Companies(newValue)
  }

  // handle selection
  const handleDBChange_companies = (value) => {
    console.log("chanfing")

    console.log("companies", value)
    setCompany_id(value)
    setActivationStatues2(true)
    setModal_animation(false)
  }

  function get_translation_name(reponse) {
    
    if (reponse.translations.length > 1) {
      return reponse.translations[1].name
    } else if (reponse.translations.length === 1) {
      return reponse.translations[0].name
    } else {
      return ""
    }
  }

  const loadOptionsDB_companies = () => {
    console.log("request",companySearchText)

    const token = localStorage.getItem("token")
    console.log("get company ....")
    // console.log(token)
    const config = {
      headers: {
                Authorization: `Bearer ${token}`,
                'app-lng': 'ar'
                }
    }

    return axios.get(`${domain_url}/get-car-companies?search_key=${search_key}`, config, { query_companies }).then(res => {
      
      const reponse = res.data.data.data
      const data = []
      
      for (let i = 0; i < reponse.length; i++) {
        data.push({
          id:reponse[i].id,
          value:get_translation_name(reponse[i]),
          label:get_translation_name(reponse[i])
        })
      }
      // console.log(data)
      return data
    })
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
    setActivationStatues2(true)
    setModal_animation(true)
  }

  function ShowDialogConfirmUpload() {
    setShowConfirmUpload(true)
    setUploadCertificateFormModal(false)
  }
  const handleFileUpload = () => {

    const token = localStorage.getItem("token")
    // console.log(token)
    
    const bodyFormData = new FormData()
    bodyFormData.append('file', files[0])
    bodyFormData.append('company_id', company_id.id)
    if (files.length > 0) {   
        
        handleUploadClose()
        const idToast = handleBottomEnd(files[0].name)   
        axios({
          method: "post",
          url: `${domain_url}/upload-cars-excel-file`,
          data: bodyFormData,
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "app-lng": 'en' 
          }
        })
        .then(function (response) {
          //handle success
          console.log("Check")
          console.log(response.data)
          if(response.data.data.with_errors.length>0) {
            let messageError = ""
            for (let k=0;k<response.data.data.with_errors.length;k++){
              if (k>0) {

                messageError +=", رقم"+response.data.data.with_errors[k]["row number"] 
              }else{

                messageError +="   بالصف رقم"+response.data.data.with_errors[k]["row number"]
              }
              
            }
            console.log(messageError)
            console.log("400 error happened")
            setTypeAlert("Fail")
            setTitleAlert(`${messageError}`)
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          } else {
            console.log("added car")
            setTypeAlert("Success")
            setTitleAlert("تم رفع قائمة المركبات الجديدة بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
            setLoaderShow(false)
          }

         
          toast.dismiss(idToast)
        })
        .catch(function (response) {
          //handle error
          setTypeAlert("Fail")
          setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          
          toast.dismiss(idToast)
        })
    } else {
      setTypeAlert("Fail")
      setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
    handleRemoveAllFiles()
    setCompany_id({
      id:'',
      value:'الشركة',
      label:'الشركة'
    })
  }


  const handleCloseConfirmUpload = () => setShowConfirmUpload(false)
    
  const handleRemoveAllCertificateFiles = () => {
    setFilesCertificate([])
  }
  const handleConfirmUpload = () => {
    setShowConfirmUpload(false)
    const token = localStorage.getItem("token")
    // console.log(token)
    
    const bodyFormData = new FormData()
    bodyFormData.append('file', filesCertificate[0])
    bodyFormData.append('car_request_id', car_id)
    // bodyFormData.append('type', 'collector_execution')
    // bodyFormData.append('title', 'sejel')
    if (filesCertificate.length > 0) {   
        
        handleUploadClose()
        const idToast = handleBottomEnd(filesCertificate[0].name)   
        axios({
          method: "post",
          // url: `${domain_url}/upload-file`,
          url: `${domain_url}/upload-collector-execution-car-request`,
          data: bodyFormData,
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "app-lng": 'en' 
          }
        })
        .then(function (response) {
          //handle success
          console.log("Check")
          console.log(response.data)
          console.log(response.data.status)
          console.log(response.data.status !== 200)
          
          if (response.data.status !== 200) {
            setTypeAlert("Fail")
            setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
          } else {
            console.log(filesCertificate[0].name)
            setTypeAlert("Success")
            setTitleAlert("تم رفع محضر التنفيذ بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
            navigate("/cars")
          }
          
          toast.dismiss(idToast)
        })
        .catch(function (response) {
          //handle error
          setTypeAlert("Fail")
          setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          
          toast.dismiss(idToast)
        })
    } else {
      setTypeAlert("Fail")
      setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
    handleRemoveAllCertificateFiles()


  }
  
  const handleFileCertificateUpload = () => {
    
    setUploadCertificateFormModal(true)
    if (filesCertificate.length > 0) {
      handleUploadCertificateClose()
      handleConfirmUpload()
    }
  }
  
  const ModalCertificateUpload = () => {

    const [activationStatues, setActivationStatues] = useState(false)
    const content =  (
    <div className="container-fluid">
            
      <div className="row p-0 m-0 pt-3">
      <CarInfo1 className="m-auto px-0 row" plate_num={modalPlate_num} chasis_num={modalChasis_num} plate_num_en={modalPlate_num_en} chasis_num_en={modalChasis_num_en} />
      </div>
      <div className="row p-0 m-0 pt-3">
        <FileUploaderSingle setModal_animation={setModal_animation} setActivationStatues={setActivationStatues} handleFileUpload={handleFileCertificateUpload} handleRemoveAllFiles={handleRemoveAllCertificateFiles} files={filesCertificate} setFiles={setFilesCertificate} />
      </div>
    </div>
    )

    return (

      <UploadWithHtmlBodyV2 modal_animation={modal_animation}  activationStatues2={true} activationStatues={activationStatues}  stateShowDialog={uploadCertificateModal} handleCloseConfirm={handleUploadCertificateClose} handleAccept={ShowDialogConfirmUpload} title='تأكيد رفع محضر التنفيذ ' classHeader='background-F2F7FF' accept='رفع المستند' content={content} cancel='إلغاء' btn_color='4788C6'  inactive_color='E0EDFF'/>
    
    )
  }


  const customFilter = (option, searchText) => {
    console.log(searchText,"66666")
    console.log("custime filetr")
    setUploadFormModal(true)
    if (
      option.data.label.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.value.toLowerCase().includes(searchText.toLowerCase())
    ) {
      // setUploadFormModal(true)

      return true;
    } else {
      // setUploadFormModal(true)

      return false;
    }

  };
  
  function action_show_modal() {
    
    setUploadFormModal(!uploadModal)
  }
  const ModalUploadDoc = () => {

    const [activationStatues, setActivationStatues] = useState(false)
    const content =  (
      <div className="container-fluid">
      <div className="row">
        <label className="label-selector">الشركة</label>
        <AsyncSelect
          defaultOptions
          isClearable={false}
          loadingMessage={() => 'searching...'}
          name='db-react-select'
          className='react-select f-w-700 f-s-14px font-Almarai mt-2 w-100 mx-auto'
          classNamePrefix='select-gray'
          placeholder={company_id.label}
          onChange={handleDBChange_companies}
          // isSearchable={true}
          // filterOption={customFilter}
          theme={selectThemeColors}
          loadOptions={loadOptionsDB_companies}
          onInputChange={handleDBInputChange_companies}
        />
      </div>
      <div className="row p-0 m-0 pt-3">
        <FileUploaderSingle setModal_animation={setModal_animation} setActivationStatues={setActivationStatues} handleFileUpload={ShowDialogConfirmUpload} handleRemoveAllFiles={handleRemoveAllFiles} files={files} setFiles={setFiles} />
      </div>
    </div>
    )

    return (

      <UploadWithHtmlBodyV2 modal_animation={modal_animation} activationStatues2={activationStatues2} activationStatues={activationStatues} stateShowDialog={uploadModal} handleCloseConfirm={handleConfirmCancelUpload} handleAccept={handleFileUpload} title='رفع قائمة المركبات ' classHeader='background-F2F7FF' accept='رفع المستند' content={content} cancel='إلغاء' btn_color='4788C6' inactive_color='E0EDFF' />
    
    )
  }

  function exportExcelSample() {
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    // console.log(token)
  
      const headers = {
                 Authorization: `Bearer ${token}`,
                 'app-lng': 'ar'
                }
    
    
   
    axios({
      url: `${domain_url}/export-cars-excel-sample`, //your url
      method: 'GET',
      responseType: 'blob', // important
      headers:headers
  }).then((response) => {
      // create file link in browser's memory
      // console.log(response)
      const href = URL.createObjectURL(response.data);
  
      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'car_sample.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
  
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      setLoaderShow(false)
  });
  
  }

  
  function exportExcelAll(){
    if (companyId === ""){
      console.log("too much")
      setTypeAlert("Fail")
      setTitleAlert("يجب تحديد الشركة.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      return 
    }

    setLoaderShow(true)
    const token = localStorage.getItem("token")
  // console.log(token)

    const headers = {
               Authorization: `Bearer ${token}`,
               'app-lng': 'ar'
              }
  
  
 
  axios({
    url: `${domain_url}/get-cars?from_date=${from_date}&to_date=${to_date}&company_id=${companyId.toString()}&type=${typeId.toString()}&status=${statuesId.toString()}&excution_type=${excution_type.toString()}&start=${((start - 1) * length).toString()}&length=${length}&draw=1&return_excel=1`, //your url
    method: 'GET',
    responseType: 'blob', // important
    headers:headers
}).then((response) => {
    // create file link in browser's memory
    // console.log(response)
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    setLoaderShow(false)
});


  }


  
  return (
    <div className="theme-content px-0 px-md-5">

      <ConfirmAction stateShowDialog={showConfirmUpload} handleCloseConfirm={handleCloseConfirmUpload} handleAccept={handleFileCertificateUpload} title='تأكيد رفع محضر التنفيذ ' classHeader='background-F2F7FF' accept='تأكيد' content='هل انت متأكد ان هذا المستند هو الخاص بهذه المركبة؟' cancel='إلغاء' btn_color='4788C6'/>
    
      <ModalUploadDoc/>

      <ModalCertificateUpload />

      <div className="container-fluid pe-md-5 ps-md-5 pe-1 ps-1">

        <Row className='container-fluid mt-4 row mx-auto d-none d-md-block'>
          <Col className='col-sm-8 col-12 col mx-auto mx-md-0'>
            <Row className='mt-4 row mx-auto'>
              {/* <Col className='d-flex align-items-center justify-content-sm-start p-0 col-5 col-md-auto m-0' >
                <Button.Ripple outline className="button-transparent text-center ps-md-5" href="/Documents">
                  <Settings width={19} height={19} color='#4788C6' />
                  <span className='align-middle ms-25 ps-3' >المستندات</span>
                </Button.Ripple>
              </Col>
              <div className="vr p-0 ms-2"></div> */}

              <Col className='d-flex align-items-center justify-content-sm-start p-0 col-6 col-md-auto m-0'>
                <Button.Ripple outline className="button-transparent text-center"  onClick={() => exportExcelSample()}>
                  <Download width={19} height={19} color='#4788C6' />
                  <span className='align-middle ms-25 ps-3' >تحميل نموذج قائمة المركبات</span>
                </Button.Ripple>
              </Col>
              <div className="vr p-0 ms-2 d-none d-md-block"></div>

              <Col className='d-flex align-items-center justify-content-sm-start p-0 col-5 col-md-auto'>
                <Button.Ripple outline className="button-transparent text-center" onClick={() => action_show_modal()}>
                  <Car width={19} height={19} color='#4788C6' />
                  <span className='align-middle ms-25 ps-3' >رفع قائمة المركبات الجديدة</span>
                </Button.Ripple>
              </Col>
              <div className="vr p-0 ms-2"></div>

              <Col className='d-flex align-items-center justify-content-sm-start p-0 col-6 col-md-auto'>
                <Button.Ripple outline className="button-transparent  text-center" onClick={() => exportExcelAll()}>
                  <Share width={19} height={19} color='#4788C6' />
                  <span className='align-middle ms-25 ps-3' >تصدير تحميل</span>
                </Button.Ripple>
              </Col>
            </Row>
          </Col>
        </Row>


        <div className='  d-block d-md-none'>
        <Row className='container-fluid mt-4 row mx-auto'>
          <Col className='col-10 col-md-6'>
             <Label className='label-color-black f-s-24px font-Almarai  pe-5 ps-3 f-w-800'> قائمة المهام</Label>
          </Col>

          <Col className='col-md-6 col-2 col mx-auto mx-md-0'>
          <UncontrolledButtonDropdown className='dropdown-icon-wrapper' direction='end' isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle className="toggle_menu_options dropdown-toggle-split" caret>
              <Collapse width={15} height={15} color="white"/>
            </DropdownToggle>
            <DropdownMenu>
            <div className='container-fluid toggle_menu_cars'>
              <div className='row m-0 '>
              <div className='col-2 pb-3 d-none' >
                <Settings width={19} height={19} color='#4788C6' />
                 
              </div>
              <div className='col-10 p-0  pb-3 d-none' >
                <Button.Ripple outline className="button-transparent text-start p-0" href="/Documents">
                  <span className='align-middle ms-25 ps-3' >المستندات</span>
                </Button.Ripple>
              </div>

              <div className='col-2 pb-3' >
                <Download width={19} height={19} color='#4788C6' />
                    
              </div>
              <div className='col-10 p-0 pb-3' >

                <Button.Ripple outline className="button-transparent text-start p-0"  onClick={() => exportExcelSample()}>
                
                  <span className='align-middle ms-25 ps-3' >تحميل نموذج قائمة المركبات</span>
                </Button.Ripple>
              </div>
              <div className='col-2 pb-3' >
              <Car width={19} height={19} color='#4788C6' />
            
              </div>
              <div className='col-10 p-0 pb-3' >
              <Button.Ripple outline className="button-transparent text-start p-0" onClick={() => action_show_modal()}>
                  <span className='align-middle ms-25 ps-3' >رفع قائمة المركبات الجديدة</span>
                </Button.Ripple>
              </div>

              <div className='col-2 pb-3' >
              <Share width={19} height={19} color='#4788C6' />
             

              </div>
              <div className='col-10 p-0 pb-3' >
   
              <Button.Ripple outline className="button-transparent  text-start p-0" onClick={() => exportExcelAll()}>
                  <span className='align-middle ms-25 ps-3' >تصدير تحميل</span>
                </Button.Ripple>
              </div>
              </div>
            </div>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
            
          </Col>
        </Row>
        </div>
 
        <div className='container-fluid'>
          <hr></hr>
        </div>

        <Row className='container-fluid mt-4 pe-0'>
        <Col className='col-4 col-md-6'>
             <Label className='label-color-black f-s-24px font-Almarai  pe-5 ps-2 f-w-800'> المركبات</Label>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1  ps-5 col-8  col-md-6 pe-2' sm='2'>
            <Button.Ripple outline className="btn button1 ps-4 pe-4" href="/addCar">
              <span className='align-middle ms-25 pe-4' >إضافة مركبة</span>
              <Car width={19.67} height={13.83} color='white' />
            </Button.Ripple>
          </Col>
        </Row>

        <AlertElement  headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        <div className='container-fluid'>
          <hr></hr>
        </div>

        <TableServerSide showUploadCertificate={showUploadCertificate} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} getStart={getStart} getDraw={getDraw} getLength={getLength} getCompanyId={getCompanyId} getStatuesId={getStatuesId} getExcution_type={getExcution_type} getTypeId={getTypeId} getFrom_date={getFrom_date} getTo_date={getTo_date}  />
      </div>

      
    </div>


  )
}

export default Car_list
