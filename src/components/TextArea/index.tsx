import React, { TextareaHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import './styles.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, ...rest }) => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textArea.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <div className="textarea-container">
      <p>{label}</p>
      <textarea
        className={` ${!!error && 'textarea-error'}`}
        ref={textArea}
        defaultValue={defaultValue}
        name={name}
        rows={4}
        {...rest}
      />
      <div className="error-message">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default TextArea;
