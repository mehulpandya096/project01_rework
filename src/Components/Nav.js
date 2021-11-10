import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router";
const Nav = () => {
  const userLogout = useHistory();
  const logOut = () => {
    localStorage.clear("token");
    userLogout.push("/");
  };


  return (
    <div className="sticky-top">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <b>CMARIX</b> Admin-Penal
          </a>

          <button
            onClick={logOut}
            type="button"
            className="btn btn-danger my-1 mx-2"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
