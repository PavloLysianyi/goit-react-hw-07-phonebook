import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter, selectFilter } from './contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  return (
    <div>
      Пошук контактів за ім'ям
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className="input"
      />
    </div>
  );
};

export default Filter;
