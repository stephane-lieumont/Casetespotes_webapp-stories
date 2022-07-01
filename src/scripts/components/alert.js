const Alert = {
  content: 'Contenu de l\'alerte',
  wrapper: null,
  /**
   * Render component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('div')
    $node.classList.add('alert')
    $node.innerHTML = `<p data-testid="alert">${Alert.content}</p>`

    Alert.wrapper = $node

    return $node
  },
  /**
   * Destroy Alert Component
   */
  destroyAlert: () => {
    if (Alert.wrapper) {
      Alert.wrapper.classList.add('hide')
      const timer = setTimeout(() => {
        if (Alert.wrapper) {
          Alert.wrapper.remove()
          Alert.wrapper = null
        }

        clearTimeout(timer)
      }, 150)
    }
  }
}

export default Alert
