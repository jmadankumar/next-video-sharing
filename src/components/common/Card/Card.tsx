import React from 'react';

const Card: React.FC = ({ children }) => {
  return <div className="rounded-md bg-white">{children}</div>;
};

export default Card;
