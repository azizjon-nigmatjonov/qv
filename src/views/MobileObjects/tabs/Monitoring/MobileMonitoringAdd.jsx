import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useChecklist, useQuestion } from '../../../../services'
import { BOSH_PRORAB_ROLE_ID, REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID } from '../../../../settings/constants'
import { setRegulationDeadlineUpdating } from '../../../../redux/actions/regulationActions'
import { MobileFilterHeader } from '../../../../components/FilterHeader/MobileFilterHeader'
import ConfirmModal from '../../../../components/ConfirmModal'
import { MonitoringForm } from '../../../../forms'
import { BtnFiled, BtnOutlined } from '../../../../components'
import { CancelIcon } from '../../../../assets/icons'
import CheckIcon from '@mui/icons-material/Check'
import mobile from 'is-mobile'
export default function MobileMonitoringAdd() {
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
      onSuccess: (res) => {
        setAnswered(
          res?.questions?.map((item) => ({
            question_id: item.id,
            description: '',
            object_id: id,
            yes: false,
            no: false,
            images: [],
          }))
        )
      },
    },
  })

  const { createMutation } = useChecklist({
    createMutationProps: {
      onSuccess: (res) => {
        if (res.data?.data?.ids) {
          navigate(`/m/objects/${id}/instructions/view/${res.data.data.ids[0]}`, { state: { monitoring: true } })
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
      const checks = answered?.map((item) => ({
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
    if (answered?.find((item) => !item.yes && !item.no)) {
      setHasNoAnswered(true)
    } else {
      const allYes = answered?.every((item) => item.yes)
      const hasNo = answered?.find((a) => a.no)?.description && answered?.find((a) => a.no)?.images.length
      if (allYes || hasNo) {
        setHasNoAnswered(false)
      } else {
        setHasNoAnswered(true)
      }
    }
  }, [answered])
  return (
    <div className="relative">
      <MobileFilterHeader leftElements={[<h2 className="text-[16px] font-bold">Monitoringdan o`tkazish</h2>]} />
      <div className="mobile-header-filter-bottomElm-calc p-3 ">
        {/* <CameraComp /> */}
        <MonitoringForm
          questions={questions.data?.questions}
          changeAnswer={changeAnswer}
          getQuestionById={getQuestionById}
        />
      </div>
      <div className="flex flex-col-reverse  items-center gap-[12px] bg-white  sticky bottom-0 w-full p-3">
        {/* <BtnOutlined leftIcon={<CancelIcon />} className="w-full" color="red" onClick={() => navigate(-1)}>
          Bekor qilish
        </BtnOutlined> */}
        <BtnFiled
          color="blue"
          className="w-full"
          leftIcon={<CheckIcon className="text-white" fontSize="small" />}
          onClick={handleOpen}
          disabled={hasNoAnswered}
        >
          Tasdiqlash
        </BtnFiled>
      </div>
      <ConfirmModal
        mobileView={mobile()}
        isOpen={isOpen}
        title={`To'ldirilgan umumiy talablar bo'yicha ${
          answered?.filter((i) => i.no)?.length
        } ta qoidabuzarliklar mavjud, bu bo'yicha yozma ko'rsatma yaratiladi`}
        handleClose={handleClose}
        fn={onSubmit}
      />
    </div>
  )
}
