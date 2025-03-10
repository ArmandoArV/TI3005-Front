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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior


        // Validate password


        if (emailText === "" || passwordText === "") {
            setError("Please fill all fields");
            showErrorAlert("Error", "¡Por favor, llene todos los campos!");
            return;
        } else if (!regex.email.test(emailText)) {
            setError("Invalid email format");
            showErrorAlert("Error", "Invalid email format");
            return;
        } if (!regex.password.test(passwordText)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
            showErrorAlert("Error", "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
            return;
        } else {
            const loginData = {
                email: emailText,
                password: passwordText,
            };

            const requestData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(loginData),
            };


            fetch(`${API_URL}/login`, requestData)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Error");
                    }
                })
                .then((data) => {
                    showSuccessAlert("Success", "Login successful");
                    console.log(data);
                })
                .catch((error) => {
                    showErrorAlert("Error", "Invalid email or password");
                    console.log(error);
                });
        }

    };

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
                            <p className={styles.forgotPassword}>¿Olvidaste tu contraseña?</p>
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