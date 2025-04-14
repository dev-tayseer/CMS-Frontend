// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import NavbarUser from "./NavbarUser";

// ** Third Party Components
// import { Sun, Moon, Menu } from "react-feather";
import { Sun, Moon } from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";
import NotificationDropdown from "../../../../views/components/NotificationDropdown.js"
import React, { useState, useEffect } from 'react'
import { Close, Logo, Direction, Menu, NavSearch } from '../../../../views/components/icons/all_icons'

import Modal from 'react-bootstrap/Modal'
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import themeConfig from "@configs/themeConfig";
// import loadersearch from "@src/assets/images/small-loader.gif";
import loadersearch from "@src/assets/images/loader-search-awes.svg";



import axios from 'axios'
import DropDownSetting from "../../../../views/components/DropDownSetting.js";

const domain_url = themeConfig.url



const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  const [filtering, setFiltering] = useState(false)
  const [searching, setsearching] = useState(false)
  const [search_results, setsearch_results] = useState([])







  function handleFilterSearch(e) {
    const value = e.target.value
    console.log(value, "......")
    if (value == "") {
      setFiltering(false)
    }
    else {
      setsearching(true)
      setFiltering(true)
      const token = localStorage.getItem("token")

      var config = {
        method: 'get',
        url: `${domain_url}/Contract/search/?search_key=${value}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data), "searching");
          const result = response.data
          let search_results_list = []
          for (var i = 0; i < response.data.length; i++) {
            search_results_list.push({
              "id": response.data[i].id,
              "Contract_Name": response.data[i].Contract_Name,
              "Contract_Number": response.data[i].Contract_Number,

            })
          }
          setsearch_results(search_results_list)
          setsearching(false)


        })
        .catch(function (error) {
          console.log(error);
          setsearching(false)
        });

    }
  }

  const [show_Modal, setShow_Modal] = useState(false)
  const [mobileNav, setMobileNav] = useState(true)

  const handleClose = () => setShow_Modal(false)
  const handleShow = () => setShow_Modal(true)
  const navigate = useNavigate()
  const handleConfirmLogout = () => {
    console.log("yeeeeeeeeeeee")
    localStorage.removeItem("token")
    navigate('/Login')
  }
  return (
    <>
      <Modal show={show_Modal} onHide={handleClose}>
        <Modal.Header className='background-F7FAF7'>

          <div className="col-6">
            <p className="modal-text-main pt-3">
              تسجيل الخروج
            </p>
          </div>
          <div className="col-6 text-end">
            <a onClick={handleClose}>
              <Close width={24} height={24} color='none' />
            </a>
          </div>

        </Modal.Header>

        <Modal.Body>

          <div className="row">
            <p className="confirm-logout-text pt-4 pb-5 mb-5">
              هل انت متأكد من تسجيل الخروج؟
            </p>

          </div>
          {/* <hr/> */}

        </Modal.Body>
        <Modal.Footer>
          <div className="row buttons-row pt-3 pb-3">
            <div className="col-6  ">
              <a className="text-center block btn-accept text-center  p-3 w-100" onClick={handleConfirmLogout}>
                نعم
              </a>
            </div>
            <div className="col-6  ">
              <a className="text-center block btn-cancel text-center  p-3 w-100" onClick={handleClose}>
                إلغاء
              </a>
            </div>

          </div>
        </Modal.Footer>

      </Modal>


      <NavbarUser skin={skin} setSkin={setSkin} />


      <NavItem className="me-3 d-none d-xl-block">

        <div className="input-search-container">
          <NavSearch width="20" height="20" />
          <input type="text" className="form-control nav-search" placeholder="ابحث" onChange={(e) => handleFilterSearch(e)} />

          {filtering && (
            <ul class="suggestions" >
              {searching && (
                <li className="searching d-block">
                  <div className="text-center">
                    <img src={loadersearch} className="text-center " />
                  </div>
                </li>
              )}
              {/* {noResult && (
                <li className="searching d-block">
                  <div className="text-center">
                      لا يوجد نتائج
                  </div>
                </li>
            )} */}

              {search_results.map(function (object, i) {
                let id = object.id
                let path = `/contractDetails?id=${id}`
                return (
                  <>
                    <li className="search-result">
                      <a target="_blank" className="search-result" href={`${path}`} >
                        <div className="ps-1">
                          {object.Contract_Name}
                        </div>
                        <div className="ps-1 pt-3">
                          {object.Contract_Number}
                        </div>
                      </a>

                    </li>
                  </>
                );


              })}
              {/* <li className="search-result">نتيجة بحث رقم “1”</li> */}
              {/* <li className="search-result">نتيجة بحث رقم “2”</li> */}
              {/* <li className="search-result">نتيجة بحث رقم “3”</li> */}
              {/* <li className="search-result">نتيجة بحث رقم “4”</li> */}


            </ul>
          )
          }
        </div>
      </NavItem>

      

      <NavItem className=" d-lg-block me-3 d-order-1">
        <NotificationDropdown />
      </NavItem>

      <NavItem className=" d-lg-block me-3 d-order-1">
        <DropDownSetting />
      </NavItem>

      <Fragment>

        <div className="bookmark-wrapper d-flex align-items-center">
          <ul className="navbar-nav d-xl-none">
            <NavItem className="mobile-menu me-auto">
              <NavLink
                className="nav-menu-main menu-toggle hidden-xs is-active "
                onClick={() => setMenuVisibility(true)}
              >
                <Menu />
                {/* <Menu className="ficon" /> */}
              </NavLink>
            </NavItem>
          </ul>

        </div>
      </Fragment>

      





      <NavItem className="d-none d-lg-block pe-5" onClick={handleShow}>
        <Direction width={40} height={40} color='none' />
      </NavItem>
    </>

  );
};

export default ThemeNavbar;
