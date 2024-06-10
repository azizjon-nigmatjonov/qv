import { format } from 'date-fns'
import dateFormatter from '../../../utils/dateFormatter'
import { FileView } from '../../../components/FileView/FileView'
import { StatusTag } from '../../../components'
export default function ActRegulationView({ data, title, itemKey }) {
  return (
    <div className="bg-[#f6f6f6] rounded-md p-4 mobile-header-tab-title-bottomElm-calc">
      {data?.map((item, index) => (
        <div className="bg-white rounded-md">
          <div className="p-3  flex border-b justify-between mb-4">
            <p className="text-[18px] leading-[28px] font-semibold">
              {title} № {index + 1}
            </p>
            <p className="text-[16px] leading-[28px]">
              {dateFormatter(format, new Date(item?.created_at), 'dd.MM.yyyy')}
            </p>
          </div>
          {itemKey !== 'extendation' && (
            <div className="mb-4 p-3">
            <p className="text-[18px] leading-[28px] font-semibold">Aniqlangan qoidabuzarlik</p>
            <div className="border border-[#E5E9EB] rounded-md bg-[#F6F8F9] py-[8px] px-[16px]">
              <p className="text-sm text-[#5B6871]">{item?.title}</p>
            </div>
          </div>
          )}
          <div className="mb-4 p-3">
            <p className="text-[18px] leading-[28px] font-semibold">Izoh</p>
            <div className="border border-[#E5E9EB] rounded-md bg-[#F6F8F9] py-[8px] px-[16px]">
              <p className="text-sm text-[#5B6871]">{item?.comment}</p>
            </div>
          </div>
          <div className="mb-4 p-3">
            <p className="text-[18px] leading-[28px] font-semibold">Fayl</p>
            {item?.files?.map((file) => (
              <FileView fileName={file} ownLink="https://test.cdn.ccnis.uz/files" />
            ))}
          </div>
          <div className="mb-4 p-3 border-t flex justify-between">
            <p className="text-[18px] leading-[28px] font-semibold">Holati</p>
            <StatusTag statusId={item?.status_id} title={item?.status} />
          </div>
        </div>
      ))}
    </div>
  )
}
