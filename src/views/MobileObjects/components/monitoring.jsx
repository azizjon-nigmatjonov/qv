import { MobileMonitoringIcon } from '../../../assets/icons/icons'

export default function MobileMonitoringComp({ monitor, index }) {
  return (
    <div key={monitor.id} className={`bg-white rounded-md p-3 ${index ? 'mt-3' : ''}`}>
      <div className="flex items-center justify-start gap-3">
        <div className='rounded-lg bg-[#367CF41A] p-1'>
          <MobileMonitoringIcon />
        </div>
        <p className="text-[18px] leading-[22px] font-semibold">12.05.2022</p>
      </div>
      <div className="py-3 flex justify-between items-center text-sm leading-6 border-b">
        <span>Berilgan ko'rsatmalar</span>
        <span className="font-medium">{monitor?.given || 0}</span>
      </div>
      <div className="py-3 flex justify-between items-center text-sm leading-6 border-b">
        <span>Faol ko'rsatmalar</span>
        <span className="font-medium">{monitor?.active || 0}</span>
      </div>
      <div className="py-3 flex justify-between items-center text-sm leading-6 border-b">
        <span>Yopilgan ko'rsatmalar</span>
        <span className="font-medium">{monitor?.closed || 0}</span>
      </div>
      <div className="py-3 flex justify-between items-center text-sm leading-6 border-b">
        <span>Muddati o'tgan</span>
        <span className="font-medium">{monitor?.expired || 0}</span>
      </div>
      <div className="pt-3 flex justify-between items-center text-sm leading-6">
        <span>Muddati o'tib yopilgan</span>
        <span className="font-medium">{monitor?.expired_closed || 0}</span>
      </div>
    </div>
  )
}
