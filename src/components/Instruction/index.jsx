export default function Instruction({ title, color, count }) {
  const colorStyle = {
    black: {
      backgroundColor: '#F5F5F5',
      color: '#303940',
    },
    green: {
      backgroundColor: 'rgba(34, 195, 72, 0.1)',
      color: '#22C348',
    },
    red: {
      backgroundColor: 'rgba(247, 102, 89, 0.1)',
      color: '#F76659',
    },
  }
  return (
    <div className="p-3 mb-2 rounded-lg grow max-w-md" style={colorStyle[color]}>
      <p className="mb-2" style={{ color: '#1A2024' }}>
        {title}
      </p>
      <b className="font-bold">{count}</b>
    </div>
  )
}
