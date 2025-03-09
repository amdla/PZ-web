import React, {useState} from 'react'
import './FilterSearch.css'
import FilterExclusive from './FilterExclusive'

function FilterSearch({data, columnName, checkboxes, toggleCheckbox}) {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter( 
    (item) => {
      const value = String(item[columnName]); // Convert to string
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
      </div>
  )
}

export default FilterSearch