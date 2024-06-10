import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import dateFormatter from '../../../utils/dateFormatter'
import { StatusTag } from '../../../components'
import phoneNumberFormatter from '../../../utils/phoneNumberFormatter'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import { BOSH_PRORAB_ROLE_ID } from '../../../settings/constants'
import { UserThinSvg } from '../../../assets/icons'

export default function MainInformation({ regulation, deadlineError, disabled, deadline, setDeadline }) {
  const { roleId } = useSelector((state) => state.auth)

  const deadlineDate = new Date(regulation?.deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const deadLineNow = new Date()
  deadLineNow.setHours(0, 0, 0, 0)
  return (
    <>
      <div className="bg-[#f6f6f6] rounded-md p-4 mobile-header-tab-title-bottomElm-calc">
        <div className="bg-white rounded-md">
          <div className="pt-3 px-3 bg-white rounded-md flex justify-between mb-4">
            <div>
              <p className="text-[18px] leading-[28px] font-semibold">№ {regulation.data?.regulation_number}</p>
              <p className="text-sm leading-6 text-[#5B6871]">
                {' '}
                {`${
                  regulation.data?.created_at
                    ? dateFormatter(format, new Date(regulation.data.created_at), 'dd.MM.yyyy')
                    : '01.01.2022'
                } -
                  ${
                    regulation.data?.deadline
                      ? dateFormatter(format, new Date(regulation.data.deadline), 'dd.MM.yyyy')
                      : '01.01.2022'
                  }`}
              </p>
            </div>
            <div>
              <StatusTag
                size="small"
                statusId={regulation.data?.regulation_status_id}
                title={regulation.data?.regulation_status}
              />
            </div>
          </div>
          <div className="mb-4 px-3">
            <p className="text-sm leading-6 font-semibold mb-1">Ko'rsatma beruvchi</p>
            <div className="py-3 px-4 rounded-md bg-[#f6f6f6] flex justify-between items-center">
              <div>
                <p className="text-xs leading-[18px] text-[#48535B]">{regulation.data?.guilty_user?.role_name}</p>
                <p className="text-sm leading-6">{`${regulation.data?.guilty_user?.user_name} ${regulation.data?.guilty_user?.user_middlename} ${regulation.data?.guilty_user?.user_surname}`}</p>
              </div>
              <p className="text-xs leading-6 text-[#0E73F6]">
                {phoneNumberFormatter(regulation.data?.guilty_user?.phone)}
              </p>
            </div>
          </div>
          <div className="mb-4 px-3">
            <p className="text-sm leading-6 font-semibold mb-1">Obyekt</p>
            <div className="py-3 px-4 rounded-md bg-[#f6f6f6] text-sm leading-6">{regulation.data?.object_name}</div>
          </div>
          <div className="mb-4 px-3">
            <div className={`sm:w-1/5 rounded-md ${deadlineError ? '' : ''}`}>
              <CustomDatePicker
                minDate={
                  roleId === BOSH_PRORAB_ROLE_ID
                    ? new Date()
                    : new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
                }
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
                disabled={disabled}
                error={deadLineNow > deadlineDate}
                date={deadline}
                setDate={setDeadline}
              />
            </div>
          </div>
          <div className="p-3 leading-[26px] font-bold border-y">Masul xodimlar</div>
          <div className="p-3">
            <div className="bg-[#F8F8F8] p-3 rounded-md">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="w-10 h-10 bg-[#E0EEFF] rounded-md p-2.5 flex justify-center items-center">
                  <UserThinSvg />
                </div>
                <p className="text-sm leading-6 font-semibold">{regulation.data?.user?.role_name}</p>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <div>
                  <p className="text-sm leading-6">{`${regulation.data?.user?.user_name} ${regulation.data?.user?.user_middlename} ${regulation.data?.user?.user_surname}`}</p>
                  <p className="text-xs leading-6 text-[#0E73F6]">
                    {phoneNumberFormatter(regulation.data?.user?.phone)}
                  </p>
                </div>
                {/* <div className="border-l pl-3">
                <p className="text-xs leading-4 text-[#48535B]">Ko'rsatma</p>
                <p className="text-sm leading-6">0132412/120</p>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
