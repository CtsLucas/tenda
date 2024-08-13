import { Loader2 } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormField,
} from '@/components';
import { useFormController } from '@/controllers';
import { formatDocument, formatZipCode } from '@/utils';

export const Form = () => {
  const {
    handleSubmit,
    handleClearForm,
    handleZipCodeOnBlur,
    register,
    errors,
    isSubmitting,
    isValid,
    isSubmitted,
  } = useFormController();

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
            className="truncate"
            placeholder="Logradouro"
            error={errors?.street?.message}
            {...register('street')}
            disabled
          />
          <FormField
            className="truncate"
            placeholder="Bairro"
            error={errors?.neighborhood?.message}
            {...register('neighborhood')}
            disabled
          />
          <FormField
            className="truncate"
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
