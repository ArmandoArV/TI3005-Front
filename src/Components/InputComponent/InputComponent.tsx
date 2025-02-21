import React, { useState } from "react";
import styles from "./main.module.css";
import { IInputProps } from "../../Interfaces/IInputProps";
import showIcon from "../../resources/showIcon.png";
import hideIcon from "../../resources/hideIcon.png";

export default function InputComponent({
    type = "text",
    value,
    onChange,
    placeholder = "",
    className = "",
    label = "",
    disabled = false,
    id = "",
    labelClassName = "", // Add this prop
    labelStyle = {}, // Add this prop
    style = {}, // Add this prop
}: IInputProps & { labelClassName?: string; labelStyle?: React.CSSProperties; style?: React.CSSProperties }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className={styles.inputContainer}>
            {label && (
                <label htmlFor={id} className={`${styles.label} ${labelClassName}`} style={labelStyle}>
                    {label}
                </label>
            )}
            <div className={styles.inputWrapper}>
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${styles.input} ${className}`}
                    disabled={disabled}
                    id={id}
                    style={style} // Apply custom styles
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.showPasswordButton}
                    >
                        <img
                            src={showPassword ? hideIcon : showIcon}
                            alt={showPassword ? "Hide password" : "Show password"}
                            className={styles.passwordIcon}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}