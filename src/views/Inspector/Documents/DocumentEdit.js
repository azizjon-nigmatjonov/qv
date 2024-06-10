import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Header } from '../../../components'
import { DocumentsForm } from '../../../forms'
import { useDocument } from '../../../services'

export function DocumentEdit() {
  const params = useParams()

  const { setValue, reset, register } = useForm()
  const { document } = useDocument({
    id: params.document_id,
    onSuccess: (data) => {
      reset(data)
    },
  })

  return (
    <div className="h-screen">
      <Header title={document?.data?.name} backLink={-1} />
      <div className="sidebar-header-calc">
        <DocumentsForm document={document.data} setValue={setValue} disabled register={register} />
      </div>
    </div>
  )
}
