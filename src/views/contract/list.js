import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";

import FileUploaderSingle from "../components/FileUploaderSingle"
import ConfirmAction from "../components/Modals/ConfirmAction"
import UploadWithHtmlBody from "../components/Modals/UploadWithHtmlBody"
import UploadWithHtmlBodyV2 from "../components/Modals/UploadWithHtmlBodyV2"
import AlertElement from "../components/AlertElement"
import CarInfo1 from "../components/cars/CarInfo1"
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from "react-router-dom"
import HomeHeader from "../components/home/HomeHeader"
import fs from 'fs'
// import { allPermissions } from "@hooks/allPermissions";





// //////////////////////////////////////////////////

import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableServerSide from './TableServerSide'
import axios from 'axios'
import { Button, Label, Input, Row, Col, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import AsyncSelect from 'react-select/async'
// ** Third Party Components
import toast from 'react-hot-toast'

import { Upload, Car, Plus, Settings, Download, Share, CloseIcon, DocIcon, Loader2, DescriptionIcon, Close } from '../components/icons/all_icons'
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
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);

  const [query_companies, setQuery_Companies] = useState(null)
  const [car_id, setCar_id] = useState(null)
  const [company_id, setCompany_id] = useState({
    id: '',
    value: 'الإدارة',
    label: 'الإدارة'
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
  const [ContractCount, setContractCount] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [description_list, setdescription_list] = useState([])




  const [companySearchText, setCompanySearchText] = useState("")
  const [AlertMessage, setAlertMessage] = useState("")
  const [AlertMessageExist, setAlertMessageExist] = useState(false)

  const [allPermissions, setallPermissions] = useState([])
  const [can_add_contract, setcan_add_contract] = useState(false)
  const [can_upload_contract, setcan_upload_contract] = useState(false)



  // const [isDataLoaded, setisDataLoaded] = useState(false)









  const getStart = (start) => {
    console.log(start, "start")
    setStart(start)
  }

  const getDraw = (draw) => {
    console.log(draw, "draw")
    setDraw(draw)
  }

  const getLength = (length) => {
    console.log(length, "length")
    setLength(length)
  }

  const getCompanyId = (companyId) => {
    console.log(companyId, "companyId")
    setCompanyId(companyId)
  }

  const getDepartmentId = (departmentId) => {
    console.log(departmentId, "departmentId")
    setDepartmentId(departmentId)
  }

  const getStatuesId = (statuesId) => {
    console.log(statuesId, "statuesId")
    setStatuesId(statuesId)
  }

  const getExcution_type = (excution_type) => {
    console.log(excution_type, "excution_type")
    setExcution_type(excution_type)
  }

  const getTypeId = (typeId) => {
    console.log(typeId, "typeId")
    setTypeId(typeId)
  }

  const getFrom_date = (from_date) => {
    try {
      console.log(from_date, "from_date ** ")
      let month = from_date.split("/")[0]
      let day = from_date.split("/")[1]
      let year = from_date.split("/")[2]
      let final_from_date = year.toString() + "-" + month.toString() + "-" + day.toString()
      console.log(final_from_date, "final from date")
      setFrom_date(final_from_date)
    }
    catch (e) {
      console.log(e)
      setFrom_date(from_date)
    }
    // 05/17/2023
  }

  const getTo_date = (to_date) => {
    try {
      console.log(to_date, "to_date")
      let month = to_date.split("/")[0]
      let day = to_date.split("/")[1]
      let year = to_date.split("/")[2]
      let final_to_date = year.toString() + "-" + month.toString() + "-" + day.toString()
      setTo_date(final_to_date)

    } catch (e) {
      setTo_date(to_date)

    }
  }



  let search_key = ""



  ////////




  useLayoutEffect(() => {
    // requestPermissions()
  }, []);
  // console.log(allPermissions,"allPermissions")



  useEffect(() => {
    if (allPermissions.includes(6)) {
      setcan_add_contract(true)
    }

    if (allPermissions.includes(2)) {
      setcan_upload_contract(true)
    }


  }, [allPermissions])


  useEffect(() => {

    console.log(allPermissions, "123456")
    const nav_links = document.getElementsByClassName("lnk")
    for (let i = 0; i < nav_links.length; i++) {
      nav_links[i].classList.remove("active")
    }
    const search = window.location.search

    const paramsSuccess = new URLSearchParams(search)
    const success = paramsSuccess.get('success')
    if (success === "added") {
      setTypeAlert("Success")
      setTitleAlert("تم إضافة العقد بنجاح.")
      setHeadAlert("")
      setShowAlert(true)
    } else if (success === "edited") {
      setTypeAlert("Success")
      setTitleAlert("تم تحديث بيانات العقد بنجاح.")
      setHeadAlert("")
      setShowAlert(true)
    }
    const checked = paramsSuccess.get('checked')

    if (checked === "confirmed") {
      setTypeAlert("Success")
      setTitleAlert("تم إيقاف التجديد بنجاح.")
      setHeadAlert("")
      setShowAlert(true)
    } else if (checked === "canceled") {
      setTypeAlert("Success")
      setTitleAlert("تم إلغاء إيقاف التجديد بنجاح.")
      setHeadAlert("")
      setShowAlert(true)
    }
    else if (checked === "error") {
      setTypeAlert("Fail")
      setTitleAlert("حدث خطأ ما.")
      // setHeadAlert("،")
      setShowAlert(true)
    }

    //  requestPermissions()




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

    let plate_number = plate_ar.replace('-', '');
    let plate_number_en = plate_num_en.replace('-', '');
    let lll = plate_number.length
    let lll2 = plate_number_en.length
    splitted_plate_number_ar = `${plate_number[lll - 1]} ${plate_number[lll - 2]} ${plate_number[lll - 3]}`
    splitted_plate_number_en = `${plate_number_en[lll - 1]} ${plate_number_en[lll - 2]} ${plate_number_en[lll - 3]}`

    if (lll == 7) {
      splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]} ${plate_number[3]}`
    } else if (lll == 6) {
      splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]}`
    } else if (lll == 5) {
      splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]}`
    } else {
      splitted_chasis_num_ar = `${plate_number[0]}`
    }


    if (lll2 == 7) {
      splitted_chasis_num_en = `${plate_number_en[0]} ${plate_number_en[1]} ${plate_number_en[2]} ${plate_number_en[3]}`
    } else if (lll2 == 6) {
      splitted_chasis_num_en = `${plate_number_en[0]} ${plate_number_en[1]} ${plate_number_en[2]}`
    } else if (lll2 == 5) {
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
    console.log("chamge", newValue)
    search_key = newValue

  }

  // handle selection
  const handleDBChange_companies = (value) => {
    console.log("chanfing2")

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
    console.log("request", companySearchText)

    const token = localStorage.getItem("token")
    console.log("get company ....")
    // console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    return axios.get(`${domain_url}/Contract/dropdowndata?search_key=${search_key}`, config, { query_companies }).then(res => {
      console.log(res.data.Departments, "***** depa")
      const reponse = res.data.Departments
      const data = []

      for (let i = 0; i < reponse.length; i++) {
        console.log(reponse[i].Dep_Name, "--*-*-*")
        data.push({
          id: reponse[i].id,
          value: reponse[i].Dep_Name,
          label: reponse[i].Dep_Name
        })
      }
      console.log(data, "66...............")
      return data
    })
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
    setActivationStatues2(true)
    setModal_animation(true)
  }

  function ShowDialogConfirmUpload() {
    console.log("clicked ..")
    setShowConfirmUpload(true)
    setUploadCertificateFormModal(false)
  }
  const handleFileUpload = () => {
    // mmmmmmmmmmmmmm
    console.log("upload ing ...")

    const token = localStorage.getItem("token")

    // start
    var data = new FormData();
    data.append('file1', files[0]);
    console.log("id  ", company_id.id)
    data.append('id', company_id.id)

    var config = {
      method: 'post',
      url: `${domain_url}/Contract/Upload/`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {

        try {
          // xxxxxxxxxxxxxxx
          if (response.data[0].vaild == 0) {
            console.log(response.data[0].Fail, "there")
            setAlertMessage(response.data[0].Fail)
            setAlertMessageExist(true)
            // setTypeAlert("Fail")
            // setTitleAlert(response.data[0].Fail)

            // setHeadAlert(" ،حدث خطأ ")
            // setShowAlert(true)
            // handleCloseConfirmUpload
            // handleCloseConfirm(false)
            setLoaderShow(false)
            // setFiles([])
            // handleUploadClose()
            // setModal_animation(false)
            //  handleUploadClose()
            //  handleUploadShow() 
            // setModal_animation(true)
            // setUploadCertificateFormModal(true)
            return false
          } else if (response.data[0].vaild == 1) {
            setAlertMessage("")
            setAlertMessageExist(false)

            setTypeAlert("Success")
            setTitleAlert(response.data[0].Success)

            setHeadAlert(" ، ")
            setShowAlert(true)
            setLoaderShow(false)
            // handleCloseConfirmUpload(true)
            // handleCloseConfirm(true)
            setFiles([])
            handleUploadClose()
            setModal_animation(false)
          }
        } catch (e) {
          console.log(":catch1")
          if (response.data.vaild == 2) {
            setFiles([])
            handleUploadClose()
            setModal_animation(false)

            // setTypeAlert("Fail")
            let obj = {
              "invalid_con_number": "أرقام العقود غير صحيحة",
              "empty": "بيانات ناقصة",
              "comp_problem": "بيانات الشركة",
              "unifed_proble": "الرقم الموحد",
              "status_problem": "حالة العقد",
              "dates_problem": "التواريخ ",
              "file_problem": "رقم الملف",
              "dublecate_cont_number": "عقود موجودة من قبل"
            }
            let dublecate_cont_number = response.data.dublecate_cont_number.length > 0

            let invalid_con_number = response.data.invalid_con_number.length > 0
            let empty = response.data.empty.length > 0
            let comp_problem = response.data.comp_problem.length > 0
            let unifed_proble = response.data.unifed_proble.length > 0
            let status_problem = response.data.status_problem.length > 0
            let dates_problem = response.data.dates_problem.length > 0
            let file_problem = response.data.file_problem.length > 0

            let alert_message = ""

            if (dublecate_cont_number) { alert_message += `${obj["dublecate_cont_number"]} [ ${response.data.dublecate_cont_number} ]` }
            if (invalid_con_number) { alert_message += `${obj["invalid_con_number"]} [ ${response.data.invalid_con_number} ]` }
            if (empty) { alert_message += `${obj["empty"]} [ ${response.data.empty} ]` }
            if (comp_problem) { alert_message += `${obj["comp_problem"]} [ ${response.data.comp_problem} ]` }
            if (unifed_proble) { alert_message += `${obj["unifed_proble"]} [ ${response.data.unifed_proble} ]` }
            if (status_problem) { alert_message += `${obj["status_problem"]} [ ${response.data.status_problem} ]` }
            if (dates_problem) { alert_message += `${obj["dates_problem"]} [ ${response.data.dates_problem} ]` }
            if (file_problem) { alert_message += `${obj["file_problem"]} [ ${response.data.file_problem} ]` }

            console.log("here ", ` لم يتم رفع العقود الأتية بسبب: ${alert_message}`)

            // setAlertMessage(` لم يتم رفع العقود الأتية بسبب: ${alert_message}`)
            // setAlertMessageExist(true)
            setAlertMessage("")
            setAlertMessageExist(false)
            setTitleAlert(alert_message)
            // setTitleAlert(response.data[0].Fail)

            setHeadAlert(" لم يتم رفع العقود الأتية بسبب: ")
            setShowAlert(true)
            setLoaderShow(false)
            // handleCloseConfirmUpload(false)
            // setShowConfirmUpload(fal)
            // return true

          }
        }


      })
      .catch(function (error) {
        console.log(error, "catch")
        // setTypeAlert("Fail")
        // setTitleAlert(`في رفع الملف`)

        // setHeadAlert(" ،حدث خطأ ")
        // setShowAlert(true)
        setAlertMessage("،حدث خطأ في رفع الملف ")
        setAlertMessageExist(true)
        // return false
        // setLoaderShow(false)
      });

    // end start
    // console.log(token)

    // const bodyFormData = new FormData()
    // bodyFormData.append('file', files[0])
    // bodyFormData.append('company_id', company_id.id)
    // if (files.length > 0) {   

    //     handleUploadClose()
    //     const idToast = handleBottomEnd(files[0].name)   
    //     axios({
    //       method: "post",
    //       url: `${domain_url}/upload-cars-excel-file`,
    //       data: bodyFormData,
    //       headers: { 
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${token}`,
    //         "app-lng": 'en' 
    //       }
    //     })
    //     .then(function (response) {
    //       //handle success
    //       console.log("Check")
    //       console.log(response.data)
    //       if(response.data.data.with_errors.length>0) {
    //         let messageError = ""
    //         for (let k=0;k<response.data.data.with_errors.length;k++){
    //           if (k>0) {

    //             messageError +=", رقم"+response.data.data.with_errors[k]["row number"] 
    //           }else{

    //             messageError +="   بالصف رقم"+response.data.data.with_errors[k]["row number"]
    //           }

    //         }
    //         console.log(messageError)
    //         console.log("400 error happened")
    //         setTypeAlert("Fail")
    //         setTitleAlert(`${messageError}`)
    //         setHeadAlert("حدث خطأ")
    //         setShowAlert(true)
    //         setLoaderShow(false)
    //       } else {
    //         console.log("added car")
    //         setTypeAlert("Success")
    //         setTitleAlert("تم رفع قائمة المركبات الجديدة بنجاح.")
    //         setHeadAlert("")
    //         setShowAlert(true)
    //         setLoaderShow(false)
    //       }


    //       toast.dismiss(idToast)
    //     })
    //     .catch(function (response) {
    //       //handle error
    //       setTypeAlert("Fail")
    //       setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
    //       setHeadAlert("حدث خطأ")
    //       setShowAlert(true)

    //       toast.dismiss(idToast)
    //     })
    // } else {
    //   setTypeAlert("Fail")
    //   setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
    //   setHeadAlert("حدث خطأ")
    //   setShowAlert(true)
    // }
    // handleRemoveAllFiles()
    // setCompany_id({
    //   id:'',
    //   value:'الشركة',
    //   label:'الشركة'
    // })
  }


  const handleCloseConfirmUpload = () => setShowConfirmUpload(false)

  const handleRemoveAllCertificateFiles = () => {
    setFilesCertificate([])
  }
  const handleConfirmUpload = () => {
    console.log("here")
    setShowConfirmUpload(false)
    const token = localStorage.getItem("token")
    // console.log(token)


    // const bodyFormData = new FormData()
    // bodyFormData.append('file', filesCertificate[0])
    // bodyFormData.append('car_request_id', car_id)
    // bodyFormData.append('type', 'collector_execution')
    // bodyFormData.append('title', 'sejel')
    if (filesCertificate.length > 0) {

      //// start

      var FormData = new FormData();
      var data = new FormData();
      bodyFormData.append('file', filesCertificate[0])

      data.append('file1', fs.createReadStream(filesCertificate[0]));

      var config = {
        method: 'post',
        url: `${domain_url}/Contract/Upload/`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data), "upload");
        })
        .catch(function (error) {
          console.log(error);
        });

      // end 

      handleUploadClose()
      // start old
      // const idToast = handleBottomEnd(filesCertificate[0].name)   
      // axios({
      //   method: "post",
      //   // url: `${domain_url}/upload-file`,
      //   url: `${domain_url}/upload-collector-execution-car-request`,
      //   data: bodyFormData,
      //   headers: { 
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //     "app-lng": 'en' 
      //   }
      // })
      // .then(function (response) {
      //   //handle success
      //   console.log("Check")
      //   console.log(response.data)
      //   console.log(response.data.status)
      //   console.log(response.data.status !== 200)

      //   if (response.data.status !== 200) {
      //     setTypeAlert("Fail")
      //     setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
      //     setHeadAlert("حدث خطأ")
      //     setShowAlert(true)
      //   } else {
      //     console.log(filesCertificate[0].name)
      //     setTypeAlert("Success")
      //     setTitleAlert("تم رفع محضر التنفيذ بنجاح.")
      //     setHeadAlert("")
      //     setShowAlert(true)
      //     navigate("/cars")
      //   }

      //   toast.dismiss(idToast)
      // })
      // .catch(function (response) {
      //   //handle error
      //   setTypeAlert("Fail")
      //   setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
      //   setHeadAlert("حدث خطأ")
      //   setShowAlert(true)

      //   toast.dismiss(idToast)
      // })
      // end start old
    } else {
      setTypeAlert("Fail")
      setTitleAlert("لم يتم رفع البيانات بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
    handleRemoveAllCertificateFiles()


  }

  const handleFileCertificateUpload = () => {
    console.log("handleFileCertificateUpload")
    setUploadCertificateFormModal(true)
    if (filesCertificate.length > 0) {
      handleUploadCertificateClose()
      handleConfirmUpload()
    }
  }

  const ModalCertificateUpload = () => {

    const [activationStatues, setActivationStatues] = useState(false)
    const content = (
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

      <UploadWithHtmlBodyV2 modal_animation={modal_animation} activationStatues2={true} activationStatues={activationStatues} stateShowDialog={uploadCertificateModal} handleCloseConfirm={handleUploadCertificateClose} handleAccept={ShowDialogConfirmUpload} title='تأكيد رفع محضر التنفيذ ' classHeader='background-F2F7FF' accept='رفع المستند' content={content} cancel='إلغاء' btn_color='4788C6' inactive_color='E0EDFF' />

    )
  }


  const customFilter = (option, searchText) => {
    console.log(searchText, "66666")
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
    const content = (
      <div className="container-fluid">
        {/* {AlertMessageExist && (
          AlertMessage
        )} */}

        {AlertMessageExist && (
          <div class="alert alert-dark" role="alert">
            {AlertMessage}
          </div>
        )}
        <div className="row mb-3">
          <label className="color-5F605F f-w-700 f-s-16px ">الإدارة</label>
          <AsyncSelect
            defaultOptions
            isClearable={false}
            loadingMessage={() => 'searching...'}
            name='db-react-select'
            className='react-select  select-company f-w-700 color-5F605F f-s-14px  font-Cairo mt-2 w-100 mx-auto'
            classNamePrefix='select-gray '
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

      <UploadWithHtmlBodyV2 modal_animation={modal_animation} activationStatues2={activationStatues2} activationStatues={activationStatues} stateShowDialog={uploadModal} handleCloseConfirm={handleConfirmCancelUpload} handleAccept={handleFileUpload} title='رفع قائمة عقود جديدة ' classHeader='' accept='رفع المستند' content={content} cancel='إلغاء' btn_color='4788C6' inactive_color='E0EDFF' />

    )
  }

  function exportExcelSample() {
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    var config = {
      method: 'get',
      responseType: 'blob',
      url: `${domain_url}/Contract/Download`,
      headers: {
        'Authorization': `Bearer ${token}`,

      }
    };

    axios(config)
      .then(function (response) {
        console.log(response, "excell")
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `ContractSample.xlsx`);
        document.body.appendChild(link);
        link.click();
        setLoaderShow(false)

      })
      .catch(function (error) {
        console.log(error);
      });



  }







  function exportExcelAll() {
    if (companyId === "") {
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
      headers: headers
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



  const [show_Modal, setShow_Modal] = useState(false)
  const [mobileNav, setMobileNav] = useState(true)

  const handleClose = () => setShow_Modal(false)
  const handleShowDescription = () => {


    var config = {
      method: 'get',
      url: `${domain_url}/Contract/description`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(response.data[0].body, "bdy")
        setdescription_list(response.data)
        setShow_Modal(true)
      })
      .catch(function (error) {
        console.log(error);
        setdescription_list([])
        setShow_Modal(true)
      });



  }
  // const handleConfirmLogout = () => {
  //   console.log("yeeeeeeeeeeee")
  //   localStorage.removeItem("token")
  //   navigate('/Login')
  // }
  const ShowDescription = () => {
    return (
      <>
        <Modal show={show_Modal} onHide={handleClose}>
          <Modal.Header className='background-F7FAF7'>

            <div className="col-6">
              <p className="modal-text-main pt-3">
                طريقة ملئ نموذج العقود
              </p>
            </div>
            <div className="col-6 text-end">
              <a onClick={handleClose}>
                <Close width={24} height={24} color='none' />
              </a>
            </div>

          </Modal.Header>

          <Modal.Body className='description-modal'>
            {description_list.map(function (object, i) {
              let body = []
              try {
                body = object.body[0]
              } catch (e) {
                body = []
              }

              return (
                <div className="row mt-3 px-3">
                  <div className='mt-2 f-w-700 f-s-16 color-5F605F'>{object.Tittel}</div>
                  {body.map(function (obj, i) {
                    return (
                      <div className='mt-2 f-w-400 f-s-16 color-5F605F'>
                        {obj}
                      </div>
                    )
                  })}
                </div>
              )
            })}





          </Modal.Body>


        </Modal>



      </>

    );

  }

  return (
    <div className="theme-content px-0 px-md-5">

      <ShowDescription />

      <ConfirmAction stateShowDialog={showConfirmUpload} handleCloseConfirm={handleCloseConfirmUpload} handleAccept={handleFileCertificateUpload} title='تأكيد رفع محضر التنفيذ ' classHeader='background-F2F7FF' accept='تأكيد' content='هل انت متأكد ان هذا المستند هو الخاص بهذه المركبة؟' cancel='إلغاء' btn_color='4788C6' />

      <ModalUploadDoc />

      <ModalCertificateUpload />

      <div className="container-fluid pe-md-5 ps-md-5 pe-1 ps-1">


        <Row className='container-fluid ps-3 pe-md-0 ps-md-0 mt-2'>
          <Col className=' col-xl-5 col-12'>
            <HomeHeader headerContract="نظام إدارة العقود" headerContractObj="العقود" />
          </Col>
          <Col className='col-xl-7 col-12 d-flex align-items-center justify-content-xl-end mt-sm-0 mt-1 pt-xl-5 pt-2  ps-xl-5 ps-4 pe-2' >
            <Row className=' row '>

              {/* <Col className='d-flex align-items-center justify-content-sm-start p-0 pe-2 mt-4  mt-md-0 '>

                <a onClick={() => handleShowDescription()}>
                  <DescriptionIcon />
                </a>

              </Col> */}


              {/* <Col className='d-flex align-items-center justify-content-sm-start Upload-container p-0 mt-2 mt-md-0  m-0'>
            <Button.Ripple outline className="button-transparent upload-new-contract-model text-center"  onClick={() => exportExcelSample()}>
              <span className='align-middle ms-25 pe-3' >تحميل نموذج قائمة العقود</span>
              <Download className='ps-3' width={19} height={19} color='#4788C6' />

            </Button.Ripple>
            {can_upload_contract && (
            <Button.Ripple outline className="button-transparent upload-new-contract text-center" onClick={() => action_show_modal()}>
              <span className='align-middle ms-25 pe-3' >رفع قائمة عقود جديدة</span>
              <Upload className='ps-3' width={19} height={19} color='#4788C6' />

            </Button.Ripple>
             )}
          </Col>
          */}




              {can_add_contract && (

                <Col className='d-flex align-items-center justify-content-sm-start p-0 mt-4  mt-md-0 '>
                  <Button.Ripple target='_blank' outline className="btn button1 px-3 ms-md-3 py-2" href="/addContract">
                    <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2 mt-2 mt-md-0' >إضافة عقد</span>
                    <Plus className="ps-5" />
                  </Button.Ripple>
                </Col>
              )
              }
            </Row>
          </Col>


        </Row>
        <Row>
          <div className='col-md-6 ps-md-0 ps-4  pe-0 mt-4 d-flex flex-start'>
            <div className='f-w-700 f-s-24px color-5F605F font-cairo '>قائمة العقود</div>
            <div className='ms-3  color-D99F22 f-s-16px f-w-700 background-FFFDF7 px-4 mt-1 py-1 borderRadius-16px'>{ContractCount} عقد


            </div>
          </div>
        </Row>


        {/* <div className='  d-block d-md-none'>
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
  */}
        <div className='container-fluid'>
        </div>


        <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />


        <TableServerSide showUploadCertificate={showUploadCertificate} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} getStart={getStart} getDraw={getDraw} getLength={getLength} getCompanyId={getCompanyId} getStatuesId={getStatuesId} getExcution_type={getExcution_type} getTypeId={getTypeId} getFrom_date={getFrom_date} getTo_date={getTo_date} setContractCount={setContractCount} getDepartmentId={getDepartmentId} setallPermissions={setallPermissions} />

      </div>


    </div>


  )
}

export default Car_list
