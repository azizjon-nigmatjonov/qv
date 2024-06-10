import ClearIcon from '@mui/icons-material/Clear'
import { Modal } from '@mui/material'

import { Pagination } from '../Pagination'
import { BasicLayout } from '../Tables/BasicLayout'
import { BasicTable } from '../Tables/BasicTable'

const ChangesModalTable = ({
  isOpen,
  handleClose,
  title,
  isLoading,
  count,
  body,
  head,
  limit = 10,
  offset = 1,
  setOffset,
  setLimit,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        handleClose()
        setOffset(1)
        setLimit(10)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="w-full h-full flex justify-center items-center"
    >
      <div className="mt-4 w-4/5 outline-none">
        <BasicLayout
          rightElement={
            <span
              onClick={() => {
                handleClose()
                setOffset(1)
                setLimit(10)
              }}
              className="cursor-pointer"
            >
              <ClearIcon style={{ color: '#6E8BB7' }} />
            </span>
          }
          title={title}
          footer={
            <Pagination
              count={count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => {
                setLimit(limitNumber)
              }}
              limit={limit}
            />
          }
        >
          <BasicTable isLoading={isLoading} bodyColumns={body} headColumns={head} offset={offset} limit={limit} />
        </BasicLayout>
      </div>
    </Modal>
  )
}

export default ChangesModalTable
