import React from "react";
import styles from "./HomeAdmin.module.css";

export const HomeAdmin = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Panel Home</h1>
            <p className={styles.paragraph}>
                Welcome to the admin panel home page!
            </p>
        </div>
    );
};