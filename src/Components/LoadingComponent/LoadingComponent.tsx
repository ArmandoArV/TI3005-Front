import React from "react";
import styles from "./LoadingComponent.module.css";
import loadingGif from "../../resources/loadingGif.gif";
export const LoadingComponent = () => {
    return (
        <div className={styles["loadingContainer"]}>
            <div className={styles["imageLoading"]}>
                <img src={loadingGif}
                    alt="loading" />
            </div>
            <div className={styles["loadingText"]}>
                <p>Cargando...</p>
            </div>
        </div>
    );
};