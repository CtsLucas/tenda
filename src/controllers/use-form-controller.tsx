import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormSchema, formSchema, IAddressMapper } from '@/entities';
import { useAddress } from '@/hooks/use-address';
import { delay } from '@/utils';

export const useFormController = () => {
  const {
    handleSubmit: hookFormSubmit,
    register,
    reset,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const zipCodeWatch = watch('zipCode');

  const { data: addressData, isError } = useAddress({ zipCode: zipCodeWatch });

  const handleZipCodeOnBlur = useCallback(() => {
    if (addressData) {
      if (!addressData.error) {
        Object.entries(addressData).forEach(([key, value]) => {
          if (key in addressData) {
            setValue(key as keyof Omit<IAddressMapper, 'error'>, value);
          }
        });

        return clearErrors(['zipCode', 'street', 'neighborhood', 'state']);
      } else {
        Object.entries(addressData).forEach(([key, value]) => {
          if (key in addressData && key !== 'zipCode') {
            setValue(key as keyof Omit<IAddressMapper, 'error'>, value);
          }
        });

        return setError('zipCode', {
          message: 'Digite um CEP válido!',
        });
      }
    }
  }, [addressData, setValue, clearErrors, setError]);

  useEffect(() => {
    if (isError) {
      toast.error(
        'O serviço de busca de endereço está temporariamente indisponível. Tente novamente mais tarde.',
      );
    }
  }, [isError]);

  const handleClearForm = () => {
    reset({
      name: '',
      lastName: '',
      email: '',
      document: '',
      zipCode: '',
      neighborhood: '',
      state: '',
      street: '',
    });
  };

  const handleSubmit = hookFormSubmit(async (data) => {
    await delay();

    try {
      toast.success(
        'Formulário enviado com sucesso! Confira o resultado no console do navegador!',
      );
      console.log(data);
    } catch (error) {
      toast.error(
        'Ocorreu um erro no envio do formuláio, tente novamente mais tarde!',
      );
      console.error(error);
    }
  });

  return {
    handleSubmit,
    handleClearForm,
    handleZipCodeOnBlur,
    register,
    formErrors: errors,
    isSubmitting,
    isValid,
    isSubmitted,
    isError,
  };
};
