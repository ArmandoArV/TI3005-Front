import React, { useState } from "react";
import styles from "./main.module.css";
import InputComponent from "../../Components/InputComponent/InputComponent";
import logo from "../../resources/Logo.png";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";

export const MainPage = () => {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailText(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted!");
        console.log("Email:", emailText);
        console.log("Password:", passwordText);
    };

    return (
        <main className={styles.main}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.topContainer}>
                    <div className={styles.logoContainer}>
                        <div className={styles.imgContainer}>
                            <img src={logo} alt="logo" className={styles.logo} />
                        </div>
                    </div>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.header}>Iniciar Sesión</h1>
                    </div>
                </div>
                <div className={styles.mediumContainer}>
                    <InputComponent
                        type="text"
                        value={emailText}
                        onChange={handleEmailChange}
                        placeholder="Correo electrónico"
                        label="Username"
                        id="username-input"
                        className={styles.customInputBorder}
                        labelClassName={styles.customLabel}
                    />
                    <InputComponent
                        type="password"
                        value={passwordText}
                        onChange={handlePasswordChange}
                        placeholder="Contraseña"
                        label="Contraseña"
                        id="password-input"
                        className={styles.customInputBorder}
                        labelClassName={styles.customLabel}
                    />
                    <p className={styles.forgotPassword}>¿Olvidaste tu contraseña?</p>
                </div>
                <div className={styles.bottomContainer}>
                    <ButtonComponent
                        text="Iniciar Sesión"
                        onClick={() => { }}
                        className={styles.customButton}
                        type="submit"
                    />
                </div>
            </form>
        </main>

    );
};