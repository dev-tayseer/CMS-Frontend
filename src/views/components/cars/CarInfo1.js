const CarInfo1 = ({plate_num, chasis_num, plate_num_en, chasis_num_en, className }) => {
    function reversePlate(plate)  {
        return plate.split("").reverse().join("");

      }
    return (
            <div className={className}>

                <span className="span1 text-center p-3 f-w-700 color-1F2733 f-s-16 font-Almarai">
                {plate_num}
                </span>
                <span className="span2 text-center p-3 f-w-700 color-1F2733 f-s-16 font-Almarai">
                {`${reversePlate(chasis_num)}`}
                </span>
                <span className="span3 text-center p-3 f-w-700 color-1F2733 f-s-16 font-Almarai">
                {`${reversePlate(plate_num_en)}`}

                </span>
                <span className="span4 text-center p-3 f-w-700 color-1F2733 f-s-16 font-Almarai">
                {`${reversePlate(chasis_num_en)}`}

                </span>

            </div>
    )
}

export default CarInfo1