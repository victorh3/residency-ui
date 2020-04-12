import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardDeck, Sidebar } from '../components';

const useResidencyApiGet = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: 'https://residency.azurewebsites.net',
        url: endpoint,
      })
        .then((response) => {
          console.log(response);
          setData([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, [endpoint]);

  return data;
};

const Marketplace = () => {
  const [filters, setFilters] = useState({ states: ['AZ'], types: [14] });
  const programs = useResidencyApiGet(
    `/programs?type=${filters.types}&state=${filters.states}`
  );
  const categories = useResidencyApiGet('/categories');

  return (
    <section className="Marketplace">
      <Sidebar
        categories={categories}
        filters={filters}
        setFilters={setFilters}
      />
      <CardDeck>
        {programs.map((residency, index) => (
          <Card key={`${index}-${residency.programId}`} residency={residency} />
        ))}
      </CardDeck>
    </section>
  );
};

export default Marketplace;
