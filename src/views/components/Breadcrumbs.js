import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({icon, Arrows, urlMain, main, second}) => {
    const navigate = useNavigate();
return (
    <>
        <div className="header-icon-container pt-5">
            <a href='/'>
            <img src={icon} height="24" width="24" />
            </a>
            <span className="ps-3">
            <img src={Arrows} height="24" width="24" />
            </span>
            <a className="ps-3 f-w-700 f-s-12px color-4788C6 font-Almarai no-decoration" href={urlMain}>
            {main}
            </a>
            <span className="ps-3" >
            <img src={Arrows} height="24"  width="24" />
            </span>
            <span className="ps-3 f-w-700 f-s-12px color-A0A8B3 font-Almarai">
            {second}
            </span>
        </div> 
    </>
)
}
export default Breadcrumbs