import { Input } from '../Input'

export const JuridicForm = ({ register }) => {
  return (
    <>
      <span className="input-label">Tashkilot nomi</span>
      <Input disabled widthFull register={register} name="organization_name" />
      <span className="input-label mt-4">STIR</span>
      <Input disabled widthFull register={register} name="stir" />
      {/* <span className="input-label mt-4">Tashkiliy-huquqiy shakli</span> */}
      {/* not clear field */}
      {/* <Input disabled widthFull register={register} name="legal_opf" /> */}
      <span className="input-label mt-4">Yuridik manzili</span>
      <Input disabled widthFull register={register} name="legal_entity_address" />
      <span className="input-label mt-4">Yuridik shaxsning telefon raqami</span>
      <Input disabled widthFull register={register} name="legal_entity_phone_number" />
      <span className="input-label mt-4">Yuridik shaxsning elektron pochtasi</span>
      <Input disabled widthFull register={register} name="legal_entity_email" />
    </>
  )
}

export const PhysicalPersonForm = ({ register }) => {
  return (
    <>
      <span className="input-label">FIO</span>
      <Input disabled widthFull register={register} name="full_name" />
      <span className="input-label mt-4">Pasport seriyasi</span>
      <Input disabled widthFull register={register} name="passport_number" />
      <span className="input-label mt-4">PINFL</span>
      <Input disabled widthFull register={register} name="ind_pinfl" />
      <span className="input-label mt-4">Yashash manzili</span>
      <Input disabled widthFull register={register} name="permit_address" />
      <span className="input-label mt-4">Telefon raqami</span>
      <Input disabled widthFull register={register} name="phone" />
      <span className="input-label mt-4">Elektron pochtasi</span>
      <Input disabled widthFull register={register} name="email" />
    </>
  )
}
