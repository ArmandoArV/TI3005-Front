export enum ClientProviderStatus {
  SIN_ENTREGA = "Sin entrega",
  POR_VALIDAR = "Por validar",
  INCORRECTO = "Incorrecto",
  ACEPTADO = "Aceptado",
  EN_ESPERA = "En espera",
}

export enum OwnerType {
  CLIENT = "Client",
  PROVIDER = "Provider",
}

export enum DocumentStatus {
  POR_VALIDAR = "Por validar",
  ACEPTADO = "Aceptado",
  RECHAZADO = "Rechazado",
  EN_ESPERA = "En espera",
  SIN_ENTREGA = "Sin entrega",
}

export enum DocumentType {
  CONSTANCIA_DE_SITUACION_FISCAL = "ConstanciaDeSituacionFiscal",
  OPINION_DE_CUMPLIMIENTO = "OpinionDeCumplimiento",
  CONTRATO = "Contrato",
  ORDEN_DE_COMPRA = "OrdenDeCompra",
}

export interface Document {
  id: number;
  ownerType: OwnerType;
  ownerId: number;
  documentType: DocumentType;
  fileName?: string;
  fileType?: string;
  fileUrl?: string;
  uploadTimestamp?: string;
  requestedTimestamp: string;
  validStatus: DocumentStatus;
  rejectedReason?: string;
}

export interface Provider {
  id: number;
  name: string;
  vendorId: number;
  email: string;
  phoneNumber: string;
  documentsStatus: ClientProviderStatus;
  isActive: boolean;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface IProviderDocumentsResponse {
  success: boolean;
  message: string;
  providers: IProviderDashboardRow[];
}

export interface IProviderDashboardRow {
  provider: Provider;
  vendor: Vendor;
  documents: Document[];
}
