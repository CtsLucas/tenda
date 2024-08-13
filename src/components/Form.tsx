import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@/components/ui';
import { FormField } from '@/components';
import { formSchema, FormSchema, IAddressMapper } from '@/entities';
import { formatDocument, formatZipCode } from '@/utils';
import { useCallback } from 'react';
import { useAddress } from '@/hooks/use-address';

export const Form = () => {
  const {
    handleSubmit: hookFormSubmit,
    register,
    reset,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const zipCodeWatch = watch('zipCode');

  const { data: addressData } = useAddress({ zipCode: zipCodeWatch });

  const handleZipCodeOnBlur = useCallback(() => {
    if (addressData) {
      if (!addressData.error) {
        Object.entries(addressData).forEach(([key, value]) => {
          if (key in addressData) {
            setValue(key as keyof Omit<IAddressMapper, 'error'>, value);
          }
        });

        clearErrors(['zipCode', 'street', 'neighborhood', 'state']);
      } else {
        setError('zipCode', {
          message: 'Digite um CEP válido!',
        });

        Object.entries(addressData).forEach(([key]) => {
          if (key in addressData && key !== 'zipCode') {
            setValue(key as keyof Omit<IAddressMapper, 'error'>, '');
          }
        });
      }
    }
  }, [addressData, setValue, clearErrors, setError]);

  const handleSubmit = hookFormSubmit((data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

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

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Desafio Técnico - Tenda</CardTitle>
        <CardDescription>Formulário de endereço</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <FormField
            placeholder="Digite seu nome"
            error={errors.name?.message}
            {...register('name')}
          />
          <FormField
            placeholder="Digite seu sobrenome"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
          <FormField
            placeholder="Digite seu e-mail"
            error={errors.email?.message}
            {...register('email')}
          />
          <FormField
            placeholder="Digite seu CPF"
            error={errors.document?.message}
            maxLength={14}
            {...register('document', {
              onChange: (e) =>
                (e.target.value = formatDocument(e.target.value)),
            })}
          />
          <FormField
            placeholder="Digite seu CEP"
            error={errors?.zipCode?.message}
            maxLength={9}
            {...register('zipCode', {
              onChange: (e) => (e.target.value = formatZipCode(e.target.value)),
              onBlur: handleZipCodeOnBlur,
            })}
          />
          <FormField
            placeholder="Logradouro"
            error={errors?.street?.message}
            {...register('street')}
            disabled
          />
          <FormField
            placeholder="Bairro"
            error={errors?.neighborhood?.message}
            {...register('neighborhood')}
            disabled
          />
          <FormField
            placeholder="Localidade"
            error={errors?.state?.message}
            {...register('state')}
            disabled
          />
        </CardContent>

        <CardFooter className="justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleClearForm}>
            Limpar
          </Button>
          <Button onClick={handleSubmit}>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
