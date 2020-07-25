import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { debounce } from 'lodash';
import Button from '../../components/Button';
import SearchInput from '../../components/SearchInput';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import CloseIcon from '../../assets/images/icon-close.svg';
import './styles.scss';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface tools {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [tools, setTools] = useState<tools[]>();
  const [isTag, setIsTag] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(true);

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

  const handleSubmit = useCallback(async data => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        title: Yup.string().required('The title is mandatory'),
        link: Yup.string().required('The link is mandatory'),
        tags: Yup.string().required('The tags is mandatory'),
        description: Yup.string().required('The description is mandatory'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
    }
    return;
    api.post('tools', {});
  }, []);

  useEffect(() => {
    api.get('tools').then(response => setTools(response.data));
  }, []);

  return (
    <div className="column home hero is-fullheight">
      <div className="body">
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
              <Button onClick={() => setIsAdd(!isAdd)}>Add</Button>
            </div>
          </div>
        </div>
        <div className="column">
          {tools?.map(tool => (
            <div key={tool.id} className="card">
              <div className="header column">
                <a href={tool.link}>{tool.title}</a>
                <div className="close">
                  <img src={CloseIcon} alt="close icon" />
                </div>
              </div>
              <div className="column">
                <span>{tool.description}</span>
                <div className="tags">
                  {tool.tags.map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`add-card modal ${isAdd && 'is-active'}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add new tool</p>
            <button type="button" onClick={() => setIsAdd(!isAdd)}>
              <img src={CloseIcon} alt="close icon" />
            </button>
          </header>
          <section className="modal-card-body">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input label="Title" name="title" placeholder="nome" />
              <Input label="Link" name="link" placeholder="link" />
              <TextArea
                label="Description"
                name="description"
                placeholder="description"
                rows={4}
              />

              <Input label="Tags" name="tags" placeholder="tags" />
              <div className="button-footer">
                <Button
                  type="submit"
                  onClick={() => formRef.current?.submitForm()}
                >
                  Add tool
                </Button>
              </div>
            </Form>
          </section>
          <footer className=".modal-card-foot" />
        </div>
      </div>
    </div>
  );
};

export default Home;
