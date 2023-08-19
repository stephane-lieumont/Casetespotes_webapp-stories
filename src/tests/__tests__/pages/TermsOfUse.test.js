/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import { screen } from '@testing-library/dom';
import TermsOfUse from '../../../scripts/pages/TermsOfUse';

describe('Given call UI TermsOfUse page', () => {
  describe('When i call Error404 page', () => {
    let renderPageComponent;

    beforeAll(() => {
      renderPageComponent = jest.fn(TermsOfUse.render);
    });
    test('then i can render it', () => {
      renderPageComponent();

      expect(renderPageComponent).toBeCalled();
      expect(TermsOfUse.wrapper).not.toBeNull();
    });
  });
});

// Test integration
describe('Given call UI TermsOfUse page on html document', () => {
  let content;
  beforeAll(() => {
    document.body.append(TermsOfUse.wrapper);
    content = screen.getByTestId('term-of-rules');
  });
  test('Then it sould have content on HTML document', () => {
    expect(content).toBeTruthy();
  });
});
