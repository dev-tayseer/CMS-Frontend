// ** React Imports
import React, { Fragment, useState, useEffect, useRef ,useContext } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";
import axios from 'axios'

import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"
import { useNavigate  } from "react-router-dom"


import AlertElement from "../components/AlertElement"
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2,Eye,EyeSplash } from '../components/icons/all_icons'

import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { selectThemeColors } from '@utils'
import * as yup from 'yup'
import $ from 'jquery'
import closeX from "@src/assets/images/svg/closeX.svg"
import eye from "@src/assets/images/svg/eye.svg"
import eyeSplash from "@src/assets/images/svg/eyeSplash.svg"

import AsyncSelect from 'react-select/async'


// {/* car header component  */}
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import Arrows from "@src/assets/images/svg/Arrows.svg"
// {/* end car header component  */}
// {/* car details row component */}
import arrowDetails from "@src/assets/images/svg/arrowDetails.svg"
import { isValidDate } from '@fullcalendar/core'
import { yupResolver } from '@hookform/resolvers/yup'
import FormStrap from 'react-bootstrap/Form'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


// {/* end car details row component */}

const AddEmployee = () => {
  const [inputs, setInputs] = useState({})
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  // const [inputs, setInputs] = useState({
  //   name:"ahmed"
  // })

  const [showAlert, setShowAlert] = useState(false)

  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")

  const [errorsAll, seterrorsAll] = useState(null)
  const [password, setPassword] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [roleError, setRoleError] = useState("")

  const add = useRef(true)

  const [nameValidation, setNameValidation] = useState(false)
  const [phone_numberValidation, setPhone_numberValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [IBANValidation, setIBANValidation] = useState(false)

  const [name, setName] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [email, setEmail] = useState("")
  const [IBAN, setIBAN] = useState("")
  const [role, setRole] = useState("")
  const [user_Id, setUser_Id] = useState("")

  // password validation messages
  const [capitalLetters, setCapitalLetters] = useState(false)
  const [smallLetters, setSmallLetters] = useState(false)
  const [symbol, setSymbol] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [lengthEight, setLengthEight] = useState(false)

  // show hide password
  const [passwordType, setPasswordType] = useState("password")
  const [confirmPasswordType, setConfirmPasswordType] = useState("password")
  const [passwordStrength, setPasswordStrength] = useState(false)
  const [passwordToggler, setPasswordToggler] = useState(true)
  const [confirmPasswordToggler, setConfirmPasswordToggler] = useState(true)


  const ref = useRef("")
  const navigate = useNavigate()

  const getUserById = async (user_id) => {
    setLoaderShow(true)
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }

    try {
      const result = await axios.get(`${domain_url}/get-user?user_id=${user_id}`, config)
      if (result.status === 200) {
        // console.log(result)
        const data = result.data.data
        // console.log(data, "0000000")
        // console.log(data, "data company")
        setName(data['name'])
        setIBAN(data['bank_iban'])
        setEmail(data['email'])
        setRole(data["role_id"])
        // setChasis_num(data.chassis_number)


      } else {

      }
    } catch (e) {
      console.log(e, "error happened")
    }
    setLoaderShow(false)
  }

  const handleClick = async () => {
    if (password === ""){
      setPasswordError("الرجاء إدخال كلمة المرور")
    }
    if (confirmPwd === ""){
      setConfirmPasswordError("الرجاء تأكيد كلمة المرور")
    }
    if (role === ""){
      // const radio_collect_employee = document.getElementById(radio_collect_employee)
      // radio_collect_employee.classList.add("invalid-feedback")
      // setRoleError("الرجاء إختيار صلاحية موظف")
    }
  }

  const togglePassword = async () => {
    if (passwordType === "password") {
      setPasswordType("text")
      setPasswordToggler(false)
    } else {
      setPasswordType("password")
      setPasswordToggler(true)

    }
  }

  const toggleConfirmPassword = async () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text")
      setConfirmPasswordToggler(false)
    } else {
      setConfirmPasswordType("password")
      setConfirmPasswordToggler(true)
    }
  }

  const handleRole1 = async () => {
    setRole("1")
    const radio_admin_employee = document.getElementById("radio_admin_employee")
    radio_admin_employee.classList.add("checkRole")
  }
  
  useEffect(() => {
    
    try {
      const search = window.location.search
      const params = new URLSearchParams(search)
      const userId = params.get('id')
      setUser_Id(userId)
      if (userId === null || userId === "") {
        add.current = true
        setEmail("")
      } else {
        add.current = false
        // send request to get data of car
        console.log(add, "5455")
        getUserById(userId)

      }
    } catch (e) {
      console.log('Error', e)
      // setAdd(true)
    }
    const nav_links = document.getElementsByClassName("lnk")
    for (let i = 0; i < nav_links.length; i++) {
      nav_links[i].classList.remove("active")
   }
   setTimeout(() => {
    // console.log(document.getElementsByClassName("formsubmit")[0])
    // document.getElementsByClassName("formsubmit")[0].submit()
  }, 3000)

  }, [])

  useEffect(() => {
    const name_input = document.getElementsByName("name")[0]
    name_input.value = name
  }, [name])

  useEffect(() => {
    const email_input = document.getElementsByName("email")[0]
    email_input.value = email
  }, [email])

  useEffect(() => {
    const IBAN_input = document.getElementsByName("IBAN")[0]
    IBAN_input.value = IBAN
  }, [IBAN])
  // useEffect(() => {
  //   setName("5")
  // }, [])
  
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
  
  const checkCharactersOnlyWithLength = (v) => {
    const value = v
    // const regex = new RegExp(/[\p{Letter}\p{Mark}]+/gu)
    // const regex = new RegExp('[a-zA-Z ء-ي]+$')
    const regex = new RegExp('[a-zA-Zء-ي ]+$')


    return regex.test(value)
  }
  const checkSpaceCharacters = (v) => {
    const value = v
    // const regex = new RegExp(/[\p{Letter}\p{Mark}]+/gu)
    const regex = new RegExp('^[ ]+$')

    return regex.test(value)
  }
  const checkLengthGreeterThanTwo = (v) => {
    const value = v
    // const regex = new RegExp(/[\p{Letter}\p{Mark}]+/gu)
    const regex = new RegExp('[a-zA-Z ء-ي]+$')

    return regex.test(value) && value.length > 2
  }

  const checkNumbersOnly = (v) => {
    const value = v
    const regex = new RegExp('^[0-9]*$')
    console.log(regex.test(value))
    return regex.test(value)

  }

  const checkSpaceonly = (v) => {
    const value = v
    const regex = new RegExp('^[]*$')
    console.log(regex.test(value))
    return regex.test(value)

  }
  const regexArabic = (v) => {
    const value = v
    const regex = new RegExp('^[ء-ي ]+$')
    return regex.test(value)

  }

  const checkValidSaudiPhoneNumber = (v) => {

    const value = v
    const regex = new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)
    return regex.test(value)
    // test cases 
    // return regex.test('0501234567') valid test case
    // regex.test('0521234567') not valid test case
    
  }
  const checkInputUndefined = (value) => {
    if (value === undefined) {
      return true
    } else {
      return false
    }
  }
  const checkValidEmail = (v) => {
    const value = v
    const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/    ///\S+@\S+\.\S+/
    return re.test(value)
  }

  const checkIBAN = (v) => {
    const value = v 
    if (checkNumbersOnly(value) & value.length === 22) {
      return true
    } else {
      return false
    }
  }

  const checkArabicPassword = (v) => {
    const value = v 
    const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$&+,:;=?@#|'<>.^*()%!-._£€¥¢©®™~¿{}`÷\¦¬×§¶])")
    return re.test(value)
  }
  
  const checkPasswordStrength = (v) => {
    const value = v 
    // const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    // const re = new RegExp("^[\u0621-\u064A\u0660-\u0669 ]+$")
    if (checkCapital(value) & checkSmall(value) & checkSymbol(value) & checkNumbers(value) & value.length >= 8 ){
      console.log("TRUE ..")
      return true
    } else {
      console.log("FALSE..")
      return false
    }
  }

  const checkValidPassword = (v) => {
    const value = v 
    const re = /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-._£€¥¢©®™~¿{}`÷\¦¬×§¶]+$/;
    const found = value.match(re);
    if (value==found)
      return true
    else
      return false
  }


  const checkArabic = (v) => {
    const value = v 
    const re = new RegExp("^(?=.*?[ء-ي])")
    console.log(re.test(value), "re")
    return re.test(value)
  }

  const checkCapital = (v) => {
    const value = v 
    const re = new RegExp("^(?=.*?[A-Z])")
    console.log(re.test(value), "re")
    return re.test(value)
  }
  

  const checkSmall = (v) => {
    const value = v 
    const re = new RegExp("^(?=.*?[a-z])")
    return re.test(value)
  }
  const checkSymbol = (v) => {
    const value = v 
    const re = new RegExp("^(?=.*?[$&+,:;=?@#|؟'<>.^*()%!-._£€¥¢©®™~¿{}`÷\¦¬×§¶])")
    return re.test(value)
  }
  const checkNumbers = (v) => {
    const value = v 
    const re = new RegExp("^(?=.*?[0-9])")
    return re.test(value)
  }
  const checkValidationOfPassword = (e) => {
    
    setPassword(e.target.value)

    if (e.target.value === null | e.target.value === "") {
      setPasswordError("الرجاء إدخال كلمة المرور بشكل صحيح ")
    }
    if(!checkCapital(e.target.value)) {
      setCapitalLetters(true)
    } else {
      setCapitalLetters(false)
    }
    if(!checkSmall(e.target.value)) {
      setSmallLetters(true)
      
    } else {
      setSmallLetters(false)
    }
    if(!checkNumbers(e.target.value)) {
      setNumbers(true)
    } else {
      setNumbers(false)
    }
    if(!checkSymbol(e.target.value)) {
      setSymbol(true)
    } else {
      setSymbol(false)
    }
    if(e.target.value.length < 8) {
      setLengthEight(true)
    } else {
      setLengthEight(false)
    }
    if (checkPasswordStrength(e.target.value)) {
      setPasswordStrength(true)
      if (confirmPwd !== e.target.value) {
        // setPasswordError("كلمة المرور غير متطابقة")
        setConfirmPasswordError("كلمة المرور غير متطابقة")
        setPasswordError("")


    } else {
        setPasswordError("")
        setConfirmPasswordError("")

      }

    } else {
      console.log("else ...")
      // setPasswordError("الرجاء إدخال كلمة المرور بشكل صحيح")
    }

  }
  const checkValidationOfConfirmPassword = (e) => {
    setConfirmPwd(e.target.value)
    // if (checkPasswordStrength(e.target.value)) {
      if (e.target.value === "" | e.target.value === null) {
        setConfirmPasswordError("الرجاء تأكيد كلمة المرور")

      }
      if (password !== e.target.value) {
        setConfirmPasswordError("كلمة المرور غير متطابقة")
        // setPasswordError("كلمة المرور غير متطابقة")
    } else {
      setConfirmPasswordError("")
      setPasswordError("")
      }
    // } else {
    //   setConfirmPasswordError("الرجاء إدخال كلمة المرور بشكل صحيح")

    // }


  }
  let SignupSchema
  if (add['current']) {
    SignupSchema = 
    yup.object().shape({
    name: yup.string().test({
      name: 'name',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = name
        }
        setName(value)
        if (value === '' | value === null | checkSpaceCharacters(value)) {
          console.log("1")
          setNameValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if (!checkCharactersOnlyWithLength(value)) {
          console.log("2")

          setNameValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
        } else if (value === '' | value === null | !checkLengthGreeterThanTwo(value) | checkSpaceonly(value)) {
          console.log("3")

          setNameValidation(false)
          return ctx.createError({ message: 'يجب ان لا يقل الاسم عن 3 أحرف' })
        }
        setNameValidation(true)
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
        if (value === null | value ==='' ) {
          setPhone_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })          
        } else {
          value = checkValidSaudiPhoneNumber(value)
          if (value === false) {
            setPhone_numberValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم الجوال بشكل صحيح' })
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
        if (value === null | value ==='' ) {
          setPhone_numberValidation(false)
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
    
    IBAN: yup.string().test({
      name: 'IBAN',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = IBAN
        }
        setIBAN(value)
        if (value === '' | value === null ) {
          console.log(value==='', ".......iban.3.....")

          setIBANValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkIBAN(value)
          if (value === false) {
            setIBANValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم الحساب المصرفي الدولي (IBAN) بشكل صحيح' })
          }

        }
        setIBANValidation(true)
        return true

      }
    })
    
  })
  } else {
        SignupSchema = 
    yup.object().shape({
      name: yup.string().test({
        name: 'name',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = name
          }
          setName(value)
          if (value === '' | value === null | checkSpaceCharacters(value)) {
            console.log("1")
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else if (value === '' | value === null | !checkCharactersOnlyWithLength(value)) {
            console.log("2")
  
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
          } else if (value === '' | value === null | !checkLengthGreeterThanTwo(value)) {
            console.log("3")
  
            setNameValidation(false)
            return ctx.createError({ message: 'يجب ان لا يقل الاسم عن 3 أحرف' })
          }
          setNameValidation(true)
          return true
        }
      }),
   
    // phone_number: yup.string().test({
    //   name: 'phone_number',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = phone_number
    //     }
    //     setPhone_number(value)
    //     value = checkValidSaudiPhoneNumber(value)
    //     if (value === false) {
    //       setPhone_numberValidation(false)
    //       return ctx.createError({ message: 'الرجاء إدخال رقم الجوال بشكل صحيح' })
    //     }
    //     setPhone_numberValidation(true)
    //     return true
    //   }
    // }),
   
    
    email: yup.string().test({
      name: 'email',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = email
        }
        setEmail(value)
        if (value === null | value ==='' ) {
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
    
    IBAN: yup.string().test({
      name: 'IBAN',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = IBAN
        }
        setIBAN(value)
        if (value === '' | value === null ) {
          console.log(value==='', ".......iban.3.....")

          setIBANValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else {
          value = checkIBAN(value)
          if (value === false) {
            setIBANValidation(false)
            return ctx.createError({ message: 'الرجاء إدخال رقم الحساب المصرفي الدولي (IBAN) بشكل صحيح' })
          }

        }
        setIBANValidation(true)
        return true

      }
    })


  })
  }

  const saveDataEmployee = async (params) => {
    setLoaderShow(true)
    console.log("saving data ........")
    const token = localStorage.getItem("token")
    console.log(token, "token")
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }
    
    console.log(params, "parmas")
    
    try {
      let result = ""
      console.log(add, "+++++")
      if (add['current'] === true) {
        result = await axios.post(`${domain_url}/add-user`, params, config)
      } else {
        console.log("else")
         result = await axios.post(`${domain_url}/edit-user`, params, config)
      }
      const data = result.data
      if (data.status === 200) {
        console.log("added company")
        setTypeAlert("Success")
        setTitleAlert("تم إضافة الشركة بنجاح.")
        setHeadAlert("")
        setShowAlert(true)
        if (add['current'] === true) {
          navigate('/employees?success=added')
        } else {
          navigate('/employees?success=edited')

        }
  
    } else {
      console.log("400 error happened")
      setTypeAlert("Fail")
      setTitleAlert(`${data["message"]}`)
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
  
    }

    } catch (e) {
      console.log(e)
      setTypeAlert("Fail")
      setTitleAlert("لم يتم إضافة الشركة بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
    }
    setLoaderShow(false)
  }

  // ** Hooks
//   const defaultValues = {
//     name: "ss",
//     email: "sss",
//     IBAN: "052454"
// }

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })


  const onSubmit = data => {
    console.log("submiting....")
    console.log(name, email, IBAN, role, "data ....")
    // saveDataEmployee
      // {
      //   "phone" : "966511111218",
      //   "password" : "12345678@Am",
      //   "bank_iban" : "12345678@Am",
      //   "name" : "mahmoud",
      //   "email" : "f@f22.com",
      //   "company_id" : 1,
      //   "role_id": 2
      // }
      // add-user
      
    if (add['current']) {
      if (nameValidation & phone_numberValidation & emailValidation & IBANValidation & passwordError === '' & confirmPasswordError === '' & roleError === '') {
        const phone = phone_number.slice(1, 10)
        const params = {phone : `966${phone}`, password : `${password}`, bank_iban : `${IBAN}`, name:`${name}`, email:`${email}`, company_id:1, role_id:`${role}` }
          saveDataEmployee(params)
        }
    } else {
      if (nameValidation & emailValidation & IBANValidation & roleError === '') {
        const params = {user_id:`${user_Id}`, bank_iban : `${IBAN}`, name:`${name}`, email:`${email}`, role_id:`${role}` }
        saveDataEmployee(params)

      }


    }
  }

  return (
    <div className="theme-content">
      <div className="container container2 ps-md-0 pe-md-0">

        {/* car header component  */}
        {(add['current']) ? <Breadcrumbs icon={homeIcon} urlMain="/employees" Arrows={Arrows} main={'الموظفين'} second={'إضافة موظف'} /> : <Breadcrumbs icon={homeIcon} urlMain="/employees" Arrows={Arrows} main={'الموظفين'} second={'تعديل بيانات موظف'} /> }
        
        {/* end car header component  */}

        {/* car details row component */}
        {(add['current']) ? <DetailsInfo image={arrowDetails} title={'إضافة موظف'} /> : <DetailsInfo image={arrowDetails} title={'تعديل بيانات موظف'} /> }
        {/*end car details row component */}
        <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        {/* car details component */}
        <Form className='formsubmit'  onSubmit={handleSubmit(onSubmit)} >
          <div className="container-fluid mt-5 pt-2 background-FFFFFF borderRadius-8">
            <Row>
              <p className="font-Almarai f-w-800 f-s-20px color-1F2733 p-4">بيانات الموظف</p>
            </Row>
            <Row className='ps-3'>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='name'>
                    الاسم بالكامل 
                </Label>
                <Controller
                  id='name'
                  name='name'
                  value={`${name}`}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='ادخل اسم الموظف كامل' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
                />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

              </Col>
              { add['current'] && (
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='phone_number'>
                رقم الجوال
                </Label>
                <Controller
                  id='phone_number'
                  name='phone_number'
                  value={`${phone_number}`}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='ادخل رقم الجوال الخاص بالموظف' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.phone_number && true} />}
                />
                {errors.phone_number && <FormFeedback>{errors.phone_number.message}</FormFeedback>}

              </Col>
              )
              }
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='email'>
                البريد الإلكتروني
                </Label>
                <Controller
                  id='email'
                  name='email'
                  value={`${email}`}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='ادخل البريد الإلكتروني الخاص بالموظف' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.email && true} />}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='IBAN'>
                رقم الحساب البنكي الدولي (IBAN)
                </Label>
                <div className='div'><span className='sa'>SA</span>
                <Controller
                  id='IBAN'
                  name='IBAN'
                  value={`${IBAN}`}
                  control={control}
                  render={({ field }) => <Input {...field}  placeholder='ادخل رقم الحساب البنكي الدولي الخاص بالموظف' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.IBAN && true} />}
                />
                {errors.IBAN  && <FormFeedback>{errors.IBAN.message}</FormFeedback>}

                </div>
           

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
              <Row className='ms-0'>
                
                <Label className="form-label font-Almarai ps-0  f-w-700 f-s-12px color-1F2733" for="radio">
                الوظيفة 
                </Label>
                <Col sm='4' className='p-0'>
                <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border py-3 ${role === "2" ? 'checkRole' : ''}`}>
                  <Label className="form-check-label f-w-700 f-s-12px color-4D5761 md-2 ms-4" for="radio_collect_employee">
                  موظف سحب
                  </Label>
                    
                      <Input
                      type="radio"
                      id="radio_collect_employee"
                      name="employee_type"
                      className={`float-end me-4 color-3261A8 ${role === "2" ? 'checkRole' : ''}`}
                      checked = {role === "2"}
                      onClick={(e) => setRole("2")}

                      />
                
                </Col>
                </Col>
                <Col sm='4' className='ps-md-2 pe-md-2 p-0'>
                  <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border py-3 ${role === "3" ? 'checkRole' : ''}`}>
                  <Label className="form-check-label f-w-700 f-s-12px color-4D5761 ms-4" for="radio_restore_employee">
                  موظف إستعادة
                  </Label>
                  <Input
                    type="radio"
                    id="radio_restore_employee"
                    name="employee_type"
                    className={`float-end me-4 color-3261A8 ${role === "3" ? 'checkRole' : ''}`}
                    checked = {role === "3"}
                    onClick={(e) => setRole("3")}
                   

                   />
                  </Col>
                </Col>
                <Col sm='4' className='ps-md-2 pe-md-2 p-0'>
                  <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border py-3 ${role === "1" ? 'checkRole' : ''}`}>
                  <Label className={`form-check-label f-w-700 f-s-12px color-4D5761 ms-4 `} for="radio_admin_employee">
                    مشرف
                  </Label>
                  <Input
                    type="radio"
                    id="radio_admin_employee"
                    name="employee_type"
                    className={`float-end me-4 color-3261A8 `} 
                    checked = {role === "1"}
                    onClick={(e) => {setRole("1")}}
                   

                   />
                  </Col>
                  {/* <div className="invalid-feedback">{roleError}</div> */}

                </Col>
              </Row>

              </Col>


            </Row>
          </div>
          {add['current'] && (
          <div className="container-fluid mt-4 pt-2 background-FFFFFF borderRadius-8">
            <Row>
              <p className="font-Almarai f-w-800 f-s-20px color-1F2733 ps-4 pt-4">
              كلمة السر
              </p>
            </Row>
            <Row className='ps-3'>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                  <div className="form-group">
                    <Label className="form-label font-Almarai ps-0  f-w-700 f-s-12px color-1F2733" for="password">
                    كلمة المرور 
                    </Label>
                    <div className='input-container'>
                    {passwordToggler ? <img src={eye} onClick = {togglePassword} className="togglePassword"/> : <img src={eyeSplash} onClick = {togglePassword} className="togglePassword splash"/>}
                    <input
                    name="password"
                    type= {passwordType}
                    onChange={(e) => checkValidationOfPassword(e)}
                    // {...register('password')}
                    className={`form-control height-48 f-s-12px f-w-700 ${passwordError ? 'is-invalid' : ''}`}
                  />
                   <div className="invalid-feedback">{passwordError}</div>
                  </div>
    
                </div>
              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <div className="form-group">
                
                  <Label className="form-label font-Almarai ps-0  f-w-700 f-s-12px color-1F2733" for="confirmPwd">
                  تأكيد كلمة المرور
                  </Label>
                  <div className='input-container'>
                  {confirmPasswordToggler ? <img src={eye} onClick = {toggleConfirmPassword} className="togglePassword"/> : <img src={eyeSplash} onClick = {toggleConfirmPassword} className="togglePassword"/> }

                  <input
                  name="confirmPwd"
                  type={confirmPasswordType}
                  onChange={(e) => checkValidationOfConfirmPassword(e)}
                  // {...register('confirmPwd')}
                  className={`form-control height-48 f-s-12px f-w-700 ${confirmPasswordError ? 'is-invalid' : ''}`}
                />
               <div className="invalid-feedback">{confirmPasswordError}</div>

              </div>
          </div>
              </Col>
            </Row>
            {passwordStrength === false && (
            <Row className='ps-3 pt-3  errorPassword ms-3 me-1 '>
              
                {capitalLetters && (
                <p>
                <img src={closeX} />
                  <span className='ps-2 validationPassword'>يحتوي على أحرف كبيرة</span>
                </p>
                )}
                {smallLetters && (
                <p>
                   <img src={closeX} />

                  <span className='ps-2 validationPassword'>يحتوي على أحرف صغيره</span>
                </p>
                )}
                {symbol && (
                <p>
                  <img src={closeX} />
                  <span className='ps-2 validationPassword'>يحتوي على رموز</span>
                </p>
                )}
                {numbers && (
                <p>
                  <img src={closeX} />
                  <span className='ps-2 validationPassword'>يحتوي على أرقام</span>
                </p>
                )}
                {lengthEight && (
                <p>
                  <img src={closeX} />
                  <span className='ps-2 validationPassword'>لا يقل عن 8</span>
                </p>
                )}
               

            </Row>
            )}
          </div>
          )}
          <div className="mt-5 pt-4 ">
            <hr className="mt-5"></hr>
          </div>

          <div className="row flex-column-reverse flex-sm-row">
            <Col sm='6' className='mb-4'></Col>
            <Col sm='3' className='mb-4'>
              <Button href="/employees" className='text-center btn-style background-A0A8B3 color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px' color='white' outline >
                إلغاء
              </Button>
            </Col>
            <Col sm='3' className='mb-4'>
              { (add['current']) ? <Button className={(nameValidation & phone_numberValidation & emailValidation & IBANValidation  & passwordError === '' & confirmPasswordError === '' & roleError === '') ? 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-A6223D' : 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-FFCCD7'} color='white' outline type='submit' onClick={handleClick}> حفظ  </Button> : <Button className={(nameValidation & emailValidation & IBANValidation & roleError === '') ? 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-A6223D' : 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-FFCCD7'} color='white' outline type='submit'>حفظ</Button> }
              
            </Col>
          </div>
        </Form>

        {/* end  car details component */}

      </div>

    </div>
  )
}

export default AddEmployee
