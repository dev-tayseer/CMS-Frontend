import Alert from 'react-bootstrap/Alert'
import { Button, Label, Input, Row, Col } from 'reactstrap'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'

const AlertElement = ({headAlert, titleAlert, setShowAlert, showAlert, typeAlert}) => {
  console.log("alerting ",headAlert, titleAlert, showAlert, typeAlert)
  // showAlert = true
  // setShowAlert(showAlert)
    let item = null
    
    if (showAlert) {
      if (typeAlert === "Success") {
        item = <Alert color='primary' className='mt-3' variant="success">
        <div className="d-flex ">
          <div className="flex-grow-1 m-auto">
            <span className="color-05603A f-s-18px f-w-800 font-Almarai ">{headAlert}</span>
            <span className="color-05603A f-s-18px f-w-500 font-Almarai ps-1">{titleAlert}</span>  
          </div>
          <div className="pe-2 m-auto">
            <Button.Ripple color='white' className='btn-icon w-auto' onClick={() => setShowAlert(false)} >
              <CloseIcon width={23} height={23} color='#4D5761' />
            </Button.Ripple>
          </div>
        </div>
          
        </Alert>
      } else {
        item = <Alert color='primary' className='mt-3' variant="danger">
          <div className="d-flex ">
          <div className="flex-grow-1 m-auto">
            <span className="color-A6223D f-s-18px f-w-800 font-Almarai ">{headAlert}</span>
            <span className="color-A6223D f-s-18px f-w-500 font-Almarai ">{titleAlert}</span>  
          </div>
          <div className="pe-2 m-auto">
            <Button.Ripple color='white' className='btn-icon w-auto' onClick={() => setShowAlert(false)} >
              <CloseIcon width={23} height={23} color='#4D5761' />
            </Button.Ripple>
          </div>
        </div>
        </Alert>
      }

    } else {
      item = null
    }
    return item
  }

  
export default AlertElement