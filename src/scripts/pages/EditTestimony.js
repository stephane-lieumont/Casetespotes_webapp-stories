import Button from '../components/button'

const EditTestimony = {
  name: 'home',
  inputMaxLength: 280,
  render: (data) => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <div class="avatar">
        <img src="${data.picture}" alt="${data.firstname}"/>
      </div>
      <div class="container__content">
        <h2>Décrivez votre amie ${data.firstname}</h2>
        <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote…<br /> La description sera ensuite envoyée à Julie qui décidera de l’afficher sur son profil.</p>
        <form class="form-control">
          <div class="form-control__input">
            <input type="text"  name="name" value="" />
            <label>Prénom ou surnom</label>
          </div>
          <div class="form-control__input">
            <textarea name="testimony" data-value=""></textarea>
            <label>Témoignage</label>
            <div class="form-control__char"><span>Reste ${EditTestimony.inputMaxLength}</span> caractères</div>
          </div>
          <div class="container__action">
            ${Button.send.render('Envoyer le témoignage')}
          </div>
        </form>
      </div>
    `

    $node.innerHTML = content
    EditTestimony.eventListener($node)

    return $node
  },

  eventListener: (HTMLElement) => {
    HTMLElement.querySelector('input').addEventListener('input', e => e.target.setAttribute('value', e.target.value))
    HTMLElement.querySelector('textarea').addEventListener('input', e => {
      e.target.dataset.value = e.target.value
      if (EditTestimony.inputMaxLength)HTMLElement.querySelector('.form-control__char span').innerHTML = EditTestimony.inputMaxLength - e.target.value.length
    })
    HTMLElement.querySelector('form button').addEventListener('click', EditTestimony.sendForm)

    // Load Avatar Image
    const image = HTMLElement.querySelector('.avatar img')
    const downloadingImage = new Image()
    downloadingImage.src = image.src
    downloadingImage.onload = () => HTMLElement.classList.add('show')
  },

  sendForm: (e) => {
    e.preventDefault()
    const form = document.querySelector('form')
    const formData = new FormData(form)
    // eslint-disable-next-line no-unused-vars
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }
}

export default EditTestimony
