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
import { formSchema, FormSchema } from '@/entities';

export const Form = () => {
  const {
    handleSubmit: hookFormSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

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
            {...register('document')}
          />
          <FormField
            placeholder="Digite seu CEP"
            error={errors?.zipCode?.message}
            {...register('zipCode')}
          />
          <FormField
            placeholder="Logradouro"
            error={errors?.street?.message}
            {...register('street', {
              disabled: true,
            })}
          />
          <FormField
            placeholder="Bairro"
            error={errors?.neighborhood?.message}
            {...register('neighborhood', {
              disabled: true,
            })}
          />
          <FormField
            placeholder="Localidade"
            error={errors?.state?.message}
            {...register('state', {
              disabled: true,
            })}
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
