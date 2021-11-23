import { ViaCepTypes, ViaCepRequest, ViaCepResponse, } from "./viaCep/types";

export const ExternalApisTypes = { ViaCepTypes }

export type { ViaCepRequest }

export interface ExternalApis {
  viaCep: ViaCepResponse
}

export interface ExternalApisState {
  readonly data: ExternalApis;
  readonly loading: boolean;
  readonly error: boolean;
}
