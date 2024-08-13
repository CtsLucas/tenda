import { IAddressParams, IAddressResponse } from '@/entities';
import { httpClient } from '@/lib/axios';
import { addressMapper } from '@/services/mappers';

export async function addressService({ zipCode }: IAddressParams) {
  const { data } = await httpClient.get<IAddressResponse>(
    `https://viacep.com.br/ws/${zipCode}/json/`,
  );

  return addressMapper(data);
}
