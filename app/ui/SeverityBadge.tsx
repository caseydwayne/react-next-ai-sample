type SeverityLevel = 'low' | 'moderate' | 'medium' | 'high'

type SeverityBadgeProps = {
  level: SeverityLevel | string
}

function SeverityBadge( { level }: SeverityBadgeProps ){
  const colors: Record<SeverityLevel, string> = {
    low: 'bg-green-200 text-green-800',
    moderate: 'bg-yellow-200 text-yellow-800',
    medium: 'bg-yellow-300 text-yellow-900',
    high: 'bg-red-200 text-red-800',
  }

  return (
    <span
      className={`
        inline-block px-2 py-0.5 rounded-full text-xs font-semibold
        ${colors[ level as SeverityLevel ] || 'bg-gray-200 text-gray-800'}
      `}
    >
      {level.toUpperCase()}
    </span>
  )
}

export default SeverityBadge
