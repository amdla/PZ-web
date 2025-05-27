import React, { useEffect, useState} from 'react'
import './FilterSearch.css'
import FilterExclusive from './FilterExclusive'

function FilterSearch({data, columnName, filters, setFilters, setColumnFilters, onClose}) {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => {
    return Object.entries(filters).every(([key, val]) => {
      if (key === columnName || !val) return true;

      const selected = Object.entries(val)
        .filter(([k, v]) => k !== 'selectAll' && v)
        .map(([k]) => k);

      const allValues = [...new Set(data.map(row => String(row[key])))];
      if (selected.length === allValues.length) return true;

      return selected.includes(String(item[key]));
    });
  });  
  const uniqueValues = [...new Set(filteredData.map(item => String(item[columnName])))];
  //const uniqueValues = [...new Set(data.map(item => String(item[columnName])))];

  const displayedUniqueValues = uniqueValues.filter(value =>
    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitialState = ()=>{
    const initialState = {'selectAll': true};
    uniqueValues.forEach(value => {
      initialState[value] = true;
    });
    return initialState;
  }

  //jak istnieje już stan dla danej kolumny to go wczytaj jak nie to zainicjuj nowy
  const [checkboxes, setCheckboxes] = useState(()=>{
    if (filters[columnName]) {
      return filters[columnName];
    } else {
      return getInitialState();
    }  
  });

  useEffect(() => {
    setFilters(prev => ({ ...prev, [columnName]: checkboxes }));
  }, [checkboxes, columnName, setFilters]);



  const toggleCheckbox = (key) =>{
      if(key === 'selectAll'){
        const newValue = !checkboxes.selectAll;
        const newState = {'selectAll' : newValue};
        uniqueValues.forEach((value) => {
            newState[value] = newValue;
        });
        setCheckboxes(newState);
      } else{
        setCheckboxes((prev) => {
            const newState = {...prev, [key] : !prev[key]};
            const selectAllNewValue = uniqueValues.every((value) => newState[value]);
            newState.selectAll = selectAllNewValue;
            return newState;
        });
      }
  };

  return (
    <div className='div-sort-search'>
      <input type='text' placeholder='Wyszukaj' className='sort-search-input' onChange={(e) => setSearchTerm(e.target.value)}/>
      <div className='search-input-flexbox'>
        <FilterExclusive name='Zaznacz wszystkie' isChecked={checkboxes.selectAll || false} onToggle={() => toggleCheckbox('selectAll')} />
        {displayedUniqueValues.map((value) => (
          <FilterExclusive key={value} name={value} isChecked={checkboxes[value] || false} onToggle={()=>toggleCheckbox(value)} />
        ))}
      </div>
      <div className='filter-buttons-container'>

      <button onClick={() => {
        const selectedValues = uniqueValues.filter(value => checkboxes[value])

        setColumnFilters(prevFilters => {
          const otherFilters = prevFilters.filter(filter => filter.id !== columnName);
          if (selectedValues.length === uniqueValues.length) {
            return otherFilters;
          }
          return [...otherFilters, { id: columnName, value: selectedValues }];
        });

        onClose(); // Optionally close the filter menu.
        }}>ok</button>

        <button className='cancel-button' onClick={onClose}>anuluj</button>
      </div>
    </div>
  )
}

export default FilterSearch