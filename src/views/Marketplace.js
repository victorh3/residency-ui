import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardDeck, Sidebar } from '../components';

const Marketplace = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: 'https://localhost:5002',
        url: '/programs?type=14',
      })
        .then((response) => {
          console.log(response);
          setPrograms([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, []);

  return (
    <section className="Marketplace">
      <Sidebar />
      <CardDeck>
        {programs.map((residency, index) => (
          <Card key={`${index}-${residency.programId}`} residency={residency} />
        ))}
      </CardDeck>
    </section>
  );
};

export default Marketplace;
