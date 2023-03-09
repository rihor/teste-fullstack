import { ReactNode, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, GoogleMapProps } from "@react-google-maps/api"
import { Delivery } from "../services/interfaces"
import mapStyles from "../mapStyles.json";

interface Props {
  deliveries: Delivery[];
  onSelectDelivery?: (delivery: Delivery) => void;
  children?: ReactNode;
  className?: string;
}

const googleMapKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export function GoogleMapView(props: Props) {
  const [userGeolocation, setUserGeolocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserGeolocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapKey} libraries={["visualization"]}>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={14}
        center={userGeolocation}
        options={{ styles: mapStyles }}
        mapContainerClassName={props.className}
      >
        {props.deliveries?.length &&
          props.deliveries.map((delivery) => (
            <Marker
              key={delivery.id}
              position={{
                lat: Number(delivery.latitude),
                lng: Number(delivery.longitude),
              }}
              onClick={() => {
                if (props.onSelectDelivery) {
                  props.onSelectDelivery(delivery)
                }
              }}
            />
          ))}
        {props.children}
      </GoogleMap>
    </LoadScript>
  )
}
