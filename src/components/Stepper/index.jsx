import DoneOutlined from '@mui/icons-material/DoneOutlined'
import { useEffect, useState } from 'react'

const Stepper = ({ steps, scrollToEl, current }) => {
  const [activeStep, setActiveStep] = useState(current)
  const handleClick = (id) => {
    scrollToEl(id)
    setActiveStep(id)
  }
  useEffect(() => {
    setActiveStep(current)
  }, [current])

  return (
    <div className="flex justify-between items-center gap-4">
      {steps.map((step, index) => {
        const lastEl = index === steps.length - 1
        const active = step.id === current
        const passed = current > step.id

        return (
          <div className={`flex items-center ${lastEl ? 'justify-end' : 'grow'}`} key={step.id}>
            <div>
              <div
                onClick={() => (passed || step.id === current) && handleClick(step.id)}
                className={`cursor-pointer border-2 rounded-full w-10 h-10 mx-auto hover:scale-110 duration-300 ${
                  activeStep === step.id || (active && activeStep === step.id)
                    ? 'border-[#0067F4]'
                    : passed || active
                    ? 'border-[#22C348]'
                    : 'border-[#6E8BB780]'
                }`}
                // onClick={() => scrollToEl(step.id)}
              >
                <span
                  className={`border-2 border-white rounded-full text-white w-full h-full flex justify-center items-center text-base leading-4 font-semibold duration-300 ${
                    activeStep === step.id || (active && activeStep === step.id)
                      ? 'bg-[#0067F4]'
                      : passed || active
                      ? 'bg-[#22C348]'
                      : 'bg-[#6E8BB780]'
                  }`}
                >
                  {activeStep === step.id ? step.id : passed || active ? <DoneOutlined /> : step.id}
                </span>
              </div>
              <p
                className={`font-sm leading-4 font-medium mt-4 text-center duration-300 ${
                  activeStep === step.id || (active && activeStep === step.id)
                    ? 'text-[#0067F4]'
                    : passed || active
                    ? 'text-[#22C348]'
                    : 'text-[#6E8BB780]'
                }`}
              >
                {step.text}
              </p>
            </div>
            {!lastEl && <div className="w-16 grow h-px bg-[#0000001a]"></div>}
          </div>
        )
      })}
    </div>
  )
}

export default Stepper
