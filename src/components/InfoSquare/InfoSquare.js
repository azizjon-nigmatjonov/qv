export const InfoSquare = ({ title1, subtitle1, title2, subtitle2, withLink = true, className }) => {
  return (
    <div
      className={`border p-3 w-[500px] shrink-0 transition-all border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6] ${className}`}
    >
      <div className="flex justify-between">
        <span className="text-gray-600">{title1}</span>
        <span className="text-gray-600">{title2}</span>
      </div>
      <div className="flex justify-between">
        <h4 className="text-black">{subtitle1}</h4>
        {withLink ? (
          <a className="text-[#0E73F6]" href={`tel:${subtitle2}`}>
            {subtitle2}
          </a>
        ) : (
          <span className="text-[#0E73F6]">{subtitle2}</span>
        )}
      </div>
    </div>
  )
}
