import { InactiveUserSvg } from '../assets/icons'

const makeColUI = (array, filterKey) => {
  let items = []

  if (Array.isArray(filterKey)) {
    items = array?.filter((i) => i.role_id === filterKey[0] || i.role_id === filterKey[1])
  } else {
    items = array?.filter((i) => i.role_id === filterKey)
  }

  return (
    <div className="flex items-center gap-2">
      {items?.map((item) => (
        <div key={item.user_id}>
          <div>
            <p>{item?.user_name}</p>
            <a className="text-blue-500 cursor-pointer" href={`tel:${item?.phone}`}>
              {item?.phone}
            </a>
          </div>
          {!item?.is_activated && item?.user_name && (
            <span>
              <InactiveUserSvg />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default makeColUI
