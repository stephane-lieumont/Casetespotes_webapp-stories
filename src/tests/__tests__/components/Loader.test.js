/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import lottie from 'lottie-web';
import Loader from '../../../scripts/components/Loader';

jest.mock('lottie-web');

describe('Given UI Animation', () => {
  describe('When i call loader component', () => {
    let createLoader;
    let handleRenderLoader;
    let handleDestroyLoader;

    beforeAll(() => {
      lottie.loadAnimation.mockReturnValue({});
      lottie.destroy.mockReturnValue({});
      lottie.loadAnimation.mockImplementation(() => {
        return {
          destroy: jest.fn(),
        };
      });

      createLoader = jest.spyOn(Loader, 'createLoader');
      handleRenderLoader = jest.fn(Loader.render);
      handleDestroyLoader = jest.fn(Loader.destroyLoader);
    });

    test('Then I can render Loader', () => {
      handleRenderLoader();

      expect(handleRenderLoader).toBeCalled();
      expect(createLoader).toHaveBeenCalled();
    });

    test('Then I can destroy Loader', () => {
      handleDestroyLoader();

      expect(handleDestroyLoader).toBeCalled();
    });
  });
});
