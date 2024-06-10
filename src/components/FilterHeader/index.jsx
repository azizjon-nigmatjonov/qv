export function FilterHeader({ rigthElements, leftElements }) {
  return (
    <div className="h-14 w-full bg-white border-b border-borderColor px-4 py-[10px] flex items-center justify-between">
      <div className="flex items-center">
        {leftElements?.map(
          (item, index) =>
            item && (
              <div className="mr-[12px]" key={index + '-l'}>
                {item}
              </div>
            )
        )}
      </div>
      <div className="flex items-center">
        {rigthElements?.map((element, index) => (
          <div className="ml-[12px]" key={index + '-r'}>
            {element}
          </div>
        ))}
      </div>
    </div>
  )
}
