import React from "react";
import styles from "./main.module.css";
import logo from "../../resources/Logo.png";

export const HeaderComponent = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="logo" className={styles.logo} />
            </div>
        </header>
    );
};