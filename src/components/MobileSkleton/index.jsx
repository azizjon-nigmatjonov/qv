import { Skeleton } from '@mui/material'

const MobileSkleton = ({ rows = 3 }) => {
  return Array(rows)
    .fill()
    .map((_, index) => (
      <div className="bg-white p-4 mb-4 rounded-md" key={index + 'skleton'}>
        <div className="border-b pb-3">
          <Skeleton height={24} className="w-full" />
        </div>
        <div className="border-b">
          <Skeleton height={40} className="w-full mb-4" />
          <Skeleton height={40} className="w-full mb-4" />
          <Skeleton height={40} className="w-full" />
        </div>
        <div className="pt-2">
          <Skeleton height={24} className="w-full" />
        </div>
      </div>
    ))
}

export default MobileSkleton
