const Error404 = {
  wrapper: null,
  /**
   * Render component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <h1 data-testid="404">Erreur 404</h1>
      <h2>Désolé, cette page est introuvable</h2>
    `

    $node.innerHTML = content
    Error404.wrapper = $node
    return $node
  }
}

export default Error404
