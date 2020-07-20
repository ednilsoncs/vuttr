import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className="input-container">
      <p>{label}</p>
      <input
        className={` ${!!error && 'input-error'}`}
        ref={inputRef}
        defaultValue={defaultValue}
        type="text"
        placeholder="name"
        {...rest}
      />
      <div className="error-message">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Input;
