import React, { useRef, useState } from "react";
import styles from "./main.module.css";
import uploadIcon from "../../resources/uploadIcon.png"; // Use the icon you need
import confirmationIcon from "../../resources/confirmationIcon.png"; // Use the confirmation icon you need

interface FileUploadProps {
    label?: string;
    onFileSelect: (file: File | null) => void;
    className?: string;
    labelClassName?: string;
    labelStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    id?: string;
}

export default function FileUploadComponent({
    label = "",
    onFileSelect,
    className = "",
    labelClassName = "",
    labelStyle = {},
    style = {},
    id = "",
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setUploadedFile(file);
        onFileSelect(file);
    };

    const handleDelete = () => {
        setUploadedFile(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
        }
    };

    return (
        <div className={`${styles.inputContainer}`} style={style}>
            {label && (
                <label className={`${styles.label} ${labelClassName}`} style={labelStyle}>
                    {label}
                </label>
            )}
            <div className={`${styles.fileUploadWrapper} ${className}`} onClick={handleClick}>
                {uploadedFile ? (
                    <div className={styles.uploadedFileContainer}>
                        <span className={styles.uploadedFileName}>{uploadedFile.name}</span>
                        <img src={confirmationIcon} alt="Confirmation" className={styles.confirmationIcon} />
                        <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); handleDelete(); }}>X</button>
                    </div>
                ) : (
                    <>
                        <img src={uploadIcon} alt="Upload" className={styles.uploadIcon} />
                        <span className={styles.uploadText}>Subir archivo</span>
                    </>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={styles.fileInputHidden}
                    id={id}
                />
            </div>
        </div>
    );
}