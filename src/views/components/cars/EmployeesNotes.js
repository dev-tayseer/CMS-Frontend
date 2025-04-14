import documentIcon from "@src/assets/images/svg/documentIcon.svg"

import CarInfo1  from "./CarInfo1"
import CarInformation from "./CarInformation"
import CarDocuments from "./CarDocuments"

const EmployeesNotes = ({collectorNotes, yardNotes}) => {
   

    return (
        <>
            <div className="col-lg-9 ">

                <div className="col-12 mt-5 firstHalfCarData">
                    <p className="car-data-text pb-1 p-4 ">
                    ملاحظات الموظفين
                    </p>
                        
                        <div className="row mx-2 mt-4 ">
                            
                            <div className="col-sm-6">
                                <div className="col-12 carDataInner py-3 mb-4" >
                                        <span className="mt-2 mb-2 spanCard spanCardHeader ms-3">
                                            ملاحظة موظف السحب
                                        </span>
                                        {collectorNotes === null | collectorNotes === ""  ? <span className="spanCard mb-2 NotAvailableText ms-3"> غير متاح  </span> : <span className="spanCard mb-2 spanCardText ms-3"> {collectorNotes} </span>}

                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="col-12 carDataInner py-3" >
                                    <span className="mt-2 mb-2 spanCard spanCardHeader ms-3">
                                    ملاحظة موظف الإستعادة
                                        </span>
                                        {yardNotes === null | yardNotes === ""  ? <span className="spanCard mb-2 NotAvailableText ms-3"> غير متاح  </span> : <span className="spanCard mb-2 spanCardText ms-3"> {yardNotes} </span>}
                                        

                                    
                                </div>
                            </div>
                             
                            
                        </div>
                        

    
                </div>
            </div>
        </>
    )
    }
    export default EmployeesNotes