import React, {useState} from 'react'
import './FilterSearch.css'
import FilterExclusive from './FilterExclusive'

function FilterSearch({data, columnName}) {

  const [checkBoxes, setCheckBoxes] = useState([true, ...data.map(()=>true)]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter( 
    (item) => {
      const value = String(item[columnName]); // Convert to string
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  const handleCheck = (index)=>{
    if(index === 0){
      const newValue = !checkBoxes[0];
      setCheckBoxes(checkBoxes.map(()=>newValue));
    } else{
      const newCheckBoxes = [...checkBoxes];
      newCheckBoxes[index] = !newCheckBoxes[index];
      setCheckBoxes(newCheckBoxes);
    }
  };

  return (
    <div className='div-sort-search'>
        <input type='text' placeholder='Wyszukaj' className='sort-search-input' onChange={(e) => setSearchTerm(e.target.value)}/>
        <div className='search-input-flexbox'>
          <FilterExclusive name='Zaznacz wszystkie' isChecked={checkBoxes[0]} onToggle={() => handleCheck(0)} />
          {filteredData.map((item, index) => (
            <FilterExclusive key={item.id} name={item[columnName]} isChecked={checkBoxes[index + 1]} onToggle={()=>handleCheck(index + 1)} />
          ))}
        </div>
      </div>
  )
}

export default FilterSearch