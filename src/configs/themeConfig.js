// Logo Import
import logo from "@src/assets/images/logo/logo.png";
import logoSmall from "@src/assets/images/logo/logoSmall.svg";

// You can customize the template with the help of this file
// let live_url= "http://10.12.20.12:8013"
let live_url= "https://cmsbackend.tac.loc"
// let test_url= "http://10.12.20.12:8085"
let local_url= "http://127.0.0.1:8000"
let domain_url= "http://10.12.20.12:8017"

// let test_url2 = "http://10.12.20.12:8017"

//Template config options
const themeConfig = {
  app: {
    appName: "العقود",
    appLogoImage: logo,
    
  },
  url: local_url,
  main_url: import.meta.env.VITE_BASE_URL,
  appLogoImageSmall:logoSmall,
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    type: "horizontal", // vertical, horizontal
    contentWidth: "boxed", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "floating", // static , sticky , floating, hidden
      backgroundColor: "white", // BS color options [primary, success, etc]
    },
    footer: {
      type: "static", // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
    toastPosition: "top-right", // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  },
};

export default themeConfig;
