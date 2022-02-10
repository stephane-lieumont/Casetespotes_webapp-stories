/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { sendDataStory, getDataByUrl } from '../../scripts/app.utils'
import * as mockConfig from '../__config__/app.config.mock'
import * as mockSingle from '../__mocks__/single.mock.json'
import Api from '../../scripts/api/Api.class'

jest.mock('../../scripts/app.conf.js', () => mockConfig)
jest.mock('../../scripts/api/Api.class')

describe('Given fetch data from API', () => {
  describe('When I call API datas with good URL', () => {
    beforeEach(() => {
      Api.mockClear()
    })
    test('Then i receive Object with Single Profile', async () => {
      const mockGetProfileByToken = jest.fn().mockResolvedValue(mockSingle)
      Api.mockImplementation(() => {
        return {
          getProfileByToken: mockGetProfileByToken
        }
      })

      const handleRequestProfile = jest.fn(getDataByUrl)
      await expect(handleRequestProfile()).resolves.toBe(mockSingle)

      // it should execute all function called
      expect(handleRequestProfile).toBeCalledTimes(1)
      expect(mockGetProfileByToken).toBeCalledTimes(1)
      expect(Api).toHaveBeenCalled()
    })
    test('Then an Error occured during the request', async () => {
      const mockGetProfileByToken = jest.fn().mockRejectedValueOnce(new Error('Error data'))

      Api.mockImplementation(() => {
        return {
          getProfileByToken: mockGetProfileByToken
        }
      })

      const handleRequestProfile = jest.fn(getDataByUrl)
      await expect(handleRequestProfile()).rejects.toThrow('Error data')
    })
  })
  describe('When I call API datas with good URL', () => {
    let getProfileByToken
    beforeAll(() => {
      Api.mockClear()
      const mockApi = new Api('momo')
      getProfileByToken = jest.fn(mockApi.getProfileByToken)
    })
    test('Then i receive Object with Single Profile', async () => {
      await getProfileByToken('test')

      expect(getProfileByToken).toHaveBeenCalled()
      expect(getProfileByToken).toHaveBeenCalledWith('test')
    })
  })
})

describe('Given fetch data to post FormData', () => {
  describe('When I sen FormData', () => {
    let handleRequestSendForm
    beforeAll(() => {
      const mockPostForm = jest.fn().mockResolvedValueOnce({})
      Api.mockImplementation(() => {
        return {
          sendFormStory: mockPostForm
        }
      })
      handleRequestSendForm = jest.fn(sendDataStory)
    })
    test('Then it should return status code 200', async () => {
      expect(handleRequestSendForm()).toBeTruthy()
      expect(handleRequestSendForm).toHaveBeenCalledTimes(1)
    })
  })
})
