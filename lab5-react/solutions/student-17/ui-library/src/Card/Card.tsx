import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  'data-testid': testId = 'card'
}) => {
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Card;