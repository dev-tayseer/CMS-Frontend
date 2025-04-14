
const CarInformation = ({label, value}) => {
    return (
        <>
            <div className="col-12 carDataInner text-center">
                <span className="mt-2 mb-2 spanCard spanCardHeader">
                {label}
                </span>
                <span className="spanCard mb-2 spanCardText">
                {value}
                </span>
            </div>
        </>
    )
    }
    export default CarInformation