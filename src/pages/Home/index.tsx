import React from 'react';
import Button from '../../components/Button';
import SearchInput from '../../components/Search';
import CloseIcon from '../../assets/images/icon-close.svg';
import './styles.scss';

const Home: React.FC = () => {
  return (
    <div className="column home hero is-fullheight">
      <div>
        <div className="column">
          <h1>VUTTER</h1>
          <h2>Very Useful Tools to Remember</h2>
        </div>
        <div className="column">
          <div className="bar columns">
            <div className="search-bar column is-11">
              <SearchInput />
              <input className="checkbox" type="checkbox" />
              <span>search in tags only</span>
            </div>
            <div className="add column">
              <Button>Add</Button>
            </div>
          </div>
        </div>
        <div className="column">
          {[1, 2, 3, 4, 5, 6, 7].map(card => (
            <div className="card">
              <div className="header column">
                <h5>Notion</h5>
                <div className="close">
                  <img src={CloseIcon} alt="close icon" />
                </div>
              </div>
              <div className="column">
                <span>
                  All in one tool to organize teams and ideias. Write, plan,
                  collaborate and get organize
                </span>
                <div className="tags">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(tag => (
                    <span>#organization</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
