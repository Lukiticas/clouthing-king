import { useContext } from "react";
import { userContext } from "../../contexts/user.context";

import { Outlet, Link } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/auth.firebase.utils";

import CrwnLogo from "/assets/crown.svg";
import "./Nav.styles.scss";

const Nav = () => {
  const { currentUser } = useContext(userContext);
  return (
    <>
      <header className="nav">
        <Link className="nav__logo" to="/">
          <img src={CrwnLogo} title="" alt="" />
        </Link>
        <nav className="nav__links">
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          {currentUser ? (
            <span to="/signIn" onClick={signOutUser}>
              Sign out
            </span>
          ) : (
            <Link to="/signIn">Sign in</Link>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Nav;
