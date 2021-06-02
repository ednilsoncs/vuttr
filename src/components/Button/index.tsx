import React, { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="button-container" type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
