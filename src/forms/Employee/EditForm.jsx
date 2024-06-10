import { Card, Input } from '../../components'

const EditForm = ({ register }) => {
  return (
    <div>
      <Card title="Shaxsiy malumotlar">
        <span className="input-label mb-1 mt-4">PINFL</span>
        <Input widthFull register={register} name="pinfl" disabled />
        <span className="input-label mb-1 mt-4">F.I.SH</span>
        <Input widthFull register={register} name="fish" disabled />
        <span className="input-label mb-1 mt-4">INPS</span>
        <Input widthFull register={register} name="nps" disabled />
        <span className="input-label mb-1 mt-4">Passport raqami</span>
        <Input widthFull register={register} name="passport_number" disabled />
        <span className="input-label mb-1 mt-4">Telefon raqami</span>
        <Input widthFull register={register} name="phone_number" disabled />
        <span className="input-label mb-1 mt-4">Diplom nusxasi</span>
        <Input widthFull register={register} name="diplom" disabled />
        <span className="input-label mt-4">Obyektivka</span>
        <Input widthFull register={register} name="objective" disabled />
      </Card>
    </div>
  )
}

export default EditForm
