import React, {useState} from 'react'
import './FilterSearch.css'
import FilterExclusive from './FilterExclusive'

function FilterSearch({data, columnName, checkboxes, toggleCheckbox, setColumnFilters, onClose}) {

  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter( 
    (item) => {
      const value = String(item[columnName]); //convert to stringg
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  const uniqueValues = [...new Set(filteredData.map(item => item[columnName]))]

  return (
    <div className='div-sort-search'>
      <input type='text' placeholder='Wyszukaj' className='sort-search-input' onChange={(e) => setSearchTerm(e.target.value)}/>
      <div className='search-input-flexbox'>
        <FilterExclusive name='Zaznacz wszystkie' isChecked={checkboxes.selectAll} onToggle={() => toggleCheckbox('selectAll')} />
        {uniqueValues.map((value) => (
          <FilterExclusive key={value} name={value} isChecked={checkboxes[value]} onToggle={()=>toggleCheckbox(value)} />
        ))}
      </div>
      <div className='filter-buttons-container'>

      <button onClick={() => {
        // Build an array of values selected via checkboxes.
        const selectedValues = uniqueValues.filter(value => checkboxes[value])

        // Set the column filter for the current column
        setColumnFilters(prevFilters => {
          const otherFilters = prevFilters.filter(filter => filter.id !== columnName);
          return [...otherFilters, { id: columnName, value: selectedValues }];
        });

        onClose(); // Optionally close the filter menu.
        }}>ok</button>

        <button className='cancel-button'>anuluj</button>
      </div>
    </div>
  )
}

export default FilterSearch