import { CircularProgress } from '@mui/material'
import { CheckboxIcon } from '../../../assets/icons'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { Input } from '../../../components'
import ImagePreview from './imagePreview'
import mobile from 'is-mobile'
import CameraComp from '../../../components/Camera'
import { useState } from 'react'

export default function FormElementComp({
  item,
  index,
  changeAnswer,
  question,
  onFileUploadChange,
  progress,
  uploadingItem,
  onTakePhoto,
}) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  function handleCloseCamera() {
    setIsCameraOpen(false)
  }
  return (
    <div key={item.id} className={`p-4 ${index === 9 ? '' : 'border-b'} border-borderColor`}>
      <p className="text-[12px] sm:text-[12px] leading-[24px] font-[400] sm:font-[600]">
        {index + 1}. {item.question}
      </p>
      <div className="flex flex-col">
        <div className="flex items-center gap-[12px] mt-4">
          <div
            onClick={() =>
              changeAnswer({
                questionId: item.id,
                description: '',
                yes: true,
                no: false,
                images: [],
              })
            }
            className="w-[46%] h-[48px] bg-[#F6F6F6] rounded-[8px] cursor-pointer py-[14px] px-4 flex items-center"
          >
            {!question?.yes ? (
              <div className="w-[20px] h-[20px] rounded-full border border-borderColor bg-white" />
            ) : (
              <CheckboxIcon />
            )}
            <p className="text-[14px] ml-[12px]">Ha</p>
          </div>
          <div
            onClick={() =>
              changeAnswer({
                questionId: item.id,
                description: question.description,
                yes: false,
                no: true,
                images: question.images,
              })
            }
            className="w-[46%] h-[48px] bg-[#F6F6F6] rounded-[8px] cursor-pointer py-[14px] px-4 flex items-center"
          >
            {!question?.no ? (
              <div className="w-[20px] h-[20px] rounded-full border border-borderColor bg-white" />
            ) : (
              <CheckboxIcon />
            )}
            <p className="text-[14px] ml-[12px]">Yoq</p>
          </div>
          <label
            htmlFor={item.id}
            onClick={() => {
              if (mobile()) {
                setIsCameraOpen(true)
              }
            }}
            className={`relative transition-all w-[48px] h-[48px] border rounded-[8px] flex items-center justify-center hover:bg-gray-100 cursor-pointer ${
              question?.no && !question?.images.length ? 'border-red-500' : 'border-borderColor'
            }`}
          >
            {uploadingItem === item.id && progress ? (
              <div className="text-xs relative">
                <CircularProgress size={35} style={{ marginTop: 5 }} />
                <span className="absolute top-3.5 left-1.5">{progress}%</span>
              </div>
            ) : mobile() ? (
              <>
                <CameraAltOutlinedIcon className="text-primary" />
                {/* <CameraComp
                  open={isCameraOpen}
                  onClose={handleCloseCamera}
                  onChange={(e) => {
                    onTakePhoto(e, item, question)
                    handleCloseCamera()
                  }}
                /> */}
                <input
                  disabled={!question?.no}
                  hidden
                  id={item.id}
                  type="file"
                  value={''}
                  capture="user"
                  onChange={(event) => onFileUploadChange(event, item, question)}
                />
              </>
            ) : (
              <>
                <CameraAltOutlinedIcon className="text-primary" />
                <input
                  disabled={!question?.no}
                  hidden
                  id={item.id}
                  type="file"
                  value={''}
                  onChange={(event) => onFileUploadChange(event, item, question)}
                />
              </>
            )}
          </label>
        </div>
      </div>
      <div className="mt-4">
        <Input
          disabled={!question?.no}
          showRequired={question?.no && !question?.description}
          widthFull
          placeholder="Izoh qolidiring"
          onChange={(e) =>
            changeAnswer({
              questionId: item.id,
              description: e.target.value,
              yes: question.yes,
              no: question.no,
              images: question.images,
            })
          }
          value={question?.description}
        />
      </div>
      <ImagePreview question={question} changeAnswer={changeAnswer} item={item} />
    </div>
  )
}
