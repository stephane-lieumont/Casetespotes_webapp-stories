/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import { screen } from '@testing-library/dom';

import Error404 from '../../../scripts/pages/Error404';

describe('Given call UI Error404 page', () => {
  describe('When i call Error404 page', () => {
    let renderPageComponent;

    beforeAll(() => {
      renderPageComponent = jest.fn(Error404.render);
    });
    test('then i can render it', () => {
      renderPageComponent();

      expect(renderPageComponent).toBeCalled();
      expect(Error404.wrapper).not.toBeNull();
    });
  });
});

// Test integration
describe('Given call UI Error404 page on html document', () => {
  let content;
  beforeAll(() => {
    document.body.append(Error404.wrapper);
    content = screen.getByTestId('404');
  });
  test('Then it sould have content on HTML document', () => {
    expect(content).toBeTruthy();
  });
});
