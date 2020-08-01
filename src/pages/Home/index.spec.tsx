import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

describe('@Screen/Home', () => {
  it('should render one item content label Hello Ednilson', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Very Useful Tools to Remember')).toBeTruthy();
  });
});
