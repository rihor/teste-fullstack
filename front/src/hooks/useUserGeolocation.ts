import { useState, useEffect, DependencyList } from "react";

type DefaultGeolocation = { lat: number, lng: number };

export function useUserGeolocation(
  defaultGeolocation: DefaultGeolocation,
  deps: DependencyList
) {
  const [geolocation, setUserGeolocation] = useState(defaultGeolocation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserGeolocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, null, { enableHighAccuracy: true })
  }, deps);

  return { geolocation }
}
