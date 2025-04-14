import image from "@src/assets/images/svg/Loading.svg"
import logo from "@src/assets/images/tayseer_loader.gif";


const Loader = () => {
return (
    // <img className="image-loader" src={image} />
    <div className="fallback-spinner app-loader">
    <img className="fallback-logo" src={logo} width={350} height={350} alt="logo" />
    {/* <div className="loading">
      <div className="effect-1 effects"></div>
      <div className="effect-2 effects"></div>
      <div className="effect-3 effects"></div>
    </div> */}
  </div>
)
}
export default Loader