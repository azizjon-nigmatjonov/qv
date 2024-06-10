import { Add } from '@mui/icons-material'
import CameraComp from '../../../components/Camera'
import { useState } from 'react'
import { useCanvas } from '../../../services/useCanvas'

export default function ViolationImages({ images = [], onClick = () => {}, addable = false }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [imagesArr, setImagesArr] = useState(images)
  const { canvasMutation } = useCanvas({})
  function handleCloseCamera() {
    setIsCameraOpen(false)
  }
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-3">
        {addable && (
          <div
            className="w-[120px] h-[88px] rounded-lg border border-dashed border-[#D5DADD] overflow-hidden flex flex-col items-center justify-center gap-3"
            onClick={() => {
              setIsCameraOpen(true)
            }}
          >
            <Add color="primary" />
            <span className="text-[14px] leading-6 text-[#48535B]">Rasm yuklash</span>
          </div>
        )}
        {imagesArr?.map((image, vioIndex) => (
          <div className="w-[120px] h-[88px] rounded-lg overflow-hidden" key={image} onClick={onClick}>
            <img
              className="h-full w-full object-contain "
              src={`${process.env.REACT_APP_CDN_IMAGE_URL}${image}`}
              alt="violation"
            />
          </div>
        ))}
      </div>
      {addable && (
        <CameraComp
          open={isCameraOpen}
          onClose={handleCloseCamera}
          onChange={(imgString) => {
            canvasMutation.mutate(
              {
                data: imgString.split('base64,')[1],
              },
              {
                onSuccess: (res) => {
                  setImagesArr([res.data.file, ...imagesArr])
                },
              }
            )
            handleCloseCamera()
          }}
        />
      )}
    </div>
  )
}
