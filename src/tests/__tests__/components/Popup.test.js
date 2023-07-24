/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import Popup from '../../../scripts/components/Popup'
import Button from '../../../scripts/components/Button'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Given call UI Popup', () => {
  describe('When i call alert component', () => {
    let handleButtonRender
    let renderComponent
    let destroyComponent

    beforeAll(() => {
      handleButtonRender = jest.spyOn(Popup, 'buttonsRender')
      renderComponent = jest.fn(Popup.render)
      destroyComponent = jest.fn(Popup.destroyPopup)
      Popup.animation = 'animation'
      Popup.buttons = [Button.default.render()]
    })

    test('then i can render it', () => {
      renderComponent()

      expect(renderComponent).toBeCalledTimes(1)
      expect(handleButtonRender).toHaveBeenCalled()
    })

    test('then i can destroy it', async () => {
      destroyComponent()
      jest.runAllTimers()

      expect(destroyComponent).toBeCalledTimes(1)
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(Popup.wrapper).toBeNull()
    })
  })
})
