import { useQuery } from 'react-query'
import { Form } from './components/forms/Form'
import { GoogleMapView } from './components/GoogleMapView'
import { Table } from './components/Table'
import { getDeliveries } from './services/deliveries/deliveries'
import './styles.scss';

function App() {
  const { data, error } = useQuery('getDeliveries', () => getDeliveries())

  let deliveries = data?.data

  return (
    <div className="app_wrapper">
      <Form className="form" />

      <GoogleMapView deliveries={deliveries || []} className="map" />

      {data?.data && <Table deliveries={data.data} className="table" />}
    </div>
  )
}

export default App
