import React from 'react';
import { render } from 'react-native-testing-library';

import FindMeSpinner from './FindMeSpinner';

describe('FindMeSpinner', () => {
  describe('with no non-default props', () => {
    it('renders successfully to match snapshot', () => {
      const rendered = render(<FindMeSpinner />);
      expect(rendered.toJSON()).toBeTruthy();
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });

  describe('with a different color prop', () => {
    it('renders successfully to match snapshot', () => {
      const rendered = render(<FindMeSpinner color="#ddd" />);
      expect(rendered.toJSON()).toBeTruthy();
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
});
