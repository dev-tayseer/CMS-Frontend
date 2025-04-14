
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

 export default function FormComponentTimeExtension({handleCloseTimeExtension,selectedRowId,setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert}){
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
 
  const [date_fromValidation, setdate_fromValidation] = useState(false)
    const [date_toValidation, setdate_toValidation] = useState(false)
    // const [date_from, setdate_from] = useState("2023/05/18")
    const [date_from, setdate_from] = useState("")

    const [date_to, setdate_to] = useState("")

    const [contractName, setcontractName] = useState("")
    const [contractNumber, setcontractNumber] = useState("")

    const [oldRecordsExists, setoldRecordsExists] = useState(false)
  
    const [oldRecords, setoldRecords] = useState([])
  
    const add = useRef(true)
    add.current = true
    const [language, setlanguage] = useState("ar")
    const [can_delete, setcan_delete] = useState(true)

    const [notesValidation, setnotesValidation] = useState(false)
    const [notes, setnotes] = useState("")

  
  
  useEffect(() => {
    console.log(selectedRowId,"selected")


    var data = new FormData();
    const token = localStorage.getItem("token")
    // selectedRowId = 64
    
    var config = {
      method: 'get',
      url: `${domain_url}/Contract/NewDate/?id=${selectedRowId}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data),"dara");
      console.log(response.data,"response.data")
      let contract_obj = response.data
      setcontractName(contract_obj.Contract_Name)
      setcontractNumber(contract_obj.Contract_Number)
      setdate_from(contract_obj.old_exp)
      // notes
      console.log(contract_obj.old_exp,"*****")
      let date_from_input = document.getElementsByName("date_from")[0]
      let date_to_input = document.getElementsByName("date_to")[0]
      if (contract_obj.old_exp == "" || contract_obj.old_exp == undefined) {
        console.log("**yes")
        setdate_fromValidation(true)
        setdate_from("")
        date_from_input.classList.add("form-control")
        date_from_input.classList.add("form-control-lg")
        date_from_input.classList.remove("is-invalid")
      }
      if (date_to == "" || date_to == undefined) {
        setdate_toValidation(true)
        setdate_to("")
        date_to_input.classList.add("form-control")
        date_to_input.classList.add("form-control-lg")
        date_to_input.classList.add("is-invalid")
      }

      let list_of_records = []
      let record_obj_files = contract_obj.data

      for (var i = 0; i < record_obj_files.length; i++) {
        setoldRecordsExists(true)

        list_of_records.push({ "id":record_obj_files[i].id ,"old_date": record_obj_files[i].old.split("T")[0], "new_date": record_obj_files[i].new.split("T")[0], "extend_date": record_obj_files[i].created.split("T")[0] , "notes": record_obj_files[i].notes,"old_start": record_obj_files[i].old_start })
      }

      setoldRecords(list_of_records)

      // var old = response.data[0].old
      // try{
      //   old = old.split("T")[0]
      //   setdate_from(old)
      // } catch(e){

      // }

      // var new_date = response.data[0].new
      // try{
      //   new_date = new_date.split("T")[0]
      //   setdate_to(new_date)
      // } catch(e){


      // }


    })
    .catch(function (error) {
      console.log(error);
    });



    
  },[]);

  useEffect(() => {
    const notes_input = document.getElementsByName("notes")[0]
    notes_input.value = notes
  }, [notes])



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
    
  
    const SignupSchema = yup.object().shape({
      // name: yup.string().test({
      //   name: 'name',
      //   skipAbsent: true,
      //   test(value, ctx) {
      //     console.log(value," ........... +++++++++ ")
      //     if (checkInputUndefined(value)) {
      //       value = name
      //     }
      //     setName(value)
      //     if (value === '' | value === null) {
      //       setNameValidation(false)
      //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
      //     } else {
      //       if (!regexArabic(value)  | checkSpaceCharacters(value)) {
      //         setNameValidation(false)
      //         return ctx.createError({ message: 'الرجاء إدخال الاسم بالعربي بشكل صحيح' })
      //       }
      //     }
      //     setNameValidation(true)
      //     return true
      //   }
      // }),
   
  
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
        handleCloseTimeExtension()
        console.log("hey")
      const token = localStorage.getItem("token")
    var data = new FormData();
    data.append('date', date_to);
    let newnotes = document.getElementsByName("notes")[0].value

    data.append('notes', newnotes)
    console.log(newnotes,"newnotes.............")
    console.log(date_to,notes,"***notes")
    // setLoaderShow(true)

    var config = {
      method: 'post',
      url: `${domain_url}/Contract/NewDate/?id=${selectedRowId}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data),"returned ...");
      handleCloseTimeExtension(false)
      if(response.data[0]["succse"] == 0){
        setTypeAlert("Fail")
        setTitleAlert(`${response.data[0].message}`)
        setHeadAlert("حدث خطأ، ")
        setShowAlert(true)
        // setLoaderShow(false)

      } else {
        
        setTypeAlert("Success")
        setTitleAlert(`${response.data[0].message}`)
        setHeadAlert("، " )
        setShowAlert(true)
        // setLoaderShow(false)
      }

    })
    .catch(function (error) {
      console.log(error,"error");
      setTypeAlert("Fail")
      setTitleAlert(`لم يتم إمداد العقد بنجاح`)
      setHeadAlert(" حدث خطأ")
      setShowAlert(true)
      // setLoaderShow(false)
    });

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
        if (!date_fromValidation  & !date_toValidation ) {
          console.log("valid ..")
          saveDataCompany()
  
        }  else {
          console.log("not valid")
        }
        
      }

      function handleClickSave() {
        console.log("clicked btn ...")
        let date_from_input = document.getElementsByName("date_from")[0]
        let date_to_input = document.getElementsByName("date_to")[0]
    
        let date_from = date_from_input.value
        let date_to = date_to_input.value
    
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
        console.log(date_to,"date_to")
        if (date_to == "" || date_to == undefined) {
          console.log("to to empty",date_to)
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
    
      // function handleChangeDateFrom() {
      //   let date_from_input = document.getElementsByName("date_from")[0]
      //   let date_from = date_from_input.value
      //   if (date_from == "" || date_from == undefined) {
      //     setdate_fromValidation(true)
      //     setdate_from("")
      //     date_from_input.classList.add("is-invalid")
    
      //   } else {
      //     setdate_fromValidation(false)
      //     setdate_from(date_from)
      //     date_from_input.classList.remove("is-invalid")
    
      //   }
      //   console.log(date_from.value, "0000000")
      // }
      function handleChangeDateFrom(date) {
        try{
        let datestr = date.toString();
        let date_from_input = document.getElementsByName("date_from")[0]
        let date_from = date_from_input.value
        if (datestr == "" || datestr == undefined) {
          setdate_fromValidation(true)
          setdate_from("")
          date_from_input.classList.add("is-invalid")
    
        } else {
          setdate_fromValidation(false)
          setdate_from(datestr)
          date_from_input.classList.remove("is-invalid")
    
        }
      } catch(e){
        setdate_fromValidation(true)
        setdate_from("")
        date_from_input.classList.add("is-invalid")
      }
      }
    
      function handleChangeDateTo(date) {
        try{
        let datestr = date.toString();
        let date_to_input = document.getElementsByName("date_to")[0]
        let date_to = date_to_input.value
        if (datestr == "" || datestr == undefined) {
          setdate_toValidation(true)
          setdate_to("")
          date_to_input.classList.add("is-invalid")
    
        } else {
          setdate_toValidation(false)
          setdate_to(datestr)
          date_to_input.classList.remove("is-invalid")
    
        }
      } catch(e){
        setdate_toValidation(true)
        setdate_to("")
        date_to_input.classList.add("is-invalid")
      }
      }
      // function handleChangeDateTo() {
      //   let date_to_input = document.getElementsByName("date_to")[0]
      //   let date_to = date_to_input.value
      //   if (date_to == "" || date_to == undefined) {
      //     setdate_toValidation(true)
      //     setdate_to("")
      //     date_to_input.classList.add("is-invalid")
    
      //   } else {
      //     setdate_toValidation(false)
      //     setdate_to(date_to)
      //     date_to_input.classList.remove("is-invalid")
    
      //   }
      //   console.log(date_to.value, "0000000")
      // }



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
              <div className="mt-3 mb-3 d-flex justify-content-between">
        <div className='time-extension-title f-s-16px f-w-700 color-5F605F'>{contractName}</div>
        <div className='time-extension-contract-number px-3 py-2 f-s-16px f-w-600 color-5F605F'>عقد رقم {contractNumber}</div>
    </div>
<Form  onSubmit={handleSubmit(onSubmit)}>
<div className="container-fluid mt-5 pt-2 pb-2 mb-2 background-FFFFFF borderRadius-8">
  
  <Row className=' '>

              <Col sm='12' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                تاريخ نهاية العقد الحالية
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
                        name="date_from"
                        id="date_from"
                        disabled="true"
                        // value={date_from || ""}
                        value={date_from || value}
                        
                        invalid={date_fromValidation && true}
                        className='form-control'
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
              <Col sm='12' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='duration'>
                ادخل تاريخ  نهاية العقد الجديد
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
                        // value={date_to || ""}
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
                console.log(object,"obbbbbbbbbbbbbb")
                return (


                  <tr className='py-3' id={`extend_${i}`}>
                    <th scope="row">{i+1}</th>
                    <td>{object.old_date}</td>
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
    <Button  onClick={handleClickSave}  className={(!date_fromValidation & !date_toValidation ) ? 'text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' : 'text-center btn-style color-BDBFBD d-block p-2 w-100 f-w-700 f-s-20px background-FFF5E0 font-Cairo'} color='white' outline type='submit'> حفظ العقد  </Button>

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
