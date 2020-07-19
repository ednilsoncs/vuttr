import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Button from '../../components/Button';
import SearchInput from '../../components/Search';
import CloseIcon from '../../assets/images/icon-close.svg';
import './styles.scss';
import api from '../../services/api';

interface tools {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

const Home: React.FC = () => {
  const [tools, setTools] = useState<tools[]>();
  const [isTag, setIsTag] = useState<boolean>(false);

  const handleSearch = async (input: string): Promise<void> => {
    let params = {};
    if (isTag) {
      params = { tags_like: input };
    } else {
      params = { q: input };
    }

    const { data } = await api.get('tools', {
      params,
    });
    setTools(data);
  };
  const handleDelayedSearch = useCallback(debounce(handleSearch, 2000), [
    isTag,
  ]);

  useEffect(() => {
    api.get('tools').then(response => setTools(response.data));
  }, []);
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
              <SearchInput
                type="text"
                onChange={e => {
                  handleDelayedSearch(e.target.value);
                }}
              />
              <input
                checked={isTag}
                className="checkbox"
                type="checkbox"
                onChange={() => setIsTag(!isTag)}
              />
              <span>search in tags only</span>
            </div>
            <div className="add column">
              <Button>Add</Button>
            </div>
          </div>
        </div>
        <div className="column">
          {tools?.map(tool => (
            <div key={tool.id} className="card">
              <div className="header column">
                <h5>{tool.title}</h5>
                <div className="close">
                  <img src={CloseIcon} alt="close icon" />
                </div>
              </div>
              <div className="column">
                <span>{tool.description}</span>
                <div className="tags">
                  {tool.tags.map(tag => (
                    <span>#{tag}</span>
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
