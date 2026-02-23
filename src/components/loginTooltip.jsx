import { useEffect, useRef } from "react"

const LoginTooltip = ({onClick, onClose, mainText="", buttonText=""}) => {
    const tooltipRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(
                tooltipRef.current && !tooltipRef.current.contains(e.target)
            ){
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [onClose])
    return (
        <div
            ref={tooltipRef} 
            className="absolute translate-y-5 top-1/2  bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
            <button 
                onClick={onClose}
                className="absolute top-1 right-2 text-gray-300 hover-text-white text-xs"
            >
                x
            </button>
            <div className="flex flex-col gap-2 pr-3">
                <span>{mainText}</span>
                <button
                    onClick={onClick}
                    className="bg-red-400 hover:bg-red-300 px-3 py-1 rounded"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default LoginTooltip