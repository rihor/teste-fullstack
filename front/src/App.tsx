import { useQuery } from 'react-query'
import { Form } from './components/forms/Form'
import { GoogleMapView } from './components/GoogleMapView'
import { Table } from './components/Table'
import { deliveriesService } from './services/deliveries/deliveries'
import './styles.scss';

function App() {
  const { data, error, refetch } = useQuery('getDeliveries', () => deliveriesService.getDeliveries())

  let deliveries = data?.data

  return (
    <div className="app_wrapper">
      <Form className="form" onCreateDelivery={() => refetch()} onResetDeliveries={() => refetch()} />

      <GoogleMapView deliveries={deliveries || []} className="map" />

      {data?.data && <Table deliveries={data.data} className="table" />}
    </div>
  )
}

export default App
