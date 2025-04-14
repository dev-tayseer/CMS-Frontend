// ** React Imports
import React, { Fragment, useState, useEffect ,useContext } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";
import axios from "axios"

import "@src/assets/scss/pages/cars/carDetails.scss"
import Breadcrumbs from "../components/Breadcrumbs"
import CarDetailsInfo from "../components/cars/CarDetailsInfo"
import CarData from "../components/cars/CarData"
import CarRestore from "../components/cars/CarRestore"
import CarImages from "../components/cars/CarImages"
import EmployeesNotes from "../components/cars/EmployeesNotes"


// {/* car header component  */}
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import Arrows from "@src/assets/images/svg/Arrows.svg"
// {/* end car header component  */}
// {/* car details row component */}
import arrowDetails from "@src/assets/images/svg/arrowDetails.svg"
import editIcon from "@src/assets/images/svg/editIcon.svg"
import fileIcon from "@src/assets/images/svg/fileIcon.svg"
import trashIcon from "@src/assets/images/svg/trashIcon.svg"
import Modal from 'react-bootstrap/Modal'
import { CloseIcon } from '../components/icons/all_icons'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


// {/* end car details row component */}

const carDetails = () => {
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  const [carId, setCarId] = useState("")
  // For Car Info Component Inside Car Data Component  
  const [plate_number_ar, setPlate_number_ar] = useState("--")
  const [chasis_num_ar, setChasis_num_ar] = useState("--")
  const [plate_num_en, setPlate_num_en] = useState("--")
  const [chasis_num_en, setChasis_num_en] = useState("--")
  // For Car Data Component  inside Car Data Component
  const [chasis_number_origin, setChasis_number_origin] = useState("--")
  const [area, setArea] = useState("--")
  const [brand, setBrand] = useState("--")
  const [model, setModel] = useState("--")
  const [manufacture_year, setManufacture_year] = useState("--")
  const [type, setType] = useState("--")
  const [color, setColor] = useState("--")
  // For CarDocuments Component inside Car Data Component
  const [carDocuments, setCarDocuments] = useState([])
  // CarRestoreStatus inside CarRestore inside Car Data Component
  const [status, setStatus] = useState("")
  // CarRestoreStatusSejelCertificate inside CarRestore inside Car Data Component
  const [sejel, setSejel] = useState("")
  const [sejelName, setSejelName] = useState("")
  // CarRestoreProcedure inside CarRestore inside Car Data Component
  const [collectorName, setCollectorName] = useState("--")
  const [collectorDate, setCollectorDate] = useState("--")
  const [yardName, setYardName] = useState("--")
  const [yardDate, setYardDate] = useState("--")
  // CarRestoreDateEntry inside CarRestore inside Car Data Component
  const [dateEntry, setDateEntry] = useState("--")
  // carImages component
  const [images, setImages] = useState([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  // Employee Notes
  const [collectorNotes, setCollectorNotes] = useState("")
  const [yardNotes, setYardNotes] = useState("")
  const [length, setLength] = useState(0)

  
  const [row_data, setRow_data] = useState(null)
  
  

  const fillData = async() => {
    setLoaderShow(true)
    // fetchimg api 
    const token = localStorage.getItem("token")
    const search = window.location.search
    const params = new URLSearchParams(search)
    const carId = params.get('id')

    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }
    const result = await axios.get(`${domain_url}/get-car?car_id=${carId}`, config)
    const data = result.data
    
    if (data.status === 200) {
      const result = data.data[0]
      console.log(result, "aaa")
      setRow_data(result)
      setCarId(result.id)
      // For CarInfo Component Inside Car Data Component  
      
      let splitted_plate_number_ar = ""
      let splitted_chasis_num_ar = ""
      let splitted_plate_number_en = ""
      let splitted_chasis_num_en = ""
      
      let plate_number = result.plate_number_ar.replace('-','');
      let plate_number_en = result.plate_number.replace('-','');
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
      
     
      setPlate_number_ar(splitted_plate_number_ar)
      setChasis_num_ar(splitted_chasis_num_ar)
      setPlate_num_en(splitted_plate_number_en)
      setChasis_num_en(splitted_chasis_num_en)
      // For CarInformation Component Inside Car Data Component  
      setChasis_number_origin(result.chassis_number)
      try {
        setArea(result.car_requests[0].location_address)
      } catch (e) {
        setArea("")
        }

      setBrand(result.car_brand.name)
      setModel(result.car_model.name)
      setManufacture_year(result.manufacture_year)
      setType(result.type)
      setColor(result.color)
      // For CarDocuments Component inside Car Data Component
      try {
        setCarDocuments(result.car_requests[0].files)
      } catch (e) {
        setCarDocuments("")
        }
      // CarRestoreStatus inside CarRestore inside Car Data Component
      try {
        console.log(result.car_requests[0].status, "status")
        setStatus(result.car_requests[0].status)

      } catch (e) {
        console.log(e, "96")
        setStatus("")

        }
        try {
          // console.log(result.car_requests[0].files.length, "145")
          if (result.car_requests.length > 0) {
          setLength(result.car_requests[0].files.length)
          } else {
            setLength(null)
          }
        } catch (error) {
          console.log(error, "12")
          
        }
      // CarRestoreStatusSejelCertificate inside CarRestore inside Car Data Component
      // needs sejel mmmmmmmmmmmm
      setSejel("/docs/sejel/fff.pdf")
      setSejelName("required")

      // CarRestoreProcedure inside CarRestore inside Car Data Component
      try {
      setCollectorName(result.car_requests[0].collector.name)
      } catch (e) {
        setCollectorName("")
      }
      try {
      setCollectorDate(result.car_requests[0].collector.created_at) 
      } catch (e) {
        setCollectorDate("")
      }
      try {
      setYardName(result.car_requests[0].yard.name)
      } catch (e) {
        setYardName("")
      }
      try {
      setYardDate(result.car_requests[0].yard.created_at)
      } catch (e) {
        setYardDate("")
      }

      // CarRestoreDateEntry inside CarRestore inside Car Data Component
      setDateEntry(result.created_at)
      // CarImages  
      try {
        setImages(result.car_requests[0].images)
      } catch (e) {
        setImages("")
        }

        try {
          setCollectorNotes(result.car_requests[0].collector_notes)
        } catch (e) {
          setCollectorNotes("")
        }
        
        try {
          setYardNotes(result.car_requests[0].yard_notes)
        } catch (e) {
          setYardNotes("")
        }
      

    } else {
      console.log("400")
    }
    
    setLoaderShow(false)
  }
  useEffect(() => {
    console.log("loadiing ")
    fillData()
  }, [])

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    console.log('deleteRowId: ', selectedRowId)
    setShowConfirmDelete(false)
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     q: searchValue,
    //     companyId:selectedDBVal_companies,
    //     statuesId:selectedDBVal_statues,
    //     typeId:selectedDBVal_type
    //   })
    // ) 
  }
  const ConfirmDeleteItem = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" centered show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
      <Modal.Header className='background-FEE4E2'>
   
      <div className="col-6">
            <p className="modal-text-main pt-3">
            تأكيد الحذف 
            </p>
          </div>
          <div className="col-6 text-end">
            <a onClick={handleCloseConfirmDelete}>
              <CloseIcon width={24} height={24} color='#4D5761' />
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
                          <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleCloseConfirmDelete}>
                          إلغاء   
                          </a>
                      </div>
                      <div className="col-6  ">
                          <a className="text-center block btn-accept text-center  p-3 w-100"  onClick={handleConfirmDelete}>
                              حذف   
                          </a>
                      </div>
                  </div>
          </Modal.Footer>
  
      </Modal>
      )
  }

  return (
    
    <div className="theme-content">
    <ConfirmDeleteItem/>
    <div className="container container2 ps-md-0 pe-md-0">

        {/* car header component  */}
        <Breadcrumbs icon={homeIcon} urlMain="/cars" Arrows={Arrows} main={'المركبات'} second={'تفاصيل المركبة'}></Breadcrumbs>
        {/* end car header component  */}

        {/* car details row component */}
        <CarDetailsInfo image={arrowDetails} editIcon={editIcon} fileIcon={fileIcon} trashIcon={trashIcon} carId={carId} status={status} sejelName={sejelName} row={row_data}></CarDetailsInfo>
        {/*end car details row component */}

        {/* car details component */}
        <div className="row mt-5 pt-2">
            <CarData plate_number={plate_number_ar} chasis_num={chasis_num_ar} plate_num_en={plate_num_en} chasis_num_en={chasis_num_en} chasis_number_origin={chasis_number_origin} area={area} brand={brand} model={model} manufacture_year={manufacture_year} type={type} color={color} carDocuments={carDocuments}></CarData>

            {/* restoring details */}
            <CarRestore length={length} status={status} sejel={sejel} sejelName={sejelName} collectorName={collectorName} collectorDate={collectorDate} yardName={yardName} yardDate={yardDate} dateEntry={dateEntry}></CarRestore>
            {/* end restoring details */}
            
            {/* Car Images */}
            <CarImages images={images}></CarImages>
            {/* end Car Images */}

            <EmployeesNotes collectorNotes={collectorNotes} yardNotes={yardNotes} ></EmployeesNotes>

        </div>
        
        {/* end  car details component */}

    </div>

</div>
  )
}

export default carDetails
      // // needs sejel mmmmmmmmmmmm api islam
      // setSejel("/docs/sejel/fff.pdf")
      // setSejelName("required")