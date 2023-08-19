/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import Footer from '../../../scripts/layout/Footer';

describe('Given call UI Footer', () => {
  describe('When i call Footer', () => {
    let renderLayoutComponent;
    beforeAll(() => {
      renderLayoutComponent = jest.fn(Footer.render);
    });
    test('then i can render it', () => {
      renderLayoutComponent();

      expect(renderLayoutComponent).toBeCalledTimes(1);
    });
  });
});
