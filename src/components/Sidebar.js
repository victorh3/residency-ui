import React from 'react';
import { Form } from 'react-bootstrap';
import { states as statesList } from './states';

const Sidebar = (props) => {
  const { categories, filters, setFilters } = props;
  const { types, states } = filters;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: [value] });
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar__Menu">
        <Form>
          <Form.Group
            controlId="program-categories"
            className="Sidebar__Categories"
          >
            <Form.Label>Program Categories</Form.Label>
            {categories.map((category) => (
              <Form.Check
                name="types"
                checked={types.indexOf(category.categoryId.toString()) > -1}
                key={`.${category.categoryId}`}
                value={category.categoryId}
                type="radio"
                id={category.categoryId}
                label={category.categoryName.toLowerCase()}
                onChange={handleOnChange}
              />
            ))}
          </Form.Group>
          <Form.Group controlId="program-states">
            <Form.Label>States</Form.Label>
            {statesList.map((state) => (
              <Form.Check
                name="states"
                checked={states.indexOf(state.abbreviation) > -1}
                key={`.${state.abbreviation}`}
                value={state.abbreviation}
                type="radio"
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
