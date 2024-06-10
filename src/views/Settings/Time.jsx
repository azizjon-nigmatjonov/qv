import { Save } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { CancelIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Card, Header } from '../../components'
import { useMonitor } from '../../services'

function SettingsTime() {
  const navigate = useNavigate()

  const [value, setValue] = useState('')

  const { monitorSettings, updateMutation } = useMonitor({
    key: 'time',
    updateMutationProps: {
      onSuccess: () => toast.success('Muvaffaqiyatli yangilandi'),
    },
  })

  useEffect(() => {
    if (monitorSettings.data) {
      setValue(monitorSettings.data?.monitor_settings[0]?.value)
    }
  }, [monitorSettings.data])

  return (
    <div className="h-screen">
      <Header
        title="Vaqt"
        rightElement={
          <div className="flex gap-3">
            <BtnOutlined color="red" leftIcon={<CancelIcon />} type="button" onClick={() => navigate(-1)}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled
              leftIcon={<Save />}
              onClick={() =>
                updateMutation.mutate({
                  id: monitorSettings.data?.monitor_settings[0]?.id,
                  status: true,
                  value: value.length > 5 ? value : `${value}:00`,
                })
              }
            >
              Saqlash
            </BtnFiled>
          </div>
        }
      />
      <div className="p-4">
        <Card title="Umumiy ma'lumot" className="w-1/2">
          <span className="input-label mb-1">Monitoring vaqtini belgilash</span>
          <input
            className="px-3 w-full py-2 border rounded-md"
            type="time"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Card>
      </div>
    </div>
  )
}

export default SettingsTime
