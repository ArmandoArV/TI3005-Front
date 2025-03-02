import React, { useState, useEffect } from "react";
import styles from "./ValidateDocs.module.css";
import InputComponent from "../../../Components/InputComponent/InputComponent";
import FileUploadComponent from "../../../Components/FileUploadComponent/FileUploadComponent";
import ButtonComponent from "../../../Components/ButtonComponent/ButtonComponent";
import { HeaderComponent } from "../../../Components/HeaderComponent/HeaderComponent";

export const DocumentosProveedor = () => {
    const [name, setName] = useState<string>("Test");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted!");
        console.log("Name:", name);
        console.log("Email:", email);
    }

    return (

        <main className={styles.background}>
            <HeaderComponent />
            <div className={styles.main}>
                <div className={styles.formContainerExternal}>
                    <div className={styles.welcomeContainer}>
                        <h1>¡Hola, {name}!</h1>
                    </div>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.topContainer}>
                            <div className={styles.topTopContainer}>
                                <h2 className={styles.header}>Solicitud de Documentos</h2>
                            </div>
                            <div className={styles.topBottomContainer}>
                                <InputComponent
                                    label="Correo electrónico"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Correo electrónico"
                                    id="email-input"
                                    className={styles.customInputBorder}
                                    labelClassName={styles.customLabel}
                                />
                            </div>
                        </div>
                        <div className={styles.mediumContainer}>
                            <div className={styles.leftMediumContainer}>
                                <FileUploadComponent
                                    label="Opinión de cumplimiento"
                                    onFileSelect={(file) => console.log(file)}
                                />
                            </div>
                            <div className={styles.mediumMediumContainer}>
                                <FileUploadComponent
                                    label="Constancia de situación fiscal"
                                    onFileSelect={(file) => console.log(file)}
                                />
                            </div>
                            <div className={styles.rightMediumContainer}>
                                <FileUploadComponent
                                    label="Contrato"
                                    onFileSelect={(file) => console.log(file)}
                                />
                            </div>
                        </div>
                        <div className={styles.bottomContainer}>
                            <div className={styles.buttonWrapper}>
                                <ButtonComponent type="submit" text="Enviar" onClick={() => { }} className={styles.customButton} />

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
};

