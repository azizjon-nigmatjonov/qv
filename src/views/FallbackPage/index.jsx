import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import { useDispatch, useSelector } from 'react-redux'
import { LeftFromSystemIcon } from '../../assets/icons'
import { BtnFiled } from '../../components'
import { logout } from '../../redux/actions/authActions'
import { permissions } from '../../settings/permissions'

const FallbackPage = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)

  return (
    <div className="w-full h-full bg-[#f1f1f1] p-4">
      <div className="h-full bg-white flex justify-center items-center rounded-md">
        <div className="text-center ">
          <span className="text-[140px]">
            <GppMaybeIcon htmlColor="#FFC23C" fontSize="inherit" />
          </span>
          <p className="text-[36px] font-semibold leading-[56px] mb-5">Sahifani ko'rishga ruxsatingiz yo'q</p>
          <BtnFiled
            className="mx-auto"
            color="red"
            leftIcon={<LeftFromSystemIcon />}
            type="button"
            onClick={() => dispatch(logout())}
          >
            Tizimdan chiqish
          </BtnFiled>
        </div>
      </div>
    </div>
  )
}

export default FallbackPage
