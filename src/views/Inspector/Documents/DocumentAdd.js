import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import { DocumentsForm } from '../../../forms'
import { useDocument } from '../../../services'

export function DocumentAdd() {
  const params = useParams()
  const navigate = useNavigate()

  const [setFileUrl] = useState('')

  const { createMutation } = useDocument({
    createMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })

  const { handleSubmit, register, setValue } = useForm()

  const onSubmit = (data) =>
    createMutation.mutate({
      ...data,
      file: data.file,
      doc_number: 'string',
      object_id: params.id,
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen">
        <Header
          title="Fayl yuklash"
          backLink={-1}
          rightElement={
            <div className="flex items-center gap-[12px]">
              <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled color="blue" leftIcon={<SaveIcon />} type="submit">
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <DocumentsForm setValue={setValue} register={register} handleFile={setFileUrl} />
        </div>
      </div>
    </form>
  )
}
