// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";
import AuthCover  from "./protected"

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  // vertical: <HorizontalLayout />,

  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home"

const Home = lazy(() => import("../../views/Home"))
const AddDepartment = lazy(() => import("../../views/department/AddDepartment"))
const Department_list = lazy(() => import("../../views/department/list"))
const AddCompany = lazy(() => import("../../views/cmpany/AddCompany"))



const Nationalities_list = lazy(() => import("../../views/nationalities/list"))
const AddNationalities = lazy(() => import("../../views/nationalities/AddNationality"))

const Countries_list = lazy(() => import("../../views/countries/list"))
const AddCountries = lazy(() => import("../../views/countries/AddCountry"))

const Cities_list = lazy(() => import("../../views/cities/list"))
const AddCities = lazy(() => import("../../views/cities/AddCity"))




const CompanyDetails = lazy(() => import("../../views/cmpany/companyDetails"))
const Company_list = lazy(() => import("../../views/cmpany/list"))
const Admin_list = lazy(() => import("../../views/admin/list"))
const Permission_list = lazy(() => import("../../views/permissions/list"))

const Contract_list = lazy(() => import("../../views/contract/list"))
const ContractDetails = lazy(() => import("../../views/contract/contractDetails"))
const AddContract = lazy(() => import("../../views/contract/AddContract"))
const AddContractRental = lazy(() => import("../../views/contractrental/addContractRental"))

const AddContractNDA = lazy(() => import("../../views/contractNDA/AddContractNDA"))
const ContractNDA_list = lazy(() => import("../../views/contractNDA/list"))
const ContractNDADetails = lazy(() => import("../../views/contractNDA/contractNDADetails"))



const ContractRental_list = lazy(() => import("../../views/contractrental/list"))
const ContractAuction_list = lazy(() => import("../../views/contractauction/list"))
const AddContractAuction = lazy(() => import("../../views/contractauction/addContractAuction.js"))
const ContractRentalDetails = lazy(() => import("../../views/contractrental/contractRentalDetails"))



const NotAuthorized = lazy(() => import("../../views/NotAuthorized"))





// old mani urls
const Documents = lazy(() => import("../../views/Documents"))
const AddCar = lazy(() => import("../../views/cars/AddCar"))
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const Error = lazy(() => import("../../views/Error"))
const ALL_CARS = lazy(() => import("../../views/cars/list"))
// const Company_list = lazy(() => import("../../views/company/list"))
const Employee_list = lazy(() => import("../../views/employees/list"))
const CarDetails = lazy(() => import("../../views/cars/carDetails"))
const HelpCenter = lazy(() => import("../../views/HelpCenter/list"))
const AddEmployee = lazy(() => import("../../views/employees/AddEmployee"))
// const AddCompany = lazy(() => import("../../views/companies/AddCompany"))
const SearchLog = lazy(() => import("../../views/SearchLog/list"))



// ** Merge Routes

const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    // element: <Home></Home>
    element: <AuthCover element="0"><Home></Home></AuthCover>

  },
  {
    path: "/Documents",
    element: <AuthCover element="x"><Documents></Documents></AuthCover>

  },
 
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/addDepartment",
    element: <AuthCover element="9"><AddDepartment></AddDepartment></AuthCover>
  },
  {
    path: "/departments",
    element: <AuthCover element="8"><Department_list></Department_list></AuthCover>
  },
  {
    path: "/companies",
    element: <AuthCover element="12"><Company_list></Company_list></AuthCover>
  },
  {
    path: "/nationalities",
    element: <AuthCover element="12"><Nationalities_list></Nationalities_list></AuthCover>
  },
  {
    path: "/addNationalities",
    element: <AuthCover element="13"><AddNationalities></AddNationalities></AuthCover>

  },


  {
    path: "/countries",
    element: <AuthCover element="12"><Countries_list></Countries_list></AuthCover>
  },
  {
    path: "/addCountries",
    element: <AuthCover element="13"><AddCountries></AddCountries></AuthCover>
  },

  {
    path: "/cities",
    element: <AuthCover element="12"><Cities_list></Cities_list></AuthCover>
  },
  {
    path: "/addCities",
    element: <AuthCover element="13"><AddCities></AddCities></AuthCover>
  },



  {
    path: "/addCompany",
    element: <AuthCover element="13"><AddCompany></AddCompany></AuthCover>

  },
  {
    path: "/companyDetails",
    element: <AuthCover element="3"><CompanyDetails></CompanyDetails></AuthCover>

  },
  {
    path: "/admin",
    element: <AuthCover element="16"><Admin_list></Admin_list></AuthCover>

  },

  {
    path: "/contracts",
    element: <AuthCover element="1"><Contract_list></Contract_list></AuthCover>

  },


  

  {
    path: "/contractDetails",
    element: <AuthCover element="3"><ContractDetails></ContractDetails></AuthCover>

  },

  {
    path: "/contractRentalDetails",
    element: <AuthCover element="3"><ContractRentalDetails></ContractRentalDetails></AuthCover>

  },

  {
    path: "/ContractNDADetails",
    element: <AuthCover element="3"><ContractNDADetails></ContractNDADetails></AuthCover>

  },

  

  

  {
    path: "/addContract",
    element: <AuthCover element="6"><AddContract></AddContract></AuthCover>

  },
  {
    path: "/AddContractRental",
    element: <AuthCover element="6"><AddContractRental></AddContractRental></AuthCover>

  },
  {
    path: "/AddContractAuction",
    element: <AuthCover element="6"><AddContractAuction></AddContractAuction></AuthCover>

  },

  {
    path: "/AddContractNDA",
    element: <AuthCover element="6"><AddContractNDA></AddContractNDA></AuthCover>

  },

  {
    path: "/ContractRental",
    element: <AuthCover element="1"><ContractRental_list></ContractRental_list></AuthCover>

  },
  {
    path: "/ContractAuction",
    element: <AuthCover element="1"><ContractAuction_list></ContractAuction_list></AuthCover>

  },

  {
    path: "/ContractNDA",
    element: <AuthCover element="1"><ContractNDA_list></ContractNDA_list></AuthCover>

  },
  
  {
    path: "/permissions",
    element: <AuthCover element="21"><Permission_list></Permission_list></AuthCover>

  },
  {
    path: "/NotAuthorized",
    element: <AuthCover element="0"><NotAuthorized></NotAuthorized></AuthCover>

  },

  
  
  
  
  
]


// const Routes = [
//   {
//     path: "/",
//     index: true,
//     element: <Navigate replace to={DefaultRoute} />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/second-page",
//     element: <SecondPage />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     meta: {
//       layout: "blank"
//     }
//   },
//   {
//     path: "/register",
//     element: <Register />,
//     meta: {
//       layout: "blank",
//     },
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//     meta: {
//       layout: "blank",
//     },
//   },
//   {
//     path: "/error",
//     element: <Error />,
//     meta: {
//       layout: "blank",
//     },
//   },
// ];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const 

getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
