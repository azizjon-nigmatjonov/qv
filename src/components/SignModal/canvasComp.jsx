import { Component, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { toast } from 'react-hot-toast'
import useWindowSize from '../../hooks/useWindowSize'
import { useCanvas } from '../../services/useCanvas'
import { BtnFiled } from '../Buttons/BtnFilled'

const CanvasComp = ({ signData, setCanvasData, setValue, signKey, setOpenSignModal }) => {
  const canvas = useRef(null)
  const { width, height } = useWindowSize()
  const { canvasMutation } = useCanvas({
    canvasMutateProps: {
      onSuccess: (data) => {
        setValue(signKey, data?.data?.data?.file)
        setCanvasData(data?.data?.data?.file)
      },
      onError: (res) => {
        toast.error(res.data.message)
      },
    },
  })
  return (
    <div className="touch-none">
      <CanvasDraw
        ref={canvas}
        canvasWidth={400}
        canvasHeight={height < 400 ? 200 : 300}
        lazyRadius={2}
        brushColor="#000"
        brushRadius={4}
      />
      <div className="flex justify-between w-full px-10 py-5">
        <BtnFiled className="w-1/3 bg-red-500" onClick={() => canvas.current.clear()}>
          Tozalash
        </BtnFiled>
        <BtnFiled
          className="w-1/3"
          onClick={() => {
            setOpenSignModal(false)
            canvasMutation.mutate({
              data: canvas.current.getDataURL().split('base64,')[1],
            })
          }}
        >
          Saqlash
        </BtnFiled>
      </div>
    </div>
  )
}

export default CanvasComp
