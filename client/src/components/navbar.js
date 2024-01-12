import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">
                <img style={{ width: '10%' }} src="https://media.discordapp.net/attachments/703590092849283132/1195431906808963242/image_2024-01-13_021535806.png?ex=65b3f7b8&is=65a182b8&hm=4c8aade4d2a9fd08000764641d05375bc0fa934d3a952f78efc77020974e89ae&=&format=webp&quality=lossless&width=500&height=500" alt="Logo"/>
            </NavLink>
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
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">
                            Create Member
                        </NavLink>
                    </li>
                    {/* Assuming you have routes for editing and deleting */}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/edit">
                            Edit Member
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/delete">
                            Delete Member
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
