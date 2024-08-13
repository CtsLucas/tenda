import { IAddressMapper, IAddressResponse } from '@/entities';

export const addressMapper = (address: IAddressResponse): IAddressMapper => {
  return {
    zipCode: address.cep,
    street: address.logradouro,
    neighborhood: address.bairro,
    state: address.localidade,
  };
};
