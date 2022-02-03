import Store from '../store/store'
import Button from '../components/button'
import Popup from '../components/popup'
import Alert from '../components/alert'
import popupAnimation from '@/assets/lottie/validateCheck.json'
import { sendDataStory } from '../app.utils'

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
            <input type="text"  name="name" value="${Store.formEditStory.inputName}" />
            <label>Prénom ou surnom</label>
          </div>
          <div class="form-control__input">
            <textarea name="story" data-value="${Store.formEditStory.inputStory}">${Store.formEditStory.inputStory}</textarea>
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

  eventListener: (HTMLElement) => {
    HTMLElement.querySelector('input').addEventListener('input', e => {
      e.target.setAttribute('value', e.target.value)
      Store.formEditStory.inputName = e.target.value
      EditTestimony.hideAlert()
    })
    HTMLElement.querySelector('textarea').addEventListener('input', e => {
      e.target.dataset.value = e.target.value
      Store.formEditStory.inputStory = e.target.value
      if (EditTestimony.inputMaxLength)HTMLElement.querySelector('.form-control__char span').innerHTML = EditTestimony.inputMaxLength - e.target.value.length
      e.target.value.length >= EditTestimony.inputMaxLength ? e.target.addEventListener('keydown', EditTestimony.stopEditable) : e.target.removeEventListener('keydown', EditTestimony.stopEditable)
      EditTestimony.hideAlert()
    })
    HTMLElement.querySelector('form button').addEventListener('click', EditTestimony.sendForm)

    // Load Avatar Image
    const image = HTMLElement.querySelector('.avatar img')
    const downloadingImage = new Image()
    downloadingImage.src = image.src
    downloadingImage.onload = () => HTMLElement.classList.add('show')
  },

  renderPopup: () => {
    Popup.title = `Ton témoignage  a été envoyé à ${Popup.data.firstname}!`
    Popup.content = 'Connaitrais tu un(e) pote célib qui aurait besoin de coup de main pour trouver l’âme sœur ?'
    Popup.buttons = [Button.blue.render('En savoir plus', 'thanks', 'close')]
    Popup.animation = popupAnimation
    document.querySelector('body').appendChild(Popup.render())
    EditTestimony.eventListenerPopup()
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

  displayAlert: (errorList) => {
    const errors = []

    errorList.forEach(item => {
      if (item.input) item.input.classList.add('error')
      errors.push(item.error)
    })

    if (Alert.wrapper) Alert.wrapper.remove()

    Alert.content = errors.join('<br />')
    document.querySelector('header').appendChild(Alert.render())
  },

  hideAlert: () => {
    Alert.destroyAlert()
    document.querySelectorAll('.form-control__input').forEach(item => item.classList.remove('error'))
  },

  validateForm: (data) => {
    const inputName = document.querySelector('input[name="name"]').parentNode
    const inputStory = document.querySelector('textarea[name="story"]').parentNode
    const errorList = []

    // Check inputs value length
    if (data.name.length < 3) errorList.push({ error: 'Veuillez saisir le champs prénom', input: inputName })
    if (data.story.length < 3) errorList.push({ error: 'Veuillez rédiger votre témoignage', input: inputStory })

    if (errorList.length === 0) {
      EditTestimony.hideAlert()
      return true
    } else {
      EditTestimony.displayAlert(errorList)
      return false
    }
  },

  sendForm: async (e) => {
    e.preventDefault()
    e.target.classList.add('btn--load')

    const form = document.querySelector('form')
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    if (EditTestimony.validateForm(data)) {
      sendDataStory(data)
        .then((response) => {
          if (response.status === 200) {
            EditTestimony.renderPopup()
            e.target.classList.remove('btn--load')
          } else {
            throw new Error()
          }
        })
        .catch(() => {
          EditTestimony.displayAlert([{ error: 'Un erreur c\'est produite lors de l\'enregistrement des données' }])
          e.target.classList.remove('btn--load')
        })
    } else {
      e.target.classList.remove('btn--load')
    }
  }
}

export default EditTestimony
