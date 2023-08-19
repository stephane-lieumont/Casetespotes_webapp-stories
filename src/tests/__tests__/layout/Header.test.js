/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';

import Header from '../../../scripts/layout/Header';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Given call UI Header', () => {
  describe('When i call Header', () => {
    let spyDestroyButton;
    let renderComponent;
    let smallComponent;
    let returnButtonComponent;
    let removeReturnButtonComponent;

    beforeAll(() => {
      spyDestroyButton = jest.spyOn(Header, 'destroyBtnReturn');
      renderComponent = jest.fn(Header.render);
      smallComponent = jest.fn(Header.logoLow);
      returnButtonComponent = jest.fn(Header.addBtnReturn);
      removeReturnButtonComponent = jest.fn(Header.destroyBtnReturn);
    });

    test('then i can render it', () => {
      renderComponent();

      expect(renderComponent).toBeCalledTimes(1);
    });

    test('then change small header if it is grow Header', () => {
      smallComponent();

      expect(smallComponent).toBeCalledTimes(1);
    });

    test('then change grow header if it is small Header', () => {
      smallComponent(true);

      expect(smallComponent).toBeCalledTimes(1);
    });

    test('then add return button in header', () => {
      returnButtonComponent();
      jest.runAllTimers();

      expect(returnButtonComponent).toBeCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(spyDestroyButton).toHaveBeenCalledTimes(1);
    });

    test('then delete return button in header', () => {
      removeReturnButtonComponent();
      jest.runAllTimers();

      expect(removeReturnButtonComponent).toBeCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
    });
  });

  describe('When i click on the button return', () => {
    let returnBtn;
    let spyHistoryBack;

    beforeAll(() => {
      Header.addBtnReturn();
      returnBtn = Header.wrapper.querySelector('button');
      spyHistoryBack = jest.spyOn(window.history, 'back');
    });

    test('Then i will return to previous page', () => {
      userEvent.click(returnBtn);

      expect(spyHistoryBack).toHaveBeenCalledTimes(1);
    });
  });
});
