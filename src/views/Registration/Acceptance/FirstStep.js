import { RightArrowIcon } from '../../../assets/icons'
import { BtnFiled, Card, Input } from '../../../components'

const FirstStep = ({ register, scrollToNext }) => {
  return (
    <div className="w-full">
      <Card title={`Ariza beruvchi haqida ma'lumot`} className="w-1/2">
        <span className="input-label">Ism sharifi</span>
        <Input disabled widthFull register={register} name="full_name" />
        <span className="input-label mt-4">Pasport raqami va seriyasi</span>
        <Input disabled widthFull register={register} name="passport_number" />
        <span className="input-label mt-4">PINFL</span>
        <Input disabled widthFull register={register} name="pinfl" />
        <span className="input-label mt-4">Yashash manzili</span>
        <Input disabled widthFull register={register} name="address" />
        <span className="input-label mt-4">Telefon raqami</span>
        <Input disabled widthFull register={register} name="phone" />
        <span className="input-label mt-4">Elektron pochtasi</span>
        <Input disabled widthFull register={register} name="email" />
        <div className="flex justify-end mt-4">
          <BtnFiled rightIcon={<RightArrowIcon color="white" />} onClick={scrollToNext}>
            Keyingisi
          </BtnFiled>
        </div>
      </Card>
    </div>
  )
}

export default FirstStep
