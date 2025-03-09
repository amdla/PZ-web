import React from 'react'
import './FilterExclusive.css'

function FilterExclusive({name, isChecked, onToggle}) {
 
  return (
    <div className='div-filter-exclusive'>
        <input type="checkbox"  checked={isChecked} onClick={onToggle}/>
        <span>{name}</span>
    </div>
  )
}

export default FilterExclusive