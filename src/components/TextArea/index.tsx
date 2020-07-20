import React, { TextareaHTMLAttributes } from 'react';
import './styles.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, ...rest }) => {
  return (
    <div className="textarea-container">
      <p>{label}</p>
      <textarea name={name} rows={4} {...rest} />
    </div>
  );
};

export default TextArea;
