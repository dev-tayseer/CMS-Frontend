import documentIcon from "@src/assets/images/svg/documentIcon.svg"
import { IconLoad, SearchRefraction, Globe, CheckVerified } from '../icons/all_icons'
import iconLoad from "@src/assets/images/svg/iconLoad.svg"


function get_car_requests_files_length(row) {
    if (row.car_requests !=null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].files.length
    } else {
      return null
    }
  } else {
    return null
  }
  }

const CarRestoreStatusSejelCertificate = ({label, value, path,length}) => {

    console.log(length, "999    ")

    

     if (length === 0) {
        return (
            <>
                <div className="row mt-3">
                    <div className="col-12  ">
                    <div className="mx-4  carRestoreInner ">
                    <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">

                        {label}
                    </span>
                    <button className="btn btn-restore-color-gray-bg2 notClickable py-2 ms-3  mb-3 ">

                    مطلوب إرفاق محضر التنفيذ

                    </button>
                    </div>
                    </div>
                 
                </div>
            </>
        )
    } else if (length > 0) {
        return (
            <>
                <div className="row mt-3">
                    <div className="col-12  ">
                    <div className="mx-4  carRestoreInner ">
                    <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">
                        {label}
                    </span>
                    <a href={path} className="btn btn-restore-color-gray-bg6  notClickable py-2 ms-3  mb-3 ">
                    تم إرفاق المستند

                    </a>
                    </div>
                    </div>
                 
                </div>
            </>
        )

    }
    else  {
        return (
            <>
                <div className="row mt-3">
                    <div className="col-12  ">
                    <div className="mx-4  carRestoreInner ">
                    <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">

                        {label}
                    </span>
                    <button className="btn btn-restore-color-gray-bg5  notClickable py-2 ms-3  mb-3 ">

                    غير مطلوب
                    </button>
                    </div>
                    </div>
                 
                </div>
            </>
        )
    }

    }
    export default CarRestoreStatusSejelCertificate