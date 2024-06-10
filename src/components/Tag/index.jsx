export function Tag({ className = '', value = '', color = '', onClick, rounded = 'normal' }) {
  const colors = {
    yellow: 'text-yellow-tag_text_color bg-yellow-tag_bg_color',
    blue: 'text-blue-tag_text_color bg-blue-tag_bg_color',
    green: 'text-green-tag_text_color bg-green-tag_bg_color',
    red: 'text-red-tag_text_color bg-red-tag_bg_color',
    gray: 'text-gray-600 bg-gray-100',
    purple: 'text-purple-700 bg-purple-200',
  }

  const radius = {
    big: 'rounded-[36px]',
    normal: 'rounded-[16px]',
  }

  const getUserName = (name) => {
    if (value?.toLowerCase()?.includes('loyihachi') || value?.toLowerCase()?.includes('mualliflik'))
      return 'M. nazoratchi'
    else if (value?.toLowerCase()?.includes('ichki')) return 'I. nazoratchi'
    else if (value?.toLowerCase()?.includes('texnik')) return 'T. nazoratchi'
    else return name
  }

  return (
    <div
      onClick={onClick}
      className={`h-[28px] ${colors[color]} text-[14px] font-[500] whitespace-nowrap leading-[24px] flex justify-center items-center px-4 ${radius[rounded]} ${className}`}
    >
      {typeof value === 'string' ? getUserName(value) : value}
    </div>
  )
}
