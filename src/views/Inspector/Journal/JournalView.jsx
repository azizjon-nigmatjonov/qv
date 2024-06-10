import { Add, Save } from '@mui/icons-material'
import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { BasicLayout, BtnFiled, Card, FilterHeader, Header, MuiTabs } from '../../../components'
import CustomDayCont from '../../../components/CustomDayConts'
import CustomMuiDatePicker from '../../../components/CustomMuiDatePicker'
import SignComponent from '../../../components/SignModal'
import CanvasComp from '../../../components/SignModal/canvasComp'
import { BasicTableEditableForJournals } from '../../../components/Tables/BasicTableEditableForJournals'
import { setAuthCredentials } from '../../../redux/actions/authActions'
import { useJournal, uuid } from '../../../services'

export default function JournalView() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const { userId, roleId } = useSelector((state) => state.auth)
  const { journal_id, journal_name, id, journal_relation_id} = useParams()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [waitForAdding, setWaitForAdding] = useState(false)
  const [headData, setHeadData] = useState([])
  const [tables, setTables] = useState([])
  const [tabs, setTabs] = useState([])
  const { control, register, setValue, watch, reset, handleSubmit } = useForm({
    shouldUnregister: true,
  })
  const [activeTab, setActiveTab] = useState(0)
  const [activeTabTable, setActiveTabTable] = useState(0)
  //useFieldArray for table body

  const watchDate = useWatch({
    control: control,
    name: 'filterDateNotInJournal',
  })

  //get days in array from date
  const daysInMonth = useMemo(() => {
    const date = new Date(watchDate || new Date())
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }, [watchDate])
  useEffect(() => {
    import(`./journalModels/${journal_name}`).then((data) => {
      let tables = data.tables({ control, register })
      setTabs(tables?.map((table, index) => ({ key: index, title: table.title })))
      setTables(tables)
      setHeadData(tables[activeTab].head)
      setIsLoading(false)
    })
  }, [journal_name, setValue, register, control, activeTab, activeTabTable])
  const { journalData } = useJournal({
    journalDataQueryParams: {
      object_id: id,
      tab_name: tables[activeTab]?.name,
      journal_id,
      // journal_name,
      date: format(watchDate || new Date(), 'yyyy-MM-dd'),
    },
  })
  const { journalDataMutation } = useJournal({
    journalDataMutationParams: {
      onSuccess: () => {
        journalData.refetch()
        reset()
        setWaitForAdding(false)
      },
      onError: (res) => {
        console.log(res.data.message)
      },
      journal_name,
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    createJournalDataHandler(data)
  })
  const onAddAndSubmit = handleSubmit(async (data) => {
    createJournalDataHandler(data)
  })

  async function createJournalDataHandler(data) {
    console.log(data)
    setWaitForAdding(true)
    const rowId = await uuid()
    await Object.keys(data).forEach((key) => {
      if (key?.includes('date') || key?.includes('time') || key?.includes('created_at')) {
        data[key] = format(data[key] || {}, 'yyyy-MM-dd')
      }
    })
    delete data.filterDateNotInJournal
    delete data.tartib_raqami
    journalDataMutation.mutate({
      journal: { ...data, id: rowId },
      created_by: userId,
      journal_id,
      id: rowId,
      journal_relation_id,
      role_id: roleId,
      object_id: id,
      journal_type: tables[activeTab].name,
    })
  }
  return (
    <div className="h-screen overflow-auto">
      <form>
        <Header
          title={tables[activeTab]?.title}
          titleLength={150}
          backLink={-1}
          rightElement={
            <BtnFiled type="submit" onClick={onSubmit} leftIcon={<Save />}>
              Saqlash
            </BtnFiled>
          }
          centerElement={
            tables.length > 1 && (
              <MuiTabs
                activeTab={activeTab}
                elements={tabs}
                setActiveTab={setActiveTab}
                getParamsFromLocation={false}
              />
            )
          }
        />
        {tables[activeTab]?.hasDates && (
          <>
            <FilterHeader
              leftElements={[
                <>
                  <CustomMuiDatePicker
                    control={control}
                    name="filterDateNotInJournal"
                    views={['year']}
                    defaultValue={new Date()}
                    inputFormat="yyyy"
                    placeholder="Year"
                  />
                </>,
                <CustomMuiDatePicker
                  control={control}
                  name="filterDateNotInJournal"
                  views={['month']}
                  defaultValue={new Date()}
                  inputFormat="MMMM"
                  placeholder="Month"
                />,
              ]}
            />
            <Card className="mt-4 mx-4" headerClassName="hidden">
              <div className="flex justify-between ">
                <CustomDayCont
                  onChange={(day) =>
                    setValue(
                      'filterDateNotInJournal',
                      new Date(new Date(watchDate).setDate(day) || new Date().setDate(day))
                    )
                  }
                  days={daysInMonth}
                  activeDate={new Date(watchDate || new Date()).getDate()}
                  month={monthNames[new Date(watchDate || new Date()).getMonth()]}
                />
              </div>
            </Card>
          </>
        )}
        <div className="sidebar-header-calc">
          <BasicLayout>
            <BasicTableEditableForJournals
              control={control}
              waitForAdding={waitForAdding}
              register={register}
              setValue={setValue}
              headColumns={headData || []}
              onAddAndSubmit={onAddAndSubmit}
              bodyColumns={(journalData.data?.journals || [])?.concat([{ newData: true }])}
              tableName={tables[activeTab]?.name}
              isLoading={journalData?.isLoading}
            />
          </BasicLayout>
        </div>
      </form>
      {/* <CanvasComp setValue={setValue} key="name" /> */}
    </div>
  )
}
