// ** React Imports
import React, { Fragment, useState, useEffect, useRef ,useContext } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";
import axios from 'axios'
import { useNavigate  } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"

import UploadElementDataV2 from "../components/documents/UploadElementDataV2"
import HomeHeader from "../components/home/HomeHeader"



import AlertElement from "../components/AlertElement"
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'

import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { selectThemeColors } from '@utils'
import * as yup from 'yup'
import $ from 'jquery'

import AsyncSelect from 'react-select/async'

// {/* car header component  */}
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import Arrows from "@src/assets/images/svg/Arrows.svg"
// {/* end car header component  */}
// {/* car details row component */}
import arrowDetails from "@src/assets/images/svg/arrowDetails.svg"
import { constrainPoint, isValidDate } from '@fullcalendar/core'
import { yupResolver } from '@hookform/resolvers/yup'
import FormStrap from 'react-bootstrap/Form'
import { FALSE } from 'sass'

import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


const main_url = themeConfig.main_url

// {/* end car details row component */}

const AddCar = () => {


  const add = useRef(true)
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  const [showAlert, setShowAlert] = useState(false)

  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")


  const [nameValidation, setNameValidation] = useState(false)
  const [nameValidation_dept , setNameValidation_dept] = useState(false)

  const [emailValidation, setEmailValidation] = useState(false)

  const [name, setName] = useState("")
  const [name_dept, setName_dept] = useState("")

  const [email, setEmail] = useState("")


  const navigate = useNavigate()
  const [company_Id, setCompany_Id] = useState("")
  // Document


  
  
   
  


  //////////////////////////////////////////////
  const ref = useRef("")
  const getCompanyById = async (company_id) => {
    const token = localStorage.getItem("token")
    setLoaderShow(true)
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }

    try {
      const result = await axios.get(`${domain_url}/get-car-company?car_company_id=${company_id}`, config)
      if (result.status === 200) {
        const data = result.data.data
        setName(data.translations[0].name)
        setName_dept(data.translations[1].name)
        setEmail(data['email'])




      } else {

      }
    } catch (e) {
      console.log(e, "error happened")
    }
    setLoaderShow(false)
  }

  useEffect(() => {
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
    const name_dept_input = document.getElementsByName("name_dept")[0]
    name_dept_input.value = name_dept
  }, [name_dept])

  useEffect(() => {
    const email_input = document.getElementsByName("email")[0]
    email_input.value = email
  }, [email])




  const checkonlyOneNumberWithLength = (v, n, maxLength) => {
    
    const name = n
    let value = v

    value = value.replace(/[^\d]/, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({...values, [name]: value}))
    return value
  }

  const checkonlyOneCharacterWithLength = (v, n, maxLength) => {
    
    const name = n
    let value = v

    value = value.replace(/[0-9]/g, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({...values, [name]: value}))
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
        if (value[0] === "0" & value[1] === "1"  ) {
          const valid = checkNumbersOnly(value)
          if (valid & value.length === 10) {
              return true
          } else {
            return false
          }
        }
    } catch(e) {
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
    const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/    ///\S+@\S+\.\S+/
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
          if (!regexArabic(value)  | checkSpaceCharacters(value)) {
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بالعربي بشكل صحيح' })
          }
        }
        setNameValidation(true)
        return true
      }
    }),
    name_dept: yup.string().test({
      name: 'name_dept',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = name_dept
        }
        setName_dept(value)
        if (value === '' | value === null) {
          setNameValidation_dept(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          if (!regexArabic(value) | checkSpaceCharacters(value)) {
            setNameValidation_dept(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بالعربي بشكل صحيح' })
          }
        }
        setNameValidation_dept(true)
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
          setEmailValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
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
 
   


  })

  const saveDataCompany = async () => {
    console.log("saving ........ ")
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    
    
    const bodyFormData = new FormData()
    if (add['current'] === true) {



    bodyFormData.append('email', email)
    bodyFormData.append('name', name)
    bodyFormData.append('name_dept', name_dept)
    
    } else {

    bodyFormData.append('email', email)
    bodyFormData.append('name', name)
    bodyFormData.append('name_dept', name_dept)
    bodyFormData.append('dept_id', company_Id)

      
    }
    



    
    try {
      if (add['current'] === true) {
        

        axios({
          method: "post",
          url: `${domain_url}/add-car-company`,
          data: bodyFormData,
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "app-lng": 'ar' 
          }
        })
        .then(function (response) {
          
          if (response.data.status !== 200) {
            console.log("not 2000")
            setTypeAlert("Fail")
            setTitleAlert(`${response.data.message}`)
            
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          } else {
            setTypeAlert("Success")
            setTitleAlert("تم إضافة الشركة بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
            if (add['current'] === true) {
            navigate('/companies?success=added')
            } else {
              navigate('/companies?success=edited')

            }
          }
          
        })
        .catch(function (response) {
          setTypeAlert("Fail")
          setTitleAlert(`${response.data.message}`)
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          setLoaderShow(false)
        })


      } else {
        axios({
          method: "post",
          url: `${domain_url}/edit-car-company`,
          data: bodyFormData,
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "app-lng": 'en' 
          }
        })
        .then(function (response) {
          
          if (response.data.status !== 200) {
            setTypeAlert("Fail")
            setTitleAlert(`${response.message}`)
            setHeadAlert("حدث خطأ")
            setShowAlert(true)
            setLoaderShow(false)
          } else {
            setTypeAlert("Success")
            setTitleAlert("تم إضافة الشركة بنجاح.")
            setHeadAlert("")
            setShowAlert(true)
            if (add['current'] === true) {
            navigate('/companies?success=added')
            } else {
              navigate('/companies?success=edited')

            }
          }
          
        })
        .catch(function (response) {
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

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {

    
      if ( nameValidation & nameValidation_dept  & emailValidation) {
        saveDataCompany()

      } 
      
    }
  
  return (
    <div className="theme-content px-0 px-md-5 ms-xl-5 ">
      <div className="container-fluid pe-md-5 ps-md-4 pe-1 ps-1">

        {(add['current']) ?  <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الإدارات" headerContractObj="إضافة إدارة" urlMain="/departments"  /> :  <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الإدارات" headerContractObj="تعديل الإدارة" urlMain="/departments"  /> }

        

        {(add['current']) ? <div className='addPageHeader pt-4 ps-md-0 ms-md-0 '>إضافة إدارة</div> : <div className='addPageHeader pt-4 ps-0 ms-0 '>تعديل الإدارة</div> }
        <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        <Form  onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid mt-5 pt-2 pb-5 mb-5 background-FFFFFF borderRadius-8">
            
            <Row className='  '>

              <Col sm='12' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                اسم الإدارة
                </Label>
                <Controller
                  id='name'
                  name='name'
                  value={`${name}`}
                  onChange={(e) => setName(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل اسم الإدارة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
                />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                اسم مدير الإدارة
                </Label>
                <Controller
                  id='name_dept'
                  name='name_dept'
                  value={`${name_dept}`}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل اسم مدير الإدارة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name_dept && true} />}
                />
                {errors.name_dept && <FormFeedback>{errors.name_dept.message}</FormFeedback>}

              </Col>


              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
                البريد الإلكتروني لمدير الإدارة
                </Label>
                <Controller
                  id='email'
                  name='email'
                  value = {`${email}`}
                  onChange={(e) => setEmail(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل البريد الإلكتروني الخاص بمدير الإدارة' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.email && true} />}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}

              </Col>

              
            </Row>
          </div>

          <div className=" ">
          </div>

          <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
          <Col md='6' className='mb-2'>
              <Button className={( nameValidation & nameValidation_dept & emailValidation ) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ الإدارة  </Button>
              
            </Col>
            <Col md='6' className='mb-2'>
              <Button href="/departments" className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
                إلغاء
              </Button>
            </Col>


          </div>
        </Form>

        {/* end  car details component */}

      </div>
    </div>
  )
}

export default AddCar
