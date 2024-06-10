import { useMutation } from 'react-query'
import { devJournalUrl, request } from './http-client'

const createCanvasImg = (data) => request.post(`${devJournalUrl}/canvas`, data)
const defaultQueryProps = {
  enabled: false,
}

export const useCanvas = ({ canvasMutateProps }) => {
  const canvasMutation = useMutation(createCanvasImg, canvasMutateProps)

  return {
    canvasMutation,
  }
}
