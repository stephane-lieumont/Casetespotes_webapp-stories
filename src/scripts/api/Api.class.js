export default class Api {
  /**
   * @param {string} url
   */
  constructor (url) {
    this._url = url
  }

  /**
   * @param {String} token
   * @returns {Promise}
   */
  async getProfileByToken (token) {
    return fetch(this._url)
      .then(response => {
        if (token === '1234') {
          return response.json()
        } else {
          return false
        }
      })
      .catch(err => {
        throw new Error('La requete api a échoué : ', err)
      })
  }
}
