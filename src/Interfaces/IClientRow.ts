import { IDocument } from "./IDocument";
import { DocumentStatus } from "./IDocument";

export interface IClientRow {
  clientName: string;
  managerName: string;
  status: DocumentStatus;
  documents: IDocument[];
  fecha: string; // Use the latest document's uploadTimestamp or requestedTimestamp
}
