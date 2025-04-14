// ** React Imports
// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Bell, X, Check, AlertTriangle } from "react-feather"
import React, {useState, useEffect, Fragment} from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { Notification,NotificationSeen, IconCar } from '../components/icons/all_icons'

import themeConfig from "@configs/themeConfig";

import { useNavigate } from "react-router-dom"

const domain_url = themeConfig.url

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap"
import { Navigate } from "react-router-dom"
import { formatDate } from "@fullcalendar/core"

const NotificationDropdown = () => {
  const [limit, setLimit] = useState(4)
  const [page, setPage] = useState(1)
  const [searchKey, setSearchKey] = useState("")
  const [dataNotification, setDataNotification] = useState([])
  const [scrollTop, setScrollTop] = useState(0)
  const [unseen, setUnseen] = useState(0)

  
  const navigate = useNavigate()


  useEffect(() => {
    let token = localStorage.getItem("token")
    let config = {
      method: 'get',
      url: `${domain_url}/api/seen`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data),"notification seen");
      let unseen_count = response.data.result
      if(unseen_count>0){
        setUnseen(true)
      } else {
        setUnseen(false)

      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])


  
  const handleNotificationFirstTime = async(e, viaScrolling = false, newpage = 1) => {
    setDataNotification([])
    console.log("handle notif")
    if (setScrollTop === 0) {
      setScrollTop(0)
    }
    console.log(viaScrolling, "scrole")
    e.preventDefault()
    { viaScrolling === true ? setPage(page + 1) : setPage(page) }

    const token = localStorage.getItem("token")
    let data_form = new FormData()
    // data_form.append("page",page)
    

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    // const result = await axios.get(`${domain_url}/get-notifications?page=${newpage}&limit=5`, config)
    const result = await axios.get(`${domain_url}/api/Notications?page=${page}`, config)
    console.log(result.data.data,"notify")

    const data = result.data.data
    console.log(data,"......")
   
    if (result.status === 200) {
      console.log("status ... ")
        // redirect to home page
        let new_notification_data = []
        new_notification_data = data
        console.log(new_notification_data,"************")
        // console.log(new_notification_data.path, "123")
        setDataNotification(dataNotification => dataNotification.concat(new_notification_data))

    } else {
      console.log(400)
      navigate("/Login")

  
    }
  
  } 

  const handleNotification = async(e, viaScrolling = false, newpage = 1) => {


    const token = localStorage.getItem("token")
    console.log("notif")
    if (setScrollTop === 0) {
      setScrollTop(0)
    }
    console.log(viaScrolling, "scrole")
    e.preventDefault()
    { viaScrolling === true ? setPage(page + 1) : setPage(page) }

    
    var config = {
      method: 'get',
      url: `${domain_url}/api/Notications?page=${page}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
    };
    
    axios(config)
    .then(function (response) {
      const data = response.data.data
      let new_notification_data = []
      new_notification_data = data
      setDataNotification(dataNotification => dataNotification.concat(new_notification_data))
    })
    .catch(function (error) {
      console.log(error);
    });
    



    // const result = await axios.get(`${domain_url}/api/Notications`, config)
    // const data = result.data
   
    // if (data.status === 200) {
    //     // redirect to home page
    //     console.log(data.data, "---***-200----")
    //     const new_notification_data = data.data.data.data
    //     console.log(new_notification_data.path, "123")
    //     // setDataNotification(...dataNotification, new_notification_data)
    //     setDataNotification(dataNotification => dataNotification.concat(new_notification_data))
    //     // setDataNotification((dataNotification) => [...dataNotification, new_notification_data])
    //     console.log(dataNotification, "data")
    //     // setValue([...value, newvalue])

    // } else {
    //   console.log(400)

  
    
    // }
  
  } 
  const handleScroll = event => {
    console.log("scroll ..")
    // console.log('scrollTop: ', event.currentTarget.scrollTop)
    // console.log('offsetHeight: ', event.currentTarget.offsetHeight)
    
    // if (event.currentTarget.scrollTop > 150 && event.currentTarget.scrollTop > scrollTop + 150) {
      console.log(event.currentTarget.scrollHeight - event.currentTarget.offsetHeight,Math.floor(event.currentTarget.scrollTop),"hany not")
      if (event.currentTarget.scrollHeight - event.currentTarget.offsetHeight === Math.floor(event.currentTarget.scrollTop)) {

      const newpage = page + 1
      setScrollTop(event.currentTarget.scrollTop)
      const viaScrolling = true
      setPage(newpage)
      handleNotification(event, viaScrolling, newpage)
  } else {
    // console.log("nothing to do")
    // console.log("not fetching ")
    }
  }

  const handleClickCar = url => {
    navigate(`carDetails?id=${url}`)
  }

  const handleClickSupport = url => {
    navigate(url)
  }
  // ** Function to render Notifications
  
  /*eslint-disable */

  function handleNotificationSeenItem(id,path){
    console.log("clicked")
    // console.log(id,path,"nnn")
    window.href = "/google"
  }
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar   onScroll={handleScroll}
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
            
            {dataNotification.map((item) => {
              console.log(item.created_at,"created ...")
              let not_id = item["Not id"]
              let path = `/contractDetails?id=${item.Contract_id}&notif_id=${not_id}&seen=true`
              let Read_data = item["Read_data"].length 
            // if(item.path.split("/")[0] === "car_request"){
              // href={path}
            return(
            <Dropdown.Item  className={Read_data?"NotificationItemGlobal ActiveNotificationItemGlobal":"NotificationItemGlobal"}  href={path}  id="active-notify">
            <div class="d-flex py-3 mb-3 item-notification">
              <div class="my-auto me-4">
                
                  <IconCar width={48} height={48} color='none'/>
                
                
                {/* <Notification /> */}
              </div>
              <div class="notif-content">
                <p class="notif-header">
                  {item.Title}
                </p>
                <p  class="notification-content">
                    {item.Body}
                </p>
                <p className="notification-content time-content " >
                   {item.created_at}
               </p>
    
           
                
               
  

      


              </div>
            </div>
            </Dropdown.Item>
         
            )
   
            
            })}

            {dataNotification.length == 0 && (
              <div class="notif-header notif-header-empty text-center mt-5">
                  لا يوجد إشعارات متاحة
              </div>
            ) }
          
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown
      tag="div"
      className="dropdown-notification nav-item ms-lg-auto d-inline"
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => handleNotificationFirstTime(e)}
      >

        {/* unseen */}
        {unseen ? (
          <Notification  />
        ): (
          <NotificationSeen  />
        )} 

      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0" >

        {renderNotificationItems()}

      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
