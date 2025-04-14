import documentIcon from "@src/assets/images/svg/documentIcon.svg"

import CarInfo1  from "./CarInfo1"
import CarInformation from "./CarInformation"
import CarDocuments from "./CarDocuments"

const CarData = ({...params}) => {
    console.log(params, "par")
   

    return (
        <>
            <div className="col-lg-6 ">
            <div className="col-12 firstHalfCarData">
                <p className="car-data-text p-4 pb-3">
                بيانات المركبة
                </p>
                <p className="car-panel-text text-center">
                لوحة المركبة
                </p>
                <CarInfo1 plate_num={params.plate_number} chasis_num={params.chasis_num} plate_num_en={params.plate_num_en} chasis_num_en={params.chasis_num_en} className="m-auto px-md-4 px-2" />
                           
                <div className="row mx-2 mt-4 pe-2">

                    <div className="col-6 " >
                        <CarInformation label="رقم الشاسيه" value={params.chasis_number_origin}  />
                    </div>
                    <div className="col-6 " >
                        <CarInformation label="الموقع" value={params.area}  />
                    </div>
                    <div className="col-4 mt-4" >
                        
                    <CarInformation label="الماركة" value={params.brand}  />
                    </div>
                    <div className="col-4 mt-4" >
                    <CarInformation label="الموديل" value={params.model}  />
                    </div>
                    <div className="col-4 mt-4" >
                    <CarInformation label="سنة الصنع" value={params.manufacture_year}  />

                    </div>
            
                    <div className="col-6 mt-4 mb-4" >
                    <CarInformation label="النوع" value={params.type}  />

                    </div>
                    <div className="col-6 mt-4 mb-4" >
                    <CarInformation label="اللون" value={params.color}  />

                    </div>


                </div>

  
            </div>
            {/* document attached component  */}
            <div className="col-12 mt-5 firstHalfCarData">
                <p className="car-data-text pb-1 p-4 ">
                المرفقات
                </p>
                    { params.carDocuments !== "" && 
                    <div className="row mx-2 mt-4">
                        {
                            params.carDocuments.map((item) => {
                                // console.log("Abas")
                                // console.log(item)
                                let label = ""
                                if (item.type === 'yard_delivery') {
                                    label = "محضر الإستلام"
                                } else if (item.type === 'collector_execution') {
                                    label = "محضر التنفيذ"
                                } 
                                // else if (item.type === 'collector_car_images') {
                                //     label = ""
                                // } else if (item.type === 'yard_delivery') {
                                //     label = ""
                                // } 
                                else {
                                    label = "محضر التنفيذ"
                                }
                                return <CarDocuments label={label} value={item.path} />
                            })
                        }
                    </div>
                    }

  
            </div>
            {/* end document attached component  */}
            </div>
        </>
    )
    }
    export default CarData