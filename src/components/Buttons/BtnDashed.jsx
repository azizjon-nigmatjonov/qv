export default function BtnDashed({ leftIcon, rightIcon, children, type = 'button', ...restProps }) {
  return (
    <button
      className="rounded-md border border-dashed px-[34px] py-[7px] border-[#0E73F6] text-[#0E73F6] text-sm leading-6"
      type={type}
      {...restProps}
    >
      {leftIcon && <span className="mr-[10px]">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-[10px]">{rightIcon}</span>}
    </button>
  )
}
