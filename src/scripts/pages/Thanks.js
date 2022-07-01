import Button from '../components/Button'
import { router, routes, parseLocation, getRoute, getComponentByPath } from '../routes/router'

const Thanks = {
  wrapper: null,
  /**
   * Render Component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `      
      <div class="container__content" data-testid="thanks">
        <h2>Merci pour votre réponse !</h2>
        <p class="container--medium">Connaitrais tu un(e) pote célib qui aurait besoin de coup de main pour trouver l’âme sœur ?</p>
      </div>
      <div class="container__action">
        ${Button.playstore.render()}
        ${Button.appstore.render()}
      </div>
    `

    $node.innerHTML = content
    Thanks.eventListeners()
    Thanks.wrapper = $node
    return $node
  },

  /**
   * EventListeners on component
   */
  eventListeners: () => {
    window.addEventListener('hashchange', Thanks.redirectToRoute)
  },

  /**
   * Change redirection actions
   * @param {HashChangeEvent} e
   */
  redirectToRoute: (e) => {
    const path = parseLocation()
    const component = getComponentByPath(path, routes)
    component.params.restrictedAccess ? location.href = getRoute('error') : router()
  }
}

export default Thanks
