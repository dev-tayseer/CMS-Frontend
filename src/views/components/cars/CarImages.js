import NotAvailable from "@src/assets/images/svg/NotAvailable.svg"
import CarImageObject from "./CarImageObject"

const CarImages = ({images}) => {
    return (
        <>
            <div className="col-lg-3 ">
            <div className="col-12 secondHalfCarData">
            <div className="col-12 secondHalfCarData pb-2">
                <p className="car-restoring-text px-4 pt-4 ">
                صور المركبة
                </p>
                <div className="row m-0 p-0">
                    {images !== "" &&
                    <div className="col-12 car_list mb-4 p-0">
                    {
                        
                    images.map((image) => {
                        console.log(image, "-------")
                        const path = `https://mani.solidsolutionsegypt.net/${image.path}`
                        console.log(path, "path .................")
                        return <CarImageObject classes="mt-1" image={path} />
                    })
                    }

                    </div>
                    }
                 
                </div>

            </div>
            </div>
            </div>
        </>
    )
    }
    export default CarImages