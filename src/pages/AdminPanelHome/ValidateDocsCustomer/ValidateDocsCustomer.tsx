import React, { useState, useEffect, useCallback } from "react";
import styles from "./ValidateDocs.module.css";
import InputComponent from "../../../Components/InputComponent/InputComponent";
import FileUploadComponent from "../../../Components/FileUploadComponent/FileUploadComponent";
import ButtonComponent from "../../../Components/ButtonComponent/ButtonComponent";
import { HeaderComponent } from "../../../Components/HeaderComponent/HeaderComponent";
import { DocumentMetadata } from "../../../Interfaces/IDocumentMetadata";
import { API_URL } from "../../../Constants";
import { showErrorAlert, showSuccessAlert } from "../../../Util/AlertUtil";
import { LoadingComponent } from "../../../Components/LoadingComponent/LoadingComponent";



export const redirectToHilados = () => {
    window.location.href = "https://www.hilados.com.mx/";
};

export const DocumentosCliente = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [ownerType, setOwnerType] = useState<string>("");
    const [ownerId, setOwnerId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const [complianceOpinionFile, setComplianceOpinionFile] =
        useState<File | null>(null);
    const [fiscalSituationFile, setFiscalSituationFile] = useState<File | null>(
        null
    );
    const [purchaseOrderFile, setPurchaseOrderFile] = useState<File | null>(null);


    const retrieveUserInformation = useCallback(async () => {
        const requestBody = {
            token: new URLSearchParams(window.location.search).get("token"),
        };
        try {
            const response = await fetch(`${API_URL}/validateToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            setOwnerType(data.ownerType);
            setOwnerId(data.ownerId);
            setName(data.ownerData.name);
            setEmail(data.ownerData.email);
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    }, []);

    useEffect(() => {
        retrieveUserInformation();
    }, [retrieveUserInformation]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData();

            formData.append("ownerId", ownerId);
            formData.append("ownerType", ownerType);

            const fileInputs = document.querySelectorAll("input[type=file]");
            console.log("File inputs:", fileInputs);
            const metadata: DocumentMetadata[] = [];

            fileInputs.forEach((fileInput) => {
                const inputElement = fileInput as HTMLInputElement;
                if (inputElement.files && inputElement.files.length > 0) {
                    const file = inputElement.files[0];
                    formData.append("files", file);
                    const documentType = inputElement.id;

                    metadata.push({
                        documentType,
                        filename: file.name,
                    });
                }
            });

            formData.append("metadata", JSON.stringify(metadata));

            try {
                setLoading(true);
                const token = new URLSearchParams(window.location.search).get("token");
                const response = await fetch(`${API_URL}/documents/upload-multiple`, {
                    method: "POST",
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                showSuccessAlert("Success", "Documentos enviados correctamente", redirectToHilados);
            } catch (error) {
                console.error("Error sending documents:", error);
                showErrorAlert(
                    "Error",
                    (error as any).message || "An unknown error occurred"
                );
            }
            setLoading(false);
        },
        [ownerId, ownerType]
    );

    if (loading) {
        return <LoadingComponent />;
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
                                    label="Correo de contacto"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Correo de contacto"
                                    id="email-input"
                                    className={styles.customInputBorder}
                                    labelClassName={styles.customLabel}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className={styles.mediumContainer}>
                            <div className={styles.leftMediumContainer}>
                                <FileUploadComponent
                                    label="Opinión de cumplimiento"
                                    onFileSelect={(file) => setComplianceOpinionFile(file)}
                                    id="OpinionDeCumplimiento"
                                />
                            </div>
                            <div className={styles.mediumMediumContainer}>
                                <FileUploadComponent
                                    label="Constancia de situación fiscal"
                                    onFileSelect={(file) => setFiscalSituationFile(file)}
                                    id="ConstanciaDeSituacionFiscal"
                                />
                            </div>
                            <div className={styles.rightMediumContainer}>
                                <FileUploadComponent
                                    label="Orden de compra"
                                    onFileSelect={(file) => setPurchaseOrderFile(file)}
                                    id="OrdenDeCompra"
                                />
                            </div>
                        </div>
                        <div className={styles.bottomContainer}>
                            <div className={styles.buttonWrapper}>
                                <ButtonComponent
                                    type="submit"
                                    text="Enviar"
                                    onClick={() => { }}
                                    className={styles.customButton}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
