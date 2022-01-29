import { initApp, router } from './scripts/routes/router'
import ApiClass from './scripts/api/Api.class'

const app = async () => {
  // URL params
  const url = new URL(window.location.href)
  const params = url.searchParams.get('t')

  // Api request User Profile
  const Api = new ApiClass(require('./data/single.json'))
  const data = await Api.getProfileByToken(params)

  // Route Paths
  router(data)
}

initApp()
window.addEventListener('hashchange', app)
window.addEventListener('load', app)

/*
import { appOnload } from './scripts/hooks/onload'
import ApiClass from './scripts/api/Api.class'
import Route from './scripts/routes/Routes'

async function app () {
  // URL params
  const url = new URL(window.location.href)
  const params = url.searchParams.get('t')

  // Api request User Profile
  const Api = new ApiClass(require('./scripts/mock/single.json'))
  const data = await Api.getProfileByToken(params)

  const route = new Route(data)

  // Before load Components
  appOnload(() => {
    // After load Components
    route.init()
  })
}

app()

*/
