const MapPanelToggleButton = ({ src, alt, onClick, isSelected = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded bg-[var(--background-color)] shadow-md overflow-hidden inline-flex box-border border-1 ${isSelected
        ? "border-[var(--primary-color)] ring-1 ring-[var(--primary-color)]"
        : "border-[var(--border-color)] hover:bg-[var(--background-dark)]"
        }`}
      aria-label={alt}
      aria-pressed={isSelected}
    >
      <img src={src} alt={alt} className="block w-auto h-8" />
    </button>
  )
}

export default MapPanelToggleButton
