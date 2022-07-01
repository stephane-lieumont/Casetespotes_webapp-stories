import { conf } from '../app.conf'

export default class Api {
  constructor (singleId, token) {
    this._apiUrl = conf.apiScheme + '://' + conf.apiHost + ':' + conf.apiPort
    this._token = token
    this._singleId = singleId
  }

  /**
   * @param {String} token
   * @returns {Promise}
   */
  getStory = () => {
    console.log(this._apiUrl + '/stories/' + this._token + '/' + this._singleId)
    return fetch(this._apiUrl + '/stories/' + this._token + '/' + this._singleId)
      .then(async response => {
        const data = await response.json()

        if (!response.ok) {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }

        if (data.status !== 'draft') {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }

        return data
      })
      .catch(err => {
        throw new Error('La requete get api a échoué : ', err)
      })
  }

  /**
   * @param {Object} data
   * @returns {Response}
   */
  sendFormStory = (data) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(this._apiUrl + '/stories', requestOptions)
      .then(async response => {
        const data = await response.json()

        if (!response.ok) {
          const error = (data && data.error) || response.status
          return Promise.reject(error)
        }

        return data
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}
