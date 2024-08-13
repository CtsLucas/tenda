import {
  IAddressMapper,
  IAddressResponse,
  IAddressResponseError,
} from '@/entities';

export const addressMapper = (
  address: IAddressResponse | IAddressResponseError,
): IAddressMapper => {
  if ('erro' in address) {
    return {
      zipCode: '',
      street: '',
      neighborhood: '',
      state: '',
      error: true,
    };
  }

  return {
    zipCode: address.cep,
    street: address.logradouro,
    neighborhood: address.bairro,
    state: address.localidade,
  };
};
