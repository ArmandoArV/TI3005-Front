export type DocumentStatus =
  | "Por validar"
  | "Aceptado"
  | "Rechazado"
  | "Sin entrega";

export interface IDocument {
  title: string;
  status: DocumentStatus;
  fileUrl: string | null;
  fileType: string | null;
}