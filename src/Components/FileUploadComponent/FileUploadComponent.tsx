import React, { useRef } from "react";
import styles from "./main.module.css";
import uploadIcon from "../../resources/uploadIcon.png"; // Use the icon you need

interface FileUploadProps {
    label?: string;
    onFileSelect: (file: File | null) => void;
    className?: string;
    labelClassName?: string;
    labelStyle?: React.CSSProperties;
    style?: React.CSSProperties;
}

export default function FileUploadComponent({
    label = "",
    onFileSelect,
    className = "",
    labelClassName = "",
    labelStyle = {},
    style = {},
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileSelect(file);
    };

    return (
        <div className={`${styles.inputContainer}`} style={style}>
            {label && (
                <label className={`${styles.label} ${labelClassName}`} style={labelStyle}>
                    {label}
                </label>
            )}
            <div className={`${styles.fileUploadWrapper} ${className}`} onClick={handleClick}>
                <img src={uploadIcon} alt="Upload" className={styles.uploadIcon} />
                <span className={styles.uploadText}>Subir archivo</span>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={styles.fileInputHidden}
                />
            </div>
        </div>
    );
}
