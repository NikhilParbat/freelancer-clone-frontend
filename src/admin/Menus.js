import React from "react";
import "./Menus.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import SmsIcon from "@mui/icons-material/Sms";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import { useStateValue } from "../common/StateProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

function Menus() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAuthentication = () => {
    if (user) {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    if (user?.role === "client") {
      navigate("/client-dashboard");
    } else if (user?.role === "freelancer") {
      navigate("/freelancer-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="menus">
      <div className="menus__top">
        <div className="menus__top--left">
          <div style={{ cursor: "pointer" }} onClick={handleLogoClick}>
            <img
              className="header__logo"
              src="https://s3.amazonaws.com/fjds/gig_company/original/20/freelancer-logo.png?1587072521"
              alt="logo"
            />
          </div>
          <SearchIcon /> <h5>Browse</h5>
          <DesktopWindowsIcon /> <h5>My&nbsp;Projects</h5>
          <SmsIcon /> <h5>Messages</h5>
          <NotificationsNoneIcon />
          <h5>Updates</h5>
          <button>Post a Project</button>
        </div>

        <div className="menus__top--right">
          <Avatar
            src={
              user?.photoURL
                ? user.photoURL
                : "http://dipendrachand.com.np/images/profilepic.jpg"
            }
          />
          <span>
            <h4>{user?.email || "test@gmail.com"}</h4>
            <h5>Rs.{user?.balance}</h5>
          </span>
          <ExpandMoreIcon
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleAuthentication}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="menus__bottom">
        <span>
          <h4>My Projects</h4>
          <h4 className="menus__bottom--isActive">Dashboard</h4>
          <h4>Inbox</h4>
          <h4>Feedback</h4>
        </span>
      </div>
    </div>
  );
}

export default Menus;
