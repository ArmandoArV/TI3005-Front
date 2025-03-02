export type DocumentStatus =
  | "Por validar"
  | "Completo"
  | "Incompleto"
  | "Sin entrega";

export interface IDocument {
  title: string;
  fileType: string;
  status: DocumentStatus;
  fileUrl?: string | null;
}
