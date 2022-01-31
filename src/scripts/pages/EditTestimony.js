import Button from '../components/button'
import Popup from '../components/popup'
import popupAnimation from '@/assets/lottie/validateCheck.json'

const EditTestimony = {
  inputMaxLength: 280,
  data: null,
  render: (data) => {
    Object.defineProperty(Popup, 'data', {
      value: data,
      writable: false
    })

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
            <label>Votre témoignage</label>
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

  renderPopup: () => {
    Popup.title = `Ton témoignage  a été envoyé à ${Popup.data.firstname}!`
    Popup.content = 'Connaitrais tu un(e) pote célib qui aurait besoin de coup de main pour trouver l’âme sœur ?'
    Popup.buttons = [Button.blue.render('En savoir plus', 'thanks', 'close')]
    Popup.animation = popupAnimation
    document.querySelector('body').appendChild(Popup.render())
    EditTestimony.eventListenerPopup()
  },

  eventListener: (HTMLElement) => {
    HTMLElement.querySelector('input').addEventListener('input', e => e.target.setAttribute('value', e.target.value))
    HTMLElement.querySelector('textarea').addEventListener('input', e => {
      e.target.dataset.value = e.target.value
      if (EditTestimony.inputMaxLength)HTMLElement.querySelector('.form-control__char span').innerHTML = EditTestimony.inputMaxLength - e.target.value.length

      e.target.value.length >= EditTestimony.inputMaxLength ? e.target.addEventListener('keydown', EditTestimony.stopEditable) : e.target.removeEventListener('keydown', EditTestimony.stopEditable)
    })
    HTMLElement.querySelector('form button').addEventListener('click', EditTestimony.sendForm)

    // Load Avatar Image
    const image = HTMLElement.querySelector('.avatar img')
    const downloadingImage = new Image()
    downloadingImage.src = image.src
    downloadingImage.onload = () => HTMLElement.classList.add('show')
  },

  eventListenerPopup: () => {
    Popup.wrapper.querySelector('button[data-action="close"]').addEventListener('click', () => {
      Popup.destroyPopup()
    })
  },

  stopEditable: (e) => {
    if (e.key !== 'Enter' && e.key !== 'Backspace') {
      e.preventDefault()
      e.stopPropagation()
    }
  },

  sendForm: async (e) => {
    e.preventDefault()
    e.target.classList.add('btn--load')

    const form = document.querySelector('form')
    const formData = new FormData(form)

    EditTestimony.sendDataToAPI(formData)

    // Simulate sendForm API
    const timer = setTimeout(() => {
      EditTestimony.renderPopup()
      e.target.classList.remove('btn--load')
      clearTimeout(timer)
    }, 1000)
  },

  sendDataToAPI: (formData) => {
    // eslint-disable-next-line no-unused-vars
    const data = Object.fromEntries(formData.entries())
    /**
    * REQUEST SEND TO API HERE {data}
    **/
  }
}

export default EditTestimony
