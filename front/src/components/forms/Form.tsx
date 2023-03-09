import { Button } from "./Button";
import { Input } from "./Input";

interface Props {
  className?: string;
}

export function Form(props: Props) {
  return (
    <form className={props.className}>
      <div>
        <div>
          <Input placeholder="Nome Cliente" />
          <Input placeholder="Peso da Entrega" />
          <Input
            placeholder="Endereço Cliente"
            rightContent={<Button>buscar</Button>}
          />
        </div>

        <div>
          <Input placeholder="Latitude" />
          <Input placeholder="Latitude" />
        </div>

        <Button>cadastrar cliente</Button>
      </div>
      <div>
        <Button>resetar cadastro</Button>
      </div>
    </form>
  )
}
