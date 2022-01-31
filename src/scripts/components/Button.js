import { conf } from '../app.conf'
import { getRoute } from '../routes/router'

const Button = {
  default: {
    render: (label, pathName, action = 'default') => {
      return `
        <button class="btn btn--primary" data-action="${action}" ${Button.getPathLink(pathName)}>
          <span class="btn__label">${label}</span>
        </button>
      `
    }
  },
  blue: {
    render: (label, pathName, action = 'default') => {
      return `
        <button class="btn btn--blue" data-action="${action}" ${Button.getPathLink(pathName)}>
          <span class="btn__label">${label}</span>
        </button>
      `
    }
  },
  edit: {
    render: (label, pathName, action = 'default') => {
      return `
        <button class="btn btn--primary btn__icon btn__icon--edit" data-action="${action}"  ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">280 caractères max</span>
          </span>
        </button>
      `
    }
  },
  movie: {
    render: (label, pathName, action = 'default') => {
      return `
        <button class="btn btn--blue btn__icon btn__icon--movie" data-action="${action}" ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">3 minutes maximum</span>
          </span>
        </button>
      `
    }
  },
  mic: {
    render: (label, pathName, action = 'default') => {
      return `
        <button class="btn btn--yellow btn__icon btn__icon--mic" data-action="${action}" ${Button.getPathLink(pathName)} >
          <span class="btn__content">
            <span class="btn__label">${label}</span>
            <span class="btn__caption">3 minutes maximum</span>
          </span>
        </button>
      `
    }
  },
  send: {
    render: (label, pathName, action = 'default') => {
      return `
        <button class="btn btn--primary btn__icon btn__icon--send" data-action="${action}" ${Button.getPathLink(pathName)} >
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
        <a href="${conf.links.playstore}" class="btn btn--google" >
          <span>Disponible sur <br /><strong>Google Play</strong></span>
        </a>
      `
    }
  },
  appstore: {
    render: () => {
      return `
        <a href="${conf.links.appstore}" class="btn btn--apple" >
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
