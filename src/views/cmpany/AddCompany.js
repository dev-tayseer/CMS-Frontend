// ** React Imports
import React, { Fragment, useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"

import UploadElementDataV2 from "../components/documents/UploadElementDataV2"
import HomeHeader from "../components/home/HomeHeader"
import logo from "@src/assets/images/logo/logo.png";
import Loader from '../components/loader'





import AlertElement from "../components/AlertElement"
import toast from 'react-hot-toast'
import { useForm, Controller, set } from 'react-hook-form'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'

import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { selectThemeColors } from '@utils'
import * as yup from 'yup'
import $ from 'jquery'

import AsyncSelect from 'react-select/async'
import Select from 'react-select'


// {/* car header component  */}
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import Arrows from "@src/assets/images/svg/Arrows.svg"
// {/* end car header component  */}
// {/* car details row component */}
import arrowDetails from "@src/assets/images/svg/arrowDetails.svg"
import { constrainPoint, isValidDate } from '@fullcalendar/core'
import { yupResolver } from '@hookform/resolvers/yup'
import FormStrap from 'react-bootstrap/Form'
import { Fileupload, FileCorrect, DeleteFile } from '../components/icons/all_icons'

import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


const main_url = themeConfig.main_url

// {/* end car details row component */}

const AddCar = () => {

  // const IsLoadingCities = useRef(false)
  const add = useRef(true)
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
  const [showAlert, setShowAlert] = useState(false)

  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")


  const [nameValidation, setNameValidation] = useState(false)
  const [CRNValidation, setCRNValidation] = useState(false)
  const [unifedNumberValidation, setunifedNumberValidation] = useState(false)
  const [phone_numberValidation, setPhone_numberValidation] = useState(false)


  const [emailValidation, setEmailValidation] = useState(false)
  const [finance_personValidation, setfinance_personValidation] = useState(false)
  const [finance_person_numberValidation, setfinance_person_numberValidation] = useState(false)

  const [finance_managerValidation, setfinance_managerValidation] = useState(false)
  const [finance_manager_numberValidation, setfinance_manager_numberValidation] = useState(false)

  const [identity_numberValidation, setidentity_numberValidation] = useState(false)
  const [comp_activValidation, setcomp_activValidation] = useState(false)

  // const [comp_activValidation, setcomp_activValidation] = useState(false)
  const [identity_nameValidation, setidentity_nameValidation] = useState(false)




  const [name, setName] = useState("")
  const [CRN, setCRN] = useState("")
  const [unifedNumber, setunifedNumber] = useState("")
  const [phone_number, setPhone_number] = useState("")



  const [email, setEmail] = useState("")
  const [finance_person, setfinance_person] = useState("")
  const [finance_person_number, setfinance_person_number] = useState("")

  const [finance_manager, setfinance_manager] = useState("")
  const [finance_manager_number, setfinance_manager_number] = useState("")


  const [identity_number, setidentity_number] = useState("")

  const [comp_activ, setcomp_activ] = useState("")
  const [identity_name, setidentity_name] = useState("")


  const [companyValidation, setCompanyValidation] = useState(false)
  const [companyValueId, setCompanyValueId] = useState("")
  const [companyData, setCompanyData] = useState([])




  const [companyValue, setCompanyValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })


  const [countryValidation, setCountryValidation] = useState(false)
  const [countryValueId, setCountryValueId] = useState("")


  const [countryValue, setCountryValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [CountryData, setCountryData] = useState([])




  // start 


  const [company_activityValidation, setcompany_activityValidation] = useState(false)
  const [company_activityValueId, setcompany_activityValueId] = useState("")


  const [company_activityValue, setcompany_activityValue] = useState({
    id: 0,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })

  const [company_activityData, setcompany_activityData] = useState([])




  // end 


  const [files, setfiles] = useState([])
  const [backend_files, setbackend_files] = useState([])
  const [old_files, setold_files] = useState([])
  const [my_ids_of_files, setmy_ids_of_files] = useState([])


  const [roleError, setRoleError] = useState("")
  const [role, setRole] = useState("2")



  const navigate = useNavigate()
  const [company_Id, setCompany_Id] = useState("")

  let valueIdOfCountry = ""

  // Document








  //////////////////////////////////////////////
  const ref = useRef("")
  const getCompanyById = async (company_id) => {
    const token = localStorage.getItem("token")
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzE0MDcxLCJqdGkiOiIzZjYyNjAxMTE1NmI0YjkyOTkyNjNhNTVhZDRjMWQ1MSIsInVzZXJfaWQiOjF9.zEaSBXTFHlOs_J0-WuEPUlbNB03PtMUU4mdqpwgImpE"
    setLoaderShow(true)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const result = await axios.get(`${domain_url}/Company/AddCompany/?id=${company_id}`, config)
      console.log(result, "edit ..... ")
      if (result.status === 200) {
        const data = result.data[0]
        setName(data.Company_Name)
        setCRN(data.CR_Number)
        setEmail(data.Email)
        setfinance_person(data.finance_person)
        setfinance_person_number(data.finance_person_number)
        setfinance_manager(data.finance_manager)
        setfinance_manager_number(data.finance_manager_number)

        setidentity_number(data.identity_number)
        setcomp_activ(data.comp_activ)


        setidentity_name(data.identity_name)

        console.log(data.company_type, "data.company_type")
        if (data.company_type == "1") {
          setRole("1")

        } else {
          setRole("2")

        }




        setunifedNumber(data.Unified_No)
        // const phone = data['phone'].slice(3, 13)
        setPhone_number(data.Phone_No)
        console.log({
          id: data.City.id,
          label: data.City.Status_of_cont,
          value: data.City.Status_of_cont

        }, "aaaa")

        setCompanyValue({
          id: data.City.id,
          label: data.City.city_arabic,
          value: data.City.city_arabic

        })

        setCountryValue({
          id: data.Country.id,
          label: data.Country.name_arabic,
          value: data.Country.name_arabic

        })

        console.log(data.company_activity, "data.company_activity")
        // setcompany_activityValue({
        //   id:data.company_activity.val,
        //   label:data.company_activity.label,
        //   value:data.company_activity.label

        // })


        let myfiles = []
        let my_ids_of_files = ""
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





      } else {

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
    loadOptionsDB_Country()
    // loadOptionsDB_Company()

    // loadOptionsDB_company_activity()
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
    const CRN_input = document.getElementsByName("CRN")[0]
    CRN_input.value = CRN
  }, [CRN])

  useEffect(() => {
    const unifedNumber_input = document.getElementsByName("unifedNumber")[0]
    unifedNumber_input.value = unifedNumber
  }, [unifedNumber])

  useEffect(() => {
    const phone_number_input = document.getElementsByName("phone_number")[0]
    phone_number_input.value = phone_number
  }, [phone_number])

  useEffect(() => {
    const email_input = document.getElementsByName("email")[0]
    email_input.value = email
  }, [email])

  useEffect(() => {
    const finance_person_input = document.getElementsByName("finance_person")[0]
    finance_person_input.value = finance_person
  }, [finance_person])
  useEffect(() => {
    const finance_person_number_input = document.getElementsByName("finance_person_number")[0]
    finance_person_number_input.value = finance_person_number
  }, [finance_person_number])

  useEffect(() => {
    const finance_manager_input = document.getElementsByName("finance_manager")[0]
    finance_manager_input.value = finance_manager
  }, [finance_manager])

  useEffect(() => {
    const finance_manager_number_input = document.getElementsByName("finance_manager_number")[0]
    finance_manager_number_input.value = finance_manager_number
  }, [finance_manager_number])


  useEffect(() => {
    const identity_number_input = document.getElementsByName("identity_number")[0]
    identity_number_input.value = identity_number
  }, [identity_number])

  useEffect(() => {
    const comp_activ_input = document.getElementsByName("comp_activ")[0]
    comp_activ_input.value = comp_activ
  }, [comp_activ])





  useEffect(() => {
    const identity_name_input = document.getElementsByName("identity_name")[0]
    identity_name_input.value = identity_name
  }, [identity_name])


  useEffect(() => {
    if (!add['current']) {
      console.log("loading ..........")
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


  const checkNumbersOnlyPhone = (v) => {
    const value = v

    const regex = new RegExp(/^[+]+[0-9]+$/)

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
  const regexEnglish = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Z )(]+$')
    return regex.test(value)

  }

  const regexArabicEnglish = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Zء-ي /-]+$')
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

  const loadOptionsDB_Company = async () => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (companyData.length > 0) {
      return companyData
    } else {
      const data = await axios.get(`${domain_url}/Company/dropdown_data`, config).then(res => {
        const company_list = []
        const result = res.data.city

        result.forEach((item, index, array) => {
          company_list.push(
            {
              id: item['id'],
              value: item['Status_of_cont'],
              label: item['Status_of_cont'],

            }
          )
        })
        return company_list


      })
      console.log("data .", data)
      setCompanyData(data)
      // setCompanyData([])

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
              label: item['name_arabic'],

            }
          )
        })
        return country_list


      })
      setCountryData(data)
      return data
    }
  }

  const loadOptionsDB_Cities_for_country = async (countryValueId) => {
    // IsLoadingCities.current = true
    // console.log(IsLoadingCities.current,"IsLoadingCities.current")
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    setLoaderShow(true)
    console.log("changed")
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
      setValue('company', "")
      const data = await axios.get(`${domain_url}/Country/CountryCities?countryId=${countryValueId}`, config).then(res => {
        console.log(res.data.city, "jaja")
        
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
      setCompanyData(data)

      // IsLoadingCities.current = false

      setLoaderShow(false)

      // setCountryValue(countryValueorg)
      // setLoaderShow(false)
      // return data
    }
  }

  const loadOptionsDB_company_activity = async () => {
    console.log("again loading ...")
    const token = localStorage.getItem("token")


    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (company_activityData.length > 0) {
      return company_activityData
    } else {
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const company_activity_list = []
        const result = res.data.data

        // result.forEach((item, index, array) => {
        company_activity_list.push(
          {
            id: "0",
            value: "أساسي",
            label: "أساسي"
          }
        )
        company_activity_list.push(
          {
            id: "1",
            value: "فرعي",
            label: "فرعي"
          }
        )
        // })
        return company_activity_list


      })
      console.log(data, "data..............")
      setcompany_activityData(data)
      return data
    }
  }

  const SignupSchema = yup.object().shape({
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

          if (!regexArabicEnglish(value) | checkSpaceCharacters(value)) {
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال اسم الشركة  بشكل صحيح' })
          } else {

          }
        }
        setNameValidation(true)
        return true
      }
    }),
    CRN: yup.string().test({
      name: 'CRN',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = CRN
        }
        setCRN(value)
        if (value === '' | value === null) {
          setCRNValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          if (!checkNumbersOnly(value)) {
            setCRNValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال السجل التجاري بشكل صحيح' })
          }
        }
        setCRNValidation(true)
        return true
      }
    }),

    unifedNumber: yup.string().test({
      name: 'unifedNumber',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = unifedNumber
        }
        setunifedNumber(value)
        if (value === null | value === "") {
          setunifedNumberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkNumbersOnly(value)
          if (value === false) {
            setunifedNumberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الرقم الموحد بشكل صحيح' })
          }
        }

        setunifedNumberValidation(true)
        return true
      }
    }),
    phone_number: yup.string().test({
      name: 'phone_number',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = phone_number
        }
        setPhone_number(value)

        if (value === null | value === "") {
          setPhone_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkNumbersOnlyPhone(value)
          if (value === false) {
            setPhone_numberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم الهاتف بشكل صحيح' })
          }
        }

        setPhone_numberValidation(true)
        return true
      }
    }),

    email: yup.string().test({
      name: 'email',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = email
        }
        setEmail(value)
        if (value === null | value === "") {
          // setEmailValidation(false)
          // return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkValidEmail(value)
          if (value === false) {
            setEmailValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال البريد الإلكتروني بشكل صحيح' })
          }
        }

        setEmailValidation(true)
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
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setCompanyValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setCompanyValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
        }
        if (value === '' | value === null) {
          setCompanyValidation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
            setCompanyValueId(value.id)
          } catch (e) {
            console.log("1")
          }
        }
        setCompanyValidation(true)
        return true
      }
    }),
    country: yup.mixed().test({
      name: 'country',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = countryValue
          
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setValue('company', "")
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
          setValue('company', "")
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
        // if(add['current']){
        console.log(countryValueId,value.id,"-2222")
        
        if (countryValueId != value.id) {
          loadOptionsDB_Cities_for_country(value.id)
          
        }
        // }
        console.log("country validation true")
        return true
      }
    }),
    finance_person: yup.string().test({
      name: 'finance_person',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = finance_person
        }
        setfinance_person(value)
        if (value === null | value === "") {
          setfinance_personValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          if (!regexArabicEnglish(value) | checkSpaceCharacters(value)) {
            setfinance_personValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال مدير العلاقة بشكل صحيح' })
          }
        }

        setfinance_personValidation(true)
        return true
      }
    }),
    finance_person_number: yup.string().test({
      name: 'finance_person_number',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = finance_person_number
        }
        setfinance_person_number(value)
        if (value === null | value === "") {
          setfinance_person_numberValidation(true)
          return true
        } else {
          if (!checkNumbersOnly(value) | checkSpaceCharacters(value)) {
            setfinance_person_numberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم مدير العلاقة بشكل صحيح' })
          }
        }

        setfinance_person_numberValidation(true)
        return true
      }
    }),



    finance_manager: yup.string().test({
      name: 'finance_manager',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = finance_manager
        }
        setfinance_manager(value)
        if (value === null | value === "") {
          // setfinance_managerValidation(false)
          // return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          if (!regexArabicEnglish(value) | checkSpaceCharacters(value)) {
            setfinance_managerValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال المدير المالي بشكل صحيح' })
          }
        }

        setfinance_managerValidation(true)
        return true
      }
    }),

    finance_manager_number: yup.string().test({
      name: 'finance_manager_number',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = finance_manager_number
        }
        setfinance_manager_number(value)
        if (value === null | value === "") {
          setfinance_manager_numberValidation(true)
          return true
        } else {
          if (!checkNumbersOnly(value) | checkSpaceCharacters(value)) {
            setfinance_manager_numberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم مدير العلاقة بشكل صحيح' })
          }
        }

        setfinance_manager_numberValidation(true)
        return true
      }
    }),


    // company_activity: yup.mixed().test({
    //   name: 'company_activity',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = company_activityValue
    //       if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
    //         setcompany_activityValidation(false)
    //         return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //       } else {

    //         console.log(company_activityValueId,"company_activityValueId")

    //         try {
    //           setcompany_activityValueId(value.id)
    //           } catch (e) {
    //             console.log("1")
    //           }
    //       }
    //     }
    //     if (value === '' | value === null) {
    //       setcompany_activityValidation(false)
    //       return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //     } else {
    //       console.log(company_activityValueId,"company_activityValueId.........")
    //       try {
    //       setcompany_activityValueId(value.id)
    //       } catch (e) {
    //         console.log("1")
    //       }
    //     }
    //     setcompany_activityValidation(true)
    //     console.log("country validation true")
    //     return true
    //   }
    // }),

    identity_number: yup.string().test({
      name: 'identity_number',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = identity_number
        }
        setidentity_number(value)
        if (value === null | value === "") {
          setidentity_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          // || value.length != 10
          if (!checkNumbersOnly(value)) {
            setidentity_numberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم الهوية بشكل صحيح' })
          }
        }

        setidentity_numberValidation(true)
        return true
      }
    }),

    comp_activ: yup.string().test({
      name: 'comp_activ',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = comp_activ
        }
        setcomp_activ(value)
        if (value === null | value === "") {
          setcomp_activValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          // || value.length != 10
          if (!checkNumbersOnly(value)) {
            // setcomp_activValidation(false)
            // return ctx.createError({ message: 'الرجاء إدخال رقم الهوية بشكل صحيح' })
          }
        }

        setcomp_activValidation(true)
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
          // || value.length != 10
          if (checkNumbersOnly(value)) {
            setidentity_nameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
          }
        }

        setidentity_nameValidation(true)
        return true
      }
    }),





  })

  const saveDataCompany = async () => {
    console.log("saving ........ ")
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzE0MDcxLCJqdGkiOiIzZjYyNjAxMTE1NmI0YjkyOTkyNjNhNTVhZDRjMWQ1MSIsInVzZXJfaWQiOjF9.zEaSBXTFHlOs_J0-WuEPUlbNB03PtMUU4mdqpwgImpE"



    const bodyFormData = new FormData()
    if (add['current'] === true) {

      const phone = phone_number.slice(1, 10)


      bodyFormData.append('Email', email)
      bodyFormData.append('Company_Name', name)
      bodyFormData.append('CR_Number', CRN)
      bodyFormData.append('Phone_No', `${phone_number}`)

      bodyFormData.append('Unified_No', unifedNumber)
      bodyFormData.append('City', companyValueId)
      bodyFormData.append('Country', countryValueId)
      bodyFormData.append('finance_person', finance_person)
      bodyFormData.append('finance_person_number', finance_person_number)


      bodyFormData.append('finance_manager', finance_manager)
      bodyFormData.append('finance_manager_number', finance_manager_number)

      // bodyFormData.append('company_activity', company_activityValueId)
      bodyFormData.append('identity_number', identity_number)
      bodyFormData.append('comp_activ', comp_activ)


      bodyFormData.append('identity_name', identity_name)

      let company_type = ""
      if (role == "1") {
        company_type = "1"
      } else {
        company_type = "0"

      }
      bodyFormData.append('company_type', company_type)


      for (var i = 0; i < backend_files.length; i++) {
        bodyFormData.append('files_of_this', backend_files[i]);

      }



    } else {

      bodyFormData.append('Email', email)
      bodyFormData.append('Company_Name', name)
      bodyFormData.append('CR_Number', CRN)
      bodyFormData.append('Phone_No', `${phone_number}`)

      bodyFormData.append('Unified_No', unifedNumber)
      bodyFormData.append('City', companyValueId)
      bodyFormData.append('Country', countryValueId)
      bodyFormData.append('finance_person', finance_person)
      bodyFormData.append('finance_person_number', finance_person_number)


      bodyFormData.append('finance_manager', finance_manager)
      bodyFormData.append('finance_manager_number', finance_manager_number)

      // bodyFormData.append('company_activity', company_activityValueId)
      bodyFormData.append('identity_number', identity_number)
      bodyFormData.append('comp_activ', comp_activ)


      bodyFormData.append('identity_name', identity_name)

      let company_type = ""
      console.log(role, "role..............")
      if (role == "1") {
        company_type = "1"
      } else {
        company_type = "0"

      }
      bodyFormData.append('company_type', company_type)



      // console.log(company_activityValueId,"company_activityValueId555")


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



      // bodyFormData.append('company_Id', company_Id)



    }





    try {
      if (add['current'] === true) {


        axios({
          method: "post",
          url: `${domain_url}/Company/AddCompany/`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response[0], "**/*", response.data[0]["success"], response.data[0]["success "])
            console.log(response.data[0]["success "], response.data[0]["success "] === 0, response.data[0]["success "] == 0, "hany...")

            if (response.data[0]["success"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data[0]["message"]}`)

              setHeadAlert("حدث خطأ ،")
              setShowAlert(true)
              setLoaderShow(false)
            }



            else {
              setTypeAlert("Success")
              setTitleAlert(`${response.data[0]["message"]}`)
              setHeadAlert("، ")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/companies?success=added')
              } else {
                navigate('/companies?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response.message, "awaw")
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ،")
            setShowAlert(true)
            setLoaderShow(false)
          })


      } else {
        console.log("Editing ")
        axios({
          method: "put",
          url: `${domain_url}/Company/AddCompany/?id=${company_Id}`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            console.log(response, "2222")
            if (response.data[0]["success"] === 0) {
              console.log("not 2000")
              setTypeAlert("Fail")
              setTitleAlert(`${response.data[0]["message"]}`)

              setHeadAlert(" حدث خطأ،")
              setShowAlert(true)
              setLoaderShow(false)
            }

            else {
              setTypeAlert("Success")
              setTitleAlert("تم إضافة الشركة بنجاح.")
              setHeadAlert("، ")
              setShowAlert(true)
              if (add['current'] === true) {
                navigate('/companies?success=added')
              } else {
                navigate('/companies?success=edited')

              }
            }

          })
          .catch(function (response) {
            console.log(response.message, "awaw")
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ،")
            setShowAlert(true)
            setLoaderShow(false)
          })


      }

    } catch (e) {
      console.log(e)
      setTypeAlert("Fail")
      setTitleAlert("لم يتم إضافة الشركة بشكل صحيح.")
      setHeadAlert("حدث خطأ،")
      setShowAlert(true)
      setLoaderShow(false)
    }
  }

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {


    if (nameValidation & CRNValidation & unifedNumberValidation & identity_nameValidation & identity_numberValidation & finance_managerValidation & finance_manager_numberValidation & finance_personValidation & finance_person_numberValidation & emailValidation & phone_numberValidation & companyValidation & countryValidation & comp_activValidation) {
      saveDataCompany()

    }

  }
  // const SelectWithValidation1 = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB,change  }) => {

  //   if (change == "Country"){
  //     onchange = {loadOptionsDB_Cities_for_country}
  //   }
  //   else{
  //     onchange = null
  //   }



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
  //             defaultValue = {defaultValue}
  //             {...field}
  //             defaultOptions
  //             isClearable
  //             id={id_name}
  //             name={id_name}
  //             classNamePrefix='select-white'
  //             placeholder='اختر من القائمة'
  //             loadOptions={loadOptionsDB}
  //             theme={selectThemeColors}
  //             isSearchable={false}
  //             // onChange={onchange}

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

  return (
    <>
      {/* {IsLoadingCities['current'] == true && (
        <div className='LoadingCitiesComponent'>
          <Loader></Loader>
        </div>
      )} */}

      <div className="theme-content px-0 px-md-5 ms-xl-5 ">
        <div className="container-fluid pe-md-5 ps-md-4 pe-3 ps-3">

          {(add['current']) ? <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الشركات" headerContractObj="إضافة شركة" urlMain="/companies" /> : <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الشركات" headerContractObj="تعديل الشركة" urlMain="/departments" />}



          {(add['current']) ? <div className='addPageHeader pt-4 ps-0 ms-0'>إضافة شركة</div> : <div className='addPageHeader pt-4 ps-0 ms-0'>تعديل الشركة</div>}
          <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid mt-5 pt-2 pb-5 mb-5 background-FFFFFF borderRadius-8">

              <Row className=' '>

                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                    اسم الشركة
                  </Label>
                  <Controller
                    id='name'
                    name='name'
                    value={`${name}`}
                    onChange={(e) => setName(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل اسم الشركة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
                  />
                  {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                    رقم السجل التجاري
                  </Label>
                  <Controller
                    id='CRN'
                    name='CRN'
                    value={`${CRN}`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل رقم السجل التجاري ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.CRN && true} />}
                  />
                  {errors.CRN && <FormFeedback>{errors.CRN.message}</FormFeedback>}

                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                    الرقم الموحد
                  </Label>
                  <Controller
                    id='unifedNumber'
                    name='unifedNumber'
                    value={`${unifedNumber}`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل الرقم الموحد ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.unifedNumber && true} />}
                  />
                  {errors.unifedNumber && <FormFeedback>{errors.unifedNumber.message}</FormFeedback>}

                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                    رقم الهاتف
                  </Label>
                  <Controller
                    id='phone_number'
                    name='phone_number'
                    value={`${phone_number}`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل رقم الهاتف ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7 phone-dir' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB phone-dir'} invalid={errors.phone_number && true} />}
                  />
                  {errors.phone_number && <FormFeedback>{errors.phone_number.message}</FormFeedback>}

                </Col>



                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    البريد الإلكتروني
                  </Label>
                  <Controller
                    id='email'
                    name='email'
                    value={`${email}`}
                    onChange={(e) => setEmail(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل البريد الإلكتروني ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.email && true} />}
                  />
                  {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}

                </Col>

                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    مدير العلاقة
                  </Label>
                  <Controller
                    id='finance_person'
                    name='finance_person'
                    value={`${finance_person}`}
                    onChange={(e) => setfinance_person(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل مدير العلاقة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.finance_person && true} />}
                  />
                  {errors.finance_person && <FormFeedback>{errors.finance_person.message}</FormFeedback>}

                </Col>

                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    رقم
                    مدير العلاقة
                  </Label>
                  <Controller
                    id='finance_person_number'
                    name='finance_person_number'
                    value={`${finance_person_number}`}
                    onChange={(e) => setfinance_person_number(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل مدير العلاقة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.finance_person_number && true} />}
                  />
                  {errors.finance_person_number && <FormFeedback>{errors.finance_person_number.message}</FormFeedback>}

                </Col>

                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    المدير المالي
                  </Label>
                  <Controller
                    id='finance_manager'
                    name='finance_manager'
                    value={`${finance_manager}`}
                    onChange={(e) => setfinance_manager(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل مدير العلاقة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.finance_manager && true} />}
                  />
                  {errors.finance_manager && <FormFeedback>{errors.finance_manager.message}</FormFeedback>}

                </Col>


                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    رقم
                    المدير المالي
                  </Label>
                  <Controller
                    id='finance_manager_number'
                    name='finance_manager_number'
                    value={`${finance_manager_number}`}
                    onChange={(e) => setfinance_manager_number(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل مدير العلاقة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.finance_manager_number && true} />}
                  />
                  {errors.finance_manager_number && <FormFeedback>{errors.finance_manager_number.message}</FormFeedback>}

                </Col>



                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    اسم صاحب الشركة أو المسؤول
                  </Label>
                  <Controller
                    id='identity_name'
                    name='identity_name'
                    value={`${identity_name}`}
                    onChange={(e) => setidentity_name(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل اسم هوية صاحب الشركة أو المسؤول' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_name && true} />}
                  />
                  {errors.identity_name && <FormFeedback>{errors.identity_name.message}</FormFeedback>}

                </Col>


                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    رقم هوية صاحب الشركة أو المسؤول
                  </Label>
                  <Controller
                    id='identity_number'
                    name='identity_number'
                    value={`${identity_number}`}
                    onChange={(e) => setidentity_number(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل رقم هوية صاحب الشركة أو المسؤول' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.identity_number && true} />}
                  />
                  {errors.identity_number && <FormFeedback>{errors.identity_number.message}</FormFeedback>}

                </Col>

                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    نشاط الشركة
                  </Label>
                  <Controller
                    id='comp_activ'
                    name='comp_activ'
                    value={`${comp_activ}`}
                    onChange={(e) => setcomp_activ(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل نشاط الشركة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.comp_activ && true} />}
                  />
                  {errors.comp_activ && <FormFeedback>{errors.comp_activ.message}</FormFeedback>}

                </Col>

                <Col sm='6 d-none' className='mb-4 form-group bmd-form-group'>
                  <SelectWithValidation1 defaultValue={company_activityValue} id_name='company_activity' title='نشاط الشركة' control={control} errors_check={errors.company_activity} loadOptionsDB={company_activityData} change="company_activity" />
                </Col>


                <Row className='p-0 m-0'>
                  <Col sm='6' className='mb-4 form-group bmd-form-group'>
                    <SelectWithValidation1 defaultValue={countryValue} id_name='country' title='الدولة' control={control} errors_check={errors.country} loadOptionsDB={CountryData} change="Country" />
                  </Col>

                  <Col sm='6' className='mb-4 form-group bmd-form-group'>
                    <SelectWithValidation1 defaultValue={companyValue} id_name='company' title='المدينة' control={control} errors_check={errors.company} loadOptionsDB={companyData} />
                  </Col>
                </Row>

                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <Row className='ms-0'>

                    <Label className="ms-0 ps-0 form-label font-Cairo f-w-700 f-s-16px color-5F605F" for="radio">
                      قائمة سوداء
                    </Label>
                    <Col sm='6' className='p-0'>
                      <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border py-3 ${role === "1" ? 'checkRole' : ''}`}>
                        <Label className="form-check-label form-label lable-radio font-Cairo f-w-700 f-s-16px color-5F605F" for="radio_collect_employee">
                          نعم
                        </Label>

                        <Input
                          type="radio"
                          id="radio_collect_employee"
                          name="employee_type"
                          className={`float-end me-4 color-3261A8 ${role === "1" ? 'checkRole' : ''}`}
                          checked={role === "1"}
                          onClick={(e) => setRole("1")}

                        />

                      </Col>
                    </Col>
                    <Col sm='6' className='ps-md-2 pe-md-2 p-0'>
                      <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border py-3 ${role === "2" ? 'checkRole' : ''}`}>
                        <Label className={`form-check-label form-label lable-radio font-Cairo f-w-700 f-s-16px color-5F605F `} for="radio_admin_employee">
                          لا
                        </Label>
                        <Input
                          type="radio"
                          id="radio_admin_employee"
                          name="employee_type"
                          className={`float-end me-4 color-3261A8 `}
                          checked={role === "2"}
                          onClick={(e) => { setRole("2") }}


                        />
                      </Col>
                      {/* <div className="invalid-feedback">{roleError}</div> */}

                    </Col>
                  </Row>

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
            </div>

            <div className=" ">
            </div>

            <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
              <Col md='6' className='mb-2'>
                <Button className={(nameValidation & CRNValidation & identity_nameValidation & identity_numberValidation & finance_managerValidation & finance_manager_numberValidation & finance_personValidation & finance_person_numberValidation & unifedNumberValidation & emailValidation & phone_numberValidation & companyValidation & countryValidation & comp_activValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ الشركة  </Button>

              </Col>
              <Col md='6' className='mb-2'>
                <Button href="/companies" className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
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

export default AddCar
