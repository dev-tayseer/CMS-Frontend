
// ** React Imports
import { Fragment, useState, useEffect, useRef  , memo, useContext } from 'react'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'reactstrap'
import {LoaderContext, LoaderProvider} from "../../../utility/context/LoaderContext";


import axios from 'axios'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url
import eye from "@src/assets/images/svg/eye.svg"
import eyeSplash from "@src/assets/images/svg/eyeSplash.svg"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Button, Input, Label, Row, Col,FormFeedback } from 'reactstrap'
// import AlertElement from "../AlertElement"

import { element } from 'prop-types'
import AsyncSelect from 'react-select/async'
import { selectThemeColors } from '@utils'



 export default function FormComponent({handleCloseEditUser,RowId,RowEmail,RowName,RowPhone,RowRole,setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert,reload_table}){
  // const [showAlert, setShowAlert] = useState(false)
  // const {loader_show, setLoaderShow} = useContext(LoaderProvider);

  // const [titleAlert, setTitleAlert] = useState("")
  // const [headAlert, setHeadAlert] = useState("")
  // const [typeAlert, setTypeAlert] = useState("")

    const [nameValidation, setNameValidation] = useState(false)
    const [usernameValidation, setusernameValidation] = useState(false)
    const [phoneValidation, setphoneValidation] = useState(false)

    
    const [emailValidation, setEmailValidation] = useState(false)
    const [name, setName] = useState("")
    const [username, setusername] = useState("")
    const [phone, setphone] = useState("")

    const [email, setEmail] = useState("")
    const [edit, setEdit] = useState(false)


    // const [errorsAll, seterrorsAll] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [passwordType, setPasswordType] = useState("password")
    const [confirmPasswordType, setConfirmPasswordType] = useState("password")
    const [passwordStrength, setPasswordStrength] = useState(false)
    const [passwordToggler, setPasswordToggler] = useState(true)
    const [confirmPasswordToggler, setConfirmPasswordToggler] = useState(true)

    const [roleValidation, setroleValidation] = useState(false)
    const [roleValueId, setroleValueId] = useState("")
    const [roleData, setroleData] = useState([])

    const [role_Id, setrole_Id] = useState("")
    const [InternalError, setInternalError] = useState(false)
    const [InternalErrorMessage, setInternalErrorMessage] = useState("")

    


    const [roleValue, setroleValue] = useState({
      id: 1,
      label: "اختر من القائمة",
      value: "اختر من القائمة"
    })
  
    const add = useRef(true)
    add.current = true

    useEffect(() => {
      console.log(reload_table,"reload")

      console.log(setShowAlert,"000000")
      console.log(typeof RowId,RowId,"***","type")
    if(typeof RowId == "number"){
      console.log("edititi")
      setEdit(true)
      console.log(RowPhone,"222")
      setEmail(RowEmail)
      setName(RowName)
      setphone(RowPhone)
      console.log(RowRole,"ahmed")
      if(RowRole == "" || RowRole == undefined || RowRole == undefined){

      } else {

        setroleValue({
          id:RowRole.id,
          label:RowRole.name,
          value:RowRole.name

        })

      }


      
    } else {
      console.log("false..")
      setEdit(false)
    }
    },[]);

    useEffect(() => {
      const name_input = document.getElementsByName("name")[0]
      name_input.value = name
    }, [name])

    useEffect(() => {
      const name_input = document.getElementsByName("email")[0]
      name_input.value = email
    }, [email])

    useEffect(() => {
      const phone_input = document.getElementsByName("phone")[0]
      phone_input.value = phone
    }, [phone])



    const handleClick = async () => {
      console.log("handle click ..")
      if (password === ""){
        setPasswordError("الرجاء إدخال كلمة المرور")
      }
      if (confirmPwd === ""){
        setConfirmPasswordError("الرجاء تأكيد كلمة المرور")
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

    const checkValidationOfPassword = (e) => {
    
      setPassword(e.target.value)
  
      if (e.target.value === null | e.target.value === "") {
        setPasswordError("الرجاء إدخال كلمة المرور بشكل صحيح ")
      }

      else if (!checkPasswordStrength(e.target.value)) {
        setPasswordError("الرجاء إدخال كلمة مرور قوية ")
      }
        
      else if (confirmPwd !== e.target.value) {
          // setPasswordError("كلمة المرور غير متطابقة")
          setConfirmPasswordError("كلمة المرور غير متطابقة")
          setPasswordError("")
  
        }
      
      
       else {
          setPasswordError("")
          setConfirmPasswordError("")
  
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

    const regexArabicEnglish = (v) => {
      const value = v
      const regex = new RegExp('^[a-zA-Zء-ي ]+$')
      return regex.test(value)
  
    }
  
  
    const checkValidEmail = (v) => {
      const value = v
      const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/    ///\S+@\S+\.\S+/
      return re.test(value)
    }
    const regexArabic = (v) => {
      const value = v
      const regex = new RegExp('^[ء-ي )(]+$')
      return regex.test(value)
  
    }
  
    const checkInputUndefined = (value) => {
      if (value === undefined) {
        return true
      } else {
        return false
      }
    }
  
    const checkSpaceCharacters = (v) => {
      const value = v
      const regex = new RegExp('^[ ]+$')
      return regex.test(value)
  
    }

    const checkValidSaudiPhoneNumber = (v) => {

      const value = v
      const regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)
      return regex.test(value)
      // test cases 
      // return regex.test('0501234567') valid test case
      // regex.test('0521234567') not valid test case
      
    }


    const checkusernameValidation = (v) => {

      const value = v
      const regex = new RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      return regex.test(value)
      // test cases 
      // return regex.test('0501234567') valid test case
      // regex.test('0521234567') not valid test case
      
    }

    const SelectWithValidation = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB  }) => {
   
      return (
        <>
          <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for={id_name}>
            {title}
          </Label>
          <Controller
            id={id_name}
            name={id_name}
            
            control={control}
            className="hany"
            render={({ field }) => (
              <AsyncSelect
                defaultValue = {defaultValue}
                {...field}
                defaultOptions
                isClearable
                id={id_name}
                name={id_name}
                classNamePrefix='select-white'
                placeholder='اختر من القائمة'
                loadOptions={loadOptionsDB}
                theme={selectThemeColors}
                isSearchable={false}
                
                className={errors_check ? 'react-select h-60 f-s-12px f-w-700 bg-F7FAF7 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700    h-60 f-s-12px w-100'}
              />)
            }
          />
          {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
        </>
      )
    }
    
  
    let SignupSchema = ({})
    console.log(RowId==null,"***")

    if( edit){
      console.log("true ...")
      console.log(RowId,"now")


    SignupSchema = yup.object().shape({
      name: yup.string().test({
        name: 'name',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value," ........... +++++++++ ")
          if (checkInputUndefined(value)) {
            value = name
          }
          setName(value)
          if (value === '' | value === null) {
            setNameValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!regexArabicEnglish(value)  | checkSpaceCharacters(value)) {
              setNameValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
            }
          }
          setNameValidation(true)
          return true
        }
      }),
      phone: yup.string().test({
        name: 'phone',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value," ........... +++++++++ ")
          if (checkInputUndefined(value)) {
            value = phone
          }
          setphone(value)
          if (value === '' | value === null) {
            setphoneValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!checkValidSaudiPhoneNumber(value)  | checkSpaceCharacters(value)) {
              setphoneValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال رقم الجوال بشكل صحيح' })
            }
          }
          setphoneValidation(true)
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
      role: yup.mixed().test({
        name: 'role',
        skipAbsent: true,
        test(value, ctx) {
          if (checkInputUndefined(value)) {
            value = roleValue
            console.log(value, "+666666666")
            if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
              setroleValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
                setroleValueId(value.id)
                } catch (e) {
                  console.log("1")
                }
            }
          }
          if (value === '' | value === null) {
            setroleValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
            setroleValueId(value.id)
            } catch (e) {
              console.log("1")
            }
          }
          setroleValidation(true)
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
            console.log(value," ........... +++++++++ ")
            if (checkInputUndefined(value)) {
              value = name
            }
            setName(value)
            if (value === '' | value === null) {
              setNameValidation(false)
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            } else {
              if (!regexArabicEnglish(value)  | checkSpaceCharacters(value)) {
                setNameValidation(false)
                return ctx.createError({ message: 'الرجاء إدخال الاسم بشكل صحيح' })
              }
            }
            setNameValidation(true)
            return true
          }
        }),
        username: yup.string().test({
          name: 'username',
          skipAbsent: true,
          test(value, ctx) {
            console.log(value," ........... +++++++++ ")
            if (checkInputUndefined(value)) {
              value = username
            }
            setusername(value)
            if (value === '' | value === null) {
              setusernameValidation(false)
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            } else {
              if (!checkusernameValidation(value)  | checkSpaceCharacters(value)) {
                setusernameValidation(false)
                return ctx.createError({ message: 'الرجاء إدخال اسم المستخدم بشكل صحيح' })
              }
            }
            setusernameValidation(true)
            return true
          }
        }),
        phone: yup.string().test({
          name: 'phone',
          skipAbsent: true,
          test(value, ctx) {
            console.log(value," ........... +++++++++ ")
            if (checkInputUndefined(value)) {
              value = phone
            }
            setphone(value)
            if (value === '' | value === null) {
              setphoneValidation(false)
              return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
            } else {
              if (!checkValidSaudiPhoneNumber(value)  | checkSpaceCharacters(value)) {
                setphoneValidation(false)
                return ctx.createError({ message: 'الرجاء إدخال رقم الجوال بشكل صحيح' })
              }
            }
            setphoneValidation(true)
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
        role: yup.mixed().test({
          name: 'role',
          skipAbsent: true,
          test(value, ctx) {
            if (checkInputUndefined(value)) {
              value = roleValue
              console.log(value, "+666666666")
              if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
                setroleValidation(false)
                return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
              } else {
                try {
                  setroleValueId(value.id)
                  } catch (e) {
                    console.log("1")
                  }
              }
            }
            if (value === '' | value === null) {
              setroleValidation(false)
              return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
            } else {
              try {
              setroleValueId(value.id)
              } catch (e) {
                console.log("1")
              }
            }
            setroleValidation(true)
            return true
          }
        }),
      })
    }
   
     
  
  
   
  
      const saveDataCompany = async () => {
      console.log("saving ........ ")
      

      var data = new FormData();
      if(edit){
        data.append('email', email);
        data.append('full_name', name );
        data.append('phone', phone);
        data.append('role_id', roleValueId)
       

      } else {

        console.log("handleclise")

        data.append('email', email);
        data.append('full_name', name );
        data.append('phone', phone);
        // data.append("passworsd",password)
        data.append("username",username)
        data.append("phone",phone)
        data.append('role_id', roleValueId)
        // handleCloseEditUser(false)



      }

      const token = localStorage.getItem("token")
      

      if(edit){
      var config = {
        method: 'put',
        url: `${domain_url}/users/addadmin?id=${RowId}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
    } else {
      var config = {
        method: 'post',
        url: `${domain_url}/users/addadmin`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
    }
      
      axios(config)
      .then(function (response) {
        console.log(response.data[0],"resp");
        console.log(reload_table,"relad")
        if (response.data[0]["success"] == 0) {
          console.log("not 2000")
          // setTypeAlert("Fail")
          // setTitleAlert(`${response.data[0]["message:"]}`)
          // setHeadAlert("حدث خطأ")
          // setShowAlert(true)
          setInternalError(true)
          setInternalErrorMessage(`${response.data[0]["message:"]}`)
          // try{
          //   reload_table()
          // } catch(e){
          //   console.log(e,"error reload")
          // }

        }
        
        
        
        else {

          setTypeAlert("Success")
          setTitleAlert(`${response.data[0]["message:"]}`)
          setHeadAlert("  " )
          setShowAlert(true)
          handleCloseEditUser(true)
          try{
            reload_table()
          } catch(e){
            console.log(e,"error reload")
            // window.location.reload();
          }
          }
        
      })


   
      .catch(function (response) {
        setTypeAlert("Fail")
        setTitleAlert(`لم يتم إضافة المستخدم بنجاح`)
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        try{
          reload_table()
        } catch(e){
          window.location.reload();
        }
      })
    //   setLoaderShow(true)
    //   const token = localStorage.getItem("token")
      
      
    //   const bodyFormData = new FormData()
     
  
  
  
    //   bodyFormData.append('email', email)
    //   bodyFormData.append('name', name)
      
  
      
    //   try {
       
          
  
    //       axios({
    //         method: "post",
    //         url: `${domain_url}/add-car-company`,
    //         data: bodyFormData,
    //         headers: { 
    //           "Content-Type": "multipart/form-data",
    //           Authorization: `Bearer ${token}`,
    //           "app-lng": 'ar' 
    //         }
    //       })
    //       .then(function (response) {
            
    //         if (response.data.status !== 200) {
    //           console.log("not 2000")
    //           setTypeAlert("Fail")
    //           setTitleAlert(`${response.data.message}`)
              
    //           setHeadAlert("حدث خطأ")
    //           setShowAlert(true)
    //           setLoaderShow(false)
    //         } else {
    //           setTypeAlert("Success")
    //           setTitleAlert("تم إضافة الشركة بنجاح.")
    //           setHeadAlert("")
    //           setShowAlert(true)
    //           if (add['current'] === true) {
    //           navigate('/companies?success=added')
    //           } else {
    //             navigate('/companies?success=edited')
  
    //           }
    //         }
            
    //       })
    //       .catch(function (response) {
    //         setTypeAlert("Fail")
    //         setTitleAlert(`${response.data.message}`)
    //         setHeadAlert("حدث خطأ")
    //         setShowAlert(true)
    //         setLoaderShow(false)
    //       })
    //     }   
    //    catch (e) {
    //     console.log(e)
    //     setTypeAlert("Fail")
    //     setTitleAlert("لم يتم إضافة الشركة بشكل صحيح.")
    //     setHeadAlert("حدث خطأ")
    //     setShowAlert(true)
    //     setLoaderShow(false)
    //   }
    }
  

    const loadOptionsDB_role = async () => {
      const token = localStorage.getItem("token")
  
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      if (roleData.length > 0) {
        return roleData
      } else {
      const data = await axios.get(`${domain_url}/users/dropdown`, config).then(res => {
        const role_list = []
        const result = res.data.Role
        
        result.forEach((item, index, array) => {
          role_list.push(
            {
              id: item['id'],
              value: item['name'],
              label: item['name']
            }
          )
        })
        return role_list
  
  
      })
      console.log("data .", data)
      setroleData(data)
      return data
      }
    }
  
    const {
      reset,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  
    const onSubmit = data => {
  
        if(edit){
        if ( nameValidation   &  emailValidation & phoneValidation & roleValidation) {
          saveDataCompany()
  
        } 
      } else {
        if ( nameValidation   &  emailValidation &usernameValidation & phoneValidation & roleValidation ) {
          saveDataCompany()
  
        } 
      }
        
      }
      return(
        <>
        {/* <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} /> */}

<Form  onSubmit={handleSubmit(onSubmit)}>

<div className="container-fluid mt-5 pt-2 pb-3 mb-3 background-FFFFFF borderRadius-8">


  
  <Row className=' '>
    {InternalError && (
    <div class="alert alert-dark" role="alert">
      {InternalErrorMessage}
  </div>
  )}

    <Col sm='12' className='mb-4 form-group bmd-form-group'>
      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
        الاسم
      </Label>
      <Controller
        id='name'
        name='name'
        value={`${name}`}
        onChange={(e) => setName(e.target.value)}
        control={control}
        render={({ field }) => <Input {...field}  placeholder='أدخل الاسم ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
      />
      {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

    </Col>


      {!edit &&(
    <Col sm='12' className='mb-4 form-group bmd-form-group'>
      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='username'>
        اسم المستخدم
      </Label>
      <Controller
        id='username'
        name='username'
        value={`${username}`}
        onChange={(e) => setusername(e.target.value)}
        control={control}
        render={({ field }) => <Input {...field}  placeholder='أدخل اسم المستخدم ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.username && true} />}
      />
      {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}

    </Col>
    )}


    <Col sm='12' className='mb-4 form-group bmd-form-group'>
      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='phone'>
        رقم الجوال
      </Label>
      <Controller
        id='phone'
        name='phone'
        value={`${phone}`}
        onChange={(e) => setphone(e.target.value)}
        control={control}
        render={({ field }) => <Input {...field}  placeholder='أدخل رقم الجوال ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.phone && true} />}
      />
      {errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}

    </Col>




    <Col sm='12' className='mb-4 form-group bmd-form-group'>
      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='email'>
      البريد الإلكتروني 
      </Label>
      <Controller
        id='email'
        name='email'
        value = {`${email}`}
        onChange={(e) => setEmail(e.target.value)}
        control={control}
        render={({ field }) => <Input {...field}  placeholder='أدخل البريد الإلكتروني ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.email && true} />}
      />
      {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}

    </Col>


            <Col sm='12' className='mb-4 form-group bmd-form-group'>
              <SelectWithValidation defaultValue={roleValue} id_name='role' title='الصلاحية' control={control} errors_check={errors.role} loadOptionsDB={loadOptionsDB_role} />

              </Col>
    

      {/* {!edit && (
      <>
    <Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <div className="form-group">
                    <Label className="form-label font-Cairo ps-0  f-w-700 f-s-12px color-1F2733" for="password">
                    كلمة المرور 
                    </Label>
                    <div className='input-container'>
                    {passwordToggler ? <img src={eye} onClick = {togglePassword} className="togglePassword"/> : <img src={eyeSplash} onClick = {togglePassword} className="togglePassword splash"/>}
                    <input
                    name="password"
                    type= {passwordType}
                    onChange={(e) => checkValidationOfPassword(e)}
                    // {...register('password')}
                    className={`form-control  h-60 f-s-12px f-w-700 bg-F7FAF7 ${passwordError ? 'is-invalid' : ''}`}
                  />
                   <div className=" password-feedback">{passwordError}</div>
                  </div>
    
                </div>
              </Col>
              <Col sm='12' className='mb-4 form-group bmd-form-group'>
                <div className="form-group">
                
                  <Label className="form-label font-Cairo ps-0  f-w-700 f-s-12px color-1F2733" for="confirmPwd">
                  تأكيد كلمة المرور
                  </Label>
                  <div className='input-container'>
                  {confirmPasswordToggler ? <img src={eye} onClick = {toggleConfirmPassword} className="togglePassword"/> : <img src={eyeSplash} onClick = {toggleConfirmPassword} className="togglePassword"/> }

                  <input
                  name="confirmPwd"
                  type={confirmPasswordType}
                  onChange={(e) => checkValidationOfConfirmPassword(e)}
                  // {...register('confirmPwd')}
                  className={`form-control  h-60 f-s-12px f-w-700 bg-F7FAF7 ${confirmPasswordError ? 'is-invalid' : ''}`}
                />
               <div className=" password-feedback">{confirmPasswordError}</div>

              </div>
          </div>
              </Col>
              </>
)
} */}
  </Row>
</div>
{/* 
<div className=" ">
</div> */}

<div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
<Col md='6' className='mb-2'>
        {!edit ?
            <Button onClick={handleClick} className={( nameValidation  & emailValidation &usernameValidation & phoneValidation & roleValidation  ) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ   </Button>
         :
         <Button  className={( nameValidation  & emailValidation & phoneValidation & roleValidation ) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ   </Button>

         }

    
  </Col>
  <Col md='6' className='mb-2'>
    <Button onClick={()=>handleCloseEditUser(false)}  className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
      إلغاء
    </Button>
  </Col>


</div>
</Form>
</>
)
}
