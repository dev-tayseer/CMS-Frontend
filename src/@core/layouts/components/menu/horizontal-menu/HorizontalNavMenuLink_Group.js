// ** React Imports
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import settingicon from "@src/assets/images/icons/settingicon.png"

import '../../../../scss/react/horizontaldropdownhomepage.scss'
import { useNavigate ,useLocation } from "react-router-dom";
import React, { useState, useEffect , useContext } from 'react'

// ** Third Party Components
import classnames from "classnames";
import { useTranslation } from "react-i18next";

const HorizontalNavMenuLink_Group = ({ item, titlex, img, isChild, setMenuOpen }) => {
    // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
    const LinkTag = item.externalLink ? "a" : NavLink;
    const navigate = useNavigate();
    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false);


    // ** Hooks
    const { t } = useTranslation();

    const handleClick = () => {
        if (setMenuOpen) {
            setMenuOpen(false);
        }
    };

    const handleToggle = (nextShow) => {
        setIsOpen(nextShow);
    };

    function handleClick2(url) {
        navigate(url)
        setIsOpen(false);
    };

    return (
        <>
            <Dropdown className="dropdownsetting ps-3"  show={isOpen} onToggle={handleToggle} drop="down">
                <Dropdown.Toggle className={`${((location.pathname == "/countries")||(location.pathname == "/cities")||(location.pathname == "/nationalities"))?  "backgroundsetting":""}`}  id="dropdown-basic1">
                    <label className="pe-1 pt-1 cursor-pointer">{titlex}</label>
                     <img className="imagesrc" src={settingicon}></img>
                </Dropdown.Toggle>

                <Dropdown.Menu id="dropdownmenu-basic">
                    {item.map((itemx, index) => {

                        if (index == item.length - 1) {
                            return (
                                <>
                                    <a onClick={()=>handleClick2(itemx.navLink)} data-rr-ui-dropdown-item="" class="nav-link pt-1 dropdown-item">{itemx.title}</a>

                                </>

                            )
                        } else {
                            return (
                                <>
                                    <a onClick={()=>handleClick2(itemx.navLink)} data-rr-ui-dropdown-item="" class="nav-link pt-1 dropdown-item">{itemx.title}</a>
                                    <Dropdown.Divider />
                                </>

                            )
                        }





                    })}


                </Dropdown.Menu>
            </Dropdown>

        </>
    );
};

export default HorizontalNavMenuLink_Group;
