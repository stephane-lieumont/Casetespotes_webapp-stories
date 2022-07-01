/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import * as mockConfig from '../__config__/app.config.mock'
import * as mockStoryForm from '../__mocks__/storyForm.mock.json'
import * as mockStory from '../__mocks__/story.mock.json'
import fetchMock from 'jest-fetch-mock'
import Api from '../../scripts/api/Api.class'

fetchMock.enableMocks()
jest.mock('../../scripts/app.conf.js', () => mockConfig)

describe('Given fetch data from API', () => {
  let handleRequestGet
  let handleRequestPost

  beforeAll(() => {
    fetch.resetMocks()
  })
  describe('When the url have valid token', () => {
    test('It should getStoryObject', async () => {
      const token = 'fdsqfds'
      const singleId = '62bd4c5aa9a92f00120d82bc'

      fetch.mockResponseOnce(JSON.stringify(mockStory), { status: 200, headers: { 'content-type': 'application/json' } })

      handleRequestGet = jest.fn(async () => {
        const mockApi = new Api(singleId, token)
        return await mockApi.getStory()
      })

      const result = await handleRequestGet()

      expect(handleRequestGet).toHaveBeenCalled()
      expect(result.id).toBeTruthy()
      expect(result.singleId).toBe(singleId)
    })
  })

  describe('When the url have invalid token', () => {
    test('It should getProfileObject', async () => {
      fetch.mockResponseOnce('{}', { status: 200, headers: { 'content-type': 'application/json' } })

      handleRequestGet = jest.fn(async () => {
        const mockApi = new Api('test', 'test')
        try {
          return await mockApi.getStory()
        } catch {
          throw new TypeError()
        }
      })

      await expect(handleRequestGet()).rejects.toThrowError()
      expect(handleRequestGet).toHaveBeenCalled()
    })
  })

  describe('When request server fail 500', () => {
    beforeAll(async () => {
      fetchMock.mockImplementationOnce(
        jest.fn().mockRejectedValueOnce(() => { throw new Error('500') })
      )
      handleRequestGet = jest.fn(async () => {
        const mockApi = new Api('6095437aba548853b8fc076d', 'fdsqfds')
        return await mockApi.getStory('fail')
      })
    })
    test('It should getProfileObject', async () => {
      expect.assertions(1)
      await expect(handleRequestGet()).rejects.toThrowError()
    })
  })

  describe('When I send form testimony', () => {
    test('it should send form on Api', async () => {
      fetch.mockResponseOnce('{"message":"OK"}', { status: 200, headers: { 'content-type': 'application/json' } })

      handleRequestPost = jest.fn(async () => {
        const mockApi = new Api()
        return mockApi.sendFormStory(mockStoryForm)
      })

      const result = await handleRequestPost()

      expect(handleRequestPost).toHaveBeenCalled()
      expect(result.message).toBe('OK')
    })
  })

  describe('When I send form testimony and i have api error', () => {
    test('it should return an error', async () => {
      fetch.mockResponseOnce('{}', { status: 500, headers: { 'content-type': 'application/json' } })

      handleRequestPost = jest.fn(async () => {
        const mockApi = new Api('6095437aba548853b8fc076d', 'fdsqfds')
        return mockApi.sendFormStory(mockStoryForm)
      })

      expect.assertions(1)
      await expect(handleRequestPost()).rejects.toThrowError()
    })
  })
})
