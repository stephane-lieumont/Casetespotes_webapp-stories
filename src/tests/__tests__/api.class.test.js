/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import * as mockConfig from '../__config__/app.config.mock'
import * as mockSingle from '../__mocks__/single.mock.json'
import * as mockStory from '../__mocks__/story.mock.json'
import fetchMock from 'jest-fetch-mock'
import Api from '../../scripts/api/Api.class'

fetchMock.enableMocks()

describe('Given fetch data from API', () => {
  let handleRequestGet
  let handleRequestPost

  beforeAll(() => {
    fetch.mockClear()
    fetch.mockResponse(JSON.stringify(mockSingle))
  })
  describe('When the url have valid token', () => {
    beforeAll(async () => {
      handleRequestGet = jest.fn(async () => {
        const mockApi = new Api('https://www.ctp.com/')
        mockApi.token = mockConfig.conf.apptokenTMP
        return await mockApi.getProfileByToken('test')
      })
    })
    test('It should getProfileObject', async () => {
      const result = await handleRequestGet()

      expect(handleRequestGet).toHaveBeenCalled()
      expect(result.id).toBeTruthy()
    })
  })

  describe('When the url have invalid token', () => {
    beforeAll(async () => {
      handleRequestGet = jest.fn(async () => {
        const mockApi = new Api('https://www.ctp.com/')
        mockApi.token = mockConfig.conf.apptokenTMP
        return await mockApi.getProfileByToken('fail')
      })
    })
    test('It should getProfileObject', async () => {
      const result = await handleRequestGet()

      expect(handleRequestGet).toHaveBeenCalled()
      expect(result).toBeFalsy()
    })
  })

  describe('When request server fail 500', () => {
    beforeAll(async () => {
      fetchMock.mockImplementationOnce(
        jest.fn().mockRejectedValueOnce(() => { throw new Error('500') })
      )
      handleRequestGet = jest.fn(async () => {
        const mockApi = new Api('https://www.ctp.com/')
        mockApi.token = mockConfig.conf.apptokenTMP
        return await mockApi.getProfileByToken('fail')
      })
    })
    test('It should getProfileObject', async () => {
      expect.assertions(1)
      await expect(handleRequestGet()).rejects.toThrowError()
    })
  })

  describe('When I send form testimony', () => {
    beforeAll(async () => {
      handleRequestPost = jest.fn(async () => {
        const mockApi = new Api('https://www.ctp.com/')
        return await mockApi.sendFormStory(mockStory)
      })
    })
    test('it should send form on Api', async () => {
      const result = await handleRequestPost()

      expect(handleRequestPost).toHaveBeenCalled()
      expect(result.status).toBe(200)
    })
  })

  describe('When I send form testimony and i have api error', () => {
    beforeAll(async () => {
      handleRequestPost = jest.fn(async () => {
        const mockApi = new Api('https://www.ctp.com/')
        return await mockApi.sendFormStory({})
      })
    })
    test('it should return an error', async () => {
      expect.assertions(1)
      await expect(handleRequestPost()).rejects.toThrowError()
    })
  })
})
