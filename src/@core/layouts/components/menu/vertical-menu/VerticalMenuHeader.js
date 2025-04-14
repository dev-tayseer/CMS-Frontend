// ** React Imports
import { NavLink } from "react-router-dom";

// ** Icons Imports
import { Disc, X, Circle } from "react-feather";

// ** Config
import themeConfig from "@configs/themeConfig";
import React, { useState, useEffect } from 'react'

import { NavSearch,Direction} from '../../../../../../src/views/components/icons/all_icons'
import loadersearch from "@src/assets/images/loader-search-awes.svg";


const domain_url = themeConfig.url
import axios from 'axios'
import { useNavigate } from "react-router-dom"




// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Vars
  const user = getUserData();

  const [filtering, setFiltering] = useState(false)
  const [searching, setsearching] = useState(false)
  const [search_results, setsearch_results] = useState([])
  



  

  
  function handleFilterSearch(e){
    const value = e.target.value
    console.log(value,"......")
    if (value == ""){
      setFiltering(false)
    }
    else{
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
        console.log(JSON.stringify(response.data),"searching");
        const result = response.data
        let search_results_list = []
        for(var i =0 ; i < response.data.length ; i++){
          search_results_list.push({
            "id":response.data[i].id,
            "Contract_Name":response.data[i].Contract_Name,
            "Contract_Number":response.data[i].Contract_Number,

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

  function handleLogout(){
    console.log("logout")
    navigate("/logout")
  }
  

  // ** Reset open group
  useEffect(() => {
    // scrollbar-container main-menu-content
    // let ele = document.getElementsByClassName("main-menu-content")[0]
    // ele.classList.remove("main-menu-content")
    // scrollbar-container 
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <>
    <div className="navbar-header w-100 d-flex justify-content-between mb-3 pb-3 bordered-div-nav">
      {/* <div className="nav navbar-nav  "> */}
        <div className="nav-item me-auto">
          <NavLink
            to={user ? getHomeRouteForLoggedInUser(user.role) : "/"}
            className="navbar-brand"
          >
            <span className="brand-logo">
              <img src={themeConfig.appLogoImageSmall} alt="logo" />
            </span>
            {/* <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2> */}
          </NavLink>
        </div>
        <div className="nav-item nav-toggle">
        {/* toggle-icon icon-x d-block d-xl-none */}
          <div className="nav-link modern-nav-toggle cursor-pointer pt-4">
            <Toggler />
            {/* <svg className="toggle-icon icon-x d-block d-xl-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.92889 18.8211C4.636 18.5282 4.64208 18.0472 4.94249 17.7468L17.9968 4.69256C18.2972 4.39216 18.7781 4.38607 19.071 4.67896C19.3639 4.97186 19.3578 5.45282 19.0574 5.75322L6.00315 18.8075C5.70274 19.1079 5.22178 19.114 4.92889 18.8211Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.53034 4.53033C4.82323 4.23744 5.30419 4.24352 5.6046 4.54393L18.6589 17.5982C18.9593 17.8986 18.9654 18.3796 18.6725 18.6725C18.3796 18.9654 17.8986 18.9593 17.5982 18.6589L4.54394 5.60459C4.24353 5.30419 4.23745 4.82322 4.53034 4.53033Z" fill="white"/>
            </svg> */}

            <X
              onClick={() => setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div>
        </div>
      {/* </div> */}
    </div>
    <div className="mb-3 pb-4 pt-3 bordered-div-nav">
    <div className="input-search-container text-center ms-5">
        <NavSearch width="20" height="20" />
        <input type="text"  className="form-control nav-search " placeholder="ابحث" onChange={(e)=>handleFilterSearch(e)} />

        {filtering && (     
          <ul class="suggestions-small" >
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
                        <a target="_blank" className="search-result" href = {`${path}`} >
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
    </div>
    <div className="logout-content-small-bordered"></div>
    <div className="logout-content-small bordered-div-nav-top pt-3 pb-1 text-center">
      
        <a  onClick={handleLogout} className="logout-text-small" >
          <div>
        <Direction  />
          <span className="ps-4">تسجيل الخروج
          </span>
          </div>
        </a>
    </div>
    </>
  );
};

export default VerticalMenuHeader;
