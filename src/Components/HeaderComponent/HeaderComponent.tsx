import React from "react";
import styles from "./main.module.css";
import logo from "../../resources/Logo.png";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
    return (
        <header className={styles.header}>
            <Link to="/homeAdmin" className={styles.link}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="logo" className={styles.logo} />
                </div>
            </Link>
        </header>
    );
};