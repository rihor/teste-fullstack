import { ReactNode } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import mapStyles from "../mapStyles.json";
import { useUserGeolocation } from "../hooks/useUserGeolocation";
import { Delivery } from "../services/deliveries/interfaces";

interface Props {
  deliveries: Delivery[];
  onSelectDelivery?: (delivery: Delivery) => void;
  children?: ReactNode;
  className?: string;
}

const googleMapKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export function GoogleMapView(props: Props) {
  const { geolocation } = useUserGeolocation({ lat: 0, lng: 0 }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapKey} libraries={["visualization"]}>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={14}
        center={geolocation}
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
