import { IDocument } from "./IDocument";
import { DocumentStatus } from "./IDocument";

export interface IClientRow {
  status: DocumentStatus;
  clientName: string;
  managerName: string;
  fecha: string;
  documents: IDocument[];
}
