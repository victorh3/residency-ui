import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardDeck, Sidebar } from '../components';

const useResidencyApiGet = (endpoint, filters = {}) => {
  const [data, setData] = useState([]);
  const filterKeys = Object.keys(filters);
  // `/programs?type=${filters.type}&states=${filters.states}&year=${filters.year}`
  let newEndpoint = `/${endpoint}`;
  switch (endpoint) {
    case 'programs':
      newEndpoint += '?';
      for (const key of filterKeys) {
        for (const value of filters[key]) {
          newEndpoint += `${key}=${value}&`;
        }
      }
      break;
    case 'categories':
    default:
  }

  useEffect(() => {
    // https://residency.azurewebsites.net/swagger/index.html
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: 'https://residency.azurewebsites.net',
        url: newEndpoint,
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
  }, [newEndpoint]);

  return data;
};

const Marketplace = () => {
  const [filters, setFilters] = useState({
    states: ['AZ'],
    type: ['14'],
    year: [2021],
  });
  const programs = useResidencyApiGet('programs', filters);
  const categories = useResidencyApiGet('categories');

  return (
    <section className="Marketplace">
      <Sidebar
        categories={categories}
        filters={filters}
        setFilters={setFilters}
      />
      <CardDeck>
        {programs.length ? (
          programs.map((residency, index) => (
            <Card
              key={`${index}-${residency.programId}`}
              residency={residency}
            />
          ))
        ) : (
          <p>
            Sorry{' '}
            <span role="img" aria-label="sad face">
              😞
            </span>
            , no residencies
            <span role="img" aria-label="hospital">
              🏥
            </span>{' '}
            found matching your search criteria. Try adjusting your filters
            <span role="img" aria-label="stethoscope and lab coat">
              🩺🥼
            </span>
            .
          </p>
        )}
      </CardDeck>
    </section>
  );
};

export default Marketplace;
