import documentIcon from "@src/assets/images/svg/documentIcon.svg"
import { IconLoad, SearchRefraction, Globe, CheckVerified } from '../icons/all_icons'
import iconLoad from "@src/assets/images/svg/iconLoad.svg"

const CarRestoreDateEntry = ({label, date, type}) => {
    if (type === "1") {
        return (
            <>
                <div className="row mt-3 mb-5">
                    <div className="col-12  ">
                    <div className="mx-4  carRestoreInner ">
                    <span className="mt-3 ms-3 mb-2 spanCard spanRestoreHeader">
                    {label}
                    </span>
                    <span className=" ms-3 mb-2 spanCard spanRestoreDate2">
                    {date}
                    </span>
                    </div>
                    </div>
                 
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="row mt-3">
                    <div className="col-12  ">
                    <div className="mx-4  carRestoreInner ">
                    <span className="mt-3 ms-3 mb-2 spanCard spanRestoreHeader">

                    {label}
                    </span>
                    <span className=" ms-3 mb-2 spanCard spanRestoreNameUnavailable">
                    غير متاح
                    </span>

                    </div>
                    </div>
                 
                </div>
            </>
        )
    } 

    }
    export default CarRestoreDateEntry