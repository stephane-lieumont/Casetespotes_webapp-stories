const Error404 = {
  name: 'error-link',
  params: {},
  render: async () => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <h1>Erreur 404</h1>
      <h2>Désolé, cette page est introuvable</h2>
    `

    $node.innerHTML = content

    return $node
  }
}

export default Error404
