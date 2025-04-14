// ** Logo
// import logo from "@src/assets/images/svg/logo-tayseer.svg";
import logo from "@src/assets/images/tayseer_loader.gif";

// LoaderContext
const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      <img className="fallback-logo" src={logo} width={350} height={350} alt="logo" />
      {/* <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div> */}
    </div>
  );
};

export default SpinnerComponent;
