import React from 'react';
import './clientLogos.css';

const clients = [
  { name: 'Client 1', logo: '/path/to/client1-logo.png' },
  { name: 'Client 2', logo: '/path/to/client2-logo.png' },
  { name: 'Client 3', logo: '/path/to/client3-logo.png' },
];

const ClientLogos = () => {
  return (
    <div className="client-logos">
      <h2>Our Clients</h2>
      <div className="logos">
        {clients.map((client, index) => (
          <img src={client.logo} alt={client.name} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
