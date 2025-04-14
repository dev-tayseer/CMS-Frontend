// ** React Imports
import React, { Fragment, useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"

import UploadElementDataV2 from "../components/documents/UploadElementDataV2"
import HomeHeader from "../components/home/HomeHeader"

import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import logo from "@src/assets/images/tayseer_loader.gif";


// react-select


import AlertElement from "../components/AlertElement"

import toast from 'react-hot-toast'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import DatePicker from "react-multi-date-picker";

import { Fileupload, FileCorrect, DeleteFile, HomeIcon, ArrowIcon, Plus, CloseIcon } from '../components/icons/all_icons'

import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { selectThemeColors } from '@utils'
import * as yup from 'yup'
import $ from 'jquery'
import fs from 'fs'

import BillFormComponent from "../components/contract/BillFormComponent"

import Modal from 'react-bootstrap/Modal'

import { yupResolver } from '@hookform/resolvers/yup'


import themeConfig from "@configs/themeConfig";
import { doc } from 'prettier';
import { read } from 'xlsx';
import { constrainPoint } from '@fullcalendar/core';
import { Exception } from 'sass';

const domain_url = themeConfig.url


const main_url = themeConfig.main_url



const AddContract = () => {



  const add = useRef(true)
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
  const [showAlert, setShowAlert] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState("")

  const [customer_typeValidation, setcustomer_typeValidation] = useState(false)
  const [customer_typeValueId, setcustomer_typeValueId] = useState("0")
  const [customer_typedata, setcustomer_typedata] = useState(
    [
      {
        id: 0,
        value: "1",
        label: "تيسير"
      },
      {
        id: 1,
        value: "2",
        label: "دالوف"

      },

    ]
  )
  const [customer_typeValue, setcustomer_typeValue] = useState({
    id: 0,
    value: "1",
    label: "تيسير"

  })


  const [car_data_remove, setcar_data_remove] = useState([])


  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")


  const [nameValidation, setNameValidation] = useState(false)
  const [contractNumberValidation, setcontractNumberValidation] = useState(false)
  const [renewDurationValidation, setrenewDurationValidation] = useState(false)


  const [durationValidation, setdurationValidation] = useState(false)
  const [notesValidation, setnotesValidation] = useState(false)
  const [tawreed_typeValidation, settawreed_typeValidation] = useState(false)
  const [tawreed_type, settawreed_type] = useState("")



  const [date_fromValidation, setdate_fromValidation] = useState(false)
  const [date_toValidation, setdate_toValidation] = useState(false)


  let via_default = ""




  const [name, setName] = useState("")
  const [contractNumber, setcontractNumber] = useState("")
  const [renewDuration, setrenewDuration] = useState("90")



  const [duration, setduration] = useState("")
  const [notes, setnotes] = useState("")
  const [date_from, setdate_from] = useState("")
  const [date_to, setdate_to] = useState("")

  const [files, setfiles] = useState([])
  const [backend_files, setbackend_files] = useState([])
  const [old_files, setold_files] = useState([])
  const [my_ids_of_files, setmy_ids_of_files] = useState([])



  const [companyValidation, setCompanyValidation] = useState(false)
  const [companyValueId, setCompanyValueId] = useState("")
  const [companyData, setCompanyData] = useState([])
  const [companyValue, setCompanyValue] = useState([])

  const [contract_statusValidation, setcontract_statusValidation] = useState(false)
  const [contract_statusValueId, setcontract_statusValueId] = useState("")
  const [contract_statusData, setcontract_statusData] = useState([])
  const [contract_statusValue, setcontract_statusValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [sadad_typeValidation, setsadad_typeValidation] = useState(false)
  const [sadad_typeValueId, setsadad_typeValueId] = useState("")
  const [sadad_typeData, setsadad_typeData] = useState([])
  const [sadad_typeValue, setsadad_typeValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  // const [departmentValidation, setdepartmentValidation] = useState(false)
  // const [departmentValueId, setdepartmentValueId] = useState("")
  // const [departmentData, setdepartmentData] = useState([])
  // const [departmentValue, setdepartmentValue] = useState({
  //   id: 1,
  //   label: "اختر من القائمة",
  //   value: "اختر من القائمة"
  // })
  const [departmentValidation, setdepartmentValidation] = useState(false)
  const [departmentValueId, setdepartmentValueId] = useState("")
  const [departmentData, setdepartmentData] = useState([])
  const [visible_user_dep, setvisible_user_dep] = useState(false)
  const [departmentValue, setdepartmentValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [user_dep_Validation, setuser_dep_Validation] = useState(false)
  const [user_dep_ValueId, setuser_dep_ValueId] = useState("")
  const [user_dep_Data, setuser_dep_Data] = useState([])
  const [user_dep_Value, setuser_dep_Value] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })



  const [cityValidation, setcityValidation] = useState(false)
  const [cityValueId, setcityValueId] = useState("")
  const [cityData, setcityData] = useState([])
  const [cityValue, setcityValue] = useState([])


  const navigate = useNavigate()
  const [company_Id, setCompany_Id] = useState("")
  const [language, setlanguage] = useState("ar")

  const [oldRecordsExists, setoldRecordsExists] = useState(false)

  const [oldRecords, setoldRecords] = useState([])



  const [errorFile, seterrorFile] = useState("")
  const [can_add_tawreed, setcan_add_tawreed] = useState(false)

  const [countryValidation, setCountryValidation] = useState(false)
  const [countryValueId, setCountryValueId] = useState("")


  const [countryValue, setCountryValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [CountryData, setCountryData] = useState([])



  const [renewValidation, setrenewValidation] = useState(false)
  const [renewValueId, setrenewValueId] = useState("")


  const [renewValue, setrenewValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [renewData, setrenewData] = useState([])


  const [typeValidation, settypeValidation] = useState(false)
  const [typeValueId, settypeValueId] = useState("")


  const [typeValue, settypeValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [typeData, settypeData] = useState([])

  const [type_of_AuctionValidation, settype_of_AuctionValidation] = useState(false)
  const [type_of_AuctionValueId, settype_of_AuctionValueId] = useState("")


  const [type_of_AuctionValue, settype_of_AuctionValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })


  const [type_of_AuctionData, settype_of_AuctionData] = useState([])

  const [car_status_data_default, setcar_status_data_default] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })


  const [car_status_data, setcar_status_data] = useState([
    {
      id: "1",
      value: "1",
      label: "تالف"
    },
    {
      id: "2",
      value: "2",
      label: "غير تالف"
    }

  ])




  const [bill_type, setbill_type] = useState("")






  //   ===================== new 
  const [sold_car_number, setsold_car_number] = useState("")
  const [sold_car_numberValidation, setsold_car_numberValidation] = useState(false)

  const [total_amount, settotal_amount] = useState("")
  const [total_amountValidation, settotal_amountValidation] = useState(false)


  const [car_details, setcar_details] = useState("")
  const [car_detailsValidation, setcar_detailsValidation] = useState(false)


  const [annual_value_sadad, setannual_value_sadad] = useState("")
  const [annual_value_sadadValidation, setannual_value_sadadValidation] = useState(false)


  const [identity_name, setidentity_name] = useState("")
  const [identity_nameValidation, setidentity_nameValidation] = useState(false)

  const [identity_phone, setidentity_phone] = useState("")
  const [identity_phoneValidation, setidentity_phoneValidation] = useState(false)

  const [identity_number, setidentity_number] = useState("")
  const [identity_numberValidation, setidentity_numberValidation] = useState(false)

  const [identity_number_systematic, setidentity_number_systematic] = useState("")
  const [identity_number_systematicValidation, setidentity_number_systematicValidation] = useState(false)

  const [identity_number_gulf, setidentity_number_gulf] = useState("")
  const [identity_number_gulfValidation, setidentity_number_gulfValidation] = useState(false)


  const [commercial_number2, setcommercial_number2] = useState("")
  const [commercial_number2Validation, setcommercial_number2Validation] = useState(false)



  const [Unified_No, setUnified_No] = useState("")
  const [Unified_NoValidation, setUnified_NoValidation] = useState(false)






  const [showBill, setShowBill] = useState(false)
  const [showBillForLate, setShowBillForLate] = useState(false)
  const [showBillForAdvance, setShowBillForAdvance] = useState(false)


  const handleCloseBill = () => setShowBill(false)
  const handleCloseBillForAdvance = () => setShowBillForAdvance(false)
  const handleCloseBillForLate = () => setShowBillForLate(false)


  const BillData = (viaType) => {
    console.log("show modal........", viaType == "late")
    if (viaType = "late") {
      console.log("late....")
      via_default = "late"
      console.log(via_default, "via_default")
    }

    else if (viaType = "advance") {
      via_default = "advance"
      console.log(via_default, "via_default")


    }
    else {
      via_default = ""
    }

    // setSelectedRowId(id)
    setShowBill(true)



  }

  const [billData, setbillData] = useState([])
  const [billRecExists, setBillRecExists] = useState(false)
  const [can_add_duration, setcan_add_duration] = useState(true)


  const [can_add_bill, setcan_add_bill] = useState(false)
  const [can_add_advance, setcan_add_advance] = useState(false)
  const [can_add_late, setcan_add_late] = useState(false)

  const [can_add_advancebtn, setcan_add_advancebtn] = useState(false)
  const [can_add_latebtn, setcan_add_latebtn] = useState(false)
  // const [via_default, setvia_default] = useState(false)

  const [addedLateDisabled, setAddedLateDisabled] = useState(false)
  const [addedAdvanceDisabled, setAddedAdvanceDisabled] = useState(false)







  const BillDataForAdvance = (viaType) => {


    // setSelectedRowId(id)
    setShowBillForAdvance(true)



  }

  const BillDataForLate = (viaType) => {
    console.log("late clicked ....")
    setShowBillForLate(true)



  }





  // Document




  const BillDataModal = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" className='TimeExtension' centered show={showBill} onHide={handleCloseBill}>
      <Modal.Header className='background-F7FAF7'>

        <div className="col-6">
          <p className="modal-text-main2 pt-3">
            إضافة فاتورة
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseBill}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>

        <BillFormComponent handleCloseTimeExtension={handleCloseBill} setSelectedRowId={setSelectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance={setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="" setcan_add_advancebtn={setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn} />

      </Modal.Body>


    </Modal>
    )
  }

  const BillDataModalForAdvance = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" className='TimeExtension' centered show={showBillForAdvance} onHide={handleCloseBillForAdvance}>
      <Modal.Header className='background-F7FAF7'>

        <div className="col-6">
          <p className="modal-text-main2 pt-3">
            إضافة دفعة مقدمة
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseBillForAdvance}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>

        <BillFormComponent handleCloseTimeExtension={handleCloseBillForAdvance} setSelectedRowId={setSelectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance={setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="advance" setcan_add_advancebtn={setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn} />

      </Modal.Body>


    </Modal>
    )
  }


  const BillDataModalForLate = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" className='TimeExtension' centered show={showBillForLate} onHide={handleCloseBillForLate}>
      <Modal.Header className='background-F7FAF7'>

        <div className="col-6">
          <p className="modal-text-main2 pt-3">
            إضافة دفعة مؤخرة
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseBillForLate}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>

        <BillFormComponent handleCloseTimeExtension={handleCloseBillForLate} setSelectedRowId={setSelectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance={setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="late" setcan_add_advancebtn={setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn} />

      </Modal.Body>


    </Modal>
    )
  }


  //////////////////////////////////////////////
  const ref = useRef("")
  const getCompanyById = async (company_id) => {
    const token = localStorage.getItem("token")
    setLoaderShow(true)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {


      const result = await axios.get(`${domain_url}/Contract/AddContractsAuction/?id=${company_id}`, config)
      const data = result.data[0]


      setsold_car_number(data.sold_car_number)
      settotal_amount(data.total_amount)
      setcar_details(data.car_details)
      setannual_value_sadad(data.annual_value_sadad)
      setcommercial_number2(data.commercial_number2)
      setUnified_No(data.Unified_No)
      console.log(data.type_of_Auction, "data.type_of_Auctiondata.type_of_Auction")
      settype_of_AuctionValueId(data.type_of_Auction)
      setidentity_number(data.identity_number)
      setidentity_number_systematic(data.identity_number_systematic)
      setidentity_number_gulf(data.identity_number_gulf)
      setidentity_name(data.identity_name)
      setidentity_phone(data.identity_phone)

      if (data.customer_type == "0") {
        setcustomer_typeValue({
          id: 0,
          value: "1",
          label: "تيسير"
        })

      } else {
        setcustomer_typeValue({
          id: 1,
          value: "2",
          label: "دالوف"
        })
      }




      if (data.Car_data.length <= 0) {
        append({
          car_agreement_number: '',
          car_type: '',
          car_plate: '',
          car_model: '',
          car_chassis: '',
          car_color: '',
          car_sales_amount: '',
          car_status: '',
        });
      }

      else {



        for (let i = 0; i <= data.Car_data.length - 1; i++) {


          if (data.Car_data[i]['condition'] == "1") {
            var value = {
              id: "1",
              value: "1",
              label: "تالف"
            }
          }
          else if (data.Car_data[i]['condition'] == "2") {
            var value = {
              id: "2",
              value: "2",
              label: "غير تالف"
            }
          } else {
            var value = {
              id: "1",
              value: "1",
              label: "تالف"
            }

          }


          append({
            car_agreement_number: data.Car_data[i]['agreement_number'],
            car_type: data.Car_data[i]['type'],
            car_plate: data.Car_data[i]['plate_number'],
            car_model: data.Car_data[i]['model'],
            car_chassis: data.Car_data[i]['chassis_number'],
            car_color: data.Car_data[i]['color'],
            car_sales_amount: data.Car_data[i]['sale_amount'],
            car_status: value,
            car_id: data.Car_data[i]['id'],
          });

        }

      }







      setcontractNumber(data.Contract_Number)


      setnotes(data.Note)


      console.log(data.Note, "data.Note.....................")


      setduration(data.Tenure2)
      console.log(data.Start_Date_of_Contract, "date")
      setdate_from(data.Start_Date_of_Contract)
      setdate_to(data.End_Date_of_Contract)





      let myfiles = []
      let my_ids_of_files = ""
      console.log(data.files, "**********")
      for (var i = 0; i < data.files.length; i++) {
        try {
          console.log(data.files, "fils")
          myfiles.push({ "name": data.files[i].name[1], "size": data.files[0].size, "path": data.files[i].file, "id": data.files[i].id })
          console.log(data.files[i].id.toString(), "man")
          my_ids_of_files = my_ids_of_files + "," + data.files[i].id.toString()
          console.log(my_ids_of_files, "mam")
        } catch (e) {

        }
      }
      console.log("han", my_ids_of_files)
      console.log(my_ids_of_files.substring(1, my_ids_of_files.length), "ids ids ")
      setmy_ids_of_files(my_ids_of_files.substring(1, my_ids_of_files.length))
      setold_files(myfiles)

      // backend_files



      // setdepartmentValue({
      //   id: data.Department.id,
      //   label: data.Department.Department_name,
      //   value: data.Department.Department_name
      // })

      setdepartmentValue({
        id: data.Department.id,
        label: data.Department.Department_name,
        value: data.Department.Department_name
      })
      setdepartmentValueId(parseInt(data.Department.id))
      loadOptionsDB_user_Dept_editing(data.Department.id)
      setvisible_user_dep(true)

      setuser_dep_Value({
        id: data.notified_manager.id,
        label: data.notified_manager.name,
        value: data.notified_manager.name
      })







      if (data.renew_type.id == "0" || data.renew_type.id == "1") {
        setcan_add_duration(true)
      } else {
        setcan_add_duration(false)

      }





      setnotes(data.Note)
      let contract_obj = data

      try {
        let list_of_records = []
        let record_obj_files = contract_obj.new_exp_date
        for (var i = 0; i < record_obj_files.length; i++) {
          setoldRecordsExists(true)

          list_of_records.push({ "old_date": record_obj_files[i].old.split("T")[0], "new_date": record_obj_files[i].new.split("T")[0], "extend_date": record_obj_files[i].created_at.split("T")[0] })
        }
        console.log(list_of_records, "olol")
        setoldRecords(list_of_records)
      } catch (e) {
        console.log(e, "old")
        setoldRecords([])
        setoldRecordsExists(false)


      }



    } catch (e) {
      console.log(e, "error happened")
    }
    setLoaderShow(false)
  }

  function setFilesUpload() {
    document.querySelector(".upload1").addEventListener("click", function () {
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
      document.querySelector("#input1").dispatchEvent(clickEvent);
      console.log("clicked ....")
    });


  }


  useLayoutEffect(() => {
    loadOptionsDB_Dept()
    loadOptionsDB_type_of_Auction()
  }, [])
  useEffect(() => {


    setFilesUpload()
    try {
      const search = window.location.search
      const params = new URLSearchParams(search)
      const companyId = params.get('id')
      setCompany_Id(companyId)
      if (companyId === null || companyId === "") {
        add.current = true
        append({
          car_agreement_number: '',
          car_type: '',
          car_plate: '',
          car_model: '',
          car_chassis: '',
          car_color: '',
          car_sales_amount: '',
          car_status: '',
        });


      } else {
        add.current = false
        // send request to get data of car
        getCompanyById(companyId)

      }
    } catch (e) {
      console.log('Error', e)
      // setAdd(true)
    }

    const nav_links = document.getElementsByClassName("lnk")
    for (let i = 0; i < nav_links.length; i++) {
      nav_links[i].classList.remove("active")
    }








  }, [])










  // useEffect(() => {
  //   const duration_input = document.getElementsByName("duration")[0]
  //   duration_input.value = duration
  // }, [duration])

  useEffect(() => {
    const notes_input = document.getElementsByName("notes")[0]
    notes_input.value = notes
  }, [notes])

  useEffect(() => {
    const sold_car_number_input = document.getElementsByName("sold_car_number")[0]
    sold_car_number_input.value = sold_car_number
  }, [sold_car_number])

  useEffect(() => {
    const total_amount_input = document.getElementsByName("total_amount")[0]
    total_amount_input.value = total_amount
  }, [total_amount])

  // useEffect(() => {
  //   const car_details_input = document.getElementsByName("car_details")[0]
  //   car_details_input.value = car_details
  // }, [car_details])



  useEffect(() => {
    try {
      const commercial_number2_input = document.getElementsByName("commercial_number2")[0]
      commercial_number2_input.value = commercial_number2
    } catch (e) {

    }

  }, [commercial_number2])

  useEffect(() => {
    try {
      const Unified_No_input = document.getElementsByName("Unified_No")[0]
      Unified_No_input.value = Unified_No
    } catch (e) {

    }

  }, [Unified_No])

  useEffect(() => {
    try {
      const identity_number_gulf_input = document.getElementsByName("identity_number_gulf")[0]
      identity_number_gulf_input.value = identity_number_gulf
    } catch (e) {

    }
  }, [identity_number_gulf])

  useEffect(() => {
    try {
      const identity_number_systematic_input = document.getElementsByName("identity_number_systematic")[0]
      identity_number_systematic_input.value = identity_number_systematic
    } catch (e) {

    }
  }, [identity_number_systematic])

  useEffect(() => {
    try {
      const identity_number_input = document.getElementsByName("identity_number")[0]
      identity_number_input.value = identity_number
    } catch (e) {

    }
  }, [identity_number])


  useEffect(() => {
    try {
      const identity_name_input = document.getElementsByName("identity_name")[0]
      identity_name_input.value = identity_name
    } catch (e) {

    }
  }, [identity_name])

  useEffect(() => {
    try {
      const identity_phone_input = document.getElementsByName("identity_phone")[0]
      identity_phone_input.value = identity_phone
    } catch (e) {

    }
  }, [identity_phone])

  useEffect(() => {
    try {
      if (type_of_AuctionValueId == "1") {

        settype_of_AuctionValue({
          id: 1,
          label: "فرد",
          value: "فرد"
        })
      }
      else if (type_of_AuctionValueId == "2") {
        settype_of_AuctionValue({
          id: 2,
          label: "شركة",
          value: "شركة"
        })
      }
    } catch (e) {

    }
  }, [type_of_AuctionValueId])











  const checkonlyOneNumberWithLength = (v, n, maxLength) => {

    const name = n
    let value = v

    value = value.replace(/[^\d]/, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({ ...values, [name]: value }))
    return value
  }

  const checkonlyOneCharacterWithLength = (v, n, maxLength) => {

    const name = n
    let value = v

    value = value.replace(/[0-9]/g, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({ ...values, [name]: value }))
    return value
  }

  const checkCharactersOnly = (v, n) => {
    const value = v
    const name = n
    const regex = new RegExp(/[\p{Letter}\p{Mark}]+/gu)
    return regex.test(value)
  }

  const checkNumbersOnly = (v) => {
    const value = v

    const regex = new RegExp(/^[0-9]+$/)

    return regex.test(value)
    // const value = v
    // return value.isNumber()
  }

  const checkValidSaudiPhoneNumber = (v) => {
    const value = v


    try {
      if (value[0] === "0" & value[1] === "1") {
        const valid = checkNumbersOnly(value)
        if (valid & value.length === 10) {
          return true
        } else {
          return false
        }
      }
    } catch (e) {
      return false
    }

    const regex = new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)

    return regex.test(value)

    // test cases 
    // return regex.test('0501234567') valid test case
    // regex.test('0521234567') not valid test case

  }

  const number_of_cars = (value) => {

    // removecar(fields[index])

    if (parseInt(value) != fields.length) {

      if (parseInt(value) < fields.length) {

        if (isNaN(value)) {
          console.error('Value must be a number');
        } else {
          var removemany = [];
          var newvalue = fields.length - value
          for (let i = 0; i < newvalue; i++) {
            removemany.push((fields.length - 1) - i);  // Correctly calculate the index
            removecar(fields[(fields.length - 1) - i])
          }

          remove(removemany);
        }
      }
      else if (parseInt(value) > fields.length) {
        for (let i = fields.length; i < value; i++) {
          append({})
        }
      }

    }











    // for(let i=0;i<=value-1;i++){
    //   append({})
    // }

  }

  const checkValidEmail = (v) => {
    const value = v
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/    ///\S+@\S+\.\S+/
    return re.test(value)
  }
  const checkAddress = (v) => {
    const value = v
    if (value === '' || value === null) {
      return false
    }
    return true
  }

  const regexArabic = (v) => {
    const value = v
    const regex = new RegExp('^[ء-ي )(]+$')
    return regex.test(value)

  }

  const contractNameRegex = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Zء-ي-0-9 ()/-]+$')
    return regex.test(value)

  }


  const contractNumberRegex = (v) => {
    const value = v
    const regex = new RegExp('^[A-Z]+[-][A-Za-z]+[-][0-9]+$')
    return regex.test(value)

  }

  const regexEnglish = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Z )(]+$')
    return regex.test(value)

  }
  const checkSpaceCharacters = (v) => {
    const value = v
    const regex = new RegExp('^[ ]+$')
    return regex.test(value)

  }

  const checkInputUndefined = (value) => {
    if (value === undefined) {
      return true
    } else {
      return false
    }
  }

  let SignupSchema = ({})
  // mmm


  SignupSchema = yup.object().shape({


    // duration: yup.string().test({
    //   name: 'duration',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = duration
    //     }
    //     setduration(value)
    //     if (value === null | value === "") {
    // setdurationValidation(false)
    //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
    //     } else if (!checkNumbersOnly(value) || parseInt(value) <= 0) {
    //       setdurationValidation(false)
    //       return ctx.createError({ message: 'الرجاء إدخال فترة العقد بشكل صحيح' })
    //     }



    //     return true
    //   }
    // }),

    // department: yup.mixed().test({
    //   name: 'department',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = departmentValue
    //       console.log(value, "+666666666")
    //       if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
    //         setdepartmentValidation(false)
    //         return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //       } else {
    //         try {
    //           setdepartmentValueId(value.id)
    //         } catch (e) {
    //           console.log("1")
    //         }
    //       }
    //     }
    //     if (value === '' | value === null) {
    //       setdepartmentValidation(false)
    //       return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //     } else {
    //       try {
    //         setdepartmentValueId(value.id)
    //       } catch (e) {
    //         console.log("1")
    //       }
    //     }
    //     setdepartmentValidation(true)
    //     return true
    //   }
    // }),

    customer_type: yup.mixed().test({
      name: 'customer_type',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = customer_typeValue
          console.log(customer_typeValue, "customer_typeValue....")
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {

            setcustomer_typeValueId("")
            setcustomer_typeValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {

            try {
              setcustomer_typeValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
        }
        if (value === '' | value === null) {

          setcustomer_typeValueId("")
          setcustomer_typeValidation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
            setcustomer_typeValueId(value.id)

          } catch (e) {
            console.log("1")
          }
        }
        setcustomer_typeValidation(true)


        return true
      }
    }),

    department: yup.mixed().test({
      name: 'department',
      skipAbsent: true,
      test(value, ctx) {
        console.log(value)
        if (checkInputUndefined(value)) {
          value = departmentValue
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setdepartmentValidation(false)
            setvisible_user_dep(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setdepartmentValueId(value.id)
              console.log("dep1")

              setvisible_user_dep(true)
            } catch (e) {
              console.log("1")
            }
          }
        }
        if (value === '' | value === null) {
          setdepartmentValidation(false)
          setvisible_user_dep(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
            setdepartmentValueId(value.id)
            console.log("dep2")
            setvisible_user_dep(true)
          } catch (e) {
            console.log("1")
          }
        }
        setdepartmentValidation(true)


        if (departmentValueId != value.id) {

          loadOptionsDB_user_Dept(value.id)

        }
        return true
      }
    }),

    user_department: yup.mixed().test({
      name: 'user_department',
      skipAbsent: true,
      test(value, ctx) {
        // console.log(value.value,"user department")
        if (checkInputUndefined(value)) {
          value = user_dep_Value
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setuser_dep_Validation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setuser_dep_ValueId(value.id)
            } catch (e) {
              // console.log("1")
            }
          }
        }
        if (value === '' | value === null) {
          setuser_dep_Validation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
            setuser_dep_ValueId(value.id)
          } catch (e) {
            // console.log("1")
          }
        }
        setuser_dep_Validation(true)

        return true
      }
    }),

    notes: yup.string().test({
      name: 'notes',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = notes
        }
        setnotes(value)
        // if (value === null | value === "") {
        //   setnotesValidation(false)
        //   return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        // }

        setnotesValidation(true)
        return true
      }
    }),

    sold_car_number: yup.string().test({
      name: 'sold_car_number',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = sold_car_number
        }
        
        setsold_car_number(value)
        value = checkNumbersOnly(value)
        if (value === false) {
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }

        if (value === null | value === "") {
          setsold_car_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }
        // if (parseInt(value) >= 0) {
        //   number_of_cars(value)
        // }

        setsold_car_numberValidation(true)
        return true
      }
    }),


    total_amount: yup.string().test({
      name: 'total_amount',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = total_amount
        }
        settotal_amount(value)

        if (value === null | value === "") {
          settotal_amountValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }

        settotal_amountValidation(true)
        return true
      }
    }),

    // car_details: yup.string().test({
    //   name: 'car_details',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = car_details
    //     }
    //     setcar_details(value)

    //     if (value === null | value === "") {
    //       setcar_detailsValidation(false)
    //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
    //     }

    //     setcar_detailsValidation(true)
    //     return true
    //   }
    // }),

    type_of_Auction: yup.mixed().test({
      name: 'type_of_Auction',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = type_of_AuctionValue
          console.log(type_of_AuctionValue, "type_of_AuctionValue....")
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            // settype_of_AuctionValueId("")
            settype_of_AuctionValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {

            try {
              console.log("fesha1111")

              settype_of_AuctionValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
        }

        settype_of_AuctionValueId(value.id)
        if (value === '' | value === null) {
          // settype_of_AuctionValueId("")
          settype_of_AuctionValidation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
            console.log("fesha1111")
            settype_of_AuctionValueId(value.id)
          } catch (e) {
            console.log("1")
          }
        }
        settype_of_AuctionValidation(true)
        // if(type_of_AuctionValueId != value.id){

        //   loadOptionsDB_Cities_for_type_of_Auction(value.id)
        // }

        return true
      }
    }),

    identity_number: yup.string().test({
      name: 'identity_number',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = identity_number
        }
        setidentity_number(value)

        if (value === null | value === "") {
          setidentity_numberValidation(true)
          return true
        }
        setidentity_numberValidation(true)
        return true
      }
    }),


    identity_number_systematic: yup.string().test({
      name: 'identity_number_systematic',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = identity_number_systematic
        }
        setidentity_number_systematic(value)

        if (value === null | value === "") {
          setidentity_number_systematicValidation(true)
          return true
        }
        setidentity_number_systematicValidation(true)
        return true
      }
    }),


    identity_number_gulf: yup.string().test({
      name: 'identity_number_gulf',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = identity_number_gulf
        }
        setidentity_number_gulf(value)

        if (value === null | value === "") {
          setidentity_number_gulfValidation(true)
          return true
        }
        setidentity_number_gulfValidation(true)
        return true
      }
    }),

    identity_name: yup.string().test({
      name: 'identity_name',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = identity_name
        }
        setidentity_name(value)
        if (value === null | value === "") {
          setidentity_nameValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkCharactersOnly(value)
          if (value === false) {
            setidentity_nameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
          }
        }

        setidentity_nameValidation(true)
        return true
      }
    }),

    identity_phone: yup.string().test({
      name: 'identity_phone',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = identity_phone
        }
        setidentity_phone(value)
        if (value === null | value === "") {
          setidentity_phoneValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkValidSaudiPhoneNumber(value)
          if (value === false) {
            setidentity_phoneValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
          }
        }

        setidentity_phoneValidation(true)
        return true
      }
    }),



    commercial_number2: yup.string().test({
      name: 'commercial_number2',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = commercial_number2
        }
        setcommercial_number2(value)

        if (value === null | value === "") {
          setcommercial_number2Validation(true)
          return true
        }
        setcommercial_number2Validation(true)
        return true
      }
    }),

    Unified_No: yup.string().test({
      name: 'Unified_No',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = Unified_No
        }
        setUnified_No(value)

        if (value === null | value === "") {
          setUnified_NoValidation(true)
          return true
        }
        setUnified_NoValidation(true)
        return true
      }
    }),


    fields: yup.array().of(
      yup.object().shape({
        car_agreement_number: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_type: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_plate: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_model: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_chassis: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_color: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_sales_amount: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
        car_status: yup.object().shape({
          id: yup.string().required('الرجاء ملء هذه الخانة مطلوبة'),
          value: yup.string().required('الرجاء ملء هذه الخانة مطلوبة').oneOf(['1', '2'], 'الرجاء اختيار قيمة صحيحة من القائمة'),
          label: yup.string().required('الرجاء ملء هذه الخانة مطلوبة')
        }).nullable().required('الرجاء ملء هذه الخانة مطلوبة'),

      })
    )









  })



  const saveDataCompany = async () => {
    console.log("saving ........ ")
    setLoaderShow(true)
    const token = localStorage.getItem("token")


    const bodyFormData = new FormData()
    if (add['current'] === true) {
      console.log(cityValueId, "** .. before .. **")


      let cityValueId_backend = ""
      if (cityValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        cityValueId_backend = cityValueId.substring(1, cityValueId.length)

      }
      let companyValueId_backend = ""
      if (companyValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        companyValueId_backend = companyValueId.substring(1, companyValueId.length)
      }
      console.log(cityValueId_backend, "**awes**")
      console.log(companyValueId_backend, "---awes-")

      console.log(cityValueId, "****")

      bodyFormData.append('Tenure', duration)
      console.log(contractNumber, "-*-*con")
      bodyFormData.append('Contract_Name', name)
      bodyFormData.append('Contract_Number', contractNumber)
      bodyFormData.append('renewDuration', renewDuration)





      bodyFormData.append('Company_name', companyValueId_backend)
      bodyFormData.append('Status_of_cont', contract_statusValueId)
      bodyFormData.append('sadad_type', sadad_typeValueId)

      bodyFormData.append('Department', departmentValueId)
      bodyFormData.append('departmentValue', departmentValue.value)
      bodyFormData.append('City', cityValueId_backend)
      bodyFormData.append('Note', notes)
      bodyFormData.append('Start_Date_of_Contract', date_from)
      bodyFormData.append('End_Date_of_Contract', date_to)
      bodyFormData.append('Country', countryValueId)
      bodyFormData.append('renew', renewValueId)
      bodyFormData.append('type', typeValueId)
      bodyFormData.append('tawreed_type', tawreed_type)

      bodyFormData.append('billData', JSON.stringify(billData))
      console.log(JSON.stringify(billData), "billData................")



      // bodyFormData.append('End_Date_of_Contract', date_to)

      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }

      bodyFormData.append('sold_car_number', sold_car_number)
      bodyFormData.append('total_amount', total_amount)
      bodyFormData.append('car_details', car_details)
      bodyFormData.append('annual_value_sadad', annual_value_sadad)
      bodyFormData.append('type_of_Auction', type_of_AuctionValueId)
      bodyFormData.append('identity_number', identity_number)
      bodyFormData.append('identity_name', identity_name)
      bodyFormData.append('identity_phone', identity_phone)
      bodyFormData.append('identity_number_systematic', identity_number_systematic)
      bodyFormData.append('identity_number_gulf', identity_number_gulf)
      bodyFormData.append('commercial_number2', commercial_number2)
      bodyFormData.append('Unified_No', Unified_No)
      bodyFormData.append('Car_data', JSON.stringify(data.fields))
      bodyFormData.append('Car_data_remove', JSON.stringify(car_data_remove))







    } else {



      console.log(billData, "save billData")
      let cityValueId_backend = ""
      if (cityValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        cityValueId_backend = cityValueId.substring(1, cityValueId.length)

      }
      let companyValueId_backend = ""
      console.log(companyValueId, "333")
      if (companyValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        companyValueId_backend = companyValueId.substring(1, companyValueId.length)
      }

      console.log(companyValueId_backend, "awas")
      console.log(cityValueId_backend, "**awes**")

      bodyFormData.append('Tenure', duration)
      console.log(contractNumber, "-*-*con")
      bodyFormData.append('Contract_Name', name)
      bodyFormData.append('Contract_Number', contractNumber)
      bodyFormData.append('renewDuration', renewDuration)
      bodyFormData.append('tawreed_type', tawreed_type)
      // bodyFormData.append('contract_dep_slug', contract_dep_slug)


      bodyFormData.append('Company_name', companyValueId_backend)
      bodyFormData.append('Status_of_cont', contract_statusValueId)
      bodyFormData.append('sadad_type', sadad_typeValueId)


      bodyFormData.append('Department', departmentValueId)
      bodyFormData.append('City', cityValueId_backend)
      bodyFormData.append('Note', notes)
      bodyFormData.append('Start_Date_of_Contract', date_from)
      bodyFormData.append('End_Date_of_Contract', date_to)
      bodyFormData.append('Country', countryValueId)
      bodyFormData.append('renew', renewValueId)
      bodyFormData.append('type', typeValueId)
      bodyFormData.append('billData', JSON.stringify(billData))

      console.log('billData', JSON.stringify(billData))



      console.log(my_ids_of_files, "ya awes ids")
      if (my_ids_of_files == "") {
        bodyFormData.append("new_files_ids", ",")

      } else {
        bodyFormData.append("new_files_ids", my_ids_of_files)

      }

      // mmm

      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }


      bodyFormData.append('contract_id', company_Id)

      bodyFormData.append('sold_car_number', sold_car_number)
      bodyFormData.append('total_amount', total_amount)
      bodyFormData.append('car_details', car_details)
      bodyFormData.append('annual_value_sadad', annual_value_sadad)
      bodyFormData.append('type_of_Auction', type_of_AuctionValueId)
      bodyFormData.append('identity_number', identity_number)
      bodyFormData.append('identity_name', identity_name)
      bodyFormData.append('identity_phone', identity_phone)
      bodyFormData.append('identity_number_systematic', identity_number_systematic)
      bodyFormData.append('identity_number_gulf', identity_number_gulf)
      bodyFormData.append('commercial_number2', commercial_number2)
      bodyFormData.append('Unified_No', Unified_No)
      bodyFormData.append('Car_data', JSON.stringify(data.fields))
      bodyFormData.append('Car_data_remove', JSON.stringify(car_data_remove))


    }




    // console.log(duration,"duration")
    // console.log(name,"name")
    // console.log( contractNumber)
    // console.log( companyValueId)
    // console.log( contract_statusValueId)
    // console.log( departmentValueId)
    // console.log( cityValueId)
    // console.log( notes)
    // console.log( date_from)
    // console.log( date_to)

    // console.log(bodyFormData.data,"awes request")

    console.log(bodyFormData, "body form")


    try {
      if (add['current'] === true) {
        if (backend_files.length == 0) {
          seterrorFile("إرفاق المستندات مطلوبة")
          setLoaderShow(false)
          return
        } else {
          seterrorFile("")

        }
        console.log("posting ...................")

        axios({
          method: "post",
          url: `${domain_url}/Contract/AddContractsAuction/`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response, "contract..", response.data[0]["succse"], response.data[0]["succse "])

            if (response.data[0]["succse"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data[0]["message"]}`)

              setHeadAlert(" حدث خطأ ")
              setShowAlert(true)
              setLoaderShow(false)
            }



            else {
              setTypeAlert("Success")
              setTitleAlert(`${response.data[0]["message"]}`)
              setHeadAlert("  ")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/ContractAuction?success=added')
              } else {
                navigate('/ContractAuction?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response, "error")
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          })


      } else {
        axios({
          method: "put",
          url: `${domain_url}/Contract/AddContractsAuction/?id=${company_Id}`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response, "eeee")
            console.log(response.data, "777")
            console.log(response.data.message[0]["succse"], "***9")
            // console.log(response.data.message[0]["succse"],"999")
            if (response.data.message[0]["succse"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data["message"][0]["message"]}`)

              setHeadAlert("حدث خطأ، ")
              setShowAlert(true)
              setLoaderShow(false)
            }

            else {
              setTypeAlert("Success")
              setTitleAlert("تم إضافة الشركة بنجاح.")
              setHeadAlert("")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/ContractAuction?success=added')
              } else {
                navigate('/ContractAuction?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response.message, "awaw")
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          })


      }

    } catch (e) {
      console.log(e)
      setTypeAlert("Fail")
      setTitleAlert("لم يتم إضافة الشركة بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      setLoaderShow(false)
    }
  }

  const saveDataCompanynew = async (data) => {
    console.log("saving ........ ")
    setLoaderShow(true)
    const token = localStorage.getItem("token")


    const bodyFormData = new FormData()
    if (add['current'] === true) {
      console.log(cityValueId, "** .. before .. **")


      let cityValueId_backend = ""
      if (cityValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        cityValueId_backend = cityValueId.substring(1, cityValueId.length)

      }
      let companyValueId_backend = ""
      if (companyValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        companyValueId_backend = companyValueId.substring(1, companyValueId.length)
      }
      console.log(cityValueId_backend, "**awes**")
      console.log(companyValueId_backend, "---awes-")

      console.log(cityValueId, "****")

      bodyFormData.append('Tenure', duration)
      console.log(contractNumber, "-*-*con")
      bodyFormData.append('Contract_Name', name)
      bodyFormData.append('Contract_Number', contractNumber)
      bodyFormData.append('renewDuration', renewDuration)





      bodyFormData.append('Company_name', companyValueId_backend)
      bodyFormData.append('Status_of_cont', contract_statusValueId)
      bodyFormData.append('sadad_type', sadad_typeValueId)

      bodyFormData.append('Department', departmentValueId)
      bodyFormData.append('departmentValue', departmentValue.value)
      bodyFormData.append('notify_manager_id', user_dep_ValueId)
      bodyFormData.append('City', cityValueId_backend)
      bodyFormData.append('Note', notes)
      bodyFormData.append('Start_Date_of_Contract', date_from)
      bodyFormData.append('End_Date_of_Contract', date_to)
      bodyFormData.append('Country', countryValueId)
      bodyFormData.append('renew', renewValueId)
      bodyFormData.append('type', typeValueId)
      bodyFormData.append('tawreed_type', tawreed_type)

      bodyFormData.append('billData', JSON.stringify(billData))
      console.log(JSON.stringify(billData), "billData................")



      // bodyFormData.append('End_Date_of_Contract', date_to)

      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }

      bodyFormData.append('sold_car_number', sold_car_number)
      bodyFormData.append('total_amount', total_amount)
      bodyFormData.append('car_details', car_details)
      bodyFormData.append('annual_value_sadad', annual_value_sadad)
      bodyFormData.append('type_of_Auction', type_of_AuctionValueId)
      bodyFormData.append('identity_number', identity_number)
      bodyFormData.append('identity_name', identity_name)
      bodyFormData.append('identity_phone', identity_phone)
      bodyFormData.append('identity_number_systematic', identity_number_systematic)
      bodyFormData.append('identity_number_gulf', identity_number_gulf)
      bodyFormData.append('commercial_number2', commercial_number2)
      bodyFormData.append('Unified_No', Unified_No)
      bodyFormData.append('Car_data', JSON.stringify(data.fields))
      bodyFormData.append('Car_data_remove', JSON.stringify(car_data_remove))
      bodyFormData.append('customer_type', customer_typeValueId)








    } else {



      console.log(billData, "save billData")
      let cityValueId_backend = ""
      if (cityValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        cityValueId_backend = cityValueId.substring(1, cityValueId.length)

      }
      let companyValueId_backend = ""
      console.log(companyValueId, "333")
      if (companyValueId.at(0) == ",") {
        // cityValueId = cityValueId.slice(0,-1)
        companyValueId_backend = companyValueId.substring(1, companyValueId.length)
      }

      console.log(companyValueId_backend, "awas")
      console.log(cityValueId_backend, "**awes**")

      bodyFormData.append('Tenure', duration)
      console.log(contractNumber, "-*-*con")
      bodyFormData.append('Contract_Name', name)
      bodyFormData.append('Contract_Number', contractNumber)
      bodyFormData.append('renewDuration', renewDuration)
      bodyFormData.append('tawreed_type', tawreed_type)
      // bodyFormData.append('contract_dep_slug', contract_dep_slug)


      bodyFormData.append('Company_name', companyValueId_backend)
      bodyFormData.append('Status_of_cont', contract_statusValueId)
      bodyFormData.append('sadad_type', sadad_typeValueId)


      bodyFormData.append('Department', departmentValueId)
      bodyFormData.append('notify_manager_id', user_dep_ValueId)
      bodyFormData.append('City', cityValueId_backend)
      bodyFormData.append('Note', notes)
      bodyFormData.append('Start_Date_of_Contract', date_from)
      bodyFormData.append('End_Date_of_Contract', date_to)
      bodyFormData.append('Country', countryValueId)
      bodyFormData.append('renew', renewValueId)
      bodyFormData.append('type', typeValueId)
      bodyFormData.append('billData', JSON.stringify(billData))

      console.log('billData', JSON.stringify(billData))



      console.log(my_ids_of_files, "ya awes ids")
      if (my_ids_of_files == "") {
        bodyFormData.append("new_files_ids", ",")

      } else {
        bodyFormData.append("new_files_ids", my_ids_of_files)

      }

      // mmm

      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }


      bodyFormData.append('contract_id', company_Id)

      bodyFormData.append('sold_car_number', sold_car_number)
      bodyFormData.append('total_amount', total_amount)
      bodyFormData.append('car_details', car_details)
      bodyFormData.append('annual_value_sadad', annual_value_sadad)
      bodyFormData.append('type_of_Auction', type_of_AuctionValueId)
      bodyFormData.append('identity_number', identity_number)
      bodyFormData.append('identity_name', identity_name)
      bodyFormData.append('identity_phone', identity_phone)
      bodyFormData.append('identity_number_systematic', identity_number_systematic)
      bodyFormData.append('identity_number_gulf', identity_number_gulf)
      bodyFormData.append('commercial_number2', commercial_number2)
      bodyFormData.append('Unified_No', Unified_No)
      bodyFormData.append('Car_data', JSON.stringify(data.fields))
      bodyFormData.append('Car_data_remove', JSON.stringify(car_data_remove))
      bodyFormData.append('customer_type', customer_typeValueId)


    }




    // console.log(duration,"duration")
    // console.log(name,"name")
    // console.log( contractNumber)
    // console.log( companyValueId)
    // console.log( contract_statusValueId)
    // console.log( departmentValueId)
    // console.log( cityValueId)
    // console.log( notes)
    // console.log( date_from)
    // console.log( date_to)

    // console.log(bodyFormData.data,"awes request")

    console.log(bodyFormData, "body form")


    try {
      if (add['current'] === true) {
        if (backend_files.length == 0) {
          seterrorFile("إرفاق المستندات مطلوبة")
          setLoaderShow(false)
          return
        } else {
          seterrorFile("")

        }
        console.log("posting ...................")

        axios({
          method: "post",
          url: `${domain_url}/Contract/AddContractsAuction/`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response, "contract..", response.data[0]["succse"], response.data[0]["succse "])

            if (response.data[0]["succse"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data[0]["message"]}`)

              setHeadAlert(" حدث خطأ ")
              setShowAlert(true)
              setLoaderShow(false)
            }



            else {
              setTypeAlert("Success")
              setTitleAlert(`${response.data[0]["message"]}`)
              setHeadAlert("  ")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/ContractAuction?success=added')
              } else {
                navigate('/ContractAuction?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response, "error")
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          })


      } else {
        axios({
          method: "put",
          url: `${domain_url}/Contract/AddContractsAuction/?id=${company_Id}`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response, "eeee")
            console.log(response.data, "777")
            console.log(response.data.message[0]["succse"], "***9")
            // console.log(response.data.message[0]["succse"],"999")
            if (response.data.message[0]["succse"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data["message"][0]["message"]}`)

              setHeadAlert("حدث خطأ، ")
              setShowAlert(true)
              setLoaderShow(false)
            }

            else {
              setTypeAlert("Success")
              setTitleAlert("تم إضافة الشركة بنجاح.")
              setHeadAlert("")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/ContractAuction?success=added')
              } else {
                navigate('/ContractAuction?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response.message, "awaw")
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          })


      }

    } catch (e) {
      console.log(e)
      setTypeAlert("Fail")
      setTitleAlert("لم يتم إضافة الشركة بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      setLoaderShow(false)
    }
  }

  // const loadOptionsDB_Company = async () => {
  //   const token = localStorage.getItem("token")

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }
  //   console.log(companyData, "companyData........")
  //   if (companyData.length > 0) {
  //     return companyData
  //   } else {
  //     const data = await axios.get(`${domain_url}/Contract/company_list`, config).then(res => {
  //       console.log(res.data.city, "jaja")
  //       const company_list = []
  //       const result = res.data.company

  //       result.forEach((item, index, array) => {
  //         console.log(item, "item00")
  //         let disabledVal = ""
  //         console.log(item.company_type, "item.company_type")
  //         if (item.company_type == "1") {
  //           disabledVal = true
  //         } else {
  //           disabledVal = false

  //         }
  //         console.log(disabledVal, "disabledVal")
  //         company_list.push(
  //           {
  //             id: item['id'],
  //             value: item['Company_Name'],
  //             label: item['Company_Name'],
  //             isDisabled: disabledVal
  //           }
  //         )
  //       })
  //       return company_list


  //     })
  //     console.log("data .company", data)
  //     setCompanyData(data)
  //     return data
  //   }
  // }

  // const loadOptionsDB_Status = async () => {
  //   const token = localStorage.getItem("token")

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }
  //   if (contract_statusData.length > 0) {
  //     return contract_statusData
  //   } else {
  //     const data = await axios.get(`${domain_url}/Contract/status_list`, config).then(res => {
  //       console.log(res.data.city, "jaja")
  //       const company_list = []
  //       const result = res.data.status

  //       result.forEach((item, index, array) => {
  //         console.log(item['id'], item['Status_of_cont'], "iteid")
  //         // if(item['id'] != "2"){
  //         if (item['id'] != "2" && item['id'] != "3") {
  //           company_list.push(
  //             {
  //               id: item['id'],
  //               value: item['Status_of_cont'],
  //               label: item['Status_of_cont']
  //             }
  //           )
  //         }
  //       })
  //       return company_list


  //     })
  //     console.log("data .", data)
  //     setcontract_statusData(data)
  //     return data
  //   }
  // }


  // const loadOptionsDB_City = async () => {
  //   const token = localStorage.getItem("token")

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }
  //   console.log(cityData,"cityData")
  //   if (cityData.length > 0) {
  //     console.log("yeas")
  //     return cityData
  //   } else {
  //     console.log("no")

  //   const data = await axios.get(`${domain_url}/Contract/dropdowndata`, config).then(res => {
  //     console.log(res.data.city,"jaja")
  //     const city_list = []
  //     const result = res.data.city
  //     console.log(result,"city")
  //     result.forEach((item, index, array) => {
  //       city_list.push(
  //         {
  //           id: item['id'],
  //           value: item['Status_of_cont'],
  //           label: item['Status_of_cont']
  //         }
  //       )
  //     })
  //     return city_list


  //   })
  //   console.log("data .", data)
  //   setcityData(data)
  //   return data
  //   }
  // }
  // const loadOptionsDB_City = async () => {
  //   const token = localStorage.getItem("token")

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }
  //   if (cityData.length > 0) {
  //     return cityData
  //   } else {
  //     const data = await axios.get(`${domain_url}/Company/dropdown_data`, config).then(res => {
  //       const company_list = []
  //       const result = res.data.city

  //       result.forEach((item, index, array) => {
  //         company_list.push(
  //           {
  //             id: item['id'],
  //             value: item['Status_of_cont'],
  //             label: item['Status_of_cont']
  //           }
  //         )
  //       })
  //       return company_list


  //     })
  //     console.log("data .", data)
  //     setcityData(data)
  //     return data
  //   }
  // }

  const loadOptionsDB_user_Dept = async (departmentId) => {
    setValue('user_department', null)
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    setLoaderShow(true)
    const data = await axios.get(`${domain_url}/users/user_departments?department=${departmentId}`, config).then(res => {
      const company_list = []
      const result = res.data.data

      result.forEach((item, index, array) => {
        company_list.push(
          {
            id: item['id'],
            value: item['phone'],
            label: item['fullName']
          }
        )
      })
      setLoaderShow(false)
      return company_list


    })
    console.log("data .", data)
    setuser_dep_Data(data)

    // reset({ user_department: null });
    return data

  }

  const loadOptionsDB_user_Dept_editing = async (departmentId) => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    setLoaderShow(true)
    const data = await axios.get(`${domain_url}/users/user_departments?department=${departmentId}`, config).then(res => {
      const company_list = []
      const result = res.data.data

      result.forEach((item, index, array) => {
        company_list.push(
          {
            id: item['id'],
            value: item['phone'],
            label: item['fullName']
          }
        )
      })
      setLoaderShow(false)
      return company_list


    })
    console.log("data .", data)
    setuser_dep_Data(data)

    // reset({ user_department: null });
    return data

  }

  const loadOptionsDB_Dept = async () => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (departmentData.length > 0) {
      return departmentData
    } else {
      const data = await axios.get(`${domain_url}/Contract/department_list`, config).then(res => {
        console.log(res.data.city, "jaja")
        const company_list = []
        const result = res.data.Departments

        result.forEach((item, index, array) => {
          company_list.push(
            {
              id: item['id'],
              value: item['Dep_Name'],
              label: item['Dep_Name']
            }
          )
        })
        return company_list


      })
      console.log("data .", data)
      setdepartmentData(data)
      return data
    }
  }

  const loadOptionsDB_Country = async () => {
    console.log("again loading ...")
    const token = localStorage.getItem("token")


    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    console.log(countryValueId, countryValueId, "CountryValueId")
    // try{
    //   if (countryValueId != "0") {
    //     return 
    //   }
    // } catch(e){
    //   return
    // }

    if (countryValue != false) {

    }
    if (CountryData.length > 0) {
      // loadOptionsDB_Cities_for_country(countryValueId)
      return CountryData
    } else {
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const country_list = []
        const result = res.data.data

        result.forEach((item, index, array) => {
          country_list.push(
            {
              id: item['id'],
              value: item['name_arabic'],
              label: item['name_arabic']
            }
          )
        })
        return country_list


      })
      setCountryData(data)
      return data
    }
  }

  const loadOptionsDB_renew = async () => {
    console.log("again loading ... renew", renewData)
    const token = localStorage.getItem("token")


    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (renewData.length > 0) {
      console.log("again loading ... renew")
      return renewData
    }
    else {
      console.log("again loading ... renew")
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const company_activity_list = []
        // const result = res.data.data

        // result.forEach((item, index, array) => {
        company_activity_list.push(
          {
            id: "0",
            value: "تلقائي",
            label: "تلقائي"
          }
        )
        company_activity_list.push(
          {
            id: "1",
            value: "تلقائي بإشعار",
            label: "تلقائي بإشعار"
          }
        )
        company_activity_list.push(
          {
            id: "2",
            value: "غير تلقائي",
            label: "غير تلقائي"
          }
        )

        // })
        return company_activity_list


      })
      setrenewData(data)
      return data
    }
  }



  const loadOptionsDB_sadad_type = async () => {
    console.log("again loading ... renew", renewData)
    const token = localStorage.getItem("token")


    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (renewData.length > 0) {
      console.log("again loading ... renew")
      return renewData
    }
    else {
      console.log("again loading ... renew")
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const company_activity_list = []
        // const result = res.data.data

        // result.forEach((item, index, array) => {
        company_activity_list.push(
          {
            id: "0",
            value: "فاتورة",
            label: "فاتورة"
          }
        )
        company_activity_list.push(
          {
            id: "1",
            value: "مزاد",
            label: "مزاد"
          }
        )


        // })
        return company_activity_list


      })
      setsadad_typeData(data)
      return data
    }
  }



  const loadOptionsDB_type = async () => {
    console.log("again loading ... type")
    const token = localStorage.getItem("token")


    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    console.log(typeValueId, typeData, "typeData.......")

    if (typeData.length > 0) {
      return typeData
    } else {
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const company_activity_list2 = []
        // const result = res.data.data

        // result.forEach((item, index, array) => {
        company_activity_list2.push(
          {
            id: "0",
            value: "فاتورة",
            label: "فاتورة"
          }
        )
        company_activity_list2.push(
          {
            id: "1",
            value: "مزاد",
            label: "مزاد"
          }
        )
        company_activity_list2.push(
          {
            id: "2",
            value: "توريد",
            label: "توريد"
          }
        )


        // })
        return company_activity_list2


      })
      settypeData(data)
      return data
    }
  }


  const loadOptionsDB_type_of_Auction = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (type_of_AuctionData.length > 0) {
      return type_of_AuctionData
    } else {
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const company_activity_list2 = []
        company_activity_list2.push(
          {
            id: "1",
            value: "فرد",
            label: "فرد"
          }
        )
        company_activity_list2.push(
          {
            id: "2",
            value: "شركة",
            label: "شركة"
          }
        )



        // })
        return company_activity_list2


      })
      settype_of_AuctionData(data)
      return data
    }
  }




  // const loadOptionsDB_Cities_for_country = async (countryValueId) => {
  //   const token = localStorage.getItem("token")
  //   setLoaderShow(true)
  //   // let LoaderForCity = document.querySelector(".LoaderForCity")
  //   // LoaderForCity.classList.remove("d-none")
  //   let countryValueorg = countryValue
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }
  //   console.log(countryValueId, "countryValueId")

  //   if (false) {
  //     // return companyData
  //     console.log("yeas")
  //   } else {
  //     // setLoaderShow(true)
  //     console.log("send request ...", `${domain_url}/Country/CountryCities?countryId=${countryValueId}`)

  //     const data = await axios.get(`${domain_url}/Country/CountryCities?countryId=${countryValueId}`, config).then(res => {
  //       console.log(res.data.data, "nana")
  //       const company_list = []
  //       const result = res.data.data

  //       result.forEach((item, index, array) => {
  //         company_list.push(
  //           {
  //             id: item['id'],
  //             value: item['Status_of_cont'],
  //             label: item['Status_of_cont']
  //           }
  //         )
  //       })
  //       return company_list


  //     })
  //     setcityData(data)
  //     // LoaderForCity.classList.add("d-none")

  //     setLoaderShow(false)

  //     // setCountryValue(countryValueorg)
  //     // setLoaderShow(false)
  //     // return data
  //   }
  // }


  // const SelectWithValidation1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

  //   return (
  //     <>
  //       <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
  //         {title}
  //       </Label>
  //       <Controller
  //         id={id_name}
  //         name={id_name}

  //         control={control}
  //         className="hany"
  //         render={({ field }) => (
  //           <AsyncSelect
  //             defaultValue={defaultValue}
  //             {...field}
  //             defaultOptions
  //             // cacheOptions
  //             isClearable
  //             id={id_name}
  //             name={id_name}
  //             classNamePrefix='select-white'
  //             placeholder='اختر من القائمة'
  //             loadOptions={loadOptionsDB}
  //             theme={selectThemeColors}
  //             isSearchable

  //             className={errors_check ? 'react-select h-60 f-s-12px f-w-700 bg-F7FAF7 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700    h-60 f-s-12px w-100'}
  //           />)
  //         }
  //       />
  //       {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
  //     </>
  //   )
  //   // return (
  //   //   <>
  //   //     <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
  //   //       {title}
  //   //     </Label>
  //   //     <Controller
  //   //       id={id_name}
  //   //       name={id_name}

  //   //       control={control}
  //   //       className="hany"
  //   //       render={({ field }) => (
  //   //         <Select options={loadOptionsDB} />)
  //   //       }
  //   //     />
  //   //     {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
  //   //   </>
  //   // )
  // }

  // const SelectWithValidation1MultiChoices1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

  //   return (
  //     <>
  //       <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
  //         {title}
  //       </Label>
  //       <Controller
  //         id={id_name}
  //         name={id_name}

  //         control={control}
  //         className="hany"
  //         render={({ field }) => (
  //           <AsyncSelect
  //             isMulti
  //             defaultValue={defaultValue}
  //             {...field}
  //             defaultOptions
  //             isClearable
  //             id={id_name}
  //             name={id_name}
  //             classNamePrefix='select-white'
  //             placeholder='اختر من القائمة'
  //             loadOptions={loadOptionsDB}
  //             theme={selectThemeColors}
  //             // isSearchable={false}

  //             className={errors_check ? 'react-select h-60 f-s-12px f-w-700 bg-F7FAF7 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700    h-60 f-s-12px w-100'}
  //           />)
  //         }
  //       />
  //       {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
  //     </>
  //   )
  // }


  const SelectWithValidation1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

    return (
      <>
        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
          {title}
        </Label>
        <Controller
          id={id_name}
          name={id_name}

          control={control}
          className="hany"
          render={({ field }) => (
            <Select
              defaultValue={defaultValue}
              {...field}
              defaultOptions
              // cacheOptions
              isClearable
              id={id_name}
              name={id_name}
              classNamePrefix='select-white'
              placeholder='اختر من القائمة'
              options={loadOptionsDB}
              theme={selectThemeColors}
              isSearchable

              className={errors_check ? 'react-select h-60 f-s-12px f-w-700 bg-F7FAF7 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700    h-60 f-s-12px w-100'}
            />)
          }
        />
        {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
      </>
    )
    // return (
    //   <>
    //     <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
    //       {title}
    //     </Label>
    //     <Controller
    //       id={id_name}
    //       name={id_name}

    //       control={control}
    //       className="hany"
    //       render={({ field }) => (
    //         <Select options={loadOptionsDB} />)
    //       }
    //     />
    //     {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
    //   </>
    // )
  }

  const SelectWithValidation1MultiChoices1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

    return (
      <>
        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
          {title}
        </Label>
        <Controller
          id={id_name}
          name={id_name}

          control={control}
          className="hany"
          render={({ field }) => (
            <Select
              isMulti
              defaultValue={defaultValue}
              {...field}
              defaultOptions
              isClearable
              id={id_name}
              name={id_name}
              classNamePrefix='select-white'
              placeholder='اختر من القائمة'
              options={loadOptionsDB}
              theme={selectThemeColors}
              // isSearchable={false}

              className={errors_check ? 'react-select h-60 f-s-12px f-w-700 bg-F7FAF7 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700    h-60 f-s-12px w-100'}
            />)
          }
        />
        {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
      </>
    )
  }

  const SelectWithValidation2 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

    return (
      <>
        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
          {title}
        </Label>
        <Controller
          id={id_name}
          name={id_name}

          control={control}
          className="hany"
          render={({ field }) => (
            <Select
              defaultValue={defaultValue}
              {...field}
              defaultOptions
              // cacheOptions
              isClearable
              id={id_name}
              name={id_name}
              classNamePrefix='select-white'
              placeholder='اختر من القائمة'
              options={loadOptionsDB}
              theme={selectThemeColors}
              isSearchable

              className={errors_check ? 'react-select h-60 f-s-12px f-w-700 bg-F7FAF7 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700    h-60 f-s-12px w-100'}
            />)
          }
        />
        {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
      </>
    )
    // return (
    //   <>
    //     <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={id_name}>
    //       {title}
    //     </Label>
    //     <Controller
    //       id={id_name}
    //       name={id_name}

    //       control={control}
    //       className="hany"
    //       render={({ field }) => (
    //         <Select options={loadOptionsDB} />)
    //       }
    //     />
    //     {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
    //   </>
    // )
  }



  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange', resolver: yupResolver(SignupSchema)
    // defaultValues: {
    //   fields: [
    //     {

    //       'car_agreement_number': '',
    //       'car_type': '',
    //       'car_plate': '',
    //       'car_model': '',
    //       'car_chassis': '',
    //       'car_color': '',
    //       'car_sales_amount': '',
    //       'car_status': ''
    //     }
    //   ]
    // }

  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  });


  // append({
  // car_agreement_number: '',
  // car_type: '',
  // car_plate: '',
  // car_model: '',
  // car_chassis: '',
  // car_color: '',
  // car_sales_amount: '',
  // car_status: ''
  // });


  const onSubmit = data => {
    console.log(data, "submit")



    if (add['current']) {
      if ((departmentValidation & user_dep_Validation & notesValidation & !date_fromValidation & sold_car_numberValidation & total_amountValidation)) {
        console.log("submir")
        saveDataCompanynew(data)
      }
    }
    else {
      console.log("submir")
      if ((departmentValidation & user_dep_Validation & notesValidation & !date_fromValidation & sold_car_numberValidation & total_amountValidation)) {
        saveDataCompanynew(data)
      }
    }
  }

  // } else {
  //   console.log("can not")
  // }



  // function handleClickSave() {
  //   console.log("clicked btn ...")
  //   let date_from_input = document.getElementsByName("date_from")[0]
  //   let date_to_input = document.getElementsByName("date_to")[0]

  //   let date_from = date_from_input.value
  //   let date_to = date_to_input.value

  //   if (date_from == "" || date_from == undefined) {
  //     console.log("notcalid")
  //     setdate_fromValidation(true)
  //     setdate_from("")
  //     date_from_input.classList.add("form-control")
  //     date_from_input.classList.add("form-control-lg")
  //     date_from_input.classList.add("is-invalid")


  //   } else {
  //     setdate_fromValidation(false)
  //     setdate_from(date_from)
  //     date_from_input.classList.add("form-control")
  //     date_from_input.classList.add("form-control-lg")
  //     date_from_input.classList.remove("is-invalid")

  //   }

  //   if (date_to == "" || date_to == undefined) {
  //     console.log("notcalid")

  //     setdate_toValidation(true)
  //     setdate_to("")
  //     date_to_input.classList.add("form-control")
  //     date_to_input.classList.add("form-control-lg")
  //     date_to_input.classList.add("is-invalid")


  //   } else {
  //     setdate_toValidation(false)
  //     setdate_to(date_to)
  //     date_to_input.classList.add("form-control")
  //     date_to_input.classList.add("form-control-lg")
  //     date_to_input.classList.remove("is-invalid")

  //   }
  // }

  function handleClickSave() {
    console.log("clicked btn ...")
    let date_from_input = document.getElementsByName("date_from")[0]
    let date_to_input = document.getElementsByName("date_to")[0]

    let date_from = date_from_input.value

    if (date_from == "" || date_from == undefined) {
      console.log("notcalid")
      setdate_fromValidation(true)
      setdate_from("")
      date_from_input.classList.add("form-control")
      date_from_input.classList.add("form-control-lg")
      date_from_input.classList.add("is-invalid")


    } else {
      setdate_fromValidation(false)
      setdate_from(date_from)
      date_from_input.classList.add("form-control")
      date_from_input.classList.add("form-control-lg")
      date_from_input.classList.remove("is-invalid")

    }


  }


  function calc_date(date_from, tenture) {
    if (tenture != null & tenture != "") {

      var date_from = new Date(date_from);
      date_from.setDate(date_from.getDate() + parseInt(tenture));
      setdate_to(date_from)

    } else {
      console.log("empty tenture ....")
    }
  }

  function calc_dateViaDates(date_from, date_to) {

    console.log("here.......")

    let date_from_input = document.getElementsByName("date_from")[0]
    let date_to_input = document.getElementsByName("date_to")[0]

    var date_from = new Date(date_from);
    var date_to = new Date(date_to);
    console.log(date_from, "-------------", date_to, "Difference_In_Days..............................")

    var Difference_In_Time = date_to.getTime() - date_from.getTime();
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24))
    setduration(Difference_In_Days)
    console.log(Difference_In_Days, "Difference_In_Days..............................")
    if (Difference_In_Days <= 0) {
      console.log("less")
      setdate_fromValidation(true)
      date_from_input.classList.add("is-invalid")

      setdate_toValidation(true)
      date_to_input.classList.add("is-invalid")
      setdurationValidation(false)
    } else {
      setdate_fromValidation(false)
      date_from_input.classList.remove("is-invalid")
      setdate_toValidation(false)
      date_to_input.classList.remove("is-invalid")

      setdurationValidation(true)

    }



  }

  function calc_dateToViaDates(date_to, date_from) {
    console.log("there.......")


    let date_from_input = document.getElementsByName("date_from")[0]
    let date_to_input = document.getElementsByName("date_to")[0]

    var date_from = new Date(date_from);
    var date_to = new Date(date_to);
    console.log(date_from, "-------------", date_to, "Difference_In_Days..............................")

    var Difference_In_Time = date_to.getTime() - date_from.getTime();
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24))


    if (Difference_In_Days <= 0) {
      console.log("less")
      setdate_fromValidation(true)
      date_from_input.classList.add("is-invalid")

      setdate_toValidation(true)
      date_to_input.classList.add("is-invalid")
      setdurationValidation(false)
    } else {
      setdate_fromValidation(false)
      date_from_input.classList.remove("is-invalid")
      setdate_toValidation(false)
      date_to_input.classList.remove("is-invalid")

      setdurationValidation(true)

    }




    setduration(Difference_In_Days)
    console.log(Difference_In_Days, "Difference_In_Days..............................")


    // date_from.setDate(date_from.getDate() + parseInt(tenture));
    // setdate_to(date_from)

  }




  function calc_date_to(dateobj, tenture) {
    if (tenture != null & tenture != "") {
      console.log("tenturing date form")
      var dateobj = new Date(dateobj);
      dateobj.setDate(dateobj.getDate() - parseInt(tenture));
      setdate_from(dateobj)

    } else {
      console.log("empty tenture ....")
    }
  }


  function call_date_calc(date_from, date_to) {

    let date_from_input = document.getElementsByName("date_from")[0]
    let date_to_input = document.getElementsByName("date_to")[0]

    var date_to = new Date(date_to);
    if (date_from < date_to) {

      console.log("Yeah+++++++++++++++++++++++++++++++++++")

      setdate_fromValidation(true)
      setdate_from("")
      date_from_input.classList.add("is-invalid")

      // setdate_toValidation(false)
      // setdate_to(datestr)
      // date_to_input.classList.add("is-invalid")
    }
    else {

      console.log("NNNNNNNNNNNNNNN")

      setdate_fromValidation(false)
      // setdate_from("")
      date_from_input.classList.remove("is-invalid")

      setdate_toValidation(false)
      // setdate_to(datestr)
      date_to_input.classList.remove("is-invalid")

    }
  }

  // function handleChangeDateFrom(date) {
  //   try {
  //     let datestr = date.toString();
  //     let date_from_input = document.getElementsByName("date_from")[0]
  //     let date_to_input = document.getElementsByName("date_to")[0]
  //     let date_to = date_to_input.value

  //     console.log(date_to, "date_to..........", datestr)

  //     let tenture = document.getElementsByName("duration")[0].value
  //     console.log(tenture, "tenture")

  //     let date_from = date_from_input.value
  //     if (datestr == "" || datestr == undefined) {
  //       setdate_fromValidation(true)
  //       setdate_from("")
  //       date_from_input.classList.add("is-invalid")

  //     } else {
  //       if (date != null & date != "" & date_to != null & date_to != "") {
  //         console.log(date, date_to, "date,date_to")
  //         calc_dateViaDates(date, date_to)

  //       } else {
  //         calc_date(date, tenture)

  //       }
  //       // setdate_fromValidation(false)
  //       // setdate_from(datestr)
  //       // date_from_input.classList.remove("is-invalid")

  //     }

  //   } catch (e) {
  //     setdate_fromValidation(true)
  //     setdate_from("")
  //     date_from_input.classList.add("is-invalid")
  //   }
  // }

  function handleChangeDateFrom(date) {
    try {
      let datestr = date.toString();
      let date_from_input = document.getElementsByName("date_from")[0]
      let date_to_input = document.getElementsByName("date_to")[0]
      // let date_to = date_to_input.value


      let tenture = document.getElementsByName("duration")[0].value
      console.log(tenture, "tenture")

      let date_from = date_from_input.value
      if (datestr == "" || datestr == undefined) {
        setdate_fromValidation(true)
        setdate_from("")
        date_from_input.classList.add("form-control")
        date_from_input.classList.add("form-control-lg")
        date_from_input.classList.add("is-invalid")

      }

    } catch (e) {

      try {
        let datestr = date.toString();
        let date_from_input = document.getElementsByName("date_from")[0]
        setdate_fromValidation(false)
        date_from_input.classList.add("form-control")
        date_from_input.classList.add("form-control-lg")
        date_from_input.classList.remove("is-invalid")

      }

      catch (e) {
        console.log(e)
        setdate_fromValidation(true)
        setdate_from("")
      }
    }
  }

  // function handleChangeDateTo(date) {
  //   try {
  //     let datestr = date.toString();
  //     let date_to_input = document.getElementsByName("date_to")[0]
  //     let date_to = date_to_input.value
  //     let date_from_input = document.getElementsByName("date_from")[0]
  //     let date_from = date_from_input.value
  //     let tenture = document.getElementsByName("duration")[0].value

  //     if (datestr == "" || datestr == undefined) {
  //       setdate_toValidation(true)
  //       setdate_to("")
  //       date_to_input.classList.add("is-invalid")

  //     } else {
  //       if (date != null & date != "" & date_to != null & date_to != "") {
  //         calc_dateToViaDates(datestr, date_from)

  //       } else {
  //         calc_date_to(datestr, tenture)

  //       }
  //       // setdate_toValidation(false)
  //       // setdate_to(datestr)
  //       // date_to_input.classList.remove("is-invalid")

  //     }
  //   } catch (e) {
  //     let date_to_input = document.getElementsByName("date_to")[0]

  //     setdate_toValidation(true)
  //     setdate_to("")
  //     date_to_input.classList.add("is-invalid")
  //   }
  // }

  function handleFileChange(e) {
    let updateFiles = []
    let backend_updateFiles = []
    if (e.target.files) {
      console.log(e.target.files[0].file, "fff")
      // const reader = new FileReader()
      // reader.readAsText(e.target.files[0])
      // console.log(reader,"reader")
      updateFiles = [
        // copy the current users state
        ...files,
        {

          "name": e.target.files[0].name,
          "size": e.target.files[0].size,
          "fileObj": e.target.files[0]
        }
      ];


      console.log(e.target.files[0], "appended")
      backend_updateFiles = [
        // copy the current users state
        ...backend_files,
        e.target.files[0]
      ];
      console.log(backend_updateFiles, "appened")
    }
    // update the state to the updatedUsers
    setfiles(updateFiles);
    setbackend_files(backend_updateFiles)

    if (e.target.files) {
      console.log(e.target.files[0], "files")
    }
  }

  function handleDeleteFile(name, e, id = '') {
    console.log("clicked ..", id)
    if (id != '') {
      console.log("not here")
      let newupdateFiles = []
      let backend_updateFiles = []

      setfiles([])
      setbackend_files([])

      let i = 0
      console.log(old_files, "123", old_files.length)
      for (i; i < old_files.length; i++) {
        console.log(old_files[i]['name'], name, "updated")
        console.log(old_files[i]['name'], "name")

        if (old_files[i]['name'] != name) {
          newupdateFiles = [
            ...newupdateFiles,
            {

              "name": old_files[i].name,
              "size": "200",
              "path": old_files[i].file,
              "id": old_files[i].id
              // "fileObj": old_files[i].fileObj

            }
          ];

          backend_updateFiles = [
            // copy the current users state
            ...backend_updateFiles,
            // files[i].fileObj
          ];

        }
      }
      console.log("updated", newupdateFiles)
      console.log(newupdateFiles, ",-----new updated--------")
      console.log(backend_updateFiles, "backfies")

      setold_files(newupdateFiles)
      // setbackend_files(backend_updateFiles)
      console.log(my_ids_of_files, "gog go")
      try {
        console.log(my_ids_of_files.split(",").length, "arar2")
        if (my_ids_of_files.split(",").length > 1) {
          if (my_ids_of_files.split(",").length > 1) {
            let new_id = my_ids_of_files.replace("," + id.toString(), "")
          } else {
            let new_id = my_ids_of_files.replace(id.toString(), "")

          }
          setmy_ids_of_files(new_id)
          console.log(new_id, "gog go2")


        } else {
          console.log("leng")
          let new_id = my_ids_of_files.replace(id.toString(), "")
          setmy_ids_of_files(new_id)
          console.log(new_id, "gog go else")

        }
      } catch (e) {
        console.log("leng")

        let new_id = my_ids_of_files.replace(id.toString(), "")
        setmy_ids_of_files(new_id)
        console.log(new_id, "gog go")


      }

    }
    else {
      let newupdateFiles = []
      let backend_updateFiles = []

      setfiles([])
      setbackend_files([])

      let i = 0
      console.log(files, "...", files.length)
      for (i; i < files.length; i++) {
        console.log(files[i]['name'], name, "updated")

        if (files[i]['name'] != name) {
          newupdateFiles = [
            ...newupdateFiles,
            {

              "name": files[i].name,
              "size": files[i].size,
              "fileObj": files[i].fileObj

            }
          ];

          backend_updateFiles = [
            // copy the current users state
            ...backend_updateFiles,
            files[i].fileObj
          ];

        }
      }
      console.log("updated", newupdateFiles)
      console.log(newupdateFiles, ",-----new updated--------")
      console.log(backend_updateFiles, "backfies")

      setfiles(newupdateFiles)
      setbackend_files(backend_updateFiles)
    }



  }

  function HandleTentureChange(value) {
    console.log("handletentureChange", date_from)
    let tenture = value
    setduration(tenture)
    if (date_from != "" & date_from != null) {
      console.log(date_from, "date_from............")
      calc_date(date_from, tenture)
    } else if (date_to != "" & date_to != null) {
      calc_date_to(date_to, tenture)

    }

  }

  function handleChangeCheck(e) {
    console.log("changed check")
    console.log(e.target.id, "ttttttttttttt")
    let row_num = e.target.id.split("_")[0]
    console.log(e.target.checked, "e.target.checked")
    if (e.target.checked) {
      billData[row_num]['paid'] = "1"
      setbillData(billData)
    } else {
      billData[row_num]['paid'] = "0"
      setbillData(billData)
    }
    console.log(billData, "billDatabillDatabillDatabillData")
  }

  function handleِAddBill() {

  }

  // function removecar(data) {
  //   if (data && data.car_id) {
  //     setcar_data_remove(prevList => [...prevList, data]);
  //   }
  // }

  function removecar(arrayofdata) {
    for (let i = 0; i <= arrayofdata - 1; i++) {
      if (arrayofdata[i] && arrayofdata[i].car_id) {
        setcar_data_remove(prevList => [...prevList, arrayofdata[i]]);
      }
    }

  }


  return (
    <>
      <div className='LoaderForCity d-none'>
        <img src={logo} />
      </div>
      < BillDataModal />

      <BillDataModalForAdvance />

      <BillDataModalForLate />


      <div className="theme-content px-3 px-md-5 ms-xl-5 ">
        <div className="container-fluid pe-md-5 ps-md-4 pe-1 ps-1">

          {/* {(add['current']) ? <HomeHeader headerContract="نظام إدارة العقود" headerContract2="العقود" headerContractObj="إضافة عقد" urlMain="/contracts" withAdd="true" /> : <HomeHeader headerContract="نظام إدارة العقود" headerContract2="العقود" headerContractObj="تعديل العقد" urlMain="/contracts" withAdd="true" />} */}
          <div className="row pt-3 pt-md-5 pb-3 header-home-small">
            <div className="col-md-9 ps-md-0 ps-3">
              <a href='/home'>
                <span className='mt-1'>
                  <HomeIcon />
                </span>
                <span className='ps-md-3 mt-2 headerContract'>

                  نظام إدارة العقود

                </span>
              </a>
              <span className='ps-md-3'><ArrowIcon /></span>

              <>
                {/* <a href="/contractsAuction"> */}
                <a href="/ContractAuction">


                  <span className='ps-md-3 headerContractObj'> عقود المزاد</span>
                </a>
                <span className='ps-md-3'><ArrowIcon /></span>
              </>

              {(add['current']) ?
                <span className='px-md-3 headerContractObj headerContractObjColored p-2 '>  إضافة عقد مزاد</span>
                :
                <span className='px-md-3 headerContractObj headerContractObjColored p-2 '> تعديل عقد مزاد</span>
              }
            </div>
            <div className='col-md-1'></div>





          </div>
          <div className='d-md-flex justify-content-between'>
            {(add['current']) ? <div className='addPageHeader pt-4 ps-0 ms-0'>إضافة عقد مزاد</div> : <div className='addPageHeader pt-4 ps-0 ms-0'>تعديل عقد مزاد</div>}
            {!(add['current']) && (
              <div className='color-5F605F f-s-20px f-w-700 pt-4 mt-2 pe-4 ms-0'>
                {/* عقد رقم : 
          {contractNumber} */}
              </div>
            )}
          </div>
          <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid mt-5 pt-2 pb-5 mb-5 background-FFFFFF borderRadius-8">

              <Row className=' '>



                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={departmentValue} id_name='department' title='الإدارة' control={control} errors_check={errors.department} loadOptionsDB={departmentData} />
                </Col>

                {visible_user_dep ?

                  <>
                    <Col sm='4' className='mb-4 form-group bmd-form-group'>
                      <SelectWithValidation1 defaultValue={user_dep_Value} id_name='user_department' title='اسم المسئول' control={control} errors_check={errors.user_department} loadOptionsDB={user_dep_Data} />
                    </Col>
                  </>
                  :
                  <>

                  </>

                }

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                    تاريخ بداية العقد
                  </Label>
                  <Controller
                    control={control}

                    name="date"
                    className="h-60 f-s-12px f-w-700 bg-F7FAF7 controller-date "
                    rules={{ required: true }} //optional
                    render={({
                      field: { onChange, name, value },
                      formState: { errors },

                    }) => (
                      <>
                        <div>
                        </div>

                        <DatePicker
                          name="date_from"
                          id="date_from"
                          value={date_from || value}
                          invalid={date_fromValidation && true}
                          className='form-control DateCalendar'


                          onChange={(date) => {
                            // onChange(date?.isValid ? date : "");
                            handleChangeDateFrom(date)
                          }}
                          format={language === "en" ? "YYYY-MM-DD" : "YYYY-MM-DD"}
                        />




                        {date_fromValidation && (
                          <div>

                            <div className='invalid-feedback-dates'>الرجاء إدخال التاريخ بشكل صحيح</div>

                          </div>
                        )

                        }
                      </>
                    )}
                  />
                  {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}

                </Col>
                {/* <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                    تاريخ نهاية العقد
                  </Label>
                  <Controller
                    control={control}
                    name="date"
                    className="h-60 f-s-12px f-w-700 bg-F7FAF7 controller-date"
                    rules={{ required: true }} //optional
                    render={({
                      field: { onChange, name, value },
                      formState: { errors },

                    }) => (
                      <>
                        <div>
                        </div>

                        <DatePicker
                          name="date_to"
                          id="date_to"
                          value={date_to || value}
                          invalid={date_toValidation && true}
                          className='form-control'
                          onChange={(date) => {
                            // onChange(date?.isValid ? date : "");
                            handleChangeDateTo(date)
                          }}
                          format={language === "en" ? "YYYY-MM-DD" : "YYYY-MM-DD"}
                        />


                        {date_toValidation && (
                          <div>

                            <div className='invalid-feedback-dates'>الرجاء إدخال التاريخ بشكل صحيح</div>

                          </div>
                        )

                        }
                      </>
                    )}
                  />
                  {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}

                </Col> */}


                {/* <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                    فترة العقد بالأيام
                  </Label>

                  <Controller
                    id='duration'
                    name='duration'
                    value={`${duration}`}
                    onChange={(e) => HandleTentureChange(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل فترة العقد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.duration && true} />}
                  />

                  {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}
                </Col> */}

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='sold_car_number'>
                    عدد السيارات المباعة
                  </Label>
                  <Controller
                    id='sold_car_number'
                    name='sold_car_number'
                    value={`${sold_car_number}`}
                    // onChange={(e) => {setsold_car_number(e.target.value)}}

                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل عدد السيارات المباعة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.sold_car_number && true} onChange={(e) => {
                      field.onChange(e);
                      const value = parseInt(e.target.value, 10);
                      if (isNaN(value)) {
                        console.error('Value must be a number');
                      } else {
                        if (parseInt(e.target.value) > 0) {
                          var checkvalue = checkNumbersOnly(e.target.value)
                          console.log(checkvalue,"checvalue")
                          if(checkvalue==true){
                            number_of_cars(e.target.value)
                          }
                          
                          
                        }
                      }

                    }} />}
                  />
                  {errors.sold_car_number && <FormFeedback>{errors.sold_car_number.message}</FormFeedback>}
                </Col>

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='total_amount'>
                    اجمالي قيمة العقد
                  </Label>
                  <Controller
                    id='total_amount'
                    name='total_amount'
                    value={`${total_amount}`}
                    onChange={(e) => settotal_amount(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل اجمالي قيمة العقد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.total_amount && true} />}
                  />
                  {errors.total_amount && <FormFeedback>{errors.total_amount.message}</FormFeedback>}
                </Col>

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={customer_typeValue} id_name='customer_type' title='نوع العميل' control={control} errors_check={errors.customer_type} loadOptionsDB={customer_typedata} change="type" />
                </Col>


                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={type_of_AuctionValue} id_name='type_of_Auction' title='نوع المزاد' control={control} errors_check={errors.type_of_Auction} loadOptionsDB={type_of_AuctionData} change="type" />

                </Col>
                {type_of_AuctionValueId == "1" &&
                  (
                    <>



                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                          الهوية الوطنية
                        </Label>
                        <Controller
                          id='identity_number'
                          name='identity_number'
                          value={`${identity_number}`}
                          onChange={(e) => setidentity_number(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل الهوية الوطنية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number && true} />}
                        />
                        {errors.identity_number && <FormFeedback>{errors.identity_number.message}</FormFeedback>}
                      </Col>

                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number_systematic'>
                          هوية اقامة نظامية
                        </Label>
                        <Controller
                          id='identity_number_systematic'
                          name='identity_number_systematic'
                          value={`${identity_number_systematic}`}
                          onChange={(e) => setidentity_number_systematic(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل هوية اقامة نظامية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_systematic && true} />}
                        />
                        {errors.identity_number_systematic && <FormFeedback>{errors.identity_number_systematic.message}</FormFeedback>}
                      </Col>

                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number_gulf'>
                          هوية مقيم خليجي
                        </Label>
                        <Controller
                          id='identity_number_gulf'
                          name='identity_number_gulf'
                          value={`${identity_number_gulf}`}
                          onChange={(e) => setidentity_number_gulf(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل هوية مقيم خليجي' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_gulf && true} />}
                        />
                        {errors.identity_number_gulf && <FormFeedback>{errors.identity_number_gulf.message}</FormFeedback>}
                      </Col>

                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_name'>
                          الاسم
                        </Label>
                        <Controller
                          id='identity_name'
                          name='identity_name'
                          value={`${identity_name}`}
                          onChange={(e) => setidentity_name(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل الاسم' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_name && true} />}
                        />
                        {errors.identity_name && <FormFeedback>{errors.identity_name.message}</FormFeedback>}
                      </Col>

                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_phone'>
                          رقم التواصل
                        </Label>
                        <Controller
                          id='identity_phone'
                          name='identity_phone'
                          value={`${identity_phone}`}
                          onChange={(e) => setidentity_phone(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل رقم التواصل' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_phone && true} />}
                        />
                        {errors.identity_phone && <FormFeedback>{errors.identity_phone.message}</FormFeedback>}
                      </Col>



                    </>
                  )}

                {type_of_AuctionValueId == "2" &&
                  (
                    <>


                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                          السجل التجاري
                        </Label>
                        <Controller
                          id='commercial_number2'
                          name='commercial_number2'
                          value={`${commercial_number2}`}
                          onChange={(e) => setcommercial_number2(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل السجل التجاري' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.commercial_number2 && true} />}
                        />
                        {errors.commercial_number2 && <FormFeedback>{errors.commercial_number2.message}</FormFeedback>}
                      </Col>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                          الرقم الموحد
                        </Label>
                        <Controller
                          id='Unified_No'
                          name='Unified_No'
                          value={`${Unified_No}`}
                          onChange={(e) => setUnified_No(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل الرقم الموحد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.Unified_No && true} />}
                        />
                        {errors.Unified_No && <FormFeedback>{errors.Unified_No.message}</FormFeedback>}
                      </Col>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                          الهوية الوطنية
                        </Label>
                        <Controller
                          id='identity_number'
                          name='identity_number'
                          value={`${identity_number}`}
                          onChange={(e) => setidentity_number(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل الهوية الوطنية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number && true} />}
                        />
                        {errors.identity_number && <FormFeedback>{errors.identity_number.message}</FormFeedback>}
                      </Col>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                          هوية اقامة نظامية
                        </Label>
                        <Controller
                          id='identity_number_systematic'
                          name='identity_number_systematic'
                          value={`${identity_number_systematic}`}
                          onChange={(e) => setidentity_number_systematic(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل هوية اقامة نظامية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_systematic && true} />}
                        />
                        {errors.identity_number_systematic && <FormFeedback>{errors.identity_number_systematic.message}</FormFeedback>}
                      </Col>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                          هوية مقيم خليجي
                        </Label>
                        <Controller
                          id='identity_number_gulf'
                          name='identity_number_gulf'
                          value={`${identity_number_gulf}`}
                          onChange={(e) => setidentity_number_gulf(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل هوية مقيم خليجي' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_gulf && true} />}
                        />
                        {errors.identity_number_gulf && <FormFeedback>{errors.identity_number_gulf.message}</FormFeedback>}
                      </Col>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_name'>
                          الاسم
                        </Label>
                        <Controller
                          id='identity_name'
                          name='identity_name'
                          value={`${identity_name}`}
                          onChange={(e) => setidentity_name(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل الاسم' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_name && true} />}
                        />
                        {errors.identity_name && <FormFeedback>{errors.identity_name.message}</FormFeedback>}
                      </Col>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_phone'>
                          رقم التواصل
                        </Label>
                        <Controller
                          id='identity_phone'
                          name='identity_phone'
                          value={`${identity_phone}`}
                          onChange={(e) => setidentity_phone(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل رقم التواصل' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_phone && true} />}
                        />
                        {errors.identity_phone && <FormFeedback>{errors.identity_phone.message}</FormFeedback>}
                      </Col>
                    </>
                  )}


                {/* <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='car_details'>
                    تفاصيل السيارة
                  </Label>
                  <Controller
                    id='car_details'
                    name='car_details'
                    value={`${car_details}`}
                    onChange={(e) => setcar_details(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل تفاصيل السيارة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.car_details && true} />}
                  />
                  {errors.car_details && <FormFeedback>{errors.car_details.message}</FormFeedback>}

                </Col> */}






                <Col sm='12' className='mb-4 form-group bmd-form-group pt-4'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='notes'>
                    الملاحظات
                  </Label>
                  <Controller
                    id='notes'
                    name='notes'
                    value={`${notes}`}
                    onChange={(e) => setnotes(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل الملاحظات' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.notes && true} />}
                  />
                  {errors.notes && <FormFeedback>{errors.notes.message}</FormFeedback>}

                </Col>

                <Row className="pb-4">
                  {/* <button type='button' onClick={() => append({})} className="text-center btn-style color-5F605F   d-block p-2  f-w-700 f-s-20px background-FBB827 font-Cairo btn btn-outline-white" style={{ width: '10%' }}>
                    إضافة  سياره +
                  </button> */}
                </Row>




                {fields.map((item, index) => {

                  return (

                    <>
                      <Row key={item.id} className="car_add_border pt-4">
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={`fields[${index}].car_agreement_number`}>
                            رقم الاتفاقية
                          </Label>
                          <Controller
                            id={`fields[${index}].car_agreement_number`}
                            name={`fields[${index}].car_agreement_number`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='ادخل رقم الاتفاقية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_agreement_number && true} />}
                          />
                          {errors.fields?.[index]?.car_agreement_number && <FormFeedback>{errors.fields[index].car_agreement_number.message}</FormFeedback>}
                        </Col>
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for={`fields[${index}].car_type`}>
                            نوع السيارة
                          </Label>
                          <Controller
                            id={`fields[${index}].car_type`}
                            name={`fields[${index}].car_type`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل نوع السيارة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_type && true} />}
                          />
                          {errors.fields?.[index]?.car_type && <FormFeedback>{errors.fields[index].car_type.message}</FormFeedback>}
                        </Col>
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                            رقم اللوحة
                          </Label>
                          <Controller
                            id={`fields[${index}].car_plate`}
                            name={`fields[${index}].car_plate`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل رقم اللوحة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_plate && true} />}
                          />
                          {errors.fields?.[index]?.car_plate && <FormFeedback>{errors.fields[index].car_plate.message}</FormFeedback>}
                        </Col>
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                            الموديل
                          </Label>
                          <Controller
                            id={`fields[${index}].car_model`}
                            name={`fields[${index}].car_model`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل الموديل' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_model && true} />}
                          />
                          {errors.fields?.[index]?.car_model && <FormFeedback>{errors.fields[index].car_model.message}</FormFeedback>}
                        </Col>
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                            رقم الهيكل
                          </Label>
                          <Controller
                            id={`fields[${index}].car_chassis`}
                            name={`fields[${index}].car_chassis`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل رقم الهيكل' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_chassis && true} />}
                          />
                          {errors.fields?.[index]?.car_chassis && <FormFeedback>{errors.fields[index].car_chassis.message}</FormFeedback>}
                        </Col>
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                            اللون
                          </Label>
                          <Controller
                            id={`fields[${index}].car_color`}
                            name={`fields[${index}].car_color`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل اللون' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_color && true} />}
                          />
                          {errors.fields?.[index]?.car_color && <FormFeedback>{errors.fields[index].car_color.message}</FormFeedback>}
                        </Col>
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number'>
                            مبلغ بيع السيارة
                          </Label>
                          <Controller
                            id={`fields[${index}].car_sales_amount`}
                            name={`fields[${index}].car_sales_amount`}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل مبلغ بيع السيارة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.fields?.[index]?.car_sales_amount && true} />}
                          />
                          {errors.fields?.[index]?.car_sales_amount && <FormFeedback>{errors.fields[index].car_sales_amount.message}</FormFeedback>}
                        </Col>

                        {/* <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <SelectWithValidation1 defaultValue={{ id: 0, label: "اختر من القائمة", value: "اختر من القائمة" }} id_name={`fields[${index}].car_status`} title='حالة السيارة' control={control} errors_check={errors.fields?.[index]?.car_status} loadOptionsDB={car_status_data} change="type" />
                        </Col> */}
                        <Col sm='3' className='mb-4 form-group bmd-form-group'>
                          <SelectWithValidation2 defaultValue={car_status_data_default} id_name={`fields[${index}].car_status`} title='حالة السيارة' control={control} errors_check={errors.fields?.[index]?.car_status} loadOptionsDB={car_status_data} change="type" />
                        </Col>
                        {/* {fields.length > 1 &&
                          <Button type="button" color="danger" className=" text-center btn-style  d-block p-2  f-w-700 f-s-20px  font-Cairo btn btn-outline-white" style={{ width: '10%' }} onClick={() => { removecar([fields[index]]); remove(index) }}>حذف</Button>

                        } */}

                        <div className='pt-4'></div>
                      </Row>
                      <div className='pt-4'></div>
                    </>

                  )
                })}







                <Col sm='12' className='mb-4 mt-4 form-group bmd-form-group'>
                  <div class="btn-wrap">
                    <div class="upload-btn-wrapper first-file-container">
                      <button class="btnUpload upload1 py-5" id="btn_file1" type="button">
                        <Fileupload />

                        <div className='mt-3 text-center color-5F605F f-s-14px f-w-600'>إضافة مرفقات</div>
                        <div className='mt-3 text-center color-5F605F f-s-12px f-w-400'>إضغط لإرفاق المستند او اسحب واترك
                          PNG, JPG or PDF</div>
                      </button>
                      <input type="file" onChange={handleFileChange} class="fileupload1" id="input1" name="file1" value="" accept="application/pdf,.jpg,.png" style={{ height: "250px" }} />



                      <Col sm='12' className='mb-4 px-3 mt-4 form-group bmd-form-group'>
                        <div className='text-start color-5F605F f-s-14px f-w-700 mb-3'>
                          المرفقات
                        </div>
                        {old_files.map(function (object, i) {
                          let name = object.name
                          let name_file = ""
                          try {
                            name_file = object.name.split("_")[0]
                          } catch (e) {
                            name_file = name
                          }
                          return (

                            <div className='object-file-container  mt-3 py-4 px-3 d-flex justify-content-between'>
                              <a target='_blank' href={`${domain_url}${object.path}`}>
                                <div className='d-flex'>

                                  <span className=''><FileCorrect /></span>
                                  <span className='mt-1'>
                                    <div className=' ms-3  color-414042 f-s-16px f-w-500'>{name_file}</div>
                                    <div className='text-start ms-3 color-ACB5BE f-s-12px f-w-500'>{object.size}kb</div>
                                  </span>


                                </div>
                              </a>
                              <div>
                                <a onClick={(e) => handleDeleteFile(name, e, object.id)}>
                                  <DeleteFile />
                                </a>
                              </div>


                            </div>
                          );


                        })}
                        {files.map(function (object, i) {
                          let name = object.name

                          return (

                            <div className='object-file-container  mt-3 py-4 px-3 d-flex justify-content-between'>
                              <div>
                              {/* <a target='_blank' href={object.name}> */}
                                <div className='d-flex'>

                                  <span className=''><FileCorrect /></span>
                                  <span className='ms-3 mt-1'>
                                    <div className='color-414042 f-s-16px f-w-500'>{object.name}</div>
                                    <div className='color-ACB5BE f-s-12px f-w-500'>{object.size}kb</div>
                                  </span>


                                </div>
                              </div>
                              <div>
                                <a onClick={(e) => handleDeleteFile(name, e)}>
                                  <DeleteFile />
                                </a>
                              </div>


                            </div>
                          );


                        })}
                        <div>

                        </div>

                      </Col>
                    </div>
                  </div>
                </Col>







              </Row>
              <div className='text-start color-5F605F f-s-20px f-w-700 mb-3 '>{errorFile}</div>

            </div>



            <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
              <Col md='6' className='mb-2'>

                {/* onClick={handleClickSave} */}
                {
                  add['current'] === true ? (
                    <Button onClick={handleClickSave} className={(departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & sold_car_numberValidation & total_amountValidation & car_detailsValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

                  ) : (
                    <Button onClick={handleClickSave} className={(departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & sold_car_numberValidation & total_amountValidation & car_detailsValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

                  )
                }

              </Col>
              <Col md='6' className='mb-2'>
                <Button href="/ContractAuction" className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
                  إلغاء
                </Button>
              </Col>


            </div>
          </Form>

          {/* end  car details component */}

        </div>
      </div>
    </>
  )
}

export default AddContract
