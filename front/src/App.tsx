import { useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from './components/forms/Button'
import { Form } from './components/forms/Form'
import { GoogleMapView } from './components/GoogleMapView'
import { Table } from './components/Table'
import { deliveriesService } from './services/deliveries/deliveries'
import './styles.scss';

function App() {
  const [page, setPage] = useState(1);
  const { data, refetch } = useQuery(['getDeliveries', page], () => deliveriesService.getDeliveries(page))

  let deliveries = data?.data || []

  function decreasePage(value?: number) {
    setPage(prev => {
      const newPage = Math.max(value ?? prev - 1, 1)
      pageAlert(newPage, prev);
      return newPage;
    });
  }

  function increasePage() {
    setPage(prev => {
      const newPage = Math.min(prev + 1, data?.totalPages ?? 1);
      pageAlert(newPage, prev);
      return newPage;
    });
  }

  function pageAlert(newPage: number, prevPage: number) {
    newPage === prevPage && alert("Não tem outra página.")
  }

  function onResetDeliveries() {
    decreasePage(1);
    refetch();
  }

  return (
    <div className="app_wrapper">
      <Form className="form" onCreateDelivery={() => refetch()} onResetDeliveries={onResetDeliveries} />

      <GoogleMapView deliveries={deliveries} className="map" />

      {data?.data && (
        <div className="table">
          <div className="paginate">
            <Button onClick={() => decreasePage()}>Voltar</Button>
            Página: {data.currentPage}
            <Button onClick={() => increasePage()}>Próxima</Button>
          </div>
          <Table deliveries={deliveries} />
        </div>
      )}
    </div>
  )
}

export default App
