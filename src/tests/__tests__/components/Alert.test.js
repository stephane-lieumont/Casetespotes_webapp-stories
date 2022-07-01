/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import Alert from '../../../scripts/components/alert'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Given call UI alert', () => {
  describe('When i call alert component', () => {
    let renderComponent
    let destroyComponent
    beforeAll(() => {
      renderComponent = jest.fn(Alert.render)
      destroyComponent = jest.fn(Alert.destroyAlert)
    })
    test('then i can render it', () => {
      renderComponent()

      expect(renderComponent).toHaveBeenCalledTimes(1)
      expect(Alert.content).toBeDefined()
      expect(Alert.wrapper).toBeDefined()
    })

    test('then i can destroy it', async () => {
      destroyComponent()
      jest.runAllTimers()

      expect(destroyComponent).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(Alert.wrapper).toBeNull()
    })
  })
})
