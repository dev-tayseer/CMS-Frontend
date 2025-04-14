
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

 export default function FormComponentRole({handleCloseEditUser,RowId,RowName,Rowname_en,setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert,reload_table}){
  // const [showAlert, setShowAlert] = useState(false)
  // const {loader_show, setLoaderShow} = useContext(LoaderProvider);

  // const [titleAlert, setTitleAlert] = useState("")
  // const [headAlert, setHeadAlert] = useState("")
  // const [typeAlert, setTypeAlert] = useState("")

    const [nameValidation, setNameValidation] = useState(false)
    const [name_enValidation, setname_enValidation] = useState(false)
    const [name, setName] = useState("")
    const [name_en, setname_en] = useState("")

    const [edit, setEdit] = useState(false)




  
    const add = useRef(true)
    add.current = true

    useEffect(() => {

    if(typeof RowId == "number"){
      setEdit(true)
      setName(RowName)
      setname_en(Rowname_en)

    } else {
      setEdit(false)
    }
    },[]);

    useEffect(() => {
      const name_input = document.getElementsByName("name")[0]
      name_input.value = name
    }, [name])

    useEffect(() => {
      const name_en_input = document.getElementsByName("name_en")[0]
      name_en_input.value = name_en
    }, [name_en])





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
  
    const regexEnglish = (v) => {
      const value = v
      const regex = new RegExp('^[a-zA-Z )(]+$')
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

    
    
  
    let SignupSchema = ({})



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
            if (!regexArabic(value)  | checkSpaceCharacters(value)) {
              setNameValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال الاسم بالعربي بشكل صحيح' })
            }
          }
          setNameValidation(true)
          return true
        }
      }),
      name_en: yup.string().test({
        name: 'name_en',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value," ........... +++++++++ ")
          if (checkInputUndefined(value)) {
            value = name_en
          }
          setname_en(value)
          if (value === '' | value === null) {
            setname_enValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!regexEnglish(value)  | checkSpaceCharacters(value)) {
              setname_enValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال الاسم بالإنجليزي بشكل صحيح' })
            }
          }
          setname_enValidation(true)
          return true
        }
      }),

    })
    
     
  
  
   
  
      const saveDataCompany = async () => {
      console.log("saving ........ ")
      handleCloseEditUser(true)

      var data = new FormData();
        data.append('name', name);
        data.append('en_name', name_en );

        console.log(name,name_en,"qqq")

      const token = localStorage.getItem("token")
      

      if(edit){
      var config = {
        method: 'put',
        url: `${domain_url}/users/AddRole?id=${RowId}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
    } else {
      var config = {
        method: 'post',
        url: `${domain_url}/users/AddRole`,
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
          setTypeAlert("Fail")
          setTitleAlert(`${response.data[0]["message"]}`)
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          try{
            reload_table()
          } catch(e){
            console.log(e,"error reload")
            // window.location.reload();
          }

        }
        
        
        
        else {

          setTypeAlert("Success")
          setTitleAlert(`${response.data[0]["message"]}`)
          setHeadAlert("  " )
          setShowAlert(true)
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
        setTitleAlert(`لم يتم إضافة الصلاحية بنجاح`)
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
  
  
    const {
      reset,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  
    const onSubmit = data => {
  
        if ( nameValidation   &  name_enValidation ) {
          saveDataCompany()
  
        } 
        
      }
      return(
        <>
        {/* <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} /> */}

<Form  onSubmit={handleSubmit(onSubmit)}>

<div className="container-fluid mt-5 pt-2 pb-5 mb-5 background-FFFFFF borderRadius-8">


  
  <Row className=' '>

    <Col sm='12' className='mb-4 form-group bmd-form-group'>
      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
        الاسم بالعربي
      </Label>
      <Controller
        id='name'
        name='name'
        value={`${name}`}
        onChange={(e) => setName(e.target.value)}
        control={control}
        render={({ field }) => <Input {...field}  placeholder='أدخل الاسم بالعربي ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name && true} />}
      />
      {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

    </Col>
    <Col sm='12' className='mb-4 form-group bmd-form-group'>
      <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
        الاسم بالإنجليزي
      </Label>
      <Controller
        id='name_en'
        name='name_en'
        value={`${name_en}`}
        onChange={(e) => setname_en(e.target.value)}
        control={control}
        render={({ field }) => <Input {...field}  placeholder='أدخل الاسم بالإنجليزي ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.name_en && true} />}
      />
      {errors.name_en && <FormFeedback>{errors.name_en.message}</FormFeedback>}

    </Col>

  </Row>
</div>

<div className=" ">
</div>

<div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
<Col md='6' className='mb-2'>
       
         <Button  className={( nameValidation  & name_enValidation ) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ   </Button>


    
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
