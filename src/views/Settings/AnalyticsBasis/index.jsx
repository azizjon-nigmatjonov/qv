import { Header } from '../../../components'
import { TableUI } from './Table/TableUI'

export default function AnalyticBasis() {
  return (
    <div className="h-screen">
      <Header title="Asoslar" />
      <div className="p-4">
        <TableUI />
      </div>
    </div>
  )
}
