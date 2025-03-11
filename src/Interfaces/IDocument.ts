export type DocumentStatus =
  | "Por validar"
  | "Completo"
  | "Incompleto"
  | "Sin entrega";

export interface IDocument {
  title: string;
  status: DocumentStatus;
  fileUrl: string | null;
  fileType: string | null;
}