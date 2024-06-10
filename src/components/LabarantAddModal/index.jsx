import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useMemo, useState } from 'react'
import { useUser } from '../../services'
import {
  BOSH_LABARATORIYA_ROLE_ID,
  LABARATORIYA_BOSHLIGI_ROLE_ID,
  YETAKCHI_LABARATORIYA_ROLE_ID,
} from '../../settings/constants'
import { BtnFiled } from '../Buttons/BtnFilled'
import { Input } from '../Input'
import { Select } from '../Select'
import { useObject } from '../../services'
import { useParams } from 'react-router-dom'

export default function LabarantAddModal({ open, onClose, onAdd, oldLabarant }) {
  const [labarant, setLabarant] = useState({
    value: '',
    label: '',
  })
  const { id } = useParams()
  const { users } = useUser({
    limit: 1000,
    offset: 1,
    role_id: [BOSH_LABARATORIYA_ROLE_ID, YETAKCHI_LABARATORIYA_ROLE_ID, LABARATORIYA_BOSHLIGI_ROLE_ID],
    usersProps: {
      enabled: open,
    },
  })
  const labarantOptions = useMemo(() => {
    return users?.data?.users.map((item) => ({
      label: item?.surname + ' ' + item?.name + ' ' + item?.middle_name,
      value: item.id,
    }))
  }, [users])
  const { objectParticipantsMutation } = useObject({
    craeteObjectParticipantsProps: {
      onSuccess: () => {
        onAdd('success')
        onClose()
      },
      onError: () => {
        onAdd('error')
        onClose()
      },
    },
  })
  function handleAddLabarant() {
    objectParticipantsMutation.mutate({
      object_id: id,
      user_id: labarant.value,
      role_id: users?.data?.users?.find((item) => item.id === labarant.value)?.role_id,
      status: true,
    })
  }
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose()
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="bg-white w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between p-8">
          <h1 className="text-2xl font-bold">Laboratoriya xodimini biriktirish</h1>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div className="w-full grid grid-cols-12 items-center gap-2 p-8 pt-0">
          <span className="input-label col-span-12">Laborantni tanlang</span>
          <div className="col-span-12">
            <Select
              options={labarantOptions}
              name="difficulty_category_id"
              defaultValue={
                oldLabarant
                  ? {
                      value: oldLabarant?.user_id,
                      label:
                        oldLabarant?.user_surname + ' ' + oldLabarant?.user_name + ' ' + oldLabarant?.user_middlename,
                    }
                  : undefined
              }
              onChange={(e) => {
                setLabarant(e)
              }}
            />
          </div>
          <div className="mt-4 col-span-12">
            <BtnFiled className="w-full" size="large" onClick={handleAddLabarant}>
              Davom etish
            </BtnFiled>
          </div>
        </div>
      </div>
    </Modal>
  )
}
