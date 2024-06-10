import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { BasicTable } from '../../components'
import { useMemo } from 'react'
import { useObject } from '../../services'
import { Link } from 'react-router-dom'
import makeColUI from '../../utils/makeColUI'
import { INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID } from '../../settings/constants'

export default function ObjectModal({ open, onClose, user_id }) {
  const headData = useMemo(
    () => [
      {
        title: '№',
        key: 'order',
      },
      {
        title: 'Ariza raqami',
        key: ['task_id', 'id'],
        innerKey: 'task-id',
        render: (val) => (
          <>
            <Link
              to={`/inspectors/${val[1]}`}
              className="min-w-[200px] stretched-link	"
              onClick={(e) => e.stopPropagation()}
            ></Link>
            <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
              {val[0]}
            </span>
          </>
        ),
      },
      {
        title: 'Obyekt nomi',
        key: ['name', 'id'],
        innerKey: 'object-name',
        render: (val) => (
          <>
            <Link
              to={`/inspectors/${val[1]}`}
              className="min-w-[200px] stretched-link	"
              onClick={(e) => e.stopPropagation()}
            ></Link>
            <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
              {val[0]}
            </span>
          </>
        ),
      },
      {
        title: 'Buyurtmachi',
        key: ['customer', 'id'],
        innerKey: 'full_name',
        objectChild: 'full_name',
        render: (val) => (
          <>
            <Link
              to={`/inspectors/${val[1]}`}
              className="min-w-[200px] stretched-link	"
              onClick={(e) => e.stopPropagation()}
            ></Link>
            <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
              {val[0]?.full_name}
            </span>
          </>
        ),
      },
      {
        title: 'Manzil',
        key: ['address', 'id'],
        width: 200,
        render: (val) => (
          <>
            <Link
              to={`/inspectors/${val[1]}`}
              className="min-w-[200px] stretched-link	"
              onClick={(e) => e.stopPropagation()}
            ></Link>
            <span
              className="relative z-20"
              onClick={(e) => e.stopPropagation()}
              style={{ display: 'block', overflowWrap: 'break-word' }}
            >
              {val[0]}
            </span>
          </>
        ),
      },
      {
        title: 'Inspektor',
        key: ['users', 'id'],
        innerKey: 'inspektor',
        render: (value) => (
          <>
            <Link
              to={`/inspectors/${value[1]}`}
              className="min-w-[200px] stretched-link	"
              onClick={(e) => e.stopPropagation()}
            ></Link>
            <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
              {makeColUI(
                value[0],
                value[0]?.find((i) => i.role_id === INSPEKTOR_BOSH_ROLE_ID)
                  ? INSPEKTOR_BOSH_ROLE_ID
                  : value[0]?.find((i) => i.role_id === INSPEKTOR_YETAKCHI_ROLE_ID)
                  ? INSPEKTOR_YETAKCHI_ROLE_ID
                  : value[0]?.find((i) => i.role_id === INSPEKTOR_PRASTOY_ROLE_ID)
                  ? INSPEKTOR_PRASTOY_ROLE_ID
                  : undefined
              )}
            </span>
          </>
        ),
      },
    ],
    []
  )
  const { objects } = useObject({
    user_id: user_id,
    limit: 100,
    offset: 1,
    objectsQueryProps: {
      enabled: !!user_id && open,
    },
  })
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded-md max-w-[90vw]">
        <div className="flex justify-between align-middle items-center">
          <h1 className="font-bold mb-4 text-[24px]">Obyektlar ro’yxati</h1>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </div>
        <BasicTable headColumns={headData} bodyColumns={objects.data?.objects} isLoading={objects.isLoading} />
      </div>
    </Modal>
  )
}
