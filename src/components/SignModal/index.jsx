import React, { useState } from 'react'
import CustomModal from '../CustomModal'
import CanvasComp from './canvasComp'

const SignComponent = ({ signData, signKey, setValue }) => {
  const [openSignModal, setOpenSignModal] = useState(false)
  const [canvasData, setCanvasData] = useState(signData)
  return (
    <div>
      {!!canvasData ? (
        <div className="h-[40px] ">
          <img
            className="h-full w-full object-contain"
            src={`${process.env.REACT_APP_CDN_IMAGE_URL}${canvasData}`}
            alt="signImage"
          />
        </div>
      ) : (
        <>
          <div className="w-full h-full" onClick={() => setOpenSignModal((prev) => !prev)}>
            подпись
          </div>
          <CustomModal open={openSignModal} onClose={() => setOpenSignModal(false)}>
            <CanvasComp setCanvasData={setCanvasData} signData={signData} signKey={signKey} setValue={setValue} setOpenSignModal={setOpenSignModal} />
          </CustomModal>
        </>
      )}
    </div>
  )
}

export default SignComponent
