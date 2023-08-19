/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import { screen } from '@testing-library/dom';

import ErrorLink from '../../../scripts/pages/ErrorLink';

describe('Given call UI ErrorLink page', () => {
  describe('When i call ErrorLink page', () => {
    let renderPageComponent;

    beforeAll(() => {
      renderPageComponent = jest.fn(ErrorLink.render);
    });
    test('then i can render it with eventListeners', () => {
      renderPageComponent();

      expect(renderPageComponent).toBeCalled();
      expect(ErrorLink.wrapper).not.toBeNull();
    });
  });
});

// Test integration
describe('Given call UI ErrorLink page on html document', () => {
  let content;
  beforeAll(() => {
    document.body.append(ErrorLink.wrapper);
    content = screen.getByTestId('error-link');
  });
  test('Then it sould have content on HTML document', () => {
    expect(content).toBeTruthy();
  });
});
