import React from 'react';
import './FilterExclusive.css';

interface FilterExclusiveProps {
  name: string;
  isChecked: boolean;
  onToggle: () => void;
}

const FilterExclusive = ({ name, isChecked, onToggle }: FilterExclusiveProps) =>  {
  return (
    <div className='div-filter-exclusive'>
      <input type='checkbox' checked={isChecked} onChange={onToggle} />
      <span>{name}</span>
    </div>
  );
};

export default FilterExclusive;