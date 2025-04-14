// ** React Imports
import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios"

import Breadcrumbs from "./components/Breadcrumbs"
import DetailsInfo from "./components/DetailsInfo"

import UploadElementData from "./components/documents/UploadElementData"

import AlertElement from "./components/AlertElement"
import toast from 'react-hot-toast'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from './components/icons/all_icons'
import { Button, Label, Input, Row, Col } from 'reactstrap'


// {/* car header component  */}
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import Arrows from "@src/assets/images/svg/Arrows.svg"
// {/* end car header component  */}
// {/* car details row component */}
import arrowDetails from "@src/assets/images/svg/arrowDetails.svg"


import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url

const main_url = themeConfig.main_url

// {/* end car details row component */}

const Documents = () => {

  
  const [showAlert, setShowAlert] = useState(false)
  const [t_toast_loader, setT_toast_loader] = useState(null)
  const [fileUrlExists1, setFileUrlExists1] = useState(true)
  const [fileUrlExists2, setFileUrlExists2] = useState(true)
  const [fileUrl1, setFileUrl1] = useState(`${main_url}templete_files/execution_record.pdf`)
  const [fileUrl2, setFileUrl2] = useState(`${main_url}templete_files/delivery_record.pdf`)
  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")

  const [files1, setFiles1] = useState([])
  const [files2, setFiles2] = useState([])

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
   
  const handleRemoveAllFiles1 = () => {
    setFiles1([])
  }

  const handleFileUpload1 = () => {
    const token = localStorage.getItem("token")
    // console.log(token)
    
    const bodyFormData = new FormData()
    bodyFormData.append('file', files1[0])
    bodyFormData.append('name', 'execution_record')
    if (files1.length > 0) {   
      
        const idToast = handleBottomEnd(files1[0].name)   
        axios({
          method: "post",
          url: `${domain_url}/upload-car-templete-files`,
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
          
          if (response.data.status !== 200) {
            setTypeAlert("Fail")
            setTitleAlert("لم يتم رفع المستند بشكل صحيح.")
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
          } else {
            console.log(files1[0].name)
            setTypeAlert("Success")
            setTitleAlert("تم رفع بيانات المستند بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
          }
          
          toast.dismiss(idToast)
        })
        .catch(function (response) {
          //handle error
          setTypeAlert("Fail")
          setTitleAlert("لم يتم رفع المستند بشكل صحيح.")
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          
          toast.dismiss(idToast)
        })
    } else {
      setTypeAlert("Fail")
      setTitleAlert("لم يتم رفع المستند بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
    handleRemoveAllFiles1()
  }


  const handleRemoveAllFiles2 = () => {
    setFiles2([])
  }
  
  const handleFileUpload2 = () => {

    const token = localStorage.getItem("token")
    // console.log(token)
    
    const bodyFormData = new FormData()
    bodyFormData.append('file', files2[0])
    bodyFormData.append('name', 'delivery_record')
    if (files2.length > 0) {   
      
        const idToast = handleBottomEnd(files2[0].name)   
        axios({
          method: "post",
          url: `${domain_url}/upload-car-templete-files`,
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
          
          if (response.data.status !== 200) {
            setTypeAlert("Fail")
            setTitleAlert("لم يتم رفع المستند بشكل صحيح.")
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
          } else {
            console.log(files2[0].name)
            setTypeAlert("Success")
            setTitleAlert("تم رفع بيانات المستند بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
          }
          
          toast.dismiss(idToast)
        })
        .catch(function (response) {
          //handle error
          setTypeAlert("Fail")
          setTitleAlert("لم يتم رفع المستند بشكل صحيح.")
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          
          toast.dismiss(idToast)
        })
    } else {
      setTypeAlert("Fail")
      setTitleAlert("لم يتم رفع المستند بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
    handleRemoveAllFiles2()
  }


  return (
    <div className="theme-content">
    <div className="container">

        {/* car header component  */}
        <Breadcrumbs icon={homeIcon} urlMain="/cars" Arrows={Arrows} main={'المركبات'} second={'المستندات'}></Breadcrumbs>
        {/* end car header component  */}

        {/* car details row component */}
        <DetailsInfo image={arrowDetails} title={'المستندات'} ></DetailsInfo>
        {/*end car details row component */}
        <AlertElement  headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        {/* car details component */}
        <div className="row mt-5 pt-2">
          <div className="col-md-6 col-12">
            <UploadElementData fileUrl={fileUrl1} fileUrlExists={fileUrlExists1} main='محضر التنفيذ' handleFileUpload={handleFileUpload1} handleRemoveAllFiles={handleRemoveAllFiles1} files={files1} setFiles={setFiles1}/>
          </div>
          <div className="col-md-6 col-12">
            <UploadElementData fileUrl={fileUrl2} fileUrlExists={fileUrlExists2} main='محضر الإستلام' handleFileUpload={handleFileUpload2} handleRemoveAllFiles={handleRemoveAllFiles2} files={files2} setFiles={setFiles2}/>
          </div>
            
        </div>
        
        {/* end  car details component */}

    </div>

</div>
  )
}

export default Documents
