// ** React Imports
import React, { Fragment, useState, useEffect, useRef ,useContext } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";
import axios from 'axios'
import { useNavigate  } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"

import UploadElementDataV2 from "../components/documents/UploadElementDataV2"

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
  const [inputs, setInputs] = useState({})
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  const [showAlert, setShowAlert] = useState(false)

  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")

  const [errorsAll, seterrorsAll] = useState(null)
  const add = useRef(true)

  const [nameValidation, setNameValidation] = useState(false)
  const [nameValidation_ar, setNameValidation_ar] = useState(false)

  const [phone_numberValidation, setPhone_numberValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [addressValidation, setAddressValidation] = useState(false)
  const [addressValidation_ar, setAddressValidation_ar] = useState(false)

  const [name, setName] = useState("")
  const [name_ar, setName_ar] = useState("")

  const [phone_number, setPhone_number] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [address_ar, setAddress_ar] = useState("")

  const navigate = useNavigate()
  const [company_Id, setCompany_Id] = useState("")
  // Document

  const [fileUrlExists2, setFileUrlExists2] = useState(true)
  const [render_pdf_element, setRender_pdf_element] = useState(false)
  const [fileUrl2, setFileUrl2] = useState(null)
 
  const [files2, setFiles2] = useState([])
  
   
  
  const handleRemoveAllFiles2 = () => {
    setFiles2([])
  }
  

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
        setRender_pdf_element(true)
        const data = result.data.data
        console.log(data, "data company")
        setName(data.translations[0].name)
        setName_ar(data.translations[1].name)
        const phone = data['phone'].slice(3, 13)
        setPhone_number(phone)
        setEmail(data['email'])
        setAddress(data.translations[0].address)
        setAddress_ar(data.translations[1].address)
        console.log(data, "7788")

        // console.log("Set")
        console.log(`${main_url}${data.recieve_file}`, "*********")
        setFileUrl2(`${main_url}${data.recieve_file}`)
        console.log(`${main_url}${data.recieve_file}`, "7777")
        // setChasis_num(data.chassis_number)


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
    const name_ar_input = document.getElementsByName("name_ar")[0]
    name_ar_input.value = name_ar
  }, [name_ar])

  useEffect(() => {
    const email_input = document.getElementsByName("email")[0]
    email_input.value = email
  }, [email])

  useEffect(() => {
    const phone_number_input = document.getElementsByName("phone_number")[0]
    phone_number_input.value = phone_number
  }, [phone_number])

  useEffect(() => {
    const address_input = document.getElementsByName("address")[0]
    address_input.value = address
  }, [address])

  useEffect(() => {
    const address_ar_input = document.getElementsByName("address_ar")[0]
    address_ar_input .value = address_ar
  }, [address_ar])

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
          if (!regexEnglish(value) | checkSpaceCharacters(value)) {
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بالإنجليزي بشكل صحيح' })
          }
        }
        setNameValidation(true)
        return true
      }
    }),
    name_ar: yup.string().test({
      name: 'name_ar',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = name_ar
        }
        setName_ar(value)
        if (value === '' | value === null) {
          setNameValidation_ar(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          if (!regexArabic(value) | checkSpaceCharacters(value)) {
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بالعربي بشكل صحيح' })
          }
        }
        setNameValidation_ar(true)
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
          value = checkValidSaudiPhoneNumber(value)
          if (value === false) {
            setPhone_numberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم التواصل بشكل صحيح' })
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
    address: yup.string().test({
      name: 'address',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = address
        }
        setAddress(value)
        value = checkAddress(value)
       
        if (value === false) {
          setAddressValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } 
        setAddressValidation(true)
        return true

      }
    }),
    address_ar: yup.string().test({
      name: 'address_ar',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = address_ar
        }
        setAddress_ar(value)
        value = checkAddress(value)
       
        if (value === false) {
          setAddressValidation_ar(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } 
        setAddressValidation_ar(true)
        return true

      }
    })


  })

  const saveDataCompany = async () => {
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    
    
    const bodyFormData = new FormData()
    console.log(phone_number, "-------*", email, "---***********", address, "------////////", name)
    if (add['current'] === true) {
      const phone = phone_number.slice(1, 10)



    bodyFormData.append('file', files2[0])
    bodyFormData.append('email', email)
    bodyFormData.append('phone', `966${phone_number}`)
    bodyFormData.append('address', address)
    bodyFormData.append('address_ar', address_ar)
    bodyFormData.append('name', name)
    bodyFormData.append('name_ar', name_ar)
    
    } else {
      if (files2.length > 0){
         bodyFormData.append('file', files2[0])
      }
    bodyFormData.append('email', email)
    bodyFormData.append('phone', `966${phone_number}`)
    bodyFormData.append('address', address)
    bodyFormData.append('address_ar', address_ar)
    bodyFormData.append('name', name)
    bodyFormData.append('name_ar', name_ar)
    bodyFormData.append('car_company_id', company_Id)
    console.log(bodyFormData, "333")
    console.log(files2[0],fileUrl2,email, "444")
      
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
    console.log(data, "data ....")
    console.log(files2,"123")
    
      if ((files2.length > 0| fileUrl2!=`${main_url}null`)  & nameValidation & nameValidation_ar & phone_numberValidation & emailValidation & addressValidation & addressValidation_ar) {
        saveDataCompany()

      } 
      
    }
  
  return (
    <div className="theme-content">
      <div className="container container2 ps-md-0 pe-md-0">

        {/* car header component  */}
        {(add['current']) ? <Breadcrumbs icon={homeIcon} urlMain="/companies" Arrows={Arrows} main={'الشركات'} second={'إضافة شركة'} /> : <Breadcrumbs icon={homeIcon} urlMain="/companies" Arrows={Arrows} main={'الشركات'} second={'تعديل بيانات الشركة'} /> }
        
        {/* end car header component  */}

        {/* car details row component */}
        {(add['current']) ? <DetailsInfo image={arrowDetails} title={'إضافة شركة'} /> : <DetailsInfo image={arrowDetails} title={'تعديل بيانات الشركة'} /> }
        {/*end car details row component */}
        <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        {/* car details component */}
        <Form  onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid mt-5 pt-2 background-FFFFFF borderRadius-8">
            <Row>
              <p className="font-Almarai f-w-800 f-s-20px color-1F2733 p-4">بيانات الشركة</p>
            </Row>
            <Row className='ps-3'>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='name'>
                الاسم (بالإنجليزي)
                </Label>
                <Controller
                  id='name'
                  name='name'
                  value={`${name}`}
                  onChange={(e) => setName(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل اسم الشركة بالكامل' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
                />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='name'>
                الاسم (بالعربي)
                </Label>
                <Controller
                  id='name_ar'
                  name='name_ar'
                  value={`${name_ar}`}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل اسم الشركة بالكامل' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name_ar && true} />}
                />
                {errors.name_ar && <FormFeedback>{errors.name_ar.message}</FormFeedback>}

              </Col>
              {/* <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='name_ar'>
                الاسم (بالعربي)
                </Label>
                <Controller
                  id='name_ar'
                  name='name_ar'
                  value={`${name_ar}`}
                  // onChange={(e) => setname_ar(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل اسم الشركة بالكامل' bsSize='lg' classname_ar='height-48 f-s-12px f-w-700' invalid={errors.name_ar && true} />}
                />
                {errors.name_ar && <FormFeedback>{errors.name_ar.message}</FormFeedback>}

              </Col> */}
              
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='phone_number'>
                رقم التواصل
                </Label>
                <Controller
                  id='phone_number'
                  name='phone_number'
                  value = {`${phone_number}`}
                  onChange={(e) => setPhone_number(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل رقم التواصل الخاص بالتواصل مع الشركة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700'  : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.phone_number && true} />}
                />
                {errors.phone_number && <FormFeedback>{errors.phone_number.message}</FormFeedback>}

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='email'>
                البريد الإلكتروني
                </Label>
                <Controller
                  id='email'
                  name='email'
                  value = {`${email}`}
                  onChange={(e) => setEmail(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل البريد الإلكتروني الخاص بالشركة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.email && true} />}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='IBAN'>
                    العنوان الوطني (بالإنجليزي)
                </Label>
                <Controller
                  id='address'
                  name='address'
                  value = {`${address}`}
                  onChange={(e) => setAddress(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل العنوان الوطني للشركة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.address && true} />}
                />
                {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='IBAN'>
                    العنوان الوطني (بالعربي)
                </Label>
                <Controller
                  id='address_ar'
                  name='address_ar'
                  value = {`${address_ar}`}
                  // onChange={(e) => setAddress(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='أدخل العنوان الوطني للشركة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.address_ar && true} />}
                />
                {errors.address_ar && <FormFeedback>{errors.address_ar.message}</FormFeedback>}

              </Col>

              <div className="col-md-6 col-12 p-0 m-0">
                <UploadElementDataV2 render_pdf={(files2.length > 0| fileUrl2!=`${main_url}null`) & render_pdf_element} fileUrl={fileUrl2} fileUrlExists={fileUrlExists2} main='محضر الإستلام' handleRemoveAllFiles={handleRemoveAllFiles2} files={files2} setFiles={setFiles2}/>
              </div>
            </Row>
          </div>

          <div className="mt-5 pt-4">
            <hr className="mt-5"></hr>
          </div>

          <div className="row flex-column-reverse flex-sm-row">
            <Col sm='6' className='mb-4'></Col>
            <Col sm='3' className='mb-4'>
              <Button href="/companies" className='text-center btn-style background-A0A8B3 color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px' color='white' outline >
                إلغاء
              </Button>
            </Col>
            <Col sm='3' className='mb-4'>
              <Button className={((files2.length > 0| fileUrl2!=`${main_url}null`) & nameValidation & nameValidation_ar & phone_numberValidation & emailValidation & addressValidation & addressValidation_ar) ? 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-A6223D' : 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-FFCCD7'} color='white' outline type='submit'> حفظ  </Button>
              
            </Col>
          </div>
        </Form>

        {/* end  car details component */}

      </div>
    </div>
  )
}

export default AddCar
