import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { useNavigate } from "react-router-dom";

const DetailsInfo = ({image, title}) => {
    const navigate = useNavigate();

    return (
        <>
        <div className="row pt-4 rowDetails pb-3">
            <div className="col-lg-4">
                <a onClick={() => navigate(-1)}>
                    <span >
                        <img src={image} />
                    </span>
                </a>
                <span className="f-w-800 f-s-24px color-1F2733 ms-3 ">
                    {title}
                </span>
            </div>
            <div className="col-lg-8 mt-2 text-lg-end ">
                
               
            </div>
            {/* <hr className="ms-3 me-3 hrRowDetails" /> */}

        </div>
        </>
    )
    }
    export default DetailsInfo