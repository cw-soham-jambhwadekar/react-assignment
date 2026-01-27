import "../styles/NavBar.css"
import { FaSearch, FaMapMarkerAlt, FaGlobe, FaUser } from "react-icons/fa";


const Navbar = () => {
  return (
    <div className="navbar">
      <Logo/>
      <nav className="navbar-center">
        <a href="#">NEW CARS</a>
        <a href="#">USED CARS</a>
        <a href="#">REVIEWS & NEWS</a>
      </nav>

      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>

        <FaMapMarkerAlt className="icon" />
        <FaGlobe className="icon" />
        <FaUser className="icon" />
      </div>

    </div>
  );
};

const Logo = () => {
    return <img className="logo" src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" alt="CarWale" title="CarWale" />
}

export default Navbar;