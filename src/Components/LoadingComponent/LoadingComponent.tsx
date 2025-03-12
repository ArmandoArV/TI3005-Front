import React from "react";
import styles from "./main.module.css";

export const LoadingComponent = () => {
    return (
        <div className={styles["loadingContainer"]}>
            <div className={styles["imageLoading"]}>
                <img src="https://i.pinimg.com/originals/0b/7b/7b/0b7b7"
                    alt="loading" />
            </div>
            <div className={styles["loadingText"]}>
                <p>Cargando...</p>
            </div>
        </div>
    );
};