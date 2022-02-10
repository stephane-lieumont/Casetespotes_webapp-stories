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
      downloadingImage.src = data.picture
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
