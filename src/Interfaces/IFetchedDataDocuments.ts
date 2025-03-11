import { FetchedClient } from "./IFetchedClient";
export interface FetchedData {
  success: boolean;
  message: string;
  clients: FetchedClient[];
}
