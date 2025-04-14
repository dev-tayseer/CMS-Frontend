
// ** React Imports
import { Fragment, useState, useEffect, useRef, memo, useContext } from 'react'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'reactstrap'


import axios from 'axios'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Button, Input, Label, Row, Col, FormFeedback } from 'reactstrap'
import { element } from 'prop-types'

import { Form as Form2 } from "react-bootstrap";


export default function FormPermissionComponent({ handleClosePermission, permission_user_id, setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert, role = "false" }) {

  const [choiceOptions, setchoiceOptions] = useState([])
  // let choiceOptions =       [
  //   {
  //     'name_ar':'التصميم',
  //     'name':'design'
  //     },
  //     {
  //       'name_ar':'البرمجة',
  //       'name':'programming'
  //     },
  //     {
  //       'name_ar':'التسويق',
  //       'name':'marketing'
  //     }
  // ]

  const [nameValidation, setNameValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [IdPermissions, setIdPermissions] = useState("")



  const add = useRef(true)
  add.current = true


  const checkValidEmail = (v) => {
    const value = v
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/    ///\S+@\S+\.\S+/
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



  function handleSavePermission() {
    console.log("handle save")
    handleClosePermission(true)
    // var all_checked = document.getElementsByClassName("form-check-input")
    var all_checked = document.querySelectorAll('.form-check-input')
    var newstr = ""
    for (var i = 0; i < all_checked.length; i++) {
      try {
        console.log(all_checked[i], "55")
        if (all_checked[i].checked) {
          newstr = newstr + "," + all_checked[i].id.split("-")[1]
          // newstr = newstr.concat(",") 
        }
      } catch (e) {

      }
      // setIdPermissions(newstr)
      console.log(newstr, "ss")
      console.log(newstr, "str")
      if (newstr.at(0) == ",") {
        // newstr = newstr.slice(0,-1)
        newstr = newstr.substring(1, newstr.length)
      }
    }
    // var all_checked = document.querySelector('.form-check-input').checked;
    console.log("request save permissions ..... ")
    var data = new FormData();
    
    const token = localStorage.getItem("token")
    let url_perm = ''
    if(role == "true"){

    url_perm =  `${domain_url}/users/RolePermetion?id=${permission_user_id}`
    data.append('permetions', newstr);
  } else {
    url_perm =  `${domain_url}/users/AddPermissions?id=${permission_user_id}`
    data.append('new_depart', newstr);

  }
    var config = {
      method: 'post',
      url:url_perm,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response), "daat");
        setTypeAlert("Success")
        setTitleAlert("تم إضافة الأذونات بنجاح.")
        setHeadAlert("  ")
        setShowAlert(true)
      })
      .catch(function (error) {
        console.log(error, "error");
        setTypeAlert("Success")
        setTitleAlert("لم يتم إضافة الإذونات بنجاح. ")
        setHeadAlert(" حدث خطأ ")
        setShowAlert(true)
      });

  }
  useEffect(() => {
    // permission_user_id 
    console.log("start permission")
    setchoiceOptions([])

    var data = new FormData();
    const token = localStorage.getItem("token")
    let url_users = ''
    if (role == "true") {
      url_users = `${domain_url}/users/RolePermetion?id=${permission_user_id}`
    } else {
      url_users = `${domain_url}/users/AddPermissions?id=${permission_user_id}`

    }
    var config = {
      method: 'get',
      url: url_users,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "hany**")
        if (role == "true") {
          setchoiceOptions(response.data)
        } else {
          setchoiceOptions(response.data)

        }
      })
      .catch(function (error) {
        console.log(error, "error");

      });

  }, []);

  const SignupSchema = yup.object().shape({
    // name: yup.string().test({
    //   name: 'name',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     console.log(value, " ........... +++++++++ ")
    //     if (checkInputUndefined(value)) {
    //       value = name
    //     }
    //     setName(value)
    //     if (value === '' | value === null) {
    //       setNameValidation(false)
    //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
    //     } else {
    //       if (!regexArabic(value) | checkSpaceCharacters(value)) {
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




  })

  function handleChangeSearch(e) {
    const token = localStorage.getItem("token")
    var data = new FormData();
    data.append('search_key', e.target.value);
    let search_key = e.target.value
    let url_search = ''
    if(role == "true"){
      url_search =  `${domain_url}/users/RolePermetion?id=${permission_user_id}&search_key=${search_key}`
    } else {
      url_search =  `${domain_url}/users/AddPermissions?id=${permission_user_id}&search_key=${search_key}`
    }
    

    var config = {
      method: 'get',
      url:url_search,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), "res");
        setchoiceOptions(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function handleChangeCheck(e) {
    console.log(e.target.checked, "**8*8")
    if (e.target.checked == "true") {
      e.target.checked = "false"
    } else {
      e.target.checked = "true"

    }
  }

  const saveDataCompany = async () => {
    console.log("saving ........ ")
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


    if (true) {
      handleSavePermission()

    }

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="container-fluid  background-FFFFFF borderRadius-8">
        <Row>
          <Col className='col-12  pt-1 text-md-end p-0'>
            {/* <Form > */}
            <Input
              className=' input-filter-icon-search4 input-filter-icon-search form-control  ps-5 '
              type='text'
              id='search-input-permission'
              placeholder="بحث"
              onChange={e => handleChangeSearch(e)}
            />
            {/* </Form> */}
          </Col>
        </Row>
        <Row className=' '>
          <Col sm='12' className='mb-4 form-group bmd-form-group mt-3 py-3 px-2 background-F7FAF7'>
            <div className='d-flex justify-content-between'>
              <div>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for=''>
                  الصلاحية
                </Label>
              </div>
              <div className='text-end'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for=''>
                  
                </Label>
              </div>

            </div>
          </Col>
          {role == "false" ? (


           
              choiceOptions.map(function (object, i) {
                return (<Col sm='12' className='mb-4 form-group bmd-form-group'>
                  <div className='objPermission mx-2 py-2 d-flex justify-content-between'>
                    <div>

                      <Label className='form-label font-Cairo f-w-600  f-s-12px color-5F605F' for={`${object.DepartName}-${object.id}`}>
                        {object.DepartName}
                      </Label>
                    </div>
                    <div>

                      <Form2.Check
                        id={`${object.DepartName}-${object.id}`}
                        name="name"
                        // className=''
                        defaultChecked={object.checked} // if checkbox should be checked by default
                        value="" // state-controlled value of checkbox
                        onChange={(e) => {
                          e.target.checked ? true : false;
                        }}
                      ></Form2.Check>

                      {/* <Input className="admin-permissions-check" onClick={e=>handleChangeCheck(e)}  id={`${object.DepartName}-${object.id}`} name={`${object.DepartName}-${object.id}`} checked={object.checked} type="checkbox" /> */}
                    </div>
                  </div>
                </Col>
                )
              })
            

          ) :
            (
              
                choiceOptions.map(function (object, i) {
                  return (<Col sm='12' className='mb-4 form-group bmd-form-group'>
                    <div className='objPermission mx-2 py-2 d-flex justify-content-between'>
                      <div>

                        <Label className='form-label font-Cairo f-w-600  f-s-12px color-5F605F' for={`${object.name}-${object.id}`}>
                          {object.name}
                        </Label>
                      </div>
                      <div>

                        <Form2.Check
                          id={`${object.name}-${object.id}`}
                          name="name"
                          // className=''
                          defaultChecked={object.checked} // if checkbox should be checked by default
                          value="" // state-controlled value of checkbox
                          onChange={(e) => {
                            e.target.checked ? true : false;
                          }}
                        ></Form2.Check>

                        {/* <Input className="admin-permissions-check" onClick={e=>handleChangeCheck(e)}  id={`${object.name}-${object.id}`} name={`${object.DepartName}-${object.id}`} checked={object.checked} type="checkbox" /> */}
                      </div>
                    </div>
                  </Col>
                  )
                })
              

            )

          }
          {/* <Col sm='12' className='mb-4 form-group bmd-form-group'>
            <Row>
              <Col sm='6'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='programming'>
                  البرمجة
                </Label>
              </Col>
              <Col sm='6' className='text-end'>
                  <Input className='admin-permissions-check  ' id='programming' name='programming' type="checkbox" />
              </Col>
            </Row>
          </Col>
          <Col sm='12' className='mb-4 form-group bmd-form-group'>
            <Row>
              <Col sm='6'>
                <Label className='form-label font-Cairo f-w-700 f-s-16px color-5F605F' for='marketing'>
                  التسويق
                </Label>
              </Col>
              <Col sm='6' className='text-end'>
                  <Input className='admin-permissions-check  ' id='marketing' name='marketing' type="checkbox" />
              </Col>
            </Row>
          </Col> */}

        </Row>
      </div>

      <div className=" ">
      </div>

      <div className="row flex-column-reverse flex-sm-row pt-2 mb-2">
        <Col md='6' className='mb-2'>
          <Button className='text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo' color='white' outline type='submit'> حفظ   </Button>

        </Col>
        <Col md='6' className='mb-2'>
          <Button onClick={() => handleClosePermission(false)} className='text-center btn-style background-E3E5E3 color-5F605F d-block p-2 w-100 f-w-700 f-s-20px font-Cairo' color='white' outline >
            إلغاء
          </Button>
        </Col>


      </div>
    </Form>
  )
}
