// ** React Imports
import React, { Fragment, useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"
import { v4 as uuidv4 } from 'uuid';
import UploadElementDataV2 from "../components/documents/UploadElementDataV2"
import HomeHeader from "../components/home/HomeHeader"

import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import logo from "@src/assets/images/tayseer_loader.gif";


// react-select


import AlertElement from "../components/AlertElement"

import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
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

const domain_url = themeConfig.url


const main_url = themeConfig.main_url



const AddContract = () => {



  const add = useRef(true)
  const financial_statement_click = useRef(true)



  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
  const [showAlert, setShowAlert] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState("")




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

  const [is_finanical_management, setis_finanical_management] = useState(false)


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


  const [files_financial_management, setfiles_financial_management] = useState([])
  const [backend_files_financial_management, setbackend_files_financial_management] = useState([])
  const [old_files_financial_management, setold_files_financial_management] = useState([])
  const [my_ids_of_files_financial_management, setmy_ids_of_files_financial_management] = useState([])




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


  const [lease_nationality_Validation, setlease_nationality_Validation] = useState(false)
  const [lease_nationality_ValueId, setlease_nationality_ValueId] = useState("")
  const [lease_nationality_Data, setlease_nationality_Data] = useState([])
  const [visible_lease_nationality_, setvisible_lease_nationality_] = useState(false)
  const [lease_nationality_Value, setlease_nationality_Value] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [tenant_nationality_Validation, settenant_nationality_Validation] = useState(false)
  const [tenant_nationality_ValueId, settenant_nationality_ValueId] = useState("")
  const [tenant_nationality_Data, settenant_nationality_Data] = useState([])
  const [visible_tenant_nationality_, setvisible_tenant_nationality_] = useState(false)
  const [tenant_nationality_Value, settenant_nationality_Value] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [sadad_cycle_Validation, setsadad_cycle_Validation] = useState(false)
  const [sadad_cycle_ValueId, setsadad_cycle_ValueId] = useState("")
  const [sadad_cycle_Data, setsadad_cycle_Data] = useState([])
  const [visible_sadad_cycle_, setvisible_sadad_cycle_] = useState(false)
  const [sadad_cycle_Value, setsadad_cycle_Value] = useState({
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
  const [errorFile_financial_management, seterrorFile_financial_management] = useState("")
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


  const [lease_type_of_contractValidation, setlease_type_of_contractValidation] = useState(false)
  const [lease_type_of_contractValueId, setlease_type_of_contractValueId] = useState("0")
  const [lease_type_of_contractdata, setlease_type_of_contractdata] = useState(
    [
      {
        id: 0,
        value: "1",
        label: "الهوية الوطنية"
      },
      {
        id: 1,
        value: "2",
        label: "هوية اقامة نظامية"

      },
      {
        id: 2,
        value: "3",
        label: "هوية مقيم خليجي"

      }
    ]
  )
  const [lease_type_of_contractValue, setlease_type_of_contractValue] = useState({
    id: 0,
    value: "1",
    label: "الهوية الوطنية"

  })

  const [old_lease_type_of_contractValue, setold_lease_type_of_contractValue] = useState({
    id: 0,
    value: "1",
    label: "الهوية الوطنية"

  })


  const [tenant_type_of_contractValidation, settenant_type_of_contractValidation] = useState(false)
  const [tenant_type_of_contractValueId, settenant_type_of_contractValueId] = useState("0")
  const [tenant_type_of_contractdata, settenant_type_of_contractdata] = useState(
    [
      {
        id: 0,
        value: "1",
        label: "الهوية الوطنية"
      },
      {
        id: 1,
        value: "2",
        label: "هوية اقامة نظامية"

      },
      {
        id: 2,
        value: "3",
        label: "هوية مقيم خليجي"

      }
    ]
  )
  const [tenant_type_of_contractValue, settenant_type_of_contractValue] = useState({
    id: 0,
    value: "1",
    label: "الهوية الوطنية"

  })

  const [oldtenant_type_of_contractValue, setoldtenant_type_of_contractValue] = useState({
    id: 0,
    value: "1",
    label: "الهوية الوطنية"

  })


  const [bill_type, setbill_type] = useState("")









  //   ===================== new 
  const [commercial_number, setcommercial_number] = useState("")
  const [commercial_numberValidation, setcommercial_numberValidation] = useState(false)

  const [total_amount, settotal_amount] = useState("")
  const [total_amountValidation, settotal_amountValidation] = useState(false)


  // const [sadad_cycle, setsadad_cycle] = useState("")
  // const [sadad_cycle_Validation, setsadad_cycle_Validation] = useState(false)

  const [annual_value_sadad, setannual_value_sadad] = useState("")
  const [annual_value_sadadValidation, setannual_value_sadadValidation] = useState(false)


  const [identity_number, setidentity_number] = useState("")
  const [identity_numberValidation, setidentity_numberValidation] = useState(false)

  const [identity_number_systematic, setidentity_number_systematic] = useState("")
  const [identity_number_systematicValidation, setidentity_number_systematicValidation] = useState(false)

  const [identity_number_gulf, setidentity_number_gulf] = useState("")
  const [identity_number_gulfValidation, setidentity_number_gulfValidation] = useState(false)


  const [identity_number_leaseholder, setidentity_number_leaseholder] = useState("")
  const [identity_numberValidation_leaseholder, setidentity_numberValidation_leaseholder] = useState(false)

  const [identity_number_systematic_leaseholder, setidentity_number_systematic_leaseholder] = useState("")
  const [identity_number_systematicValidation_leaseholder, setidentity_number_systematicValidation_leaseholder] = useState(false)

  const [identity_number_gulf_leaseholder, setidentity_number_gulf_leaseholder] = useState("")
  const [identity_number_gulfValidation_leaseholder, setidentity_number_gulfValidation_leaseholder] = useState(false)


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


  function formatDateTime(dateTimeString) {
    // Parse the date-time string to a Date object
    var date = new Date(dateTimeString);

    // Extract the day, month, and year from the Date object
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based, so add 1
    var year = date.getFullYear();

    // Extract hours, minutes, and seconds from the Date object
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Determine AM or PM
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format minutes and seconds to always be two digits
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Format the date as a string (e.g., "2024-06-04 12:03:04 PM")
    var formattedDate = year + '-' +
      (month < 10 ? '0' + month : month) + '-' +
      (day < 10 ? '0' + day : day) + ' ' +
      hours + ':' +
      minutes + ':' +
      seconds + ' ' +
      ampm;

    return formattedDate;
  }

  function formatDateTimeArabic(dateTimeString) {
    // Parse the date-time string to a Date object
    var date = new Date(dateTimeString);

    // Define options for date and time formatting
    var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: true };
    var timeOptions = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };

    // Format the date and time in Arabic
    var formattedDate = date.toLocaleDateString('ar-EG', dateOptions);
    var formattedTime = date.toLocaleTimeString('ar-EG', timeOptions);

    // Combine date and time
    var formattedDateTime = formattedDate + '' + formattedTime;

    return formattedDateTime;
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


      const result = await axios.get(`${domain_url}/Contract/AddContractsRental/?id=${company_id}`, config)
      const data = result.data[0]
      var x = loadOptionsNationality2(data['lease_nationality'], data['tenant_nationality'])
      setlease_nationality_ValueId(data['lease_nationality'])
      settenant_nationality_ValueId(data['tenant_nationality'])

      console.log(data['lease_nationality'], data['tenant_nationality'], "data['lease_nationality'], data['tenant_nationality']")
      console.log(lease_nationality_Data, "lease_nationality_Data")

      setis_finanical_management(data.user_request_details.is_financial_management)
      // setis_finanical_management(false)

      setName(data.Contract_Name)

      setcommercial_number(data.commercial_number)
      settotal_amount(data.total_amount)
      setsadad_cycle_ValueId(data.sadad_cycle)
      setannual_value_sadad(data.annual_value_sadad)
      setcommercial_number2(data.commercial_number2)
      setUnified_No(data.Unified_No)
      settype_of_AuctionValueId(data.type_of_Auction)

      setidentity_number(data.identity_number)
      setidentity_number_systematic(data.identity_number_systematic)
      setidentity_number_gulf(data.identity_number_gulf)



      if ((data.identity_number).length != 0) {
        setlease_type_of_contractValueId("0")
        setlease_type_of_contractValue({
          id: 0,
          value: "1",
          label: "الهوية الوطنية"
        })
      }
      if ((data.identity_number_systematic).length != 0) {
        setlease_type_of_contractValueId("1")
        setlease_type_of_contractValue({

          id: 1,
          value: "2",
          label: "هوية اقامة نظامية"


        })
      }
      if ((data.identity_number_gulf).length != 0) {
        setlease_type_of_contractValueId("2")
        setlease_type_of_contractValue({
          id: 2,
          value: "3",
          label: "هوية مقيم خليجي"
        })
      }

      setidentity_number_leaseholder(data.identity_number_leaseholder)
      setidentity_number_systematic_leaseholder(data.identity_number_systematic_leaseholder)
      setidentity_number_gulf_leaseholder(data.identity_number_gulf_leaseholder)

      if ((data.identity_number_leaseholder).length != 0) {
        settenant_type_of_contractValueId("0")
        settenant_type_of_contractValue({
          id: 0,
          value: "1",
          label: "الهوية الوطنية"
        })
      }
      if ((data.identity_number_systematic_leaseholder).length != 0) {
        settenant_type_of_contractValueId("1")
        settenant_type_of_contractValue({

          id: 1,
          value: "2",
          label: "هوية اقامة نظامية"


        })
      }
      if ((data.identity_number_gulf_leaseholder).length != 0) {
        settenant_type_of_contractValueId("2")
        settenant_type_of_contractValue({
          id: 2,
          value: "3",
          label: "هوية مقيم خليجي"
        })
      }




      setcontractNumber(data.Contract_Number)


      setnotes(data.Note)


      console.log(data.Note, "data.Note.....................")


      setduration(data.Tenure2)
      console.log(data.Start_Date_of_Contract, "date")
      setdate_from(data.Start_Date_of_Contract)
      setdate_to(data.End_Date_of_Contract)





      let myfiles = []
      console.log(data.files, "**********")
      for (var i = 0; i < data.files.length; i++) {
        try {
          console.log(data.files, "fils")
          if (data.files[i].type_of_contract_file != "1") {
            myfiles.push({ "name": data.files[i].name[1], "size": data.files[0].size, "path": data.files[i].file, "id": data.files[i].id, "type_of_contract_file": data.files[i].type_of_contract_file })

          }
          console.log(data.files[i].id.toString(), "man")
        } catch (e) {

        }
      }

      setold_files(myfiles)
      // backend_files


      //--------------------------------financial management files

      if (data.user_request_details.is_financial_management == true) {
        let myfiles1 = []
        for (var i = 0; i < data.files.length; i++) {
          try {
            if (data.files[i].type_of_contract_file == "1") {
              myfiles1.push({ "name": data.files[i].name[1], "size": data.files[0].size, "path": data.files[i].file, "id": data.files[i].id, "type_of_contract_file": data.files[i].type_of_contract_file, "creation_time": data.files[i].creation_time, "creation_by": data.files[i].creation_by })

            }
          } catch (e) {

          }
        }
        setold_files_financial_management(myfiles1)
      }

      setsadad_cycle_Value({
        id: data.sadad_cycle,
        label: data.sadad_cycle,
        value: data.sadad_cycle
      })
      setsadad_cycle_ValueId(parseInt(data.sadad_cycle))

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

      setuser_dep_ValueId(data.notified_manager.id)

      setValue('user_department',

        {
          id: data.notified_manager.id,
          label: data.notified_manager.name,
          value: data.notified_manager.name
        }
      )







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


      { JSON.stringify(commercial_numberValidation) }
      { JSON.stringify(total_amountValidation) }
      { JSON.stringify(sadad_cycle_Validation) }
      { JSON.stringify(annual_value_sadadValidation) }

      setdepartmentValidation(true)
      setnotesValidation(true)
      setcommercial_numberValidation(true)
      settotal_amountValidation(true)
      setsadad_cycle_Validation(true)
      setannual_value_sadadValidation(true)
      setuser_dep_Validation(true)




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

  // console.log(departmentValidation , notesValidation , !date_fromValidation , !date_toValidation , commercial_numberValidation , total_amountValidation , sadad_cycle_Validation , annual_value_sadadValidation),"all data")
  // console.log((departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation),'all value')


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
        loadOptionsNationality()
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








  useEffect(() => {
    const name_input = document.getElementsByName("name")[0]
    name_input.value = name
  }, [name])

  useEffect(() => {
    const duration_input = document.getElementsByName("duration")[0]
    duration_input.value = duration
  }, [duration])

  useEffect(() => {
    const notes_input = document.getElementsByName("notes")[0]
    notes_input.value = notes
  }, [notes])

  useEffect(() => {
    const commercial_number_input = document.getElementsByName("commercial_number")[0]
    commercial_number_input.value = commercial_number
  }, [commercial_number])

  useEffect(() => {
    const total_amount_input = document.getElementsByName("total_amount")[0]
    total_amount_input.value = total_amount
  }, [total_amount])

  // useEffect(() => {
  //   const sadad_cycle_input = document.getElementsByName("sadad_cycle")[0]
  //   sadad_cycle_input.value = sadad_cycle
  // }, [sadad_cycle])

  useEffect(() => {
    const annual_value_sadad_input = document.getElementsByName("annual_value_sadad")[0]
    annual_value_sadad_input.value = annual_value_sadad
  }, [annual_value_sadad])

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
      const identity_number_gulf_input = document.getElementsByName("identity_number_gulf_leaseholder")[0]
      identity_number_gulf_input.value = identity_number_gulf_leaseholder
    } catch (e) {

    }
  }, [identity_number_gulf_leaseholder])

  useEffect(() => {
    try {
      const identity_number_systematic_input = document.getElementsByName("identity_number_systematic_leaseholder")[0]
      identity_number_systematic_input.value = identity_number_systematic_leaseholder
    } catch (e) {

    }
  }, [identity_number_systematic_leaseholder])

  useEffect(() => {
    try {
      const identity_number_input = document.getElementsByName("identity_number_leaseholder")[0]
      identity_number_input.value = identity_number_leaseholder
    } catch (e) {

    }
  }, [identity_number_leaseholder])

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

    name: yup.string().test({
      name: 'name',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = name
        }
        setName(value)
        if (value === '' | value === null) {
          setNameValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          if (!contractNameRegex(value) | checkSpaceCharacters(value)) {
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال اسم العقد بشكل صحيح' })
          }
        }
        setNameValidation(true)
        return true
      }
    }),

    duration: yup.string().test({
      name: 'duration',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = duration
        }
        setduration(value)
        if (value === null | value === "") {
          setdurationValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if (!checkNumbersOnly(value) || parseInt(value) <= 0) {
          setdurationValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال فترة العقد بشكل صحيح' })
        }



        return true
      }
    }),

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

    department: yup.mixed().test({
      name: 'department',
      skipAbsent: true,
      test(value, ctx) {
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

    commercial_number: yup.string().test({
      name: 'commercial_number',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = commercial_number
        }
        setcommercial_number(value)
        if (value === null | value === "") {
          setcommercial_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }

        setcommercial_numberValidation(true)
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

    // sadad_cycle: yup.string().test({
    //   name: 'sadad_cycle',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = sadad_cycle
    //     }
    //     setsadad_cycle(value)

    //     if (value === null | value === "") {
    //       setsadad_cycle_Validation(false)
    //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
    //     }

    //     setsadad_cycle_Validation(true)
    //     return true
    //   }
    // }),

    sadad_cycle: yup.mixed().test({
      name: 'sadad_cycle',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = sadad_cycle_Value
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setsadad_cycle_Validation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setsadad_cycle_ValueId(value.id)
              console.log("dep1")
            } catch (e) {
              console.log("1")
            }
          }
        }
        if (value === '' | value === null) {
          setsadad_cycle_Validation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
            setsadad_cycle_ValueId(value.id)
          } catch (e) {
          }
        }
        setsadad_cycle_Validation(true)

        return true
      }
    }),

    
    annual_value_sadad: yup.string().test({
      name: 'annual_value_sadad',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = annual_value_sadad
        }
        setannual_value_sadad(value)

        if (value === null | value === "") {
          setannual_value_sadadValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }
        setannual_value_sadadValidation(true)
        return true
      }
    }),


    type_of_Auction: yup.mixed().test({
      name: 'type_of_Auction',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = type_of_AuctionValue
          console.log(type_of_AuctionValue, "type_of_AuctionValue....")
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            settype_of_AuctionValueId("")
            settype_of_AuctionValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {

            try {
              settype_of_AuctionValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
        }
        if (value === '' | value === null) {
          settype_of_AuctionValueId("")
          settype_of_AuctionValidation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
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

    lease_nationality: yup.mixed().test({
      name: 'lease_nationality',
      skipAbsent: true,
      test(value, ctx) {
        console.log(type_of_AuctionValueId, "type_of_AuctionValueId at lease_nationality")
        console.log(lease_type_of_contractValueId, "lease_type_of_contractValueId at lease_nationality")
        console.log(lease_type_of_contractValueId, "lease_type_of_contractValueId at lease_nationality")
        if (type_of_AuctionValueId == "1") {
          if (lease_type_of_contractValueId == "1" || lease_type_of_contractValueId == "2") {
            if (checkInputUndefined(value)) {
              value = lease_nationality_Value
              console.log(lease_nationality_Value, "lease_nationality_Value....")
              if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
                setlease_nationality_ValueId("")
                setlease_nationality_Validation(false)
                return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
              } else {

                try {
                  setlease_nationality_ValueId(value.value)
                } catch (e) {
                  console.log("1")
                }
              }
            }
            if (value === '' | value === null | value.value === 'اختر من القائمة') {
              setlease_nationality_ValueId("")
              setlease_nationality_Validation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
                setlease_nationality_ValueId(value.value)
              } catch (e) {
                console.log("1")
              }
            }
          }
        }

        setlease_nationality_Validation(true)


        return true
      }
    }),

    tenant_nationality: yup.mixed().test({
      name: 'tenant_nationality',
      skipAbsent: true,
      test(value, ctx) {
        // console.log(type_of_AuctionValueId,"---",tenant_type_of_contractValueId,"---",tenant_type_of_contractValueId)
        if (type_of_AuctionValueId == "1") {
          if (tenant_type_of_contractValueId == "1" || tenant_type_of_contractValueId == "2") {
            if (checkInputUndefined(value)) {

              value = tenant_nationality_Value
              console.log(value, "tenant_nationality_Value....")
              if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
                settenant_nationality_ValueId("")
                settenant_nationality_Validation(false)
                return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
              } else {

                try {

                  settenant_nationality_ValueId(value.value)
                } catch (e) {
                  console.log("1")
                }
              }
            }
            if (value === '' | value === null | value.value === 'اختر من القائمة') {

              settenant_nationality_ValueId("")
              settenant_nationality_Validation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
                settenant_nationality_ValueId(value.value)
              } catch (e) {
                console.log("1")
              }
            }
          }
        }


        settenant_nationality_Validation(true)

        return true
      }
    }),

    identity_number: yup.string().test({
      name: 'identity_number',
      skipAbsent: true,
      test(value, ctx) {

        if (type_of_AuctionValueId == "1") {
          if (lease_type_of_contractValueId == "0") {
            if (checkInputUndefined(value)) {
              value = identity_number
            }
            setidentity_number(value)
            if (value === null | value === "") {
              setidentity_numberValidation(false)
              // return true
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            }
          }
        }


        setidentity_numberValidation(true)
        return true
      }
    }),

    identity_number_systematic: yup.string().test({
      name: 'identity_number_systematic',
      skipAbsent: true,
      test(value, ctx) {
        if (type_of_AuctionValueId == "1") {
          if (lease_type_of_contractValueId == "1") {
            if (checkInputUndefined(value)) {
              value = identity_number_systematic
            }
            setidentity_number_systematic(value)

            if (value === null | value === "") {
              setidentity_number_systematicValidation(false)
              // return true
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            }
          }
        }


        setidentity_number_systematicValidation(true)
        return true
      }
    }),

    identity_number_gulf: yup.string().test({
      name: 'identity_number_gulf',
      skipAbsent: true,
      test(value, ctx) {
        if (type_of_AuctionValueId == "1") {
          if (lease_type_of_contractValueId == "2") {
            if (checkInputUndefined(value)) {
              value = identity_number_gulf
            }
            setidentity_number_gulf(value)

            if (value === null | value === "") {
              setidentity_number_gulfValidation(false)
              // return true
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            }
          }
        }


        setidentity_number_gulfValidation(true)
        // console.log("fesha3")
        return true
      }
    }),

    lease_type_of_contract: yup.mixed().test({
      name: 'lease_type_of_contract',
      skipAbsent: true,
      test(value, ctx) {

        if (type_of_AuctionValueId == "1") {
          if (checkInputUndefined(value)) {
            value = lease_type_of_contractValue
            console.log(lease_type_of_contractValue, "lease_type_of_contractValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              if (watch('lease_type_of_contract') != old_lease_type_of_contractValue) {
                setold_lease_type_of_contractValue(value)
                if (watch('lease_type_of_contract') != undefined) {
                  setValue('identity_number', "")
                  setValue('identity_number_systematic', "")
                  setValue('identity_number_gulf', "")
                }
                // setValue('lease_nationality',{
                //   id: 1,
                //   label: "اختر من القائمة",
                //   value: "اختر من القائمة"}
                // )

              }
              setlease_type_of_contractValueId("")
              setlease_type_of_contractValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {


                setlease_type_of_contractValueId(value.id)
                // setValue('lease_nationality',{
                //   id: 1,
                //   label: "اختر من القائمة",
                //   value: "اختر من القائمة"}
                // )


              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            if (watch('lease_type_of_contract') != old_lease_type_of_contractValue) {
              setold_lease_type_of_contractValue(value)
              if (watch('lease_type_of_contract') != undefined) {
                setValue('identity_number', "")
                setValue('identity_number_systematic', "")
                setValue('identity_number_gulf', "")
              }
              // setValue('lease_nationality',{
              //   id: 1,
              //   label: "اختر من القائمة",
              //   value: "اختر من القائمة"}
              // )



            }
            setlease_type_of_contractValueId("")
            setlease_type_of_contractValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setlease_type_of_contractValueId(value.id)
              // setValue('lease_nationality',{
              //   id: 1,
              //   label: "اختر من القائمة",
              //   value: "اختر من القائمة"}
              // )
            } catch (e) {
              console.log("1")
            }
          }
        }


        setlease_type_of_contractValidation(true)

        if (type_of_AuctionValueId == "1") {
          if (watch('lease_type_of_contract') != old_lease_type_of_contractValue) {
            setold_lease_type_of_contractValue(value)
            if (watch('lease_type_of_contract') != undefined) {
              setValue('identity_number', "")
              setValue('identity_number_systematic', "")
              setValue('identity_number_gulf', "")
            }
            // setValue('lease_nationality',{
            //   id: 1,
            //   label: "اختر من القائمة",
            //   value: "اختر من القائمة"}
            // )

          }
        }





        return true
      }
    }),

    identity_number_leaseholder: yup.string().test({
      name: 'identity_number_leaseholder',
      skipAbsent: true,
      test(value, ctx) {
        if (type_of_AuctionValueId == "1") {
          if (tenant_type_of_contractValueId == "0") {
            if (checkInputUndefined(value)) {
              value = identity_number_leaseholder
            }
            setidentity_number_leaseholder(value)

            if (value === null | value === "") {
              setidentity_numberValidation_leaseholder(false)
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
              // setidentity_numberValidation_leaseholder(true)
              // return true
            }
          }
        }


        setidentity_numberValidation_leaseholder(true)
        return true
      }
    }),

    identity_number_systematic_leaseholder: yup.string().test({
      name: 'identity_number_systematic_leaseholder',
      skipAbsent: true,
      test(value, ctx) {
        if (type_of_AuctionValueId == "1") {
          if (tenant_type_of_contractValueId == "1") {
            if (checkInputUndefined(value)) {
              value = identity_number_systematic_leaseholder
            }
            setidentity_number_systematic_leaseholder(value)

            if (value === null | value === "") {
              setidentity_number_systematicValidation_leaseholder(false)
              // return true
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            }
          }
        }


        setidentity_number_systematicValidation_leaseholder(true)
        return true
      }
    }),

    identity_number_gulf_leaseholder: yup.string().test({
      name: 'identity_number_gulf_leaseholder',
      skipAbsent: true,
      test(value, ctx) {
        if (type_of_AuctionValueId == "1") {
          if (tenant_type_of_contractValueId == "2") {
            if (checkInputUndefined(value)) {
              value = identity_number_gulf_leaseholder
            }
            console.log(value, "identity_number_gulf_leaseholderidentity_number_gulf_leaseholder")
            setidentity_number_gulf_leaseholder(value)

            if (value === null | value === "") {
              setidentity_number_gulfValidation_leaseholder(false)
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
              // return true
            }
          }
        }



        setidentity_number_gulfValidation_leaseholder(true)
        return true
      }
    }),

    tenant_type_of_contract: yup.mixed().test({
      name: 'tenant_type_of_contract',
      skipAbsent: true,
      test(value, ctx) {

        if (type_of_AuctionValueId == "1") {
          if (checkInputUndefined(value)) {
            value = tenant_type_of_contractValue
            console.log(tenant_type_of_contractValue, "tenant_type_of_contractValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              console.log("here")
              if (watch('tenant_type_of_contract') != oldtenant_type_of_contractValue) {
                setoldtenant_type_of_contractValue(value)
                if (watch('tenant_type_of_contract') != undefined) {
                  setValue('identity_number_leaseholder', "")
                  setValue('identity_number_systematic_leaseholder', "")
                  setValue('identity_number_gulf_leaseholder', "")
                }
                // setValue('tenant_nationality',{
                //   id: 1,
                //   label: "اختر من القائمة",
                //   value: "اختر من القائمة"}
                // )

              }
              settenant_type_of_contractValueId("")
              settenant_type_of_contractValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {

                settenant_type_of_contractValueId(value.id)
                // setValue('tenant_nationality',{
                //   id: 1,
                //   label: "اختر من القائمة",
                //   value: "اختر من القائمة"}
                // )


              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            if (watch('tenant_type_of_contract') != oldtenant_type_of_contractValue) {
              setoldtenant_type_of_contractValue(value)
              if (watch('tenant_type_of_contract') != undefined) {
                setValue('identity_number_leaseholder', "")
                setValue('identity_number_systematic_leaseholder', "")
                setValue('identity_number_gulf_leaseholder', "")
              }
              // setValue('tenant_nationality',{
              //   id: 1,
              //   label: "اختر من القائمة",
              //   value: "اختر من القائمة"}
              // )

            }
            settenant_type_of_contractValueId("")
            settenant_type_of_contractValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              settenant_type_of_contractValueId(value.id)
              // setValue('tenant_nationality',{
              //   id: 1,
              //   label: "اختر من القائمة",
              //   value: "اختر من القائمة"}
              // )
            } catch (e) {
              console.log("1")
            }
          }
        }


        settenant_type_of_contractValidation(true)

        if (type_of_AuctionValueId == "1") {
          if (watch('tenant_type_of_contract') != oldtenant_type_of_contractValue) {
            setoldtenant_type_of_contractValue(value)
            if (watch('tenant_type_of_contract') != undefined) {
              setValue('identity_number_leaseholder', "")
              setValue('identity_number_systematic_leaseholder', "")
              setValue('identity_number_gulf_leaseholder', "")
            }
            // setValue('tenant_nationality',{
            //   id: 1,
            //   label: "اختر من القائمة",
            //   value: "اختر من القائمة"}
            // )

          }

        }





        return true
      }
    }),




    commercial_number2: yup.string().test({
      name: 'commercial_number2',
      skipAbsent: true,
      test(value, ctx) {

        if (type_of_AuctionValueId == "2") {
          if (checkInputUndefined(value)) {
            value = commercial_number2
          }
          setcommercial_number2(value)

          if (value === null | value === "") {
            setcommercial_number2Validation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          }
        }
        setcommercial_number2Validation(true)
        return true
      }
    }),

    Unified_No: yup.string().test({
      name: 'Unified_No',
      skipAbsent: true,
      test(value, ctx) {
        if (type_of_AuctionValueId == "2") {
          if (checkInputUndefined(value)) {
            value = Unified_No
          }
          setUnified_No(value)

          if (value === null | value === "") {
            setUnified_NoValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          }
        }
        setUnified_NoValidation(true)
        return true
      }
    }),














  })





  const saveDataCompanynew = async () => {
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
      bodyFormData.append('Contract_Name', name)

      bodyFormData.append('commercial_number', commercial_number)
      bodyFormData.append('total_amount', total_amount)
      // bodyFormData.append('sadad_cycle', sadad_cycle)
      bodyFormData.append('sadad_cycle', sadad_cycle_ValueId)

      bodyFormData.append('annual_value_sadad', annual_value_sadad)
      bodyFormData.append('type_of_Auction', type_of_AuctionValueId)
      // bodyFormData.append('identity_number', identity_number)
      // bodyFormData.append('identity_number_systematic', identity_number_systematic)
      // bodyFormData.append('identity_number_gulf', identity_number_gulf)
      // bodyFormData.append('identity_number_leaseholder', identity_number_leaseholder)
      // bodyFormData.append('identity_number_systematic_leaseholder', identity_number_systematic_leaseholder)
      // bodyFormData.append('identity_number_gulf_leaseholder', identity_number_gulf_leaseholder)
      bodyFormData.append('identity_number', lease_type_of_contractValueId == "0" ? identity_number : "")
      bodyFormData.append('identity_number_systematic', lease_type_of_contractValueId == "1" ? identity_number_systematic : "")
      bodyFormData.append('identity_number_gulf', lease_type_of_contractValueId == "2" ? identity_number_gulf : "")
      bodyFormData.append('identity_number_leaseholder', tenant_type_of_contractValueId == "0" ? identity_number_leaseholder : "")
      bodyFormData.append('identity_number_systematic_leaseholder', tenant_type_of_contractValueId == "1" ? identity_number_systematic_leaseholder : "")
      bodyFormData.append('identity_number_gulf_leaseholder', tenant_type_of_contractValueId == "2" ? identity_number_gulf_leaseholder : "")
      bodyFormData.append('commercial_number2', commercial_number2)
      bodyFormData.append('Unified_No', Unified_No)

      console.log(lease_type_of_contractValueId, "---", lease_nationality_ValueId, "-----------------1")
      console.log(tenant_type_of_contractValueId, "---", tenant_nationality_ValueId, "-----------------2")
      bodyFormData.append('lease_nationality', (lease_type_of_contractValueId == "1" || lease_type_of_contractValueId == "2") ? lease_nationality_ValueId : "")
      bodyFormData.append('tenant_nationality', (tenant_type_of_contractValueId == "1" || tenant_type_of_contractValueId == "2") ? tenant_nationality_ValueId : "")






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



      bodyFormData.append("new_files_ids", my_ids_of_files)

      // mmm
      console.log(backend_files, "beso")
      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }





      //new file upload for financial management
      if (is_finanical_management) {
        bodyFormData.append("new_files_ids_financial_management", my_ids_of_files_financial_management)

        // mmm

        for (var i = 0; i < backend_files_financial_management.length; i++) {
          bodyFormData.append('files_of_this_financial_management', backend_files_financial_management[i]);

        }
      }



      bodyFormData.append('contract_id', company_Id)
      bodyFormData.append('Contract_Name', name)

      // bodyFormData.append('commercial_number', commercial_number)

      bodyFormData.append('commercial_number', commercial_number)
      bodyFormData.append('total_amount', total_amount)
      // bodyFormData.append('sadad_cycle', sadad_cycle)
      bodyFormData.append('sadad_cycle', sadad_cycle_ValueId)

      bodyFormData.append('annual_value_sadad', annual_value_sadad)
      bodyFormData.append('type_of_Auction', type_of_AuctionValueId)

      console.log('identity_number', identity_number)

      console.log('identity_number_systematic', identity_number_systematic)

      console.log('identity_number_gulf', identity_number_gulf)

      console.log('identity_number_leaseholder', identity_number_leaseholder)

      console.log('identity_number_systematic_leaseholder', identity_number_systematic_leaseholder)
      console.log('identity_number_gulf_leaseholder', identity_number_gulf_leaseholder)



      bodyFormData.append('identity_number', lease_type_of_contractValueId == "0" ? identity_number : "")
      bodyFormData.append('identity_number_systematic', lease_type_of_contractValueId == "1" ? identity_number_systematic : "")
      bodyFormData.append('identity_number_gulf', lease_type_of_contractValueId == "2" ? identity_number_gulf : "")
      bodyFormData.append('identity_number_leaseholder', tenant_type_of_contractValueId == "0" ? identity_number_leaseholder : "")
      bodyFormData.append('identity_number_systematic_leaseholder', tenant_type_of_contractValueId == "1" ? identity_number_systematic_leaseholder : "")
      bodyFormData.append('identity_number_gulf_leaseholder', tenant_type_of_contractValueId == "2" ? identity_number_gulf_leaseholder : "")
      bodyFormData.append('commercial_number2', commercial_number2)
      bodyFormData.append('Unified_No', Unified_No)

      console.log(lease_type_of_contractValueId, "---", lease_nationality_ValueId, "-----------------1")
      console.log(tenant_type_of_contractValueId, "---", tenant_nationality_ValueId, "-----------------2")
      bodyFormData.append('lease_nationality', (lease_type_of_contractValueId == "1" || lease_type_of_contractValueId == "2") ? lease_nationality_ValueId : "")
      bodyFormData.append('tenant_nationality', (tenant_type_of_contractValueId == "1" || tenant_type_of_contractValueId == "2") ? tenant_nationality_ValueId : "")


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

    console.log('lease_nationality', lease_nationality_ValueId)
    console.log('tenant_nationality', tenant_nationality_ValueId)
    console.log(bodyFormData, "body form")


    try {
      if (add['current'] === true) {
        console.log("Fehsa")
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
          url: `${domain_url}/Contract/AddContractsRental/`,
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
                navigate('/ContractRental?success=added')
              } else {
                navigate('/ContractRental?success=edited')

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
          url: `${domain_url}/Contract/AddContractsRental/?id=${company_Id}`,
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
                navigate('/ContractRental?success=added')
              } else {
                navigate('/ContractRental?success=edited')

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

  const loadOptionsDB_Company = async () => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    console.log(companyData, "companyData........")
    if (companyData.length > 0) {
      return companyData
    } else {
      const data = await axios.get(`${domain_url}/Contract/company_list`, config).then(res => {
        console.log(res.data.city, "jaja")
        const company_list = []
        const result = res.data.company

        result.forEach((item, index, array) => {
          console.log(item, "item00")
          let disabledVal = ""
          console.log(item.company_type, "item.company_type")
          if (item.company_type == "1") {
            disabledVal = true
          } else {
            disabledVal = false

          }
          console.log(disabledVal, "disabledVal")
          company_list.push(
            {
              id: item['id'],
              value: item['Company_Name'],
              label: item['Company_Name'],
              isDisabled: disabledVal
            }
          )
        })
        return company_list


      })
      console.log("data .company", data)
      setCompanyData(data)
      return data
    }
  }

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
  //         // if(item['id'] != "2"){
  //         // if (item['id'] != "2" && item['id'] != "3") {
  //         //   company_list.push(
  //         //     {
  //         //       id: item['id'],
  //         //       value: item['Status_of_cont'],
  //         //       label: item['Status_of_cont']
  //         //     }
  //         //   )
  //         // }
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
  const loadOptionsDB_City = async () => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (cityData.length > 0) {
      return cityData
    } else {
      const data = await axios.get(`${domain_url}/Company/dropdown_data`, config).then(res => {
        const company_list = []
        const result = res.data.city

        result.forEach((item, index, array) => {
          company_list.push(
            {
              id: item['id'],
              value: item['Status_of_cont'],
              label: item['Status_of_cont']
            }
          )
        })
        return company_list


      })
      // console.log("data .", data)
      setcityData(data)
      return data
    }
  }

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
    // console.log("data .", data)
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
    // console.log("data .", data)
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
      // console.log("data .", data)
      setdepartmentData(data)
      return data
    }
  }

  // const loadOptionsNationality = async () => {
  //   const token = localStorage.getItem("token")

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }

  //   const data = await axios.get(`https://restcountries.com/v3.1/all`).then(res => {
  //     var result = res.data
  //     const company_list = []
  //     result.forEach((item, index, array) => {

  //       company_list.push(
  //         {
  //           id: index,
  //           value: item['name']['common'],
  //           label: item['name']['common']
  //         }
  //       )
  //     })
  //     return company_list

  //   })
  //   // console.log("data .", data)
  //   setlease_nationality_Data(data)
  //   settenant_nationality_Data(data)
  //   return data

  // }

  // const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {

  const loadOptionsNationality = async () => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    console.log("wowowow")

    const data = await axios.get(`${domain_url}/Nationalities/NationalitiesView/`, config).then(res => {
      var result = res.data.data
      const company_list = []
      result.forEach((item, index, array) => {

        company_list.push(
          {
            id: index,
            value: item['name_arabic'],
            label: item['name_arabic']
          }
        )
      })
      return company_list

    })
    console.log("data .", data)
    setlease_nationality_Data(data)
    settenant_nationality_Data(data)
    return data

  }


  // const loadOptionsNationality2 = async (lease, tenant) => {
  //   const token = localStorage.getItem("token")

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }

  //   const data = await axios.get(`https://restcountries.com/v3.1/all`).then(res => {
  //     var result = res.data
  //     const company_list = []
  //     result.forEach((item, index, array) => {

  //       company_list.push(
  //         {
  //           id: index,
  //           value: item['name']['common'],
  //           label: item['name']['common']
  //         }
  //       )

  //       if (lease != "" || lease != null) {
  //         if (lease == item['name']['common']) {
  //           setlease_nationality_Value({
  //             id: index,
  //             value: item['name']['common'],
  //             label: item['name']['common']
  //           })

  //         }
  //       }


  //       if (tenant != "" || tenant != null) {
  //         if (tenant == item['name']['common']) {
  //           settenant_nationality_Value({
  //             id: index,
  //             value: item['name']['common'],
  //             label: item['name']['common']
  //           })

  //         }
  //       }


  //     })
  //     return company_list

  //   })
  //   setlease_nationality_Data(data)

  //   settenant_nationality_Data(data)

  //   return data

  // }

  const loadOptionsNationality2 = async (lease, tenant) => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const data = await axios.get(`${domain_url}/Nationalities/NationalitiesView/`, config).then(res => {
      var result = res.data.data
      const company_list = []
      result.forEach((item, index, array) => {

        company_list.push(
          {
            id: index,
            value: item['name_arabic'],
            label: item['name_arabic']
          }
        )

        if (lease != "" || lease != null) {
          if (lease == item['name_arabic']) {
            setlease_nationality_Value({
              id: index,
              value: item['name_arabic'],
              label: item['name_arabic']
            })

          }
        }


        if (tenant != "" || tenant != null) {
          if (tenant == item['name_arabic']) {
            settenant_nationality_Value({
              id: index,
              value: item['name_arabic'],
              label: item['name_arabic']
            })

          }
        }


      })
      return company_list

    })
    setlease_nationality_Data(data)

    settenant_nationality_Data(data)

    return data

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
            value: "إيجار",
            label: "إيجار"
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
            value: "إيجار",
            label: "إيجار"
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




  const loadOptionsDB_Cities_for_country = async (countryValueId) => {
    const token = localStorage.getItem("token")
    setLoaderShow(true)
    // let LoaderForCity = document.querySelector(".LoaderForCity")
    // LoaderForCity.classList.remove("d-none")
    let countryValueorg = countryValue
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    console.log(countryValueId, "countryValueId")

    if (false) {
      // return companyData
      console.log("yeas")
    } else {
      // setLoaderShow(true)
      console.log("send request ...", `${domain_url}/Country/CountryCities?countryId=${countryValueId}`)

      const data = await axios.get(`${domain_url}/Country/CountryCities?countryId=${countryValueId}`, config).then(res => {
        console.log(res.data.data, "nana")
        const company_list = []
        const result = res.data.data

        result.forEach((item, index, array) => {
          company_list.push(
            {
              id: item['id'],
              value: item['Status_of_cont'],
              label: item['Status_of_cont']
            }
          )
        })
        return company_list


      })
      setcityData(data)
      // LoaderForCity.classList.add("d-none")

      setLoaderShow(false)

      // setCountryValue(countryValueorg)
      // setLoaderShow(false)
      // return data
    }
  }


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

  const SelectLeaseIdentityWithValidation1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

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
              onChange={(e) => {

                field.onChange(e);
                setValue('lease_nationality', {
                  id: 0,
                  label: "اختر من القائمة",
                  value: "اختر من القائمة"
                })


              }}

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

  const SelectTenantIdentityWithValidation1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB }) => {

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
              onChange={(e) => {

                field.onChange(e);
                setValue('tenant_nationality', {
                  id: 0,
                  label: "اختر من القائمة",
                  value: "اختر من القائمة"
                })


              }}

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



  // ** Hooks
  const {
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log("submit")

    // if (add['current']) {
    //   if ((durationValidation & departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation)) {
    //     console.log("submir")
    //     saveDataCompany()
    //   }
    // }
    // else {
    //   if ((departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation)) {
    //     saveDataCompany()
    //   }
    // }
    console.log(data)

    if (add['current']) {
      if ((durationValidation & departmentValidation & notesValidation & departmentValidation & user_dep_Validation & !date_fromValidation & !date_toValidation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation)) {
        console.log("submir")
        setidentity_number(data.identity_number ?? "")
        setidentity_number_systematic(data.identity_number_systematic ?? "")
        setidentity_number_gulf(data.identity_number_gulf ?? "")
        setidentity_number_leaseholder(data.identity_number_leaseholder ?? "")
        setidentity_number_systematic_leaseholder(data.identity_number_systematic_leaseholder ?? "")
        setidentity_number_gulf_leaseholder(data.identity_number_gulf_leaseholder ?? "")
        saveDataCompanynew()
      }
    }
    else {

      if ((departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & user_dep_Validation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation)) {

        setidentity_number(data.identity_number ?? "")
        setidentity_number_systematic(data.identity_number_systematic ?? "")
        setidentity_number_gulf(data.identity_number_gulf ?? "")
        setidentity_number_leaseholder(data.identity_number_leaseholder ?? "")
        setidentity_number_systematic_leaseholder(data.identity_number_systematic_leaseholder ?? "")
        setidentity_number_gulf_leaseholder(data.identity_number_gulf_leaseholder ?? "")
        saveDataCompanynew()
      }
    }
  }

  // } else {
  //   console.log("can not")
  // }



  function handleClickSave() {
    console.log("clicked btn ...")
    let date_from_input = document.getElementsByName("date_from")[0]
    let date_to_input = document.getElementsByName("date_to")[0]

    let date_from = date_from_input.value
    let date_to = date_to_input.value

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

    if (date_to == "" || date_to == undefined) {
      console.log("notcalid")

      setdate_toValidation(true)
      setdate_to("")
      date_to_input.classList.add("form-control")
      date_to_input.classList.add("form-control-lg")
      date_to_input.classList.add("is-invalid")


    } else {
      setdate_toValidation(false)
      setdate_to(date_to)
      date_to_input.classList.add("form-control")
      date_to_input.classList.add("form-control-lg")
      date_to_input.classList.remove("is-invalid")

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
    // setduration(Difference_In_Days)
    if (!isNaN(Difference_In_Days)) {
      setduration(Difference_In_Days)
    }
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



    if (!isNaN(Difference_In_Days)) {
      setduration(Difference_In_Days)
    }
    // setduration(Difference_In_Days)
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

  function handleChangeDateFrom(date) {
    try {
      let datestr = date.toString();
      let date_from_input = document.getElementsByName("date_from")[0]
      let date_to_input = document.getElementsByName("date_to")[0]
      let date_to = date_to_input.value

      console.log(date_to, "date_to..........", datestr)

      let tenture = document.getElementsByName("duration")[0].value
      console.log(tenture, "tenture")

      let date_from = date_from_input.value
      if (datestr == "" || datestr == undefined) {
        setdate_fromValidation(true)
        setdate_from("")
        date_from_input.classList.add("is-invalid")

      } else {
        if (date != null & date != "" & date_to != null & date_to != "") {
          console.log(date, date_to, "date,date_to")
          calc_dateViaDates(date, date_to)

        } else {
          calc_date(date, tenture)

        }
        // setdate_fromValidation(false)
        // setdate_from(datestr)
        // date_from_input.classList.remove("is-invalid")

      }

    } catch (e) {
      setdate_fromValidation(true)
      setdate_from("")
      date_from_input.classList.add("is-invalid")
    }
  }

  function handleChangeDateTo(date) {
    try {
      let datestr = date.toString();
      let date_to_input = document.getElementsByName("date_to")[0]
      let date_to = date_to_input.value
      let date_from_input = document.getElementsByName("date_from")[0]
      let date_from = date_from_input.value
      let tenture = document.getElementsByName("duration")[0].value

      if (datestr == "" || datestr == undefined) {
        setdate_toValidation(true)
        setdate_to("")
        date_to_input.classList.add("is-invalid")

      } else {
        if (date != null & date != "" & date_to != null & date_to != "") {
          calc_dateToViaDates(datestr, date_from)

        } else {
          calc_date_to(datestr, tenture)

        }
        // setdate_toValidation(false)
        // setdate_to(datestr)
        // date_to_input.classList.remove("is-invalid")

      }
    } catch (e) {
      let date_to_input = document.getElementsByName("date_to")[0]

      setdate_toValidation(true)
      setdate_to("")
      date_to_input.classList.add("is-invalid")
    }
  }

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
    seterrorFile("")
  }

  function handleFileChange1(e) {
    let updateFiles = []
    let backend_updateFiles = []
    if (e.target.files) {
      console.log(e.target.files[0].file, "fff")


      updateFiles = [
        // copy the current users state
        ...files_financial_management,
        {
          "id": uuidv4(),
          "name": e.target.files[0].name,
          "size": e.target.files[0].size,
          "fileObj": e.target.files[0],
          // "creation_time": formattedDate

        }
      ];


      console.log(e.target.files[0], "appended")
      backend_updateFiles = [
        // copy the current users state
        ...backend_files_financial_management,
        e.target.files[0]
      ];
      console.log(backend_updateFiles, "appened")
    }
    // update the state to the updatedUsers
    setfiles_financial_management(updateFiles);
    setbackend_files_financial_management(backend_updateFiles)

    console.log({
      "id": uuidv4(),
      "name": e.target.files[0].name,
      "size": e.target.files[0].size,
      "fileObj": e.target.files[0],
      // "creation_time": formattedDate

    }, "fesha")

    if (e.target.files) {
      console.log(e.target.files[0], "files")
    }
  }

  function handleDeleteFile(name, e, id = '') {
    console.log("clicked ..", id)
    if (id != '') {

      let newupdateFiles = []
      let backend_updateFiles = []

      let newupdateFiles1 = []
      let backend_updateFiles1 = []

      let i = 0
      for (i; i < old_files.length; i++) {
        console.log(old_files[i]['name'], name, "updated")
        console.log(old_files[i]['name'] != name, "name")

        if (old_files[i]['name'] != name) {
          console.log(old_files[i]['name'], "why?")
          newupdateFiles = [
            ...newupdateFiles,
            {

              "name": old_files[i].name,
              "size": "200",
              "path": old_files[i].file,
              "id": old_files[i].id

            }
          ];

          backend_updateFiles = [
            ...backend_updateFiles,
          ];

        }
      }

      let d = 0
      for (d; d < files.length; d++) {
        console.log(files[d]['name'], name, "updated1")
        console.log(files[d]['name'] != name, "name1")

        if (files[d]['name'] != name) {
          console.log(files[d]['name'], "why?1")
          newupdateFiles1 = [
            ...newupdateFiles1,
            {

              "name": files[d].name,
              "size": "200",
              "path": files[d].file,
              "id": files[d].id

            }
          ];

          backend_updateFiles1 = [
            ...backend_updateFiles1,
          ];

        }
      }



      setold_files(newupdateFiles)
      setfiles(newupdateFiles1)

      const combinedArray = [
        ...backend_updateFiles,
        ...backend_updateFiles1,
      ];
      setbackend_files(combinedArray)

      setmy_ids_of_files(prevState => [...prevState, id])






    }
    else {

      let newupdateFiles = []
      let backend_updateFiles = []

      let newupdateFiles1 = []
      let backend_updateFiles1 = []

      let i = 0
      for (i; i < old_files.length; i++) {
        console.log(old_files[i]['name'], name, "updated")
        console.log(old_files[i]['name'] != name, "name")

        if (old_files[i]['name'] != name) {
          console.log(old_files[i]['name'], "why?")
          newupdateFiles = [
            ...newupdateFiles,
            {

              "name": old_files[i].name,
              "size": "200",
              "path": old_files[i].file,
              "id": old_files[i].id

            }
          ];

          backend_updateFiles = [
            ...backend_updateFiles,
          ];

        }
      }

      let d = 0
      for (d; d < files.length; d++) {
        console.log(files[d]['name'], name, "updated1")
        console.log(files[d]['name'] != name, "name1")

        if (files[d]['name'] != name) {
          console.log(files[d]['name'], "why?1")
          newupdateFiles1 = [
            ...newupdateFiles1,
            {

              "name": files[d].name,
              "size": "200",
              "path": files[d].file,
              "id": files[d].id

            }
          ];

          backend_updateFiles1 = [
            ...backend_updateFiles1,
          ];

        }
      }



      setold_files(newupdateFiles)
      setfiles(newupdateFiles1)

      const combinedArray = [
        ...backend_updateFiles,
        ...backend_updateFiles1,
      ];
      setbackend_files(combinedArray)
    }



  }

  function handleDeleteFile2(name, e, id = '') {


    let newupdateFiles = []
    let backend_updateFiles = []

    let newupdateFiles1 = []
    let backend_updateFiles1 = []



    var i = 0
    for (i; i < old_files_financial_management.length; i++) {
      console.log(old_files_financial_management[i]['name'], name, "updated")

      if (old_files_financial_management[i]['name'] != name) {
        newupdateFiles = [
          ...newupdateFiles,
          {

            "name": old_files_financial_management[i].name,
            "creation_by": old_files_financial_management[i].creation_by,
            "creation_time": old_files_financial_management[i].creation_time,
            "size": old_files_financial_management[i].size,
            "path": old_files_financial_management[i].file,
            "id": old_files_financial_management[i].id
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

    var i = 0
    for (i; i < files_financial_management.length; i++) {
      console.log(files_financial_management[i]['name'], name, "updated")
      // console.log(files_financial_management[i]['name'], "name")

      if (files_financial_management[i]['name'] != name) {
        console.log(name, "the naaaame")
        newupdateFiles1 = [
          ...newupdateFiles1,
          {

            "name": files_financial_management[i].name,
            "creation_by": files_financial_management[i].creation_by,
            "creation_time": files_financial_management[i].creation_time,
            "size": files_financial_management[i].size,
            "path": files_financial_management[i].file,
            "id": files_financial_management[i].id
            // "fileObj": old_files[i].fileObj

          }
        ];

        backend_updateFiles1 = [
          // copy the current users state
          ...backend_updateFiles1,
          // files[i].fileObj
        ];


      }


    }

    setold_files_financial_management(newupdateFiles)
    setfiles_financial_management(newupdateFiles1)
    const combinedArray = [
      ...backend_updateFiles,
      ...backend_updateFiles1,
    ];
    setbackend_files_financial_management(combinedArray)

    if (id != '') {
      setmy_ids_of_files_financial_management(prevState => [...prevState, id])
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
                <a href="/ContractRental">

                  {/* <a href="/contractsRental"> */}
                  <span className='ps-md-3 headerContractObj'> عقود الإيجار</span>
                </a>
                <span className='ps-md-3'><ArrowIcon /></span>
              </>

              {(add['current']) ?
                <span className='px-md-3 headerContractObj headerContractObjColored p-2 '>  إضافة عقد إيجار</span>
                :
                <span className='px-md-3 headerContractObj headerContractObjColored p-2 '> تعديل عقد إيجار</span>
              }
            </div>
            <div className='col-md-1'></div>





          </div>
          <div className='d-md-flex justify-content-between'>
            {(add['current']) ? <div className='addPageHeader pt-4 ps-0 ms-0'>إضافة عقد إيجار</div> : <div className='addPageHeader pt-4 ps-0 ms-0'>تعديل عقد إيجار</div>}
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

                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                    اسم العقد
                  </Label>
                  <Controller
                    id='name'
                    name='name'
                    value={`${name}`}
                    onChange={(e) => setName(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل اسم العقد ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
                  />
                  {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

                </Col>

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={departmentValue} id_name='department' title='الإدارة' control={control} errors_check={errors.department} loadOptionsDB={departmentData} />
                </Col>

                {visible_user_dep ?

                  <>
                    <Col sm='4' className='mb-4 form-group bmd-form-group'>
                      <SelectWithValidation1 defaultValue={user_dep_Value} id_name='user_department' title='المديرين' control={control} errors_check={errors.user_department} loadOptionsDB={user_dep_Data} />
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
                <Col sm='4' className='mb-4 form-group bmd-form-group'>
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

                </Col>


                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                    فترة العقد بالأيام
                  </Label>

                  <Controller
                    id='duration'
                    name='duration'
                    value={`${duration}`}
                    onChange={(e) => HandleTentureChange(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل فترة العقد' bsSize='lg' disabled className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.duration && true} />}
                  />

                  {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}
                </Col>

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='commercial_number'>
                    رقم سجل العقد
                  </Label>
                  <Controller
                    id='commercial_number'
                    name='commercial_number'
                    value={`${commercial_number}`}
                    onChange={(e) => setcommercial_number(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل رقم سجل العقد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.commercial_number && true} />}
                  />
                  {errors.commercial_number && <FormFeedback>{errors.commercial_number.message}</FormFeedback>}
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
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='annual_value_sadad'>
                    القيمة السنوية للإيجار
                  </Label>
                  <Controller
                    id='annual_value_sadad'
                    name='annual_value_sadad'
                    value={`${annual_value_sadad}`}
                    onChange={(e) => setannual_value_sadad(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل القيمة السنوية للإيجار' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.annual_value_sadad && true} />}
                  />
                  {errors.annual_value_sadad && <FormFeedback>{errors.annual_value_sadad.message}</FormFeedback>}
                </Col>

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={type_of_AuctionValue} id_name='type_of_Auction' title='نوع المؤجر' control={control} errors_check={errors.type_of_Auction} loadOptionsDB={type_of_AuctionData} change="type" />
                </Col>


                {type_of_AuctionValueId == "1" &&
                  (
                    <>
                      <Row className="form-label font-Cairo f-w-700 f-s-16px color-5F605F">بيانات المؤجر :</Row>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <SelectLeaseIdentityWithValidation1 defaultValue={lease_type_of_contractValue} id_name='lease_type_of_contract' title='نوع الهوية' control={control} errors_check={errors.lease_type_of_contract} loadOptionsDB={lease_type_of_contractdata} change="type" />
                      </Col>
                      {lease_type_of_contractValueId == "0" &&
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
                      }
                      {lease_type_of_contractValueId == "1" &&
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
                      }
                      {lease_type_of_contractValueId == "2" &&
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
                      }

                      {(lease_type_of_contractValueId == "1" || lease_type_of_contractValueId == "2") &&


                        <Col sm='4' className='mb-4 form-group bmd-form-group'>
                          <SelectWithValidation1 defaultValue={lease_nationality_Value} id_name='lease_nationality' title='الجنسية' control={control} errors_check={errors.lease_nationality} loadOptionsDB={lease_nationality_Data} />
                        </Col>
                      }




                      <Row className="form-label font-Cairo f-w-700 f-s-16px color-5F605F">بيانات المستأجر :</Row>
                      <Col sm='4' className='mb-4 form-group bmd-form-group'>
                        <SelectTenantIdentityWithValidation1 defaultValue={tenant_type_of_contractValue} id_name='tenant_type_of_contract' title='نوع الهوية' control={control} errors_check={errors.tenant_type_of_contract} loadOptionsDB={tenant_type_of_contractdata} change="type" />
                      </Col>
                      {tenant_type_of_contractValueId == "0" &&
                        <Col sm='4' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number_leaseholder'>
                            الهوية الوطنية
                          </Label>
                          <Controller
                            id='identity_number_leaseholder'
                            name='identity_number_leaseholder'
                            value={`${identity_number_leaseholder}`}
                            onChange={(e) => setidentity_number_leaseholder(e.target.value)}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل الهوية الوطنية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_leaseholder && true} />}
                          />
                          {errors.identity_number_leaseholder && <FormFeedback>{errors.identity_number_leaseholder.message}</FormFeedback>}
                        </Col>
                      }

                      {tenant_type_of_contractValueId == "1" &&
                        <Col sm='4' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number_leaseholder'>
                            هوية اقامة نظامية
                          </Label>
                          <Controller
                            id='identity_number_systematic_leaseholder'
                            name='identity_number_systematic_leaseholder'
                            value={`${identity_number_systematic_leaseholder}`}
                            onChange={(e) => setidentity_number_systematic_leaseholder(e.target.value)}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل هوية اقامة نظامية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_systematic_leaseholder && true} />}
                          />
                          {errors.identity_number_systematic_leaseholder && <FormFeedback>{errors.identity_number_systematic_leaseholder.message}</FormFeedback>}
                        </Col>
                      }
                      {tenant_type_of_contractValueId == "2" &&
                        <Col sm='4' className='mb-4 form-group bmd-form-group'>
                          <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='identity_number_leaseholder'>
                            هوية مقيم خليجي
                          </Label>
                          <Controller
                            id='identity_number_gulf_leaseholder'
                            name='identity_number_gulf_leaseholder'
                            value={`${identity_number_gulf_leaseholder}`}
                            onChange={(e) => setidentity_number_gulf_leaseholder(e.target.value)}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='أدخل هوية مقيم خليجي' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number_gulf_leaseholder && true} />}
                          />
                          {errors.identity_number_gulf_leaseholder && <FormFeedback>{errors.identity_number_gulf_leaseholder.message}</FormFeedback>}
                        </Col>
                      }

                      {(tenant_type_of_contractValueId == "1" || tenant_type_of_contractValueId == "2") &&

                        <Col sm='4' className='mb-4 form-group bmd-form-group'>
                          <SelectWithValidation1 defaultValue={tenant_nationality_Value} id_name='tenant_nationality' title='الجنسية' control={control} errors_check={errors.tenant_nationality} loadOptionsDB={tenant_nationality_Data} />
                        </Col>
                      }
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
                    </>
                  )}















                {/* <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='sadad_cycle'>
                    دورة السداد
                  </Label>
                  <Controller
                    id='sadad_cycle'
                    name='sadad_cycle'
                    value={`${sadad_cycle}`}
                    onChange={(e) => setsadad_cycle(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل دورة السداد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.sadad_cycle && true} />}
                  />
                  {errors.sadad_cycle && <FormFeedback>{errors.sadad_cycle.message}</FormFeedback>}
                </Col> */}

                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={sadad_cycle_Value} id_name='sadad_cycle' title='دورة السداد' control={control} errors_check={errors.sadad_cycle} loadOptionsDB={tenant_nationality_Data} />
                </Col>

                <Col sm='12' className='mb-4 form-group bmd-form-group'>
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








                <Col sm='12' className='mb-4 mt-4 form-group bmd-form-group'>
                  <div class="btn-wrap">
                    <div class="upload-btn-wrapper first-file-container">
                      <button class="btnUpload upload1 py-5" id="btn_file1" type="button">
                        <Fileupload />

                        <div className='mt-3 text-center color-5F605F f-s-14px f-w-600'>إضافة مرفقات</div>
                        <div className='mt-3 text-center color-5F605F f-s-12px f-w-400'>إضغط لإرفاق المستند او اسحب واترك
                          PNG, JPG or PDF</div>
                      </button>
                      <input type="file" onChange={handleFileChange} class="fileupload1" id="input1" name="file1" style={{ height: "250px" }} value="" accept="application/pdf,.jpg,.png" />



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
                            <>
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


                            </>
                          );




                        })}




                        {files.map(function (object, i) {
                          let name = object.name

                          return (

                            <div className='object-file-container  mt-3 py-4 px-3 d-flex justify-content-between'>
                              <div >
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

                <div className='text-start color-5F605F f-s-20px f-w-700 mb-3 '>{errorFile} </div>



                {add['current'] === true ?


                  <></>
                  :
                  <>
                    {is_finanical_management &&

                      <>
                        <Label className='form-label mt-4  font-Cairo f-w-700 f-s-16px color-5F605F'>إيصالات دفع عقود الإيجار</Label>
                        <Col sm='12' className='mb-4 mt-1 form-group bmd-form-group'>
                          <div class="btn-wrap">
                            <div class="upload-btn-wrapper first-file-container">
                              <button onClick={() => { financial_statement_click.current.click() }} class="btnUpload upload1x py-5" id="btn_file1" type="button">
                                <Fileupload />

                                <div className='mt-3 text-center color-5F605F f-s-14px f-w-600'>إضافة مرفقات</div>
                                <div className='mt-3 text-center color-5F605F f-s-12px f-w-400'>إضغط لإرفاق المستند او اسحب واترك
                                  PNG, JPG or PDF</div>
                              </button>
                              <input ref={financial_statement_click} type="file" onChange={handleFileChange1} class="fileupload1x" id="input1x" name="file1x" value="" style={{ height: "250px" }} accept="application/pdf,.jpg,.png" />



                              <Col sm='12' className='mb-4 px-3 mt-4 form-group bmd-form-group'>
                                <div className='text-start color-5F605F f-s-14px f-w-700 mb-3'>
                                  المرفقات
                                </div>
                                {old_files_financial_management.map(function (object, i) {
                                  console.log(object, "objectobjectobjectobject")
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
                                          <span className='mt-1 text-start'>
                                            <div className=' ms-3  color-414042 f-s-16px f-w-500'>{name_file}</div>
                                            <div className='text-start ms-3 color-ACB5BE f-s-12px f-w-500'>{object.creation_by}</div>
                                            <div className='text-start ms-3 color-ACB5BE f-s-12px f-w-500'>{object.creation_time}</div>
                                            <div className='text-start ms-3 color-ACB5BE f-s-12px f-w-500'>{object.size}</div>
                                          </span>


                                        </div>
                                      </a>
                                      <div>
                                        {/* <a onClick={(e) => handleDeleteFile1(name, e, object.id, "old_files")}> */}
                                        <a onClick={(e) => handleDeleteFile2(name, e, object.id)}>

                                          <DeleteFile />
                                        </a>
                                      </div>


                                    </div>
                                  );


                                })}
                                {files_financial_management.map(function (object, i) {
                                  let name = object.name
                                  console.log(object, "files_financial_managementfiles_financial_managementfiles_financial_managementfiles_financial_management")

                                  return (

                                    <div className='object-file-container  mt-3 py-4 px-3 d-flex justify-content-between'>
                                      {/* <a target='_blank' href={`${domain_url}${object.name}`}> */}
                                      <div className='d-flex'>

                                        <span className=''><FileCorrect /></span>
                                        <span className='ms-3 mt-1 text-start'>
                                          <div className='color-414042 f-s-16px f-w-500'>{object.name}</div>
                                          <div className='color-ACB5BE f-s-12px f-w-500'>{object.size}kb</div>
                                        </span>


                                      </div>
                                      {/* </a> */}
                                      <div>
                                        {/* <a onClick={(e) => handleDeleteFile1(name, e, object.id, "new_files")}> */}
                                        <a onClick={(e) => handleDeleteFile2(name, e)}>
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


                        
                      </>
                    }

                  </>

                }



              </Row>
              <div className='text-start color-5F605F f-s-20px f-w-700 mb-3 '>{errorFile_financial_management}</div>

            </div>



            <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
              <Col md='6' className='mb-2'>

                {/* onClick={handleClickSave} */}
                {
                  add['current'] === true ?
                    <>
                      <Button onClick={handleClickSave} className={(durationValidation & departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>
                    </>
                    :
                    <>
                      <Button onClick={handleClickSave} className={(departmentValidation & notesValidation & !date_fromValidation & !date_toValidation & user_dep_Validation & commercial_numberValidation & total_amountValidation & sadad_cycle_Validation & annual_value_sadadValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

                    </>

                }

              </Col>
              <Col md='6' className='mb-2'>
                <Button href="/ContractRental" className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
                  إلغاء
                </Button>
              </Col>


            </div>
          </Form>

          {/* end  car details component */}

        </div >
      </div >
    </>
  )
}

export default AddContract
