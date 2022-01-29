import lottie from 'lottie-web'

export default class Loader {
  constructor ($json) {
    this._json = $json
    this._loaderLottie = null
    this.$wrapperLottie = this._createLoaderContainer()
  }

  createLoader () {
    this._loaderLottie = this._createLottieObject()
    document.querySelector('body').prepend(this.$wrapperLottie)
  }

  destroyLoader () {
    setTimeout(() => {
      this._loaderLottie.destroy()
      this.$wrapperLottie.remove()
    }, 1500)
  }

  _createLoaderContainer () {
    const $node = document.createElement('div')
    $node.classList.add('animation-loader')
    $node.innerHTML = '<div class="animation-loader__lottie"></div>'

    return $node
  }

  _createLottieObject () {
    const animationObject = lottie.loadAnimation({
      name: 'loader',
      container: this.$wrapperLottie.querySelector('.animation-loader__lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this._json
    })

    return animationObject
  }
}
