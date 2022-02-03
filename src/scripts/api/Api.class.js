import { conf } from '../app.conf'

export default class Api {
  /**
   * @param {string} url
   */
  constructor (url = null) {
    this._url = url
  }

  /**
   * @param {String} token
   * @returns {Promise}
   */
  async getProfileByToken (token) {
    return fetch(this._url)
      .then(response => {
        if (token === conf.apptokenTMP) {
          return response.json()
        } else {
          return false
        }
      })
      .catch(err => {
        throw new Error('La requete api a échoué : ', err)
      })
  }

  async sendFormStory (data) {
    console.log(data)
    // Simulate Call API Post
    return new Promise(function (resolve) {
      setTimeout(resolve, 1000)
    }).then(function () {
      return { status: 200 }
    })
  }
}
