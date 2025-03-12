import {
  ClientProviderStatus,
  Document,
  Provider,
  Vendor,
} from "./IProviderInterfaces";

export interface Client {
  id: number;
  name: string;
  vendorId: number;
  email: string;
  phoneNumber: string;
  documentsStatus: ClientProviderStatus;
  isActive: boolean;
}

export interface IClientProviderResponse {
  success: boolean;
  message: string;
  data?: (Client | Provider)[];
}

export interface IClientDocumentsResponse {
  success: boolean;
  message: string;
  clients: IClientDashboardRow[];
}

export interface IClientDashboardRow {
  client: Client;
  vendor: Vendor;
  documents: Document[];
}
