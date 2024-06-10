import { CircularProgress } from '@mui/material'

export function BtnFiled({
  children,
  size = 'small',
  color = 'blue',
  leftIcon,
  isLoading = false,
  rightIcon,
  type = 'button',
  className = '',
  disabled = false,
  ...restProps
}) {
  const colors = {
    yellow: 'bg-[#F8C51B]',
    blue: 'text-white bg-primary',
    red: 'bg-[#F76659] text-white',
    white: 'bg-white text-primary',
  }

  const getSize = (key) => {
    switch (key) {
      case 'small':
        return 'h-[36px] px-3 py-[6px] text-[14px] font-[500] rounded-[6px]'
      case 'large':
        return 'h-[48px] px-[110px] text-[16px] font-[600] rounded-[8px] py-[14px]'
      default:
        return 'h-[36px] px-3 py-[6px] text-[14px] font-[500] rounded-[6px]'
    }
  }

  return (
    <button
      {...restProps}
      className={`transition-all ${getSize(size)} ${
        colors[color]
      } focus:outline-none flex items-center justify-center ${
        disabled ? 'cursor-not-allowed bg-gray-300' : 'hover:opacity-80'
      } ${className}`}
      type={type}
      disabled={disabled}
    >
      {!!leftIcon && <span className={leftIcon ? 'mr-[10px]' : ' '}>{leftIcon}</span>}
      {children}
      {!!rightIcon && <span className={rightIcon ? 'ml-[10px] mt-1.5' : ' '}>{rightIcon}</span>}
      {isLoading && (
        <div className="ml-3 mt-1">
          <CircularProgress color="inherit" size={20} />
        </div>
      )}
    </button>
  )
}
