import Button from '../components/button'
import { getRoute } from '../routes/router'

const Thanks = {
  render: async () => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <h2>Merci pour votre réponse !</h2>
      <div class="container__content">
        <p class="container--medium">Connaitrais tu un(e) pote célib qui aurait besoin de coup de main pour trouver l’âme sœur ?</p>
      </div>
      <div class="container__action">
        ${Button.playstore.render()}
        ${Button.appstore.render()}
      </div>
    `

    $node.innerHTML = content
    $node.classList.add('show')
    document.querySelector('.logo').onclick = null
    Thanks.eventListeners()
    return $node
  },

  eventListeners: () => {
    window.addEventListener('hashchange', Thanks.redirectToRoute)
  },

  redirectToRoute: (e) => {
    location.href = getRoute('error')
  }
}

export default Thanks
