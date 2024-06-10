export default function DeadlineSlider({ created_at, deadline, forByIdPage = false }) {
  const createdTime = new Date(created_at)
  const deadlineTime = new Date(deadline)
  const today = new Date()
  const diffTime = Math.abs(deadlineTime - createdTime)
  const diffDeadlineDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffCurrentDays = Math.ceil(Math.abs(today - createdTime) / (1000 * 60 * 60 * 24))
  const filledPart = Math.round((diffCurrentDays * 100) / diffDeadlineDays)
  const leftDays = diffDeadlineDays - diffCurrentDays

  const emptyPart = 1 - filledPart
  return !!deadline ? (
    !forByIdPage ? (
      <div className="flex flex-col align-middle justify-center gap-2">
        <div className={`flex overflow-hidden w-full rounded-md h-[16px] `}>
          <div
            style={{ width: filledPart + '%' }}
            className={`${filledPart < 100 ? 'bg-[#1AC19D]' : 'bg-[#F76659]'}`}
          ></div>
          <div
            style={{ width: 100 - filledPart + '%' }}
            className={`${filledPart < 100 ? 'bg-[#1ac19d34]' : 'bg-[#F76659]'}`}
          ></div>
        </div>
        <div className={`w-full text-center font-medium ${leftDays > 0 ? 'text-black' : 'text-red-600'} `}>
          {leftDays > 0 ? (
            <p>{leftDays} kun qoldi</p>
          ) : leftDays === 0 ? (
            <p>Oxirgi kun</p>
          ) : (
            <p>{Math.abs(leftDays)} kun kechiktirildi</p>
          )}
        </div>
      </div>
    ) : (
      <div className="flex flex-col relative align-middle justify-center gap-2">
        <div className={`flex overflow-hidden w-full rounded-2xl h-[24px] `}>
          <div
            style={{ width: filledPart + '%' }}
            className={`${filledPart < 100 ? 'bg-[#1AC19D]' : 'bg-[#F76659]'}`}
          ></div>
          <div
            style={{ width: 100 - filledPart + '%' }}
            className={`${filledPart < 100 ? 'bg-[#1ac19d34]' : 'bg-[#F76659]'}`}
          ></div>
        </div>
        <div
          className={`w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center font-medium text-black `}
        >
          {leftDays > 0 ? (
            <p>{leftDays} kun qoldi</p>
          ) : leftDays === 0 ? (
            <p>Oxirgi kun</p>
          ) : (
            <p>{Math.abs(leftDays)} kun kechiktirildi</p>
          )}
        </div>
      </div>
    )
  ) : (
    <p>----</p>
  )
}
