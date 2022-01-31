import lottie from 'lottie-web'
import loaderAnimation from '@/assets/lottie/lottieLoader.json'

const Loader = {
  wrapper: null,
  lottieObject: null,
  createLoader: (HTMLElement) => {
    return lottie.loadAnimation({
      name: 'loader',
      container: HTMLElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: loaderAnimation
    })
  },
  destroyLoader () {
    Loader.lottieObject.destroy()
    document.querySelector('.animation-loader').remove()
  },
  render: () => {
    const $node = document.createElement('div')
    $node.classList.add('animation-loader')
    $node.innerHTML = '<div class="animation-loader__lottie"></div>'

    Object.defineProperty(Loader, 'wrapper', {
      value: $node.querySelector('.animation-loader__lottie'),
      writable: false
    })
    Object.defineProperty(Loader, 'lottieObject', {
      value: Loader.createLoader(Loader.wrapper),
      writable: false
    })

    return $node
  }
}

export default Loader
