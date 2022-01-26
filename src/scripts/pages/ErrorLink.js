import Button from '../components/Button'

export default class ErrorLink {
  constructor () {
    this.routeName = 'error_link'
    this.controls = [
      new Button(null, 'apple', 'container__action__item', '#'),
      new Button(null, 'google', 'container__action__item', '#')
    ]
  }

  content () {
    const $node = document.createElement('div')
    $node.classList.add('container__content')

    const content = `
      <h2>Désolé, votre invitation est introuvable</h2>
      <p class="container--small">Demandez au célibataire de vous envoyer une invitation pour pouvoir rédiger un témoignage</p>
      <p class="container--medium"><strong>Vous connaissez des potes célibataires ?<br > Participez à l'expérience de Case Tes Potes en téléchargeant l'application</strong></p>
    `

    $node.innerHTML = content

    return $node
  }

  actions () {
    const $node = document.createElement('div')
    $node.classList.add('container__action', 'container__action--column')

    this.controls.forEach(button => {
      $node.appendChild(button.component)
    })

    return $node
  }
}
