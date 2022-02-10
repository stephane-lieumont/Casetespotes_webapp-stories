import { conf } from '../app.conf'

export default class Api {
  /**
   * @param {string} url
   */
  constructor (url) {
    this._url = url
    this._token = conf.apptokenTMP
  }

  get token () {
    return this._token
  }

  set token (value) {
    this._token = value
  }

  /**
   * @param {String} token
   * @returns {Promise}
   */
  getProfileByToken (token) {
    return fetch(this._url)
      .then(response => {
        if (token === this.token) {
          return response.json()
        } else {
          return false
        }
      })
      .catch(err => {
        throw new Error('La requete api a échoué : ', err)
      })
  }

  /**
   * @param {Object} data
   * @returns {Response}
   */
  sendFormStory (data) {
    // Simulate Call API Post
    return new Promise(function (resolve) {
      if (!data.name) throw new Error()
      setTimeout(resolve, 1000)
    }).then(function () {
      return { status: 200 }
    }).catch(err => {
      throw new Error('Erreur de l\'envois des données :', err)
    })
  }
}
