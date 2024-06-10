import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BtnFiled, BtnOutlined, Input } from '../../components'
import { useQuery } from '../../hooks/useQuery'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { validations } from '../../validations'
import * as yup from 'yup'
import { AuthUrl, request } from '../../services/http-client'
import { useUser } from '../../services'
import { useForm } from 'react-hook-form'
import { setAccessTokenOneId, setAuthCredentials } from '../../redux/actions/authActions'
import { routes } from '../../routes'
import { permissions } from '../../settings/permissions'
import useWindowSize from '../../hooks/useWindowSize'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { CircularProgress } from '@mui/material'

export default function LoginForm({}) {
  const validationSchema = yup.object().shape({
    username: validations.string,
    password: validations.mixed,
  })

  const { width } = useWindowSize()
  const query = useQuery()
  const loginApiUrl = !query.get('code') ? `${AuthUrl}/login` : `${AuthUrl}/login-by-one-id`
  const redirectUrl = query.get('state')
  const queryCode = query.get('code')

  //one id authorization api url
  const oneIdAuthBaseUrl = `${process.env.REACT_APP_BASE_URL_ONE_ID}?grant_type=one_authorization_code&client_id=${
    process.env.REACT_APP_CLIENT_ID
  }&client_secret=${process.env.REACT_APP_CLIENT_SECRET_KEY}&redirect_uri=${process.env.REACT_APP_ONE_ID_REDIRECT_URL}&code=${queryCode}`

  //one id access token inetifier function
  const oneIdTokenIdentifierUrl = (res) =>
    `${process.env.REACT_APP_BASE_URL_ONE_ID}?grant_type=one_access_token_identify&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET_KEY}&access_token=${res.data.access_token}&scope=${process.env.REACT_APP_CLIENT_ID}`

  //one id login redirect url
  const oneIdRedirectUrl = `${process.env.REACT_APP_BASE_URL_ONE_ID}?response_type=one_code&client_id=${
    process.env.REACT_APP_CLIENT_ID
  }&redirect_uri=${process.env.REACT_APP_ONE_ID_REDIRECT_URL}login&Scope=${process.env.REACT_APP_CLIENT_ID}&state=${AuthUrl}/login`

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const resolver = useYupValidationResolver(validationSchema)

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver,
  })

  const { updateUserActivatedMutation } = useUser()

  const onSubmit = async (data) => {
    const regex = new RegExp(/[a-zA-Z0-9]+/, 'g')
    if (!(data.username.replace(regex, '') || data.password.replace(regex, ''))) {
      setIsLoading(true)
      request
        .post(loginApiUrl, data)
        .then((res) => {
          if (res.status === 201) {
            updateUserActivatedMutation.mutate({ id: res.data.data.user.id })
            dispatch(setAuthCredentials(res.data.data))
            navigate('/' + routes.find((route) => permissions[res.data.data.role.id]?.includes(route.permission))?.path)
          }
        })
        .finally(() => setIsLoading(false))
    }
  }
  const oAuthOneId = () => {
    request.post(oneIdAuthBaseUrl).then((res) => {
      console.log('its here')
      dispatch(setAccessTokenOneId({ access_token: res.data.access_token }))
      request.post(oneIdTokenIdentifierUrl(res)).then(async (user) => {
        await request
          .post(`${AuthUrl}/login-by-one-id`, {
            passport_number: user.data.pport_no,
            pinfl: user.data.pin,
          })
          .then((res) => {
            if (res.status === 201) {
              updateUserActivatedMutation.mutate({ id: res.data.data.user.id })
              dispatch(setAuthCredentials(res.data.data))
              navigate(
                '/' + routes.find((route) => permissions[res.data.data.role.id]?.includes(route.permission))?.path
              )
            }
          })
      })
    })
  }

  useEffect(() => {
    if (query.get('code')) {
      oAuthOneId()
    }
  }, [query.get('code')])
  return (
    <div className={`${width < 769 ? 'w-[90%]' : 'w-[60%]'} h-full`}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-center">
        <h1 className={`font-[700] ${width < 769 ? 'text-[24px] mb-8' : 'text-[48px] mb-16'}`}>Tizimga kirish</h1>
        <span className="input-label">Login</span>
        <div className="relative">
          <Input placeholder="Loginni kiriting" widthFull register={register} name="username" errors={errors} />
        </div>
        <div className="relative">
          <span className={`input-label ${width < 769 ? 'mt-3' : 'mt-[24px]'}`}>Parol</span>
          <Input
            placeholder="Parolni kiriting"
            widthFull
            register={register}
            name="password"
            type={showPassword ? 'text' : 'password'}
            errors={errors}
          />

          <div className="absolute bottom-2 right-3 cursor-pointer" onClick={() => setShowPassword((p) => !p)}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
        <div className=" md:m-0 flex md:justify-end justify-center items-center">
          <Link to="?forgot-password=true" className="text-[#1A73E8] text-[14px] mt-3 float-rigth">
            Parolni unutdingizmi?
          </Link>
        </div>
        <BtnFiled
          rightIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
          color="blue"
          size="large"
          type="submit"
          className={`w-full ${width < 769 ? 'mt-6 py-3 px-0' : 'mt-[32px]'}`}
        >
          Davom etish
        </BtnFiled>
        <BtnOutlined
          leftIcon={false}
          onClick={() => {
            window.open(oneIdRedirectUrl, '_target')
          }}
          size="large"
          color="white"
          className="w-full mt-4"
        >
          ONE ID orqali kirish
        </BtnOutlined>
      </form>
    </div>
  )
}
