import Modal from 'react-bootstrap/Modal'

import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../icons/all_icons'
import { Button, Label, Input, Row, Col } from 'reactstrap'
const UploadWithHtmlBody = ({ stateShowDialog, handleCloseConfirm, handleAccept, activationStatues, title, classHeader, accept, content, cancel, btn_color, inactive_color }) => {
    let color_of_the_button = ''

    if (activationStatues) {
        color_of_the_button = btn_color
    } else {
        color_of_the_button = inactive_color

    }
    const class_button = `text-center btn-style color-FFFFFF d-block p-2 w-100 background-${color_of_the_button}`

    const handleAcceptAfterActive = () => {

        if (activationStatues) {
            handleAccept()
        }
    }
    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={stateShowDialog} onHide={handleCloseConfirm} >
        <Modal.Header className={classHeader}>

          <div className="col-6">
            <p className="modal-text-main pt-3">
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
              <a className="text-center btn-style background-A0A8B3 color-FFFFFF d-block p-2 w-100" onClick={handleCloseConfirm}>
                {cancel}
              </a>
            </div>
            <div className="col-6  ">
              <a className={class_button} disable={activationStatues} onClick={handleAcceptAfterActive}>
                {accept}
              </a>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )

}
export default UploadWithHtmlBody