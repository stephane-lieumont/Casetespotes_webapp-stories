import { conf } from '../app.conf'
import { getRoute } from '../routes/router'

const Button = {
  default: {
    render: (label, pathName) => {
      return `
        <button class="btn btn--primary" ${Button.getPathLink(pathName)}>
          <span class="btn__label">${label}</span>
        </button>
      `
    }
  },
  blue: {
    render: (label, pathName) => {
      return `
        <button class="btn btn--blue" ${Button.getPathLink(pathName)}>
          <span class="btn__label">${label}</span>
        </button>
      `
    }
  },
  edit: {
    render: (label, pathName) => {
      return `
        <button class="btn btn--primary btn__icon btn__icon--edit"  ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">280 caractères max</span>
          </span>
        </button>
      `
    }
  },
  movie: {
    render: (label, pathName) => {
      return `
        <button class="btn btn--blue btn__icon btn__icon--movie" ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">3 minutes maximum</span>
          </span>
        </button>
      `
    }
  },
  mic: {
    render: (label, pathName) => {
      return `
        <button class="btn btn--yellow btn__icon btn__icon--mic" ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">3 minutes maximum</span>
          </span>
        </button>
      `
    }
  },
  send: {
    render: (label, pathName) => {
      return `
        <button class="btn btn--primary btn__icon btn__icon--send" ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">280 caractères max</span>
          </span>
        </button>
      `
    }
  },
  playstore: {
    render: () => {
      return `
        <a href="${conf.playstoreURL}" class="btn btn--google" >
          <span>Disponible sur <br /><strong>Google Play</strong></span>
        </a>
      `
    }
  },
  appstore: {
    render: () => {
      return `
        <a href="${conf.appstoreURL}" class="btn btn--apple" >
          <span>Disponible sur <br /><strong>App Store</strong></span>
        </a>
      `
    }
  },

  getPathLink: (pathName) => {
    return getRoute(pathName) ? `onclick="location.href='${getRoute(pathName)}'"` : ''
  }
}

export default Button
