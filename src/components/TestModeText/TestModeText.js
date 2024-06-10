import { useLocation } from 'react-router-dom'
import './TestModeText.scss'

const TestModeText = () => {
  const { pathname } = useLocation()
  return (
    <>
      {!pathname.includes('user-info') ? (
        <div className="bg-primary text-white test-mode">
          <p className="test-mode__description">
            <span>
              Platforma test rejimida ishlamoqda kamchilik yuzaga kelgan vaziyatda inspeksiya bilan bog'laning
            </span>
            <span>
              Platforma test rejimida ishlamoqda kamchilik yuzaga kelgan vaziyatda inspeksiya bilan bog'laning
            </span>
          </p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default TestModeText
