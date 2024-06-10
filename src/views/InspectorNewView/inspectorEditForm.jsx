import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import CheckUserPassport from '../../components/CheckUserPassport/CheckUserPassport'
import { OBJECT_STATUS_FROZEN, OBJECT_STATUS_ID_IN_PROGRESS, OBJECT_STATUS_NEW } from '../../settings/constants'
import { FormProvider } from 'react-hook-form'
import { InspectorForm } from '../../forms'

export default function InspectorEditForm() {
  const [
    {
      object,
      methods,
      isObjectSubmitted,
      onSubmitObjStatusComment,
      loadOptions,
      register,
      control,
      errors,
      location,
      setLocation,
      districts,
      fields,
      append,
      remove,
      setValue,
      setError,
      setIsOpen,
      getValues,
      watch,
      reset,
      isOpen,
      handleClose,
    },
  ] = useOutletContext()
  const { pathname } = useLocation()
  const { id } = useParams()
  return (
    <>
      <FormProvider {...methods}>
        <form>
          <div className="sidebar-header-calc">
            <InspectorForm
              isObjectSubmitted={isObjectSubmitted}
              onSubmitObjStatusComment={onSubmitObjStatusComment}
              isEditting={!pathname.includes('/add')}
              loadOptions={loadOptions}
              object={object}
              register={register}
              errors={errors}
              control={control}
              location={location}
              setLocation={setLocation}
              districts={districts}
              fields={fields}
              append={append}
              remove={remove}
              setValue={setValue}
              setError={setError}
              getValues={getValues}
              watch={watch}
              users={object?.object.data?.users}
              reset={reset}
              setIsOpen={setIsOpen}
              objectStatusId={object.object.data?.object_type?.id}
              data={object.object.data}
              objectRefetch={object.object.refetch}
              objectTypeStatus={object.object.data?.object_fund_source?.id}
            />
          </div>
        </form>
      </FormProvider>
      <CheckUserPassport isOpen={isOpen} handleClose={handleClose} id={id} />
    </>
  )
}
