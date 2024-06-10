import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { DownloadIcon, PdfIcon, RightArrowIcon } from '../../../assets/icons'
import { BtnFiled, Card } from '../../../components'
import downloadItForMe from '../../../utils/downloadItForMe'

const ThirdStep = ({ scrollToNext, controlFiles, scrollToPrev, data }) => {
  return (
    <div className="w-full">
      <Card title="Nazorat qiluvchi organlar va masul shaxslar haqida ma'lumot" className="w-1/2">
        {controlFiles.map(
          (file, index) =>
            data &&
            data[file.key] && (
              <div key={file.id} className={`${index === controlFiles.length - 1 ? '' : 'border-b mb-6 pb-6'}`}>
                <p className="mb-2 text-sm leading-6 font-semibold">{file.title}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span>
                      <PdfIcon />
                    </span>
                    <div>
                      <p className="text-sm leading-6">{data[file.key]}</p>
                    </div>
                  </div>
                  <div
                    className="p-1.5 rounded-md border cursor-pointer hover:bg-gray-100 duration-300"
                    onClick={() =>
                      downloadItForMe({
                        bucketName: 'files',
                        expiresAt: 1,
                        filename: data[file.key],
                        hasItsOwnLink: true,
                      })
                    }
                  >
                    <DownloadIcon />
                  </div>
                </div>
              </div>
            )
        )}

        <div className="flex justify-between mt-5">
          <BtnFiled leftIcon={<ArrowBackIcon fontSize="small" />} onClick={scrollToPrev}>
            Oldingisi
          </BtnFiled>
          <BtnFiled rightIcon={<RightArrowIcon color="white" />} onClick={scrollToNext}>
            Keyingisi
          </BtnFiled>
        </div>
      </Card>
    </div>
  )
}

export default ThirdStep
