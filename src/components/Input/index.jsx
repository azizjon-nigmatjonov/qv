import { CalendarIcon } from '../../assets/icons'

export function Input({
  showRequired = false,
  withBorder = true,
  addonBefore,
  widthFull = false,
  heightFull = false,
  addonAfter,
  className = '',
  wrapperClassName = '',
  placeholder = '',
  type = 'text',
  height = 40,
  name = 'input',
  required = false,
  register = () => {},
  disabled = false,
  initialErrorMessageMinHeigth = false,
  errors,
  message = '',
  ...restProps
}) {
  const heightValue = 'h-[' + height + 'px]'
  return (
    <>
      <div
        className={` ${
          withBorder ? 'border hover:border-primary focus-within:border-primary  border-borderColor' : 'border-none'
        }   ${
          type === 'date' ? 'relative' : ''
        } flex items-center ${heightValue} transition-all duration-500 rounded-md overflow-hidden  ${
          widthFull ? 'w-full' : 'w-[240px]'
        } ${disabled ? 'bg-[#F4F6FA]' : ''} ${
          showRequired || (errors && errors[name]) ? 'border-red-400' : ''
        } ${className} ${wrapperClassName}`}
        style={{ height: heightFull ? '100%' : '' }}
      >
        <span className={addonBefore ? 'ml-2 mr-0.5' : ''}>{addonBefore}</span>
        <input
          {...register(name, { required: message })}
          {...restProps}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onWheel={(e) => e.target.blur()}
          className={`text-sm leading-6 text-[#303940] outline-0 h-full px-4 py-[8px] w-full ${className}`}
        />
        <div
          className={`${addonAfter || type === 'date' ? 'mr-2 border-l flex align-middle items-center pl-2 h-full leading-[38px] text-gray-500' : ''}`}
        >
          {addonAfter} {type === 'date' && <CalendarIcon className="mt-2" />}
        </div>
      </div>

      <div
        className={`text-red-600 transition-all text-[12px] ${initialErrorMessageMinHeigth ? 'min-h-[18px]' : ''}`}
        style={{ height: errors && errors[name] ? 18 : 0 }}
      >
        {errors && errors[name] ? errors[name].message : ''}
      </div>

      {showRequired && <div className="text-sm mt-1 text-red-400">To'ldirilishi shart</div>}
    </>
  )
}
