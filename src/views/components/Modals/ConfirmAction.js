
import Modal from 'react-bootstrap/Modal'

import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../icons/all_icons'
import { Button, Label, Input, Row, Col } from 'reactstrap'
const ConfirmAction = ({ stateShowDialog, handleCloseConfirm, handleAccept, title, classHeader, accept, content, cancel, btn_color }) => {

    const button_class = `text-center block btn-accept text-center  p-3 w-100 background-${btn_color} `
    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={stateShowDialog} onHide={handleCloseConfirm}>
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

                <div className="row">
                    <p className="confirm-logout-text pt-4 pb-5 mb-5">
                        {content}
                    </p>
                </div>
                {/* <hr/> */}

            </Modal.Body>
            <Modal.Footer>
                <div className="row buttons-row pt-3 pb-3">
                    <div className="col-6  ">
                        <a className="text-center block btn-cancel text-center  p-3 w-100" onClick={handleCloseConfirm}>
                            {cancel}
                        </a>
                    </div>
                    <div className="col-6  ">
                        <a className={button_class} onClick={handleAccept}>
                            {accept}
                        </a>
                    </div>
                </div>
            </Modal.Footer>

        </Modal>
    )
}

export default ConfirmAction