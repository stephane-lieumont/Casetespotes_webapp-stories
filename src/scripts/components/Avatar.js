const Avatar = {
  wrapper: null,
  /**
   * Render component
   * @param {Object} data
   * @param {HTMLElement} container
   * @returns {HTMLElement}
   */
  render: (data, container) => {
    if (Avatar.wrapper) {
      container.classList.remove('load')
      return Avatar.wrapper
    } else {
      return Avatar.createAvatarSingle(data, Avatar.removeLoad(container))
    }
  },
  /**
   * Create Component Avatar Once Time
   * @param {Object} data
   * @param {Function} callback
   * @returns {HTMLElement}
   */
  createAvatarSingle: (data, callback) => {
    if (data) {
      const $node = document.createElement('div')
      $node.classList.add('avatar')
      $node.alt = data.firstname + ' picture'

      // Load Avatar Image
      const downloadingImage = new Image()
      if (data.picture != null) {
        downloadingImage.src = data.picture
      } else {
        downloadingImage.src = 'https://us.123rf.com/450wm/kritchanut/kritchanut1406/kritchanut140600093/29213195-homme-photo-de-profil-silhouette-avatar.jpg?ver=6'
      }
      downloadingImage.onload = callback

      $node.appendChild(downloadingImage)
      Avatar.wrapper = $node

      return $node
    } else {
      callback()
      return null
    }
  },

  removeLoad: (container) => {
    container.classList.remove('load')
  }
}

export default Avatar
