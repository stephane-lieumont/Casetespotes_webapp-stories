import Header from '../layout/header'
import Alert from '../components/alert'

import EditTestimony from '../pages/editTestimony'
import Error404 from '../pages/Error404'
import ErrorLink from '../pages/errorLink'
import Home from '../pages/home'
import Thanks from '../pages/thanks'
import TermsOfUse from '../pages/TermsOfUse'

/**
 * Define routes with params
 */
export const routes = [
  {
    path: '/',
    pathName: 'home',
    component: Home,
    params: {
      headerLogoLow: false,
      headerReturnBtn: false,
      restrictedAccess: true
    }
  },
  {
    path: '/invitation-incorrecte',
    pathName: 'error',
    component: ErrorLink,
    params: {
      headerLogoLow: false,
      headerReturnBtn: false,
      restrictedAccess: false
    }
  },
  {
    path: '/accueil',
    pathName: 'home',
    component: Home,
    params: {
      headerLogoLow: false,
      headerReturnBtn: false,
      restrictedAccess: true
    }
  },
  {
    path: '/edition-temoignage',
    pathName: 'edit-testimony',
    component: EditTestimony,
    params: {
      headerLogoLow: true,
      headerReturnBtn: true,
      restrictedAccess: true
    }
  },
  {
    path: '/temoignage-enregistre',
    pathName: 'thanks',
    component: Thanks,
    params: {
      headerLogoLow: false,
      headerReturnBtn: false,
      restrictedAccess: true
    }
  },
  {
    path: '/conditions-generales',
    pathName: 'terms-of-use',
    component: TermsOfUse,
    params: {
      headerLogoLow: false,
      headerReturnBtn: true,
      restrictedAccess: false
    }
  }
]

/**
 * Redirect to other routes
 * @param {ObjectJSON} data
 */
export const router = (data = null) => {
  // add name and parameters to Object component
  constructComponents(routes)

  // Find the component based on the current path
  const path = parseLocation()

  // Get Component by routes with restricted area
  const component = selectComponent(path, routes, data)

  // Render the component in the app placeholder
  renderComponent(component, data)
}

/**
 * Get route by pathName
 * @param {String} pathName
 * @returns {String}
 */
export const getRoute = (pathName) => {
  const matchRoute = routes.find(route => route.pathName === pathName)
  return matchRoute ? '#' + matchRoute.path : undefined
}

/**
 * Get Component by Path
 * @param {String} path
 * @param {Object[]} routes
 * @returns {Object}
 */
export const getComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined

/**
 * Get path from location
 * @returns {String}
 */
export const parseLocation = () => location.hash.slice(1).toLocaleLowerCase() || '/'

/**
 * Apply params of routes
 * @param {Object} params
 */
const applyParams = (params) => {
  if (params && params.headerLogoLow !== undefined) Header.logoLow(params.headerLogoLow)
  params && params.headerReturnBtn ? Header.addBtnReturn() : Header.destroyBtnReturn()
}

/**
 * selectComponent by path and data
 * @param {String} path
 * @param {String} routes
 * @param {Object} data
 * @returns {Object} return component
 */
const selectComponent = (path, routes, data) => {
  const componentObject = getComponentByPath(path, routes)
  let component

  if (componentObject === undefined) {
    component = Error404
  } else if (!data && componentObject.params.restrictedAccess) {
    component = ErrorLink
  } else {
    component = componentObject.component
  }

  // apply params routes
  applyParams(component.params)

  return component
}

/**
 * Render component on main section DOM
 * @param {Object} component
 * @param {Object} data
 */
const renderComponent = (component, data) => {
  const oldHeigthContainer = document.querySelector('#app main').clientHeight
  document.querySelector('#app').replaceChild(component.render(data), document.querySelector('#app main'))

  // Transition heigth main component
  const newHeigthContainer = document.querySelector('#app main').clientHeight + 25

  // Destroy alert forms
  Alert.destroyAlert()

  document.querySelector('#app main').style.height = oldHeigthContainer + 'px'
  setTimeout(() => {
    document.querySelector('#app main').style.height = newHeigthContainer + 'px'
  }, 100)
}

/**
 * Add components params defines on routes ArrayObject
 * @param {Object[]} routes
 */
const constructComponents = (routes) => {
  routes.forEach(route => {
    route.component.name = route.pathName
    route.component.params = route.params
    route.component.path = route.path
  })
}
