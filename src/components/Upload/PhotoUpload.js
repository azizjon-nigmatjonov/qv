import { CircularProgress } from '@mui/material'
import { useRef, useState } from 'react'
import mobile from 'is-mobile'
import { AddIcon } from '../../assets/icons'
import requestPhotoUpload from '../../services/requestPhotoUpload'

export function PhotoUpload({ onChange }) {
  const hiddenFileInput = useRef(null)
  const [progress, setProgress] = useState(false)
  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  return (
    <div
      className="h-[88px] flex justify-center border border-dashed items-center rounded-[8px] cursor-pointer"
      onClick={handleClick}
    >
      {progress > 0 ? (
        <div className="relative h-[40px]">
          <CircularProgress variant="determinate" value={progress} />
          <div className="absolute top-[12px] left-[8px] text-[11px] font-medium">{`${Math.round(progress)}%`}</div>
        </div>
      ) : (
        <div className="text-center">
          <AddIcon color="#0E73F6" className="mx-auto" />
          <p>Rasm yuklash</p>
        </div>
      )}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(event) => requestPhotoUpload({ event, setProgress, onChange })}
        style={{ display: 'none' }}
        capture={mobile() && 'user'}
      />
    </div>
  )
}
