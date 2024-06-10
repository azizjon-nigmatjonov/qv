export const tableHeadData = ({ userType }) => {
  const data = [
    {
      title: '№',
      key: 'order',
      permission: ['all'],
    },
    {
      title: 'F.I.Sh',
      key: 'full_name',
      permission: ['all'],
    },
    {
      key: 'organization_name',
      title: 'Tashkilot',
      permission: ['internal_supervisors', 'author'],
    },
    {
      key: 'objects_count',
      title: 'Obyektlar',
      order: 0,
      permission: ['inspectors', 'technical_supervisors', 'author', 'internal_supervisors'],
      columns: [
        {
          title: 'Ro`yxatga olingan',
          key: 'registered',
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
        },
        {
          title: 'To`xtatilgan',
          key: 'stopped_by_inspector',
        },
        {
          title: 'Muzlatilgan',
          key: 'stopped_by_builder',
        },
      ],
    },
    {
      key: 'monitorings',
      title: 'Monitoring',
      permission: ['inspectors', 'internal_supervisors', 'technical_supervisors'],
      columns: [
        {
          title: 'Rejadagi',
          key: 'planned',
          innerKey: 'planned_planned',
        },
        {
          title: "Ijrosi ta'minlangan",
          key: 'transferred',
          innerKey: 'transferred_transferred',
        },
        {
          title: "Muddati o'tgan",
          key: 'term_past',
          innerKey: 'term_past_term_past',
          render: (val) => <span className="text-red-500">{val}</span>,
        },
      ],
    },
    {
      key: 'regulations',
      title: 'Yozma ko’rsatmalar',
      permission: ['technical_supervisors', 'inspectors'],
      columns: [
        {
          title: 'Berilgan',
          key: 'given',
          innerKey: 'given_given',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Ijrosi ta'minlangan</p>,
          key: 'done',
          innerKey: 'done_done',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
          key: 'term_past',
          innerKey: 'term_past_term_past',
          render: (val) => <span className="text-red-500">{val}</span>,
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tib ijrosi ta'minlangan</p>,
          key: 'expired_done',
          innerKey: 'expired_done_expired_done',
        },
        {
          title: 'Jarayonda',
          key: 'not_expired',
          innerKey: 'not_expired_not_expired',
        },
      ],
    },
    {
      key: 'violations_count',
      title: 'Qoidabuzarliklar',
      permission: ['technical_supervisors', 'inspectors', 'author'],
      columns: [
        {
          title: 'Aniqlangan',
          key: 'determined',
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
        },
        {
          title: 'Ijrosi ta`minlangan',
          key: 'fixed',
        },
        {
          title: 'Kechiktirilgan',
          key: 'delayed',
        },
        // {
        //   title: "Kechiktirib ijrosi ta'minlangan",
        //   key: 'delayed_completed',
        //   render: (value) =>
        //     renderer({
        //       value,
        //       color: 'red',
        //       name: 'violations.delayed_completed',
        //       nameForColor: sector + '.' + status,
        //     }),
        // },
      ],
    },
    {
      key: 'monitoring_for_participants',
      title: 'Qatnashchilarga nisbatan monitoring',
      permission: ['technical_supervisors', 'author'],
      columns: [
        {
          title: 'Rejadagi',
          key: 'planned',
        },
        {
          title: 'O’tkazilgan',
          key: 'done',
        },
        {
          title: 'Muddati o`tgan',
          key: 'delayed',
        },
      ],
    },
    {
      key: 'guilty_user_violations',
      title: 'Qatnashchilarga nisbatan qoidabuzarliklar',
      permission: ['technical_supervisors'],
      columns: [
        {
          title: 'Aniqlangan',
          key: 'determined',
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
        },
        {
          title: 'Ijrosi ta`minlangan',
          key: 'fixed',
        },
        {
          title: 'Kechiktirilgan',
          key: 'delayed',
        },
        // {
        //   title: "Kechiktirib ijrosi ta'minlangan",
        //   key: 'delayed_completed',
        //   render: (value) =>
        //     renderer({
        //       value,
        //       color: 'red',
        //       name: 'violations.delayed_completed',
        //       nameForColor: sector + '.' + status,
        //     }),
        // },
      ],
    },
    {
      title: 'Inspeksiya tomonidan aniqlangan qoidabuzarliklar soni',
      key: 'num_violations_determined',
      permission: ['foreman'],
      columns: [
        {
          title: 'Aniqlangan',
          key: 'determined',
        },
        {
          title: 'Jarayonda',
          key: 'in_progress',
        },
        {
          title: 'Bartaraf etilgan',
          key: 'completed',
        },
        {
          title: 'Muddati o`tgan',
          key: 'delayed_not_completed',
        },
      ],
    },
    {
      title: 'Texnik nazoratchi tomonidan aniqlangan qoidabuzarliklar soni',
      key: 'num_violations_determined_by_technical_inspector',
      permission: ['foreman'],
      columns: [
        {
          title: 'Aniqlangan',
          key: 'determined',
        },
        {
          title: 'Jarayonda',
          key: 'in_progress',
        },
        {
          title: 'Bartaraf etilgan',
          key: 'completed',
        },
        {
          title: 'Muddati o`tgan',
          key: 'delayed_not_completed',
        },
      ],
    },
    {
      title: 'Ijro hujjatlari	',
      key: 'documents',
      permission: ['foreman'],
      columns: [
        {
          title: 'Yuritilayotgan hujjatlar soni',
          key: 'in_progress',
        },
        {
          title: 'Oxirgi to`ldirilgan sana',
          key: 'last_date',
        },
      ],
    },
    {
      key: 'administrative_count',
      title: 'Ma`muriy javobgarlik qo`llanilganlik soni',
      permission: ['foreman', 'author', 'technical_supervisors', 'inspectors'],
    },
    {
      key: 'completed',
      title: 'Foydalanishga topshirilgan obyektlar soni',
      permission: ['internal_supervisors', 'foreman', 'author', 'technical_supervisors', 'inspectors'],
    },
  ]
  return data.filter((element) => element?.permission?.includes(userType) || element?.permission?.includes('all'))
}
