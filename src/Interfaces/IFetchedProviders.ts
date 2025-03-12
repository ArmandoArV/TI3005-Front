import { DocumentStatus } from "./IDocument";

export interface IDocument {
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
}

export interface FetchedProvidersResponse {
  success: boolean;
  message: string;
  providers: {
    provider: IProvider;
    vendor: IVendor;
    documents: IDocument[];
  }[];
}

// Interface for the vendor information
export interface IVendor {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  isActive: number;
}

// Interface for the provider (client) information
export interface IProvider {
  id: number;
  name: string;
  vendorId: number;
  email: string;
  phoneNumber: string;
  documentsStatus: DocumentStatus;
  isActive: number;
}

export interface FetchedProviders {
  providers: {
    id: number;
    name: string;
    vendorId: number;
    email: string;
    phoneNumber: string;
    documentsStatus: DocumentStatus;
    isActive: number;
    vendor: {
      id: number;
      name: string;
      email: string;
      phoneNumber: string;
      isActive: number;
    };
    documents: IDocument[];
  }[];
}
