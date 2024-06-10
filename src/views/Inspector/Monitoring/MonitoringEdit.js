import { Header } from '../../../components'
import { MonitoringForm } from '../../../forms'
import { useChecklist, useQuestion } from '../../../services'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function MonitoringEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { questions } = useQuestion({
    limit: 10000,
    questionsQueryProps: {
      enabled: true,
    },
  })
  const { checklist } = useChecklist({
    createMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
    objectId: id,
  })
  const [answered, setAnswered] = useState([])

  useEffect(() => {
    if (checklist.data?.checklist) {
      setAnswered(
        checklist?.data?.checklist?.map((item) => ({
          question_id: item.question_struct.id,
          description: '',
          object_id: item.object_id,
          yes: item.answer,
          no: !item.answer,
        }))
      )
    }
  }, [checklist.data])

  // useEffect(() => {
  //   if (checklist.data) {
  //     setAnswered(
  //       questions?.data?.questions?.map((item) => ({
  //         question_id: item.id,
  //         description: '',
  //         object_id: id,
  //         yes: false,
  //         no: false,
  //       }))
  //     )
  //   }
  // }, [checklist.data])

  const changeAnswer = ({ questionId, description, yes, no }) => {
    setAnswered((prev) =>
      prev.map((item) =>
        item.question_id === questionId
          ? {
              ...item,
              description,
              yes,
              no,
            }
          : { ...item }
      )
    )
  }

  const getQuestionById = (questionId) =>
    answered?.find((item) => item.question_id === questionId)

  // const onSubmit = () => {
  //   const noAnswered = answered.find((item) => !item.yes && !item.no)
  //   if (!noAnswered) {
  //     const checks = answered.map((item) => ({
  //       description: item.description,
  //       image: 'string',
  //       object_id: item.object_id,
  //       question_id: item.question_id,
  //       user_id: '4d9a0331-ddda-4aec-b87e-2f4eea489920',
  //       answer: item.yes ? item.yes : false,
  //     }))
  //     createMutation.mutate({
  //       checks,
  //     })
  //   }
  // }

  return (
    <div className='h-screen'>
      <Header
        title='Monitoringdan o`tkazish'
        backLink={-1}
        // rightElement={
        //   <div className='flex items-center gap-[12px]'>
        //     <BtnOutlined leftIcon={<CancelIcon />} color='red'>
        //       Bekor qilish
        //     </BtnOutlined>
        //     <BtnFiled
        //       color='blue'
        //       leftIcon={<CheckIcon className='text-white' fontSize='small' />}
        //       onClick={() => onSubmit()}
        //     >
        //       Tasdiqlash
        //     </BtnFiled>
        //   </div>
        // }
      />
      <div className='sidebar-header-calc'>
        <div className='grid grid-cols-12 gap-4'>
          <div
            className='col-span-7'
            style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
          >
            <MonitoringForm
              questions={questions?.data?.questions}
              changeAnswer={changeAnswer}
              getQuestionById={getQuestionById}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
