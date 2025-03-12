import React from 'react'
import './FilterSort.css'

function FilterSort( {columnName, setSorting, sorting} ) {
  
  const sortInfo = sorting.find(item => item.id === columnName);
  const sortOrder = sortInfo ? (sortInfo.desc ? 'desc' : 'asc') : null;
  
  return (
    <div>
        <div className={`div-sort-button ${sortOrder==='asc' ? 'sorted' : ''}`} onClick={() => setSorting([{ id: columnName, desc: false }])}>
            <span className="sort-button">Sortuj od A do Z</span>
        </div>
        <div className={`div-sort-button ${sortOrder==='desc' ? 'sorted' : ''}`} onClick={() => setSorting([{ id: columnName, desc: true }])}>
            <span className="sort-button">Sortuj od Z do A</span>
        </div>
    </div>
  )
}

export default FilterSort