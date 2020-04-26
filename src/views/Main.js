import React from 'react';
import { Sidebar } from '../components';
import { usePrograms } from '../contexts';

const Main = ({ children }) => {
  const { filters, categories } = usePrograms();

  return (
    <section>
      <Sidebar categories={categories} filters={filters} />
      <div className="Main">{children}</div>
    </section>
  );
};

export default Main;
