// 12.Журнал> учета твердых бытовых отходов
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'ДКоличество (прописью) отходов, временно накопленных в месте размещения отходов',
        key: 'props_count',
        width: 340,
      },
      {
        title: 'Лицо, ответственное за хранение отходов, подпись, дата',
        key: 'date_signature',
        width: 183,
      },
      {
        title: 'Дата передачи отхода на захоронение',
        key: 'date_transfer_waste',
        width: 169,
      },
      {
        title: 'Количество (прописью) отходов, сданных на захоронение',
        key: 'props_transfer_count',
        width: 168,
      },
      {
        title: 'Номер акта, квитанции и т.д.',
        key: 'act_number',
        width: 209,
      },
      {
        title: 'Остаток отхода после передачи',
        key: 'remaining_waste',
        width: 228,
      },
      {
        title: 'Лицо, сдавшее отходы, подпись',
        key: 'user_signature',
        width: 184,
      },
      {
        title: 'Лицо, принявшее отходы, подпись',
        key: 'accepted_signature',
        width: 228,
      },
    ],
    hasDates: true,
    name: 'solid_waste',
    title: 'Журнал учета твердых бытовых отходов',
  },
]
