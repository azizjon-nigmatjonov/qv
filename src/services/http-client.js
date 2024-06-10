import axios from 'axios'
import toast from 'react-hot-toast'
import { QueryClient } from 'react-query'

export const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_ADMIN,
})

export const devJournalUrl = process.env.REACT_APP_JOURNAL
export const AuthUrl = process.env.REACT_APP_AUTH_CCNIS

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof error.response.data?.data === 'string')
      toast.error(
        error.response.data?.data?.split('=')[2].includes('username or password')
          ? "login yoki parol noto'g'ri"
          : error.response.data?.data?.split('=')[2]
      )

    if (error.response.data?.data) {
      const message = error.response.data?.data?.message

      if (message.includes('user_project_id_client_platform_id_phone_key'))
        toast.error('Bunday telefon raqam band qilingan. Qatnashuvchining telefon raqamini tekshiring.')
      else if (message.includes('uzinfocom')) toast.error("Dastur ta'minotchilariga xabar bering")
      else if (message.includes('user_project_id_client_platform_id_login_key'))
        toast.error('Bunday logindagi foydalanuvchi tizimda mavjud!')
      else if (message.includes('pinf_unique')) toast.error('Bunday PINFL tizimda mavjud!')
      else if (!message.includes('&&$$')) toast.error(error.response.data?.data.message)
    } else toast.error(error.response.data?.description || error.message)
    return Promise.reject(error)
  }
)
//error.response.data?.data?.message ||
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
