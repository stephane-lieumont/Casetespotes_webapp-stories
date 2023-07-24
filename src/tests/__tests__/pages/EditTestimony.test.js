/* eslint-disable no-undef */
import Header from '../../../scripts/layout/Header'
import EditTestimony from '../../../scripts/pages/EditTestimony'
import * as mockStory from '../../__mocks__/story.mock.json'
import { fireEvent, screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

jest.mock('../../../scripts/store/store')
jest.mock('lottie-web')

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
      renderPageComponent(mockStory)

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
  let spyValidateForm
  let inputEmail
  let inputStory
  let handleInputStory
  let handleInputStoryMaxLenght

  beforeAll(() => {
    spySendHideAlert = jest.spyOn(EditTestimony, 'hideAlert')
    spyValidateForm = jest.spyOn(EditTestimony, 'validateForm')

    document.body.innerHTML = ''
    document.body.append(Header.render())
    document.body.append(EditTestimony.render(mockStory))

    form = screen.getByTestId('form')
    submitButton = screen.getByTestId('submit')
    inputEmail = screen.getByTestId('input-email')
    inputStory = screen.getByTestId('input-story')
    handleSendForm = jest.fn(EditTestimony.sendForm)
    handleInputEmail = jest.fn(EditTestimony.changeInputEmail)
    handleInputStory = jest.fn(EditTestimony.changeInputStory)
    handleInputStoryMaxLenght = jest.fn(EditTestimony.stopEditable)
    handleDestroyPopup = jest.fn(EditTestimony.destroyPopup)

    submitButton.addEventListener('click', handleSendForm)
    inputEmail.addEventListener('change', handleInputEmail)
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
      fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })
      userEvent.click(submitButton)

      const alert = await waitFor(() => screen.getByTestId('alert'))
      expect(alert).toBeTruthy()
      expect(alert.innerHTML).not.toContain('<br>') // 1 error on popup alert not <br>

      expect(inputEmail.value).toBe('test@gmail.com')
      expect(handleSendForm).toBeCalledTimes(1)
      expect(spyValidateForm).toHaveBeenCalled()
    })
  })

  describe('When i send form with all input completed', () => {
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

      fireEvent.change(inputStory, { target: { value: 'test de la story minimum 30 characters inside input to be validate' } })

      userEvent.click(submitButton)

      // When popup desappear, there ar fadout animation
      const timer = setTimeout(() => {
        const alert = screen.getByTestId('alert')
        expect(alert).not.toBeTruthy()
        clearTimeout(timer)
      }, 500)

      expect(inputEmail.value).toBe('test@gmail.com')
      expect(inputStory.value).toBe('test de la story minimum 30 characters inside input to be validate')
      expect(handleSendForm).toBeCalledTimes(1)
      expect(spyValidateForm).toHaveBeenCalled()

      EditTestimony.destroyPopup()
    })
  })
})
