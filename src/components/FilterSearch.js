import React, { useEffect, useState } from 'react';
import './FilterSearch.css';
import FilterExclusive from './FilterExclusive';

function FilterSearch({ data, columnName, filters, setFilters, setColumnFilters, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueValues = [...new Set(data.map(item => String(item[columnName])))];

  const displayedUniqueValues = uniqueValues.filter(value =>
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitialState = () => {
    const state = { selectAll: true };
    uniqueValues.forEach(val => {
      state[val] = true;
    });
    return state;
  };

  const [checkboxes, setCheckboxes] = useState(() => {
    return filters[columnName] || getInitialState();
  });

  // Aktualizuj checkboxy jeśli unikalne wartości się zmieniły
  useEffect(() => {
    setCheckboxes(prev => {
      const updated = {};
      uniqueValues.forEach(val => {
        updated[val] = prev[val] ?? true;
      });
      updated.selectAll = uniqueValues.every(val => updated[val]);
      return updated;
    });
  }, [uniqueValues]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, [columnName]: checkboxes }));
  }, [checkboxes, columnName, setFilters]);

  const toggleCheckbox = (key) => {
    if (key === 'selectAll') {
      const newVal = !checkboxes.selectAll;
      const updated = { selectAll: newVal };
      uniqueValues.forEach(val => {
        updated[val] = newVal;
      });
      setCheckboxes(updated);
    } else {
      setCheckboxes(prev => {
        const updated = { ...prev, [key]: !prev[key] };
        updated.selectAll = uniqueValues.every(val => updated[val]);
        return updated;
      });
    }
  };

  return (
    <div className='div-sort-search'>
      <input
        type='text'
        placeholder='Wyszukaj'
        className='sort-search-input'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='search-input-flexbox'>
        <FilterExclusive
          name='Wszystkie'
          isChecked={checkboxes.selectAll || false}
          onToggle={() => toggleCheckbox('selectAll')}
        />
        {displayedUniqueValues.map((val) => (
          <FilterExclusive
            key={val}
            name={val}
            isChecked={checkboxes[val] || false}
            onToggle={() => toggleCheckbox(val)}
          />
        ))}
      </div>
      <div className='filter-buttons-container'>
        <button
          onClick={() => {
            const selected = uniqueValues.filter(val => checkboxes[val]);
            setColumnFilters(prev => {
              const others = prev.filter(f => f.id !== columnName);
              if (selected.length === uniqueValues.length) return others;
              return [...others, { id: columnName, value: selected }];
            });
            onClose();
          }}
        >
          ok
        </button>
        <button className='cancel-button' onClick={onClose}>
          anuluj
        </button>
      </div>
    </div>
  );
}

export default FilterSearch;
