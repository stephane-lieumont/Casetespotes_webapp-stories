import Button from '../components/Button'

export default class Home {
  constructor () {
    this.routeName = 'home'
    this.controls = [
      new Button('Ecrire un témoignage', 'edit', 'container__action__item', null),
      new Button('Enregistrer un témoignage', 'movie', 'container__action__item', null),
      new Button('Enregistrer un témoignage', 'mic', 'container__action__item', null)
    ]
  }

  avatar (path, firstname) {
    const $node = document.createElement('div')
    $node.classList.add('avatar')

    const content = `
      <img width="350" height="350" src="${path}" alt="${firstname}">
    `

    $node.innerHTML = content

    return $node
  }

  content (firstname) {
    const $node = document.createElement('div')
    $node.classList.add('container__content')

    const content = `
      <h2>Décrivez votre amie ${firstname}</h2>
      <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote…<br />La description sera ensuite envoyée à ${firstname} qui décidera de l’afficher sur son profil.</p>
      <p class="container--medium"><strong>Choisissez comment <br /> vous voulez faire votre témoignage</strong></p>
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
