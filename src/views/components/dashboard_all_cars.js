
const dashboard_all_cars = ({all_cars}) => {
    console.log(all_cars, "all cars")
    return (
        <div className="statistics-component me-3 mt-2 mt-md-0">
            <div className="row py-2">
              <div className="col-8">
                <p className="statistics-number ps-4 pt-4">
                    {all_cars}
                </p>  
                <p className="statistics-component-text ps-4">
                    إجمالي المركبات
                </p>
              </div>
              <div className="col-3 me-4">
                  <img src={carsIcon} className="statistics-component-img  me-5 mt-4  " />
              </div>
            </div>
        </div>
        )
}
export default dashboard_all_cars