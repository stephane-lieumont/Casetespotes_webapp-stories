import Button from '../components/Button'

const ErrorLink = {
  wrapper: null,
  /**
   * Render Component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <div class="container__content" data-testid="error-link">
        <h2>Cette invitation n'est pas valide</h2>
        <p class="container--small">Demandez au célibataire de vous envoyer une invitation pour pouvoir rédiger un témoignage</p>
        <p class="container--medium"><strong>Vous connaissez des potes célibataires ?<br > Participez à l'expérience de Case Tes Potes en téléchargeant l'application</strong></p>
      </div>
      <div class="container__action">
        ${Button.playstore.render()}
        ${Button.appstore.render()}
      </div>
    `

    $node.innerHTML = content
    ErrorLink.wrapper = $node
    return $node
  }
}

export default ErrorLink
