
const SelectedTab = ({tabs, active, onChange}) => {
    return (
        <div className='flex w-full'>
            {tabs.map((tab, index) => {
                return(
                    <div key={tab.value} className='flex flex-1'>
                        <div 
                            onClick={() => onChange(tab.value)}
                            className={
                            `flex-1 flex items-center justify-center gap-2 py-4 text-xs  text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer
                                ${active==tab.value
                                ? 'text-red-400 border-b border-red-400 font-semibold'
                                : 'font-medium border-b border-gray-100'
                                }`
                            }
                        >
                            {tab.label}
                        </div>
                        {index !== tabs.length - 1 && (
                            <div className='w-px bg-gray-100' />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default SelectedTab