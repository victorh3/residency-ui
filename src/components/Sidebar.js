import React from 'react';
import { Form } from 'react-bootstrap';
import { states as statesList } from './states';

const Sidebar = (props) => {
  const { categories, filters, setFilters } = props;
  const { type, states } = filters;

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

  return (
    <div className="Sidebar">
      <div className="Sidebar__Menu">
        <Form>
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
                  {category.categoryName.toString().toLowerCase()}
                </option>
              ))}
            </Form.Control>
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
