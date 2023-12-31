import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <Link to="/home">
        <h2 className="nav-title" style={{ color: "white" }}>
          Lets Cook Together
        </h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Favorites
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
        {/* Change the admin access code to if user.id ? if access.leve else redirect. */}
        {user.id && user.access_level === 10 ? (
          <Link className="navLink" to="/admin">
            Admin Page
          </Link>
        ) : (
          // <Link className="navLink" to="/user">
          //   Home
          // </Link>
          <p></p>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
