export type DocumentStatus =
  | "Por validar"
  | "Aceptado"
  | "Rechazado"
  | "Sin entrega"
  | "En espera";

export interface IDocument {
  documentId: number;
  title: string;
  status: DocumentStatus;
  fileUrl: string | null;
  fileType: string | null;
}
