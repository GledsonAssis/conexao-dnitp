export enum ViaCepTypes {
  LOAD_REQUEST_GET_ZIPOCODE = '@zipCode/get/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ZIPOCODE = '@zipCode/get/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ZIPOCODE = '@zipCode/get/LOAD_FAILURE',
}

export interface ViaCepRequest {
  cep: string;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
