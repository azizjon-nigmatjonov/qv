import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { CancelIcon } from '../../assets/icons'
import { BasicLayout, BasicTable } from '../../components'
import DownloadBadge from '../../components/DownloadBadge/DownloadBadge'
import useRotation from '../../services/useRotation'

export default function HistoryChangesModal({ isOpen, handleClose, id }) {
  const { rotations } = useRotation({
    limit: 100,
    offset: 0,
    inspector_id: id,
    rotationsProps: {
      enabled: !!isOpen,
    },
  })

  const archiveHead = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Sana',
      key: 'created_at',
    },
    {
      title: 'F.I.O',
      key: ['first_inspector_name', 'second_inspector_name'],
      render: (fullName) => (
        <div>
          {fullName[0]} <KeyboardArrowRightOutlined /> {fullName[1]}
        </div>
      ),
    },
    {
      title: 'Buyruq',
      key: ['order'],
      render: (value) => <DownloadBadge value={value[0]} />,
    },
    {
      title: 'Buyruq sanasi',
      key: 'order_date',
    },
  ]
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className=" bg-white rounded-xl p-8">
          <BasicTable
            headColumns={archiveHead}
            bodyColumns={rotations.data?.rotation}
            isLoading={rotations.isLoading}
          />
        </div>
      </Modal>
    </>
  )
}
