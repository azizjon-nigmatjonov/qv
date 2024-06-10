import { Card, Input } from '../../components'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { BOSH_PRORAB_ROLE_ID } from '../../settings/constants'

export function BlocksForm({ fields, register, roleId, append, remove, disabled = false }) {
  return (
    <Card title="Bloklar" className="mt-4" bodyClassName="flex flex-col gap-4">
      {fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div className="grid grid-cols-12 gap-2 items-end" key={field.id}>
              <span className="col-span-3 input-label font-bold">№ {index + 1}</span>
              <div className="col-span-9 flex items-center">
                <div className="w-full">
                  {field?.is_send && <span className="text-[#119C2B] text-sm">Foydalanishga topshirilgan</span>}
                  <Input widthFull register={register} name={`blocks.${index}.name`} disabled={disabled} />
                </div>
                {roleId === BOSH_PRORAB_ROLE_ID && (
                  <div
                    className={`min-w-[40px] ml-4 h-[40px] border border-borderColor rounded-[6px] flex justify-center items-center hover:bg-gray-100 cursor-pointer ${
                      disabled ? 'cursor-not-allowed' : ''
                    }`}
                    onClick={() => {
                      if (!disabled) remove(index)
                    }}
                  >
                    <DeleteOutlineOutlinedIcon className="text-red-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {roleId === BOSH_PRORAB_ROLE_ID && (
        <div
          onClick={() => {
            if (!disabled)
              append({
                name: '',
                number: fields.length + 1,
              })
          }}
          className={`text-primary text-center border hover:bg-gray-100 cursor-pointer border-dashed py-[8px] rounded-[6px] w-full border-primary text-[14px] font-[400] ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
        >
          <AddCircleOutlinedIcon className="text-priamry mr-2" />
          Blok qo’shish
        </div>
      )}
    </Card>
  )
}
