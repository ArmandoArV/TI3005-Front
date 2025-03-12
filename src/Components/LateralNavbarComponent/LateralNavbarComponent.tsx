import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./main.module.css";
import logoutIcon from "../../resources/logout.png";
import collapseIcon from "../../resources/collapse.png";

interface MenuOption {
    label: string;
    link: string;
    image: string;
    active?: boolean;
}

interface ILateralNavbar {
    options: MenuOption[];
}
/*
                    <img src={collapseIcon} alt="collapse" className={styles["collapse"]} />
*/
export default function LateralNavbarComponent({ options }: ILateralNavbar) {

    const deleteTokenCookie = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    return (
        <div className={styles["lateralNavbar"]}>
            <div className={styles["lateralNavbar__top"]}>
                <div className={styles["header"]}>
                    <h1 className={styles["title"]}>Menú</h1>

                </div>
                <div className={styles["lateralNavbar__bottom__options"]}>
                    {options.map((option) => (
                        <Link
                            key={option.link}
                            to={option.link}
                            className={`${styles["lateralNavbar__bottom__option"]} ${option.active ? styles["active"] : ""
                                }`}
                        >
                            <img src={option.image} alt={option.label} />
                            <span>{option.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles["lateralNavbar__bottom"]}>
                <Link to="/" className={styles["lateralNavbar__bottom__logout"]}
                    onClick={deleteTokenCookie}
                >
                    <img src={logoutIcon} alt="logout" />
                    <span>Cerrar sesión</span>
                </Link>
            </div>
        </div>
    );
}