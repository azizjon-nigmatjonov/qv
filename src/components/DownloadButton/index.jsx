import { Download } from '@mui/icons-material'

import fileDownloader from '../../utils/fileDownloader'

export default function DownloadButton({ url }) {
  return (
    <div
      className="flex justify-center items-center gap-2 bg-white border rounded-md py-2 px-3 w-fit"
      onClick={() => fileDownloader(url)}
    >
      <span className="text-blue-500 text-xs">
        <Download />
      </span>
      <span>Yuklab olish</span>
    </div>
  )
}
