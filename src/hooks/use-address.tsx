import { useQuery } from '@tanstack/react-query';

import { IAddressParams } from '@/entities';
import { addressService } from '@/services/address-service';

type IUseAddress = IAddressParams;

const useAddress = ({ zipCode }: IUseAddress) => {
  return useQuery({
    enabled: !!zipCode && zipCode.replace(/[^\d]+/g, '').length === 8,
    queryKey: [zipCode?.replace(/[^\d]+/g, '')],
    staleTime: Infinity,
    queryFn: () => addressService({ zipCode }),
  });
};

export { useAddress };
