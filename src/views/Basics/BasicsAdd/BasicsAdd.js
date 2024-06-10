import { Save } from '@mui/icons-material'
import { CancelIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import { AnalystInfoForm } from '../../../forms/Analyst'
import { hoc } from '../../../utils/hoc'
import { useBasicsAddProps } from './basicsAdd.props'

export const BasicsAdd = hoc(
  useBasicsAddProps,
  ({
    register,
    errors,
    control,
    onSubmit,
    handleSubmit,
    regionFields,
    totalObjectsInRegions,
    typeOptions,
    objectSectorList,
    objectCategoriesList,
    setValue,
  }) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Qo`shish"
          backLink={-1}
          rightElement={
            <div className="flex gap-3">
              <BtnOutlined color="red" leftIcon={<CancelIcon />} onClick={() => {}}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled leftIcon={<Save />} type="submit" disabled={!!Object.values(errors).length}>
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="header-calc">
          <AnalystInfoForm
            register={register}
            errors={errors}
            control={control}
            regionFields={regionFields}
            totalObjectsInRegions={totalObjectsInRegions}
            typeOptions={typeOptions}
            objectSectorList={objectSectorList}
            objectCategoriesList={objectCategoriesList}
            setValue={setValue}
          />
        </div>
      </form>
    )
  }
)
