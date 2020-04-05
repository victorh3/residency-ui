import React from 'react';
import { Form } from 'react-bootstrap';
import { states as statesList } from './states';

const Sidebar = (props) => {
  const { categories, filters, setFilters } = props;
  const { types, states } = filters;

  const handleOnChange = (e) => {
    const { name } = e.target;
    const valArr = new Set([...filters[name]]);
    if (e.target.checked) {
      valArr.add(e.target.value);
    } else {
      valArr.delete(e.target.value);
    }
    setFilters({ ...filters, [name]: [...valArr] });
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
                checked={types.indexOf(category.categoryId) > -1}
                key={`.${category.categoryId}`}
                value={category.categoryId}
                type="checkbox"
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
