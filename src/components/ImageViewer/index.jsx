import { useEffect, useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'

export function ImageViewer({ setCurrentImage, currentImage, photos }) {
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  useEffect(() => {
    if (currentImage >= 0) {
      setViewerIsOpen(true)
    }
  }, [currentImage])

  const closeLightbox = () => {
    setCurrentImage(undefined)
    setViewerIsOpen(false)
  }

  return (
    <ModalGateway>
      {viewerIsOpen && (
        <Modal onClose={closeLightbox}>
          <Carousel
            currentIndex={currentImage || 0}
            views={photos?.map((x) => ({
              src: process.env.REACT_APP_CDN_IMAGE_URL + x,
            }))}
          />
        </Modal>
      )}
    </ModalGateway>
  )
}
