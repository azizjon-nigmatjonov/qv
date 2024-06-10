import { useContext } from 'react'
import { SliderContext } from '../../../OperatorContainers'

export const useFirstStepProps = () => {
  const { isJuridic, register, scrollToNext } = useContext(SliderContext)
  return {
    isJuridic,
    register,
    scrollToNext,
  }
}
