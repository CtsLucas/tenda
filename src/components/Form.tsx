import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  CardFooter,
  Button,
} from '@/components/ui';

export const Form = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Desafio Técnico - Tenda</CardTitle>
        <CardDescription>Formulário de endereço</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input placeholder="Digite seu nome" />
        <Input placeholder="Digite seu sobrenome" />
        <Input placeholder="Digite seu e-mail" />
        <Input placeholder="Digite seu CPF" />

        <Input placeholder="Digite seu CEP" />
        <Input placeholder="Logradouro" disabled />
        <Input placeholder="Bairro" disabled />
        <Input placeholder="Localidade" disabled />
      </CardContent>

      <CardFooter className="justify-end gap-3">
        <Button variant="secondary">Limpar</Button>
        <Button>Enviar</Button>
      </CardFooter>
    </Card>
  );
};
