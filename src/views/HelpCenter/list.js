import React, { useState, useEffect } from 'react'
import AlertElement from "../components/AlertElement"


// //////////////////////////////////////////////////

import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableServerSide from './TableServerSide'
import axios from 'axios'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { Car, Settings, Download, Share } from '../components/icons/all_icons'
export let store
export let data

const HelpCenter = () => {

  const [showAlert, setShowAlert] = useState(false)
  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")

  useEffect(() => {
    const nav_links = document.getElementsByClassName("lnk")
    for (let i = 0; i < nav_links.length; i++) {
      nav_links[i].classList.remove("active")
   }

  }, [])


  

  return (
    <div className="theme-content px-0 px-md-5">

      <div className="container-fluid">
      <Row className=' mt-4'>
          <Col className='ps-md-0'>
            <Label className='label-color-black f-s-24px font-Almarai  f-w-800'> مركز الدعم</Label>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1  ps-5 col-sm-2 pe-2' sm='2'>
            
          </Col>
        </Row>
 

        <AlertElement  headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        <div className='row mt-3'>
          <hr></hr>
        </div>
      <TableServerSide setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert}/>
      </div>

</div>

  )
}

export default HelpCenter
