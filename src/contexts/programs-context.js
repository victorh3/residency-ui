import React, { useState, createContext, useContext } from 'react';

export const ProgramsContext = createContext();

export const usePrograms = () => useContext(ProgramsContext);

export const ProgramsProvider = (props) => {
  const { children } = props;
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    states: [],
    type: ['14'],
    year: [2021],
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');

  return (
    <ProgramsContext.Provider
      value={{
        programs,
        setPrograms,
        filters,
        setFilters,
        categories,
        setCategories,
        isLoading,
        setIsLoading,
        filterSearch,
        setFilterSearch,
      }}
    >
      {children}
    </ProgramsContext.Provider>
  );
};
