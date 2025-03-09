import React from 'react'
import './FilterSort.css'

function FilterSort() {
  return (
    <div>
        <div className="div-sort-button">
            <span className="sort-button">Sortuj od A do Z</span>
        </div>
        <div className="div-sort-button">
            <span className="sort-button">Sortuj od Z do A</span>
        </div>
    </div>
  )
}

export default FilterSort