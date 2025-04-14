
// ** React Imports
import { Fragment, useState, useEffect, useRef  , memo, useContext } from 'react'
import { LoaderContext, LoaderProvider } from "../../../utility/context/LoaderContext";


import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'reactstrap'

import { CloseIcon, FileCorrect, Trash3 } from '../icons/all_icons'

import axios from 'axios'
import themeConfig from "@configs/themeConfig";
import DatePicker from "react-multi-date-picker";

const domain_url = themeConfig.url

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Button, Input, Label, Row, Col,FormFeedback } from 'reactstrap'
import { element } from 'prop-types'

 export default function BillFormComponent1({handleCloseTimeExtension,selectedRowId,setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert , typeValue , billData , setbillData , setBillRecExists , can_add_advance , setcan_add_advance , can_add_late , setcan_add_late  ,  via_default   , setcan_add_advancebtn , setcan_add_latebtn}){
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
 
  const [date_fromValidation, setdate_fromValidation] = useState(false)
    const [date_toValidation, setdate_toValidation] = useState(false)
    const [date_from, setdate_from] = useState("2023/05/18")
    const [date_to, setdate_to] = useState("")

    const [contractName, setcontractName] = useState("")
    const [contractNumber, setcontractNumber] = useState("")
    const [amount, setamount] = useState("")
    const [amountValidation, setamountValidation] = useState(false)
    // const [added_value, setadded_value] = useState("15")
    const [added_value, setadded_value] = useState("")

    const [added_valueValidation, setadded_valueValidation] = useState(false)

    const [due_duration, setdue_duration] = useState("")
    const [due_durationValidation, setdue_durationValidation] = useState(false)
    // const [payment_type, setpayment_type] = useState("")

    

    const [roleError, setRoleError] = useState("")
    const [role, setRole] = useState("")
    const [can_select_payment_type, setcan_select_payment_type] = useState(false)

    

    

    // const [date_fromValidation, setdate_fromValidation] = useState(false)

    // const [date_from, setdate_from] = useState("")
    


    const [oldRecordsExists, setoldRecordsExists] = useState(false)
  
    // const [oldRecords, setoldRecords] = useState([])
  
    const add = useRef(true)
    add.current = true
    const [language, setlanguage] = useState("ar")
    const [can_delete, setcan_delete] = useState(true)

    const [notesValidation, setnotesValidation] = useState(false)
    const [notes, setnotes] = useState("")

  
  
  useEffect(() => {
    console.log(selectedRowId,"selected")
    console.log(typeValue,"typeValue...........")

    if (typeValue == "1"){
      setcan_select_payment_type(true)
    } 
    else {
      setcan_select_payment_type(false)

    }

    // if(can_add_advance && typeValue == "1" ){
      if(via_default == "advance" && typeValue == "1" ){



      // setRole("0")
      setRole("0")
    }
    // else if(can_add_late && typeValue == "1"  ){

    else if(via_default == "late" && typeValue == "1"  ){
      // setRole("1")
      setRole("1")


    } else{
      setRole("")

    }

    // var data = new FormData();
    // const token = localStorage.getItem("token")
    // selectedRowId = 64
    
    // var config = {
    //   method: 'get',
    //   url: `${domain_url}/Contract/GetHistoryBillRecords?id=${selectedRowId}`,
    //   headers: { 
    //     'Authorization': `Bearer ${token}`, 
    //   },
    //   data : data
    // };
    
    // axios(config)
    // .then(function (response) {

    //   console.log(response.data,"response.data............................")

    //   let list_of_records = []
    //   let record_obj_files = response.data.data

    //   for (var i = 0; i < record_obj_files.length; i++) {
    //     setoldRecordsExists(true)

    //     list_of_records.push({ "id":record_obj_files[i].id ,"old_date": record_obj_files[i].old.split("T")[0], "new_date": record_obj_files[i].new.split("T")[0], "extend_date": record_obj_files[i].created.split("T")[0] , "notes": record_obj_files[i].notes })
    //   }

    //   setoldRecords(list_of_records)




    // })
    // .catch(function (error) {
    //   console.log(error);
    // });



    
  },[]);

  function handleClickSave() {
    console.log("clicked btn ...")
    let date_from_input = document.getElementsByName("date_from")[0]

    // let date_from = date_from_input.value
    console.log(date_from,"date_from.......")

    if (date_from == "" || date_from == undefined) {
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

  function handleChangeDateFrom(date) {
    try{
    let datestr = date.toString();
    let date_from_input = document.getElementsByName("date_from")[0]

    let date_from = date_from_input.value
    console.log(date_from,"0000000",datestr,"----------++++")
    if (datestr == "" || datestr == undefined) {
      console.log("notvalid")
      setdate_fromValidation(true)
      setdate_from("")
      date_from_input.classList.add("is-invalid")

    } else {
      console.log("valid")

      setdate_fromValidation(false)
      setdate_from(datestr)
      date_from_input.classList.remove("is-invalid")

    }
    } catch(e){
      console.log("notvalidexc")

      setdate_fromValidation(true)
      setdate_from("")
      date_from_input.classList.add("is-invalid")
    }
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

    const checkNumbersOnly = (v) => {
      const value = v
  
      const regex = new RegExp(/^[0-9]+$/)
  
      return regex.test(value)
      // const value = v
      // return value.isNumber()
    }
    
  
    const SignupSchema = yup.object().shape({
      amount: yup.string().test({
        name: 'amount',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value," ........... +++++++++ ")
          if (checkInputUndefined(value)) {
            value = amount
          }
          setamount(value)
          if (value === '' | value === null) {
            setamountValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!checkNumbersOnly(value)) {
              setamountValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال المبلغ بشكل صحيح' })
            }
          }
          setamountValidation(true)
          return true
        }
      }),

      added_value: yup.string().test({
        name: 'added_value',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value," ........... +++++++++ ")
          if (checkInputUndefined(value)) {
            value = added_value
          }
          setadded_value(value)
          if (value === '' | value === null) {
            setadded_valueValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!checkNumbersOnly(value)) {
              setadded_valueValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال القيمة المضافة بشكل صحيح' })
            }
          }
          setadded_valueValidation(true)
          return true
        }
      }),

      due_duration: yup.string().test({
        name: 'due_duration',
        skipAbsent: true,
        test(value, ctx) {
          console.log(value," ........... +++++++++ ")
          if (checkInputUndefined(value)) {
            value = due_duration
          }
          setdue_duration(value)
          if (value === '' | value === null) {
            setdue_durationValidation(false)
            return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
          } else {
            if (!checkNumbersOnly(value)) {
              setdue_durationValidation(false)
              return ctx.createError({ message: 'الرجاء إدخال مدة السداد بشكل صحيح' })
            }
          }
          setdue_durationValidation(true)
          return true
        }
      }),

      

      
   
  
      // email: yup.string().test({
      //   name: 'email',
      //   skipAbsent: true,
      //   test(value, ctx) {
      //     if (checkInputUndefined(value)) {
      //       value = email
      //     }
      //     setEmail(value)
      //     if (value === null | value === "") {
      //       setEmailValidation(false)
      //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
      //     } else {
      //       value = checkValidEmail(value)
      //       if (value === false) {
      //         setEmailValidation(false)
      //         return ctx.createError({ message: 'الرجاء إدخال البريد الإلكتروني بشكل صحيح' })
      //       }
      //     }
  
      //     setEmailValidation(true)
      //     return true
      //   }
      // }),

      // notes: yup.string().test({
      //   name: 'notes',
      //   skipAbsent: true,
      //   test(value, ctx) {
      //     if (checkInputUndefined(value)) {
      //       value = notes
      //     }
      //     setnotes(value)
      //     if (value === null | value === "") {
      //       setnotesValidation(false)
      //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
      //     }
  
      //     setnotesValidation(true)
      //     return true
      //   }
      // }),
   
     
  
  
    })
  
      const saveDataCompany = async () => {
        // console.log("hey")
      // const token = localStorage.getItem("token")
    // var data = new FormData();
    // data.append('amount', amount);
    // data.append('added_value', added_value)
    // data.append('due_date', date_from)
    // data.append('due_duration', due_duration)
    // data.append('payment_type', role)


    // if(can_add_advance && typeValue == "1" ){

      if(via_default == "advance"){

      // setRole("0")
      let role_final = "0"
      setcan_add_advancebtn(false)
    }
    // else if(can_add_late && typeValue == "1"  ){
      if(via_default == "late"){
      // setRole("1")
      let role_final = "1"
      setcan_add_latebtn(false)

    } else{
      let role_final = ""
    }

    let obj = [{
      "amount":amount,
      "added_value":added_value,
      "due_date":date_from,
      "due_duration":due_duration,
      "payment_type":role,
      "paid":"0",

    }]

    console.log(billData,"billData")
    console.log(obj,"obj")



    handleCloseTimeExtension()
    console.log(billData.concat(obj),"99999999999999999999999")
    setbillData(billData => billData.concat(obj))
    setBillRecExists(true)
    if(can_add_advance && typeValue == "1" ){

      // setRole("0")
      let role_final = "0"
      setcan_add_advance(false)
      setcan_add_late(true)
      
    }
    if(can_add_late && typeValue == "1"  ){
      // setRole("1")
      let role_final = "1"

      setcan_add_late(false)
      

    }


    // setbillData()

    
    


    console.log(date_to,"***")
    // setLoaderShow(true)

    // var config = {
    //   method: 'post',
    //   url: `${domain_url}/Contract/NewDate/?id=${selectedRowId}`,
    //   headers: { 
    //     'Authorization': `Bearer ${token}`, 
    //   },
    //   data : data
    // };

    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data),"returned ...");
    //   handleCloseTimeExtension(false)
    //   if(response.data[0]["succse"] == 0){
    //     setTypeAlert("Fail")
    //     setTitleAlert(`${response.data[0].message}`)
    //     setHeadAlert("حدث خطأ، ")
    //     setShowAlert(true)
    //     // setLoaderShow(false)

    //   } else {
        
    //     setTypeAlert("Success")
    //     setTitleAlert(`${response.data[0].message}`)
    //     setHeadAlert("، " )
    //     setShowAlert(true)
    //     // setLoaderShow(false)
    //   }

    // })
    // .catch(function (error) {
    //   console.log(error,"error");
    //   setTypeAlert("Fail")
    //   setTitleAlert(`لم يتم إمداد العقد بنجاح`)
    //   setHeadAlert(" حدث خطأ")
    //   setShowAlert(true)
    //   // setLoaderShow(false)
    // });

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
  
        console.log("submtting ...")
        if (amountValidation & added_valueValidation & !date_fromValidation & due_durationValidation  ) {
          console.log("valid ..")
          saveDataCompany()
  
        }  else {
          console.log("not valid")
        }
        
      }


 

      function handleDelete(obj,row_id){
        console.log(row_id,"row_id")
        if(can_delete){
          console.log("deleting")
          setcan_delete(false)
          var data = new FormData();
          const token = localStorage.getItem('token')
          
          var config = {
            method: 'delete',
            url: `${domain_url}/Contract/NewDate/?id=${selectedRowId}&date_id=${obj.id}`,
            headers: { 
              'Authorization': `Bearer ${token}`, 
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            document.getElementById(row_id).remove()
          })
          .catch(function (error) {
            console.log(error);
          });
          
        }
        else{
          console.log("not deleting ")
        }
        console.log("delete id", obj)
      }

      return(
        
      <>
      {via_default =="advance" && typeValue == "1"  && (
      <div className='modal-text-main2'>
      الدفعة المقدمة
      </div>
      )}

    {via_default == "late" && typeValue == "1" && (
      <div className='modal-text-main2'>

      الدفعة المؤخرة
      </div>
      )}
     
<Form  onSubmit={handleSubmit(onSubmit)}>
<div className="container-fluid mt-5 pt-2 pb-2 mb-2 background-FFFFFF borderRadius-8">

  
  <Row className=' '>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                  المبلغ 
                </Label>
                <Controller
                  id='amount'
                  name='amount'
                  value={`${amount}`}
                  onChange={(e) => setamount(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='أدخل المبلغ ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.amount && true} />}
                />
                {errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                  القيمة المضافة
                </Label>
                <div className='input-container'>
                <Controller
                  id='added_value'
                  name='added_value'
                  value={`${added_value}`}
                  onChange={(e) => setadded_value(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='أدخل القيمة المضافة ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.added_value && true} />}
                />
                <span>%</span>
                {errors.added_value && <FormFeedback>{errors.added_value.message}</FormFeedback>}
                </div>

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                  تاريخ الإستحقاق
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
                      {add['current']?(
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
                {/* {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>} */}

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='name'>
                  مدة السداد (أشهر)
                </Label>
                <Controller
                  id='due_duration'
                  name='due_duration'
                  value={`${due_duration}`}
                  onChange={(e) => setdue_duration(e.target.value)}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='أدخل مدة السداد ' bsSize='lg' className={add['current'] ? 'h-60 f-s-12px f-w-700 bg-F7FAF7' : 'h-60 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.due_duration && true} />}
                />
                {errors.due_duration && <FormFeedback>{errors.due_duration.message}</FormFeedback>}

              </Col>

              {can_select_payment_type && false && (
                <Col sm='12' className='mb-4 form-group bmd-form-group'>
                <Row className='ms-0'>
                  
                  <Label className="ms-0 ps-0 form-label font-Cairo f-w-700 f-s-16px color-5F605F" for="radio">
                  نوع الدفعة (اختياري) 
                  </Label>
                  <Col sm='6' className='p-0'>
                  <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border bg-F7FAF7 py-3 ${role === "0" ? 'checkRole' : ''}`}>
                    <Label className="form-check-label form-label lable-radio font-Cairo f-w-700 f-s-16px color-5F605F" for="payment_type1">
                    الدفعة المقدمة
                    </Label>
                      
                        <Input
                        type="radio"
                        id="payment_type1"
                        name="payment_type"
                        className={`float-end me-4 color-3261A8 ${role === "0" ? 'checkRole' : ''}`}
                        checked = {role === "0"}
                        onClick={(e) => setRole("0")}

                        />
                  
                  </Col>
                  </Col>
                  <Col sm='6' className='ps-md-2 pe-md-2 p-0'>
                    <Col sm='12' className={`mb-4 form-group bmd-form-group radio-border bg-F7FAF7 py-3 ${role === "1" ? 'checkRole' : ''}`}>
                    <Label className={`form-check-label form-label lable-radio font-Cairo f-w-700 f-s-16px color-5F605F `} for="payment_type2">
                    الدفعة الأخيرة
                    </Label>
                    <Input
                      type="radio"
                      id="payment_type2"
                      name="payment_type"
                      className={`float-end me-4 color-3261A8 `} 
                      checked = {role === "1"}
                      onClick={(e) => {setRole("1")}}
                    

                    />
                    </Col>
                    {/* <div className="invalid-feedback">{roleError}</div> */}

                  </Col>
                </Row>

                </Col>
              )}


    
  </Row>
</div>


{oldRecordsExists && (
          <>
        <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>سجل التمديدات السابقة</div>
        <div className=' row mt-4 mb-4 p-3'>
          <table class="table">
            <thead className='background-F7FAF7 thead-details py-3'>
              <tr className='background-F7FAF7 thead-details py-3'>
                <th scope="col">#</th>
                <th scope="col">تاريخ نهاية العقد السابق</th>
                <th scope="col">تاريخ نهاية العقد الممتد</th>
                <th scope="col">تاريخ التمديد</th>
                <th scope="col">الملاحظات</th>

                <th scope="col">حذف</th>

              </tr>
            </thead>
            <tbody>
              {oldRecords.map(function (object, i) {
                return (


                  <tr className='py-3' id={`extend_${i}`}>
                    <th scope="row">{i+1}</th>
                    <td>{object.old_start}</td>
                    <td>{object.new_date}</td>
                    <td>{object.extend_date}</td>
                    <td>{object.notes}</td>

                    <td>
                      <div>
                      <a  onClick={(e) => handleDelete(object,`extend_${i}`, e)}>
                      <Trash3 size={20} />
                      </a>
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

<div className="row flex-column-reverse flex-sm-row pt-2 mb-2">

 
  <Col md='6' className='mb-2'>
    {/* <Button onClick={handleTimeExtension} className={( !date_fromValidation  & !date_toValidation ) ?  'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> إمداد العقد  </Button> */}
    <Button onClick={handleClickSave}   className={(amountValidation & added_valueValidation & !date_fromValidation  & due_durationValidation) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

  </Col>



  <Col md='6' className='mb-2'>
    <Button type='button' onClick={()=>handleCloseTimeExtension(false)}  className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
      إلغاء
    </Button>
  </Col>


</div>
</Form>
 </>

)
}
