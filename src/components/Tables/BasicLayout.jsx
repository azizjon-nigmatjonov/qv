export function BasicLayout({ children, className = '', rightElement, title = '', header, footer }) {
  return (
    <div className="bg-white rounded-[6px] flex flex-col justify-between">
      <div className="grow">
        {title && (
          <div className="px-4 py-3 text-[18px] font-[600] border-b border-borderColor flex justify-between items-center">
            {title}
            {rightElement}
          </div>
        )}
        {header}
        {children && (
          <div className={`p-4 ${className} `}>
            <div>{children}</div>
          </div>
        )}
      </div>
      {footer && <div className="p-[10px] border-t border-borderColor">{footer}</div>}
    </div>
  )
}
