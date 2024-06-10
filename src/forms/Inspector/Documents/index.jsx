import { useLocation, useParams } from 'react-router-dom'
import { Card, FileUpload, Input } from '../../../components'
import DescriptionIcon from '@mui/icons-material/Description'
import downloadItForMe from '../../../utils/downloadItForMe'

export function DocumentsForm({ register, setValue, document, disabled = false }) {
  const { pathname } = useLocation()

  return (
    <div className="w-[50%]">
      <Card title="Hujjat">
        <div className="grid grid-cols-12 items-center gap-4">
          <span className="input-label col-span-4">Nomi</span>
          <div className="col-span-8">
            <Input widthFull name="name" register={register} disabled={disabled} />
          </div>
          <span className="input-label col-span-4">Izoh</span>
          <div className="col-span-8">
            <Input widthFull name="description" register={register} disabled={disabled} />
          </div>
          <span className="input-label col-span-4">Fayl</span>
          <div className="col-span-8">
            {pathname.includes('add') ? (
              <FileUpload setValue={setValue} nameFile="file" showSmallPreview />
            ) : (
              <div>
                {/* <FileUpload setValue={setValue} nameFile="file" showSmallPreview /> */}
                {document?.file && (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => downloadItForMe({ bucketName: 'files', expiresAt: 1, filename: document.file })}
                  >
                    <DescriptionIcon />
                    <span className="text-sm">{`${document.file.slice(36)}`}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
