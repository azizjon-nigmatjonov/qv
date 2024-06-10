import { Link } from 'react-router-dom'

const TableRowLink = ({ values, fn, objectChild, styles = '', children }) => (
  <>
    <Link
      to={fn ? fn(values[1]) : values[1]}
      className={`stretched-link	${styles}`}
      onClick={(e) => e.stopPropagation()}
    ></Link>
    <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
      {children ? children : objectChild ? values[0][objectChild] : values[0]}
    </span>
  </>
)

export default TableRowLink
