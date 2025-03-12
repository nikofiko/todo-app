import React, { useState } from 'react'
import check from '../assets/images/icon-check.svg'

const Task = ({status, onStatusChange, value }) => {
  const [isChecked, setIsChecked] = useState(status === 'completed');

  const handleCheckboxChange = () => {
    const newStatus = status === 'completed' ? 'active' : 'completed';
    onStatusChange(newStatus); // Przekazujemy nowy status
  };

    
  return (
    <div className=''>
      <div className='flex font-josefin text-[18px] pt-[20px] pb-[19px] gap-[5px] dark:bg-verydarkdesaturatedblue'>
            <label className="relative cursor-pointer">
                <input checked={status === 'completed'} onChange={handleCheckboxChange} type="checkbox" className="peer hidden" />
                <span className="relative block w-6 h-6 rounded-full border border-lightgrayishbluehover dark:border-verydark transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-cyan-400 peer-checked:to-purple-500"></span>
                <svg className="absolute h-[9px] min-w-[11px] top-2 left-[7px] text-white dark:text-verydarkdesaturatedblue peer-checked:text-white" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="currentColor" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
            </label>
            <p className={`pl-[24px] ${status === 'completed' ? 'line-through text-lightthemegrayishblue dark:text-verydarkgrayishblue' : 'text-verydarkgrayishblue dark:text-lightgrayishblue'}`}>{value}</p>      
        </div>
    </div>
  )
}

export default Task