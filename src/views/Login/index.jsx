import { useLocation } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import loginImg from '../../assets/images/logo.svg'
import ForgotPassword from './forgotPasswordForm'
import LoginForm from './loginForm'
import { useQuery } from '../../hooks/useQuery'

export function Login() {
  const { width } = useWindowSize()
  let query = useQuery()
  return (
    <>
      <div className={`grid ${width < 769 ? 'grid-rows-6 bg-primary' : 'grid-cols-2'}  fixed top-0 left-0 bottom-0 right-0`}>
        <div className={`bg-primary flex items-center justify-center ${width < 769 ? 'row-span-2 w-[100vw]' : ''}  `}>
          <img src={loginImg} alt="login" className="md:w-[556px] md:object-cover w-[400px] md:h-auto object-contain" />
        </div>
        <div className={`bg-white flex flex-col items-center justify-center rounded-t-2xl ${width < 769 ? 'row-span-4 py-8' : ''}`}>
          {!query.get('forgot-password') ? <LoginForm /> : <ForgotPassword />}
        </div>
      </div>
    </>
  )
}
