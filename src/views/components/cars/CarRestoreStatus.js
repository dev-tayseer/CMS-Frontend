import documentIcon from "@src/assets/images/svg/documentIcon.svg"
import { IconLoad, SearchRefraction, Globe, CheckVerified } from '../icons/all_icons'
import iconLoad from "@src/assets/images/svg/iconLoad.svg"

const CarRestoreStatus = ({status, label, value = "sd"}) => {
    console.log(status, "s0")
     if (status === "2") {
        return (
            <>
                    <div className="row">
                        <div className="col-12  ">
                        <div className="mx-4  carRestoreInner ">
                        <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">
                            {label}
                        </span>
                        <button className="btn notClickable  btn-restore-color-bg py-2 ms-3  mb-3 ">
                        <span >
                                {/* <img className="me-3" src={iconLoad} /> */}
                                <IconLoad width="19" height="20" classes="me-3" />
                            </span>
                            {/* {value} */}
                            قيد التنفيذ
                        </button>
                        </div>
                        </div>
                     
                    </div>
            </>
        )
    } else if (status === "3") {
        return (
            <>
                    <div className="row">
                        <div className="col-12  ">
                        <div className="mx-4  carRestoreInner ">
                        <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">
                            {label}
                        </span>
                        <button className="btn notClickable  btn-restore-color-bg3 py-2 ms-3  mb-3 ">
                        <span >
                                {/* <img className="me-3" src={iconLoad} /> */}
                                <Globe width="20" height="20" classes="me-3" />
                            </span>
                            تم السحب
                        </button>
                        </div>
                        </div>
                     
                    </div>
            </>
        )

    } else if (status === "4") {
        console.log("44444444")
        return (
            <>
                    <div className="row">
                        <div className="col-12  ">
                        <div className="mx-4  carRestoreInner ">
                        <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">
                            {label}
                        </span>
                        <button className="btn notClickable  btn-restore-color-bg4 py-2 ms-3  mb-3 ">
                        <span >
                                {/* <img className="me-3" src={iconLoad} /> */}
                                <CheckVerified width="20" height="20" classes="me-3" />
                            </span>
                            تم الإستعادة
                        </button>
                        </div>
                        </div>
                     
                    </div>
            </>
        )
    } else {
            return (
                <>
                        <div className="row">
                            <div className="col-12  ">
                            <div className="mx-4  carRestoreInner ">
                            <span className="mt-2 ms-3 mb-2 spanCard spanRestoreHeader">
                                {label}
                            </span>
                            <button className="btn notClickable  btn-restore-color-bg2 py-2 ms-3  mb-3 ">
                            <span >
                                    {/* <img className="me-3" src={iconLoad} /> */}
                                    <SearchRefraction width="21" height="20" classes="me-3" />
                                </span>
                                {/* {value} */}
                                قيد الانتظار
                            </button>
                            </div>
                            </div>
                         
                        </div>
                </>
            )
    }

    }
    export default CarRestoreStatus