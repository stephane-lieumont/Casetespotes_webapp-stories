/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import Header from '../../../scripts/layout/header'
import EditTestimony from '../../../scripts/pages/editTestimony'
import * as mockSingle from '../../__mocks__/single.mock.json'
import { fireEvent, screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { sendDataStory } from '../../../scripts/app.utils'

jest.mock('../../../scripts/store/store')
jest.mock('lottie-web')
jest.mock('../../../scripts/app.utils', () => {
  return {
    sendDataStory: jest.fn()
  }
})

describe('Given call UI Edit Testimony page', () => {
  describe('When i call Edit Testimony page', () => {
    let renderPageComponent
    let renderPopupComponent
    let spyEventListeners
    let spyEventListenersPopup
    beforeAll(() => {
      renderPageComponent = jest.fn(EditTestimony.render)
      renderPopupComponent = jest.fn(EditTestimony.renderPopup)
      spyEventListeners = jest.spyOn(EditTestimony, 'eventListener')
      spyEventListenersPopup = jest.spyOn(EditTestimony, 'eventListenerPopup')
    })
    test('then i can render it with eventListeners', () => {
      renderPageComponent(mockSingle)

      expect(renderPageComponent).toBeCalledTimes(1)
      expect(spyEventListeners).toHaveBeenCalledTimes(1)
    })
    test('then i can render validator popup with eventListeners', () => {
      renderPopupComponent()

      expect(renderPopupComponent).toBeCalledTimes(1)
      expect(spyEventListenersPopup).toHaveBeenCalledTimes(1)
    })
  })
})

// Test integration
describe('Given call UI Edit Testimony page on html document', () => {
  let form
  let submitButton
  let handleSendForm
  let spySendHideAlert
  let spyValidateForm
  let inputName
  let inputStory
  let handleInputName
  let handleInputStory
  let handleInputStoryMaxLenght
  let handleDestroyPopup

  beforeAll(() => {
    spySendHideAlert = jest.spyOn(EditTestimony, 'hideAlert')
    spyValidateForm = jest.spyOn(EditTestimony, 'validateForm')

    document.body.innerHTML = ''
    document.body.append(Header.render())
    document.body.append(EditTestimony.wrapper)

    form = screen.getByTestId('form')
    submitButton = screen.getByTestId('submit')
    inputName = screen.getByTestId('input-name')
    inputStory = screen.getByTestId('input-story')
    handleSendForm = jest.fn(EditTestimony.sendForm)
    handleInputName = jest.fn(EditTestimony.changeInputName)
    handleInputStory = jest.fn(EditTestimony.changeInputStory)
    handleInputStoryMaxLenght = jest.fn(EditTestimony.stopEditable)
    handleDestroyPopup = jest.fn(EditTestimony.destroyPopup)

    submitButton.addEventListener('click', handleSendForm)
    inputName.addEventListener('change', handleInputName)
    inputStory.addEventListener('change', handleInputStory)
    inputStory.addEventListener('keydown', handleInputStoryMaxLenght)
  })
  test('Then it sould have form on HTML document', () => {
    expect(form).toBeTruthy()
    expect(submitButton).toBeTruthy()
  })

  describe('When i send form with empty input', () => {
    test('Then it should appear alert message', async () => {
      userEvent.click(submitButton)

      const alert = await waitFor(() => screen.getByTestId('alert'))
      expect(alert).toBeTruthy()
      expect(alert.innerHTML).toContain('<br>') // 2 error on popup alert

      expect(handleSendForm).toBeCalledTimes(1)
      expect(spyValidateForm).toHaveBeenCalled()
    })
  })

  describe('When i send form with only input name completed', () => {
    test('Then it should appear alert message', async () => {
      fireEvent.change(inputName, { target: { value: 'stephane' } })
      userEvent.click(submitButton)

      const alert = await waitFor(() => screen.getByTestId('alert'))
      expect(alert).toBeTruthy()
      expect(alert.innerHTML).not.toContain('<br>') // 1 error on popup alert not <br>

      expect(inputName.value).toBe('stephane')
      expect(handleSendForm).toBeCalledTimes(1)
      expect(spyValidateForm).toHaveBeenCalled()
    })
  })

  describe('When i send form with all input completed', () => {
    beforeAll(() => {
      sendDataStory.mockResolvedValueOnce({ status: 404 }).mockResolvedValueOnce({ status: 200 })
    })

    test('Then it should not appear alert message', async () => {
      EditTestimony.inputMaxLength = 100 // MaxLenght 100 Caracters
      fireEvent.change(inputStory, { target: { value: 'test de la story' } })
      fireEvent.keyDown(inputStory, { key: 'Enter', code: 13 })
      fireEvent.keyDown(inputStory, { key: 'w', code: 87 })

      expect(handleInputStoryMaxLenght).toHaveReturnedWith(true)

      EditTestimony.inputMaxLength = 10 // MaxLenght 10 Caracters
      fireEvent.change(inputStory, { target: { value: 'test de la story' } })
      fireEvent.keyDown(inputStory, { key: 'w', code: 87 })

      expect(handleInputStoryMaxLenght).toHaveReturnedWith(false)

      userEvent.click(submitButton)

      // When ppup desappear, there ar fadout animation
      const timer = setTimeout(() => {
        const alert = screen.getByTestId('alert')
        expect(alert).not.toBeTruthy()
        clearTimeout(timer)
      }, 500)

      expect(inputName.value).toBe('stephane')
      expect(inputStory.value).toBe('test de la story')
      expect(handleSendForm).toBeCalledTimes(1)
      expect(spyValidateForm).toHaveBeenCalled()
    })

    test('Then popup validation appear', async () => {
      const popup = await waitFor(() => screen.getByTestId('popup'))
      expect(popup).toBeTruthy()

      handleDestroyPopup()
      expect(handleDestroyPopup).toBeCalled()
    })
  })
})
