import Button from '../components/Button'

export default class EditTestimony {
  constructor () {
    this.routeName = 'edit'
    this.controls = [
      new Button('Envoyer le témoignage', 'send', 'container__action__item', null)
    ]

    this.formData = ''
  }

  content (firstname) {
    const $node = document.createElement('div')
    $node.classList.add('container__content')

    const content = `
      <h2>Décrivez votre amie ${firstname}</h2>
      <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote…<br /> La description sera ensuite envoyée à Julie qui décidera de l’afficher sur son profil.</p>
    `

    $node.innerHTML = content

    return $node
  }

  form (inputMaxLength) {
    const $node = document.createElement('form')
    $node.id = 'form-edit-testimony'
    $node.classList.add('form-control')

    let content = `
      <div class="form-control__input">        
        <input type="text"  name="name" value="" />
        <label>Prénom ou surnom</label>
      </div>
      <div class="form-control__input">
        <textarea name="testimony" data-value=""></textarea>
        <label>Témoignage</label>
    `

    if (inputMaxLength) {
      content += `<div class="form-control__char"><span>Reste ${inputMaxLength}</span> caractères</div>`
    }

    content += '</div>'

    $node.innerHTML = content

    $node.querySelector('input').addEventListener('input', e => e.target.setAttribute('value', e.target.value))
    $node.querySelector('textarea').addEventListener('input', e => {
      e.target.dataset.value = e.target.value
      if (inputMaxLength) $node.querySelector('.form-control__char span').innerHTML = inputMaxLength - e.target.value.length
    })

    $node.appendChild(this.actions())

    return $node
  }

  actions () {
    const $node = document.createElement('div')
    $node.classList.add('container__action', 'container__action--column')

    this.controls.forEach(button => {
      button.component.dataset.form = 'form-edit-testimony'
      $node.appendChild(button.component)
    })

    return $node
  }
}
