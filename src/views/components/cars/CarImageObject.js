import NotAvailable from "@src/assets/images/svg/NotAvailable.svg"
// import { NotAvailable} from '../icons/all_icons'

const CarImageObject = ({classes, image}) => {
    if (image === "") {

        return (
            <>
                    <div className={classes} >
                        {/* <NotAvailable width="286" height="149" classes="mt-2 ms-3 me-3 mb-2 image-content" />   */}
                        <img src={NotAvailable} className="mt-2 ms-3 me-3 mb-2 image-content"   /> 
                    </div>
            </>
        )
    } else {
        return (
            <>
                    <div className={classes} >
                        <a target="_blank" href={image}>
                        <img src={image} className="mt-2 ms-3 me-3 mb-2 image-content"   /> 
                        </a> 
                    </div>
            </>
        )
    }
    }
    export default CarImageObject