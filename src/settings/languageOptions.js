import EnIcon from '../assets/icons/En.svg'
import RuIcon from '../assets/icons/Ru.svg'
import UzIcon from '../assets/icons/Uzb.svg'

const languageOptions = [
  {
    label: (
      <div className="flex gap-3 items-center">
        <span>
          <img src={UzIcon} alt="english flag" />
        </span>
        <span>O'zbekcha</span>
      </div>
    ),
    value: 'uz',
  },
  {
    label: (
      <div className="flex gap-3 items-center">
        <span>
          <img src={UzIcon} alt="uzbek flag" />
        </span>
        <span>Ўзбекча</span>
      </div>
    ),
    value: 'uz_cyrl',
  },
  {
    label: (
      <div className="flex gap-3 items-center">
        <span>
          <img src={EnIcon} alt="english flag" />
        </span>
        <span>Ingizcha</span>
      </div>
    ),
    value: 'en',
  },
  {
    label: (
      <div className="flex gap-3 items-center">
        <span>
          <img src={RuIcon} alt="english flag" />
        </span>
        <span>Русский</span>
      </div>
    ),
    value: 'ru',
  },
]

export default languageOptions
