import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { states as statesList } from './states';
import { toTitleCase } from './../utils/common';
import { usePrograms } from '../contexts';
import { threeOptions } from '../utils/Constants';

const Sidebar = () => {
  const {
    filters,
    setFilters,
    categories,
    filterSearch,
    setFilterSearch,
  } = usePrograms();
  const { type, states, doFriendly, imsFriendly, comlexFriendly } = filters;
  const [lastFilters, setLastFilters] = useState(['AZ']);

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
    } else if (name === 'doFriendly') {
      const checkedAttributes = new Set([...doFriendly]);
      if (e.target.checked) {
        checkedAttributes.add(Number(value));
      } else {
        checkedAttributes.delete(Number(value));
      }
      setFilters({ ...filters, [name]: [...checkedAttributes] });
    } else if (name === 'imgFriendly') {
      const checkedAttributes = new Set([...imsFriendly]);
      if (e.target.checked) {
        checkedAttributes.add(Number(value));
      } else {
        checkedAttributes.delete(Number(value));
      }
      setFilters({ ...filters, imsFriendly: [...checkedAttributes] });
    } else if (name === 'comlexFriendly') {
      const checkedAttributes = new Set([...comlexFriendly]);
      if (e.target.checked) {
        checkedAttributes.add(Number(value));
      } else {
        checkedAttributes.delete(Number(value));
      }
      setFilters({ ...filters, [name]: [...checkedAttributes] });
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
          <Form.Group controlId="attributes-do-friendly">
            <Form.Label>D.O. Friendly?</Form.Label>
            <br></br>
            {threeOptions.map((option) => (
              <Form.Check
                name="doFriendly"
                key={`do-friendly-${option.key}`}
                inline
                checked={doFriendly.indexOf(option.key) > -1}
                label={option.value}
                type="checkbox"
                value={option.key}
                id={`doFriendly-${option.key}`}
                onChange={handleOnChange}
              />
            ))}
          </Form.Group>
          <Form.Group controlId="attributes-img-friendly">
            <Form.Label>I.M.G Friendly?</Form.Label>
            <br></br>
            {threeOptions.map((option) => (
              <Form.Check
                name="imgFriendly"
                key={`img-friendly-${option.key}`}
                inline
                checked={imsFriendly.indexOf(option.key) > -1}
                label={option.value}
                type="checkbox"
                value={option.key}
                id={`imgFriendly-${option.key}`}
                onChange={handleOnChange}
              />
            ))}
          </Form.Group>
          <Form.Group controlId="attributes-comlex-friendly">
            <Form.Label>COMLEX Accepted?</Form.Label>
            <br></br>
            {threeOptions.map((option) => (
              <Form.Check
                name="comlexFriendly"
                key={`comlex-friendly-${option.key}`}
                inline
                checked={comlexFriendly.indexOf(option.key) > -1}
                label={option.value}
                type="checkbox"
                value={option.key}
                id={`comlexFriendly-${option.key}`}
                onChange={handleOnChange}
              />
            ))}
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
