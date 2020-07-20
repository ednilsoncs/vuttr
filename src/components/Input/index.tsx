import React, { InputHTMLAttributes } from 'react';
import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="input-container">
      <p>{label}</p>
      <input name={name} placeholder="name" {...rest} />
    </div>
  );
};

export default Input;
