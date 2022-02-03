const Alert = {
  name: 'alert',
  content: 'Contenu de l\'alerte',
  wrapper: null,
  render: () => {
    const $node = document.createElement('div')
    $node.classList.add('alert')
    $node.innerHTML = `<p>${Alert.content}</p>`

    Alert.wrapper = $node

    return $node
  },
  destroyAlert: () => {
    if (Alert.wrapper) {
      Alert.wrapper.classList.add('hide')
      const timer = setTimeout(() => {
        Alert.wrapper.remove()
        clearTimeout(timer)
      }, 150)
    }
  }
}

export default Alert
