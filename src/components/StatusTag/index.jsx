export function StatusTag({ title, color = '', statusId = '', className, size = 'large' }) {
  const data = {
    blue: 'text-blue-600 bg-blue-200',
    green: 'text-green-600 bg-green-200',
    red: 'text-red-600 bg-red-200',
    cyan: 'text-[#046C54] bg-[#BBF6F4]',
    yellow: 'text-yellow-600 bg-yellow-200',
    purple: 'text-purple-600 bg-purple-200',
    gray: 'text-gray-600 bg-gray-200',
  }
  const colorByStatusId = {
    '1c4689a6-5057-4cac-8fe9-15fafb149f5b': 'purple',
    '71ed1aeb-a18b-4688-bb0a-b88213ae0345': 'gray',
    '5de5f2d1-17fa-4e2f-bb1c-0218d029d0a6': 'cyan',
    'd87851f7-a4b1-4ed6-9859-86cbee14bd03': 'blue',
    'f1af0243-e3d6-4423-a25a-211d3736be3d': 'blue',
    '2c2c6813-bf0b-4ef0-ba70-aefe3001f2f5': 'blue',
    '17528180-c06b-41bc-838b-630278bcefcc': 'blue',
    '38a25938-d040-4ccf-9e64-23f483c53e3b': 'blue',
    '78f19080-d9b6-4e8d-887f-03055130e213': 'yellow',
    '36c43564-1861-48f9-bdfe-9158289ed94c': 'yellow',
    'b8f8f00d-4c3d-48d6-800c-9fffd2394777': 'yellow',
    '31356f88-8c96-4abb-9e68-9410d6fe4223': 'yellow',
    '6b483bf3-100c-4086-b421-1e329a00c0b6': 'yellow',
    '7418c1ac-6d28-44ab-8e30-7125125fda88': 'yellow',
    'd913c9cb-a9ec-4a9a-a783-37d0ff16ec5a': 'yellow',
    'a6f16f58-9307-4fe7-85b7-a93581caf1c5': 'yellow',
    'd8309504-e17d-48b1-b4f9-644d29d47eb0': 'yellow',
    'e4bdf226-dae8-46aa-a152-38c4d19889f5': 'yellow',
    'be3623e7-78f5-48f6-8135-edf3731a838c': 'green',
    '26c0338a-b18b-4ae4-9eb2-4a9ace9a65a1': 'red',
    'd042d139-f8a3-4f3d-ada2-f5d179a811b2': 'red',
    '0f6f99b1-3fc7-493c-bf3f-10b6a8109069': 'red',
    'e6c61e8f-daea-4716-81d0-4be120264e15': 'red',
    'c67af18e-c131-4bfe-9aa5-1444b6003fd5': 'red',
    'e314bdfa-1329-43fc-ba62-af888c7c580f': 'red',
    'f386319c-7717-402e-9529-815c4cc95c8f': 'red',
    'b50a4eaa-9f68-40ae-83ab-e1971c0ea114': 'red',
    'd2fd8089-d7e3-43cc-afe8-9080bf9c0107': 'red',
    '771c14a0-f1d8-4d89-a862-4a9e20f3111c': 'yellow',
    'fe57b230-1eff-477d-bb9f-0965e3d3a515': 'green',
    '30165510-1d9d-4d6e-bcc5-6246af0cbc22': 'green',
    '05d92835-e855-481c-899c-9dddc2d7407d': 'green',
    '97f99deb-0807-48d3-9eea-b2cfda114137': 'green',
    '90966d39-154a-4bec-9903-506f97eb6156': 'green',
    'b4e1ed17-239a-4422-b671-14551d4aca39': 'green',
    '2ed33411-2930-413d-8833-3af9d0fc5de4': 'green',
    'cb4ab3d0-0721-4d24-a459-12aefaebb12b': 'green',
    '74abdc8b-4db6-4921-8b69-d6438ade0802': 'green',
  }

  const statuses = {
    new: 'Yangi',
    ministery: 'Boshqarmaga yuborilgan',
    ministry: 'Boshqarmaga yuborilgan',
    organization: 'Tashkilotlarga yuborilgan',
    inspector: 'Inspektorga yuborilgan',
    failed: 'Rad etilgan',
    checked: 'Tekshirilgan',
    passed: 'Tasdiqlangan',
    accepted: 'Qabul qilingan',
    process: 'Jarayonda',
    inspection: "Boshliqqa jo'natilgan",
    connecting: 'Obyekt biriktirilmagan',
  }
  const statusesColor = {
    new: 'blue',
    ministery: 'yellow',
    organization: 'yellow',
    inspector: 'yellow',
    failed: 'red',
    checked: 'green',
    passed: 'green',
    accepted: 'green',
    inspection: 'yellow',
    process: 'yellow',
    ministry: 'yellow',
    connecting: 'yellow',
  }

  return (
    <div
      className={`text-sm leading-6 font-medium text-center py-1 rounded-md px-4 ${
        size === 'large' ? 'min-w-[150px]' : 'min-w-[120px]'
      } ${
        data[statusId ? colorByStatusId[statusId] : statusesColor[title] ? statusesColor[title] : color]
      } ${className}`}
    >
      {statuses[title] ?? title}
    </div>
  )
}
