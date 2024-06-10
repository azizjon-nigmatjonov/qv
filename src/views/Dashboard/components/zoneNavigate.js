import { createSearchParams } from 'react-router-dom'

export function zoneNavigate({params, type}) {
  const search = `?${createSearchParams(params)}`

  if (params.districtId) {
    return {
      pathname: `${type}/${params.regionId}/${params.districtId}`,
      search,
    }
  }else if(params.regionId && !params.districtId){
    return {
      pathname: `${type}/${params.regionId}`,
      search,
    }
  }else{
    return {
      pathname: `${type}`,
      search,
    }
  }
}
