import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const API_ENDPOINT_URL = 'https://residency.azurewebsites.net';

export const ProgramsContext = createContext();

export const usePrograms = () => useContext(ProgramsContext);

export const ProgramsProvider = (props) => {
  const { children } = props;
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    states: [],
    type: ['14'],
    year: [2021],
    doFriendly: [1, 2, 3],
    imsFriendly: [1, 2, 3],
    comlexFriendly: [1, 2, 3],
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  // const [filterAttributes, setFilterAttributes] = useState([]);

  const callToAPI = (query, setFunction) => {
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: API_ENDPOINT_URL,
        url: query,
      })
        .then((response) => {
          setFunction([...response.data]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
      return () => (current = false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let query = '/categories';
    callToAPI(query, setCategories);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let query = '/programs?';
    const filterKeys = Object.keys(filters);
    const queryBuilder = [];

    for (const key of filterKeys) {
      const values = filters[key].map((i) => `${key}=${i}`);
      queryBuilder.push(values.join('&'));
    }

    query += queryBuilder.join('&');
    callToAPI(query, setPrograms);
  }, [filters]);

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
