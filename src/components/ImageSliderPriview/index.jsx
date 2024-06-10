import { Clear } from '@mui/icons-material'
import { Modal } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { saveAs } from 'file-saver'
import Slider from 'react-slick'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRef, useState } from 'react'
import downloadItForMe from '../../utils/downloadItForMe'

function CustomPrevArrow(props) {
  const { onClick } = props
  return (
    <div className="text-white absolute -left-5 top-[50%] -translate-x-1/2 cursor-pointer" onClick={onClick}>
      <ArrowBackIosNewIcon fontSize="large" />
    </div>
  )
}

function CustomNextArrow(props) {
  const { onClick } = props
  return (
    <div className="text-white absolute -right-[60px] top-[50%] -translate-x-1/2 cursor-pointer" onClick={onClick}>
      <ArrowForwardIosIcon fontSize="large" />
    </div>
  )
}

export default function ImageSliderPreview({ images, isOpen, handleClose }) {
  const [imgIndex, setImgIndex] = useState(0)
  const sliderRef = useRef(null)

  const downloadImage = async () => {
    // downloadItForMe({ bucketName: 'files', expiresAt: 1, filename: images[imgIndex], hasItsOwnLink: true })
    saveAs(`${process.env.REACT_APP_CDN_IMAGE_URL}${images?.[imgIndex]}`, `${images[imgIndex].slice(-20)}.jpg`)
  }

  const settings = {
    customPaging: function (i) {
      return (
        <div className="w-full bg-red-400">
          <img alt={images?.[i]} src={`${process.env.REACT_APP_CDN_IMAGE_URL}${images[i]}`} className="h-20 mr-10" />
        </div>
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div
        className="w-2/3 flex justify-center items-center outline-none"
        onKeyDown={(e) =>
          e.key === 'ArrowLeft'
            ? sliderRef.current.slickPrev()
            : e.key === 'ArrowRight'
            ? sliderRef.current.slickNext()
            : null
        }
      >
        <Slider {...settings} ref={sliderRef} className="w-5/6" afterChange={(index) => setImgIndex(index)}>
          {images?.map((item, index) => (
            <div key={`${images}${index}`} className="px-5 max-h-[700px]">
              <img
                alt={item}
                src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`}
                className="mx-auto rounded-md object-fit"
              />
            </div>
          ))}
        </Slider>
        <span className="absolute top-8 right-8 cursor-pointer" onClick={handleClose}>
          <Clear className="text-white" fontSize="large" />
        </span>
        <span className="absolute bottom-8 right-8 cursor-pointer" onClick={() => downloadImage()}>
          <DownloadIcon className="text-white" fontSize="large" />
        </span>
      </div>
    </Modal>
  )
}
