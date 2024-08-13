export interface IAddressParams {
  zipCode: string;
}

export interface IAddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IAddressMapper {
  zipCode: string;
  street: string;
  neighborhood: string;
  state: string;
}
