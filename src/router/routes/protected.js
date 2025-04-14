import React from 'react'
import { useNavigate } from "react-router-dom"
import themeConfig from "@configs/themeConfig";
import axios from "axios"
import NotAuthorized from "../../../src/views/NotAuthorized"

function AuthCover({element, children}) {
  const domain_url = themeConfig.url
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    console.log(element,"element")
  if (token === null | token === "") {
    // return <Navigate to="/login" replace />
  } else {
    if(element == 0){
      console.log("home permission")
      
    } else {
      try{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${domain_url}/api/permetion_check?perm_id=${element}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(response.data[0].checked,"response permissin")
        let checked = response.data[0].checked
        if(checked == false){
          navigate("/NotAuthorized")
        } else {

        }
      })
    } catch(e){
      console.log(e)
    }
   
  }
  }
  return children


  

}
export default AuthCover