import { Card, Input } from '../../components'

export default function AdditionalInfoForm({ register }) {
  return (
    <Card title="Qo'shimcha ma'lumot" className='mt-4'>
      <div className='mb-4'>
        <span className='input-label'>Qurilish hajmi</span>
        <Input
          disabled
          register={register}
          name='capacity'
          widthFull
          placeholder='ELITE MAX BUILDING LTD'
        />
      </div>
      <div className='mb-4'>
        <span className='input-label'>Konstruksiya turi</span>
        <Input
          disabled
          register={register}
          name='construction_type'
          widthFull
          placeholder='ELITE MAX BUILDING LTD'
        />
      </div>
      <div className='mb-4'>
        <span className='input-label'>Qavatlar soni</span>
        <Input
          disabled
          register={register}
          name='floors'
          widthFull
          placeholder='6'
        />
      </div>
      <div className='mb-4'>
        <span className='input-label'>Poydevor konstruksiyasi </span>
        <Input
          disabled
          register={register}
          name='fundament'
          widthFull
          placeholder='6'
        />
      </div>
      <div className='mb-4'>
        <span className='input-label'>Qavat ijrosi</span>
        <Input
          disabled
          register={register}
          name='floor_ijro'
          widthFull
          placeholder='6'
        />
      </div>
      <div className='mb-4'>
        <span className='input-label'>Bazalarni bajarish</span>
        <Input
          disabled
          register={register}
          name='baza'
          widthFull
          placeholder='6'
        />
      </div>
      <div>
        <span className='input-label'>Devor ijrosi</span>
        <Input
          disabled
          register={register}
          name='devor'
          widthFull
          placeholder='6'
        />
      </div>
    </Card>
  )
}
