import { useMutation } from "react-query";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames";

import { Button } from "./Button";
import { Input } from "./Input";
import { deliveriesService } from "../../services/deliveries/deliveries";
import { searchGeolocation } from "../../services/geolocation";
import { createDeliverySchema } from "./validations";
import styles from "./forms.module.scss";

interface Props {
  className?: string;
}

interface FormFields {
  name: string;
  weight: number;
  houseNumber: string;
  district: string;
  adjunct: string;
  street: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  address: string;
}

export function Form(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(createDeliverySchema),
  });
  const mutation = useMutation<any, any, FormFields>((data) => {
    return deliveriesService.createDelivery({
      customer: {
        name: data.name
      },
      city: data.city,
      country: data.country,
      state: data.state,
      street: data.street,
      weight: data.weight,
      latitude: data.latitude,
      longitude: data.longitude,
      district: data.district,
      adjunct: data.adjunct,
      houseNumber: data.houseNumber,
    });
  });

  async function searchPlace() {
    const { address } = getValues();

    const result = await searchGeolocation({
      address: address,
    });

    if (!result || result?.length === 0) {
      setError("address", {
        message: "Could not find location",
      });
      return;
    }

    const geolocation = result[0];
    setValue("country", geolocation.address.country);
    setValue("state", geolocation.address.state);
    setValue("city", geolocation.address.city || geolocation.address.town || "");
    setValue("street", geolocation.address.road);
    setValue("adjunct", geolocation.address.postcode); // Incorrect
    setValue("district", geolocation.address.state_district); // Incorrect
    setValue("latitude", Number(geolocation.lat));
    setValue("longitude", Number(geolocation.lon));
  }

  const onSubmit: SubmitHandler<FormFields> = async (data, event) => {
    mutation.mutate(data);
  }

  const onError: SubmitErrorHandler<FormFields> = (errors, event) => {
    console.debug('errors', errors)
  }

  async function resetDb() {
    await deliveriesService.resetDb();
  }

  return (
    <form
      className={classNames(props.className, styles.form)}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className={styles.content}>
        <Input
          placeholder="Nome Cliente"
          validationsError={errors}
          {...register("name")}
        />
        <Input
          placeholder="Peso da Entrega"
          type="number"
          step="0.1"
          min="0"
          validationsError={errors}
          {...register("weight", { valueAsNumber: true })}
        />
        <Input
          placeholder="Endereço Cliente"
          rightContent={<Button type="button" onClick={searchPlace}>buscar</Button>}
          validationsError={errors}
          {...register("address")}
        />

        <div className={styles.geolocation}>
          <Input
            placeholder="Latitude"
            type="number"
            step="any"
            validationsError={errors}
            {...register("latitude", { valueAsNumber: true })}
          />
          <Input
            placeholder="Longitude"
            type="number"
            step="any"
            validationsError={errors}
            {...register("longitude", { valueAsNumber: true })}
          />
        </div>

        <Button type="submit" data-design="confirm">cadastrar cliente</Button>
      </div>
      <div className={styles.reset}>
        <Button data-design="reset" onClick={resetDb}>resetar cadastro</Button>
      </div>
    </form>
  )
}
