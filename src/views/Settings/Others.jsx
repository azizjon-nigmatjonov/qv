import toast from 'react-hot-toast'

import { BasicLayout, BasicTable, Header } from '../../components'
import Switch from '../../components/Switch'
import { useMonitor } from '../../services'

function SettingsOthers() {
  const { monitorSettings, updateMutation } = useMonitor({
    key: 'permission',
    updateMutationProps: {
      onSuccess: () => toast.success('Muvaffaqiyatli yangilandi'),
    },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Holati',
      key: 'key',
    },
    {
      title: '',
      key: ['id', 'status'],
      render: (val) => (
        <Switch
          defaultChecked={val[1]}
          disabled={updateMutation.isLoading}
          onChange={(e) =>
            updateMutation.mutate({
              id: monitorSettings.data?.monitor_settings[0]?.id,
              status: e,
              value: '',
            })
          }
        />
      ),
    },
  ]

  return (
    <div className="h-screen">
      <Header title="Boshqalar" />
      <div className="sidebar-header-calc">
        <BasicLayout>
          <BasicTable
            headColumns={headData}
            isLoading={monitorSettings.isLoading}
            bodyColumns={monitorSettings.data?.monitor_settings}
          />
        </BasicLayout>
      </div>
    </div>
  )
}

export default SettingsOthers
