import { useForm } from "react-hook-form";
import classNames from "classnames";

import { Button } from "./Button";
import { Input } from "./Input";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { searchGeolocation } from "../../services/geolocation";
import styles from "./forms.module.scss";

interface Props {
  className?: string;
}

export function Form(props: Props) {
  const form = useForm();
  // const debouncedInputChange = useDebounceInput(async (value) => {
  //   const geolocation = await searchGeolocation({
  //     address: value,
  //   });
  // }, 1000);

  function searchPlace() {
    console.log(form.getValues());

    // const geolocation = await searchGeolocation({
    //   // address: value,
    // });
  }

  function onSubmit(data: unknown) {
    // TODO: Handle submit
  }

  return (
    <form className={classNames(props.className, styles.form)} onSubmit={form.handleSubmit(onSubmit)}>
      <div className={styles.content}>
        <Input
          placeholder="Nome Cliente"
          {...form.register("name", { required: true, minLength: 2 })}
        />
        <Input
          placeholder="Peso da Entrega"
          type="number"
          step="0.1"
          min="0"
          {...form.register("weight", { required: true })}
        />
        <Input
          placeholder="Endereço Cliente"
          rightContent={<Button type="button" onClick={searchPlace}>buscar</Button>}
          {...form.register("address", { required: true })}
        />

        <div className={styles.geolocation}>
          <Input placeholder="Latitude" />
          <Input placeholder="Latitude" />
        </div>

        <Button type="submit" data-design="confirm">cadastrar cliente</Button>
      </div>
      <div className={styles.reset}>
        <Button data-design="reset">resetar cadastro</Button>
      </div>
    </form>
  )
}
