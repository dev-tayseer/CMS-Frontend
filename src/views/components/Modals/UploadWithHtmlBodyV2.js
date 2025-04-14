import Modal from 'react-bootstrap/Modal'
import React, { useState, useEffect } from 'react'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../icons/all_icons'
import { Button, Label, Input, Row, Col } from 'reactstrap'
const UploadWithHtmlBodyV2 = ({ modal_animation, stateShowDialog, handleCloseConfirm, handleAccept, activationStatues2, activationStatues, title, classHeader, accept, content, cancel, btn_color, inactive_color }) => {
    let color_of_the_button = ''

    if (activationStatues & activationStatues2) {
        color_of_the_button = btn_color
    } else {
        color_of_the_button = inactive_color

    }
    // const class_button = `text-center btn-style color-FFFFFF d-block p-2 w-100 background-${color_of_the_button}`

    const handleAcceptAfterActive = () => {
      // handleCloseConfirm(true)
        if (activationStatues & activationStatues2) {
            handleAccept()
        }
    }
    return (
      
      <Modal animation={modal_animation} aria-labelledby="contained-modal-title-vcenter" centered show={stateShowDialog} onHide={handleCloseConfirm} >
        <Modal.Header className={classHeader}>

          <div className="col-6">
            <p className="modal-text-main2 pt-3">
            {title}
            </p>
          </div>
          <div className="col-6 text-end">
            <a onClick={handleCloseConfirm}>
              <CloseIcon width={24} height={24} color='#4D5761' />
            </a>
          </div>

        </Modal.Header>

        <Modal.Body>

          {content}
          

        </Modal.Body>
        <Modal.Footer>
          <div className="row buttons-row pt-3 pb-3">
          <div className="col-6  ">
              <a className="text-center f-s-16px f-w-700 btn-style background-FBB827 color-5F605F d-block p-2 w-100" disable={activationStatues & activationStatues2} onClick={handleAcceptAfterActive}>
                {/* {accept} */}
                تأكيد
              </a>
            </div>
            <div className="col-6  ">
              <a className="text-center f-s-16px f-w-700  btn-style background-F7FAF7 color-5F605F d-block p-2 w-100" onClick={handleCloseConfirm}>
                  إلغاء
              </a>
            </div>

          </div>
        </Modal.Footer>
        </Modal>
    )

}
export default UploadWithHtmlBodyV2