import React from 'react'
import './FilterSearch.css'
import FilterExclusive from './FilterExclusive'

function FilterSearch() {
  return (
    <div className='div-sort-search'>
        <input type='text' placeholder='Wyszukaj' className='sort-search-input'/>
        <div className='search-input-flexbox'>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
          <FilterExclusive/>
        </div>
      </div>
  )
}

export default FilterSearch