import { createContext } from 'react'

export const ThirdStepContainer = ({ children, showThirdStep }) => (showThirdStep ? children : null)
export const FourthStepContainer = ({ children, showFourthStep }) => (showFourthStep ? children : null)

export const SliderContext = createContext({})

export const SliderContextProvider = ({ children, ...restProps }) => {
  return <SliderContext.Provider value={{ ...restProps }}>{children}</SliderContext.Provider>
}
