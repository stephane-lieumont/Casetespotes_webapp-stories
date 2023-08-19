/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import Avatar from '../../../scripts/components/Avatar';
import mockSingle from '../../__mocks__/single.mock.json';

describe('Given call UI avatar', () => {
  describe('When i create component', () => {
    let createComponent;
    let callback;
    beforeAll(() => {
      createComponent = jest.fn(Avatar.createAvatarSingle);
      callback = jest.fn();
    });
    test('then i can create it', () => {
      createComponent(mockSingle, callback);

      expect(createComponent).toBeCalled();
      expect(callback).not.toHaveBeenCalled();
      expect(Avatar.wrapper).toBeDefined();
    });

    test("then i can't create it without datas", () => {
      createComponent(null, callback);

      expect(createComponent).toBeCalled();
      expect(callback).toHaveBeenCalled();
      expect(Avatar.wrapper).toBeDefined();
    });
  });

  describe('When i render component', () => {
    let $wrapper;
    let renderComponent;
    let createComponent;
    let removeLoad;

    beforeAll(() => {
      Avatar.wrapper = null;
      $wrapper = document.createElement('div');
      renderComponent = jest.fn(Avatar.render);
      createComponent = jest.spyOn(Avatar, 'createAvatarSingle');
      removeLoad = jest.spyOn(Avatar, 'removeLoad');
    });
    test('then i can render it', () => {
      renderComponent(mockSingle, $wrapper);

      expect(renderComponent).toBeCalled();
      expect(createComponent).toHaveBeenCalled();
      expect(removeLoad).toHaveBeenCalled();
      expect(Avatar.wrapper).toBeDefined();
    });

    test('then it can be re render for another screen', () => {
      renderComponent(mockSingle, $wrapper);

      expect(renderComponent).toHaveBeenCalledTimes(1);
      expect(createComponent).not.toHaveBeenCalled();
    });
  });
});
