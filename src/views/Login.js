// ** Styles
import "@styles/react/pages/page-authentication.scss";


import axios from "axios"
import Loader from './components/loader'
import { useNavigate } from "react-router-dom"
import "@src/assets/scss/Login.scss"
import React, { useState, useEffect,useContext } from "react"
import Form from 'react-bootstrap/Form'
import { Logo, UserCircle, PasswordIcon } from './components/icons/all_icons'

import themeConfig from "@configs/themeConfig";
import { useRTL } from "@hooks/useRTL";
import eye from "@src/assets/images/svg/eye.svg"
import eyeSplash from "@src/assets/images/svg/eyeSplash.svg"
import {LoaderContext, LoaderProvider} from "../utility/context/LoaderContext";
const domain_url = themeConfig.url


const Login = () => {

  const [error, setError] = useState("")
  const [details, setDetails] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isRtl, setIsRtl] = useRTL();
  const [passwordType, setPasswordType] = useState("password")
  const [passwordToggler, setPasswordToggler] = useState(true)

  const {loader_show, setLoaderShow} = useContext(LoaderProvider);



  // const adminUser = {
  //   email : "admin@admin.com", 
  //   password : "admin123"
  // }

  const GETTokenForUser =  () => {
    const domain_url = themeConfig.url
    var data = JSON.stringify({
      "username": details.email,
      "password": details.password
    });
    var config = {
      method: 'post',
      url: `${domain_url}/api/token/?username=Eslam.saad&password=%262Aca%2341&id=123456`,
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDAyMTAxLCJqdGkiOiI2YTQ1M2RlYWM5NzM0NDE3ODMxODNhZDJkNjBhNDA4MSIsInVzZXJfaWQiOjF9.-S9ZfzSLtfJLfiC-Bpg0nhyxAZclsV16RZCsXVI6h0Q', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      const data = response.data
      let token = data.access
      console.log(token,"tokenn")
      localStorage.setItem("token", token)
      setError("")
      navigate('/home')
      
    })
    .catch(function (error) {
      console.log(error,"error .............");
      setError("error")
    });
  }

  const loginHandling = async (details) => {
    setLoading(true)
    const domain_url = themeConfig.url
    // { username: details.email, password: details.password }
    try {
      console.log(`${domain_url}/api/login_check?username=${details.email}&password=${details.password}`,"hhhhhhhhhh")
      let params = {
        "username":details.email,
        "password":details.password
      }

      // const result = await axios.post(`${domain_url}/add-car`, params, config)
      const result = await axios.post(`${domain_url}/api/login_check`, {
        "username":details.email,
        "password":details.password
      })
      // const result = await axios.post(`${domain_url}/login`, {phone_number: 966512345670, password: "12345678aA@"})

      const data = result.data
      console.log(data,"login data")
      if (data[0].sucsess == 1) {


        GETTokenForUser()
        // remove
        // localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNzc2MjYyLCJqdGkiOiI0MzkyZTg0ZTBjYTQ0Yjk4YjdmZjBmMTBhYmFlMjFhYSIsInVzZXJfaWQiOjExfQ.Ib4bqxsmeZ3EITO8QhUvH0aD3pzMH2rwQCLEleSCn0Q")
        // navigate('/home')
        // end remove
        setError("")
        // setLoading(false)

      } else {
        console.log("400 error happened",data[0])
        console.log(400)
        setError(data[0].message)
        setLoading(false)

      }
    } catch (e) {
      console.log("error..........", e)
      setError("حدث خطأ ما")
      setLoading(false)
    }

  }

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    console.log("submit .....")
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      console.log("not valid")
      event.preventDefault()
      event.stopPropagation()
      setValidated(false)
      setError("")
    } else if (form.checkValidity() === true) {
      console.log("valid so checking backend")
      loginHandling(details)
    }
    // } else {
    setError("")
    // loginHandling(details)
    setValidated(true)

    // }

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

  // function handleRememberMe() {
  //   const rmCheck = document.getElementById("flexCheckDefault");
  //   const emailInput = document.getElementById("validationCustom01");
  //   const  passwordInput = document.getElementById("validationCustom02");

  //   if (localStorage.checkbox="checked" && localStorage.checkbox !== "") {
  //     console.log("yes ....")
  //     rmCheck.setAttribute("checked", "checked");
  //     emailInput.value = localStorage.email;
  //     passwordInput.value = localStorage.password;
  //     console.log(emailInput.value)

  //   } else {
  //     rmCheck.removeAttribute("checked");
  //     // emailInput.value = "";
  //     // passwordInput.value = "";
  //   }

    

    
  // }


  function handleRememberMe(){
    if( document.getElementById("flexCheckDefault").checked){
      console.log("chrckerf")
      console.log(document.getElementById("validationCustom01").value,"111")
      console.log(document.getElementById("validationCustom02").value,"111")
       localStorage.setItem("username",document.getElementById("validationCustom01").value)
       localStorage.setItem("password",document.getElementById("validationCustom02").value)

    } else {
      console.log("not checked")
      localStorage.setItem("username","")
      localStorage.setItem("password","")
    }
  }

  useEffect(() => {


    try{
      if(localStorage.getItem("username")){
        document.getElementById("flexCheckDefault").checked = true 
      } else{
        document.getElementById("flexCheckDefault").checked = false 
        
      }
      console.log(localStorage.getItem("username"),"123")
      setDetails({ ...details, email: localStorage.getItem("username") , password: localStorage.getItem("password") })
      // setDetails({ ...details, password: localStorage.getItem("password") })}

      // setDetails(email:localStorage.getItem("username"),password:localStorage.getItem("password")})
    } catch(e){
      console.log(e)
      document.getElementById("validationCustom01").value = ""
      document.getElementById("validationCustom02").value = ""
      document.getElementById("flexCheckDefault").checked = false 


    }

    setIsRtl(true)

    localStorage.removeItem("token")
    console.log(localStorage.getItem("token"), "genetrated loading ")

    // handleRememberMe()

  }, [])

  // function handleRememberMeClick() {
  //   const rmCheck = document.getElementById("flexCheckDefault");
  //   const  emailInput = document.getElementById("validationCustom01");
  //   const  passwordInput = document.getElementById("validationCustom02");

  //   if (rmCheck.checked && emailInput.value !== "") {
  //     console.log("check",rmCheck)
  //     localStorage.email = emailInput.value;
  //     localStorage.password = passwordInput.value;



  //     localStorage.checkbox = "checked";
      
  //   } else {
      
  //     localStorage.checkbox = "";
  //     localStorage.email = "";
  //     localStorage.password = "";
  //   }

  // }

  if (loading) {
    return (<Loader></Loader>)
  }

  return (
    <div className="container-fluid">
      <div className="row px-lg-5 mx-lg-4">
        <div className="col login-handler">
          <div className="login-container col-lg-6 col-12">
            <div className="container-fluid">
              <div className="py-lg-5 px-lg-2 mt-4">
                <Logo width={160} height={32} color='none' />
              </div>
              <div className="px-2 pt-5 pb-3">
                <p className="welcome-text">
                  نظام إدارة العقود
                </p>

              </div>

              <div className="px-2 mt-2">
                {error &&
                  (
                    <div className="error-login p-1">
                      <p className="pt-2">
                        <span className="error-bold">
                          يوجد خطأ ما , &nbsp;
                        </span>
                        <span className="error-message">

                          {error}.
                        </span>
                      </p>
                    </div>
                  )
                }

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                  <Form.Group className={error ? "mt-md-2 mt-1" : "mt-md-5 mt-1"} controlId="validationCustom01">
                    <Form.Label className="login-label">اسم المستخدم</Form.Label>
                    <div className='input-container'>
                      <Form.Control
                        required
                        type="text"
                        placeholder="اسم المستخدم"
                        className="p-2 mt-2 "
                        onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email}
                      />
                      <UserCircle />
                      <Form.Control.Feedback  type="invalid">
                        {details.email === '' ? "الرجاء إدخال اسم المستخدم" : "الرجاء إدخال اسم المستخدم بشكل صحيح"}

                      </Form.Control.Feedback>
                    </div>

                  </Form.Group>
                  <Form.Group className="mt-4" controlId="validationCustom02">
                    <Form.Label className="login-label">كلمة المرور</Form.Label>
                    <div className='input-container'>
                      {passwordToggler ? <img src={eye} onClick={togglePassword} className="togglePassword" /> : <img src={eyeSplash} onClick={togglePassword} className="togglePassword splash" />}

                      <Form.Control
                        required
                        type={passwordType}
                        className="p-2 mt-2 loginInput"
                        placeholder="كلمة المرور"
                        onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}
                      />
                      <PasswordIcon />
                      <Form.Control.Feedback type="invalid">الرجاء إدخال كلمة المرور</Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <div className="form-check mt-4 mb-5 ">
                    <input className="form-check-input " type="checkbox" value="" id="flexCheckDefault" onClick={handleRememberMe} />
                    <label className="form-check-label ps-2 pt-1" htmlFor="flexCheckDefault">
                      تذكرني
                    </label>
                  </div>
                  <div className="form-group mt-5">
                    <input type="submit" className={error ? "btn-login mt-md-1 mt-2 " : "btn-login mt-md-5 mt-2 "} value="تسجيل الدخول" />
                  </div>
                </Form>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
