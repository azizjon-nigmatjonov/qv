import { Close } from '@mui/icons-material'
import UploadIcon from '@mui/icons-material/Upload'
import toast from 'react-hot-toast'
import { request } from '../../services/http-client'
import { BtnFiled } from '../Buttons/BtnFilled'
import { CustomDatePicker } from '../CustomDatePicker'
import { Input } from '../Input'
import FileIcon from '../../assets/images/file-icon.png'
import fileDownloader from '../../utils/fileDownloader'
import { DownloadIcon } from '../../assets/icons'
import { Select } from '../Select'
import { useContract } from '../../services/labaratory/useContract'

export const ConnectLabContractModal = ({
  title,
  open,
  onClose = () => {},
  selectedContract,
  handleContineu,
  setSelectedContract,
}) => {
  const { contractListQuery } = useContract({
    limit: 100,
    offset: 1,
    getContractListParams: {
      enabled: open,
    },
  })

  return (
    open && (
      <div
        className="absolute top-0 left-0 w-full h-full flex justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <div
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8 bg-white z-50 w-full max-w-[640px] rounded overflow-x-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: 'calc(100% - 100px)', paddingBottom: '2rem' }}
        >
          <div className="flex items-start mb-7">
            <p className="font-bold text-2xl">{title}</p>
            <button onClick={onClose} className="border-none bg-transparent ml-auto">
              <Close color="disabled" />
            </button>
          </div>
          <span className="input-label mb-1">Shartnomani tanlang</span>
          <Select
            options={contractListQuery.data?.data?.contracts?.map((el) => ({
              label: el?.contract_number,
              value: el?.id,
            }))}
            customOnChange={(e) => setSelectedContract(e)}
          />
          <div className="min-h-[56px]">
            <BtnFiled
              className="w-full mt-4"
              disabled={!selectedContract?.value}
              onClick={() => handleContineu()}
              children="Davom etish"
              size="large"
            />
          </div>
        </div>
      </div>
    )
  )
}
