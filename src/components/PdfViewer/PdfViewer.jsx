import { Close } from '@mui/icons-material'
import { CircularProgress, Modal } from '@mui/material'
import cls from './style.module.scss'
export default function PdfViewerModal({ base64, isPdfLoading, isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={cls.pdfContainer}>
        <div className={cls.closeIcon}>
          <Close style={{ color: 'white' }} onClick={onClose} />
        </div>
        {isPdfLoading ? (
          <CircularProgress />
        ) : (
          <object
            aria-label="pdf"
            id="obj"
            width="800"
            height="100%"
            data={`data:application/pdf;base64,${base64?.data?.file}`}
          >
            <div className='bg-white h-full flex-col w-full flex align-middle justify-center'><p className='h-fit text-center'>Pdfni ko'rsatib bolmadi qaytadan urunib ko'ring</p></div>
          </object>
        )}
      </div>
    </Modal>
  )
}
