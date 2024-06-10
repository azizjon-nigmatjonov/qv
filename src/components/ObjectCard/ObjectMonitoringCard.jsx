import { Link } from 'react-router-dom'
import {
  BuildingIcon,
  ControllerIcon,
  DesignerIcon,
  InspectorIcon,
  LaboratoryIcon,
  TechnicalIcon,
} from '../../assets/icons/icons'

export const ObjectMonitoringCard = ({ title, location, id, isForeman = false, subTitle, phone, roleName }) => {
  console.log(roleName)
  const roles = {
    'TEXNIK NAZORATCHI': {
      icon: <TechnicalIcon color="#D29404" />,
      bgColor: 'bg-[rgba(248,221,78,0.3)]',
    },
    'ICHKI NAZORATCHI': {
      icon: <ControllerIcon color="#0D9676" />,
      bgColor: 'bg-[rgba(56,217,185,0.2)]',
    },
    'Mualliflik nazorati': {
      icon: <DesignerIcon color="#A23FEE" />,
      bgColor: 'bg-[rgba(196,121,243,0.15)]',
    },
    'BOSH INSPEKTOR': {
      icon: <InspectorIcon color="#367CF4" />,
      bgColor: 'bg-[rgba(54,124,244,0.1)]',
    },
    INSPEKTOR: {
      icon: <InspectorIcon color="#367CF4" />,
      bgColor: 'bg-[rgba(54,124,244,0.1)]',
    },
    'Yetakchi inspektor': {
      icon: <InspectorIcon color="#367CF4" />,
      bgColor: 'bg-[rgba(54,124,244,0.1)]',
    },
    'Yetakchi  inspektor': {
      icon: <InspectorIcon color="#367CF4" />,
      bgColor: 'bg-[rgba(54,124,244,0.1)]',
    },
    "Labaratoriya boshlig'i": {
      icon: <LaboratoryIcon color="#119C2B" />,
      bgColor: 'bg-[#EBFFF1]',
    },
  }
  return (
    <>
      {!isForeman ? (
        <Link to={`/m/objects/${id}`} className="flex flex-col p-3 border border-borderColor rounded-xl">
          <span className="tablet:text-[16px] mobile:text-[14px] font-[500] leading-[26px] flex items-start gap-x-3">
            <span className="shrink-0 block p-2.5 rounded-xl bg-[rgba(54,124,244,0.1)]">
              <BuildingIcon color="#367CF4" />
            </span>
            <span>{title}</span>
          </span>
          <span className="flex justify-between mt-4">
            <span className="flex gap-1">
              <span className="text-[14px]">{location}</span>
            </span>
          </span>
        </Link>
      ) : (
        <div className="flex flex-col p-3 rounded-xl bg-[#F6F8F9]">
          <div className="flex items-start gap-x-2">
            <span className={`shrink-0 block p-2.5 rounded-xl ${roles[roleName]?.bgColor}`}>
              {roles[roleName]?.icon}
            </span>
            <div className="flex justify-between items-center grow">
              <div className="flex flex-col">
                <span className="text-[#48535B] text-[14px]">{subTitle}</span>
                <span className="text-black">{title}</span>
              </div>
              <span className="text-[#0E73F6]">{phone}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
