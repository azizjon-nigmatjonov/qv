import { useLocation, useParams } from 'react-router-dom'
import { Card, FileUpload, Input } from '../../../components'
import DescriptionIcon from '@mui/icons-material/Description'
import downloadItForMe from '../../../utils/downloadItForMe'
import CustomMuiDatePicker from '../../../components/CustomMuiDatePicker'

export function PaymentForm({
  register,
  setValue,
  document,
  control,
  disabled = false,
  title = 'To’lov ma`lumotlari',
  label1 = 'Summa',
  label2 = 'Sana',
  secondFieldType = 'date',
}) {
  const { id } = useParams()
  const { pathname } = useLocation()

  return (
    <div className="w-[50%]">
      <Card title={title}>
        <div className="gap-4">
          <span className="input-label col-span-4">{label1}</span>
          <div className="col-span-8">
            <Input widthFull name="amount" register={register} disabled={disabled} />
          </div>
          <span className="input-label mt-4">{label2}</span>
          {secondFieldType === 'date' ? (
            <CustomMuiDatePicker
              control={control}
              disableFuture
              widthFull
              type="date"
              name="date"
            />
          ) : (
            <Input widthFull name="name" register={register} disabled={disabled} />
          )}

          {
            //   document ?
            //   <>
            //     <span className="input-label mt-4">Fayl</span>
            //     <div className="col-span-12">
            //     {pathname.includes('add') ? (
            //       <FileUpload widthFull={true} setValue={setValue} nameFile="file" showSmallPreview />
            //     ) : (
            //       <div>
            //         {/* <FileUpload setValue={setValue} nameFile="file" showSmallPreview /> */}
            //         {document?.file && (
            //           <div
            //             className="flex items-center gap-2 cursor-pointer"
            //             onClick={() => downloadItForMe({ bucketName: 'files', expiresAt: 1, filename: document.file })}
            //           >
            //             <DescriptionIcon />
            //             <span className="text-sm">{`${document.file.slice(36)}`}</span>
            //           </div>
            //         )}
            //       </div>
            //     )}
            //   </div>
            //   </>
            // :
            //   <>
            //   <span className="input-label mt-4">Narxi</span>
            //   <div className="col-span-8">
            //     <Input widthFull name="name" register={register} disabled={disabled} />
            //   </div>
            //   </>
          }
        </div>
      </Card>
    </div>
  )
}
