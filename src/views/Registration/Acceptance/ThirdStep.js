import { CancelIcon, DownloadIcon, RightArrowIcon } from '../../../assets/icons'
import { BasicTable, BtnFiled, BtnOutlined, Card, FileUpload, StatusTag } from '../../../components'
import downloadItForMe from '../../../utils/downloadItForMe'
import DoneIcon from '@mui/icons-material/Done'
import { useSelector } from 'react-redux'
import { ACCEPTANCE_SENT_TO_LK, REGISTRATURA_ROLE_ID } from '../../../settings/constants'
import useAcceptance from '../../../services/useAcceptance'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../../../components/ConfirmModal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'

const ThirdStep = ({ id, current, acceptance }) => {
  const { roleId, userId } = useSelector((state) => state.auth)

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Tashkilot',
      key: 'organization_name',
    },
    {
      title: 'Izoh',
      key: 'comment',
    },
    {
      title: 'Fayl',
      key: 'files',
      render: (val) => <span>{''}</span>,
    },
    {
      title: 'Holati',
      key: 'is_accepted',
      render: (val) => (
        <StatusTag
          color={val === 'true' ? 'green' : val === 'false' ? 'red' : 'blue'}
          title={val === 'true' ? "Ma'qullangan" : val === 'false' ? 'Rad etilgan' : 'Yangi'}
        />
      ),
    },
  ]
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [modalKey, setModalKey] = useState('confirm')
  const [file, setFile] = useState('')
  const [value, setValue] = useState('')
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { updateOrganizationMutation, updateAcceptanceMutation, organizations } = useAcceptance({
    updateAcceptanceProps: {
      onSuccess: () => {
        toast.success('Inspektorga yuborildi')
        navigate(-1)
      },
    },
    offset,
    limit,
    id,
    organizationsProps: { enabled: !!id && current === 3 },
    updateOrganizationProps: { onSuccess: () => navigate(-1) },
  })

  const onSubmit = () =>
    updateOrganizationMutation.mutate({
      comment: value,
      files: file ? [file] : [],
      is_accepted: `${modalKey === 'confirm'}`,
      organization_actions_id: id,
      organization_user_id: userId,
    })

  return (
    <div className="h-screen">
      {roleId === REGISTRATURA_ROLE_ID ? (
        <div className="p-4 rounded-md bg-white">
          <BasicTable
            headColumns={headData}
            bodyColumns={organizations.data?.oragnizations_actions}
            isLoading={organizations.isLoading}
          />
          {ACCEPTANCE_SENT_TO_LK === acceptance.data?.status_id && (
            <div className="flex justify-end items-center mt-4 gap-3">
              <BtnOutlined color="red" leftIcon={<CancelIcon />} onClick={() => navigate(-1)}>
                Rad etish
              </BtnOutlined>
              <BtnFiled
                rightIcon={updateAcceptanceMutation.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                disabled={!organizations.data?.oragnizations_actions?.every((i) => i?.is_accepted === 'true')}
                leftIcon={<RightArrowIcon color="white" />}
                onClick={() => {
                  updateAcceptanceMutation.mutate({
                    acceptance_id: id,
                    inspector_is_accepted: false,
                    status_id: '5de5f2d1-17fa-4e2f-bb1c-0218d029d0a6',
                  })
                  // handleOpen()
                  // setModalKey('inspektor')
                }}
              >
                Inspektorga yuborish
              </BtnFiled>
            </div>
          )}
        </div>
      ) : (
        <Card title="Umimiy ma'lumotlar" className="w-1/2">
          <span className="input-label">Izoh</span>
          <textarea
            onChange={(e) => setValue(e.target.value)}
            value={value}
            rows={4}
            placeholder="Izoh ... "
            className="border p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary overflow-hidden"
          />
          <span className="input-label mt-4">Fayl</span>
          <FileUpload widthFull showSmallPreview nameFile="file" handleFile={setFile} />
          <div className="flex gap-3 mt-4 justify-end">
            <BtnOutlined
              disabled={!value}
              leftIcon={<CancelIcon />}
              onClick={() => {
                handleOpen()
                setModalKey('reject')
              }}
            >
              Bekor qilish
            </BtnOutlined>
            <BtnFiled
              disabled={!value}
              leftIcon={<DoneIcon />}
              onClick={() => {
                handleOpen()
                setModalKey('confirm')
              }}
            >
              Qabul qilish
            </BtnFiled>
          </div>
        </Card>
      )}
      <ConfirmModal
        iconColor={modalKey === 'reject' && 'red'}
        isOpen={isOpen}
        handleClose={handleClose}
        fn={onSubmit}
        title={modalKey === 'confirm' ? 'Qabul qilmoqchimisiz' : 'Rad etmoqchimisiz?'}
      />
    </div>
  )
}

export default ThirdStep
