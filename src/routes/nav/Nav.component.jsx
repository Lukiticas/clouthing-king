import { Outlet, Link } from "react-router-dom";
import CrwnLogo from "/assets/crown.svg";
import "./Nav.styles.scss";
const Nav = () => {
  return (
    <>
      <header className="nav">
        <Link className="nav__logo" to="/">
          <img src={CrwnLogo} title="" alt="" />
        </Link>
        <nav className="nav__links">
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/signIn">Sign in</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Nav;
