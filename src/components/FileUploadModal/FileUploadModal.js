import { Close } from '@mui/icons-material'
import UploadIcon from '@mui/icons-material/Upload'
import toast from 'react-hot-toast'
import { request } from '../../services/http-client'
import { BtnFiled } from '../Buttons/BtnFilled'
import { CustomDatePicker } from '../CustomDatePicker'
import { Input } from '../Input'
import FileIcon from '../../assets/images/file-icon.png'
import fileDownloader from '../../utils/fileDownloader'
import { DownloadIcon } from '../../assets/icons'

export const FileUploadModal = ({
  register,
  title,
  open,
  fileNames = [],
  errors = {},
  date,
  setDate = () => {},
  onClose = () => {},
  setFileNames = () => {},
  onSuccess = () => {},
  onSubmit = () => {},
  handleSubmit = () => {},
}) => {
  const onFileUpload = (e) => {
    const isCurrentFileType = Array.from(e.target.files).every((file) => file.name.split('.').reverse()[0] === 'pdf')

    if (isCurrentFileType) {
      const files = []

      if (e.target.files.length > 0) {
        for (let i = 0; i < e.target.files.length; i++) {
          const formData = new FormData()
          formData.append('file', e.target.files[i])
          files.push(formData)
        }
        Promise.all(
          files.map((file) => {
            return request.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/upload-file`, file, {
              headers: {
                'Content-Type': 'mulpipart/form-data',
              },
            })
          })
        ).then((res) => {
          setFileNames(res.map((file) => file.data?.data.filename))
          onSuccess()
        })
      }
    } else {
      toast.error('Faqatgina PDF formatidagi file yuklash mumkin')
    }
  }

  return (
    open && (
      <div
        className="absolute top-0 left-0 w-full h-full flex justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <div
          className="absolute top-[80px] left-[calc(50% - 320px)] p-8 bg-white z-50 w-full max-w-[640px] rounded overflow-x-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: 'calc(100% - 100px)', paddingBottom: '2rem' }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }}
            style={{
              maxHeight: 'calc(100vh - 80px)',
            }}
          >
            <div className="flex items-start mb-7">
              <p className="font-bold text-2xl">{title}</p>
              <button onClick={onClose} className="border-none bg-transparent ml-auto">
                <Close color="disabled" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="h5 font-bold mb-3">Javobgarlikka tortilgan tashkilot</h3>
              <span className="input-label mb-1">Tashkilot nomi</span>
              <Input
                widthFull
                wrapperClassName="mb-3"
                name="organization_name"
                register={register}
                placeholder="Orient"
                required={true}
                errors={errors}
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1">Tashkilot STIRi</span>
              <Input
                widthFull
                name="organization_stir"
                register={register}
                placeholder="Tashkilot stirini kiriting"
                required={true}
                errors={errors}
                message="To'ldirilishi shart"
              />
            </div>
            <div className="mb-4">
              <h3 className="h5 font-bold mb-3">Javobgarlikka tortilgan shaxs</h3>
              <span className="input-label mb-1">F.I.Sh</span>
              <Input
                widthFull
                wrapperClassName="mb-3"
                name="fullname"
                register={register}
                placeholder="F.I.Shni kiriting"
                required={true}
                errors={errors}
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1">JShSHIR</span>
              <Input
                widthFull
                wrapperClassName="mb-3"
                name="jshir"
                register={register}
                placeholder="JShShIRni kiriting"
                required={true}
                errors={errors}
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1">Lavozimi</span>
              <Input
                widthFull
                name="position"
                register={register}
                placeholder="Lavozimini kiriting"
                required={true}
                message="To'ldirilishi shart"
              />
            </div>
            <div className="mb-4">
              <h3 className="h5 font-bold mb-3">Ma’muriy javobgarlik</h3>
              <div className="flex gap-x-4 mb-3">
                <div className="w-2/4">
                  <span className="input-label mb-1">MJTK moddasi</span>
                  <Input
                    widthFull
                    name="clause"
                    register={register}
                    placeholder="MJTK moddasi raqami"
                    required={true}
                    errors={errors}
                    message="To'ldirilishi shart"
                  />
                </div>
                <div className="w-2/4">
                  <span className="input-label mb-1">Moddasining bandi</span>
                  <Input
                    widthFull
                    name="clause_substance"
                    register={register}
                    placeholder="Moddasining bandini kiriting"
                    required={true}
                    errors={errors}
                    message="To'ldirilishi shart"
                  />
                </div>
              </div>
              <span className="input-label mb-1">Jarima miqdori</span>
              <Input
                widthFull
                wrapperClassName="mb-3"
                name="penalty"
                register={register}
                placeholder="Jarima miqdorini kiriting"
                required={true}
                errors={errors}
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1">Qo’llanilgan sana</span>
              <CustomDatePicker
                placeholder="Sanani tanlang"
                type="daypicker"
                maxDate={new Date()}
                date={date}
                setDate={setDate}
              />
            </div>

            <span className="input-label mb-1">Buyruq fayli</span>
            {fileNames.length > 0 ? (
              fileNames?.map((file, index) => {
                return (
                  <div className="flex items-center gap-x-2 bg-[#F4F6FA] p-2 rounded" key={index + file}>
                    <img src={FileIcon} alt="pdf file" width="30" height="40" />
                    <div className="flex justify-between grow items-center">
                      <p className="flex flex-col">
                        <b className="text-sm font-normal">{file.slice(36)}</b>
                      </p>
                      <span
                        onClick={() => fileDownloader(file)}
                        className="inline-block rounded-lg border p-1 bg-white cursor-pointer"
                      >
                        <DownloadIcon />
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <>
                <div className="relative w-full rounded border border-dashed p-7">
                  <div className="flex flex-col justify-center items-center">
                    <UploadIcon color="disabled" />
                    <p className="mt-2">Drag and drop files here</p>
                  </div>
                  <input
                    widthFull
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    type="file"
                    draggable
                    multiple={true}
                    onInput={(e) => {
                      onFileUpload(e)
                    }}
                    onChange={(e) => {
                      onFileUpload(e)
                    }}
                    onDrop={(e) => {
                      onFileUpload(e)
                    }}
                    {...register('document', { required: true })}
                  />
                  <div className="text-center mt-4">
                    <span className="inline-block border rounded-md cursor-pointer" style={{ padding: '4px 12px' }}>
                      Browse
                    </span>
                  </div>
                </div>
                {errors?.document && <p className="text-red-600">Fayl yuklash shart</p>}
              </>
            )}
            <div className="min-h-[80px]">
              <BtnFiled className="w-full mt-4" type="submit" children="Davom etish" size="large" />
            </div>
          </form>
        </div>
      </div>
    )
  )
}
