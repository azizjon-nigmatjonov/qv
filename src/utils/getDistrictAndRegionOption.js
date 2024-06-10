import { useDistrict, useRegion } from '../services'

export const useGetDistrictAndRegionOption = ({ regionsEnabled = true, regionIdForDistrict }) => {
  const { regions } = useRegion({
    limit: 15,
    regionsParams: {
      limit: 15,
    },
    regionProps: {
      enabled: regionsEnabled,
      select: (data) => {
        return data?.regions?.map((region) => ({
          label: region?.uz_name,
          value: region?.id,
        }))
      },
    },
  })

  const { districts } = useDistrict({
    regionId: regionIdForDistrict,
    districtsProps: {
      select: (data) => {
        return data?.districts?.map((district) => ({
          label: district.uz_name,
          value: district.id,
        }))
      },
    },
  })

  return {
    regions,
    districts,
  }
}
