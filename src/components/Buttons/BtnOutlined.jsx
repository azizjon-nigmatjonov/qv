import { CancelIcon } from '../../assets/icons'

export function BtnOutlined({
  children,
  size = 'small',
  leftIcon = <CancelIcon />,
  rightIcon,
  color = 'black',
  className = '',
  type = 'button',
  ...restProps
}) {
  const colors = {
    black: 'text-[#303940]',
    red: 'text-[#F76659]',
    green: 'text-[#1AC19D]',
    blue: 'text-primary',
  }
  const getSize = (key) => {
    switch (key) {
      case 'small':
        return 'h-[36px] px-3 py-[6px] text-[14px] font-[500] rounded-[6px] hover:bg-gray-100'
      case 'large':
        return 'h-[48px] px-[110px] text-[16px] font-[600] rounded-[8px] py-[14px] hover:bg-gray-100'
      default:
        return 'h-[36px] px-3 py-[6px] text-[14px] font-[500] rounded-[6px] hover:bg-gray-100'
    }
  }

  return (
    <button
      type={type}
      {...restProps}
      className={`transition-all ${getSize(size)} ${
        colors[color]
      } border border-borderColor flex items-center justify-center ${className}`}
    >
      <span className={leftIcon ? 'mr-[12px]' : ' '}>{leftIcon}</span>
      {children}
      <span className={rightIcon ? 'ml-[12px]' : ' '}>{rightIcon}</span>
    </button>
  )
}
