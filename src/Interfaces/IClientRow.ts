import { IDocument } from "./IDocument";
import { DocumentStatus } from "./IDocument";

export interface IClientRow {
  clientName: string;
  managerName: string;
  status: DocumentStatus;
  documents: IDocument[];
  fecha: string;
  id?: number;
  ownerId?: string;
  ownerType?: string;
}
