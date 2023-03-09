import { useCallback, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";

import { Button } from "./Button";
import { Input } from "./Input";
import { useDebounceInput } from "../../hooks/useDebounceInput";

interface Props {
  className?: string;
}

export function Form(props: Props) {
  const form = useForm();
  const debouncedInputChange = useDebounceInput((value) => {
    console.log('Value', value);
  }, 1000);

  function onSubmit(data: unknown) {
    // TODO: Handle submit
  }

  return (
    <form className={props.className} onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <div>
          <Input
            placeholder="Nome Cliente"
            {...form.register("name", { required: true, minLength: 2 })}
          />
          <Input
            placeholder="Peso da Entrega"
            type="number"
            step="0.1"
            {...form.register("weight", { required: true })}
          />
          <Input
            placeholder="Endereço Cliente"
            rightContent={<Button>buscar</Button>}
            {...form.register("address", { required: true, onChange: debouncedInputChange })}
          />
        </div>

        <div>
          <Input placeholder="Latitude" />
          <Input placeholder="Latitude" />
        </div>

        <Button type="submit">cadastrar cliente</Button>
      </div>
      <div>
        <Button>resetar cadastro</Button>
      </div>
    </form>
  )
}
