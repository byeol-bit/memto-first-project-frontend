const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer
        ${active 
          ? "border-b-2 border-red-400 text-red-400" 
          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}
      `}
    >
      {label}
    </button>
  )
}
export default TabButton