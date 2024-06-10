const classes = 'w-full text-center font-bold text-[17px]'
function sectorData({ sector, status }, userType) {
  function orderaMake(name, order) {
    if (name === sector) {
      return 0
    } else {
      return order
    }
  }

  let data = [
    {
      key: 'objects',
      title: 'Obyektlar',
      order: 0,
      permission: ['all'],
      columns: [
        {
          title: 'Ro`yxatga olingan',
          key: 'registered',
          render: (value) =>
            renderer({ value, color: 'green', name: 'objects.registered', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
          render: (value) =>
            renderer({ value, color: 'blue', name: 'objects.in_process', nameForColor: sector + '.' + status }),
        },
        {
          title: 'To`xtatilgan',
          key: 'stopped_by_inspector',
          render: (value) =>
            renderer({
              value,
              color: 'red',
              name: 'objects.stopped_by_inspector',
              nameForColor: sector + '.' + status,
            }),
        },
        {
          title: 'Muzlatilgan',
          key: 'stopped_by_builder',
          render: (value) =>
            renderer({
              value,
              color: 'yellow',
              name: 'objects.stopped_by_builder',
              nameForColor: sector + '.' + status,
            }),
        },
      ],
    },
    {
      key: 'monitorings',
      title: 'Monitoring',
      order: orderaMake('monitoring', 1),
      permission: userType ? ['inspectors', 'internal_supervisors'] : ['all'],
      columns: [
        {
          title: 'Rejadagi',
          key: 'planned',
          render: (value) =>
            renderer({ value, color: 'green', name: 'monitorings.planned', nameForColor: sector + '.' + status }),
        },
        {
          title: 'O’tkazilgan',
          key: 'done',
          render: (value) =>
            renderer({ value, color: 'blue', name: 'monitorings.done', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Muddati o`tgan',
          key: 'delayed',
          render: (value) =>
            renderer({ value, color: 'red', name: 'monitorings.delayed', nameForColor: sector + '.' + status }),
        },
      ],
    },
    {
      key: 'regulations',
      title: 'Yozma ko’rsatmalar',
      order: orderaMake('regulations', 2),
      permission: userType ? ['technical_supervisors', 'author', 'inspectors', 'foreman'] : ['all'],
      columns: [
        {
          title: 'Berilgan',
          key: 'given',
          render: (value) =>
            renderer({ value, color: 'green', name: 'regulations.given', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
          render: (value) =>
            renderer({ value, color: 'blue', name: 'regulations.in_process', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Ijrosi ta`minlangan',
          key: 'completed',
          render: (value) =>
            renderer({ value, color: 'blue', name: 'regulations.completed', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Kechiktirilgan',
          key: 'delayed',
          render: (value) =>
            renderer({
              value,
              color: 'red',
              name: 'regulations.delayed',
              nameForColor: sector + '.' + status,
            }),
        },
        {
          title: "Kechiktirib ijrosi ta'minlangan",
          key: 'delayed_completed',
          render: (value) =>
            renderer({
              value,
              color: 'red',
              name: 'regulations.delayed_completed',
              nameForColor: sector + '.' + status,
            }),
        },
      ],
    },
    {
      key: 'violations',
      title: 'Qoidabuzarliklar',
      order: orderaMake('violations', 3),
      permission: userType ? ['technical_supervisors', 'inspectors', 'foreman', 'author'] : ['all'],
      columns: [
        {
          title: 'Aniqlangan',
          key: 'determined',
          render: (value) =>
            renderer({ value, color: 'green', name: 'violations.determined', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
          render: (value) =>
            renderer({ value, color: 'blue', name: 'violations.in_process', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Ijrosi ta`minlangan',
          key: 'fixed',
          render: (value) =>
            renderer({ value, color: 'blue', name: 'violations.fixed', nameForColor: sector + '.' + status }),
        },
        {
          title: 'Kechiktirilgan',
          key: 'delayed',
          render: (value) =>
            renderer({
              value,
              color: 'red',
              name: 'violations.delayed',
              nameForColor: sector + '.' + status,
            }),
        },
      ],
    },
    {
      title: 'Qatnashchilarga nisbatan Monitoring',
      key: 'monitoring_of_participants',
      order: 7,
      permission: ['technical_supervisors', 'author'],
      columns: [
        {
          title: 'Rejadagi',
          key: 'planned',
          render: (value) => renderer({ value }),
        },
        {
          title: "O'tkazilgan",
          key: 'done',
          render: (value) => renderer({ value }),
        },
        {
          title: 'Kechiktirilgan',
          key: 'delayed',
          render: (value) => renderer({ value }),
        },
      ],
    },
    {
      title: "Qatnashchilarga nisbatan Yozma ko'rsatmalar",
      key: 'regulation_of_participants',
      order: 7,
      permission: ['technical_supervisors'],
      columns: [
        {
          title: 'Berilgan',
          key: 'given',
          render: (value) => renderer({ value }),
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
          render: (value) => renderer({ value }),
        },
        {
          title: "Ijrosi ta'minlangan",
          key: 'completed',
          render: (value) => renderer({ value }),
        },
        {
          title: 'Kechiktirilgan',
          key: 'delayed',
          render: (value) => renderer({ value }),
        },
        {
          title: "Kechiktirib ijrosi ta'minlangan",
          key: 'delayed_completed',
          render: (value) => renderer({ value }),
        },
      ],
    },
    {
      title: 'Qatnashchilarga nisbatan Qoidabuzarliklar',
      key: 'violation_of_participants',
      order: 7,
      permission: ['technical_supervisors'],
      columns: [
        {
          title: 'Aniqlangan',
          key: 'determined',
          render: (value) => renderer({ value }),
        },
        {
          title: 'Jarayonda',
          key: 'in_process',
          render: (value) => renderer({ value }),
        },
        {
          title: 'Bartaraf etilgan',
          key: 'fixed',
          render: (value) => renderer({ value }),
        },
        {
          title: "Muddati o'tgan",
          key: 'delayed',
          render: (value) => renderer({ value }),
        },
      ],
    },
    {
      order: 8,
      key: 'administrative_count',
      title: 'Ma`muriy javobgarlik qo`llanilganlik soni',
      permission: userType ? ['technical_supervisors', 'inspectors', 'foreman', 'author'] : ['all'],
      render: (value) =>
        renderer({ value, color: 'green', name: 'administrative_count', nameForColor: sector + '.' + status }),
    },
    {
      order: 9,
      key: 'completed',
      title: 'Foydalanishga topshirilgan obyektlar soni',
      permission: ['all'],
      render: (value) => renderer({ value, color: 'green', name: 'completed', nameForColor: sector + '.' + status }),
    },
  ]

  return filterPermissions(data, userType).sort((a, b) => a.order - b.order)
}
function userHeadData(userType) {
  switch (userType) {
    case 'inspectors':
      return {
        title: 'Inspektorlar',
        key: 'number_of_users',
      }
    case 'technical_supervisors':
      return {
        title: 'Texnik nazoratchilar',
        key: 'number_of_users',
      }
    case 'author':
      return {
        title: 'Mualliflik nazoratchilar soni',
        key: 'number_of_users',
      }
    case 'internal_supervisors':
      return {
        title: 'Ichki nazoratchilar',
        key: 'number_of_users',
      }
    case 'foreman':
      return {
        title: 'Prorablar soni',
        key: 'number_of_users',
      }
    default:
      return false
  }
}
export function tableHeadData({ type, sector, userType }) {
  return [
    {
      title: '№',
      key: 'order',
      permission: ['all'],
    },
    {
      title: 'Hudud nomi',
      key: 'location_name',
      permission: ['all'],
    },
    userHeadData(userType),
    ...sectorData({ sector }, userType),
  ]
}

export function footerColumns(data, userType) {
  const columns = [
    {
      permission: ['all'],
      columns: [{}],
    },
    {
      permission: ['all'],
      key: 'total',
      align: 'justify-start',
      columns: [
        {
          title: <span className={classes}>Jami</span>,
          key: 'total',
          align: 'justify-start',
        },
      ],
    },
    userType && {
      key: 'number_of_users',
      permission: ['all'],
      columns: [
        {
          key: 'number_of_users',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b.number_of_users || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'object',
      permission: ['all'],
      columns: [
        {
          key: 'object.registered',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b.objects?.registered || 0), 0), classes }),
        },
        {
          key: 'object.in_process',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b.objects?.in_process || 0), 0), classes }),
        },
        {
          key: 'object.stopped_by_inspector',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b.objects?.stopped_by_inspector || 0), 0), classes }),
        },
        {
          key: 'object.stopped_by_builder',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b.objects?.stopped_by_builder || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'monitorings',
      permission: userType ? ['inspectors', 'internal_supervisors'] : ['all'],
      columns: [
        {
          key: 'monitorings.planned',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.monitorings?.planned || 0), 0), classes }),
        },
        {
          key: 'monitorings.done',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.monitorings?.done || 0), 0), classes }),
        },
        {
          key: 'monitorings.delayed',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.monitorings?.delayed || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'regulations',
      permission: userType ? ['technical_supervisors', 'author', 'inspectors', 'foreman'] : ['all'],
      columns: [
        {
          key: 'regulations.given',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.regulations?.given || 0), 0), classes }),
        },
        {
          key: 'regulations.in_process',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.regulations?.in_process || 0), 0), classes }),
        },
        {
          key: 'regulations.completed',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.regulations?.completed || 0), 0), classes }),
        },
        {
          key: 'regulations.delayed',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.regulations?.delayed || 0), 0), classes }),
        },
        {
          key: 'regulations.delayed_completed',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.regulations?.delayed_completed || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'violations',
      permission: userType ? ['technical_supervisors', 'inspectors', 'foreman', 'author'] : ['all'],
      columns: [
        {
          key: 'violations.determined',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.violations?.determined || 0), 0), classes }),
        },
        {
          key: 'violations.in_process',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.violations?.in_process || 0), 0), classes }),
        },
        {
          key: 'violations.fixed',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.violations?.fixed || 0), 0), classes }),
        },
        {
          key: 'violations.delayed',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.violations?.delayed || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'monitoring_of_participants',
      permission: ['technical_supervisors', 'author'],
      columns: [
        {
          key: 'monitoring_of_participants.planned',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.monitoring_of_participants?.planned || 0), 0), classes }),
        },
        {
          key: 'monitoring_of_participants.planned',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.monitoring_of_participants?.done || 0), 0), classes }),
        },
        {
          key: 'monitoring_of_participants.planned',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.monitoring_of_participants?.delayed || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'regulation_of_participants',
      permission: ['technical_supervisors'],
      columns: [
        {
          key: 'regulation_of_participants.given',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.regulation_of_participants?.given || 0), 0), classes }),
        },
        {
          key: 'regulation_of_participants.in_process',
          render: () =>
            renderer({
              value: data?.reduce((a, b) => a + (b?.regulation_of_participants?.in_process || 0), 0),
              classes,
            }),
        },
        {
          key: 'regulation_of_participants.completed',
          render: () =>
            renderer({
              value: data?.reduce((a, b) => a + (b?.regulation_of_participants?.completed || 0), 0),
              classes,
            }),
        },
        {
          key: 'regulation_of_participants.delayed',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.regulation_of_participants?.delayed || 0), 0), classes }),
        },
        {
          key: 'regulation_of_participants.delayed_completed',
          render: () =>
            renderer({
              value: data?.reduce((a, b) => a + (b?.regulation_of_participants?.delayed_completed || 0), 0),
              classes,
            }),
        },
      ],
    },
    {
      key: 'violation_of_participants',
      permission: ['technical_supervisors'],
      columns: [
        {
          key: 'violation_of_participants.determined',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.violation_of_participants?.determined || 0)), classes }),
        },
        {
          key: 'violation_of_participants.in_process',
          render: () =>
            renderer({
              value: data?.reduce((a, b) => a + (b?.violation_of_participants?.in_process || 0), 0),
              classes,
            }),
        },
        {
          key: 'violation_of_participants.fixed',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.violation_of_participants?.fixed || 0), 0), classes }),
        },
        {
          key: 'violation_of_participants.delayed',
          render: () =>
            renderer({ value: data?.reduce((a, b) => a + (b?.violation_of_participants?.delayed || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'administrative_count',
      permission: userType ? ['technical_supervisors', 'inspectors', 'foreman', 'author'] : ['all'],
      columns: [
        {
          key: 'administrative_count',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.administrative_count || 0), 0), classes }),
        },
      ],
    },
    {
      key: 'total_completed',
      permission: ['all'],
      columns: [
        {
          key: 'total_completed',
          render: () => renderer({ value: data?.reduce((a, b) => a + (b?.completed || 0), 0), classes }),
        },
      ],
    },
  ]
  const newData = []
  filterPermissions(columns, userType)?.forEach((element) => {
    if (element.columns) {
      element.columns.forEach((item) => {
        newData.push(item)
      })
    }
  })

  return newData
}

function renderer({ value, classes, refuse }) {
  if (refuse) {
    return false
  } else {
    if (!!value) {
      return <span className={classes}>{value}</span>
    } else {
      return <span className={classes}>---</span>
    }
  }
}

function filterPermissions(data, userType) {
  const newData = []
  data.forEach((element) => {
    if (element?.permission) {
      if (element?.permission?.includes(userType) || element?.permission?.includes('all')) {
        newData.push(element)
      }
    }
  })
  return newData
}
