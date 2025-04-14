import React, {useState, useEffect} from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css'
import Dropdown from 'react-bootstrap/Dropdown'
import iconcar from "@src/assets/images/svg/icon-car.svg"

export default function Notification({image}) {
  const [limit, setLimit] = useState(3)
  const [page, setPage] = useState(1)
  const [searchKey, setSearchKey] = useState("")
  const [dataNotification, setDataNotification] = useState([])

  const handleNotification = async(details) => {
    // limit: limit, page: page, search_key: searchKey
    const result = await axios.post('http://127.0.0.1:8000/notification/', {})
    const data = result.data
    console.log(data, "data .....")
    if (data.status === 200) {
        // redirect to home page
        console.log(data.data.data.data, "--------")
        setDataNotification(data.data.data.data)
        console.log(dataNotification, "data")

    } else {
      console.log(400)

  
    }
  
  } 
  const handleScroll = event => {
    console.log('scrollTop: ', event.currentTarget.scrollTop)
    console.log('offsetHeight: ', event.currentTarget.offsetHeight)
  }
  return (
    <div >
      <Dropdown className="notification" align="end" >
        <Dropdown.Toggle id="dropdown-basic" >
        <img src={image} onClick={handleNotification} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          
        {dataNotification.map((item) => {
             return (
            <Dropdown.Item key={item.id} href="#" id="active-notify">
            <div className="d-flex py-3 mb-3 item-notification">
              <div className="my-auto me-5">
                <img src={iconcar} />
              </div>
              <div className="notif-content">
                <p className="notif-header">
                طلب سحب مركبة
                </p>
                <p  className="notification-content">
                <span>
                قام
                </span>
                <span className="notify-name">
                ”محمد إسلام“
                </span>
                <span>
                بطلب سحب مركبة رقم
                </span>
                <span className="notify-number">
                  ”ا ب س 1234“ 
                  </span>
                  <p>
                      
                      قم بألتاكد من الصور المرفقة، وإرفاق محضر التنفيذ، ليتمكن الموظف من سحب المركبة 

                    </p>

                </p>

          
                <p>
                01/09/2022 at 04:30 PM
                </p>

                <button className="btn-notification text-center w-100 p-2">تفاصيل المركبة</button>
         
              </div>
            </div>
            </Dropdown.Item>
             )
          })}

          {/* <Dropdown.Item href="#" id="active-notify">
            <div className="d-flex py-3 mb-3 item-notification">
              <div className="my-auto me-5">
                <img src={iconcar} />
              </div>
              <div className="notif-content">
                <p className="notif-header">
                طلب سحب مركبة
                </p>
                <p  className="notification-content">
                <span>
                قام
                </span>
                <span className="notify-name">
                ”محمد إسلام“
                </span>
                <span>
                بطلب سحب مركبة رقم
                </span>
                <span className="notify-number">
                  ”ا ب س 1234“ 
                  </span>
                  <p>
                      
                      قم بألتاكد من الصور المرفقة، وإرفاق محضر التنفيذ، ليتمكن الموظف من سحب المركبة 
                      

                    </p>

                </p>

          
                <p>
                01/09/2022 at 04:30 PM
                </p>

                <button className="btn-notification text-center w-100 p-2">تفاصيل المركبة</button>
         
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item href="#" >
            <div className="d-flex py-3 mb-3 item-notification">
              <div className="my-auto me-5">
                <img src={iconcar} />
              </div>
              <div className="notif-content">
                <p className="notif-header">
                طلب سحب مركبة
                </p>
                <p  className="notification-content">
                <span>
                قام
                </span>
                <span className="notify-name">
                ”محمد إسلام“
                </span>
                <span>
                بطلب سحب مركبة رقم
                </span>
                <span className="notify-number">
                  ”ا ب س 1234“ 
                  </span>
                  <p className="inner-p">
                      
                      قم بألتاكد من الصور المرفقة، وإرفاق محضر التنفيذ، ليتمكن الموظف من سحب المركبة
                      

                    </p>

                </p>

          
                <p>
                01/09/2022 at 04:30 PM
                </p>
                <button className="btn-notification text-center w-100 p-2">تفاصيل المركبة</button>

              </div>
            </div>
          </Dropdown.Item> */}

        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}