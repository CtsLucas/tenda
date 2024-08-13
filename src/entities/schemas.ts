import { z } from 'zod';

import { isValidDocument, isValidZipCode } from '@/utils';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório')
      .max(30, 'O nome deve conter no máximo 30 caracteres'),
    lastName: z
      .string()
      .min(1, 'O sobrenome é obrigatório')
      .max(50, 'O sobrenome deve conter no máximo 50 caracteres'),
    email: z.string().email('Digite um e-mail válido!'),
    document: z
      .string()
      .min(1, 'O CPF é obrigatório')
      .refine(isValidDocument, 'Digite um CPF válido!'),
    zipCode: z
      .string()
      .min(1, 'O CEP é obrigatório')
      .refine(isValidZipCode, 'Digite um CEP válido!'),
    street: z.string({
      message: 'O logradouro é obrigatório',
    }),
    neighborhood: z.string({
      message: 'O bairro é obrigatório',
    }),
    state: z.string({
      message: 'A Localidade é obrigatório',
    }),
  })
  .refine(
    (fields) => {
      if (!fields.street || !fields.neighborhood || !fields.state) {
        return false;
      }
      return true;
    },
    {
      path: ['zipCode'],
      message: 'Digite um CEP válido!',
    },
  );

export type FormSchema = z.infer<typeof formSchema>;
