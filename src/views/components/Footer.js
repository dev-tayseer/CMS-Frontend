import heart from "@src/assets/images/svg/heart.svg"


const Footer = () => {
    return (
        <>
        <div className="container container2 ps-md-0 pe-md-0 mt-4">

            <div className="footer ">
            <div className="d-flex footer-flex">
                <div className="me-auto text-start">
                    <p className="copyRight">
                    جميع الحقوق محفوظة © 2022
                    </p>
                    </div>
                <div className="text-end">
                    <span>
                    بواسطة التيسير - مصر
                    </span>
                    <img className="ms-2" src={heart} />
                </div>
            </div>

            </div>
        </div>
        </>

    )
  }
  
  export default Footer