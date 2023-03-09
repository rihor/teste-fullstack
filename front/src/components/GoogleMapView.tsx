import { ReactNode, useCallback } from "react";
import { GoogleMap, MarkerF, LoadScriptProps, useJsApiLoader, InfoWindowF } from "@react-google-maps/api"
import mapStyles from "../mapStyles.json";
import { useUserGeolocation } from "../hooks/useUserGeolocation";
import { Delivery } from "../services/deliveries/interfaces";
import { Marker } from "./Marker";

interface Props {
  deliveries: Delivery[];
  children?: ReactNode;
  className?: string;
}

const googleMapKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export function GoogleMapView(props: Props) {
  const { geolocation } = useUserGeolocation({ lat: 0, lng: 0 }, []);
  const google = window.google;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapKey,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(14)
    map.setCenter(geolocation)
  }, [geolocation, google])

  const onUnmount = useCallback((map: google.maps.Map) => {
    map.unbindAll();
  }, [])

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        height: "100%",
        width: "100%",
      }}
      zoom={14}
      center={geolocation}
      options={{ styles: mapStyles }}
      mapContainerClassName={props.className}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {props.deliveries.map((delivery) => (
        <Marker delivery={delivery} />
      ))}
      {props.children}
    </GoogleMap>
  )
}
