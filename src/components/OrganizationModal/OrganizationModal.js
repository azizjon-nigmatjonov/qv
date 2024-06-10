import { Close } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { CalendarIcon } from '../../assets/icons'
import { BtnFiled } from '../Buttons/BtnFilled'
import { CustomDatePicker } from '../CustomDatePicker'
import CustomMuiDatePicker from '../CustomMuiDatePicker'
import { Input } from '../Input'

export const OrganizationModal = ({
  isOpen,
  handleClose,
  handleSubmit,
  isTechnique,
  isMuallif,
  register,
  errors,
  control,
  setCertificateDate,
  setOrderDate,
  setCustomerCerDate,
  setStartDate,
  setFinishedDate,
}) => {
  return (
    isOpen && (
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <form
          className="bg-white p-4 overflow-x-hidden rounded-[6px]"
          onSubmit={handleSubmit}
          style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
          <div className="flex items-start mb-7">
            {/* <p className="font-bold text-2xl">{title}</p> */}
            <button onClick={handleClose} className="border-none bg-transparent ml-auto">
              <Close color="disabled" />
            </button>
          </div>
          {isTechnique || isMuallif ? (
            <>
              <span className="input-label mb-1 mt-4">
                {isTechnique ? 'Texnik' : 'Mualliflik'} nazoratchining sertifikat sanasi
              </span>
              <CustomMuiDatePicker
                placeholder="Sanani tanlang"
                maxDate={new Date()}
                control={control}
                name="certificate_date"
                customOnChange={(e) => setCertificateDate(e)}
              />
              <span className="input-label mb-1 mt-4">
                {isTechnique ? 'Buyurtmachi' : 'Loyihachi'} tashkilot rahbarining FIO
              </span>
              <Input
                widthFull
                wrapperClassName="mb-3"
                name="director_name"
                register={register}
                placeholder="Tashkilot rahbarining FIOsini kiriting"
                required={isTechnique || isMuallif}
                errors={errors}
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1 mt-4">
                {isTechnique ? 'Buyurtmachi' : 'Loyihachi'} tashkilotning Yuridik manzili
              </span>
              <Input
                widthFull
                name="address"
                register={register}
                placeholder="Tashkilotning yuridik manzilini kiriting"
                required={isTechnique || isMuallif}
                errors={errors}
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1 mt-4">Buyruq/shartnoma raqami</span>
              <Input
                widthFull
                wrapperClassName="mb-3"
                name="order_num"
                register={register}
                placeholder="Buyruq/shartnoma raqamini kiriting"
                required={isTechnique || isMuallif}
                errors={errors}
                type="number"
                message="To'ldirilishi shart"
              />
              <span className="input-label mb-1 mt-4">Buyruq/shartnoma sanasi</span>
              <CustomMuiDatePicker
                placeholder="Sanani tanlang"
                maxDate={new Date()}
                control={control}
                name="order_date"
                customOnChange={(e) => setOrderDate(e)}
              />
              <span className="input-label mb-1 mt-4">Pudrat tashkilot rahbarining FIO</span>
              <Input
                widthFull
                name="customer_director"
                register={register}
                placeholder="Pudrat tashkilot rahbarining FIOsini kiriting"
                required={isTechnique || isMuallif}
                message="To'ldirilishi shart"
                errors={errors}
              />
              <span className="input-label mb-1 mt-4">Subpudratchi tashkilot nomi (agar mavjud bo'lsa)</span>
              <Input
                widthFull
                name="org_name"
                register={register}
                placeholder="Subpudratchi tashkilot nomini kiriting"
                required={false}
              />
              <span className="input-label mb-1 mt-4">Litsenziya raqami (agar mavjud bo'lsa)</span>
              <Input
                widthFull
                type="number"
                name="cer_num"
                register={register}
                placeholder="Litsenziya raqamini kiriting"
              />
              <span className="input-label mb-1 mt-4">Litsenziya sanasi (agar mavjud bo'lsa)</span>
              {/* <CustomDatePicker
                data-name="cer_date"
                placeholder="Sanani tanlang"
                type="license_date"
                maxDate={new Date()}
                date={customerCerDate}
                setDate={setCustomerCerDate}
              /> */}
              <CustomMuiDatePicker
                placeholder="Sanani tanlang"
                maxDate={new Date()}
                control={control}
                name="customer_cer_date"
                customOnChange={(e) => setCustomerCerDate(e)}
              />
              <span className="input-label mb-1 mt-4">Subpudrat tashkilot rahbarining FIO (agar mavjud bo'lsa)</span>
              <Input
                widthFull
                name="director_name_2"
                register={register}
                placeholder="Subpudrat tashkilot rahbarining FIOsini kiriting"
              />
              <span className="input-label mb-1 mt-4">Qurilish-montaj ishlarining boshlanish sanasi (oy/yil)</span>
              {/* <CustomDatePicker
                data-date="started_date"
                placeholder="Sanani tanlang"
                type="daypicker"
                maxDate={new Date()}
                className="z-40"
                date={startedDate}
                setDate={setStartedDate}
              /> */}
              <CustomMuiDatePicker
                placeholder="Sanani tanlang"
                maxDate={new Date()}
                control={control}
                name="started_date"
                defaultValue={new Date()}
                customOnChange={(e) => setStartDate(e)}
              />
              <span className="input-label mb-1 mt-4">Qurilish-montaj ishlarining tugallanish sanasi (oy/yil)</span>
              <CustomMuiDatePicker
                placeholder="Sanani tanlang"
                maxDate={new Date()}
                control={control}
                name="finished_date"
                defaultValue={new Date()}
                customOnChange={(e) => setFinishedDate(e)}
              />
              <span className="input-label mb-1 mt-4">Qurilish-montaj ishlarining summasi</span>
              <Input
                widthFull
                name="building_summ"
                type="number"
                register={register}
                placeholder="Qurilish-montaj ishlarining summasini kiriting"
                required={isTechnique || isMuallif}
                message="To'ldirilishi shart"
                errors={errors}
              />
              <span className="input-label mb-1 mt-4">Asbob-uskunalar, asboblar va inventar summasi</span>
              <Input
                widthFull
                name="tools_summ"
                register={register}
                type="number"
                placeholder="Asbob-uskunalar, asboblar va inventar summasini kiriting"
                required={isTechnique || isMuallif}
                message="To'ldirilishi shart"
                errors={errors}
              />
              <span className="input-label mb-1 mt-4">Obyektning loyiha raqami</span>
              <Input
                widthFull
                name="project_num"
                register={register}
                type="number"
                placeholder="Obyektning loyiha raqamini kiriting"
                required={isTechnique || isMuallif}
                message="To'ldirilishi shart"
                errros={errors}
              />
              <span className="input-label mb-1 mt-4">Xulosa raqami</span>
              <Input
                widthFull
                name="council_num"
                required={!isTechnique || isMuallif}
                type="number"
                register={register}
                placeholder="Xulosa raqamini kiriting"
                message="To'ldirilishi shart"
                errors={errors}
              />
            </>
          ) : (
            <>
              <span className="input-label mb-1 mt-4">Xulosa raqami</span>
              <Input
                widthFull
                name="council_num"
                required={!isTechnique || isMuallif}
                type="number"
                register={register}
                placeholder="Xulosa raqamini kiriting"
                message="To'ldirilishi shart"
                errors={errors}
              />
              <span className="input-label mt-3">Maxsus shaxs lavozimi</span>
              <div className="mb-4">
                <Input
                  required={!isTechnique || isMuallif}
                  message="To'ldirilishi shart"
                  widthFull
                  name="role_in_object"
                  errors={errors}
                  register={register}
                  placeholder="Maxsus shaxs lavozimini kiriting"
                />
              </div>
            </>
          )}
          <BtnFiled className="w-full mt-4" type="submit" size="large">
            Jo'natish
          </BtnFiled>
        </form>
      </Modal>
    )
  )
}
