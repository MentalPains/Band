import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">
                <img style={{ width: '15%' }} src="https://media.discordapp.net/attachments/703590092849283132/1195431906808963242/image_2024-01-13_021535806.png?ex=65b3f7b8&is=65a182b8&hm=4c8aade4d2a9fd08000764641d05375bc0fa934d3a952f78efc77020974e89ae&=&format=webp&quality=lossless&width=500&height=500" alt="Logo" />
            </NavLink>
            {/* Left side links */}
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                        Member List
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/attendance">
                        Attendance
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/event">
                        Event
                    </NavLink>
                </li>
            </ul>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">
                            Add
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/delete">
                            Delete
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user">
                            User
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
