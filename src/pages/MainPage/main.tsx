import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import InputComponent from "../../Components/InputComponent/InputComponent";
import logo from "../../resources/logoOriginal.png";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";
import { regex } from "../../Constants";
import { showErrorAlert, showSuccessAlert } from "../../Util/AlertUtil";
import { API_URL } from "../../Constants";

export const MainPage = () => {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [error, setError] = useState("");


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailText(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordText(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate email and password
        if (!emailText || !passwordText) {
            setError("Please fill all fields");
            showErrorAlert("Error", "¡Por favor, llene todos los campos!");
            return;
        }

        if (!regex.email.test(emailText)) {
            setError("Invalid email format");
            showErrorAlert("Error", "Invalid email format");
            return;
        }

        // Prepare login request payload
        const loginData = {
            email: emailText,
            password: passwordText,
        };
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            showSuccessAlert("Success", "Login successful");
            console.log(data);
            document.cookie = `token=${data.token}; path=/`;
            window.location.href = "/homeAdmin";

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            showErrorAlert("Error", errorMessage);
            console.error("Login error:", error);
        }

    };


    /*                            <p className={styles.forgotPassword}>¿Olvidaste tu contraseña?</p>
     */
    return (
        <main className={styles.background}>
            <div className={styles.main}>
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
                            label="Correo electrónico"
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
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.leftBottomContainer}>
                        </div>
                        <div className={styles.rightBottomContainer}>
                            <ButtonComponent
                                text="Iniciar Sesión"
                                onClick={() => { }}
                                className={styles.customButton}
                                type="submit"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};