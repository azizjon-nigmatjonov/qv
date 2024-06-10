import { PersonIcon } from '../../assets/icons/index'

export default function UserCard({ position, usersInfo }) {
  const techControlRegex = new RegExp('texnik nazoratchi', 'gi')
  const authorSupervisorRegex = new RegExp('mualliflik nazorati', 'gi')

  if (position.match(techControlRegex)) position = 'Buyurtmachi'
  else if (position.match(authorSupervisorRegex)) position = 'Loyihachi'

  const textNormalizer = (text) => text.substr(0, 1).toUpperCase() + text.slice(1).toLowerCase()

  return (
    <div className="border rounded-lg py-3 px-4 w-full sm:w-auto">
      <p className="mb-4" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '600' }}>
        {textNormalizer(position)}
      </p>
      <div className="flex">
        {usersInfo?.map((user, index) => (
          <div className="flex" key={index}>
            <div className={`flex ${index > 0 ? 'pl-3 border-l' : 'pr-3'}`}>
              <div
                className="rounded-full flex items-center justify-center mr-2"
                style={{ width: '36px', height: '36px', backgroundColor: '#E0EEFF', color: '#0E73F6' }}
              >
                <PersonIcon />
              </div>
              <div>
                <p className="mb-0.5 text-sm flex gap-x-1" style={{ color: '#48535B' }}>
                  <span>{textNormalizer(user.user_surname)}</span>
                  <span>{textNormalizer(user.user_name)}</span>
                </p>
                <a className="text-xs" href="tel:+" style={{ color: '#0E73F6' }}>
                  {user.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
