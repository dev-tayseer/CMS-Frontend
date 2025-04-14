import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Close, Loader2, DocIcon, CloseIcon} from '../icons/all_icons'
import AlertElement from "../../components/AlertElement"
import CarInfo1 from "../../components/cars/CarInfo1"
import FileUploaderSingle from "../../components/FileUploaderSingle"
import UploadWithHtmlBodyV2 from  "../../components/Modals/UploadWithHtmlBodyV2"
import axios from 'axios'
import themeConfig from "@configs/themeConfig";
 

import toast from 'react-hot-toast'

const domain_url = themeConfig.url

const CarDetailsInfo = ({image, editIcon, fileIcon, trashIcon, carId, status, sejelName,row}) => {
    console.log(status, "sss")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)



    
  const [modalPlate_num, setModalPlate_num] = useState("")
  const [modalChasis_num, setModalChasis_num] = useState("")
  const [modalPlate_num_en, setModalPlate_num_en] = useState("")
  const [modalChasis_num_en, setModalChasis_num_en] = useState("")
  const [car_id, setCar_id] = useState(null)
  const [filesCertificate, setFilesCertificate] = useState([])
  const [uploadCertificateModal, setUploadCertificateFormModal] = useState(false)
  const handleUploadCertificateShow = () => setUploadCertificateFormModal(true)
  const [modal_animation, setModal_animation] = useState(true)
  const [t_toast_loader, setT_toast_loader] = useState(null)

  
  const [showAlert, setShowAlert] = useState(false)
  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")
  const [showConfirmUpload, setShowConfirmUpload] = useState(false)

  const handleUploadClose = () => setUploadFormModal(false)
  const handleUploadShow = () => setUploadFormModal(true)
  
  const [uploadModal, setUploadFormModal] = useState(false)


  const handleRemoveAllCertificateFiles = () => {
    setFilesCertificate([])
  }


  const handleUploadCertificateClose = () => {
    setModal_animation(true)
    setUploadCertificateFormModal(false)
  }

  const handleFileCertificateUpload = () => {
    if (filesCertificate.length > 0) {
      handleUploadCertificateClose()
      handleConfirmUpload()
    }
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
            setTitleAlert("تم رفع شهادة سجل للمركبة بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
          }
          
          toast.dismiss(idToast)
        })
        .catch(function (response) {
            console.log("Error: ",response)
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

      <UploadWithHtmlBodyV2 modal_animation={modal_animation}  activationStatues2={true} activationStatues={activationStatues}  stateShowDialog={uploadCertificateModal} handleCloseConfirm={handleUploadCertificateClose} handleAccept={handleFileCertificateUpload} title='شهادة سجل للمركبة ' classHeader='background-F2F7FF color-1F2733' accept='رفع المستند' content={content} cancel='إلغاء' btn_color='4788C6'  inactive_color='E0EDFF'/>
    
    )
  }

  
function get_request_id(row){
    if (row.car_requests.length>0){
      return row.car_requests[0].id
    }else{
      return null
    }
  }

  
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



    if (status === "2") {
        if (sejelName === "required") {
            return (
                <>
                    
             <AlertElement  headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

            <ModalCertificateUpload />

                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header className='background-FEE4E2'>
                
                        <div className="col-6">
                            <p className="logout-text pt-3">
                                حذف مركبة
                            </p>
                            </div>
                        <div className="col-6 text-end">
                            <a onClick={handleClose}>
                                <Close width={24} height={24} color='none'/>
                            </a>
                        </div>

                    </Modal.Header>

                        <Modal.Body>
                        
                                <div className="row">
                                    <p className="confirm-logout-text pt-4 pb-5 mb-5">
                                    هل انت متأكد من حذف المركبة؟
                                    </p>
                                    
                                </div>
                                {/* <hr/> */}

                        </Modal.Body>
                        <Modal.Footer>
                        <div className="row buttons-row pt-3 pb-3">
                                    <div className="col-6  ">
                                        <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleClose}>
                                        إلغاء   
                                        </a>
                                    </div>
                                    <div className="col-6  ">
                                        <a className="text-center block btn-accept text-center  p-3 w-100" >
                                            نعم   
                                        </a>
                                    </div>
                                </div>
                        </Modal.Footer>

                    </Modal>
                <div className="row pt-4 rowDetails pb-3">
                    <div className="col-lg-4">
                        <span>
                            <img src={image} />
                        </span>
                        <span className="car-details-text ms-3 ">
                            تفاصيل المركبة
                        </span>
                    </div>
                    <div className="col-lg-8 mt-2 text-lg-end ">
                        
                            <Button.Ripple outline className="btn btn-basic btn-prim-color ms-2 p-2 px-3 " href={`/addCar?id=${carId}`}>
                                تعديل بيانات المركبة
                                <span>
                                    <img src={editIcon} className="ps-3" />
                                </span>
                            </Button.Ripple>
                        
                 <Button.Ripple outline className="btn btn-basic btn-prim-color ms-2 p-2 px-3 " onClick={() => showUploadCertificate(get_request_id(row), row.plate_number_ar, row.chassis_number, row.plate_number, row.chassis_number)}>
                 إرفاق شهادة سجل للمركبة       
                           <span>
                               <img src={fileIcon} className="ps-3" />
                           </span>
                           </Button.Ripple>     

                            {/* <Button.Ripple outline className="btn btn-basic btn-prim-color ms-2 p-2 px-3 " href={`/documents?id=${carId}`}>
                            إرفاق محضر التنفيذ
                            <span>
                                <img src={fileIcon} className="ps-3" />
                            </span>
                            </Button.Ripple> */}
                        {/* <Button.Ripple outline className="btn btn-basic btn-basic-color ms-2 p-2 px-3 me-0" href="#" onClick={handleShow}>
                            حذف المركبة
                            <span>
                                <img src={trashIcon} className="ps-3" />
                            </span>
                        </Button.Ripple> */}
                    </div>
                    {/* <hr className="ms-3 me-3 hrRowDetails" /> */}

                </div>
                </>
            )
        } else {
            return (
                <>
                <div className="row pt-4 rowDetails pb-3">
                    <div className="col-lg-4">
                        <span>
                            <img src={image} />
                        </span>
                        <span className="car-details-text ms-3 ">
                            تفاصيل المركبة
                        </span>
                    </div>
                    <div className="col-lg-8 mt-2 text-lg-end ">
                        
                            <Button.Ripple outline className="btn btn-basic btn-prim-color ms-2 p-2 px-3 " href={`/addCar?id=${carId}`}>
                                تعديل بيانات المركبة
                                <span>
                                    <img src={editIcon} className="ps-3" />
                                </span>
                            </Button.Ripple>
                        
                            {/* <Button.Ripple outline className="btn btn-basic btn-prim-color ms-2 p-2 px-3 " href={`/documents?id=${carId}`}>
                            إرفاق محضر التنفيذ
                            <span>
                                <img src={fileIcon} className="ps-3" />
                            </span>
                            </Button.Ripple> */}
                    </div>
                    {/* <hr className="ms-3 me-3 hrRowDetails" /> */}

                </div>
                </>
            )  
        }
    } else if (status === "4" | status === "3") {
        return (
            <>
            <div className="row pt-4 rowDetails pb-3">
                <div className="col-lg-4">
                    <span>
                        <img src={image} />
                    </span>
                    <span className="car-details-text ms-3 ">
                        تفاصيل المركبة
                    </span>
                </div>
                <div className="col-lg-8 mt-2 text-lg-end ">   
             
                             
                </div>
                {/* <hr className="ms-3 me-3 hrRowDetails" /> */}

            </div>
            </>
        )
    } else {
        return (
            <>
                                <Modal show={show} onHide={handleClose}>
                    <Modal.Header className='background-FEE4E2'>
                
                        <div className="col-6">
                            <p className="logout-text pt-3">
                                تسجيل الخروج
                            </p>
                            </div>
                        <div className="col-6 text-end">
                            <a onClick={handleClose}>
                                <Close width={24} height={24} color='none'/>
                            </a>
                        </div>

                    </Modal.Header>

                        <Modal.Body>
                        
                                <div className="row">
                                    <p className="confirm-logout-text pt-4 pb-5 mb-5">
                                    هل انت متأكد من حذف المركبة؟
                                    </p>
                                    
                                </div>
                                {/* <hr/> */}

                        </Modal.Body>
                        <Modal.Footer>
                        <div className="row buttons-row pt-3 pb-3">
                                    <div className="col-6  ">
                                        <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleClose}>
                                        إلغاء   
                                        </a>
                                    </div>
                                    <div className="col-6  ">
                                        <a className="text-center block btn-accept text-center  p-3 w-100" >
                                            نعم   
                                        </a>
                                    </div>
                                </div>
                        </Modal.Footer>

                    </Modal>
            <div className="row pt-4 rowDetails pb-3">
                <div className="col-lg-4">
                    <span>
                        <img src={image} />
                    </span>
                    <span className="car-details-text ms-3 ">
                        تفاصيل المركبة
                    </span>
                </div>
                <div className="col-lg-8 mt-2 text-lg-end ">
                    
                        <Button.Ripple outline className="btn btn-basic btn-prim-color ms-2 p-2 px-3 " href={`/addCar?id=${carId}`}>
                            تعديل بيانات المركبة
                            <span>
                                <img src={editIcon} className="ps-3" />
                            </span>
                        </Button.Ripple>
                        <Button.Ripple outline className="btn btn-basic btn-basic-color ms-2 p-2 px-3 me-0" href="#">
                            حذف المركبة
                            <span>
                                <img src={trashIcon} className="ps-3" />
                            </span>
                        </Button.Ripple>
                </div>
                {/* <hr className="ms-3 me-3 hrRowDetails" /> */}

            </div>
            </>
        )
    
    } 
    }
    export default CarDetailsInfo