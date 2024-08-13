import { useQuery } from '@tanstack/react-query';

import { IAddressParams } from '@/entities';
import { addressService } from '@/services/address-service';

type IUseAddress = IAddressParams;

const useAddress = ({ zipCode }: IUseAddress) => {
  return useQuery({
    enabled: !!zipCode && zipCode.length >= 8,
    queryKey: [zipCode],
    staleTime: Infinity,
    queryFn: () => addressService({ zipCode }),
  });
};

export { useAddress };
