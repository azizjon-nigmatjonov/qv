import { DownloadIcon } from '../../assets/icons'
import { FileView } from '../FileView/FileView'
import { Input } from '../Input'

export const FormObjectInfo = ({ register, files, taskId, passportLink, comment, showComment }) => {
  // console.log(passportLink())
  return (
    <>
      <span className="input-label">Kadastr raqami</span>
      <Input disabled widthFull register={register} name="cadastral_number" />
      <span className="input-label mt-4">Obyekt turi</span>
      <Input disabled widthFull register={register} name="type_object" />
      <span className="input-label mt-4">Bino turi</span>
      <Input disabled widthFull register={register} name="build_type" />
      <span className="input-label mt-4">Binoning loyiha hujjatiga ko’ra nomi</span>
      <Input disabled widthFull register={register} name="build_document_name" />
      <span className="input-label mt-4">Bino va inshootlarning manzili</span>
      <Input disabled widthFull register={register} name="building_address" />
      <span className="input-label mt-4">Viloyat</span>
      <Input disabled widthFull register={register} name="region" />
      <span className="input-label mt-4">Tuman (Shahar)</span>
      <Input disabled widthFull register={register} name="district" />
      <span className="input-label mt-4">Obyektning loyihasi</span>
      <FileView
        taskId={taskId}
        fileName={files?.objectProject}
        placeholder="File"
        style={{ border: '1px solid #E5E9EB' }}
      />
      <span className="input-label mt-4">
        Tuman (shahar) hokimining yer uchastkasi ajratish to‘g‘risidagi qarorining raqami va sanasi (dastlabki qurilish
        bilan)
      </span>
      <Input disabled widthFull register={register} name="number_date_resignation_district_hokim" />
      <span className="input-label mt-4">Ro‘yxatdan o‘tish asoslangan hujjat turi</span>
      <FileView
        taskId={taskId}
        fileName={files?.registrationDocumentType}
        placeholder="File"
        style={{ border: '1px solid #E5E9EB' }}
      />
      <span className="input-label mt-4">Loyihalashtirish tashkilotining STIRi</span>
      <Input disabled widthFull register={register} name="tin_project_organization" />
      <span className="input-label mt-4">Obyekt pasporti</span>
      {/* <Input disabled widthFull register={register} name="ind_passport" /> */}
      <a
        className="cursor-pointer border hover:border-primary focus-within:border-primary  border-borderColor flex items-center h-[40px] transition-all duration-500 rounded-md overflow-hidden px-4 w-full bg-[#F4F6FA]"
        href={passportLink}
        target="_blank"
        rel="noreferrer"
      >
        <span className="flex items-center grow justify-between">
          <span>Yuklab olish</span>
          <DownloadIcon />
        </span>
      </a>
      <span className="input-label mt-4">
        Pudrat tashkiloti va buyurtmachi o‘rtasida imzolangan, qurilishi tugallangan obyektni topshirish-qabul qilish
        dalolatnomasi
      </span>
      <FileView
        taskId={taskId}
        fileName={files?.signaturedFile}
        placeholder="File"
        style={{ border: '1px solid #E5E9EB' }}
      />
      <span className="input-label mt-4">Pudrat tashkiloti tomonidan berilgan muvofiqlik deklaratsiyasi</span>
      <FileView taskId={taskId} fileName={files?.declarationFile} style={{ border: '1px solid #E5E9EB' }} />
      <span className="input-label mt-4">
        Mualliflik va texnik nazoratni amalga oshiruvchi mutaxassis tomonidan berilgan bajarilgan qurilish-montaj
        ishlarining tasdiqlangan shaharsozlik hujjatlariga muvofiqligi to‘g‘risidagi xulosasi
      </span>
      <FileView taskId={taskId} fileName={files?.checkedConclusion} style={{ border: '1px solid #E5E9EB' }} />
      {comment && showComment && (
        <>
          <span className="input-label mt-4">Operator xulosasi</span>
          <Input disabled widthFull register={register} value={comment} />
        </>
      )}
    </>
  )
}
