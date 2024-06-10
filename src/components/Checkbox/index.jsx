export function Checkbox({
  type = 'checkbox',
  register = () => {},
  name,
  required = false,
  disabled = false,
  ...restParams
}) {
  return (
    <input
      type={type}
      {...register(name, { required })}
      className="w-[20px] h-[20px] cursor-pointer rounded-[4px]"
      disabled={disabled}
      {...restParams}
    />
  )
}
