import { RightArrowIcon } from '../../../../../assets/icons'
import { BtnFiled, Card } from '../../../../../components'
import { JuridicForm, PhysicalPersonForm } from '../../../../../components/StepperForms'
import { hoc } from '../../../../../utils/hoc'
import { useFirstStepProps } from './useFirstStepProps'

export const FirstStep = hoc(useFirstStepProps, ({ isJuridic, register, scrollToNext }) => {
  return (
    <div className="w-full">
      <Card title={`Ariza beruvchi haqida ma'lumot (${isJuridic ? 'Yuridik' : 'Jismoniy'} shaxs)`} className="w-1/2">
        {isJuridic ? <JuridicForm register={register} /> : <PhysicalPersonForm register={register} />}
        <div className="flex justify-end mt-4">
          <BtnFiled rightIcon={<RightArrowIcon color="white" />} onClick={scrollToNext}>
            Keyingisi
          </BtnFiled>
        </div>
      </Card>
    </div>
  )
})
