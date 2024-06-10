import { Add, Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { CancelIcon, SaveIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Card, Header, Input, Textarea } from '../../components'
import { useQuestion } from '../../services'
import * as yup from 'yup'
import { validations } from '../../validations'

const CheckListAdd = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { activeTabId, id } = useParams()
  const [selected, setSelected] = useState([])
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      check: [{ question: '', snip: '' }],
      violation_question: '',
    },
  })

  const { createQuestionMutation, question, updateQuestionSnipMutation } = useQuestion({
    activeTabId,
    createQuestionProps: { onSuccess: () => navigate(-1) },
    deleteQuestionProps: {
      onSuccess: () => {
        toast.success("Savol muvaffaqqiyatli o'chirildi")
      },
    },
    id,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'check',
  })

  const options = [
    {
      value: '5e4fe86a-adc5-4535-b586-264061cafcb5',
      label: 'Prorab',
    },
    {
      value: '6126cbeb-b0b8-4059-9758-14ff3c35473f',
      label: 'Texnik nazoratchi',
    },
    {
      value: 'e7777bfa-7416-44e8-b609-99136ec5d3b0',
      label: 'Mualliflik nazorati',
    },
  ]

  const onSubmit = (data) => {
    // regex to prevent whitespace
    const checkHasCharacter = (item) => {
      let question, snip
      question = item.question.trim()
      snip = item.snip.trim()
      if (question.length > 0 && snip.length > 0) {
        return true
      } else {
        return false
      }
    }
    const hasCharacter = data.check.every((el) => checkHasCharacter(el))
    if (hasCharacter) {
      id
        ? updateQuestionSnipMutation.mutate({
            id,
            question: data.check[0].question,
            snip: data.check[0].snip,
            violation_question: data?.violation_question,
            yes_answer: data?.yes_answer,
          })
        : createQuestionMutation.mutate({
            questions: data.check.map((i) => ({
              final_question: +activeTabId === 1,
              question: i.question,
              snip: i.snip,
              status: true,
            })),
            role: selected.value,
          })
    } else {
      toast.error('Savol va shaharsozlik normasini to`ldiring')
    }
  }

  useEffect(() => {
    if (question.data) {
      setSelected({ value: question.data?.role.id, label: question.data?.role.name })
      reset({
        check: [
          {
            question: question.data?.question,
            snip: question.data?.snip,
          },
        ],
        violation_question: question.data?.violation_question,
        yes_answer: question.data?.yes_answer,
      })
    }
  }, [question.data, reset])

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Qo'shish"
          backLink={-1}
          rightElement={
            <div className="flex gap-3">
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
          <div className={`${id ? 'bg-white rounded-md w-1/2' : ''}`}>
            <Card
              title="Biriktirish"
              rightElement={
                !id && (
                  <BtnFiled onClick={() => append({ question: '' })} leftIcon={<Add />}>
                    Savol qo'shish
                  </BtnFiled>
                )
              }
              className="overflow-visible"
            >
              <div className={`${id ? '' : 'w-1/3'}`}>
                <span className="input-label">Qatnashuvchini biriktirish</span>
                <ReactSelect
                  placeholder="Tanlash..."
                  options={options}
                  value={selected}
                  requiered
                  onChange={(e) => setSelected(e)}
                  // isDisabled={!!id}
                />
              </div>
            </Card>
            {fields.length > 0 &&
              fields.map((field, index) => (
                <div key={field.id} className={`${id ? '' : 'mt-4 rounded-md'} bg-white`}>
                  <div className={`${id ? 'p-4 pt-0' : 'p-4'}`}>
                    <span className="input-label">Savol {!id && index + 1}</span>
                    <Textarea required register={register} name={`check.${index}.question`} widthFull />
                    <span className="input-label mt-3">Shaharsozlik normasi</span>
                    <Input required register={register} name={`check.${index}.snip`} widthFull />
                  </div>
                  {!id && (
                    <div className="px-4 py-3 border-t flex justify-end">
                      <BtnOutlined color="red" leftIcon={<Delete />} onClick={() => remove(index)}>
                        O'chirish
                      </BtnOutlined>
                    </div>
                  )}
                </div>
              ))}
            <div className="p-4">
              <span className="input-label">
                {pathname.includes('accept') ? '“Yo’q” Javob uchun' : 'Aniqlangan qoida buzarlik'}
              </span>
              <Textarea register={register} name="violation_question" widthFull />
            </div>
            {pathname.includes('accept') && (
              <div className="p-4">
                <span className="input-label">“Ha” Javob uchun</span>
                <Textarea register={register} name="yes_answer" widthFull />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckListAdd
