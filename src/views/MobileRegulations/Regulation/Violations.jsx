import { useEffect, useState } from 'react'
import { Tag } from '../../../components'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TEXNIK_NAZORATCHI_ROLE_ID } from '../../../settings/constants'
import ViolationImages from './ViolationImages'

export default function Violations({ violations, violationsStatus, setViolationStatus, activeTab, objectId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState([])
  const { pathname } = useLocation()
  const { id, instruction_id } = useParams()
  const { roleId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  useEffect(() => {
    if (violationsStatus && activeTab !== 0) {
      setViolationStatus(violationsStatus[activeTab - 1])
    }
  }, [activeTab])
  return (
    <div className="bg-[#f6f6f6] rounded-md p-4 mobile-header-tab-title-bottomElm-calc">
      <div className="rounded-md flex flex-col gap-4">
        {violations.data?.violations?.map((violation, index) => (
          <div
            className="bg-white rounded-md p-3 mb-2"
            onClick={() => {
              navigate(
                (pathname.includes('technician') || roleId === TEXNIK_NAZORATCHI_ROLE_ID) && !!id
                  ? `/m/objects/${id}/instructions/${instruction_id}/violation/monitoring/${violation.id}`
                  : !!id
                  ? `/m/objects/${id}/instructions/${instruction_id}/violation/${violation.id}`
                  : `/m/objects/${objectId}/instructions/${instruction_id}/violation/${violation.id}`
              )
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[16px] leading-6 font-semibold">Qoidabuzarlik №{index + 1}</span>
              <Tag
                color={violation?.check_list_status ? 'green' : 'red'}
                value={violation?.check_list_status ? "To'ldirilgan" : "To'ldirilmagan"}
              />
            </div>
            <div className="mb-6">
              <p className="text-sm leading-6 font-semibold mb-1">Aniqlangan qoidabuzarliklar</p>
              <div className="py-3 px-4 rounded-md bg-[#f6f6f6] flex justify-between items-center">
                <div>
                  <p className="text-xs leading-[18px] text-[#48535B]">{violation?.title}</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm leading-6 font-semibold mb-1">Berilgan ko’rsatma</p>
              <div className="py-3 px-4 rounded-md bg-[#f6f6f6] flex justify-between items-center">
                <div>
                  <p className="text-xs leading-[18px] text-[#48535B]">{violation?.description}</p>
                </div>
              </div>
            </div>
            <div className="py-3 flex justify-between items-center text-sm leading-6 border-b">
              <span className="text[#48535B]">Blok</span>
              <span className="font-medium">
                {violation?.check_list_status ? (
                  violation.blocks?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-blue-tag_bg_color p-1 text-center rounded-[6px] text-[14px] text-primary font-medium"
                    >
                      {item.name}
                    </div>
                  ))
                ) : (
                  <div className="bg-blue-tag_bg_color p-1 text-center rounded-[6px] text-[14px] text-primary font-medium">
                    —
                  </div>
                )}
              </span>
            </div>
            <div className="pt-3 flex flex-col justify-between gap-2 items-start text-sm leading-6">
              <p className="text-sm leading-6 font-semibold">Fotosuratlar</p>
              <ViolationImages
                images={violation?.images}
                onClick={() => {
                  handleOpen()
                  setPreviewItem(violation.images)
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <ImageSliderPreview images={previewItem} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}
