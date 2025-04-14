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
import { useForm, Controller } from 'react-hook-form'
import DatePicker from "react-multi-date-picker";

import { Fileupload, FileCorrect, DeleteFile, HomeIcon, ArrowIcon, Plus, CloseIcon } from '../components/icons/all_icons'

import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { selectThemeColors } from '@utils'
import * as yup from 'yup'
import $ from 'jquery'
import fs from 'fs'

import BillFormComponent from "../components/contract/BillFormComponent"
import BillFormComponent1 from "../components/contract/BillFormComponent1"


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

  const [NDAtype, setNDAtype] = useState(false)




  let via_default = ""




  const [name, setName] = useState("")
  const [contractNumber, setcontractNumber] = useState("")
  const [renewDuration, setrenewDuration] = useState("90")



  const [duration, setduration] = useState("")
  const [notes, setnotes] = useState("")
  const [date_from, setdate_from] = useState("")
  const [date_to, setdate_to] = useState("")
  const [date_fromValidation, setdate_fromValidation] = useState(false)
  const [date_toValidation, setdate_toValidation] = useState(false)


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
  const [can_add_tawreed2, setcan_add_tawreed2] = useState(false)
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



  const [tawreedtypeValidation, settawreedtypeValidation] = useState(false)
  const [tawreedtypeValueId, settawreedtypeValueId] = useState("")


  const [tawreedtypeValue, settawreedtypeValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [tawreedtypeData, settawreedtypeData] = useState([])









  const [bill_type, setbill_type] = useState("")



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

        {/* <BillFormComponent handleCloseTimeExtension={handleCloseBill} setSelectedRowId={setSelectedRowId}  setTypeAlert={setTypeAlert}  setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert}  setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance = {setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="" setcan_add_advancebtn = {setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn}  /> */}
        <BillFormComponent1 handleCloseTimeExtension={handleCloseBill} setSelectedRowId={setSelectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance={setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="" setcan_add_advancebtn={setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn} />

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

        {/* <BillFormComponent handleCloseTimeExtension={handleCloseBillForAdvance} setSelectedRowId={setSelectedRowId}  setTypeAlert={setTypeAlert}  setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert}  setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance = {setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="advance" setcan_add_advancebtn = {setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn}   /> */}
        <BillFormComponent1 handleCloseTimeExtension={handleCloseBillForAdvance} setSelectedRowId={setSelectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance={setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="advance" setcan_add_advancebtn={setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn} />

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

        {/* <BillFormComponent handleCloseTimeExtension={handleCloseBillForLate} setSelectedRowId={setSelectedRowId}  setTypeAlert={setTypeAlert}  setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert}  setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance = {setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="late" setcan_add_advancebtn = {setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn}   /> */}
        <BillFormComponent1 handleCloseTimeExtension={handleCloseBillForLate} setSelectedRowId={setSelectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} typeValue={typeValueId} billData={billData} setbillData={setbillData} setBillRecExists={setBillRecExists} can_add_advance={can_add_advance} setcan_add_advance={setcan_add_advance} can_add_late={can_add_late} setcan_add_late={setcan_add_late} via_default="late" setcan_add_advancebtn={setcan_add_advancebtn} setcan_add_latebtn={setcan_add_latebtn} />

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


      const result = await axios.get(`${domain_url}/Contract/AddContracts/?id=${company_id}`, config)
      console.log(result, "contract .........................................")
      const data = result.data[0]

      setName(data.Contract_Name)
      setcontractNumber(data.Contract_Number)
      setrenewDuration(data.renewDuration)


      setnotes(data.Note)
      // settawreed_type(data.tawreed_type)
      console.log(data.bill_type.id, "1111111111111111T")
      console.log(data.tawreed_type, "1111111111111111T")
      if (data.bill_type.id == "2") {
        setcan_add_tawreed(true)

        var tawreedoption1 = "معدات"
        var tawreedoption2 = "سيارات"
        var tawreedoption3 = "سلع استهلاكية"
        var tawreedoption4 = "أخرى"

        console.log(data.tawreed_type, "data.tawreed_type")

        if (data.tawreed_type != tawreedoption1 && data.tawreed_type != tawreedoption2 && data.tawreed_type != tawreedoption3) {

          setcan_add_tawreed2(true)

          settawreedtypeValue({
            id: "3",
            value: "أخرى",
            label: "أخرى"
          })

          settawreed_type(data.tawreed_type)
          settawreedtypeValueId(tawreedoption4)

        }

        if (data.tawreed_type == tawreedoption1) {
          settawreedtypeValue({
            id: "0",
            value: "معدات",
            label: "معدات"
          })
          settawreedtypeValueId(tawreedoption1)
        } else if (data.tawreed_type == tawreedoption2) {
          settawreedtypeValue({
            id: "1",
            value: "سيارات",
            label: "سيارات"
          })
          settawreedtypeValueId(tawreedoption2)
        } else if (data.tawreed_type == tawreedoption3) {
          settawreedtypeValue({
            id: "2",
            value: "سلع استهلاكية",
            label: "سلع استهلاكية"
          })
          settawreedtypeValueId(tawreedoption3)



        }




      }



      console.log(data.Note, "data.Note.....................")


      setduration(data.Tenure)
      console.log(data.Start_Date_of_Contract, "date")
      setdate_from(data.Start_Date_of_Contract)
      setdate_to(data.End_Date_of_Contract)


      let Contract_Bills = data.Contract_Bills
      console.log(Contract_Bills, "Contract_Bills00000000000000000")
      if (Contract_Bills != null & Contract_Bills.length > 0) {
        setbillData(Contract_Bills)
        setBillRecExists(true)
        console.log(Contract_Bills, "Contract_BillsContract_BillsContract_BillsContract_BillsContract_Bills")
        //   if(bill_type == "1"){
        //   if(Contract_Bills.length >= 2){

        //       setcan_add_advance(false)
        //       setcan_add_late(false)
        //   } else if (Contract_Bills.length == 1) {
        //       setcan_add_advance(false)
        //       setcan_add_late(true)

        //   } else {
        //     setcan_add_advance(true)
        //     setcan_add_late(false)
        //   }
        // } else{
        //   setcan_add_advance(false)
        //   setcan_add_late(false)
        // }
        console.log(data.bill_type.id, "bill_type***")
        if (data.bill_type.id == "1") {
          setbill_type("Egar")

          if (data.get_Contract_Bills_Advance_Exists == "true") {
            setcan_add_advancebtn(false)
          } else {
            setcan_add_advancebtn(true)
          }

          if (data.get_Contract_Bills_Late_Exists == "true") {
            setcan_add_latebtn(false)
          } else {
            setcan_add_latebtn(true)
          }

          setcan_add_bill(true)

        } else if (data.bill_type.id == "0") {
          setbill_type("bill")
          setcan_add_bill(true)

        }
      }

      console.log(Contract_Bills, "Contract_Bills66666")
      let myfiles = []
      // let my_ids_of_files = ""
      for (var i = 0; i < data.files.length; i++) {
        try {
          console.log(data.files, "fils")
          myfiles.push({ "name": data.files[i].name[1], "size": data.files[0].size, "path": data.files[i].file, "id": data.files[i].id })
          console.log(data.files[i].id.toString(), "man")
          // my_ids_of_files = my_ids_of_files + "," + data.files[i].id.toString()
          // console.log(my_ids_of_files, "mam")
        } catch (e) {

        }
      }
      // console.log("han", my_ids_of_files)
      // console.log(my_ids_of_files.substring(1, my_ids_of_files.length), "ids ids ")
      // setmy_ids_of_files(my_ids_of_files.substring(1, my_ids_of_files.length))
      setold_files(myfiles)

      // backend_files

      console.log(data, "***")
      console.log({
        id: data.Company_name[0].id,
        label: data.Company_name[0].company_name,
        value: data.Company_name[0].company_name

      }, "data company...")
      // setCompanyValue({
      //   id:data.Company_name[0].id,
      //   label:data.Company_name[0].company_name,
      //   value:data.Company_name[0].company_name

      // })

      let company_list = []
      let company_value = ""
      for (var i = 0; i < data.Company_name.length; i++) {
        company_list.push(
          {
            id: data.Company_name[i].id,
            label: data.Company_name[i].company_name,
            value: data.Company_name[i].company_name
          }
        )
        company_value = company_value + "," + data.Company_name[i].id
      }
      setCompanyValue(company_list)
      setCompanyValueId(company_value)
      console.log(company_value, "company value")
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

      setsadad_typeValue({
        id: data.sadad_type.id,
        label: data.sadad_type.label,
        value: data.sadad_type.value
      })


      let city_list = []
      let city_value = ""
      for (var i = 0; i < data.City.length; i++) {
        city_list.push(
          {
            id: data.City[i].id,
            label: data.City[i].city,
            value: data.City[i].city
          }
        )
        city_value = city_value + "," + data.City[i].id
      }
      setcityValue(city_list)
      setcityValueId(city_value)

      setcontract_statusValue({
        id: data.Status_of_cont.id,
        label: data.Status_of_cont.Status_of_cont,
        value: data.Status_of_cont.Status_of_cont
      })

      // setcontract_statusValue({
      //   id:data.Status_of_cont.id,
      //   label:data.Status_of_cont.Status_of_cont,
      //   value:data.Status_of_cont.Status_of_cont
      // })


      setsadad_typeValue({
        id: data.sadad_type.id,
        label: data.sadad_type.value,
        value: data.sadad_type.label
      })




      setCountryValue({
        id: data.Country[0].id,
        label: data.Country[0].name_arabic,
        value: data.Country[0].name_arabic

      })
      setCountryValueId(data.Country[0].id)



      console.log(data, "datadata")


      setrenewValue({
        id: data.renew_type.id,
        label: data.renew_type.label,
        value: data.renew_type.value

      })

      if (data.renew_type.id == "0" || data.renew_type.id == "1") {
        setcan_add_duration(true)
      } else {
        setcan_add_duration(false)

      }


      // print(data.bill_type,"data.bill_type")
      settypeValue({
        id: data.bill_type.id,
        label: data.bill_type.label,
        value: data.bill_type.value

      })
      settypeValueId(data.bill_type.id)


      setnotes(data.Note)
      let contract_obj = data
      console.log(contract_obj, "999")

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



      // setName(data.Dep_Name)
      // setName_dept(data.Dep_Head_Name)
      // setEmail(data.Dep_Head_email)



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


    // document.querySelector("#input1").onchange = evt => {

    //         let imageContainer = document.querySelector('#imageContainer')
    //         console.log(imageContainer,"image conteint")

    //         imageContainer.classList.remove('hiddenFile')
    //         // new
    //         $("#delete1").removeClass("hiddenFile")

    //         document.querySelector(".fileupload1").classList.add('hiddenFile')
    //         document.querySelector(".upload1").classList.add('hiddenFile')


    //         // document.querySelector("#").innerHTML = ""

    //   const [file] = document.querySelector("#input1").files
    //   if (file) {
    //     // imageContainer.src = URL.createObjectURL(file)
    //     const  fileType = file['type'];
    //     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    //     if (validImageTypes.includes(fileType)) {
    //         imageContainer.src = URL.createObjectURL(file)
    //     }
    //     else{
    //         imageContainer.src = "/static/images/fileImage.png"
    //     }
    //   }
    // }

  }


  useLayoutEffect(() => {
    loadOptionsDB_Dept()
    loadOptionsDB_Company()
    loadOptionsDB_Status()
    loadOptionsDB_renew()
    loadOptionsDB_Country()
    // loadOptionsDB_City()
    loadOptionsDB_type()
    loadOptionstawreed_types()
    loadOptionsDB_sadad_type()
  }, [])
  useEffect(() => {

    //   try {

    //     var data = new FormData();    
    //     var config = {
    //       method: 'get',
    //       url: 'http://10.100.10.131:8085/users/?length=10&start=0&draw=100',
    //       headers: { 
    //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzA0NDk2LCJqdGkiOiJjNDhiZDJiYjZkNWU0Mjk3YjI2ZTVmZjhmZjdlZWYyYSIsInVzZXJfaWQiOjF9.T2J_vzEuTa2SUFlS9eoGPWRfOw6cAYbPwOpaOLCjPFg', 
    //       },
    //       data : data
    //     };

    //     axios(config)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data),"hany ... ");
    //     })
    //     .catch(function (error) {
    //       console.log(error,"error000000000000");
    //     });
    //     // params.setLoaderShow(false)
    //     return {

    //         "draw": 100,
    //         "recordsTotal": 2,
    //         "recordsFiltered": 2,
    //         "data": [
    //             {
    //                 "id": 1,
    //                 "username": "Aws.Majed",
    //                 "fullName": null,
    //                 "email": ""
    //             },
    //             {
    //                 "id": 2,
    //                 "username": "Aws_Majed2",
    //                 "fullName": "اوس ماجد سلطان احمد زيد",
    //                 "email": "aoss.zaid123@gmail.com"
    //             }
    //         ]

    //     }
    //     // return { allData: response.data, data: response.data, totalPages: response.recordsTotal, params }
    // } catch(e) {
    //   params.setLoaderShow(false)
    //   console.log(e,"---------")
    // }

    setFilesUpload()
    try {
      const search = window.location.search
      const params = new URLSearchParams(search)
      const companyId = params.get('id')
      setCompany_Id(companyId)
      if (companyId === null || companyId === "") {
        add.current = true
      } else {
        add.current = false
        // send request to get data of car
        setvisible_user_dep(true)
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
    // const contractNumber_input = document.getElementsByName("contractNumber")[0]
    // contractNumber_input.value = contractNumber
  }, [contractNumber])

  useEffect(() => {
    if (can_add_duration) {
      const renewDuration_input = document.getElementsByName("renewDuration")[0]
      renewDuration_input.value = renewDuration
    }
  }, [renewDuration])







  useEffect(() => {
    const duration_input = document.getElementsByName("duration")[0]
    duration_input.value = duration
  }, [duration])

  useEffect(() => {
    const notes_input = document.getElementsByName("notes")[0]
    notes_input.value = notes
  }, [notes])

  useEffect(() => {
    try {
      const tawreed_type_input = document.getElementsByName("tawreed_type")[0]
      tawreed_type_input.value = tawreed_type
    } catch (e) {

    }
  }, [tawreed_type])




  useEffect(() => {
    if (!add['current']) {
      loadOptionsDB_Cities_for_country(countryValue.id)
    }
  }, [countryValue])





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
  if (add['current'] === true) {


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


      renewDuration: yup.string().test({
        name: 'renewDuration',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = renewDuration
          }
          setrenewDuration(value)
          if (value === '' | value === null) {
            //   setrenewDurationValidation(false)
            //   return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!checkNumbersOnly(value)) {
              setrenewDurationValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال المدة بشكل صحيح' })
            }
          }
          setrenewDurationValidation(true)
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


          console.log("change duration")

          HandleTentureChange(value)
          setdurationValidation(true)
          return true
        }
      }),
      company: yup.mixed().test({
        name: 'company',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = companyValue
            if (value.length == 0) {
              setCompanyValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            }
            else if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة' | value.length == 0) {
              setCompanyValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              // try {
              //   if(!companyValueId.includes(value[value.length-1].id)){

              //     setCompanyValueId(companyValueId + "," + value[value.length-1].id)
              //   }
              // } catch (e) {
              //   console.log("1",e)
              // }
            }
          }
          console.log(value, "wooooooooooo1")
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة' | value.length == 0) {
            setCompanyValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              console.log(value[value.length - 1], "awawaw")
              console.log(companyValueId, "company")
              console.log(companyValueId, "cccc")
              //  + "," + "new" + value[value.length-1].id,"........**** ....")
              var xcompanyid = ""
              for (let i = 0; i <= value.length - 1; i++) {
                if (i == 0) {
                  xcompanyid = xcompanyid + "," + value[i].id
                } else {
                  xcompanyid = xcompanyid + "," + value[i].id
                }
              }
              setCompanyValueId(xcompanyid)
              // if (!companyValueId.includes(value[value.length - 1].id)) {
              //   console.log(companyValueId, "exist")
              //   console.log("what")
              //   setCompanyValueId(companyValueId + "," + value[value.length - 1].id)

              // }
            } catch (e) {
              console.log("1", e)
              setCompanyValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            }
          }
          setCompanyValidation(true)
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


      city: yup.mixed().test({
        name: 'city',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value, "city city city")
          if (checkInputUndefined(value)) {

            value = cityValue
            console.log(value, "+666666666")
            if (value.length == 0) {
              setcityValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            }
            else if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              console.log("unfort")
              setcityValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              // try {
              //   console.log(cityValueId + "," + value[value.length-1].id,"*****000")
              //   setcityValueId(cityValueId + "," + value[value.length-1].id)
              // } catch (e) {
              //   console.log("1",e)
              // }
            }
          }
          if (value === '' | value === null) {
            setcityValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              console.log(cityValueId + "," + value[value.length - 1].id, "*****000")
              if (!cityValueId.includes(value[value.length - 1].id)) {
                setcityValueId(cityValueId + "," + value[value.length - 1].id)
              }
              console.log(cityValueId + "," + value[value.length - 1].id, "555city")
            } catch (e) {
              console.log("1", e)
            }
          }
          setcityValidation(true)
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
      tawreed_type: yup.string().test({
        name: 'tawreed_type',
        skipAbsent: true,
        test(value, ctx) {
          if (can_add_tawreed2) {

            if (checkInputUndefined(value)) {
              value = tawreed_type
            }
            settawreed_type(value)
            if (value === null | value === "") {
              settawreed_typeValidation(false)
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            }

          }


          settawreed_typeValidation(true)
          return true
        }
      }),
      country: yup.mixed().test({
        name: 'country',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = countryValue
            console.log(countryValue, "countryValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setCountryValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                setCountryValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            setCountryValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setCountryValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
          setCountryValidation(true)
          if (countryValueId != value.id) {

            loadOptionsDB_Cities_for_country(value.id)
          }

          console.log("country validation true")
          return true
        }
      }),

      renew: yup.mixed().test({
        name: 'renew',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = renewValue
            console.log(renewValue, "renewValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setrenewValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                setrenewValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            setrenewValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setrenewValueId(value.id)
              if (value.id == "2") {
                setcan_add_duration(false)
              }
              else {
                setcan_add_duration(true)

              }
            } catch (e) {
              console.log("1")
            }
          }
          setrenewValidation(true)

          return true
        }
      }),



      type: yup.mixed().test({
        name: 'type',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = typeValue
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              settypeValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                settypeValueId(value.id)
              } catch (e) {
                console.log("1sssssssssssss")
              }
            }
          }


          if (value === '' | value === null) {
            settypeValueId(value)
            settypeValidation(false)
            setcan_add_tawreed(false)
            setcan_add_bill(false)
            setcan_add_advancebtn(false)
            setcan_add_latebtn(false)


            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              settypeValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }


          try {


            if (value.id == "1") {
              setbill_type("Egar")
              setcan_add_bill(true)
              setcan_add_advancebtn(true)
              setcan_add_latebtn(true)
              setcan_add_tawreed(false)


            } else if (value.id == "0") {
              setbill_type("bill")
              setcan_add_bill(true)
              setcan_add_tawreed(false)
              setcan_add_advancebtn(false)
              setcan_add_latebtn(false)


            }
            else {
              setcan_add_tawreed(true)
              setcan_add_bill(false)
              setcan_add_advancebtn(false)
              setcan_add_latebtn(false)

            }
            settypeValueId(value.id)
            settypeValidation(true)
          } catch (e) {
            console.log(e)

          }

          return true
        }
      }),

      tawreedoptions: yup.mixed().test({
        name: 'tawreedoptions',
        skipAbsent: true,
        test(value, ctx) {
          if (can_add_tawreed) {
            if (checkInputUndefined(value)) {
              value = tawreedtypeValue
              if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
                settawreedtypeValidation(false)
                return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
              } else {

                try {
                  console.log(value.value, "value.value tawreed")
                  settawreedtypeValueId(value.value)
                } catch (e) {
                  console.log("1sssssssssssss")
                }
              }
            }


            if (value === '' | value === null) {
              settawreedtypeValueId(value)
              settawreedtypeValidation(false)
              setcan_add_tawreed2(false)



              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
                settawreedtypeValueId(value.value)
              } catch (e) {
                console.log("1")
              }
            }

            try {
              if (value.id == "0") {
                setcan_add_tawreed2(false)
              } else if (value.id == "1") {
                setcan_add_tawreed2(false)
              } else if (value.id == "2") {
                setcan_add_tawreed2(false)
              } else {
                setcan_add_tawreed2(true)
              }
              settawreedtypeValueId(value.value)
              settawreedtypeValidation(true)
            } catch (e) {
              console.log(e)

            }
          }
          return true
        }
      }),

      sadad_type: yup.mixed().test({
        name: 'sadad_type',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = sadad_typeValue
            console.log(sadad_typeValue, "sadad_typeValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setsadad_typeValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                setsadad_typeValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            setsadad_typeValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setsadad_typeValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }




          setsadad_typeValidation(true)



          return true
        }
      }),










    })

  } else {
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


      renewDuration: yup.string().test({
        name: 'renewDuration',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = renewDuration
          }
          setrenewDuration(value)
          // if (value === '' | value === null) {
          //   setrenewDurationValidation(false)
          //   return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          // } else {
          if (!checkNumbersOnly(value)) {
            setrenewDurationValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال المدة بشكل صحيح' })
          }
          // }
          setrenewDurationValidation(true)
          return true
        }
      }),

      // contract_dep_slug: yup.string().test({
      //   name: 'contract_dep_slug',
      //   skipAbsent: true,
      //   test(value, ctx) {
      //     if (checkInputUndefined(value)) {
      //       value = contract_dep_slug
      //     }
      //     setcontract_dep_slug(value)
      //     if (value === '' | value === null) {
      //       setcontract_dep_slugValidation(false)
      //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
      //     } else {
      //       if (checkNumbersOnly(value)) {
      //         setcontract_dep_slugValidation(false)
      //         return ctx.createError({ message: 'الرجاء إدخال إختصار الإدارة بشكل صحيح' })
      //       }
      //     }
      //     setcontract_dep_slugValidation(true)
      //     return true
      //   }
      // }),

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


          setdurationValidation(true)
          return true
        }
      }),
      company: yup.mixed().test({
        name: 'company',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = companyValue
            console.log(value, "+666666666")
            if (value.length == 0) {
              setCompanyValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            }
            else if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة' | value.length == 0) {
              setCompanyValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              // try {
              //   if(!companyValueId.includes(value[value.length-1].id)){

              //     setCompanyValueId(companyValueId + "," + value[value.length-1].id)
              //   }
              // } catch (e) {
              //   console.log("1",e)
              // }
            }
          }
          console.log(value, "wooooooooooo2")
          console.log(value.length == 0, "wotmate")
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة' | value.length == 0) {
            setCompanyValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              console.log(value[value.length - 1], "awawaw")
              console.log(companyValueId, "company")
              console.log(companyValueId, "cccc")

              var xcompanyid = ""
              for (let i = 0; i <= value.length - 1; i++) {
                if (i == 0) {
                  xcompanyid = xcompanyid + "," + value[i].id
                } else {
                  xcompanyid = xcompanyid + "," + value[i].id
                }
              }
              setCompanyValueId(xcompanyid)


              // if (!companyValueId.includes(value[value.length - 1].id)) {
              //   console.log(companyValueId, "exist")
              //   console.log("what")
              //   setCompanyValueId(companyValueId + "," + value[value.length - 1].id)

              // }
            } catch (e) {
              console.log("1", e)
              setCompanyValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            }
          }
          setCompanyValidation(true)
          return true
        }
      }),
      contract_status: yup.mixed().test({
        name: 'contract_status',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = contract_statusValue
            console.log(value, "+666666666")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setcontract_statusValidation(false)
              // return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
                setcontract_statusValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            setcontract_statusValidation(false)
            // return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setcontract_statusValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
          setcontract_statusValidation(true)
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

          console.log(departmentValueId, "----", value.id, "opopopopopoppoppoop")
          // parseInt(departmentValueId) != parseInt(value.id)
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

      city: yup.mixed().test({
        name: 'city',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value, "city city city")
          if (checkInputUndefined(value)) {

            value = cityValue
            console.log(value, "+666666666")
            if (value.length == 0) {
              setcityValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            }
            else if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              console.log("unfort")
              setcityValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              // try {
              //   console.log(cityValueId + "," + value[value.length-1].id,"*****000")
              //   setcityValueId(cityValueId + "," + value[value.length-1].id)
              // } catch (e) {
              //   console.log("1",e)
              // }
            }
          }
          if (value === '' | value === null) {
            setcityValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              console.log(cityValueId + "," + value[value.length - 1].id, "*****000")
              if (!cityValueId.includes(value[value.length - 1].id)) {
                setcityValueId(cityValueId + "," + value[value.length - 1].id)
              }
              console.log(cityValueId + "," + value[value.length - 1].id, "555city")
            } catch (e) {
              console.log("1", e)
            }
          }
          setcityValidation(true)
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
      tawreed_type: yup.string().test({
        name: 'tawreed_type',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = tawreed_type
          }
          settawreed_type(value)
          // if (value === null | value === "") {
          //   settawreed_typeValidation(false)
          //   return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          // }

          settawreed_typeValidation(true)
          return true
        }
      }),
      country: yup.mixed().test({
        name: 'country',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = countryValue
            console.log(countryValue, "countryValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setCountryValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                setCountryValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            setCountryValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setCountryValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
          setCountryValidation(true)
          console.log(countryValueId, value.id, "citycity")
          if (countryValueId != value.id) {

            loadOptionsDB_Cities_for_country(value.id)
          }
          console.log("country validation true")
          return true
        }
      }),
      renew: yup.mixed().test({
        name: 'renew',
        skipAbsent: true,
        test(value, ctx) {
          console.log("renewing ............")
          if (checkInputUndefined(value)) {
            value = renewValue
            console.log(renewValue, "renewValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setrenewValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                setrenewValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            setrenewValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setrenewValueId(value.id)
              setrenewValueId(value.id)
              console.log(value.id, "value.idvalue.idvalue.id")
              if (value.id == "2") {
                setcan_add_duration(false)
              }
              else {
                setcan_add_duration(true)

              }
            } catch (e) {
              console.log("1")
            }
          }
          setrenewValidation(true)

          return true
        }
      }),




      type: yup.mixed().test({
        name: 'type',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = typeValue
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              settypeValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                console.log(value.id, "wopwowpwopwpw")
                settypeValueId(value.id)
              } catch (e) {
                console.log("1sssssssssssss")
              }
            }
          }


          if (value === '' | value === null) {
            settypeValueId(value)
            settypeValidation(false)
            setcan_add_tawreed(false)
            setcan_add_bill(false)
            setcan_add_advancebtn(false)
            setcan_add_latebtn(false)

            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              settypeValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }


          try {


            if (value.id == "1") {
              setbill_type("Egar")
              setcan_add_bill(true)
              setcan_add_advancebtn(true)
              setcan_add_latebtn(true)
              setcan_add_tawreed(false)


            } else if (value.id == "0") {
              setbill_type("bill")
              setcan_add_bill(true)
              setcan_add_tawreed(false)
              setcan_add_advancebtn(false)
              setcan_add_latebtn(false)


            } else if (value.id == "3") {
              settypeValidation(false)
              setcan_add_tawreed(false)
              setcan_add_bill(false)
              setcan_add_advancebtn(false)
              setcan_add_latebtn(false)


            }


            else {
              setcan_add_tawreed(true)
              setcan_add_bill(false)
              setcan_add_advancebtn(false)
              setcan_add_latebtn(false)

            }
            settypeValueId(value.id)
            settypeValidation(true)
          } catch (e) {
            console.log(e)

          }

          return true
        }
      }),

      tawreedoptions: yup.mixed().test({
        name: 'tawreedoptions',
        skipAbsent: true,
        test(value, ctx) {
          if (can_add_tawreed) {
            if (checkInputUndefined(value)) {
              value = tawreedtypeValue
              if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
                settawreedtypeValidation(false)
                return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
              } else {

                try {
                  console.log(value.value, "value.value tawreed")
                  settawreedtypeValueId(value.value)
                } catch (e) {
                  console.log("1sssssssssssss")
                }
              }
            }


            if (value === '' | value === null) {
              settawreedtypeValueId(value)
              settawreedtypeValidation(false)
              setcan_add_tawreed2(false)



              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
                console.log(value.value, "value.value tawreed")
                settawreedtypeValueId(value.value)
              } catch (e) {
                console.log("1")
              }
            }

            try {
              if (value.id == "0") {
                setcan_add_tawreed2(false)
              } else if (value.id == "1") {
                setcan_add_tawreed2(false)
              } else if (value.id == "2") {
                setcan_add_tawreed2(false)
              } else {
                setcan_add_tawreed2(true)
              }
              settawreedtypeValueId(value.value)
              settawreedtypeValidation(true)
            } catch (e) {
              console.log(e)

            }
          }
          return true
        }
      }),

      sadad_type: yup.mixed().test({
        name: 'sadad_type',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = sadad_typeValue
            console.log(sadad_typeValue, "sadad_typeValue....")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              // setsadad_typeValidation(false)
              // return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {

              try {
                setsadad_typeValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
          }
          if (value === '' | value === null) {
            // setsadad_typeValidation(false)
            // return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setsadad_typeValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }




          setsadad_typeValidation(true)



          return true
        }
      }),



    })
  }

  // const saveDataCompany = async () => {
  //   console.log("saving ........ ")
  //   setLoaderShow(true)
  //   const token = localStorage.getItem("token")


  //   const bodyFormData = new FormData()
  //   if (add['current'] === true) {
  //     console.log(cityValueId, "** .. before .. **")


  //     let cityValueId_backend = ""
  //     if (cityValueId.at(0) == ",") {
  //       // cityValueId = cityValueId.slice(0,-1)
  //       cityValueId_backend = cityValueId.substring(1, cityValueId.length)

  //     }
  //     let companyValueId_backend = ""
  //     if (companyValueId.at(0) == ",") {
  //       // cityValueId = cityValueId.slice(0,-1)
  //       companyValueId_backend = companyValueId.substring(1, companyValueId.length)
  //     }
  //     console.log(cityValueId_backend, "**awes**")
  //     console.log(companyValueId_backend, "---awes-")

  //     console.log(cityValueId, "****")

  //     bodyFormData.append('Tenure', duration)
  //     console.log(contractNumber, "-*-*con")
  //     bodyFormData.append('Contract_Name', name)
  //     bodyFormData.append('Contract_Number', contractNumber)
  //     bodyFormData.append('renewDuration', renewDuration)





  //     bodyFormData.append('Company_name', companyValueId_backend)
  //     bodyFormData.append('Status_of_cont', contract_statusValueId)
  //     bodyFormData.append('sadad_type', sadad_typeValueId)

  //     bodyFormData.append('Department', departmentValueId)
  //     bodyFormData.append('departmentValue', departmentValue.value)
  //     bodyFormData.append('City', cityValueId_backend)
  //     bodyFormData.append('Note', notes)
  //     bodyFormData.append('Start_Date_of_Contract', date_from)
  //     bodyFormData.append('End_Date_of_Contract', date_to)
  //     bodyFormData.append('Country', countryValueId)
  //     bodyFormData.append('renew', renewValueId)
  //     bodyFormData.append('type', typeValueId)
  //     bodyFormData.append('tawreed_type', tawreed_type)

  //     bodyFormData.append('billData', JSON.stringify(billData))
  //     console.log(JSON.stringify(billData), "billData................")



  //     // bodyFormData.append('End_Date_of_Contract', date_to)

  //     for (var i = 0; i < backend_files.length; i++) {
  //       bodyFormData.append('files_of_this', backend_files[i]);

  //     }





  //     // 
  //     // 



  //   } else {



  //     console.log(billData, "save billData")
  //     let cityValueId_backend = ""
  //     if (cityValueId.at(0) == ",") {
  //       // cityValueId = cityValueId.slice(0,-1)
  //       cityValueId_backend = cityValueId.substring(1, cityValueId.length)

  //     }
  //     let companyValueId_backend = ""
  //     console.log(companyValueId, "333")
  //     if (companyValueId.at(0) == ",") {
  //       // cityValueId = cityValueId.slice(0,-1)
  //       companyValueId_backend = companyValueId.substring(1, companyValueId.length)
  //     }

  //     console.log(companyValueId_backend, "awas")
  //     console.log(cityValueId_backend, "**awes**")

  //     bodyFormData.append('Tenure', duration)
  //     console.log(contractNumber, "-*-*con")
  //     bodyFormData.append('Contract_Name', name)
  //     bodyFormData.append('Contract_Number', contractNumber)
  //     bodyFormData.append('renewDuration', renewDuration)
  //     bodyFormData.append('tawreed_type', tawreed_type)
  //     // bodyFormData.append('contract_dep_slug', contract_dep_slug)


  //     bodyFormData.append('Company_name', companyValueId_backend)
  //     bodyFormData.append('Status_of_cont', contract_statusValueId)
  //     bodyFormData.append('sadad_type', sadad_typeValueId)


  //     bodyFormData.append('Department', departmentValueId)
  //     bodyFormData.append('City', cityValueId_backend)
  //     bodyFormData.append('Note', notes)
  //     bodyFormData.append('Start_Date_of_Contract', date_from)
  //     bodyFormData.append('End_Date_of_Contract', date_to)
  //     bodyFormData.append('Country', countryValueId)
  //     bodyFormData.append('renew', renewValueId)
  //     bodyFormData.append('type', typeValueId)
  //     bodyFormData.append('billData', JSON.stringify(billData))

  //     console.log('billData', JSON.stringify(billData))



      
  //     // if (my_ids_of_files == "") {
  //     //   bodyFormData.append("new_files_ids", ",")

  //     // } else {
  //     //   bodyFormData.append("new_files_ids", my_ids_of_files)

  //     // }
  //     bodyFormData.append("new_files_ids", my_ids_of_files)

  //     // mmm

  //     for (var i = 0; i < backend_files.length; i++) {
  //       bodyFormData.append('files_of_this', backend_files[i]);

  //     }


  //     bodyFormData.append('contract_id', company_Id)




  //   }




  //   // console.log(duration,"duration")
  //   // console.log(name,"name")
  //   // console.log( contractNumber)
  //   // console.log( companyValueId)
  //   // console.log( contract_statusValueId)
  //   // console.log( departmentValueId)
  //   // console.log( cityValueId)
  //   // console.log( notes)
  //   // console.log( date_from)
  //   // console.log( date_to)

  //   // console.log(bodyFormData.data,"awes request")

  //   console.log(bodyFormData, "body form")


  //   try {
  //     if (add['current'] === true) {
  //       if (backend_files.length == 0) {
  //         seterrorFile("إرفاق المستندات مطلوبة")
  //         setLoaderShow(false)
  //         return
  //       } else {
  //         seterrorFile("")

  //       }
  //       console.log("posting ...................")

  //       axios({
  //         method: "post",
  //         url: `${domain_url}/Contract/AddContracts/`,
  //         data: bodyFormData,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         }
  //       })
  //         .then(function (response) {
  //           console.log(response, "contract..", response.data[0]["succse"], response.data[0]["succse "])

  //           if (response.data[0]["succse"] === 0) {
  //             console.log("not 2000")
  //             setTypeAlert("Fail")
  //             setTitleAlert(`${response.data[0]["message"]}`)

  //             setHeadAlert(" حدث خطأ ")
  //             setShowAlert(true)
  //             setLoaderShow(false)
  //           }



  //           else {
  //             setTypeAlert("Success")
  //             setTitleAlert(`${response.data[0]["message"]}`)
  //             setHeadAlert("  ")
  //             setShowAlert(true)
  //             if (add['current'] === true) {
  //               navigate('/contracts?success=added')
  //             } else {
  //               navigate('/contracts?success=edited')

  //             }
  //           }

  //         })
  //         .catch(function (response) {
  //           console.log(response, "error")
  //           setTypeAlert("Fail")
  //           setTitleAlert(`${response.message}`)
  //           setHeadAlert("حدث خطأ")
  //           setShowAlert(true)
  //           setLoaderShow(false)
  //         })


  //     } else {
  //       axios({
  //         method: "put",
  //         url: `${domain_url}/Contract/AddContracts/?id=${company_Id}`,
  //         data: bodyFormData,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         }
  //       })
  //         .then(function (response) {
  //           console.log(response, "eeee")
  //           console.log(response.data, "777")
  //           console.log(response, "***9")
  //           // console.log(response.data.message[0]["succse"],"999")
  //           if (response.data.message[0]["succse"] === 0) {
  //             console.log("not 2000")
  //             setTypeAlert("Fail")
  //             setTitleAlert(`${response.data["message"][0]["message"]}`)

  //             setHeadAlert("حدث خطأ،")
  //             setShowAlert(true)
  //             setLoaderShow(false)
  //           }

  //           else {
  //             setTypeAlert("Success")
  //             setTitleAlert("تم إضافة الشركة بنجاح.")
  //             setHeadAlert("")
  //             setShowAlert(true)
  //             if (add['current'] === true) {
  //               navigate('/contracts?success=added')
  //             } else {
  //               navigate('/contracts?success=edited')

  //             }
  //           }

  //         })
  //         .catch(function (response) {
  //           console.log(response, "awaw")
  //           setTypeAlert("Fail")
  //           setTitleAlert(`${response.message}`)
  //           setHeadAlert("حدث خطأ")
  //           setShowAlert(true)
  //           setLoaderShow(false)
  //         })


  //     }

  //   } catch (e) {
  //     console.log(e)
  //     setTypeAlert("Fail")
  //     setTitleAlert("لم يتم إضافة الشركة بشكل صحيح.")
  //     setHeadAlert("حدث خطأ")
  //     setShowAlert(true)
  //     setLoaderShow(false)
  //   }
  // }

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
      bodyFormData.append('tawreed_type', can_add_tawreed2 ? tawreed_type : tawreedtypeValueId)

      bodyFormData.append('billData', JSON.stringify(billData))
      console.log(JSON.stringify(billData), "billData................")



      // bodyFormData.append('End_Date_of_Contract', date_to)

      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }





      // 
      // 



    } else {

      console.log("this is edit")
      console.log(contract_statusValueId, "contract_statusValueId")

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
      // bodyFormData.append('tawreed_type', tawreed_type)
      bodyFormData.append('tawreed_type', can_add_tawreed2 ? tawreed_type : tawreedtypeValueId)
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
      // if (my_ids_of_files == "") {
      //   bodyFormData.append("new_files_ids", ",")

      // } else {
      //   bodyFormData.append("new_files_ids", my_ids_of_files)

      // }
      bodyFormData.append("new_files_ids", my_ids_of_files)

      // mmm

      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }


      bodyFormData.append('contract_id', company_Id)




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
          url: `${domain_url}/Contract/AddContracts/`,
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
                navigate('/contracts?success=added')
              } else {
                navigate('/contracts?success=edited')

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
          url: `${domain_url}/Contract/AddContracts/?id=${company_Id}`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response, "eeee")
            console.log(response.data, "777")
            // console.log(response.data.message[0]["succse"], "***9")
            console.log(response.data.message[0]["succse"], "***9")

            if (response.data.message[0]["succse"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data["message"][0]["message"]}`)

              setHeadAlert(" حدث خطأ، ")
              setShowAlert(true)
              setLoaderShow(false)
            }

            else {
              setTypeAlert("Success")
              setTitleAlert("تم إضافة الشركة بنجاح.")
              setHeadAlert("")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/contracts?success=added')
              } else {
                navigate('/contracts?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response, "awaw")
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

  const loadOptionsDB_Status = async () => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (contract_statusData.length > 0) {
      return contract_statusData
    } else {
      const data = await axios.get(`${domain_url}/Contract/status_list`, config).then(res => {
        console.log(res.data.city, "jaja")
        const company_list = []
        const result = res.data.status

        result.forEach((item, index, array) => {
          // console.log(item['id'], item['Status_of_cont'], "iteid")
          // if(item['id'] != "2"){
          // if (item['id'] != "2" && item['id'] != "3") {
          //   company_list.push(
          //     {
          //       id: item['id'],
          //       value: item['Status_of_cont'],
          //       label: item['Status_of_cont']
          //     }
          //   )
          // }
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
      console.log("data .", data)
      setcontract_statusData(data)
      return data
    }
  }


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
      console.log("data .", data)
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

  const loadOptionstawreed_types = async () => {
    console.log("again loading ... type")
    const token = localStorage.getItem("token")


    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    console.log(typeValueId, typeData, "typeData.......")

    if (typeData.length > 0) {
      return typeData
    } else {
      const company_activity_list2 = []

      company_activity_list2.push(
        {
          id: "0",
          value: "معدات",
          label: "معدات"
        }
      )
      company_activity_list2.push(
        {
          id: "1",
          value: "سيارات",
          label: "سيارات"
        }
      )
      company_activity_list2.push(
        {
          id: "2",
          value: "سلع استهلاكية",
          label: "سلع استهلاكية"
        }
      )

      company_activity_list2.push(
        {
          id: "3",
          value: "أخرى",
          label: "أخرى"
        }
      )





      settawreedtypeData(company_activity_list2)
      return company_activity_list2
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
              value: item['id'],
              label: item['city_arabic']
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


  const SelectWithValidation1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB, isDisabled = false }) => {

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
              isDisabled={isDisabled}
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



  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    // console.log("submit")

    // if (add['current']) {
    //   if ((nameValidation & durationValidation & renewDurationValidation & companyValidation & departmentValidation & user_dep_Validation & cityValidation & notesValidation & !date_fromValidation & !date_toValidation & countryValidation)) {
    //     console.log("submir")
    //     saveDataCompany()
    //   }
    // }
    // else {
    //   if ((nameValidation & renewDurationValidation & durationValidation & companyValidation & departmentValidation & user_dep_Validation  & cityValidation & notesValidation & !date_fromValidation & !date_toValidation & countryValidation)) {
    //     saveDataCompany()
    //   }
    // }

    console.log("submit")

    if (add['current']) {
      if ((nameValidation & durationValidation & renewDurationValidation & companyValidation & departmentValidation & user_dep_Validation & cityValidation & notesValidation & !date_fromValidation & !date_toValidation & countryValidation)) {
        console.log("boom")
        saveDataCompanynew()
      }
    }
    else {
      if ((nameValidation & renewDurationValidation & durationValidation & companyValidation & departmentValidation & user_dep_Validation & cityValidation & notesValidation & !date_fromValidation & !date_toValidation & countryValidation)) {
        saveDataCompanynew()
      }
    }
  }





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


    let date_from_input = document.getElementsByName("date_from")[0]
    let date_to_input = document.getElementsByName("date_to")[0]

    var date_from = new Date(date_from);
    var date_to = new Date(date_to);

    var Difference_In_Time = date_to.getTime() - date_from.getTime();
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24))
    console.log(Difference_In_Days == NaN, "dedeeeeeeeeeee")

    if (!isNaN(Difference_In_Days)) {
      setduration(Difference_In_Days)
    }
    // setduration(Difference_In_Days)


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

    console.log(isNaN(Difference_In_Days), "nnonnononon")


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
  }

  // function handleDeleteFile(name, e, id = '') {
  //   console.log("clicked ..", id)
  //   if (id != '') {
  //     console.log("not here")
  //     let newupdateFiles = []
  //     let backend_updateFiles = []

  //     setfiles([])
  //     setbackend_files([])

  //     let i = 0
  //     console.log(old_files, "123", old_files.length)
  //     for (i; i < old_files.length; i++) {
  //       console.log(old_files[i]['name'], name, "updated")
  //       console.log(old_files[i]['name'], "name")

  //       if (old_files[i]['name'] != name) {
  //         newupdateFiles = [
  //           ...newupdateFiles,
  //           {

  //             "name": old_files[i].name,
  //             "size": "200",
  //             "path": old_files[i].file,
  //             "id": old_files[i].id
  //             // "fileObj": old_files[i].fileObj

  //           }
  //         ];

  //         backend_updateFiles = [
  //           // copy the current users state
  //           ...backend_updateFiles,
  //           // files[i].fileObj
  //         ];

  //       }
  //     }
  //     console.log("updated", newupdateFiles)
  //     console.log(newupdateFiles, ",-----new updated--------")
  //     console.log(backend_updateFiles, "backfies")

  //     setold_files(newupdateFiles)
  //     // setbackend_files(backend_updateFiles)
  //     console.log(my_ids_of_files, "gog go")
  //     try {
  //       console.log(my_ids_of_files.split(",").length, "arar2")
  //       if (my_ids_of_files.split(",").length > 1) {
  //         if (my_ids_of_files.split(",").length > 1) {
  //           let new_id = my_ids_of_files.replace("," + id.toString(), "")
  //         } else {
  //           let new_id = my_ids_of_files.replace(id.toString(), "")

  //         }
  //         setmy_ids_of_files(new_id)
  //         console.log(new_id, "gog go2")


  //       } else {
  //         console.log("leng")
  //         let new_id = my_ids_of_files.replace(id.toString(), "")
  //         setmy_ids_of_files(new_id)
  //         console.log(new_id, "gog go else")

  //       }
  //     } catch (e) {
  //       console.log("leng")

  //       let new_id = my_ids_of_files.replace(id.toString(), "")
  //       setmy_ids_of_files(new_id)
  //       console.log(new_id, "gog go")


  //     }

  //   }
  //   else {
  //     let newupdateFiles = []
  //     let backend_updateFiles = []

  //     setfiles([])
  //     setbackend_files([])

  //     let i = 0
  //     console.log(files, "...", files.length)
  //     for (i; i < files.length; i++) {
  //       console.log(files[i]['name'], name, "updated")

  //       if (files[i]['name'] != name) {
  //         newupdateFiles = [
  //           ...newupdateFiles,
  //           {

  //             "name": files[i].name,
  //             "size": files[i].size,
  //             "fileObj": files[i].fileObj

  //           }
  //         ];

  //         backend_updateFiles = [
  //           // copy the current users state
  //           ...backend_updateFiles,
  //           files[i].fileObj
  //         ];

  //       }
  //     }
  //     console.log("updated", newupdateFiles)
  //     console.log(newupdateFiles, ",-----new updated--------")
  //     console.log(backend_updateFiles, "backfies")

  //     setfiles(newupdateFiles)
  //     setbackend_files(backend_updateFiles)
  //   }



  // }

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

      console.log(my_ids_of_files, "ya awes ids")

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

      console.log(combinedArray)
      setbackend_files(combinedArray)
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
                <a href="/contracts">
                  <span className='ps-md-3 headerContractObj'> العقود</span>
                </a>
                <span className='ps-md-3'><ArrowIcon /></span>
              </>

              {(add['current']) ?
                <span className='px-md-3 headerContractObj headerContractObjColored p-2 '> إضافة عقد</span>
                :
                <span className='px-md-3 headerContractObj headerContractObjColored p-2 '> تعديل العقد</span>
              }
            </div>
            <div className='col-md-1'></div>



            {/* <div className='col-md-2'>
    <Button.Ripple onClick={() => BillData()} target='_blank' outline className="btn button1 px-5 py-2" >
                <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >إضافة فاتورة</span>
                <Plus className="ps-5" />
    </Button.Ripple>

    </div> */}

          </div>
          {/* contractNumber */}
          <div className='d-md-flex justify-content-between'>
            {(add['current']) ? <div className='addPageHeader pt-4 ps-0 ms-0'>إضافة عقد</div> : <div className='addPageHeader pt-4 ps-0 ms-0'>تعديل العقد</div>}
            {!(add['current']) && (
              <div className='color-5F605F f-s-20px f-w-700 pt-4 mt-2 pe-4 ms-0'>
                عقد رقم :
                {contractNumber}</div>
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
                      <SelectWithValidation1 defaultValue={user_dep_Value} id_name='user_department' title='اسم المسئول' control={control} errors_check={errors.user_department} loadOptionsDB={user_dep_Data} />
                    </Col>
                  </>
                  :
                  <>

                  </>

                }



                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1MultiChoices1 defaultValue={companyValue} id_name='company' title='الشركة' control={control} errors_check={errors.company} loadOptionsDB={companyData} />
                  {/* <SelectWithValidation1MultiChoices1 defaultValue={cityValue} id_name='city' title='المدينة' control={control} errors_check={errors.city} loadOptionsDB={loadOptionsDB_City} /> */}

                </Col>


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
                        {add['current'] ? (
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
                        ) : (
                          <DatePicker
                            name="date_from"
                            id="date_from"
                            value={date_from || value}
                            invalid={date_fromValidation && true}
                            className='form-control'

                            disabled="true"
                            onChange={(date) => {
                              // onChange(date?.isValid ? date : "");
                              handleChangeDateFrom(date)
                            }}
                            format={language === "en" ? "YYYY-MM-DD" : "YYYY-MM-DD"}
                          />
                        )
                        }

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
                {/* {!add['current']?( */}
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
                        {add['current'] ? (
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
                        ) : (
                          <DatePicker
                            name="date_to"
                            id="date_to"
                            value={date_to || value}
                            invalid={date_toValidation && true}
                            className='form-control'
                            disabled="true"
                            onChange={(date) => {
                              // onChange(date?.isValid ? date : "");
                              handleChangeDateTo(date)
                            }}
                            format={language === "en" ? "YYYY-MM-DD" : "YYYY-MM-DD"}
                          />
                        )}
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
                  {add['current'] ? (
                    <Controller
                      id='duration'
                      name='duration'
                      value={`${duration}`}
                      onChange={(e) => HandleTentureChange(e.target.value)}
                      control={control}
                      render={({ field }) => <Input {...field} placeholder='أدخل فترة العقد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} disabled invalid={errors.duration && true} />}
                    />
                  ) : (
                    <Controller
                      id='duration'
                      name='duration'

                      value={`${duration}`}
                      onChange={(e) => setduration(e.target.value)}

                      control={control}
                      render={({ field }) => <Input  {...field} placeholder='أدخل فترة العقد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} disabled invalid={errors.duration && true} />}
                    />
                  )}
                  {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}

                </Col>
                {/* <Col sm='4' className='mb-4 form-group bmd-form-group'>

              <Select
              isMulti
              // cacheOptions
              defaultOptions  = {contract_statusValue}
              loadOptions={loadOptionsDB_City}
              />
              </Col> */}
                {add['current'] === false && (
                  <Col sm='4' className='mb-4 form-group bmd-form-group'>
                    <SelectWithValidation1 defaultValue={contract_statusValue} id_name='contract_status' title='حالة العقد' isDisabled={true} control={control} errors_check={errors.contract_status} loadOptionsDB={contract_statusData} />
                  </Col>
                )}

                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={renewValue} id_name='renew' title='نوع التجديد' control={control} errors_check={errors.renew} loadOptionsDB={renewData} change="renew" />
                </Col>



                {can_add_duration && (
                  <Col sm='4' className='mb-4 form-group bmd-form-group'>
                    <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='contractNumber'>
                      مدة  الإنذار
                    </Label>
                    <Controller
                      id='renewDuration'
                      name='renewDuration'
                      value={`${renewDuration}`}
                      onChange={(e) => setrenewDuration(e.target.value)}
                      control={control}
                      render={({ field }) => <Input  {...field} placeholder='مدة  الإنذار' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.renewDuration && true} />}
                    />
                    {/* placeholder='أدخل رقم العقد (ABC-Aa-123) */}
                    {errors.renewDuration && <FormFeedback>{errors.renewDuration.message}</FormFeedback>}

                  </Col>
                )}


                {/* <Col sm='4' className='mb-4 form-group bmd-form-group'>
                <SelectWithValidation1 defaultValue={cityValue} id_name='city' title='الدينة' control={control} errors_check={errors.city} loadOptionsDB={loadOptionsDB_City} />
              </Col> */}
                {/* {add['current'] === false && (
               <Col sm='4' className='mb-4 form-group bmd-form-group'>
              </Col>
               )} */}
                <Row className='p-0 m-0'>

                  <Col sm='4' className='mb-4 form-group bmd-form-group'>
                    <SelectWithValidation1 defaultValue={countryValue} id_name='country' title='الدولة' control={control} errors_check={errors.country} loadOptionsDB={CountryData} change="Country" />
                  </Col>

                  <Col sm='4' className='mb-4 form-group bmd-form-group'>
                    {/* loadOptionsDB={cityData} */}
                    <SelectWithValidation1MultiChoices1 defaultValue={cityValue} id_name='city' title='المدينة' control={control} errors_check={errors.city} loadOptionsDB={cityData} />
                  </Col>
                </Row>
                <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={typeValue} id_name='type' title='نوع العقد' control={control} errors_check={errors.type} loadOptionsDB={typeData} change="type" />
                </Col>



                {can_add_tawreed && (
                  <>
                    <Col sm='4' className='mb-4 form-group bmd-form-group'>
                      <SelectWithValidation1 defaultValue={tawreedtypeValue} id_name='tawreedoptions' title='أنواع التوريد' control={control} errors_check={errors.tawreedoptions} loadOptionsDB={tawreedtypeData} />
                    </Col>



                    {can_add_tawreed2 &&

                      <Col sm='12' className='mb-4 form-group bmd-form-group'>
                        <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='tawreed_type'>
                          نوع التوريد
                        </Label>

                        <Controller
                          id='tawreed_type'
                          name='tawreed_type'
                          value={`${tawreed_type}`}
                          onChange={(e) => settawreed_type(e.target.value)}
                          control={control}
                          render={({ field }) => <Input {...field} placeholder='أدخل نوع التوريد' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.tawreed_type && true} />}
                        />
                        {errors.tawreed_type && <FormFeedback>{errors.tawreed_type.message}</FormFeedback>}

                      </Col>

                    }


                  </>
                )}


                {/* <Col sm='4' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='signup_date'>
                    تاريخ توقيع الاتفاقية
                  </Label>
                  <Controller
                    control={control}
                    name="signup_date"
                    className="h-60 f-s-12px f-w-700 bg-F7FAF7 controller-date"
                    rules={{ required: true }} //optional
                    render={({
                      field: { onChange, name, value },
                      formState: { errors },

                    }) => (
                      <>
                        <div>
                        </div>
                        {add['current'] ? (
                          <DatePicker
                            name="signup_date"
                            id="signup_date"
                            value={signup_date || value}
                            invalid={signup_dateValidation && true}
                            className='form-control'
                            onChange={(date) => {
                              // onChange(date?.isValid ? date : "");
                              handleChangeSignupDate(date)
                            }}
                            format={language === "en" ? "YYYY-MM-DD" : "YYYY-MM-DD"}
                          />
                        ) : (
                          <DatePicker
                            name="signup_date"
                            id="signup_date"
                            value={signup_date || value}
                            invalid={signup_dateValidation && true}
                            className='form-control'
                            disabled="true"
                            onChange={(date) => {
                              // onChange(date?.isValid ? date : "");
                              handleChangeSignupDate(date)
                            }}
                            format={language === "en" ? "YYYY-MM-DD" : "YYYY-MM-DD"}
                          />
                        )}
                        {signup_dateValidation && (
                          <div>

                            <div className='invalid-feedback-dates'>الرجاء إدخال التاريخ بشكل صحيح</div>

                          </div>
                        )

                        }
                      </>
                    )}
                  />

                </Col> */}



                <Col sm='4' className='mb-4 form-group bmd-form-group'>


                  <SelectWithValidation1 defaultValue={sadad_typeValue} id_name='sadad_type' title='نوع السداد' control={control} errors_check={errors.sadad_type} loadOptionsDB={sadad_typeData} />
                </Col>


                <Row className='p-0 m-0'>
                  {can_add_bill && (


                    <Col sm='6' className='mb-4 form-group bmd-form-group'>
                      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F mt-4' for='contractNumber'>

                      </Label>

                      <Button.Ripple onClick={() => BillData("")} target='_blank' outline className="btn ms-2 button1 px-5 py-2" >

                        <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >إضافة دفعة</span>
                        <Plus className="ps-5" />
                      </Button.Ripple>
                      {can_add_advancebtn && (
                        <Button.Ripple onClick={() => BillDataForAdvance("advance")} target='_blank' outline className="btn btn ms-2  button1 px-5 py-2" >

                          <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >إضافة دفعة مقدمة

                          </span>
                          <Plus className="ps-5" />
                        </Button.Ripple>
                      )}
                      {can_add_latebtn && (

                        <Button.Ripple onClick={() => BillDataForLate("late")} target='_blank' outline className="btn btn ms-2  button1 px-5 py-2" >

                          <span className='color-5F605F f-s-14px font-cairo f-w-700 pe-2' >إضافة دفعة مؤخرة</span>
                          <Plus className="ps-5" />
                        </Button.Ripple>
                      )}
                    </Col>
                  )}

                </Row>





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


            <div className=" mt-3 ">
              {oldRecordsExists && (
                <>
                  <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>سجل التمديدات السابقة</div>
                  <div className=' row mt-4 mb-4 p-md-3 table-wrapper'>
                    <table class="table">
                      <thead className='background-F7FAF7 thead-details py-3'>
                        <tr className='background-F7FAF7 thead-details py-3'>
                          <th scope="col">#</th>
                          <th scope="col">تاريخ نهاية العقد السابق</th>
                          <th scope="col">تاريخ نهاية العقد الممتد</th>
                          <th scope="col">تاريخ التمديد</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oldRecords.map(function (object, i) {
                          return (


                            <tr className='py-3'>
                              <th scope="row">{i + 1}</th>
                              <td>{object.old_date}</td>
                              <td>{object.new_date}</td>
                              <td>{object.extend_date}</td>
                            </tr>

                          );
                        })}

                      </tbody>
                    </table>


                  </div>
                </>
              )}
            </div>

            <div className=" mt-3 ">
              {billRecExists && (
                <>
                  <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>الفواتير</div>
                  <div className=' row mt-4 mb-4 p-md-3 table-wrapper'>
                    <table class="table">
                      <thead className='background-F7FAF7 thead-details py-3'>
                        <tr className='background-F7FAF7 thead-details py-3'>
                          <th scope="col">#</th>
                          <th scope="col"></th>

                          <th scope="col">المبلغ</th>
                          <th scope="col">القيمة المضافة</th>
                          <th scope="col"> تاريخ الإستحقاق</th>
                          <th scope="col"> مدة السداد</th>
                          <th scope="col"> تم الدفع</th>

                        </tr>
                      </thead>
                      <tbody>
                        {billData.map(function (object, i) {


                          return (


                            <tr className='py-3'>
                              <th scope="row">{i + 1}</th>
                              <th scope="">{object.payment_type == "0" && "الدفعة المقدمة"}
                                {object.payment_type == "1" && "الدفعة الأخيرة"}</th>
                              <td>{object.amount}</td>
                              <td>{object.added_value}</td>
                              <td>{object.due_date}</td>
                              <td>{object.due_duration} شهر

                              </td>
                              <td>
                                <div className='text-start'>
                                  <label class="switch">
                                    <input type="checkbox" defaultChecked={object.paid == "1"} id={`${i}_check`} onChange={e => handleChangeCheck(e)} />
                                    <span class="slider round"></span>
                                  </label>
                                </div>
                              </td>

                            </tr>

                          );
                        })}

                      </tbody>
                    </table>


                  </div>
                </>
              )}
            </div>



            <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
              <Col md='6' className='mb-2'>

                {/* onClick={handleClickSave} */}
                {
                  add['current'] === true ? (
                    <Button onClick={handleClickSave} className={(nameValidation & renewDurationValidation & durationValidation & companyValidation & departmentValidation & cityValidation & notesValidation & !date_fromValidation & !date_toValidation & !date_toValidation & countryValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

                  ) : (
                    <Button onClick={handleClickSave} className={(nameValidation & renewDurationValidation & durationValidation & companyValidation & departmentValidation & cityValidation & notesValidation & !date_fromValidation & !date_toValidation & countryValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

                  )
                }

              </Col>
              <Col md='6' className='mb-2'>
                <Button href="/contracts" className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
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
