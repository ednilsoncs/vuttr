import React, { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="button" type="button">
      {children}
    </button>
  );
};

export default Button;
