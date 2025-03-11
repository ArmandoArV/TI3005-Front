import { DocumentStatus } from "./IDocument";
export interface FetchedClient {
  client: {
    id: number;
    name: string;
    vendorId: number;
    email: string;
    phoneNumber: string;
    documentsStatus: DocumentStatus;
    isActive: number;
  };
  vendor: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: number;
  };
  documents: {
    id: number;
    ownerType: string;
    ownerId: number;
    documentType: string;
    fileName: string | null;
    fileType: string | null;
    fileUrl: string | null;
    uploadTimestamp: string | null;
    requestedTimestamp: string;
    validStatus: DocumentStatus;
    rejectedReason: string | null;
  }[];
}
