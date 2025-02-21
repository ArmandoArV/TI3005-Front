import React from "react";
import styles from "./main.module.css";
import { IButtonProps } from "../../Interfaces/IButtonProps";

export default function ButtonComponent({
    text,
    onClick,
    className = "", // Default to empty string if no custom class is provided
    disabled = false, // Default to false if no disabled flag is provided
    type = "button", // Default to "button" if no type is provided
}: IButtonProps) {
    return (
        <button
            type={type === "cancel" ? "button" : type}
            onClick={onClick}
            className={`${styles.button} ${className}`} // Combine default and custom classes
            disabled={disabled}
        >
            {text}
        </button>
    );
}