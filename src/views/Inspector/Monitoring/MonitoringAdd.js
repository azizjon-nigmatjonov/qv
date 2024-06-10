import { CancelIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import CheckIcon from '@mui/icons-material/Check'
import { MonitoringForm } from '../../../forms'
import { useChecklist, useQuestion } from '../../../services'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmModal from '../../../components/ConfirmModal'
import { BOSH_PRORAB_ROLE_ID, REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID } from '../../../settings/constants'
import { setRegulationDeadlineUpdating } from '../../../redux/actions/regulationActions'

export function MonitoringAdd() {
  const userId = useSelector((state) => state.auth.userId)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [hasNoAnswered, setHasNoAnswered] = useState(false)
  const [answered, setAnswered] = useState([])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { questions } = useQuestion({
    limit: 10000,
    role_ids: BOSH_PRORAB_ROLE_ID,
    final_question: false,
    status: true,
    questionsQueryProps: {
      enabled: true,
    },
  })

  const { createMutation } = useChecklist({
    createMutationProps: {
      onSuccess: (res) => {
        if (res.data?.data?.ids) {
          navigate(`/inspectors/${id}/instructions/view/${res.data.data.ids[0]}`, { state: { monitoring: true } })
          dispatch(setRegulationDeadlineUpdating(res.data?.data?.ids))
        } else {
          navigate(-1)
        }
      },
    },
    objectId: id,
  })

  const changeAnswer = ({ questionId, description, yes, no, images }) => {
    setAnswered((prev) =>
      prev.map((item) =>
        item.question_id === questionId
          ? {
              ...item,
              images,
              description: description.trim() ? description : description.trim(),
              yes,
              no,
            }
          : { ...item }
      )
    )
  }

  const getQuestionById = (questionId) => answered?.find((item) => item.question_id === questionId)

  const getDeadline = () =>
    `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${new Date().getDate()}`

  const onSubmit = () => {
    if (!hasNoAnswered) {
      const checks = answered.map((item) => ({
        answer: item.yes ? item.yes : false,
        deadline: getDeadline(),
        description: item.description.trim(),
        images: item.images,
        object_id: item.object_id,
        question_id: item.question_id,
      }))
      createMutation.mutate({
        checks,
        regulation_type_id: REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID,
        user_id: userId,
      })
    }
  }

  useEffect(() => {
    if (questions?.data?.questions) {
      setAnswered(
        questions.data.questions?.map((item) => ({
          question_id: item.id,
          description: '',
          object_id: id,
          yes: false,
          no: false,
          images: [],
        }))
      )
    }
  }, [questions.data, id])

  useEffect(() => {
    if (answered.find((item) => !item.yes && !item.no)) {
      setHasNoAnswered(true)
    } else {
      const allYes = answered.every((item) => item.yes)
      const hasNo = answered.find((a) => a.no)?.description && answered.find((a) => a.no)?.images.length
      if (allYes || hasNo) {
        setHasNoAnswered(false)
      } else {
        setHasNoAnswered(true)
      }
    }
  }, [answered])

  return (
    <div className="h-screen">
      <Header
        title="Monitoringdan o`tkazish"
        backLink={-1}
        rightElement={
          <div className="flex items-center gap-[12px]">
            <BtnOutlined leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled
              color="blue"
              leftIcon={<CheckIcon className="text-white" fontSize="small" />}
              onClick={handleOpen}
              disabled={hasNoAnswered}
            >
              Tasdiqlash
            </BtnFiled>
          </div>
        }
      />
      <ConfirmModal
        isOpen={isOpen}
        title={`To'ldirilgan umumiy talablar bo'yicha ${
          answered.filter((i) => i.no)?.length
        } ta qoidabuzarliklar mavjud, bu bo'yicha yozma ko'rsatma yaratiladi`}
        handleClose={handleClose}
        fn={onSubmit}
      />
      <div className="sidebar-header-calc">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <MonitoringForm
              questions={questions.data?.questions}
              changeAnswer={changeAnswer}
              getQuestionById={getQuestionById}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
