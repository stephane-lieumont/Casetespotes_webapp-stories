/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import Header from '../../scripts/layout/header'
import { router } from '../../scripts/routes/router'
import * as mockSingle from '../__mocks__/single.mock.json'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Given router function', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.querySelector('#app').append(Header.render())
    document.querySelector('#app').append(document.createElement('main'))
  })
  describe('When i call router fonction with data', () => {
    test('Then it should route execute Home component', () => {
      const handleRouter = jest.fn(router)
      handleRouter(mockSingle)
      jest.runAllTimers()

      expect(handleRouter).toBeCalled()
      expect(setTimeout).toHaveBeenCalledTimes(1)
    })
  })
  describe('When i call router fonction without data', () => {
    test('Then it should route execute LinkError component', () => {
      const handleRouter = jest.fn(router)
      handleRouter()
      jest.runAllTimers()

      expect(handleRouter).toBeCalled()
      expect(setTimeout).toHaveBeenCalledTimes(1)
    })
  })
  describe('When i call router fonction on page not found', () => {
    test('Then it should route execute Error404 component', () => {
      Object.defineProperty(window, 'location', { value: { hash: '#/test' } })
      const handleRouter = jest.fn(router)
      handleRouter()
      jest.runAllTimers()

      expect(handleRouter).toBeCalled()
      expect(setTimeout).toHaveBeenCalledTimes(1)
    })
  })
})
