export function MobileFilterHeader({ rigthElements, leftElements, title, className = 'items-center' }) {
  return (
    <>
      {!!title && (
        <div className="h-[48px] max-h-[48px] w-full font-bold bg-white px-4 py-[10px] flex items-center justify-between border-t shadow-[inset 0px 1px 0px #E5E9EB]">
          {title}
        </div>
      )}
      {!!leftElements?.length || !!rigthElements?.length ? (
        <div
          className={`h-[64px] max-h-[64px] w-full bg-white px-4 flex justify-between  ${
            !title ? 'shadow-[inset 0px 1px 0px #E5E9EB]' : ''
          } ${className}`}
        >
          <div className="flex items-center">
            {leftElements?.map((item, index) => (
              <div className="mr-[12px]" key={index + '-l'}>
                {item}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            {rigthElements?.map((element, index) => (
              <div className="ml-[12px]" key={index + '-r'}>
                {element}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
