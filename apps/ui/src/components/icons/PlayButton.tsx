export function PlayButton({ className }: { className?: string }) {
  return (
    <svg
      width="123"
      height="124"
      viewBox="0 0 123 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="61.5" cy="62.3662" r="61.5" fill="white" fillOpacity="0.13" />
      <circle cx="62" cy="62.8662" r="38" fill="white" />
      <path
        d="M75 62.8662L55.5 74.1245L55.5 51.6079L75 62.8662Z"
        fill="#FF1414"
      />
    </svg>
  )
}
