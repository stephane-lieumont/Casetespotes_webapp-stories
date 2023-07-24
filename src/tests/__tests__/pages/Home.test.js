/* eslint-disable no-undef */
import Home from '../../../scripts/pages/Home'
import { screen } from '@testing-library/dom'
import * as mockSingle from '../../__mocks__/single.mock.json'

describe('Given call UI Home page', () => {
  describe('When i call Home page', () => {
    let renderPageComponent

    beforeAll(() => {
      renderPageComponent = jest.fn(Home.render)
    })
    test('then i can render it', () => {
      renderPageComponent(mockSingle)

      expect(renderPageComponent).toBeCalled()
      expect(Home.wrapper).not.toBeNull()
    })
  })
})

// Test integration
describe('Given call UI ErrorLink page on html document', () => {
  let content
  beforeAll(() => {
    document.body.append(Home.wrapper)
    content = screen.getByTestId('home')
  })
  test('Then it sould have content on HTML document', () => {
    expect(content).toBeTruthy()
  })
})
