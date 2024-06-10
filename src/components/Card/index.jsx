export function Card({
  headerClassName = 'justify-between',
  title = '',
  bodyClassName = '',
  children,
  rightElement,
  className = '',
  footer,
  ...rest
}) {
  return (
    <div className={`bg-white rounded-[6px] overflow-hidden ${className}`} {...rest}>
      <div className={`${headerClassName} py-[14px] px-4 text-[18px] font-semibold border-b border-borderColor flex `}>
        {title && <div className="flex items-center text-[16px] sm:text-[18px]">{title}</div>}
        <div>{rightElement}</div>
      </div>
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
      {footer}
    </div>
  )
}
