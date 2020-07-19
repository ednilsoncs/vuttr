import React, { InputHTMLAttributes } from 'react';
import './styles.scss';
import Icon from '../../assets/images/icon-search.svg';

type Props = InputHTMLAttributes<HTMLInputElement>;

const SearchInput: React.FC<Props> = () => {
  return (
    <div className="search-input">
      <img src={Icon} alt="Icon search" />
      <input className="search" placeholder="search" />
    </div>
  );
};

export default SearchInput;
