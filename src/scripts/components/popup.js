import lottie from 'lottie-web'

const Popup = {
  name: 'popup',
  title: 'Titre de la popup',
  content: 'Contenu de la popup',
  wrapper: null,
  animation: null,
  lottieObject: null,
  buttons: [],
  render: () => {
    const $node = document.createElement('div')
    $node.classList.add('overlay')

    const content = `
      <div class="popup">
        <div class="popup__header">
          <h2>${Popup.title}</h2>
        </div>
        <div class="popup__content">
          <p>${Popup.content}</p>
          ${Popup.buttonsRender()}
        </div>        
      </div>
    `

    $node.innerHTML = content

    if (Popup.animation) {
      const $wrapperAnimation = document.createElement('div')
      $wrapperAnimation.classList.add('popup__header__animation')
      $node.querySelector('.popup__header').prepend($wrapperAnimation)

      Object.defineProperty(Popup, 'lottieObject', {
        value: Popup.createAnimation($wrapperAnimation),
        writable: false
      })
    }

    Popup.wrapper = $node

    return $node
  },

  buttonsRender: () => {
    if (Popup.buttons.length > 0) {
      let wrapper = '<div class="popup__action">'
      Popup.buttons.forEach(item => {
        wrapper += item
      })
      wrapper += '</div>'

      return wrapper
    } else {
      return ''
    }
  },

  createAnimation: (HTMLElement) => {
    return lottie.loadAnimation({
      name: 'PopupAnimation',
      container: HTMLElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: Popup.animation
    })
  },

  destroyPopup: () => {
    Popup.wrapper.querySelector('.popup').classList.add('hide')
    Popup.wrapper.classList.add('hide')
    const timer = setTimeout(() => {
      Popup.lottieObject.destroy()
      Popup.wrapper.remove()
      clearTimeout(timer)
    }, 500)
  }
}

export default Popup
