import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark");
        console.log('Set Theme Dark')
    };

    const setLightMode = () => {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light");
        console.log('Set Theme Light')
    };

    useEffect(() => {
        const selectedTheme = localStorage.getItem("selectedTheme");
        console.log('Local Storage')
        if (selectedTheme === "dark") {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, []);
    console.log('Local Storage working')
    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={localStorage.getItem("selectedTheme") === "dark"}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
