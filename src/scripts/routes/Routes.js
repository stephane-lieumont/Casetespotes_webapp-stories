import Home from '../pages/Home'
import ErrorLink from '../pages/ErrorLink'
import EditTestimony from '../pages/EditTestimony'
import Button from '../components/Button'
import Thanks from '../pages/Thanks'

const home = new Home()
const editTestimony = new EditTestimony()
const errorLink = new ErrorLink()
const thanks = new Thanks()

export default class Routes {
  constructor (data) {
    this.$header = document.querySelector('header')
    this.$main = document.querySelector('main')
    this.$wrapper = null
    this.$popup = null
    this.$popupActions = []

    this._layout = {
      avatar: null,
      content: null,
      form: null,
      actions: null
    }

    this._data = data

    this.goto = this.goto.bind(this)
    this.sendEmailTestimony = this.sendEmailTestimony.bind(this)
    this.addPopupSendSuccess = this.addPopupSendSuccess.bind(this)
    this.removePopup = this.removePopup.bind(this)
  }

  init () {
    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('container')

    if (this._data.id) {
      this._layout.avatar = home.avatar(this._data.picture, this._data.firstname)
      this._layout.content = home.content(this._data.firstname)
      this._layout.actions = home.actions()
    } else {
      this._layout.content = errorLink.content()
      this._layout.actions = errorLink.actions()
    }

    Object.values(this._layout).forEach(item => {
      if (item) this.$wrapper.appendChild(item)
    })

    this.$main.appendChild(this.$wrapper)

    home.controls.forEach(btn => btn.component.addEventListener('click', this.goto))
    this.$header.querySelector('.logo').addEventListener('click', this.goto)
  }

  goto (event) {
    const target = event.target.dataset.target
    const currentAvatar = this._layout.avatar
    const currentContent = this._layout.content
    const currentForm = this._layout.form
    const currentActions = this._layout.actions

    switch (target) {
      case 'home' :
        this.$header.querySelector('.logo').classList.remove('logo--low')

        this._layout.avatar = home.avatar(this._data.picture, this._data.firstname)
        this._layout.content = home.content(this._data.firstname)
        this._layout.actions = home.actions()
        this._layout.form = null

        currentAvatar ? currentAvatar.replaceWith(this._layout.avatar) : this.$wrapper.insertBefore(this._layout.avatar, this.$wrapper.children[0])
        currentContent ? currentContent.replaceWith(this._layout.content) : this.$wrapper.insertBefore(this._layout.content, this.$wrapper.children[1])
        currentActions ? currentActions.replaceWith(this._layout.actions) : this.$wrapper.insertBefore(this._layout.actions, this.$wrapper.children[2])
        if (currentForm) currentForm.remove()

        break

      case 'error_link' :
        this.$header.querySelector('.logo').classList.remove('logo--low')

        this._layout.avatar = null
        this._layout.content = errorLink.content(this._data.firstname)
        this._layout.form = null
        this._layout.actions = errorLink.actions()

        if (currentAvatar) currentAvatar.remove()
        currentContent ? currentContent.replaceWith(this._layout.content) : this.$wrapper.insertBefore(this._layout.content, this.$wrapper.children[1])
        if (currentForm) currentForm.remove()
        currentActions ? currentActions.replaceWith(this._layout.actions) : this.$wrapper.insertBefore(this._layout.actions, this.$wrapper.children[2])

        break

      case 'edit':
        this.$header.querySelector('.logo').classList.add('logo--low')

        this._layout.content = editTestimony.content(this._data.firstname)
        this._layout.form = editTestimony.form(280)
        this._layout.actions = null

        currentContent ? currentContent.replaceWith(this._layout.content) : this.$wrapper.insertBefore(this._layout.content, this.$wrapper.children[1])
        currentForm ? currentForm.replaceWith(this._layout.content) : this.$wrapper.insertBefore(this._layout.form, this.$wrapper.children[2])
        if (currentActions) currentActions.remove()

        editTestimony.controls[0].component.addEventListener('click', this.sendEmailTestimony)

        break
      case 'thanks':
        this.$header.querySelector('.logo').classList.remove('logo--low')

        this._layout.avatar = null
        this._layout.content = thanks.content()
        this._layout.form = null
        this._layout.actions = thanks.actions()

        if (currentAvatar) currentAvatar.remove()
        currentContent ? currentContent.replaceWith(this._layout.content) : this.$wrapper.insertBefore(this._layout.content, this.$wrapper.children[1])
        if (currentForm) currentForm.remove()
        currentActions ? currentActions.replaceWith(this._layout.actions) : this.$wrapper.insertBefore(this._layout.actions, this.$wrapper.children[2])
        break
    }
  }

  addPopupSendSuccess () {
    const $node = document.createElement('div')
    $node.classList.add('overlay')

    const content = `
      <div class="popup">
        <div class="popup__header">
          <h2>Ton témoignage  a été envoyé à ${this._data.firstname} !</h2>
        </div>
        <div class="popup__content">
          <p>Connaitrais tu un(e) pote célib<br /> qui aurait besoin de coup de main pour trouver l’âme sœur ?</p>
        </div>
      </div>
    `

    $node.innerHTML = content
    this.$popupActions = [new Button('En savoir plus', 'thanks').component]
    $node.querySelector('.popup__content').appendChild(this.$popupActions[0])

    return $node
  }

  removePopup () {
    if (this.$popup) {
      this.$popupActions = []
      this.$popup.remove()
    }
  }

  sendEmailTestimony (event) {
    event.preventDefault()
    const form = this.$wrapper.querySelector('#' + event.target.dataset.form)
    const formData = new FormData(form)
    // eslint-disable-next-line no-unused-vars
    const data = Object.fromEntries(formData.entries())

    this.$popup = this.addPopupSendSuccess()
    document.querySelector('body').insertBefore(this.$popup, this.$main)
    this.$popupActions[0].addEventListener('click', e => {
      this.removePopup()
      this.goto(e)
    })
  }
}
