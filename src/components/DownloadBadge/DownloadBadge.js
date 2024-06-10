import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import fileDownloader from '../../utils/fileDownloader'

const DownloadBadge = ({ value, label = 'Yuklab olish', maxWidth = '160px' }) => (
  <div
    onClick={() => fileDownloader(value)}
    className="border rounded-md flex items-center shrink-0 flex-nowrap cursor-pointer"
    style={{ padding: '6px 16px 6px 12px', backgroundColor: '#fff', maxWidth, columnGap: '12px' }}
  >
    <span style={{ color: '#007AFF' }}>
      <DownloadRoundedIcon />
    </span>
    {label}
  </div>
)

export default DownloadBadge
