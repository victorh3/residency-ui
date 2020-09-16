import React from 'react';
import { Sidebar, Loader } from '../components';
import { usePrograms } from '../contexts';

const Main = ({ children }) => {
  const { filters, categories, isLoading } = usePrograms();

  return (
    <section>
      <Sidebar categories={categories} filters={filters} />
      <div className="Main">{children}</div>
      {isLoading && <Loader />}
    </section>
  );
};

export default Main;
