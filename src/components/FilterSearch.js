import React, {useState} from 'react'
import './FilterSearch.css'
import FilterExclusive from './FilterExclusive'

function FilterSearch({data, columnName, checkboxes, toggleCheckbox, setColumnFilters, onClose}) {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter( 
    (item) => {
      const value = String(item[columnName]); // Convert to stringg
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  return (
    <div className='div-sort-search'>
      <input type='text' placeholder='Wyszukaj' className='sort-search-input' onChange={(e) => setSearchTerm(e.target.value)}/>
      <div className='search-input-flexbox'>
        <FilterExclusive name='Zaznacz wszystkie' isChecked={checkboxes.selectAll} onToggle={() => toggleCheckbox('selectAll')} />
        {filteredData.map((item, index) => (
          <FilterExclusive key={item.id} name={item[columnName]} isChecked={checkboxes[item.id]} onToggle={()=>toggleCheckbox(item.id)} />
        ))}
      </div>
      <div className='filter-buttons-container'>

      <button onClick={() => {
        // Build an array of values selected via checkboxes.
        const selectedValues = data
        .filter(item => checkboxes[item.id])
        .map(item => item[columnName]);

        // Set the column filter for the current column
        setColumnFilters([{ id: columnName, value: selectedValues }]);
        onClose(); // Optionally close the filter menu.
        }}>ok</button>

        <button className='cancel-button'>anuluj</button>
      </div>
    </div>
  )
}

export default FilterSearch