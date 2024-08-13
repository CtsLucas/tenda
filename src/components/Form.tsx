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
    formErrors,
    isSubmitting,
    isValid,
    isSubmitted,
    isError,
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
            error={formErrors.name?.message}
            {...register('name')}
          />
          <FormField
            placeholder="Digite seu sobrenome"
            error={formErrors.lastName?.message}
            {...register('lastName')}
          />
          <FormField
            placeholder="Digite seu e-mail"
            error={formErrors.email?.message}
            {...register('email')}
          />
          <FormField
            placeholder="Digite seu CPF"
            error={formErrors.document?.message}
            maxLength={14}
            {...register('document', {
              onChange: (e) =>
                (e.target.value = formatDocument(e.target.value)),
            })}
          />
          <FormField
            placeholder="Digite seu CEP"
            error={formErrors?.zipCode?.message}
            maxLength={9}
            {...register('zipCode', {
              onChange: (e) => (e.target.value = formatZipCode(e.target.value)),
              onBlur: handleZipCodeOnBlur,
            })}
          />
          <FormField
            className="truncate"
            placeholder="Logradouro"
            error={formErrors?.street?.message}
            {...register('street')}
            disabled
          />
          <FormField
            className="truncate"
            placeholder="Bairro"
            error={formErrors?.neighborhood?.message}
            {...register('neighborhood')}
            disabled
          />
          <FormField
            className="truncate"
            placeholder="Localidade"
            error={formErrors?.state?.message}
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
            disabled={isSubmitting || (!isValid && isSubmitted) || !!isError}
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
