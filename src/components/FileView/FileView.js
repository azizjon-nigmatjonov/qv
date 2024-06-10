import { DownloadIcon } from '../../assets/icons'
import FileIcon from '../../assets/images/file-icon.png'
import fileDownloader from '../../utils/fileDownloader'

export const FileView = ({ fileName, className, placeholder = 'File', taskId, ownLink = false, ...restParams }) => {
  return (
    <div className={`flex items-center gap-x-2 bg-[#F4F6FA] p-2 rounded ${className}`} {...restParams}>
      <img src={FileIcon} alt="pdf file" width="30" height="40" />
      <div className="flex justify-between grow items-center">
        <p className="flex flex-col">
          <b className="text-sm font-normal">{placeholder ? placeholder : fileName}</b>
        </p>
        <span
          onClick={() =>
            fileDownloader(
              `${
                ownLink
                  ? ownLink.charAt(ownLink.length - 1) === '/'
                    ? ownLink + fileName
                    : ownLink + '/' + fileName
                  : process.env.REACT_APP_MY_GOV_FILE_URL + '/' + taskId + '/' + fileName
              }`,
              true
            )
          }
          className="inline-block rounded-lg border p-1 bg-white cursor-pointer"
        >
          <DownloadIcon />
        </span>
      </div>
    </div>
  )
}
