import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  PowerSettingsNew,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const searchName = useRef();
  const history = useHistory();

  const handleSearch = async (e) => {
    const username = searchName.current.value;

    try {
      history.push("/profile/" + username);
    } catch (err) {}
  };

  const handleLogout = async (e) => {
    localStorage.clear();
    document.location.href = "/";
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logoImg" src="../../assets/logo.png" alt="" />
          <span className="logo">Captiona</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" onClick={handleSearch} />
          <input
            placeholder="Search for friends and posts"
            className="searchInput"
            ref={searchName}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ color: "white" }}>
              <Chat />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <PowerSettingsNew className="logout" onClick={handleLogout}/>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
