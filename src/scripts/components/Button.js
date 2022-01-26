export default class Button {
  /**
   * @param {String} type
   * @param {String} customClass
   * @param {String} link
   * @param {String} label
   * @param {Function} action
   */
  constructor (label = null, target, customClass = null, link = null) {
    this._typeMap = {
      default: ['btn', 'btn--primary'],
      blue: ['btn', 'btn--blue'],
      edit: ['btn', 'btn--primary', 'btn__icon', 'btn__icon--edit'],
      movie: ['btn', 'btn--blue', 'btn__icon', 'btn__icon--movie'],
      mic: ['btn', 'btn--yellow', 'btn__icon', 'btn__icon--mic'],
      send: ['btn', 'btn--primary', 'btn__icon', 'btn__icon--send'],
      apple: ['btn', 'btn--apple'],
      google: ['btn', 'btn--google']
    }
    this._target = target
    this._label = label
    this._customClass = customClass
    this._link = link

    this.$btn = this.createButton()
  }

  get component () {
    return this.$btn
  }

  get type () {
    return this._type
  }

  createButton () {
    let $node

    if (this._link) {
      $node = document.createElement('a')
      $node.href = this._link
    } else {
      $node = document.createElement('button')
      $node.dataset.target = this._target
    }

    let content = ''

    switch (this._target) {
      case 'thanks':
        this._typeMap.blue.forEach(css => $node.classList.add(css))
        content = `
            <span class="btn__label">${this._label}</span>
        `
        break
      case 'edit':
        this._typeMap.edit.forEach(css => $node.classList.add(css))
        content = `
          <span class="btn__content">
            <span class="btn__label">${this._label}</span>
            <span class="btn__caption">280 caractère max</span>
          </span>
        `
        break
      case 'movie':
        this._typeMap.movie.forEach(css => $node.classList.add(css))
        content = `
          <span class="btn__content">
            <span class="btn__label">${this._label}</span>
            <span class="btn__caption">280 caractère max</span>
          </span>
        `
        break
      case 'mic':
        this._typeMap.mic.forEach(css => $node.classList.add(css))
        content = `
          <span class="btn__content">
            <span class="btn__label">${this._label}</span>
            <span class="btn__caption">280 caractère max</span>
          </span>
        `
        break
      case 'send':
        $node.type = 'submit'
        this._typeMap.send.forEach(css => $node.classList.add(css))
        content = `
          <span class="btn__content">
            <span class="btn__label">${this._label}</span>
            <span class="btn__caption">280 caractère max</span>
          </span>
        `
        break
      case 'apple':
        this._typeMap.apple.forEach(css => $node.classList.add(css))
        content = '<span>Disponible sur <br /><strong>App Store</strong></span>'
        break
      case 'google':
        this._typeMap.google.forEach(css => $node.classList.add(css))
        content = '<span>Disponible sur <br /><strong>Google Play</strong></span>'
        break
      default:
        this._typeMap.default.forEach(css => $node.classList.add(css))
        content = `
          <span class="btn__content">
            <span class="btn__label">${this._label}</span>
            <span class="btn__caption">280 caractère max</span>
          </span>
        `
        break
    }

    $node.innerHTML = content
    if (this._customClass) {
      $node.classList.add(this._customClass)
    }

    return $node
  }
}
