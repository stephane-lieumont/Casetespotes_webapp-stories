/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import Footer from '../../../scripts/layout/Footer';
import Header from '../../../scripts/layout/Header';
import Thanks from '../../../scripts/pages/Thanks';
import { getRoute } from '../../../scripts/routes/router';

describe('Given call UI Thanks page', () => {
  describe('When i call Thanks page', () => {
    let renderPageComponent;
    let spyEventListeners;

    beforeAll(() => {
      renderPageComponent = jest.fn(Thanks.render);
      spyEventListeners = jest.spyOn(Thanks, 'eventListeners');
    });
    test('then i can render it with eventListeners', () => {
      renderPageComponent();

      expect(renderPageComponent).toBeCalled();
      expect(spyEventListeners).toHaveBeenCalled();
      expect(Thanks.wrapper).not.toBeNull();
    });
  });
});

// Test integration
describe('Given call UI ErrorLink page on html document', () => {
  let content;
  let logo;
  let handleRedirectToRoute;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    const $wrapper = document.querySelector('#app');
    $wrapper.append(Header.render());
    $wrapper.append(Thanks.wrapper);
    $wrapper.append(Footer.render());
    content = screen.getByTestId('thanks');
    logo = screen.getByTestId('logo');
    handleRedirectToRoute = jest.fn(Thanks.redirectToRoute);
    handleRedirectToRoute();
  });
  test('Then it sould have content on HTML document', () => {
    Object.defineProperty(window, 'location', { value: { hash: getRoute('terms-of-use') } });
    handleRedirectToRoute();
  });
  test("Then we can't return on form page", () => {
    Object.defineProperty(window, 'location', { value: { hash: getRoute('edit-testimony') } });
    handleRedirectToRoute();
  });
});
