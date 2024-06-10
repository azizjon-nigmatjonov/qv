export function Textarea({
  widthFull = false,
  heightFull = false,
  className = '',
  placeholder = '',
  name = 'textarea',
  required = false,
  register = () => {},
  disabled = false,
  errors,
  ...restProps
}) {
  return (
    <>
      <div
        className={`border flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary overflow-hidden  ${
          widthFull ? 'w-full' : 'w-[240px]'
        } ${heightFull ? 'h-full' : ''} ${disabled ? 'bg-[#F4F6FA]' : ''} ${
          errors && errors[name] ? 'border-red-400' : ''
        }`}
      >
        <textarea
          {...restProps}
          disabled={disabled}
          {...register(name, { required })}
          placeholder={placeholder}
          className={`${className} text-[14px] leading-[24px] text-[#303940] outline-0 h-full py-[6px] px-[16px] w-full`}
        />
      </div>

      <div className="text-red-500 transition-all text-xs mt-1" style={{ height: errors && errors[name] ? 18 : 0 }}>
        {errors && errors[name] ? errors[name].message : ''}
      </div>
    </>
  )
}
