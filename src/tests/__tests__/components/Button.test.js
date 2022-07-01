/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Button from '../../../scripts/components/button'
import * as router from '../../../scripts/routes/router'

jest.mock('../../../scripts/routes/router')

describe('Given call UI alert', () => {
  describe('When i call alert component', () => {
    let getPathLink
    let expectRouteValue
    let renderComponentDefault
    let renderComponentBlue
    let renderComponentEdit
    let renderComponentMovie
    let renderComponentMic
    let renderComponentSend
    let renderComponentPlaystore
    let renderComponentAppstore

    beforeAll(() => {
      expectRouteValue = 'test'
      router.getRoute.mockReturnValue(expectRouteValue)
      getPathLink = jest.spyOn(Button, 'getPathLink')

      renderComponentDefault = jest.fn(Button.default.render)
      renderComponentBlue = jest.fn(Button.blue.render)
      renderComponentEdit = jest.fn(Button.edit.render)
      renderComponentMovie = jest.fn(Button.movie.render)
      renderComponentMic = jest.fn(Button.mic.render)
      renderComponentSend = jest.fn(Button.send.render)
      renderComponentPlaystore = jest.fn(Button.playstore.render)
      renderComponentAppstore = jest.fn(Button.appstore.render)
    })

    test('then i can render default button', () => {
      const $node = renderComponentDefault('label', 'home', 'test')
      const $node2 = renderComponentDefault('label', 'home')

      expect(renderComponentDefault).toBeCalledTimes(2)
      expect($node).toContain('button')
      expect($node).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect($node2).toContain('button')
      expect($node2).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect(getPathLink).toHaveBeenCalled()
    })

    test('then i can render blue button', () => {
      const $node = renderComponentBlue('label', 'home', 'test')
      const $node2 = renderComponentBlue('label', 'home')

      expect(renderComponentBlue).toBeCalledTimes(2)
      expect($node).toContain('button')
      expect($node).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect($node2).toContain('button')
      expect($node2).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect(getPathLink).toHaveBeenCalled()
    })

    test('then i can render edit button', () => {
      const $node = renderComponentEdit('label', 'home', 'test')
      const $node2 = renderComponentEdit('label', 'home')

      expect(renderComponentEdit).toBeCalledTimes(2)
      expect($node).toContain('button')
      expect($node).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect($node2).toContain('button')
      expect($node2).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect(getPathLink).toHaveBeenCalled()
    })

    test('then i can render movie button', () => {
      const $node = renderComponentMovie('label', 'home', 'test')
      const $node2 = renderComponentMovie('label', 'home')

      expect(renderComponentMovie).toBeCalledTimes(2)
      expect($node).toContain('button')
      expect($node).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect($node2).toContain('button')
      expect($node2).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect(getPathLink).toHaveBeenCalled()
    })

    test('then i can render mic button', () => {
      const $node = renderComponentMic('label', 'home', 'test')
      const $node2 = renderComponentMic('label', 'home')

      expect(renderComponentMic).toBeCalledTimes(2)
      expect($node).toContain('button')
      expect($node).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect($node2).toContain('button')
      expect($node2).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect(getPathLink).toHaveBeenCalled()
    })

    test('then i can render send button', () => {
      const $node = renderComponentSend('label', 'home', 'test')
      const $node2 = renderComponentSend('label', 'home')

      expect(renderComponentSend).toBeCalledTimes(2)
      expect($node).toContain('button')
      expect($node).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect($node2).toContain('button')
      expect($node2).toContain(`onclick="location.href='${expectRouteValue}'`)
      expect(getPathLink).toHaveBeenCalled()
    })

    test('then i can render playstore button', () => {
      const $node = renderComponentPlaystore()

      expect(renderComponentPlaystore).toBeCalledTimes(1)
      expect($node).toContain('<a href=')
    })

    test('then i can render appstore button', () => {
      const $node = renderComponentAppstore()

      expect(renderComponentAppstore).toBeCalledTimes(1)
      expect($node).toContain('<a href=')
    })
  })
})
