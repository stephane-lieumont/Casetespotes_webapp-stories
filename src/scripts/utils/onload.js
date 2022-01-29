import Loader from '@/scripts/components/Loader'
import loaderAnimation from '@/assets/lottie/lottieLoader.json'

/**
 * Load application and return callback at the end of loaded document
 * @param {Function} callback
 */
export function appOnload (callback = () => {}) {
  document.querySelector('body').classList.add('loading')
  const loader = new Loader(loaderAnimation)
  loader.createLoader()

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('body').classList.remove('loading')
      document.querySelector('body').classList.add('loaded')
      loader.destroyLoader()
      callback()
    }, 1500)
  })
}
