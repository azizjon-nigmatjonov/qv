import { YMaps, Map, Placemark } from 'react-yandex-maps'

const CustomMap = ({ location }) => {
  return (
    <div className="rounded-[12px] overflow-hidden relative h-[320px]">
      <YMaps query={{ apikey: '4393edfc-023c-40eb-b5c9-28bca77b227c', lang: 'ru_RU', load: 'package.full' }} style={{ width: '100%' }}>
        <Map
          width="100%"
          height="100%"
          state={{
            center: location && location.length > 0 ? location : [41.311151, 69.279737],
            zoom: 12,
            duration: 1000,
            timingFunction: 'ease-in',
            behaviors: ['default', 'scrollZoom'],
          }}
        >
          {location && location.length > 0 && <Placemark geometry={location} />}
        </Map>
      </YMaps>
    </div>
  )
}

export default CustomMap
