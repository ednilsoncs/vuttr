import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

describe('@Screen/Home', () => {
  it('should render one item content label Hello Ednilson', () => {
    const { getByText } = render(<Home />);

    expect(
      getByText(
        'Hello, this was done or deployed using continuous integration',
      ),
    ).toBeTruthy();
  });
});
