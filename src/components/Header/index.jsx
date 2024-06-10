import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { NavLink, useNavigate } from 'react-router-dom'

export function Header({ title = 'Obyektlar', titleLength = 80, backLink, centerElement, rightElement }) {
  const navigate = useNavigate()
  return (
    <div className="h-14 w-full bg-white border-b border-borderColor p-4 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-[18px] leading-[24px] font-[600] text-black flex items-center">
          {backLink && backLink !== -1 && (
            <NavLink to={backLink}>
              <ArrowBackIcon className="mr-3 cursor-pointer text-[15px]" />
            </NavLink>
          )}
          {backLink === -1 && (
            <span onClick={() => navigate(-1)}>
              <ArrowBackIcon className="mr-3 cursor-pointer text-[15px]" />
            </span>
          )}
          {title.length > titleLength ? `${title.slice(0, titleLength)}...` : title}
          {centerElement && <div className="w-[1px] bg-[#E5E9EB] h-[24px] ml-[15px]" />}
        </span>
        {centerElement && <div className="ml-[20px]">{centerElement}</div>}
      </div>
      {rightElement}
    </div>
  )
}
