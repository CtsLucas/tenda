import { useQuery } from '@tanstack/react-query';

import { IAddressParams } from '@/entities';
import { addressService } from '@/services/address-service';
import { isValidZipCode } from '@/utils';

type IUseAddress = IAddressParams;

const useAddress = ({ zipCode }: IUseAddress) => {
  return useQuery({
    enabled: isValidZipCode(zipCode),
    queryKey: [zipCode?.replace(/[^\d]+/g, '')],
    staleTime: Infinity,
    queryFn: () => addressService({ zipCode }),
  });
};

export { useAddress };
