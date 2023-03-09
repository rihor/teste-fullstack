import { InfoWindowF, MarkerF } from "@react-google-maps/api"
import { useState } from "react";
import { Delivery } from "../services/deliveries/interfaces"
import styles from "./google-map.module.scss";

interface Props {
  delivery: Delivery
}

export function Marker(props: Props) {
  const [isPopoverShowing, setIsPopoverShowing] = useState(false);

  const lat = Number(props.delivery.latitude);
  const lng = Number(props.delivery.longitude);

  return (
    <MarkerF
      key={props.delivery.id}
      animation={google.maps.Animation.DROP}
      position={{
        lat,
        lng,
      }}
      onClick={() => setIsPopoverShowing(true)}
    >
      {isPopoverShowing && (
        <InfoWindowF
          position={{ lat, lng }}
          onCloseClick={() => setIsPopoverShowing(false)}
        >
          <div className={styles.popover}>
            <span>{props.delivery.customer.name}</span>
            <span>{props.delivery.weight}kg</span>
          </div>
        </InfoWindowF>
      )}
    </MarkerF>
  )
}
