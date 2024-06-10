import { BasicTable, Card } from '../../../components'
import CustomAreasBarchart from '../../../components/CustomAreasChart'

function AccountedDashboard() {
  const headData = [
    {
      title: 'Shartnoma raqami',
      key: 'contact_number',
    },
    {
      title: 'Obyekt',
      key: 'applicaiton_number',
    },
    {
      title: 'Buyurtmachi tashkilot',
      key: 'customer_orginization',
    },
  ]

  const headDataSecondTab = [
    {
      title: 'Obyekt',
      key: 'object',
    },
    {
      title: 'Qiymati',
      key: 'value',
    },
    {
      title: 'Invoys',
      key: 'invoice',
    },
    {
      title: 'Invoys summasi',
      key: 'invoice_payment',
    },
    {
      title: 'Boshlangan sana',
      key: 'start_date',
    },
  ]
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <Card
          title="Laboratoriya shartnomalari"
          rightElement={<p className="text-sm text-[#0E73F6] font-normal cursor-pointer">Barchasini ko`rish</p>}
          className="col-span-6"
          headerClassName="items-center"
          children={
            <BasicTable
              headColumns={headData}
              //   bodyColumns={}
              //   rowLink={}
              // isLoading={false}
            />
          }
        />
        <Card
          title="Obyektlar"
          rightElement={<p className="text-sm text-[#0E73F6] font-normal cursor-pointer">Barchasini ko`rish</p>}
          className="col-span-6"
          headerClassName="items-center"
          children={
            <BasicTable
              headColumns={headDataSecondTab}
              //   bodyColumns={}
              //   rowLink={}
              // isLoading={false}
            />
          }
        />
      </div>
      <div className="mt-4 w-full">
        <Card title="Hududlar bo`yicha statistika" children={<CustomAreasBarchart />} />
      </div>
    </>
  )
}

export default AccountedDashboard
