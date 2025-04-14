// ** React Imports
import Dropdown from 'react-bootstrap/Dropdown';
import settingicon from "@src/assets/images/icons/settingicon.png"

import '../../../src/@core/scss/react/settingdropdown.scss'
import { useNavigate ,useLocation } from "react-router-dom";
import React, { useState, useEffect , useContext } from 'react'
import { useTranslation } from "react-i18next";

const DropDownSetting = () => {
    // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
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
            <Dropdown className="dropdownsetting ps-3" show={isOpen} onToggle={handleToggle} drop="down">
                <Dropdown.Toggle className={`${((location.pathname == "/countries") || (location.pathname == "/cities") || (location.pathname == "/nationalities")) ? "backgroundsetting" : ""}`} id="dropdown-basic1">
                    <img className="imagesrc pt-2 pb-2 ps-2" src={settingicon}></img>
                </Dropdown.Toggle>

                <Dropdown.Menu id="dropdownmenu-basic">
                    
                    <a onClick={() => handleClick2("/cities")} data-rr-ui-dropdown-item="" class="nav-link pt-1 dropdown-item">المدن</a>
                    <Dropdown.Divider />
                    <a onClick={() => handleClick2("/countries")} data-rr-ui-dropdown-item="" class="nav-link pt-1 dropdown-item">الدول</a>
                    <Dropdown.Divider />
                    <a onClick={() => handleClick2("/nationalities")} data-rr-ui-dropdown-item="" class="nav-link pt-1 dropdown-item">الجنسية</a>


                </Dropdown.Menu>
            </Dropdown>

        </>
    );
};

export default DropDownSetting;
