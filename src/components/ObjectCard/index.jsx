import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

export function ObjectCard({ columns = 4, content, icon, title, className, data = {}, params, type }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const cardList = Object.keys(content || [])
    .sort((a, b) => content[a].order - content[b].order)
    .map((item) => {
      return {
        label: item,
        key: item,
        // .split('_')
        // .map((item) => item.at(0).toUpperCase() + item.slice(1))
        // .join(''),
      }
    })

  return (
    <div className={`p-3 bg-white flex flex-col rounded-[8px] grow ${className}`}>
      <div className="flex gap-2 items-center">
        {icon}
        <span className="text-[14px] font-[600]">{title}</span>
      </div>
      <div className="flex justify-between flex-1 gap-3 mt-3">
        {
          <>
            {cardList.map(
              (item, index, row) =>
                !!content?.[item.label] && (
                  <div
                    className={`p-2 flex-1 rounded-[8px] flex flex-col cursor-pointer ${
                      content?.[item.label]?.bg_color
                    }`}
                    style={
                      !content?.[item.label]?.bg_color
                        ? { backgroundColor: 'rgba(248, 221, 78, 0.25)' }
                        : { backgroundColor: '' }
                    }
                    key={index}
                    onClick={() => {
                      if (data[item.label] && item.key !== 're_formalized_object') {
                        navigate({
                          pathname: `objects/${type}${!!searchParams.get('districtId') ? '/list' : ''}`,
                          search: `?${createSearchParams({ ...params, status: item.key })}`,
                        })
                      } else {
                        navigate({
                          pathname: `objects/objects${!!searchParams.get('districtId') ? '/list' : ''}`,
                          search: `?${createSearchParams({ ...params, status: 'count' })}`,
                        })
                      }
                      // else {
                      //   let key = ''
                      //   if (type === 'monitorings' && item.key === 'done') {
                      //     key = 'Transferred'
                      //   } else if (type === 'monitorings' && item.key === 'delayed') {
                      //     key = 'DelayedCount'
                      //   } else if (type === 'regulations' && item.key === 'in_progress') {
                      //     key = 'ClosedCount'
                      //   } else if (type === 'regulations' && item.key === 'completed') {
                      //     key = 'ActiveCount'
                      //   } else if (type === 'regulations' && item.key === 'delayed_not_completed') {
                      //     key = 'DelayedCount'
                      //   }else if (type === 'regulations' && item.key === 'delayed_completed') {
                      //     key = 'LateClosedCount'
                      //   }else if (type === 'violations' && item.key === 'determined') {
                      //     key = 'Count'
                      //   }else if (type === 'violations' && item.key === 'fixed') {
                      //     key = 'ComplatedCount'
                      //   } else if (type === 'violations' && item.key === 'delayed') {
                      //     key = 'DelayedCount'
                      //   }  else {
                      //     key = item.key
                      //       .split('_')
                      //       .map((item) => item.at(0).toUpperCase() + item.slice(1))
                      //       .join('')
                      //   }
                      //   let typeUpper = type.charAt(0).toUpperCase() + type.slice(1)
                      //   navigate({
                      //     pathname: `object/${typeUpper}${key}`,
                      //     search: `?${createSearchParams(params)}`,
                      //   })
                      // }
                    }}
                  >
                    <p className="text-[14px] mb-1 leading-[24px]">{content?.[item.label]?.text}</p>
                    <p className={`text-[20px] font-medium mt-auto ${content?.[item.label]?.color}`}>
                      {data[item.label] || 0}
                    </p>
                  </div>
                )
            )}
          </>
        }
      </div>
    </div>
  )
}
