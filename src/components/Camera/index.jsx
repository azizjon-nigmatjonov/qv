import Webcam from 'react-webcam'
import useWindowSize from '../../hooks/useWindowSize'
import React from 'react'
import CustomModal from '../CustomModal'
import { IconButton } from '@mui/material'
import { Camera } from '@mui/icons-material'

const CameraComp = ({ open = false, onClose, onChange }) => {
  const { width, height } = useWindowSize()
  const isLandScape = width > height
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    onChange(imageSrc)
  }, [webcamRef, onChange])
  return open ? (
    <div
      onClick={() => onClose()}
      className="fixed w-full h-full bg-[#47474787] flex align-middle justify-center top-0 left-0 overflow-auto z-[31]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] touch-none"
      >
        <div className="flex w-full h-full items-center bg-black justify-center">
          <Webcam
            audio={false}
            videoConstraints={{ facingMode: "user" }}
            height={height}
            width={width}
            ref={webcamRef}
            screenshotFormat="png"
          />
          <div
            className={`absolute ${
              isLandScape ? 'right-4 top-1/2' : 'bottom-4 left-1/2'
            } translate-x-[-50%] translate-y-[-50%]`}
          >
            <IconButton color="primary" onClick={capture} size="large">
              <Camera />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default CameraComp
