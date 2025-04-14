// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import { TayseerLogo} from '../../../../views/components/icons/all_icons'

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import Navbar from 'react-bootstrap/Navbar'

const UserDropdown = () => {
  return (
    <Navbar.Brand href="/" className="me-5 pe-5">
      {/* 149 40 */}
    <TayseerLogo width={160} height={32} color='none'/>

    </Navbar.Brand>
  );
};

export default UserDropdown;
