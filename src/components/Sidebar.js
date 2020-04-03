import React from 'react';
import { Form } from 'react-bootstrap';

const Sidebar = (props) => {
  // const { categories } = props;
  const categories = [];

  return (
    <div className="Sidebar">
      <div className="Sidebar__Menu">
        <Form>
          <Form.Group controlId="program-categories">
            <Form.Label>Program Categories</Form.Label>
            <Form.Control as="select" multiple>
              {categories.map((category) => (
                <option>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Sidebar;
