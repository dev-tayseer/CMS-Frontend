import { Mail, Home, LogOut } from "react-feather";
import {CarIcon, EmpIcon, Direction, HomeResponsive, CompanyResponsive, CarResponsive, EmployeeResponsive, HelpCenterResponsive} from "@src/views/components/icons/all_icons";


export default [
  {
    id: "home",
    title: "لوحة المعلومات",
    navLink: "/home",
  },
  {
    id: "companies",
    title: "العقود",
    navLink: "/contracts",
  },
  {
    id: "cars",
    title: "الإدارات",
    navLink: "/departments",
  },
  {
    id: "search_log",
    title: "الشركات",
    navLink: "/companies",
  },



  //old
  // {
  //   id: "employees",
  //   title: "المشرفين",
  //   navLink: "/employees",
  // },

  
  //new
  {
    id: "employees",
    title: "المشرفين",
    navLink: "/admin",
  },

  {
    id: "cities",
    title: "المدن",
    navLink: "/cities",
    
  },
  {
    id: "countries",
    title: "الدول",
    navLink: "/countries",
    
  },
  {
    id: "nationalities",
    title: "الجنسيات",
    navLink: "/nationalities",
    
  },


];
