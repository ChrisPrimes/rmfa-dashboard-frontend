import React from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";

const Nav = ({ excludeRoutes }) => {
    let location = useLocation();

    return !excludeRoutes.includes(location.pathname) ? (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">RMFA Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/">Collection List</NavLink>
                        <NavLink className="nav-link" to="/labels">Labels</NavLink>
                        <a className="nav-link" href="https://remotedisplay.chrisprimes.com" target="_blank" rel="noreferrer">Remote Display</a>
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    ) : null;
}

export { Nav };