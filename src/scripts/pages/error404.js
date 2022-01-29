const Error404 = {
  name: 'error-link',
  render: async () => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <h1>Erreur 404</h1>
      <h2>Désolé, cette page est introuvable</h2>
    `

    $node.innerHTML = content
    $node.classList.add('show')
    return $node
  }
}

export default Error404
