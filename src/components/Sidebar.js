/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { states as statesList } from './states';
import { toTitleCase } from './../utils/common';
import { usePrograms } from '../contexts';
import { API_ENDPOINT_URL } from '../utils/Constants';

const Sidebar = () => {
  const {
    filters,
    setFilters,
    categories,
    filterSearch,
    setFilterSearch,
    setIsLoading,
    setPrograms,
    setCategories,
  } = usePrograms();
  const { type, states } = filters;
  const [lastFilters, setLastFilters] = useState(['AZ']);

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
    callToAPI('/categories', setCategories, setIsLoading);
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
    callToAPI(query, setPrograms, setIsLoading);
  }, [filters]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'states') {
      const checkedStates = new Set([...states]);
      if (e.target.checked) {
        checkedStates.add(value);
      } else {
        checkedStates.delete(value);
      }
      setFilters({ ...filters, [name]: [...checkedStates] });
    } else {
      setFilters({ ...filters, [name]: [value] });
    }
  };

  const handleSelectAlOnChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setLastFilters([...states]);
      setFilters({ ...filters, states: [] });
    } else {
      setFilters({ ...filters, states: [...lastFilters] });
    }
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar__Menu">
        <Form>
          <Form.Group controlId="program-search">
            <Form.Label>Program Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name or ID"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="program-categories"
            className="Sidebar__Categories"
          >
            <Form.Label>Program Categories</Form.Label>
            <Form.Control
              as="select"
              name="type"
              onChange={handleOnChange}
              value={type[0]}
            >
              {categories.map((category) => (
                <option
                  name="type"
                  key={`.${category.categoryId}`}
                  value={category.categoryId}
                  id={category.categoryId}
                >
                  {toTitleCase(category.categoryName.toString())}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="program-states">
            <Form.Label>States</Form.Label>
            <Form.Check
              name="states"
              checked={!states.length}
              key={`.all`}
              value="all"
              type="checkbox"
              id="all"
              label="All States"
              onChange={handleSelectAlOnChange}
            />
            {statesList.map((state) => (
              <Form.Check
                name="states"
                checked={states.indexOf(state.abbreviation) > -1}
                key={`.${state.abbreviation}`}
                value={state.abbreviation}
                type="checkbox"
                id={state.abbreviation}
                label={state.name}
                onChange={handleOnChange}
              />
            ))}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Sidebar;
