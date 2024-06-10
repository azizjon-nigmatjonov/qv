import { Close } from '@mui/icons-material'
import { useState } from 'react'
import ImageSliderPreview from '../../../components/ImageSliderPriview'

export default function ImagePreview({ changeAnswer, question, item }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return question?.images.length ? (
    <div className="grid grid-cols-12 gap-3 mt-4">
      {question.images?.map((image) => (
        <div className="col-span-4 relative">
          <img
            onClick={() => {
              handleOpen()
            }}
            className="rounded-md"
            key={image}
            src={`${process.env.REACT_APP_CDN_IMAGE_URL}${image}`}
            alt="monitoring"
          />

          <div
            className="w-5 h-5 bg-red-500 rounded-full p-1 absolute -top-1.5 -left-1.5 text-xs cursor-pointer"
            onClick={() =>
              changeAnswer({
                questionId: item.id,
                description: question.description,
                yes: question.yes,
                no: question.no,
                images: question.images.filter((i) => i !== image),
              })
            }
          >
            <Close htmlColor="white" fontSize="inherit" className="mb-1.5" />
          </div>
        </div>
      ))}
      <ImageSliderPreview isOpen={isOpen} handleClose={handleClose} images={question.images} />
    </div>
  ) : null
}
