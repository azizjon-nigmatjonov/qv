const data = [
  {
    title: '№',
    key: 'order',
  },
  {
    title: 'Qurilish obyektlari sohalari',
    id: 'form_id',
    key: ['form_number', 'category_name', 'sector_names'],
    render: ([form_number, category_name, sector_names]) => (
      <div className="min-w-[200px]">
        {!!form_number && <span className="font-bold">F-{form_number}</span>} {category_name}
        {sector_names?.length > 0 && <span className="italic">({sector_names?.join(', ')})</span>}
      </div>
    ),
  },
  {
    title: 'Hududlar nomi',
    id: 'region_id',
    key: 'region_name',
  },
  {
    title: 'Jami obyektlar soni',
    key: 'objects',
    objectChild: 'total',
    width: 100,
    render: (total) => <div className="max-w-[100px]">{total || '----'}</div>,
  },
  {
    title: 'Dasturlarga kiritilgan obyektlar soni',
    key: 'objects',
    innerKey: 'planned',
    objectChild: 'planned',
    width: 100,
    render: (planned) => <div className="max-w-[100px]">{planned || '----'}</div>,
  },
  {
    title: 'Tadbirkor subyektlarining obyektlar soni',
    key: 'objects',
    objectChild: 'business',
    innerKey: 'business',
    width: 100,
    render: (business) => <div className="max-w-[100px]">{business || '----'}</div>,
  },
  {
    title: 'Ro`yxatdan o`tgan obyektlar soni',
    key: 'objects',
    objectChild: 'registered',
    width: 100,
    render: (registered) => <div className="max-w-[100px]">{registered || '----'}</div>,
  },
  {
    title: 'To`xtab qolgan obyektlar soni',
    key: 'objects',
    objectChild: 'stopped',
    width: 100,
    render: (stopped) => <div className="max-w-[100px]">{stopped || '----'}</div>,
  },
  {
    title: <span>Monitoring otkazish ishlar soni</span>,
    key: 'objects',
    objectChild: 'monitorings',
    width: 100,
    render: (monitorings) => <div className="max-w-[100px]">{monitorings || '----'}</div>,
  },
  {
    title: 'Berilgan yozma ko`rsatmalar',
    key: 'given_regulations',
    columns: [
      {
        title: 'Jami',
        key: 'total',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
      {
        title: 'Pudratchiga',
        key: 'authorship_supervisor',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
      {
        title: 'Buyurtmachiga',
        key: 'internal_supervisor',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
      {
        title: 'Loyihachiga',
        key: 'technical_supervisor',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
    ],
  },
  {
    title: 'Bartaraf etilgan yozma korsatmalar',
    key: 'completed_regulations',
    columns: [
      {
        title: 'Jami',
        key: 'total',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
      {
        title: 'Pudratchiga',
        key: 'authorship_supervisor',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
      {
        title: 'Buyurtmachiga',
        key: 'internal_supervisor',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
      {
        title: 'Loyihachiga',
        key: 'technical_supervisor',
        render: (value) => <div className="max-w-[100px]">{value || '----'}</div>,
      },
    ],
  },
]
export const tableHeadData1 = data.filter((item) => item.id !== 'region_id')
export const tableHeadData2 = data.filter((item) => item.id !== 'form_id')
