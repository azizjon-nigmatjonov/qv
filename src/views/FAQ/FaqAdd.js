import { useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Card, Header, Select, Textarea } from '../../components'
import DeleteIcon from '@mui/icons-material/Delete'
import useFaq from '../../services/useFaq'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const FaqAdd = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { createFaqMutation, faqById, updateFaqMutation } = useFaq({
    createFaqProps: {
      onSuccess: () => navigate(-1),
    },
    updataFaqProps: {
      onSuccess: () => navigate(-1),
    },
    id,
  })

  const options = [
    {
      value: '068d66e7-6d9f-4089-ab01-d423f02a27f4',
      label: 'Qurilish qatnashuvchilari',
    },
    {
      value: 'c9f74a64-77d4-409e-b9be-29b88eb34d20',
      label: 'GASN xodimlari',
    },
  ]

  const { register, errors, control, handleSubmit, setValue } = useForm()

  const onSubmitAdd = (data) =>
    id
      ? updateFaqMutation.mutate({
          id,
          answer: data.answer,
          department_id: data.department_id[0].value,
          question: data.question,
          status: true,
        })
      : createFaqMutation.mutate({
          ...data,
          department_id: data.department_id.value,
        })

  useEffect(() => {
    if (faqById.data) {
      const data = faqById.data
      setValue('answer', data?.answer)
      setValue('question', data?.question)
      setValue('department_id', [{ value: data?.department.id, label: data?.department.name }])
    }
  }, [faqById.data])

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmitAdd)}>
        <Header
          title={id ? "O'zgartirish" : "Qo'shish"}
          backLink={-1}
          rightElement={
            <div className="flex items-center gap-[12px]">
              <BtnOutlined type="button" leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled color="blue" leftIcon={<SaveIcon />} type="submit">
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <Card title="Biriktirish" className="w-1/2 overflow-visible">
            <span className="input-label">Savol</span>
            <Textarea widthFull register={register} name="question" errors={errors} />
            <span className="input-label mt-2">Javob</span>
            <Textarea widthFull register={register} name="answer" errors={errors} />
            <span className="input-label mt-2">Bo'lim</span>
            <Select control={control} options={options} name="department_id" />
          </Card>
        </div>
      </form>
    </div>
  )
}

export default FaqAdd
