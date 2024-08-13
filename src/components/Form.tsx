import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  FormField,
} from '@/components';
import { formSchema, FormSchema, IAddressMapper } from '@/entities';
import { formatDocument, formatZipCode, delay } from '@/utils';
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
    formState: { errors, isSubmitting, isValid, isSubmitted },
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
          <Button
            type="button"
            variant="secondary"
            onClick={handleClearForm}
            disabled={isSubmitting}
          >
            Limpar
          </Button>
          <Button
            className="w-20"
            onClick={handleSubmit}
            disabled={isSubmitting || (!isValid && isSubmitted)}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              'Enviar'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
