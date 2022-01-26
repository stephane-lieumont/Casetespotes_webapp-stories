import Button from '../components/Button'

export default class Thanks {
  constructor () {
    this.routeName = 'thanks'
    this.controls = [
      new Button(null, 'apple', 'container__action__item', '#'),
      new Button(null, 'google', 'container__action__item', '#')
    ]
  }

  content () {
    const $node = document.createElement('div')
    $node.classList.add('container__content')

    const content = `
      <h2>Merci pour votre réponse !</h2>
      <p class="container--medium">Connaitrais tu un(e) pote célib qui aurait besoin de coup de main pour trouver l’âme sœur ?</p>
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
