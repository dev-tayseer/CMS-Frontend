// ** React Imports
import React, { Fragment, useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"

import UploadElementDataV2 from "../components/documents/UploadElementDataV2"
import HomeHeader from "../components/home/HomeHeader"
import NationalitiesHeader from "../components/home/NationalitiesHeader"
import logo from "@src/assets/images/logo/logo.png";
import Loader from '../components/loader'





import AlertElement from "../components/AlertElement"
import toast from 'react-hot-toast'
import { useForm, Controller, set, useFieldArray } from 'react-hook-form'
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
  const [name_arabicValidation, setName_arabicValidation] = useState(false)
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
  const [name_arabic, setName_arabic] = useState("")
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
      const result = await axios.get(`${domain_url}/Nationalities/NationalitiesView/?id=${company_id}`, config)
      console.log(result, "edit ..... ")
      if (result.status === 200) {
        const data = result.data.data[0]
        console.log(data,"mamamamamamama")
        setName(data.name)
        setName_arabic(data.name_arabic)
        setValue('name',data.name)
        setValue('name_arabic',data.name_arabic)
        
        
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
    // setFilesUpload()
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

      const data = await axios.get(`${domain_url}/Country/CountryCities?countryId=${countryValueId}`, config).then(res => {
        console.log(res.data.city, "jaja")
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
            return ctx.createError({ message: 'الرجاء إدخال اسم الجنسية  بشكل صحيح' })
          } else {

          }
        }
        setNameValidation(true)
        return true
      }
    }),

    name_arabic: yup.string().test({
      name: 'name_arabic',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = name_arabic
        }
        setName_arabic(value)
        if (value === '' | value === null) {
          setName_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {

          if (!regexArabicEnglish(value) | checkSpaceCharacters(value)) {
            setName_arabicValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال اسم الجنسية  بشكل صحيح' })
          } else {

          }
        }
        setName_arabicValidation(true)
        return true
      }
    }),

  })

  const saveDataCompany = async () => {
    console.log("saving ........ ")
    setLoaderShow(true)
    const token = localStorage.getItem("token")



    if (add['current'] === true) {
      var rawdata =
      {
        "data": [
          {
            "name": name,
            "name_arabic": name_arabic
          }
        ]
      }
    } else {

      var rawdata =
      {
        "data": [
          {
            "id": company_Id,
            "name": name,
            "name_arabic": name_arabic
          }]
      }
    }





    try {
      console.log(add['current'],"add['current']add['current']")
      if (add['current'] === true) {


        axios({
          method: "post",
          url: `${domain_url}/Nationalities/NationalitiesView/`,
          data: rawdata,
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",

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
                navigate('/nationalities?success=added')
              } else {
                navigate('/nationalities?success=edited')

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
          url: `${domain_url}/Nationalities/NationalitiesView/`,
          data: rawdata,
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",

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
                navigate('/nationalities?success=added')
              } else {
                navigate('/nationalities?success=edited')

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
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'fields'
  // });

  const onSubmit = data => {


    if (nameValidation & name_arabicValidation) {
      saveDataCompany()

    }

  }




  return (
    <>


      <div className="theme-content px-0 px-md-5 ms-xl-5 ">
        <div className="container-fluid pe-md-5 ps-md-4 pe-3 ps-3">

          {/* {(add['current']) ? <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الشركات" headerContractObj="إضافة جنسية" urlMain="/companies" /> : <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الشركات" headerContractObj="تعديل الشركة" urlMain="/departments" />} */}
          {(add['current']) ? <NationalitiesHeader headerContract="الجنسيات" headerContract2="الشركات" headerContractObj="إضافة جنسية" urlMain="/nationalities" nonext="false" /> : <NationalitiesHeader headerContract="الجنسيات" headerContract2="الشركات" headerContractObj="تعديل جنسية" urlMain="/nationalities" nonext="false"  />}
          {/* <HomeHeader headerContract="الجنسيات" nonext={false}  /> */}


          {(add['current']) ? <div className='addPageHeader pt-4 ps-0 ms-0'>إضافة جنسية</div> : <div className='addPageHeader pt-4 ps-0 ms-0'>تعديل جنسية</div>}
          <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid mt-5 pt-2 pb-5 mb-5 background-FFFFFF borderRadius-8">

              <Row >
                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                    الجنسية  بالعربية
                  </Label>
                  <Controller
                    id='name_arabic'
                    name='name_arabic'
                    value={`${name_arabic}`}
                    onChange={(e) => setName_arabic(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل الجنسية  بالعربية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name_arabic && true} />}
                  />
                  {errors.name_arabic && <FormFeedback>{errors.name_arabic.message}</FormFeedback>}

                </Col>

                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                    الجنسية بالإنجليزية
                  </Label>
                  <Controller
                    id='name'
                    name='name'
                    value={`${name}`}
                    onChange={(e) => setName(e.target.value)}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='أدخل الجنسية  بالإنجليزية' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
                  />
                  {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

                </Col>


              </Row>
            </div>



            <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
              <Col md='6' className='mb-2'>
                <Button className={(nameValidation & name_arabicValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ الجنسية  </Button>

              </Col>
              <Col md='6' className='mb-2'>
                <Button href="/nationalities" className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
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
